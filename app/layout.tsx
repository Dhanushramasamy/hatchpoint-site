import type React from "react"
import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  title: "HatchPoint - Your Next Chapter Hatched",
  description:
    "Professional career services including resume writing, LinkedIn optimization, cover letters, and career branding. We craft career stories that get you noticed.",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "128x128" },
      { url: "/favicon-64x64.png", sizes: "64x64", type: "image/png" },
      { url: "/favicon-128x128.png", sizes: "128x128", type: "image/png" },
      { url: "/android-chrome-768x768.png", sizes: "768x768", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon-720.png", sizes: "720x720", type: "image/png" }
    ],
    shortcut: "/favicon.ico",
    other: [
      {
        rel: "manifest",
        url: "/site.webmanifest"
      }
    ],
  },
  openGraph: {
    title: "HatchPoint - Your Next Chapter Hatched",
    description: "Professional career services including resume writing, LinkedIn optimization, cover letters, and career branding. We craft career stories that get you noticed.",
    images: ["/whitebg_logo.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HatchPoint - Your Next Chapter Hatched",
    description: "Professional career services including resume writing, LinkedIn optimization, cover letters, and career branding. We craft career stories that get you noticed.",
    images: ["/whitebg_logo.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
