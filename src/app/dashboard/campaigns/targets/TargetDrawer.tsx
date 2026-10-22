"use client"

import { useState } from "react"
import { createTarget } from "./actions"
import { X } from "lucide-react"

export function TargetDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(formData: FormData) {
    setIsLoading(true)
    try {
      await createTarget(formData)
      setIsOpen(false)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  // Common classes for better readability
  const labelClass = "block text-xs font-medium text-gray-700 mb-1.5"
  const inputClass = "w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-shadow"

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-colors"
      >
        + New Target
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-gray-900/40 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white border-l border-gray-200 h-full overflow-y-auto flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10 shadow-sm">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Create new Target</h2>
                <p className="text-xs text-gray-500 mt-1">Add a new target to your CRM system.</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 p-1.5 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form action={onSubmit} className="p-6 space-y-5 bg-gray-50/30">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>First name *</label>
                  <input name="first_name" required className={inputClass} placeholder="John" />
                </div>
                <div>
                  <label className={labelClass}>Last name *</label>
                  <input name="last_name" required className={inputClass} placeholder="Doe" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Email</label>
                  <input name="email" type="email" className={inputClass} placeholder="john@example.com" />
                </div>
                <div>
                  <label className={labelClass}>Mobile phone</label>
                  <input name="mobile_phone" className={inputClass} placeholder="+1 234 567 890" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Office phone</label>
                  <input name="office_phone" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Position</label>
                  <input name="position" className={inputClass} placeholder="CEO" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Company</label>
                  <input name="company" className={inputClass} placeholder="Acme Corp" />
                </div>
                <div>
                  <label className={labelClass}>Company website</label>
                  <input name="company_website" className={inputClass} placeholder="acme.com" />
                </div>
              </div>

              <div>
                <label className={labelClass}>Personal website</label>
                <input name="personal_website" className={inputClass} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>LinkedIn</label>
                  <input name="linkedin" className={inputClass} placeholder="linkedin.com/in/..." />
                </div>
                <div>
                  <label className={labelClass}>X (Twitter)</label>
                  <input name="x_twitter" className={inputClass} placeholder="@username" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>City</label>
                  <input name="city" className={inputClass} placeholder="New York" />
                </div>
                <div>
                  <label className={labelClass}>Country</label>
                  <input name="country" className={inputClass} placeholder="USA" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Industry</label>
                  <input name="industry" className={inputClass} placeholder="Technology" />
                </div>
                <div>
                  <label className={labelClass}>Employees</label>
                  <input name="employees" className={inputClass} placeholder="10-50" />
                </div>
              </div>

              <div>
                <label className={labelClass}>Description</label>
                <textarea name="description" rows={3} className={`${inputClass} resize-none`} placeholder="Additional notes about this target..." />
              </div>

              <div className="pt-4 pb-6">
                <button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-md text-sm font-medium shadow-sm transition-colors disabled:opacity-50">
                  {isLoading ? "Saving..." : "Save Target"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}