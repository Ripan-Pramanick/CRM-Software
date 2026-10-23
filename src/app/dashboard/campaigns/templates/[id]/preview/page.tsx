export const instant = false 

import { connection } from "next/server"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Pencil, Calendar, Tag, Type } from "lucide-react"
import { getTemplateById } from "../../actions"

export default async function TemplatePreviewPage({ params }: { params: { id: string } }) {
  await connection()
  
  const resolvedParams = await params
  const template = await getTemplateById(resolvedParams.id)

  if (!template) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { 
        month: "long", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" 
    })
  }

  return (
    <div className="min-h-full bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Top Navigation */}
        <div className="flex items-center justify-between">
          <Link 
            href="/dashboard/campaigns/templates" 
            className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Templates
          </Link>
          <Link 
            href={`/dashboard/campaigns/templates/${template.id}/edit`}
            className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Pencil className="w-4 h-4 mr-2" />
            Edit Template
          </Link>
        </div>

        {/* Template Meta Details Card */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{template.name}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Type className="w-3.5 h-3.5" /> Subject Line
              </p>
              <p className="text-sm text-gray-900 font-medium">{template.subject_line || "No subject provided"}</p>
            </div>
            
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" /> Status
              </p>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                template.status === 'Active' || !template.status ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-gray-100 text-gray-700 border border-gray-200'
              }`}>
                {template.status || "Active"}
              </span>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Last Updated
              </p>
              <p className="text-sm text-gray-900">{formatDate(template.updated_at || template.created_at)}</p>
            </div>
          </div>
        </div>

        {/* Email Preview Frame */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden flex flex-col">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <span className="ml-4 text-sm font-medium text-gray-500">Preview</span>
          </div>
          
          <div className="p-8 min-h-[400px]">
            {template.content || template.body || template.description ? (
              <div 
                className="prose prose-sm max-w-none text-gray-800"
                dangerouslySetInnerHTML={{ __html: template.content || template.body || template.description }}
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 mt-20">
                <p>No content available for this template.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}