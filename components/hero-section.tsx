import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Book, Heart, ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative bg-hero-bg text-hero-foreground">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
            <Book className="h-4 w-4 text-primary" />
            <span>Gratis bibellesning og bønn</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance">
            Styrk din tro med daglig bønn og Guds ord
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg text-hero-foreground/80 leading-relaxed sm:text-xl text-pretty">
            En norsk plattform for personlig bønn og bibellesning. 
            Oppdag leseplaner, dagens vers og generer personlige bønner for deg og din familie.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button 
              asChild 
              size="lg" 
              className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
            >
              <Link href="/bonn">
                <Heart className="h-5 w-5" />
                Start Daglig Bønn
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto border-hero-foreground/20 bg-transparent text-hero-foreground hover:bg-white/10 hover:text-hero-foreground gap-2"
            >
              <Link href="/bibel">
                Les Bibelen
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-hero-foreground/10 pt-10">
            <div>
              <p className="text-3xl font-bold text-primary sm:text-4xl">66</p>
              <p className="mt-1 text-sm text-hero-foreground/60">Bibelbøker</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary sm:text-4xl">365</p>
              <p className="mt-1 text-sm text-hero-foreground/60">Daglige bønner</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary sm:text-4xl">100+</p>
              <p className="mt-1 text-sm text-hero-foreground/60">Leseplaner</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
