"use client"

import { useState, useEffect, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter, usePathname } from "next/navigation"
import { LogOut, Menu, User, Bell, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export function TopNav() {
  const router = useRouter()
  const pathname = usePathname()
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState<any[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  const fetchNotifications = useCallback(async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(15)

    if (!error && data) {
      setNotifications(data)
      setUnreadCount(data.filter((n: any) => !n.read).length)
    }
  }, [])

  useEffect(() => {
    fetchNotifications()
  }, [pathname, fetchNotifications])

  useEffect(() => {
    let isMounted = true
    const supabase = createClient()
    let channel: any = null

    const setupRealtime = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user || !isMounted) return

      const channelName = `realtime-notifications-${user.id}-${Date.now()}`

      channel = supabase
        .channel(channelName)
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "notifications" },
          (payload) => {
            if (!isMounted) return
            const newNotif = payload.new as any
            if (newNotif.user_id === user.id) {
              setNotifications((prev) => [newNotif, ...prev])
              setUnreadCount((prev) => prev + 1)
            }
          }
        )
        .subscribe()
    }

    setupRealtime()

    return () => {
      isMounted = false
      if (channel) {
        supabase.removeChannel(channel)
      }
    }
  }, [])

  const toggleNotifications = () => {
    if (!showNotifications) {
      fetchNotifications()
    }
    setShowNotifications((prev) => !prev)
  }

  const markAllAsRead = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase
      .from("notifications")
      .update({ read: true })
      .eq("user_id", user.id)
      .eq("read", false)

    if (!error) {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
      setUnreadCount(0)
    }
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/login")
    router.refresh()
  }

  const formatTime = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 relative z-20">
      <button className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors">
        <Menu className="h-6 w-6" />
      </button>

      <div className="flex-1" />

      <div className="flex items-center gap-2 sm:gap-4 relative">
        {/* Notification Bell & Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={toggleNotifications}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors relative"
            title="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-50 transform origin-top-right transition-all">
              
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 bg-gray-50/75">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllAsRead}
                    className="flex items-center gap-1 text-xs text-blue-600 font-medium hover:text-blue-700 hover:underline transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Mark all as read
                  </button>
                )}
              </div>

              {/* Notification List */}
              <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
                {notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-4 transition-colors hover:bg-gray-50/80 flex gap-3 items-start ${
                        !notif.read ? "bg-blue-50/40 border-l-4 border-blue-600" : "bg-white"
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-800 font-medium leading-relaxed">
                          {notif.text}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {formatTime(notif.created_at)}
                        </p>
                      </div>
                      {!notif.read && (
                        <span className="h-2 w-2 bg-blue-600 rounded-full flex-shrink-0 mt-1.5"></span>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="py-10 text-center text-gray-400 text-sm">
                    No notifications yet
                  </div>
                )}
              </div>

            </div>
          )}
        </div>

        <div className="h-6 w-px bg-gray-300 mx-1 hidden sm:block"></div>

        <Link href="/dashboard/profile" className="flex items-center gap-2 p-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
          <User className="h-5 w-5" />
          <span className="hidden sm:inline">Profile</span>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 p-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  )
}