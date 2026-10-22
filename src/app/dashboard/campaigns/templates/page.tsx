export const instant = false

import { connection } from "next/server"
import { getTemplates } from "./actions"
import Link from "next/link"
import { ChevronDown, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react"
import { TemplateActions } from "./TemplateActions"

export default async function TemplatesPage() {
  await connection()
  
  const templates = await getTemplates()

  return (
    <div className="min-h-full bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Templates</h1>
            <p className="text-sm text-gray-500">Manage your campaign email templates</p>
          </div>
          <Link 
            href="/dashboard/campaigns/templates/new" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors"
          >
            + New Template
          </Link>
        </div>

        <div className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden flex flex-col">
          <div className="p-5 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Email Templates</h2>
            <input 
              type="text" 
              placeholder="Search templates..." 
              className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-64"
            />
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500">
                <tr>
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Subject Line</th>
                  <th className="px-5 py-3 font-medium">Created</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {templates && templates.length > 0 ? (
                  templates.map((template) => (
                    <tr key={template.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="px-5 py-4 text-gray-900 font-medium">{template.name}</td>
                      <td className="px-5 py-4 truncate max-w-xs">{template.subject_line}</td>
                      <td className="px-5 py-4">
                        {new Date(template.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-4">
                        <TemplateActions id={template.id} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-5 py-12 text-center text-gray-500">
                      No templates found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500 bg-gray-50/50">
            <div>0 of 0 row(s) selected.</div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span>Rows per page</span>
                <button className="flex items-center px-2 py-1 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  10 <ChevronDown className="w-3 h-3 ml-1" />
                </button>
              </div>
              <div>Page 1 of 0</div>
              <div className="flex items-center gap-1">
                <button className="p-1 rounded-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50"><ChevronsLeft className="w-4 h-4" /></button>
                <button className="p-1 rounded-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50"><ChevronLeft className="w-4 h-4" /></button>
                <button className="p-1 rounded-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50"><ChevronRight className="w-4 h-4" /></button>
                <button className="p-1 rounded-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50"><ChevronsRight className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}