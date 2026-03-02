import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Clock, BookOpen, ArrowRight, CheckCircle } from "lucide-react"

const allPlans = [
  {
    id: 1,
    title: "Evangeliene",
    description: "Les gjennom Jesu liv og lære i de fire evangeliene. Opplev Matteus, Markus, Lukas og Johannes sine unike perspektiver.",
    duration: "30 dager",
    chapters: 89,
    category: "Nye Testamentet",
    difficulty: "Nybegynner",
  },
  {
    id: 2,
    title: "Salmene",
    description: "Opplev poesi, bønn og tilbedelse gjennom Salmenes bok. Perfekt for daglig andakt og meditasjon.",
    duration: "60 dager",
    chapters: 150,
    category: "Det Gamle Testamentet",
    difficulty: "Alle nivåer",
  },
  {
    id: 3,
    title: "Romerbrevet",
    description: "Dykk dypt inn i Paulus sin teologi om nåde, tro og rettferdiggjørelse. En grunnleggende tekst for kristen tro.",
    duration: "14 dager",
    chapters: 16,
    category: "Paulusbrevene",
    difficulty: "Middels",
  },
  {
    id: 4,
    title: "Ordspråkene",
    description: "Praktisk visdom for hverdagslivet fra Kong Salomo. Ett kapittel per dag i en måned.",
    duration: "31 dager",
    chapters: 31,
    category: "Visdomslitteratur",
    difficulty: "Nybegynner",
  },
  {
    id: 5,
    title: "Apostlenes Gjerninger",
    description: "Følg den tidlige kirkens vekst og Paulus sine misjonsreiser. En spennende historisk beretning.",
    duration: "28 dager",
    chapters: 28,
    category: "Nye Testamentet",
    difficulty: "Nybegynner",
  },
  {
    id: 6,
    title: "1. Mosebok",
    description: "Start fra begynnelsen med skapelsen, patriarkene og Guds løfter til Israel.",
    duration: "50 dager",
    chapters: 50,
    category: "Mosebøkene",
    difficulty: "Middels",
  },
  {
    id: 7,
    title: "Bergprekenen",
    description: "Jesu mest kjente tale om Guds rike, velsignelser og kristent liv. Matteus 5-7.",
    duration: "7 dager",
    chapters: 3,
    category: "Jesu Lære",
    difficulty: "Nybegynner",
  },
  {
    id: 8,
    title: "Bibelen på ett år",
    description: "Les hele Bibelen fra 1. Mosebok til Åpenbaringen på 365 dager.",
    duration: "365 dager",
    chapters: 1189,
    category: "Hele Bibelen",
    difficulty: "Avansert",
  },
]

export default function LeseplanerPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-hero-bg py-16 text-hero-foreground sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl text-balance">
                Leseplaner
              </h1>
              <p className="mt-4 text-lg text-hero-foreground/80 text-pretty">
                Strukturerte planer for å lese gjennom Bibelen. Velg en plan som passer din tid og interesse.
              </p>
            </div>
          </div>
        </section>

        {/* Plans Grid */}
        <section className="bg-background py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Filter Tags */}
            <div className="mb-10 flex flex-wrap gap-2">
              <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                Alle planer
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                Nye Testamentet
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                Det Gamle Testamentet
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                Nybegynner
              </Badge>
            </div>

            {/* Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {allPlans.map((plan) => (
                <Card key={plan.id} className="group overflow-hidden border border-border transition-all hover:border-primary/30 hover:shadow-lg">
                  <CardContent className="p-6">
                    {/* Category Badge */}
                    <Badge variant="secondary" className="mb-4 text-xs">
                      {plan.category}
                    </Badge>

                    <h3 className="font-serif text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors">
                      {plan.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                      {plan.description}
                    </p>

                    {/* Meta */}
                    <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {plan.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-3.5 w-3.5" />
                        {plan.chapters} kapitler
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle className="h-3.5 w-3.5" />
                        {plan.difficulty}
                      </span>
                    </div>

                    {/* CTA */}
                    <Button asChild className="mt-6 w-full gap-2" variant="outline">
                      <Link href={`/leseplaner/${plan.id}`}>
                        Start denne planen
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
