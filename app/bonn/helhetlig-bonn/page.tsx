export const dynamic = 'force-dynamic'

import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import PrayerGenerator from "@/components/prayer-generator"

type SpouseType = "none" | "wife" | "husband"

export default async function HelhetligBonnPage() {
  const supabase = await createClient()

  // Check if user is logged in and get their profile and spouse info
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let initialSpouseType: SpouseType = "none"
  let initialSpouseName = ""

  if (user) {
    // Check family_members for spouse
    const { data: spouse } = await supabase
      .from("family_members")
      .select("type, name")
      .eq("user_id", user.id)
      .eq("type", "spouse")
      .single()

    if (spouse) {
      // We need to determine if it's wife or husband - for now default to wife
      // This could be extended with a gender field in family_members
      initialSpouseType = "wife"
      initialSpouseName = spouse.name
    } else {
      // Fall back to legacy profile data
      const { data: profile } = await supabase
        .from("profiles")
        .select("has_wife, wife_name")
        .eq("id", user.id)
        .single()

      if (profile?.has_wife && profile?.wife_name) {
        initialSpouseType = "wife"
        initialSpouseName = profile.wife_name
      }
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <PrayerGenerator 
          initialSpouseType={initialSpouseType}
          initialSpouseName={initialSpouseName}
          isLoggedIn={!!user}
        />
      </main>
      <Footer />
    </div>
  )
}
