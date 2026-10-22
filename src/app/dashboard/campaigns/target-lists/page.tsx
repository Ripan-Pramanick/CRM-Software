export const instant = false

import { connection } from "next/server"
import { getTargetLists } from "./actions"
import { CreateListModal } from "./CreateListModal"

export default async function TargetListsPage() {
  await connection()

  const targetLists = await getTargetLists()

  return (
    <div className="min-h-full bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Target Lists</h1>
            <p className="text-sm text-gray-500">Manage your target lists for campaigns and outreach</p>
          </div>
          <CreateListModal />
        </div>

        <div className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden flex flex-col min-h-[400px]">
          <div className="p-5 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">Target Lists</h2>
          </div>

          {targetLists && targetLists.length > 0 ? (
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-500">
                  <tr>
                    <th className="px-5 py-3 font-medium">Name</th>
                    <th className="px-5 py-3 font-medium">Description</th>
                    <th className="px-5 py-3 font-medium">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {targetLists.map((list) => (
                    <tr key={list.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="px-5 py-4 text-gray-900 font-medium">{list.name}</td>
                      <td className="px-5 py-4">{list.description || '-'}</td>
                      <td className="px-5 py-4">
                        {new Date(list.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex-1 p-5 flex items-start text-sm text-gray-500">
              No target lists found.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}