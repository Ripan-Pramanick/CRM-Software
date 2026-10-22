export const instant = false

import { getLeads } from "../leads/actions"
import { connection } from "next/server"
import { Building, DollarSign, MoreHorizontal } from "lucide-react"

const PIPELINE_STAGES = [
  { id: 'new', label: 'New', color: 'bg-blue-100 text-blue-700' },
  { id: 'contacted', label: 'Contacted', color: 'bg-purple-100 text-purple-700' },
  { id: 'qualified', label: 'Qualified', color: 'bg-indigo-100 text-indigo-700' },
  { id: 'proposal', label: 'Proposal', color: 'bg-orange-100 text-orange-700' },
  { id: 'won', label: 'Won', color: 'bg-green-100 text-green-700' },
  { id: 'lost', label: 'Lost', color: 'bg-red-100 text-red-700' },
]

export default async function PipelinePage() {
  await connection()
  
  // Fetching leads using the action we already fixed
  const leads = await getLeads()

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Sales Pipeline</h1>
      </div>

      {/* Kanban Board Container */}
      <div className="flex-1 overflow-x-auto pb-4 custom-scrollbar">
        <div className="flex gap-6 h-full min-w-max px-2">
          
          {PIPELINE_STAGES.map((stage) => {
            // Filter leads for the current column
            const stageLeads = leads.filter(lead => 
              (lead.status?.toLowerCase() === stage.id) || 
              (!lead.status && stage.id === 'new')
            )

            return (
              <div key={stage.id} className="w-80 flex flex-col bg-gray-50/50 rounded-xl border border-gray-200">
                {/* Column Header */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50 rounded-t-xl">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-700">{stage.label}</h3>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${stage.color}`}>
                      {stageLeads.length}
                    </span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>

                {/* Column Cards */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  {stageLeads.map((lead) => (
                    <div 
                      key={lead.id} 
                      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all cursor-grab"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium text-gray-900 truncate pr-2">
                          {lead.company_name}
                        </div>
                      </div>
                      
                      {lead.contact_name && (
                        <div className="text-sm text-gray-500 mb-3 flex items-center">
                          <Building className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                          <span className="truncate">{lead.contact_name}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                        <div className="flex items-center text-sm font-semibold text-green-600">
                          <DollarSign className="w-4 h-4 mr-0.5" />
                          {lead.value?.toLocaleString() || '0'}
                        </div>
                        <div className="text-xs text-gray-400 font-medium">
                          {new Date(lead.created_at).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short'
                          })}
                        </div>
                      </div>
                    </div>
                  ))}

                  {stageLeads.length === 0 && (
                    <div className="h-24 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                      <span className="text-sm text-gray-400 font-medium">No deals yet</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}

        </div>
      </div>
    </div>
  )
}