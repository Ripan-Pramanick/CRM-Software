"use server"

import { createClient } from "@/lib/supabase/server"

export async function getDashboardMetrics() {
  const supabase = await createClient()

  const [
    { count: totalLeads },
    { count: totalContacts },
    { count: pendingTasks },
    { count: totalCampaigns },
    { data: recentCampaigns }
  ] = await Promise.all([
    supabase.from("leads").select("*", { count: "exact", head: true }),
    supabase.from("contacts").select("*", { count: "exact", head: true }),
    supabase.from("tasks").select("*", { count: "exact", head: true }).eq("is_completed", false),
    supabase.from("campaigns").select("*", { count: "exact", head: true }),
    supabase.from("campaigns").select("*").order("created_at", { ascending: false }).limit(4)
  ])

  return {
    totalLeads: totalLeads || 0,
    totalContacts: totalContacts || 0,
    pendingTasks: pendingTasks || 0,
    totalCampaigns: totalCampaigns || 0,
    recentCampaigns: recentCampaigns || []
  }
}