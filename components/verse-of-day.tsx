"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RefreshCw, Share2, BookmarkPlus } from "lucide-react"

const verses = [
  {
    text: "For så høyt har Gud elsket verden at han ga sin Sønn, den enbårne, for at hver den som tror på ham, ikke skal gå fortapt, men ha evig liv.",
    reference: "Johannes 3:16",
  },
  {
    text: "Herren er min hyrde, jeg mangler ingenting. Han lar meg ligge i grønne enger, han fører meg til vann der jeg finner hvile.",
    reference: "Salme 23:1-2",
  },
  {
    text: "Vær ikke bekymret for noe! Men legg satisfalls fram for Gud det dere har på hjertet, i bønn og påkallelse med takksigelse.",
    reference: "Filipperne 4:6",
  },
  {
    text: "For jeg vet hvilke tanker jeg har med dere, sier Herren, fredstanker og ikke tanker om ulykke. Jeg vil gi dere en framtid og et håp.",
    reference: "Jeremia 29:11",
  },
  {
    text: "Stol på Herren av hele ditt hjerte, og sett ikke lit til din egen forstand! Tenk på ham hvor du enn ferdes, så skal han gjøre dine stier rette.",
    reference: "Ordspråkene 3:5-6",
  },
  {
    text: "Frykt ikke, for jeg er med deg! Se deg ikke engstelig omkring, for jeg er din Gud! Jeg styrker deg, jeg hjelper deg, jeg holder deg oppe med min rettferds høyre hånd.",
    reference: "Jesaja 41:10",
  },
  {
    text: "Kom til meg, alle dere som strever og bærer tunge byrder, og jeg vil gi dere hvile.",
    reference: "Matteus 11:28",
  },
]

export function VerseOfDay() {
  const [verseIndex, setVerseIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Set verse based on day of year for consistency
    const now = new Date()
    const start = new Date(now.getFullYear(), 0, 0)
    const diff = now.getTime() - start.getTime()
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24))
    setVerseIndex(dayOfYear % verses.length)
  }, [])

  const currentVerse = verses[verseIndex]

  const handleNewVerse = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setVerseIndex((prev) => (prev + 1) % verses.length)
      setIsAnimating(false)
    }, 200)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Dagens Vers - dinmisjon.no",
          text: `"${currentVerse.text}" - ${currentVerse.reference}`,
          url: window.location.href,
        })
      } catch {
        // User cancelled sharing
      }
    }
  }

  return (
    <section className="bg-section-alt py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="text-center">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Dagens Vers
            </span>
          </div>

          {/* Verse Card */}
          <Card className="mt-8 overflow-hidden border-0 bg-card shadow-xl">
            <CardContent className="p-8 sm:p-12">
              <div
                className={`transition-opacity duration-200 ${
                  isAnimating ? "opacity-0" : "opacity-100"
                }`}
              >
                {/* Quote */}
                <blockquote className="relative">
                  <span className="absolute -top-4 -left-2 font-serif text-6xl text-primary/20">
                    {'"'}
                  </span>
                  <p className="font-serif text-xl leading-relaxed text-card-foreground sm:text-2xl text-pretty">
                    {currentVerse.text}
                  </p>
                </blockquote>

                {/* Reference */}
                <p className="mt-6 text-right font-medium text-primary">
                  {currentVerse.reference}
                </p>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 border-t border-border pt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNewVerse}
                  className="gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Nytt vers
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="gap-2"
                >
                  <Share2 className="h-4 w-4" />
                  Del
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <BookmarkPlus className="h-4 w-4" />
                  Lagre
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
