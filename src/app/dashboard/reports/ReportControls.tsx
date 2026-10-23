"use client"

import { Calendar, Download, FileText, Save, Clock } from "lucide-react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"

export function ReportControls() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // URL theke current filter nibo, default thakbe 'Last 7 days'
  const activeFilter = searchParams.get('range') || 'Last 7 days'

  const timeFilters = ['Last 7 days', 'Last 30 days', 'Last 90 days', 'Year to date', 'All time']

  // Button click korle URL update hobe
  const handleFilterChange = (filter: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('range', filter)
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-4 pt-2">
      {/* Time Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {timeFilters.map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilterChange(filter)}
            className={`px-4 py-1.5 text-sm font-medium border rounded-md transition-colors ${
              activeFilter === filter
                ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-sm'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {filter}
          </button>
        ))}
        <button 
          onClick={() => handleFilterChange('Custom')}
          className={`flex items-center px-4 py-1.5 text-sm font-medium border rounded-md transition-colors ${
            activeFilter === 'Custom'
              ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-sm'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          <Calendar className="w-4 h-4 mr-2 text-current" />
          Custom
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <button 
          onClick={() => alert('Exporting CSV...')}
          className="flex items-center px-4 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm"
        >
          <Download className="w-4 h-4 mr-2 text-gray-500" />
          Export CSV
        </button>
        <button 
          onClick={() => alert('Generating PDF...')}
          className="flex items-center px-4 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm"
        >
          <FileText className="w-4 h-4 mr-2 text-gray-500" />
          Export PDF
        </button>
        <button className="flex items-center px-4 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm">
          <Save className="w-4 h-4 mr-2 text-gray-500" />
          Save
        </button>
        <button className="flex items-center px-4 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm">
          <Clock className="w-4 h-4 mr-2 text-gray-500" />
          Schedule
        </button>
      </div>
    </div>
  )
}