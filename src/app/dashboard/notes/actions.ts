"use server"

import { createClient } from "@/lib/supabase/server"
import { noteSchema, type NoteInput } from "@/lib/validations/note"
import { revalidatePath } from "next/cache"

export async function getNotes() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw new Error(error.message)
  return data
}

export async function createNote(input: NoteInput) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const validatedData = noteSchema.parse(input)

  const { error } = await supabase
    .from("notes")
    .insert({
      ...validatedData,
      user_id: user.id
    })

  if (error) throw new Error(error.message)
  revalidatePath("/dashboard/notes")
}

export async function deleteNote(id: string) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from("notes")
    .delete()
    .eq("id", id)

  if (error) throw new Error(error.message)
  revalidatePath("/dashboard/notes")
}