export const instant = false

import { connection } from "next/server"
import { getDashboardKPIs } from "./actions"
import { ReportControls } from "./ReportControls"

export default async function ReportsDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  await connection()

  const resolvedParams = await searchParams
  const range = typeof resolvedParams.range === 'string' ? resolvedParams.range : 'Last 7 days'


  const kpis = await getDashboardKPIs(range)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount || 0)
  }

  return (
    <div className="min-h-full bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Reports</h1>
          <p className="text-sm text-gray-500">View your business reports</p>
        </div>

      
        <ReportControls />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          <KpiCard title="Total Revenue" value={formatCurrency(kpis?.totalRevenue)} />
          <KpiCard title="Pipeline Value" value={formatCurrency(kpis?.pipelineValue)} />
          <KpiCard title="New Leads" value={kpis?.newLeads?.toString() || "0"} />
          <KpiCard title="Conversion Rate" value={`${kpis?.conversionRate || 0}%`} />
          <KpiCard title="New Contacts" value={kpis?.newContacts?.toString() || "0"} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          <KpiCard title="Active Users" value={kpis?.activeUsers?.toString() || "0"} />
          <KpiCard title="Open Tasks" value={kpis?.openTasks?.toString() || "0"} />
          <KpiCard title="Campaigns Sent" value={kpis?.campaignsSent?.toString() || "0"} />
          <KpiCard title="New Accounts" value={kpis?.newAccounts?.toString() || "0"} />
          <KpiCard title="Contracts Expiring" value={kpis?.contractsExpiring?.toString() || "0"} />
        </div>

      </div>
    </div>
  )
}

function KpiCard({ title, value, trend, trendColor = "text-gray-500" }: { title: string; value: string; trend?: string; trendColor?: string; }) {
  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 flex flex-col justify-between h-28 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <span className="text-sm font-medium text-gray-500">{title}</span>
        {trend && <span className={`text-xs font-medium ${trendColor}`}>{trend}</span>}
      </div>
      <div className="text-2xl font-semibold text-gray-900 tracking-tight">
        {value}
      </div>
    </div>
  )
}