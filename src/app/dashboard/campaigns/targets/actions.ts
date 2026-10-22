"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function getTargets() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw new Error(error.message)
  return data
}

export async function createTarget(formData: FormData) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const payload = {
    user_id: user.id,
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    email: formData.get("email") as string || null,
    phone: formData.get("mobile_phone") as string || null,
    office_phone: formData.get("office_phone") as string || null,
    job_title: formData.get("position") as string || null,
    company: formData.get("company") as string || null,
    company_website: formData.get("company_website") as string || null,
    personal_website: formData.get("personal_website") as string || null,
    linkedin_url: formData.get("linkedin") as string || null,
    x_url: formData.get("x_twitter") as string || null,
    instagram_url: formData.get("instagram") as string || null,
    facebook_url: formData.get("facebook") as string || null,
    personal_email: formData.get("personal_email") as string || null,
    company_email: formData.get("company_email") as string || null,
    company_phone: formData.get("company_phone") as string || null,
    city: formData.get("city") as string || null,
    country: formData.get("country") as string || null,
    industry: formData.get("industry") as string || null,
    employees: formData.get("employees") as string || null,
    description: formData.get("description") as string || null,
  }

  const { error } = await supabase.from("contacts").insert(payload)

  if (error) throw new Error(error.message)

  // Create Notification
  await supabase.from("notifications").insert({
    user_id: user.id,
    text: `New target ${payload.first_name} ${payload.last_name} was added successfully.`
  })
  
  revalidatePath("/dashboard/campaigns/targets")
}

export async function deleteTarget(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const { error } = await supabase
    .from("contacts")
    .delete()
    .eq("id", id)

  if (error) throw new Error(error.message)
  
  // Delete Notification
  if (user) {
    await supabase.from("notifications").insert({
      user_id: user.id,
      text: `A target was deleted from your list.`
    })
  }
  
  revalidatePath("/dashboard/campaigns/targets")
}

export async function updateTarget(id: string, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")
  
  const payload = {
    user_id: user.id,
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    email: formData.get("email") as string || null,
    phone: formData.get("mobile_phone") as string || null,
    office_phone: formData.get("office_phone") as string || null,
    job_title: formData.get("position") as string || null,
    company: formData.get("company") as string || null,
    company_website: formData.get("company_website") as string || null,
    personal_website: formData.get("personal_website") as string || null,
    linkedin_url: formData.get("linkedin") as string || null,
    x_url: formData.get("x_twitter") as string || null,
    city: formData.get("city") as string || null,
    country: formData.get("country") as string || null,
    industry: formData.get("industry") as string || null,
    employees: formData.get("employees") as string || null,
    description: formData.get("description") as string || null,
  }

  Object.keys(payload).forEach(key => {
    if (payload[key as keyof typeof payload] === undefined) {
      delete payload[key as keyof typeof payload];
    }
  });

  const { error } = await supabase
    .from("contacts")
    .update(payload)
    .eq("id", id)

  if (error) throw new Error(error.message)
  
  // Update Notification
  await supabase.from("notifications").insert({
    user_id: user.id,
    text: `Target ${payload.first_name} ${payload.last_name} was updated successfully.`
  })
  
  revalidatePath("/dashboard/campaigns/targets")
  redirect("/dashboard/campaigns/targets")
}