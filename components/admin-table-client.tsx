"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export type AdminApplicationRow = {
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
  resume_url: string | null
}

export function AdminTableClient({ initialRows }: { initialRows: AdminApplicationRow[] }) {
  const [rows, setRows] = useState<AdminApplicationRow[]>(initialRows)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const handleDelete = async (id: number) => {
    if (!confirm(`Delete application #${id}? This cannot be undone.`)) return
    try {
      setDeletingId(id)
      const res = await fetch(`/api/applications?id=${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        alert(json?.error || "Failed to delete")
        return
      }
      setRows((prev) => prev.filter((r) => r.id !== id))
    } catch (err: any) {
      alert(err?.message || "Failed to delete")
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-2 shadow-sm">
      {/* Desktop/tablet table */}
      <div className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead className="w-[180px]">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="hidden lg:table-cell">Phone</TableHead>
              <TableHead className="hidden md:table-cell">Location</TableHead>
              <TableHead className="hidden md:table-cell">Experience</TableHead>
              <TableHead className="hidden lg:table-cell">Domain</TableHead>
              <TableHead className="hidden xl:table-cell">Suggestions</TableHead>
              <TableHead className="hidden lg:table-cell">Referral</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="text-gray-500">{row.id}</TableCell>
                <TableCell className="font-medium">{row.full_name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell className="hidden lg:table-cell">{row.contact_number}</TableCell>
                <TableCell className="hidden md:table-cell">{row.location}</TableCell>
                <TableCell className="hidden md:table-cell capitalize">{row.experience}</TableCell>
                <TableCell className="hidden lg:table-cell">
                  {row.domain_preference === "other" && row.other_domain ? row.other_domain : row.domain_preference}
                </TableCell>
                <TableCell className="hidden xl:table-cell max-w-[360px]">
                  {row.suggestions ? (
                    <div className="flex items-center gap-2">
                      <span className="truncate" title={row.suggestions}>{row.suggestions}</span>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="px-2 py-1 text-xs">Show more</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-xl">
                          <DialogHeader>
                            <DialogTitle>Suggestions</DialogTitle>
                          </DialogHeader>
                          <div className="max-h-[60vh] overflow-auto whitespace-pre-wrap text-sm text-gray-800">
                            {row.suggestions}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  ) : (
                    <span className="text-gray-500">—</span>
                  )}
                </TableCell>
                <TableCell className="hidden lg:table-cell">{row.referral_code || "—"}</TableCell>
                <TableCell className="text-right space-x-2">
                  {row.resume_url ? (
                    <a href={row.resume_url} target="_blank" rel="noopener noreferrer" download>
                      <Button size="sm" className="bg-gray-900 hover:bg-gray-800 text-white">Download</Button>
                    </a>
                  ) : (
                    <span className="text-gray-500 mr-2">No resume</span>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-300 text-red-700 hover:bg-red-50"
                    onClick={() => handleDelete(row.id)}
                    disabled={deletingId === row.id}
                  >
                    {deletingId === row.id ? "Deleting..." : "Delete"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile list */}
      <div className="sm:hidden space-y-3">
        {rows.map((row) => (
          <div key={row.id} className="rounded-lg border border-gray-200 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-gray-500">ID #{row.id}</p>
                <h3 className="font-semibold text-gray-900">{row.full_name}</h3>
                <p className="text-sm text-gray-600">{row.email}</p>
              </div>
              <div className="space-x-2">
                {row.resume_url ? (
                  <a href={row.resume_url} target="_blank" rel="noopener noreferrer" download>
                    <Button size="sm" className="bg-gray-900 hover:bg-gray-800 text-white">Download</Button>
                  </a>
                ) : (
                  <span className="text-gray-500 text-sm">No resume</span>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-300 text-red-700 hover:bg-red-50 mt-2"
                  onClick={() => handleDelete(row.id)}
                  disabled={deletingId === row.id}
                >
                  {deletingId === row.id ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-700">
              <div>
                <span className="text-gray-500">Phone: </span>
                {row.contact_number || "—"}
              </div>
              <div>
                <span className="text-gray-500">Location: </span>
                {row.location || "—"}
              </div>
              <div>
                <span className="text-gray-500">Experience: </span>
                <span className="capitalize">{row.experience || "—"}</span>
              </div>
              <div>
                <span className="text-gray-500">Domain: </span>
                {row.domain_preference === "other" && row.other_domain ? row.other_domain : row.domain_preference}
              </div>
              <div className="col-span-2">
                <span className="text-gray-500">Suggestions: </span>
                {row.suggestions ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="text-blue-700 underline">Show more</button>
                    </DialogTrigger>
                    <DialogContent className="max-w-xl">
                      <DialogHeader>
                        <DialogTitle>Suggestions</DialogTitle>
                      </DialogHeader>
                      <div className="max-h-[60vh] overflow-auto whitespace-pre-wrap text-sm text-gray-800">
                        {row.suggestions}
                      </div>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <span>—</span>
                )}
              </div>
              <div className="col-span-2">
                <span className="text-gray-500">Referral: </span>
                {row.referral_code || "—"}
              </div>
            </div>
          </div>
        ))}
      </div>

      {rows.length === 0 && (
        <div className="p-6 text-center text-gray-600">No applications.</div>
      )}
    </div>
  )
}


