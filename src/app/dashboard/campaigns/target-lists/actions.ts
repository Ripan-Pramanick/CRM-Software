"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getTargetLists() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from("target_lists")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw new Error(error.message)
  return data
}

export async function createTargetList(formData: FormData) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const name = formData.get("name") as string
  const description = formData.get("description") as string

  const { error } = await supabase
    .from("target_lists")
    .insert({
      name,
      description,
      user_id: user.id
    })

  if (error) throw new Error(error.message)
  
  revalidatePath("/dashboard/campaigns/target-lists")
}