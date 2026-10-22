"use client"

import Link from "next/link"
import { Pencil, Trash2 } from "lucide-react"
import { deleteTarget } from "./actions"

export function TargetActions({ id }: { id: string }) {
  return (
    <div className="flex items-center justify-end gap-2">
      <Link 
        href={`/dashboard/campaigns/targets/${id}/edit`}
        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
        title="Edit"
      >
        <Pencil className="w-4 h-4" />
      </Link>
      <button 
        onClick={async () => {
          if (window.confirm("Are you sure you want to delete this target?")) {
            await deleteTarget(id)
          }
        }}
        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
        title="Delete"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  )
}