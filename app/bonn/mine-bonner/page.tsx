export const dynamic = 'force-dynamic'

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MyPrayersList } from "@/components/my-prayers-list"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus } from "lucide-react"

export default async function MineBonnerPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/logg-inn?redirect=/bonn/mine-bonner")
  }

  // Fetch user's prayers
  const { data: prayers } = await supabase
    .from("user_prayers")
    .select(`
      *,
      prayer_variants (*)
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  // Fetch family members
  const { data: familyMembers } = await supabase
    .from("family_members")
    .select("*")
    .eq("user_id", user.id)
    .order("sort_order")

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-4xl px-4 py-8">
          {/* Back Link */}
          <div className="mb-8">
            <Link 
              href="/bonn" 
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Tilbake til bønner
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-serif text-3xl font-bold text-foreground">Mine bønner</h1>
              <p className="mt-2 text-muted-foreground">
                Bønner du har laget med dynamiske variabler
              </p>
            </div>
            <Button asChild className="gap-2">
              <Link href="/bonn/lag-bonn">
                <Plus className="h-4 w-4" />
                Lag ny bønn
              </Link>
            </Button>
          </div>

          <MyPrayersList 
            prayers={prayers || []} 
            familyMembers={familyMembers || []} 
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}
