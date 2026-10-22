export const instant = false

import { connection } from "next/server"
import { Calendar, Download, FileText, Save, Clock, ChevronDown } from "lucide-react"

export default async function ActivityReportsPage() {
    await connection()

    return (
        <div className="min-h-full bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">

                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Activity Reports</h1>
                    <p className="text-sm text-gray-500">Tasks and activities analytics</p>
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
                        <button className="flex items-center justify-between px-4 py-1.5 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 hover:text-gray-900 transition-colors min-w-[160px] ml-2">
                            Saved reports...
                            <ChevronDown className="w-4 h-4 ml-2" />
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

                <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 h-32 flex flex-col justify-center">
                    <span className="text-sm font-medium text-gray-500 mb-2">Overdue Tasks</span>
                    <span className="text-3xl font-semibold text-red-600">0</span>
                </div>

                <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 min-h-[300px] flex flex-col">
                    <h3 className="text-sm font-bold text-gray-900 mb-6">Tasks Created vs Completed</h3>
                    <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
                        No data for this period
                    </div>
                </div>

                <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 min-h-[300px] flex flex-col">
                    <h3 className="text-sm font-bold text-gray-900 mb-6">Tasks by Assignee</h3>
                    <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
                        No data for this period
                    </div>
                </div>

                <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 min-h-[400px] flex flex-col">
                    <h3 className="text-sm font-bold text-gray-900 mb-6">Activities by Type</h3>
                    <div className="flex-1 flex items-end gap-16 px-10 pb-4">
                        <div className="w-64 h-32 bg-blue-500 rounded-sm"></div>
                        <div className="w-96 h-56 bg-blue-500 rounded-sm"></div>
                    </div>
                </div>

            </div>
        </div>
    )
}