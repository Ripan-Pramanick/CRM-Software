export const instant = false

import { getNotes } from "./actions"
import { StickyNote } from "lucide-react"
import { connection } from "next/server"
import { CreateNoteModal } from "@/components/notes/CreateNoteModal"

export default async function NotesPage() {
  await connection()

  const notes = await getNotes()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Notes</h1>
       
        <CreateNoteModal />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <div key={note.id} className="bg-white rounded-lg shadow border border-gray-200 p-5 flex flex-col">
            <div className="flex items-center text-xs text-gray-500 mb-3 uppercase tracking-wider font-semibold">
              <StickyNote className="w-4 h-4 mr-2" />
              {note.entity_type} Record
            </div>
            <p className="text-gray-800 text-sm flex-1 whitespace-pre-wrap">
              {note.content}
            </p>
            <div className="mt-4 text-xs text-gray-400">
              {new Date(note.created_at).toLocaleDateString()}
            </div>
          </div>
        ))}
        {notes.length === 0 && (
          <div className="col-span-full p-8 text-center text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
            No notes found.
          </div>
        )}
      </div>
    </div>
  )
}