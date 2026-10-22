export const instant = false

import { connection } from "next/server"
import { getDashboardMetrics } from "./actions"
import { Users, UserSquare2, CheckSquare, Megaphone, ArrowUpRight, Plus, BarChart3 } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  await connection()

  const metrics = await getDashboardMetrics()

  return (
    <div className="min-h-full bg-gray-50 p-8 space-y-8">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back! Here is what is happening across your CRM.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            href="/dashboard/campaigns/new" 
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" /> New Campaign
          </Link>
          <Link 
            href="/dashboard/reports" 
            className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors"
          >
            <BarChart3 className="w-4 h-4" /> View Reports
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Total Leads</p>
            <p className="text-3xl font-bold text-gray-900">{metrics.totalLeads}</p>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <UserSquare2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Total Contacts</p>
            <p className="text-3xl font-bold text-gray-900">{metrics.totalContacts}</p>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Pending Tasks</p>
            <p className="text-3xl font-bold text-gray-900">{metrics.pendingTasks}</p>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <CheckSquare className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Total Campaigns</p>
            <p className="text-3xl font-bold text-gray-900">{metrics.totalCampaigns}</p>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <Megaphone className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 bg-white text-black rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Recent Campaigns</h2>
            <Link href="/dashboard/campaigns" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
              View all <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="divide-y divide-gray-100">
            {metrics.recentCampaigns.length > 0 ? (
              metrics.recentCampaigns.map((camp) => (
                <div key={camp.id} className="py-4 flex items-center justify-between first:pt-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-900">{camp.name}</p>
                    <p className="text-xs text-gray-500">
                      Created on {new Date(camp.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                    camp.status === 'sent' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {camp.status}
                  </span>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-sm text-gray-500">
                No campaigns created yet. Start by creating a new campaign.
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          <h2 className="text-lg font-bold text-gray-900">Quick Navigation</h2>
          <div className="space-y-3">
            <Link 
              href="/dashboard/campaigns/templates" 
              className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm font-medium text-gray-700">Email Templates</span>
              <ArrowUpRight className="w-4 h-4 text-gray-400" />
            </Link>
            <Link 
              href="/dashboard/campaigns/targets" 
              className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm font-medium text-gray-700">Manage Targets</span>
              <ArrowUpRight className="w-4 h-4 text-gray-400" />
            </Link>
            <Link 
              href="/dashboard/campaigns/target-lists" 
              className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm font-medium text-gray-700">Target Lists</span>
              <ArrowUpRight className="w-4 h-4 text-gray-400" />
            </Link>
            <Link 
              href="/dashboard/reports/sales" 
              className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm font-medium text-gray-900">Sales Reports</span>
              <ArrowUpRight className="w-4 h-4 text-gray-400" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  )
}