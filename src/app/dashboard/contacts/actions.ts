"use server"

import { createClient } from "@/lib/supabase/server"
import { contactSchema, type ContactInput } from "@/lib/validations/contact"
import { revalidatePath } from "next/cache"

export async function getContacts() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw new Error(error.message)
  return data
}

export async function createContact(input: ContactInput) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const validatedData = contactSchema.parse(input)

  const { error } = await supabase
    .from("contacts")
    .insert({
      ...validatedData,
      user_id: user.id
    })

  if (error) throw new Error(error.message)
  revalidatePath("/dashboard/contacts")
}

export async function deleteContact(id: string) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from("contacts")
    .delete()
    .eq("id", id)

  if (error) throw new Error(error.message)
  revalidatePath("/dashboard/contacts")
}