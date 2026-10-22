import { z } from "zod"

export const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional().or(z.literal("")),
  due_date: z.string().optional().or(z.literal("")),
  is_completed: z.boolean().default(false),
  related_lead_id: z.string().uuid().optional().or(z.literal("")),
  related_contact_id: z.string().uuid().optional().or(z.literal(""))
})

export type TaskInput = z.infer<typeof taskSchema>