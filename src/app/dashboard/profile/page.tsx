export const instant = false

import { connection } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { updateProfile, updatePassword } from "./actions"
import { User, Lock, Sparkles, Shield, Mail, KeyRound, CheckCircle2, AlertCircle } from "lucide-react"

export default async function ProfilePage() {
  await connection()

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const meta = user.user_metadata || {}
  const name = meta.name || ""
  const company = meta.company || ""
  const avatar = meta.avatar || ""
  const role = meta.role || "Member"
  const joinedDate = new Date(user.created_at).toLocaleDateString()

  const aiConfigured = !!process.env.GEMINI_API_KEY
  const aiModel = aiConfigured ? "Gemini 1.5 Flash" : null

  return (
    <div className="min-h-full bg-gray-50 p-6">
      <div className="space-y-6 max-w-3xl text-gray-900 mt-4 mx-auto">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your personal information and security.</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gray-50/50">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                <User className="h-5 w-5 text-blue-700" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Personal Info</h2>
                <p className="text-sm text-gray-500">Update your account details.</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold overflow-hidden border-2 border-white shadow-sm">
                {avatar ? <img src={avatar} alt={name} className="h-full w-full object-cover" /> : name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>

            <form action={updateProfile} className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full name</label>
                  <input name="name" defaultValue={name} required className="block w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Company</label>
                  <input name="company" defaultValue={company} className="block w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input value={user.email} disabled readOnly className="block w-full border border-gray-200 rounded-md py-2 pl-9 pr-3 bg-gray-50 text-gray-500 cursor-not-allowed shadow-sm text-sm" />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Avatar URL</label>
                  <input name="avatar" defaultValue={avatar} placeholder="https://example.com/photo.jpg" className="block w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-100">
                <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 text-sm font-medium shadow-sm transition-colors">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Security Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gray-50/50">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                <Lock className="h-5 w-5 text-blue-700" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Security</h2>
                <p className="text-sm text-gray-500">Update your password.</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <form action={updatePassword} className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">New password</label>
                  <div className="relative">
                    <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input name="password" type="password" required minLength={6} placeholder="Min. 6 characters" className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-9 pr-3 text-sm text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm new password</label>
                  <input name="confirmPassword" type="password" required className="block w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-100">
                <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 text-sm font-medium shadow-sm transition-colors">
                  Update password
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* AI Integration Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gray-50/50">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                <Sparkles className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">AI Integration</h2>
                <p className="text-sm text-gray-500">Google Gemini powered analytics.</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              {aiConfigured ? (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  Connected
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                  <AlertCircle className="w-3.5 h-3.5 mr-1" />
                  Not configured
                </span>
              )}

              {aiModel && (
                <span className="rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 font-mono text-xs font-medium text-gray-600">
                  {aiModel}
                </span>
              )}
            </div>
            
            {aiConfigured && (
              <p className="text-sm text-gray-600 leading-relaxed">
                AI features are currently active. Email drafts, translations, and insights are generated using <span className="font-semibold text-gray-900">{aiModel}</span>.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}