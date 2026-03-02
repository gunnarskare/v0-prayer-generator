import { Book, Heart, Calendar, Users, Smartphone, Globe } from "lucide-react"

const features = [
  {
    icon: Book,
    title: "Les Bibelen",
    description: "Utforsk hele Bibelen med enkel navigasjon. Finn vers, kapitler og bøker raskt og enkelt.",
  },
  {
    icon: Heart,
    title: "Personlig Bønn",
    description: "Generer personlige bønner tilpasset din livssituasjon. Inkluder bønn for familie og ektefelle.",
  },
  {
    icon: Calendar,
    title: "Leseplaner",
    description: "Følg strukturerte leseplaner for å lese gjennom Bibelen. Velg mellom ulike temaplaner.",
  },
  {
    icon: Users,
    title: "Fellesskap",
    description: "Del vers og bønner med andre. Voks i tro sammen med et støttende fellesskap.",
  },
  {
    icon: Smartphone,
    title: "Alltid Tilgjengelig",
    description: "Bruk dinmisjon.no på alle enheter. Perfekt for andakt hjemme eller på farten.",
  },
  {
    icon: Globe,
    title: "Norsk Innhold",
    description: "Alt innhold er på norsk. Bibelen og bønner tilpasset norske brukere.",
  },
]

export function FeaturesSection() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Alt du trenger for din åndelige reise
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Dinmisjon.no gir deg verktøyene for daglig bønn, bibellesning og åndelig vekst.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/30 hover:shadow-lg"
            >
              {/* Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-6 w-6" />
              </div>

              {/* Content */}
              <h3 className="mt-6 text-lg font-semibold text-card-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
