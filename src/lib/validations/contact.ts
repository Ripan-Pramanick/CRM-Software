import { z } from "zod"

export const contactSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  job_title: z.string().optional().or(z.literal("")),
  company: z.string().optional().or(z.literal(""))
})

export type ContactInput = z.infer<typeof contactSchema>