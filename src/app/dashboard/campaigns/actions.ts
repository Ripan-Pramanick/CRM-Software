"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function getCampaigns() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from("campaigns")
    .select(`
      *,
      template:campaign_templates(name)
    `)
    .order("created_at", { ascending: false })

  if (error) throw new Error(error.message)
  return data
}

export async function createNewCampaign(formData: FormData) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const name = formData.get("name") as string
  const template_id = formData.get("template_id") as string
  const target_list_id = formData.get("target_list_id") as string
  const scheduled_at = formData.get("scheduled_at") as string

  const { data: campaign, error } = await supabase
    .from("campaigns")
    .insert({
      name,
      template_id: template_id || null,
      status: scheduled_at ? "scheduled" : "draft",
      scheduled_at: scheduled_at || null,
      user_id: user.id
    })
    .select()
    .single()

  if (error) throw new Error(error.message)

  if (target_list_id && campaign) {
    const { error: mappingError } = await supabase
      .from("campaign_target_lists")
      .insert({
        campaign_id: campaign.id,
        list_id: target_list_id
      })
    
    if (mappingError) throw new Error(mappingError.message)
  }

  revalidatePath("/dashboard/campaigns")
  redirect("/dashboard/campaigns")
}