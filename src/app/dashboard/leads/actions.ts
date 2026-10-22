"use server"

import { createClient } from "@/lib/supabase/server"
import { leadSchema, type LeadInput } from "@/lib/validations/lead"
import { revalidatePath } from "next/cache"

export async function getLeads() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw new Error(error.message)
  return data
}

export async function createLead(input: LeadInput) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const validatedData = leadSchema.parse(input)

  const { error } = await supabase
    .from("leads")
    .insert({
      ...validatedData,
      user_id: user.id
    })

  if (error) throw new Error(error.message)
  revalidatePath("/dashboard/leads")
  revalidatePath("/dashboard/pipeline")
}

export async function updateLeadStatus(id: string, status: string) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from("leads")
    .update({ status })
    .eq("id", id)

  if (error) throw new Error(error.message)
  revalidatePath("/dashboard/leads")
  revalidatePath("/dashboard/pipeline")
}