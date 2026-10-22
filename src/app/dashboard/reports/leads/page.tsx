export const instant = false

import { connection } from "next/server"
import { Calendar, Download, FileText, Save, Clock, ArrowUpDown } from "lucide-react"

export default async function LeadsReportsPage() {
    await connection()

    return (
        <div className="min-h-full bg-white text-gray-900 p-6">
            <div className="max-w-7xl mx-auto space-y-6">

                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Leads & Contacts Reports</h1>
                    <p className="text-sm text-gray-900">Lead generation and contact analytics</p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <div className="flex flex-wrap items-center gap-2">
                        {['Last 7 days', 'Last 30 days', 'Last 90 days', 'Year to date', 'All time'].map((filter) => (
                            <button
                                key={filter}
                                className="px-4 py-1.5 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
                            >
                                {filter}
                            </button>
                        ))}
                        <button className="flex items-center px-4 py-1.5 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors">
                            <Calendar className="w-4 h-4 mr-2 text-gray-900" />
                            Custom
                        </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <button className="flex items-center px-4 py-1.5 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors">
                            <Download className="w-4 h-4 mr-2 text-gray-900" />
                            Export CSV
                        </button>
                        <button className="flex items-center px-4 py-1.5 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors">
                            <FileText className="w-4 h-4 mr-2 text-gray-900" />
                            Export PDF
                        </button>
                        <button className="flex items-center px-4 py-1.5 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors">
                            <Save className="w-4 h-4 mr-2 text-gray-900" />
                            Save
                        </button>
                        <button className="flex items-center px-4 py-1.5 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors">
                            <Clock className="w-4 h-4 mr-2 text-gray-900" />
                            Schedule
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 h-32 flex flex-col justify-center">
                        <span className="text-sm font-medium text-gray-900 mb-2">Conversion Rate</span>
                        <span className="text-3xl font-semibold text-gray-900">0%</span>
                        <span className="text-xs text-gray-900 mt-1">0 / 0 converted</span>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 min-h-[300px]">
                    <h3 className="text-sm font-bold text-gray-900 mb-6">New Leads by Month</h3>
                    <div className="flex items-center justify-center h-48 text-gray-900 text-sm">
                        No data for this period
                    </div>
                </div>

                <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 min-h-[300px]">
                    <h3 className="text-sm font-bold text-gray-900 mb-6">Lead Sources</h3>
                    <div className="flex items-center justify-center h-48 text-gray-900 text-sm">
                        No data for this period
                    </div>
                </div>

                <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 min-h-[300px]">
                    <h3 className="text-sm font-bold text-gray-900 mb-6">New Contacts by Month</h3>
                    <div className="flex items-center justify-center h-48 text-gray-900 text-sm">
                        No data for this period
                    </div>
                </div>

                <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-0 overflow-hidden">
                    <div className="p-5 border-b border-gray-200">
                        <h3 className="text-sm font-bold text-gray-900">Contacts by Account</h3>
                    </div>
                    <div className="w-full">
                        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-gray-50">
                            <span className="text-xs font-semibold text-gray-900">Name</span>
                            <span className="text-xs font-semibold text-gray-900 flex items-center gap-1 cursor-pointer hover:text-blue-600">
                                Value <ArrowUpDown className="w-3 h-3 text-gray-900" />
                            </span>
                        </div>
                        <div className="flex items-center justify-center h-32 text-gray-900 text-sm">
                            No data for this period
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}