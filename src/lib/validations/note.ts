import { z } from "zod"

export const noteSchema = z.object({
  content: z.string().min(1),
  entity_type: z.enum(["lead", "contact"]),
  entity_id: z.string().uuid()
})

export type NoteInput = z.infer<typeof noteSchema>