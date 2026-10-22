import { z } from "zod"

export const leadSchema = z.object({
  company_name: z.string().min(1),
  contact_name: z.string().optional().or(z.literal("")),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  status: z.enum(["new", "contacted", "qualified", "proposal", "won", "lost"]).default("new"),
  value: z.coerce.number().min(0).default(0)
})

export type LeadInput = z.infer<typeof leadSchema>