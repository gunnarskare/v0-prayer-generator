"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Printer, Share2 } from "lucide-react"

interface PrayerSection {
  title?: string
  text: string
}

interface SimplePrayerProps {
  title: string
  sections: PrayerSection[]
}

export function SimplePrayer({ title, sections }: SimplePrayerProps) {
  const handlePrint = () => {
    window.print()
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${title} - dinmisjon.no`,
          text: `Les denne bønnen på dinmisjon.no`,
          url: window.location.href,
        })
      } catch {
        // User cancelled
      }
    }
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="bg-section-alt border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Link 
                href="/bonn" 
                className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Tilbake til bønner
              </Link>
              <h1 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
                {title}
              </h1>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handlePrint} className="gap-2">
                <Printer className="h-4 w-4" />
                <span className="hidden sm:inline">Skriv ut</span>
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare} className="gap-2">
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline">Del</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="space-y-8">
          {sections.map((section, index) => (
            <section key={index}>
              {section.title && (
                <h2 className="mb-4 font-serif text-xl font-semibold text-foreground">
                  {section.title}
                </h2>
              )}
              <div className="space-y-4 text-foreground/90 leading-relaxed">
                {section.text.split("\n\n").map((paragraph, pIndex) => (
                  <p key={pIndex}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Back */}
        <div className="mt-12 border-t border-border pt-8">
          <Button asChild variant="outline" className="gap-2">
            <Link href="/bonn">
              <ArrowLeft className="h-4 w-4" />
              Tilbake til bønner
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
