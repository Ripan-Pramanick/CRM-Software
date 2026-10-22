"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const name = formData.get("name") as string
  const company = formData.get("company") as string
  const avatar = formData.get("avatar") as string
  
  const { error } = await supabase.auth.updateUser({
    data: {
      name,
      company,
      avatar,
    }
  })

  if (error) throw new Error(error.message) 
 
  revalidatePath("/dashboard/profile")
}

export async function updatePassword(formData: FormData) {
  const supabase = await createClient()
  
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match")}

  const { error } = await supabase.auth.updateUser({
    password,
  })

  if (error) throw new Error(error.message)  
  
  revalidatePath("/dashboard/profile")
}