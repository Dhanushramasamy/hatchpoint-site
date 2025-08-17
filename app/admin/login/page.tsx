"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AdminLoginPage() {
  const [password, setPassword] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(json?.error || "Invalid password")
        return
      }
      router.replace("/admin")
    } catch (err: any) {
      setError(err?.message || "Something went wrong")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6 space-y-4">
        <h1 className="text-xl font-bold text-gray-900">Admin Access</h1>
        <p className="text-sm text-gray-600">Enter the admin password to continue.</p>
        {error && <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">{error}</div>}
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className=""
        />
        <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800 text-white" disabled={submitting || !password}>
          {submitting ? "Checking..." : "Continue"}
        </Button>
      </form>
    </div>
  )
}


