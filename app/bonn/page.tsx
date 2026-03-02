import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import PrayerGenerator from "@/components/prayer-generator"

export default async function BonnPage({
  searchParams,
}: {
  searchParams: Promise<{ kone?: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()

  // Check if user is logged in and get their profile
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let profile = null
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("has_wife, wife_name")
      .eq("id", user.id)
      .single()
    profile = data
  }

  // Use URL param first, then profile data
  const wifeNameFromUrl = params.kone
  const wifeNameFromProfile = profile?.has_wife ? profile?.wife_name : null
  const initialWifeName = wifeNameFromUrl || wifeNameFromProfile || ""
  const initialHasWife = Boolean(initialWifeName) || profile?.has_wife || false

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <PrayerGenerator 
          initialHasWife={initialHasWife}
          initialWifeName={initialWifeName}
          isLoggedIn={!!user}
        />
      </main>
      <Footer />
    </div>
  )
}
