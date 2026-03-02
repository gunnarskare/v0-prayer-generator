import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PrayersList } from "@/components/prayers-list"

export default function BonnPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <PrayersList />
      </main>
      <Footer />
    </div>
  )
}
