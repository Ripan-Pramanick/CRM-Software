export const instant = false

import { connection } from "next/server"
import { getCampaigns } from "./actions"
import Link from "next/link"
import { ChevronDown, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react"

export default async function CampaignsPage() {
  await connection()
  
  const campaigns = await getCampaigns()

  return (
    <div className="min-h-full bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Campaigns</h1>
            <p className="text-sm text-gray-500">Manage your email campaigns</p>
          </div>
          <Link 
            href="/dashboard/campaigns/new" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors"
          >
            + New Campaign
          </Link>
        </div>

        <div className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden flex flex-col">
          <div className="p-5 border-b border-gray-200 space-y-4">
            <h2 className="text-lg font-bold text-gray-900">All Campaigns</h2>
            <div className="flex items-center gap-3">
              <input 
                type="text" 
                placeholder="Filter by name ..." 
                className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-64"
              />
              <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors">
                All Statuses
                <ChevronDown className="w-4 h-4 ml-2 text-gray-400" />
              </button>
            </div>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500">
                <tr>
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Scheduled At</th>
                  <th className="px-5 py-3 font-medium">Recipients</th>
                  <th className="px-5 py-3 font-medium">Template</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {campaigns && campaigns.length > 0 ? (
                  campaigns.map((campaign) => (
                    <tr key={campaign.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="px-5 py-4 text-gray-900 font-medium">{campaign.name}</td>
                      <td className="px-5 py-4 capitalize">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          campaign.status === 'sent' ? 'bg-green-100 text-green-700' : 
                          campaign.status === 'scheduled' ? 'bg-blue-100 text-blue-700' : 
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {campaign.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        {campaign.scheduled_at ? new Date(campaign.scheduled_at).toLocaleDateString() : '-'}
                      </td>
                      <td className="px-5 py-4">{campaign.recipient_count}</td>
                      <td className="px-5 py-4">{campaign.template?.name || '-'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-5 py-12 text-center text-gray-500">
                      No campaigns found.
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