export const instant = false

import { connection } from "next/server"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { createNewCampaign } from "../actions"

export default async function NewCampaignPage() {
  await connection()
  
  const supabase = await createClient()
  
  const { data: templates } = await supabase
    .from("campaign_templates")
    .select("id, name")
    .order("name")

  const { data: targetLists } = await supabase
    .from("target_lists")
    .select("id, name")
    .order("name")

  return (
    <div className="min-h-full bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto space-y-6 mt-4">
        
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Create Campaign</h1>
          <p className="text-sm text-gray-500">Setup and schedule a new email campaign</p>
        </div>

        <form action={createNewCampaign} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 space-y-6">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Campaign Name *</label>
              <input 
                name="name"
                required
                className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Template *</label>
                <select 
                  name="template_id"
                  required
                  className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                >
                  <option value="">Select a template...</option>
                  {templates?.map((t) => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Target List *</label>
                <select 
                  name="target_list_id"
                  required
                  className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                >
                  <option value="">Select a target list...</option>
                  {targetLists?.map((l) => (
                    <option key={l.id} value={l.id}>{l.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Schedule Send</label>
              <input 
                type="datetime-local"
                name="scheduled_at"
                className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
              />
            </div>
          </div>

          <div className="bg-gray-50 px-6 py-4 flex items-center gap-3 border-t border-gray-200">
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium shadow-sm transition-colors"
            >
              Create Campaign
            </button>
            <Link 
              href="/dashboard/campaigns"
              className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 transition-colors rounded-md shadow-sm"
            >
              Cancel
            </Link>
          </div>
        </form>

      </div>
    </div>
  )
}