import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabaseAdmin"

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || ""
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json({ error: "Expected multipart/form-data" }, { status: 400 })
    }

    const formData = await request.formData()

    const fullName = String(formData.get("fullName") || "")
    const contactNumber = String(formData.get("contactNumber") || "")
    const email = String(formData.get("email") || "")
    const location = String(formData.get("location") || "")
    const experience = String(formData.get("experience") || "")
    const domainPreference = String(formData.get("domainPreference") || "")
    const otherDomain = String(formData.get("otherDomain") || "")
    const referralCode = String(formData.get("referralCode") || "")
    const suggestions = String(formData.get("suggestions") || "")
    const resume = formData.get("resume") as File | null

    // Upload resume if provided
    let resumePath: string | null = null
    if (resume) {
      // Ensure bucket exists (idempotent)
      const bucketId = "hatchpoint-uploads"
      const { data: bucket, error: getBucketError } = await supabaseAdmin.storage.getBucket(bucketId)
      if (getBucketError || !bucket) {
        const { error: createBucketError } = await supabaseAdmin.storage.createBucket(bucketId, {
          public: false,
          fileSizeLimit: 10 * 1024 * 1024, // 10 MB
          allowedMimeTypes: [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ],
        })
        if (createBucketError && !String(createBucketError.message).toLowerCase().includes("exists")) {
          return NextResponse.json(
            { error: `Failed to ensure storage bucket: ${createBucketError.message}` },
            { status: 400 }
          )
        }
      }

      const arrayBuffer = await resume.arrayBuffer()
      const fileBytes = new Uint8Array(arrayBuffer)
      const ext = resume.name.split(".").pop() || "bin"
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const storagePath = `resumes/${fileName}`

      const { error: uploadError } = await supabaseAdmin.storage
        .from(bucketId)
        .upload(storagePath, fileBytes, {
          contentType: resume.type || "application/octet-stream",
          upsert: false,
        })

      if (uploadError) {
        return NextResponse.json({ error: uploadError.message }, { status: 400 })
      }

      resumePath = storagePath
    }

    const { data, error } = await supabaseAdmin
      .from("applications")
      .insert({
        full_name: fullName,
        contact_number: contactNumber,
        email,
        location,
        experience,
        domain_preference: domainPreference,
        other_domain: otherDomain || null,
        referral_code: referralCode || null,
        suggestions: suggestions || null,
        resume_path: resumePath,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, application: data })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Unknown error" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    let idRaw: unknown = null
    const idParam = searchParams.get("id")
    if (idParam) {
      idRaw = idParam
    }

    // Fallback: read from JSON body if provided
    if (idRaw == null) {
      try {
        const body = await request.json()
        if (body && (body as any).id != null) {
          idRaw = (body as any).id
        }
      } catch {}
    }

    if (idRaw == null || String(idRaw).trim().length === 0) {
      return NextResponse.json({ error: "Missing or invalid id" }, { status: 400 })
    }

    const idFilter = /^\d+$/.test(String(idRaw)) ? Number(idRaw) : String(idRaw)

    // Find row including resume path
    const { data: row, error: fetchError } = await supabaseAdmin
      .from("applications")
      .select("id, resume_path")
      .eq("id", idFilter)
      .single()
    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 400 })
    }

    // Delete DB row
    const { error: deleteError } = await supabaseAdmin.from("applications").delete().eq("id", idFilter)
    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 400 })
    }

    // Delete storage object if exists
    if (row?.resume_path) {
      const bucketId = "hatchpoint-uploads"
      await supabaseAdmin.storage.from(bucketId).remove([row.resume_path])
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Unknown error" }, { status: 500 })
  }
}


