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
      { url: "/Emblem_logo.png", sizes: "16x16" },
      { url: "/Emblem_logo.png", sizes: "32x32" },
      { url: "/Emblem_logo.png", sizes: "96x96" }
    ],
    apple: "/Emblem_logo.png",
    other: [
      {
        rel: "icon",
        url: "/Emblem_logo.png",
      },
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
