import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-hero-bg py-20 text-hero-foreground sm:py-28">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          {/* Icon */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20">
            <Heart className="h-8 w-8 text-primary" />
          </div>

          {/* Content */}
          <h2 className="mt-8 font-serif text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Begynn din åndelige reise i dag
          </h2>
          <p className="mt-4 text-lg text-hero-foreground/80 text-pretty">
            Dinmisjon.no er helt gratis. Start med personlig bønn eller utforsk Bibelen 
            med våre leseplaner. Din tro, din vekst, din misjon.
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
                Generer Din Bønn
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto border-hero-foreground/20 bg-transparent text-hero-foreground hover:bg-white/10 hover:text-hero-foreground gap-2"
            >
              <Link href="/leseplaner">
                Utforsk Leseplaner
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
