"use server"

import { createClient } from "@/lib/supabase/server"
import { taskSchema, type TaskInput } from "@/lib/validations/task"
import { revalidatePath } from "next/cache"

export async function getTasks() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("due_date", { ascending: true })

  if (error) throw new Error(error.message)
  return data
}

export async function createTask(input: TaskInput) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const validatedData = taskSchema.parse(input)

  const { error } = await supabase
    .from("tasks")
    .insert({
      ...validatedData,
      user_id: user.id
    })

  if (error) throw new Error(error.message)
  revalidatePath("/dashboard/tasks")
}

export async function toggleTaskCompletion(id: string, is_completed: boolean) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from("tasks")
    .update({ is_completed })
    .eq("id", id)

  if (error) throw new Error(error.message)
  revalidatePath("/dashboard/tasks")
}

export async function deleteTask(id: string) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", id)

  if (error) throw new Error(error.message)
  revalidatePath("/dashboard/tasks")
}