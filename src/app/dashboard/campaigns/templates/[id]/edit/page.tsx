export const instant = false

import { connection } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import EditTemplateForm from "./EditTemplateForm"

export default async function EditTemplatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  await connection()
  const supabase = await createClient()
  

  const { data: template } = await supabase
    .from("campaign_templates")
    .select("*")
    .eq("id", id)
    .single()

  if (!template) {
    notFound()
  }

  
  return <EditTemplateForm template={template} id={id} />
}