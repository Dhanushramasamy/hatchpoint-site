import { NextRequest, NextResponse } from "next/server"

// Password-only protection. Username is ignored.
const ADMIN_PASS = process.env.ADMIN_PASS || "Admin@Balaji"

function unauthorized() {
  return new NextResponse("Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": "Basic realm=\"Admin Area\"" },
  })
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const isAdminPage = pathname.startsWith("/admin")
  const isApplicationsApi = pathname.startsWith("/api/applications")

  // Only protect DELETE for applications API; protect all for /admin
  if (!isAdminPage && !(isApplicationsApi && req.method === "DELETE")) {
    return NextResponse.next()
  }

  // Allow DELETE from the admin UI based on same-origin referrer
  if (isApplicationsApi && req.method === "DELETE") {
    const referer = req.headers.get("referer") || ""
    try {
      const refUrl = new URL(referer)
      if (refUrl.origin === req.nextUrl.origin && refUrl.pathname.startsWith("/admin")) {
        return NextResponse.next()
      }
    } catch {}
  }

  const auth = req.headers.get("authorization")
  if (!auth || !auth.toLowerCase().startsWith("basic ")) {
    return unauthorized()
  }

  const base64Credentials = auth.split(" ")[1]
  try {
    const decoded = atob(base64Credentials)
    const [, pass] = decoded.split(":")
    if (pass === ADMIN_PASS) {
      return NextResponse.next()
    }
  } catch {}

  return unauthorized()
}

export const config = {
  matcher: ["/admin/:path*", "/api/applications/:path*"],
}


