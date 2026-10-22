export const instant = false

import { connection } from "next/server"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { updateTarget } from "../../actions"
import { notFound } from "next/navigation"

export default async function EditTargetPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    await connection()

    const supabase = await createClient()

    // এখানে targets এর বদলে contacts থেকে ডেটা ফেচ করা হচ্ছে
    const { data: target } = await supabase
        .from("contacts")
        .select("*")
        .eq("id", id)
        .single()

    if (!target) {
        notFound()
    }

    const updateTargetWithId = updateTarget.bind(null, id)

    const labelClass = "block text-sm font-medium text-gray-700 mb-1.5"
    const inputClass = "w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-shadow"

    return (
        <div className="min-h-full bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto space-y-6 mt-4">

                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Edit Target</h1>
                    <p className="text-sm text-gray-500">Update information for this target.</p>
                </div>

                <form action={updateTargetWithId} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="p-6 space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelClass}>First name *</label>
                                <input name="first_name" required defaultValue={target.first_name} className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Last name *</label>
                                <input name="last_name" required defaultValue={target.last_name} className={inputClass} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelClass}>Email</label>
                                <input name="email" type="email" defaultValue={target.email || ""} className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Mobile phone</label>
                                <input name="mobile_phone" defaultValue={target.phone || ""} className={inputClass} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelClass}>Office phone</label>
                                <input name="office_phone" defaultValue={target.office_phone || ""} className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Position</label>
                                {/* database-এ job_title নামে সেভ হচ্ছে, তাই এখানে target.job_title */}
                                <input name="position" defaultValue={target.job_title || ""} className={inputClass} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelClass}>Company</label>

                                <input name="company" defaultValue={target.company || ""} className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Company website</label>
                                <input name="company_website" defaultValue={target.company_website || ""} className={inputClass} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelClass}>Personal website</label>
                                <input name="personal_website" defaultValue={target.personal_website || ""} className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>City</label>
                                <input name="city" defaultValue={target.city || ""} className={inputClass} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelClass}>LinkedIn</label>
                                <input name="linkedin" defaultValue={target.linkedin_url || ""} className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>X (Twitter)</label>
                                <input name="x_twitter" defaultValue={target.x_url || ""} className={inputClass} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelClass}>Industry</label>
                                <input name="industry" defaultValue={target.industry || ""} className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Employees</label>
                                <input name="employees" defaultValue={target.employees || ""} className={inputClass} />
                            </div>
                        </div>

                        <div>
                            <label className={labelClass}>Description</label>
                            <textarea
                                name="description"
                                rows={3}
                                defaultValue={target.description || ""}
                                className={`${inputClass} resize-none`}
                            />
                        </div>

                    </div>

                    <div className="bg-gray-50 px-6 py-4 flex items-center gap-3 border-t border-gray-200">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium shadow-sm transition-colors"
                        >
                            Update Target
                        </button>
                        <Link
                            href="/dashboard/campaigns/targets"
                            className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 transition-colors rounded-md shadow-sm"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>

            </div>
        </div>
    )
}