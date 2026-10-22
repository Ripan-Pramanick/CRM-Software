export const instant = false

import { connection } from "next/server"
import { getTargets } from "./actions"
import { TargetDrawer } from "./TargetDrawer"
import { TargetActions } from "./TargetActions"

export default async function TargetsPage() {
  await connection()
  
  const targets = await getTargets()

  return (
    <div className="min-h-full bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Targets</h1>
            <p className="text-sm text-gray-500">Manage your marketing and sales targets</p>
          </div>
          <TargetDrawer />
        </div>

        <div className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden flex flex-col min-h-[400px]">
          <div className="p-5 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">Targets</h2>
          </div>

          {targets && targets.length > 0 ? (
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-500">
                  <tr>
                    <th className="px-5 py-3 font-medium">Name</th>
                    <th className="px-5 py-3 font-medium">Company</th>
                    <th className="px-5 py-3 font-medium">Email</th>
                    <th className="px-5 py-3 font-medium">Phone</th>
                    <th className="px-5 py-3 font-medium">City</th>
                    <th className="px-5 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {targets.map((target) => (
                    <tr key={target.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="px-5 py-4 text-gray-900 font-medium">{target.first_name} {target.last_name}</td>
                      {/* target.company_name পরিবর্তন করে target.company করা হলো */}
                      <td className="px-5 py-4">{target.company || '-'}</td>
                      <td className="px-5 py-4 text-blue-600">{target.email || '-'}</td>
                      <td className="px-5 py-4">{target.phone || '-'}</td>
                      <td className="px-5 py-4">{target.city || '-'}</td>
                      <td className="px-5 py-4">
                        <TargetActions id={target.id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex-1 p-5 flex items-start text-sm text-gray-500">
              No targets found.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}