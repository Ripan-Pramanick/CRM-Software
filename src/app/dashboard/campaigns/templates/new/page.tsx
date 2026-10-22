"use client"

import { useState, useRef } from "react"
import { createTemplate, generateEmailWithAI } from "../actions"
import Link from "next/link"
import { Bold, Italic, Underline, Heading1, Heading2, List, Link as LinkIcon, Sparkles, Loader2 } from "lucide-react"

export default function NewTemplatePage() {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit')
  const [aiPrompt, setAiPrompt] = useState('')
  const [emailBody, setEmailBody] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleAIGenerate = async () => {
    if (!aiPrompt.trim()) return
    setIsGenerating(true)
    try {
      const generatedHtml = await generateEmailWithAI(aiPrompt)
      setEmailBody(generatedHtml)
      setActiveTab('edit') 
    } catch (error) {
      console.error(error)
    } finally {
      setIsGenerating(false)
    }
  }

  const insertFormat = (startTag: string, endTag: string) => {
    const textarea = textareaRef.current
    if (!textarea) return
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = emailBody.substring(start, end)
    const before = emailBody.substring(0, start)
    const after = emailBody.substring(end)
    const newText = before + startTag + selectedText + endTag + after
    setEmailBody(newText)
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + startTag.length, end + startTag.length)
    }, 0)
  }

  return (
    <div className="min-h-full bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6 mt-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">New Template</h1>
          <p className="text-sm text-gray-500">Create a campaign email template</p>
        </div>
        <form action={createTemplate} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <input type="hidden" name="body_html" value={emailBody} />
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Template Name *</label>
              <input name="name" required className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-shadow" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
              <textarea name="description" rows={2} className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none transition-shadow" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject Line *</label>
              <input name="subject_line" required className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-shadow" />
            </div>
            <div className="border border-blue-200 bg-blue-50 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <label className="block text-sm font-bold text-blue-900">Generate with AI</label>
              </div>
              <label className="block text-xs text-blue-700 mb-3">Describe the email you want</label>
              <textarea value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} rows={3} className="w-full bg-white border border-blue-200 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none mb-3 shadow-sm" />
              <button type="button" onClick={handleAIGenerate} disabled={isGenerating || !aiPrompt.trim()} className="w-full flex items-center justify-center py-2 bg-white border border-blue-200 hover:bg-blue-100 text-blue-700 rounded-md text-sm font-semibold transition-colors shadow-sm disabled:opacity-60 disabled:hover:bg-white">
                {isGenerating ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...</> : "Generate Email Content"}
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Body</label>
              <div className="flex items-center gap-1 mb-0">
                <button type="button" onClick={() => setActiveTab('edit')} className={`px-4 py-2 text-sm font-medium rounded-t-md relative top-[1px] z-10 border-t border-x transition-colors ${activeTab === 'edit' ? 'bg-white border-gray-300 text-blue-600' : 'bg-gray-50 border-transparent text-gray-500 hover:text-gray-900'}`}>Edit HTML</button>
                <button type="button" onClick={() => setActiveTab('preview')} className={`px-4 py-2 text-sm font-medium rounded-t-md relative top-[1px] z-10 border-t border-x transition-colors ${activeTab === 'preview' ? 'bg-white border-gray-300 text-blue-600' : 'bg-gray-50 border-transparent text-gray-500 hover:text-gray-900'}`}>Preview</button>
              </div>
              <div className="border border-gray-300 rounded-b-md rounded-tr-md overflow-hidden bg-white shadow-sm">
                {activeTab === 'edit' && (
                  <div className="flex items-center gap-1 border-b border-gray-200 p-2 bg-gray-50">
                    <button type="button" onClick={() => insertFormat('<strong>', '</strong>')} className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"><Bold className="w-4 h-4" /></button>
                    <button type="button" onClick={() => insertFormat('<em>', '</em>')} className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"><Italic className="w-4 h-4" /></button>
                    <button type="button" onClick={() => insertFormat('<u>', '</u>')} className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"><Underline className="w-4 h-4" /></button>
                    <div className="w-px h-4 bg-gray-300 mx-1"></div>
                    <button type="button" onClick={() => insertFormat('<h1>', '</h1>')} className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"><Heading1 className="w-4 h-4" /></button>
                    <button type="button" onClick={() => insertFormat('<h2>', '</h2>')} className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"><Heading2 className="w-4 h-4" /></button>
                    <div className="w-px h-4 bg-gray-300 mx-1"></div>
                    <button type="button" onClick={() => insertFormat('<ul>\n  <li>', '</li>\n</ul>')} className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"><List className="w-4 h-4" /></button>
                    <button type="button" onClick={() => insertFormat('<a href="">', '</a>')} className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"><LinkIcon className="w-4 h-4" /></button>
                  </div>
                )}
                {activeTab === 'edit' ? (
                  <textarea ref={textareaRef} value={emailBody} onChange={(e) => setEmailBody(e.target.value)} rows={12} className="w-full bg-white p-4 text-sm text-gray-900 focus:outline-none resize-none font-mono" />
                ) : (
                  <div className="w-full bg-white p-6 text-sm text-gray-900 min-h-[288px] overflow-y-auto prose max-w-none" dangerouslySetInnerHTML={{ __html: emailBody }} />
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Available merge tags: <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-700">{'{{first_name}}'}</code>, <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-700">{'{{last_name}}'}</code>, <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-700">{'{{company}}'}</code>
              </p>
            </div>
          </div>
          <div className="bg-gray-50 px-6 py-4 flex items-center gap-3 border-t border-gray-200">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium shadow-sm transition-colors">Save Template</button>
            <Link href="/dashboard/campaigns/templates" className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 transition-colors rounded-md shadow-sm">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  )
}