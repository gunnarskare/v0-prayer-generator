import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Clock, BookOpen } from "lucide-react"

const plans = [
  {
    id: 1,
    title: "Evangeliene",
    description: "Les gjennom Jesu liv og lære i de fire evangeliene.",
    duration: "30 dager",
    chapters: 89,
    color: "bg-primary/10 text-primary",
  },
  {
    id: 2,
    title: "Salmene",
    description: "Opplev poesi, bønn og tilbedelse gjennom Salmenes bok.",
    duration: "60 dager",
    chapters: 150,
    color: "bg-accent/10 text-accent",
  },
  {
    id: 3,
    title: "Romerbrevet",
    description: "Dykk dypt inn i Paulus sin teologi om nåde og tro.",
    duration: "14 dager",
    chapters: 16,
    color: "bg-chart-4/20 text-chart-4",
  },
  {
    id: 4,
    title: "Ordspråkene",
    description: "Praktisk visdom for hverdagslivet fra Kong Salomo.",
    duration: "31 dager",
    chapters: 31,
    color: "bg-chart-3/20 text-chart-3",
  },
]

export function ReadingPlansSection() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground">
              Leseplaner
            </h2>
            <p className="mt-2 text-muted-foreground">
              Strukturerte planer for å lese gjennom Bibelen.
            </p>
          </div>
          <Button asChild variant="outline" className="gap-2">
            <Link href="/leseplaner">
              Se alle planer
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Plans Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <Link key={plan.id} href={`/leseplaner/${plan.id}`}>
              <Card className="group h-full overflow-hidden border border-border transition-all hover:border-primary/30 hover:shadow-lg">
                {/* Color Bar */}
                <div className={`h-2 ${plan.color.split(" ")[0]}`} />
                
                <CardContent className="p-6">
                  <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
                    {plan.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {plan.description}
                  </p>
                  
                  {/* Meta */}
                  <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {plan.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3.5 w-3.5" />
                      {plan.chapters} kapitler
                    </span>
                  </div>

                  {/* CTA */}
                  <div className="mt-4">
                    <span className={`inline-flex items-center gap-1 text-sm font-medium ${plan.color.split(" ")[1]} group-hover:gap-2 transition-all`}>
                      Start plan
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
