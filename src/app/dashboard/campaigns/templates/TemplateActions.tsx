"use client"

import Link from "next/link"
import { Pencil, Trash2 } from "lucide-react"
import { deleteTemplate } from "./actions"

export function TemplateActions({ id }: { id: string }) {
  return (
    <div className="flex items-center justify-end gap-2">
      <Link 
        href={`/dashboard/campaigns/templates/${id}/edit`}
        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
        title="Edit"
      >
        <Pencil className="w-4 h-4" />
      </Link>
      <button 
        onClick={async () => {
          if (window.confirm("Are you sure you want to delete this template?")) {
            await deleteTemplate(id)
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