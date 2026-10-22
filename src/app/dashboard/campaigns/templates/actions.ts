"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function getTemplates() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from("campaign_templates")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw new Error(error.message)
  return data
}

export async function createTemplate(formData: FormData) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const subject_line = formData.get("subject_line") as string
  const body_html = formData.get("body_html") as string

  const { error } = await supabase
    .from("campaign_templates")
    .insert({
      name,
      description,
      subject_line,
      body_html,
      user_id: user.id
    })

  if (error) throw new Error(error.message)
  
  
  await supabase.from("notifications").insert({
    user_id: user.id,
    text: `New template '${name}' was created successfully.`
  })

  revalidatePath("/dashboard/campaigns/templates")
  redirect("/dashboard/campaigns/templates")
}

export async function generateEmailWithAI(prompt: string) {
 
  await new Promise((resolve) => setTimeout(resolve, 1500))

  if (!prompt) return ""

 
  return `<p>Hi {{first_name}},</p>
<p>I noticed that <strong>{{company}}</strong> is doing some great work, and I wanted to reach out.</p>
<p>Based on your focus on <em>${prompt}</em>, I believe our platform can help you achieve your goals faster and significantly improve your ROI.</p>
<ul>
  <li>Streamlined automation</li>
  <li>Advanced analytics</li>
  <li>24/7 dedicated support</li>
</ul>
<p>Would you be open to a quick 10-minute call next week to discuss how we can help?</p>
<p>Best regards,<br><strong>Sales Team</strong></p>`
}

export async function deleteTemplate(id: string) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from("campaign_templates")
    .delete()
    .eq("id", id)

  if (error) throw new Error(error.message)
  revalidatePath("/dashboard/campaigns/templates")
}

export async function updateTemplate(id: string, formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const subject_line = formData.get("subject_line") as string
  const body_html = formData.get("body_html") as string

  const { error } = await supabase
    .from("campaign_templates")
    .update({ name, description, subject_line, body_html })
    .eq("id", id)

  if (error) throw new Error(error.message)
 
  await supabase.from("notifications").insert({
    user_id: user.id,
    text: `Template '${name}' was updated successfully.`
  })

  revalidatePath("/dashboard/campaigns/templates")
  redirect("/dashboard/campaigns/templates")
}