"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Users, 
  Contact, 
  GitMerge, 
  CheckSquare, 
  FileText, 
  Settings, 
  Megaphone, 
  LayoutTemplate, 
  Target, 
  ListTodo, 
  BarChart3, 
  LineChart, 
  PieChart, 
  Building2, 
  Activity, 
  ShieldCheck 
} from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()

  const navigationGroups = [
    {
      title: null,
      items: [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard }
      ]
    },
    {
      title: "CUSTOMERS",
      items: [
        { name: "Leads", href: "/dashboard/leads", icon: Users },
        { name: "Contacts", href: "/dashboard/contacts", icon: Contact },
        { name: "Pipeline", href: "/dashboard/pipeline", icon: GitMerge }
      ]
    },
    {
      title: "OPERATIONS",
      items: [
        { name: "Tasks", href: "/dashboard/tasks", icon: CheckSquare },
        { name: "Notes", href: "/dashboard/notes", icon: FileText },
        
      ]
    },
    {
      title: "CAMPAIGNS",
      items: [
        { name: "Campaigns", href: "/dashboard/campaigns", icon: Megaphone },
        { name: "Templates", href: "/dashboard/campaigns/templates", icon: LayoutTemplate },
        { name: "Targets", href: "/dashboard/campaigns/targets", icon: Target },
        { name: "Target Lists", href: "/dashboard/campaigns/target-lists", icon: ListTodo }
      ]
    },
    {
      title: "REPORTS",
      items: [
        { name: "Dashboard", href: "/dashboard/reports", icon: BarChart3 },
        { name: "Sales", href: "/dashboard/reports/sales", icon: LineChart },
        { name: "Leads", href: "/dashboard/reports/leads", icon: PieChart },
        { name: "Accounts", href: "/dashboard/reports/accounts", icon: Building2 },
        { name: "Activity", href: "/dashboard/reports/activity", icon: Activity },
        { name: "Users", href: "/dashboard/reports/users", icon: ShieldCheck }
      ]
    },
    {
      title: "APP",
      items: [
        { name: "Settings", href: "/dashboard/settings", icon: Settings }
      ]
    },
  ]

  return (
    <div className="w-64 h-full bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
      
      {/* Brand / Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200 flex-shrink-0">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg leading-none">C</span>
          </div>
          <div>
            <h1 className="text-gray-900 font-bold text-lg leading-tight">CRM Pro</h1>
            <p className="text-gray-500 text-[10px] uppercase font-medium tracking-wider">Manage · Grow · Succeed</p>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar">
        <nav className="space-y-6">
          {navigationGroups.map((group, groupIdx) => (
            <div key={groupIdx}>
              {group.title && (
                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  {group.title}
                </h3>
              )}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href))
                  
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-blue-600" : "text-gray-400"}`} />
                      {item.name}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* System Status Footer (Optional, like in 2nd image) */}
      <div className="p-4 border-t border-gray-200 flex-shrink-0">
        <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 flex items-center gap-3">
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"></div>
          <div>
            <p className="text-xs font-semibold text-gray-800">System Online</p>
            <p className="text-[10px] text-gray-500">Last sync: Just now</p>
          </div>
        </div>
      </div>
      
    </div>
  )
}