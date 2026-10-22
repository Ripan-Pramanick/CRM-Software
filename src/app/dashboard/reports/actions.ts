"use server"

import { createClient } from "@/lib/supabase/server"

export async function getDashboardKPIs() {
  const supabase = await createClient()


  const [
    { count: totalLeads },
    { count: totalContacts },
    { count: openTasks },
    { count: sentCampaigns },
    { data: leadsData }
  ] = await Promise.all([
    supabase.from("leads").select("*", { count: "exact", head: true }),
    supabase.from("contacts").select("*", { count: "exact", head: true }),
    supabase.from("tasks").select("*", { count: "exact", head: true }).eq("is_completed", false),
    supabase.from("campaigns").select("*", { count: "exact", head: true }).eq("status", "sent"),
    supabase.from("leads").select("value, status")
  ])

  
  const pipelineValue = leadsData?.reduce((acc, lead) => acc + (Number(lead.value) || 0), 0) || 0
  

  const totalRevenue = leadsData
    ?.filter(lead => lead.status === 'won')
    .reduce((acc, lead) => acc + (Number(lead.value) || 0), 0) || 0

  return {
    totalRevenue,
    pipelineValue,
    newLeads: totalLeads || 0,
    conversionRate: 0, 
    newContacts: totalContacts || 0,
    activeUsers: 1, 
    openTasks: openTasks || 0,
    campaignsSent: sentCampaigns || 0,
    newAccounts: 0, 
    contractsExpiring: 0
  }
}