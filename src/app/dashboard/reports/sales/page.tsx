export const instant = false

import { connection } from "next/server"
import { Calendar, Download, FileText, Save, Clock } from "lucide-react"

export default async function SalesReportsPage() {
    await connection()

    return (
        <div className="min-h-full bg-white text-gray-900 p-6">
            <div className="max-w-7xl mx-auto space-y-6">

                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Sales Reports</h1>
                    <p className="text-sm text-gray-900">Revenue, pipeline, and deal analytics</p>
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 h-32 flex flex-col justify-center">
                        <span className="text-sm font-medium text-gray-900 mb-2">Total Revenue</span>
                        <span className="text-3xl font-semibold text-gray-900">0 € EUR</span>
                    </div>
                    <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 h-32 flex flex-col justify-center">
                        <span className="text-sm font-medium text-gray-900 mb-2">Pipeline Value</span>
                        <span className="text-3xl font-semibold text-gray-900">0 € EUR</span>
                    </div>
                    <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 h-32 flex flex-col justify-center">
                        <span className="text-sm font-medium text-gray-900 mb-2">Average Deal Size</span>
                        <span className="text-3xl font-semibold text-gray-900">0 € EUR</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 h-32 flex flex-col justify-center">
                        <span className="text-sm font-medium text-gray-900 mb-2">Win Rate</span>
                        <span className="text-3xl font-semibold text-gray-900">0%</span>
                    </div>
                    <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 h-32 flex flex-col justify-center">
                        <span className="text-sm font-medium text-gray-900 mb-2">Avg. Sales Cycle</span>
                        <span className="text-3xl font-semibold text-gray-900">0 days</span>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 min-h-[300px]">
                    <h3 className="text-sm font-bold text-gray-900 mb-6">Opportunities by Sales Stage</h3>
                    <div className="flex items-center justify-center h-48 text-gray-900 text-sm">
                        No data for this period
                    </div>
                </div>

                <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 min-h-[300px]">
                    <h3 className="text-sm font-bold text-gray-900 mb-6">Opportunities by Month</h3>
                    <div className="flex items-center justify-center h-48 text-gray-900 text-sm">
                        No data for this period
                    </div>
                </div>

            </div>
        </div>
    )
}