export const instant = false

import { connection } from "next/server"
import { ChevronDown } from "lucide-react"
import { ReportControls } from "../ReportControls"

export default async function ActivityReportsPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    await connection()

    // URL from the filter range
    const resolvedParams = await searchParams
    const range = typeof resolvedParams.range === 'string' ? resolvedParams.range : 'Last 7 days'

    return (
        <div className="min-h-full bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">

                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Activity Reports</h1>
                    <p className="text-sm text-gray-500">Tasks and activities analytics</p>
                </div>

                {/* Ekhane ReportControls add kora holo */}
                <div className="flex flex-col gap-4">
                    <ReportControls />
                    
                   
                    <div>
                        <button className="flex items-center justify-between px-4 py-1.5 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 hover:text-gray-900 transition-colors min-w-[160px]">
                            Saved reports...
                            <ChevronDown className="w-4 h-4 ml-2" />
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