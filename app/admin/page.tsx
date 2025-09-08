import { supabaseAdmin } from "@/lib/supabaseAdmin"
import { AdminTableClient } from "@/components/admin-table-client"
import Image from "next/image"

export const revalidate = 0

type ApplicationRow = {
  id: number
  created_at?: string
  full_name: string
  contact_number: string
  email: string
  location: string
  experience: string
  domain_preference: string
  other_domain: string | null
  referral_code: string | null
  suggestions: string | null
  resume_path: string | null
}

async function getApplicationsWithSignedUrls(): Promise<(ApplicationRow & { resume_url: string | null })[]> {
  const { data, error } = await supabaseAdmin
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  const bucket = "hatchpoint-uploads"
  const expiresInSeconds = 60 * 60 // 1 hour

  const rows = data as ApplicationRow[]
  const withUrls = await Promise.all(
    rows.map(async (row) => {
      if (!row.resume_path) return { ...row, resume_url: null }
      const { data: signed, error: signError } = await supabaseAdmin.storage
        .from(bucket)
        .createSignedUrl(row.resume_path, expiresInSeconds)
      if (signError) {
        return { ...row, resume_url: null }
      }
      return { ...row, resume_url: signed?.signedUrl || null }
    })
  )

  return withUrls
}

export default async function AdminPage() {
  let rows: (ApplicationRow & { resume_url: string | null })[] = []
  let errorMessage: string | null = null
  try {
    rows = await getApplicationsWithSignedUrls()
  } catch (err: any) {
    errorMessage = err?.message || "Failed to load applications"
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="py-10 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-6">
              <Image
                src="/whitebg_logo.png"
                alt="HatchPoint Logo"
                width={250}
                height={75}
                className="h-12 w-auto"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin • Applications</h1>
            <p className="text-gray-600">View submitted applications and download resumes</p>
          </div>

          {errorMessage ? (
            <div className="rounded-md border border-red-200 bg-red-50 p-4 text-red-700">{errorMessage}</div>
          ) : rows.length === 0 ? (
            <div className="rounded-md border border-gray-200 bg-gray-50 p-6 text-gray-700">
              No applications yet.
            </div>
          ) : (
            <AdminTableClient initialRows={rows} />
          )}
        </div>
      </section>
    </div>
  )
}


