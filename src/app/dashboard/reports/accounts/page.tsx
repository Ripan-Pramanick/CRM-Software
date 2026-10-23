export const instant = false

import { connection } from "next/server"
import { ArrowUpDown } from "lucide-react"
import { ReportControls } from "../ReportControls"

export default async function AccountsReportsPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    await connection()

    // URL theke filter range nibo
    const resolvedParams = await searchParams
    const range = typeof resolvedParams.range === 'string' ? resolvedParams.range : 'Last 7 days'

    return (
        <div className="min-h-full bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">

                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Accounts Reports</h1>
                    <p className="text-sm text-gray-500">Account growth and segmentation</p>
                </div>

                <ReportControls />

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