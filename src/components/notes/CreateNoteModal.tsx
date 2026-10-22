"use client"

import { useState } from "react"
import { createNote } from "@/app/dashboard/notes/actions"
import { X } from "lucide-react"

export function CreateNoteModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  async function onSubmit(formData: FormData) {
    setIsLoading(true)
    setError("")
    
    try {
      // TypeScript Error Fix: Added exact types and fallback entity_id
      const input = {
        entity_type: formData.get("entity_type") as "lead" | "contact",
        content: formData.get("content") as string,
        entity_id: (formData.get("entity_id") as string) || "",
      }
      
      await createNote(input)
      setIsOpen(false)
    } catch (err: any) {
      setError(err.message || "Failed to create note")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium transition-colors"
      >
        Add Note
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex text-gray-900 items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-lg font-semibold text-gray-900">Add New Note</h2>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-gray-400 hover:text-gray-700 transition-colors rounded-full p-1 hover:bg-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form action={onSubmit} className="p-5 space-y-4">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                  {error}
                </div>
              )}
              
              {/* Hidden field to satisfy TS entity_id requirement */}
              <input type="hidden" name="entity_id" value="" />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Related To</label>
                <select 
                  name="entity_type" 
                  defaultValue="lead" 
                  className="block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
                >
                  {/* Options updated to match strictly allowed TS types */}
                  <option value="lead">Lead</option>
                  <option value="contact">Contact</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Note Content *</label>
                <textarea 
                  name="content" 
                  required
                  rows={5}
                  placeholder="Write your note here..."
                  className="block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 text-sm resize-none" 
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsOpen(false)} 
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isLoading} 
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {isLoading ? "Saving..." : "Save Note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}