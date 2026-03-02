import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { VerseOfDay } from "@/components/verse-of-day"
import { ReadingPlansSection } from "@/components/reading-plans-section"
import { CTASection } from "@/components/cta-section"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <VerseOfDay />
        <ReadingPlansSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
