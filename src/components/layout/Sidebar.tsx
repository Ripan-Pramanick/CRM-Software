"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, User, Users, GitMerge, 
  CheckSquare, FileText, Settings, Megaphone, 
  LayoutTemplate, Target, ListPlus, BarChart3, 
  Briefcase
} from 'lucide-react'

export function Sidebar() {
  const pathname = usePathname()

  const mainNav = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Leads', href: '/dashboard/leads', icon: User },
    { name: 'Contacts', href: '/dashboard/contacts', icon: Users },
    { name: 'Pipeline', href: '/dashboard/pipeline', icon: GitMerge },
    { name: 'Tasks', href: '/dashboard/tasks', icon: CheckSquare },
    { name: 'Notes', href: '/dashboard/notes', icon: FileText },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ]

  const campaignsNav = [
    { name: 'All Campaigns', href: '/dashboard/campaigns', icon: Megaphone },
    { name: 'Templates', href: '/dashboard/campaigns/templates', icon: LayoutTemplate },
    { name: 'Targets', href: '/dashboard/campaigns/targets', icon: Target },
    { name: 'Target Lists', href: '/dashboard/campaigns/target-lists', icon: ListPlus },
  ]

  const reportsNav = [
    { name: 'Dashboard', href: '/dashboard/reports', icon: BarChart3 },
    { name: 'Sales', href: '/dashboard/reports/sales', icon: Briefcase },
    { name: 'Leads', href: '/dashboard/reports/leads', icon: Users },
    { name: 'Accounts', href: '/dashboard/reports/accounts', icon: LayoutDashboard },
    { name: 'Activity', href: '/dashboard/reports/activity', icon: FileText },
    { name: 'Campaigns', href: '/dashboard/reports/campaigns', icon: Megaphone },
    { name: 'Users', href: '/dashboard/reports/users', icon: Users },
  ]

  const renderLink = (item: any) => {
    let isActive = false
    if (item.href === '/dashboard') {
      isActive = pathname === '/dashboard'
    } else if (item.href === '/dashboard/reports') {
      isActive = pathname === '/dashboard/reports'
    } else {
      isActive = pathname === item.href || pathname.startsWith(item.href + '/')
    }

    return (
      <li key={item.name}>
        <Link 
          href={item.href}
          className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            isActive 
              ? 'bg-blue-50 text-blue-700' 
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <item.icon className={`w-[18px] h-[18px] mr-3 ${isActive ? 'text-blue-700' : 'text-slate-400'}`} strokeWidth={2} />
          {item.name}
        </Link>
      </li>
    )
  }

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen hidden md:flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-slate-100 shrink-0">
        <span className="text-xl font-bold text-[#0f172a] tracking-tight">CRM Pro</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-200 hover:[&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent pr-2">
        
        <ul className="space-y-0.5">
          {mainNav.map(renderLink)}
        </ul>

        <div>
          <h3 className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Campaigns
          </h3>
          <ul className="space-y-0.5">
            {campaignsNav.map(renderLink)}
          </ul>
        </div>

        <div>
          <h3 className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Reports
          </h3>
          <ul className="space-y-0.5">
            {reportsNav.map(renderLink)}
          </ul>
        </div>
        
      </div>
    </aside>
  )
}