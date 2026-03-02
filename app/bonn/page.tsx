import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import PrayerGenerator from "@/components/prayer-generator"

export default function BonnPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <PrayerGenerator />
      </main>
      <Footer />
    </div>
  )
}
