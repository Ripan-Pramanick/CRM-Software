"use server"

import { createClient } from "@/lib/supabase/server"

function getDateThreshold(range: string) {
  const now = new Date()
  let thresholdDate = new Date()

  switch (range) {
    case 'Last 7 days':
      thresholdDate.setDate(now.getDate() - 7)
      break
    case 'Last 30 days':
      thresholdDate.setDate(now.getDate() - 30)
      break
    case 'Last 90 days':
      thresholdDate.setDate(now.getDate() - 90)
      break
    case 'Year to date':
      thresholdDate = new Date(now.getFullYear(), 0, 1)
      break
    case 'All time':
    default:
      return null
  }
  return thresholdDate.toISOString()
}

type LeadData = {
  value: string | number | null;
  status: string | null;
}

export async function getDashboardKPIs(range: string = 'Last 7 days') {
  const supabase = await createClient()

  const thresholdISOString = getDateThreshold(range)

  const applyDateFilter = (query: any, columnName: string = 'created_at') => {
    if (thresholdISOString) {
      return query.gte(columnName, thresholdISOString)
    }
    return query
  }

  const [
    { count: totalLeads },
    { count: totalContacts },
    { count: openTasks },
    { count: sentCampaigns },
    { data: leadsData }
  ] = await Promise.all([
    applyDateFilter(supabase.from("leads").select("*", { count: "exact", head: true })),
    applyDateFilter(supabase.from("contacts").select("*", { count: "exact", head: true })),
    applyDateFilter(supabase.from("tasks").select("*", { count: "exact", head: true }).eq("is_completed", false)),
    applyDateFilter(supabase.from("campaigns").select("*", { count: "exact", head: true }).eq("status", "sent")),
    applyDateFilter(supabase.from("leads").select("value, status"))
  ])

  const typedLeadsData = (leadsData as LeadData[]) || []

  const pipelineValue = typedLeadsData.reduce((acc: number, lead: LeadData) => acc + (Number(lead.value) || 0), 0)
  
  const totalRevenue = typedLeadsData
    .filter((lead: LeadData) => lead.status === 'won')
    .reduce((acc: number, lead: LeadData) => acc + (Number(lead.value) || 0), 0)

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