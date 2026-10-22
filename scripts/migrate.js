import mongoose from "mongoose"
import { createClient } from "@supabase/supabase-js"
import { v4 as uuidv4 } from "uuid"

const MONGO_URI = process.env.MONGO_URI
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
const idMap = new Map()

async function migrateData() {
  await mongoose.connect(MONGO_URI)
  
  const users = await mongoose.connection.db.collection("users").find().toArray()
  
  for (const user of users) {
    const newId = uuidv4()
    idMap.set(user._id.toString(), newId)
    
    await supabase.auth.admin.createUser({
      id: newId,
      email: user.email,
      password: user.password || "TempPassword123!",
      email_confirm: true
    })
    
    await supabase.from("profiles").insert({
      id: newId,
      first_name: user.firstName || "",
      last_name: user.lastName || "",
      role: user.role || "user"
    })
  }
  
  const leads = await mongoose.connection.db.collection("leads").find().toArray()
  
  for (const lead of leads) {
    const newLeadId = uuidv4()
    idMap.set(lead._id.toString(), newLeadId)
    
    await supabase.from("leads").insert({
      id: newLeadId,
      user_id: idMap.get(lead.user?.toString()),
      company_name: lead.companyName || "Unknown",
      contact_name: lead.contactName || "",
      email: lead.email || "",
      phone: lead.phone || "",
      status: lead.status || "new",
      value: lead.value || 0
    })
  }

  const contacts = await mongoose.connection.db.collection("contacts").find().toArray()
  
  for (const contact of contacts) {
    const newContactId = uuidv4()
    idMap.set(contact._id.toString(), newContactId)
    
    await supabase.from("contacts").insert({
      id: newContactId,
      user_id: idMap.get(contact.user?.toString()),
      first_name: contact.firstName || "",
      last_name: contact.lastName || "",
      email: contact.email || "",
      phone: contact.phone || "",
      job_title: contact.jobTitle || "",
      company: contact.company || ""
    })
  }

  process.exit(0)
}

migrateData()