import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { prompt, context } = body

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const aiResponse = `Processed AI response for: ${prompt}`

    return NextResponse.json({ result: aiResponse })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}