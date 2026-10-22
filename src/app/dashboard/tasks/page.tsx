export const instant = false

import { getTasks } from "./actions"
import { connection } from "next/server"
import { CheckCircle2, Circle, Calendar, AlertCircle } from "lucide-react"
import { CreateTaskModal } from "@/components/tasks/CreateTaskModal" 

export default async function TasksPage() {
  await connection()

  const tasks = await getTasks()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
      
        <CreateTaskModal />
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {tasks.map((task) => {
            const isOverdue = task.due_date && new Date(task.due_date) < new Date() && !task.is_completed

            return (
              <li key={task.id} className={`p-4 hover:bg-gray-50 transition-colors ${task.is_completed ? 'opacity-75' : ''}`}>
                <div className="flex items-start space-x-4">
                  <button className="mt-1 flex-shrink-0 focus:outline-none">
                    {task.is_completed ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-400 hover:text-blue-500" />
                    )}
                  </button>
                  
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${task.is_completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                      {task.title}
                    </p>
                    
                    {task.description && (
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                        {task.description}
                      </p>
                    )}
                    
                    <div className="mt-2 flex items-center space-x-4 text-xs font-medium">
                      {task.due_date && (
                        <div className={`flex items-center ${isOverdue ? 'text-red-600' : 'text-gray-500'}`}>
                          {isOverdue ? <AlertCircle className="w-3.5 h-3.5 mr-1" /> : <Calendar className="w-3.5 h-3.5 mr-1" />}
                          {new Date(task.due_date).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </div>
                      )}
                      
                      {task.priority && (
                        <span className={`px-2 py-0.5 rounded-full capitalize
                          ${task.priority === 'high' ? 'bg-red-100 text-red-700' : 
                            task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 
                            'bg-green-100 text-green-700'}`}
                        >
                          {task.priority}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
          
          {tasks.length === 0 && (
            <li className="p-8 text-center text-gray-500">
              No tasks found. Get some rest!
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}