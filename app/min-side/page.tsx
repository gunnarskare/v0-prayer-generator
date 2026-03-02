import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProfileSection } from "@/components/profile-section"
import { QuickActions } from "@/components/quick-actions"
import { FamilyMembersManager } from "@/components/family-members-manager"

export default async function MinSidePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/logg-inn")
  }

  // Fetch profile data
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Welcome Section */}
        <section className="bg-hero-bg text-hero-foreground">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
            <h1 className="font-serif text-3xl font-bold sm:text-4xl">
              Velkommen, {profile?.full_name || user.email?.split("@")[0]}
            </h1>
            <p className="mt-2 text-hero-foreground/80">
              Din personlige side for bønn og bibellesning
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Profile Settings */}
            <div className="space-y-8 lg:col-span-2">
              <ProfileSection 
                userId={user.id}
                initialProfile={{
                  full_name: profile?.full_name || "",
                  has_wife: profile?.has_wife || false,
                  wife_name: profile?.wife_name || "",
                }}
              />
              
              {/* Family Members */}
              <FamilyMembersManager />
            </div>

            {/* Quick Actions */}
            <div>
              <QuickActions 
                hasWife={profile?.has_wife || false}
                wifeName={profile?.wife_name || ""}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
