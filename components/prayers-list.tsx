"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Users, Sun, Moon, Utensils, Shield, Clock, ChevronRight, Plus, BookOpen } from "lucide-react"

const prayers = [
  {
    id: "helhetlig-bonn",
    title: "Helhetlig bønn for meg og min familie",
    description: "En omfattende daglig bønn som dekker overgivelse, tilbedelse, bekjennelse, takknemlighet, beskyttelse og velsignelse.",
    icon: Users,
    duration: "15-20 min",
    personalized: true,
  },
  {
    id: "morgonbonn",
    title: "Morgenbønn",
    description: "Start dagen med å overgi den til Gud og be om hans ledelse og beskyttelse.",
    icon: Sun,
    duration: "5 min",
    personalized: false,
  },
  {
    id: "kveldsbonn",
    title: "Kveldsbønn",
    description: "Avslutt dagen med takknemlighet og overgi natten til Guds omsorg.",
    icon: Moon,
    duration: "5 min",
    personalized: false,
  },
  {
    id: "bordbonn",
    title: "Bordbønn",
    description: "Takk for maten og velsign måltidet sammen med familie og venner.",
    icon: Utensils,
    duration: "1 min",
    personalized: false,
  },
  {
    id: "beskyttelsesbonn",
    title: "Bønn om beskyttelse",
    description: "Be om Guds beskyttelse over deg, din familie og ditt hjem.",
    icon: Shield,
    duration: "5 min",
    personalized: true,
  },
  {
    id: "takkesonn",
    title: "Takkebønn",
    description: "Lov og pris Gud for hans godhet og alle velsignelser i livet.",
    icon: Heart,
    duration: "5 min",
    personalized: false,
  },
]

export function PrayersList() {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="bg-hero-bg text-hero-foreground">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:py-20">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
            <Heart className="h-8 w-8" />
          </div>
          <h1 className="mt-6 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            Bønner
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-hero-foreground/80 text-pretty">
            Utforsk våre bønner for ulike anledninger. Noen bønner kan personliggjøres 
            med navn på deg og din familie.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="secondary" className="gap-2">
              <Link href="/bonn/lag-bonn">
                <Plus className="h-4 w-4" />
                Lag egen bønn
              </Link>
            </Button>
            <Button asChild variant="outline" className="gap-2 border-hero-foreground/20 text-hero-foreground hover:bg-white/10">
              <Link href="/bonn/mine-bonner">
                <BookOpen className="h-4 w-4" />
                Mine bønner
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Prayers Grid */}
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-2">
          {prayers.map((prayer) => {
            const Icon = prayer.icon
            return (
              <Link key={prayer.id} href={`/bonn/${prayer.id}`}>
                <Card className="group h-full border transition-all hover:border-primary/30 hover:shadow-md">
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                    </div>
                    
                    <h2 className="mt-4 font-serif text-lg font-semibold text-foreground">
                      {prayer.title}
                    </h2>
                    
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">
                      {prayer.description}
                    </p>
                    
                    <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {prayer.duration}
                      </span>
                      {prayer.personalized && (
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary">
                          Kan personliggjøres
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
