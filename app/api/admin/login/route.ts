import { NextResponse } from "next/server"

const ADMIN_PASS = process.env.ADMIN_PASS || "Admin@Balaji"

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || ""
    let password = ""
    if (contentType.includes("application/json")) {
      const body = await request.json().catch(() => ({}))
      password = String((body as any)?.password || "")
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const form = await request.formData()
      password = String(form.get("password") || "")
    } else {
      const form = await request.formData().catch(() => null)
      if (form) password = String(form.get("password") || "")
    }

    if (password !== ADMIN_PASS) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 })
    }

    const res = NextResponse.json({ success: true })
    // Short-lived, one-time cookie for immediate admission
    const maxAge = 120 // seconds
    const cookie = [`admin-once=1`, `Path=/`, `HttpOnly`, `SameSite=Lax`, `Max-Age=${maxAge}`]
    if (process.env.NODE_ENV === "production") cookie.push("Secure")
    res.headers.append("Set-Cookie", cookie.join("; "))
    return res
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Unknown error" }, { status: 500 })
  }
}


