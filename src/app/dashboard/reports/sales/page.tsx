export const instant = false

import { connection } from "next/server"
import { ReportControls } from "../ReportControls"

export default async function SalesReportsPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    await connection()

    // URL theke filter range nibo (Pore jokhon data fetch korbe tokhon ei 'range' variable ta action a pass korbe)
    const resolvedParams = await searchParams
    const range = typeof resolvedParams.range === 'string' ? resolvedParams.range : 'Last 7 days'

    return (
        <div className="min-h-full bg-white text-gray-900 p-6">
            <div className="max-w-7xl mx-auto space-y-6">

                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Sales Reports</h1>
                    <p className="text-sm text-gray-900">Revenue, pipeline, and deal analytics</p>
                </div>
                <ReportControls />

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