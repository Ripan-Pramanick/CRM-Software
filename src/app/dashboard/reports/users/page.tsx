export const instant = false

import { connection } from "next/server"
import { ReportControls } from "../ReportControls"

export default async function UserReportsPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    await connection()


    const resolvedParams = await searchParams
    const range = typeof resolvedParams.range === 'string' ? resolvedParams.range : 'Last 7 days'

    return (
        <div className="min-h-full bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">

                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">User Reports</h1>
                    <p className="text-sm text-gray-500">Team performance and activity analytics</p>
                </div>

                <ReportControls />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 h-32 flex flex-col justify-center">
                        <span className="text-sm font-medium text-gray-500 mb-2">Total Users</span>
                        <span className="text-3xl font-semibold text-gray-900">0</span>
                    </div>
                    <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 h-32 flex flex-col justify-center">
                        <span className="text-sm font-medium text-gray-500 mb-2">Active Users</span>
                        <span className="text-3xl font-semibold text-gray-900">0</span>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 min-h-[300px]">
                    <h3 className="text-sm font-bold text-gray-900 mb-6">User Activity</h3>
                    <div className="flex items-center justify-center h-48 text-gray-500 text-sm">
                        No data for this period
                    </div>
                </div>

                <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 min-h-[300px]">
                    <h3 className="text-sm font-bold text-gray-900 mb-6">Sales Performance by User</h3>
                    <div className="flex items-center justify-center h-48 text-gray-500 text-sm">
                        No data for this period
                    </div>
                </div>

            </div>
        </div>
    )
}