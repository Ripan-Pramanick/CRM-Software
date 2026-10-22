export const instant = false

import { connection } from "next/server"
import { Calendar, Download, FileText, Save, Clock, ArrowUpDown } from "lucide-react"

export default async function AccountsReportsPage() {
    await connection()

    return (
        <div className="min-h-full bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">

                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Accounts Reports</h1>
                    <p className="text-sm text-gray-500">Account growth and segmentation</p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <div className="flex flex-wrap items-center gap-2">
                        {['Last 7 days', 'Last 30 days', 'Last 90 days', 'Year to date', 'All time'].map((filter) => (
                            <button
                                key={filter}
                                className="px-4 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 hover:text-gray-900 transition-colors"
                            >
                                {filter}
                            </button>
                        ))}
                        <button className="flex items-center px-4 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 hover:text-gray-900 transition-colors">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                            Custom
                        </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <button className="flex items-center px-4 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors">
                            <Download className="w-4 h-4 mr-2 text-gray-400" />
                            Export CSV
                        </button>
                        <button className="flex items-center px-4 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors">
                            <FileText className="w-4 h-4 mr-2 text-gray-400" />
                            Export PDF
                        </button>
                        <button className="flex items-center px-4 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors">
                            <Save className="w-4 h-4 mr-2 text-gray-400" />
                            Save
                        </button>
                        <button className="flex items-center px-4 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors">
                            <Clock className="w-4 h-4 mr-2 text-gray-400" />
                            Schedule
                        </button>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 min-h-[300px]">
                    <h3 className="text-sm font-bold text-gray-900 mb-6">New Accounts by Month</h3>
                    <div className="flex items-center justify-center h-48 text-gray-500 text-sm">
                        No data for this period
                    </div>
                </div>

                <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 min-h-[300px]">
                    <h3 className="text-sm font-bold text-gray-900 mb-6">Accounts by Industry</h3>
                    <div className="flex items-center justify-center h-48 text-gray-500 text-sm">
                        No data for this period
                    </div>
                </div>

                <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-0 overflow-hidden">
                    <div className="p-5 border-b border-gray-200">
                        <h3 className="text-sm font-bold text-gray-900">Top Accounts by Revenue</h3>
                    </div>
                    <div className="w-full">
                        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-gray-50">
                            <span className="text-xs font-semibold text-gray-500">Name</span>
                            <span className="text-xs font-semibold text-gray-500 flex items-center gap-1 cursor-pointer hover:text-gray-900 transition-colors">
                                Value <ArrowUpDown className="w-3 h-3" />
                            </span>
                        </div>
                        <div className="flex items-center justify-center h-32 text-gray-500 text-sm bg-white">
                            No data for this period
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 min-h-[300px]">
                    <h3 className="text-sm font-bold text-gray-900 mb-6">Accounts by Size</h3>
                    <div className="flex items-center justify-center h-48 text-gray-500 text-sm">
                        No data for this period
                    </div>
                </div>

            </div>
        </div>
    )
}