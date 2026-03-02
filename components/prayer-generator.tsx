"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Heart, Printer, Share2, Users } from "lucide-react"
import Link from "next/link"

const SECTIONS = [
  {
    title: "Overgivelse og gjenopprettelse",
    text: `Min kjære Herre Jesus, jeg kommer til deg nå for å bli gjenopprettet, fornyet, og fylt med ditt liv og din kjærlighet, sammen med all den nåde og barmhjertighet jeg så desperat trenger i dag. Jeg gir deg min dag og natt, alle mine opplevelser og alle jeg har vært i kontakt med. Jeg gir deg min ånd, sjel og kropp; mitt hjerte, sinn og vilje, og dekker meg selv med ditt blod. Jeg ber om at din Hellige Ånd gjenoppretter meg i deg, fornyer meg og leder denne tiden i bønn.

Jeg inkluderer også ¨ektefelle¨ i min bønn og tar ¨objektpronomen¨ med i alle ting jeg ber om og for. Dekk oss begge med ditt blod; vår ånd, sjel og kropp, vårt hjerte, sinn og vilje.

Jeg ber i total enighet med din Ånd, sammen med alle som ber for meg.`,
  },
  {
    title: "Tilbedelse og hengivelse til Treenigheten",
    text: `Kjære Gud, hellige treenighet, du alene er verdig all min tilbedelse, hengivelse, ros, tillit og ære. Jeg elsker deg, tilber deg, stoler på deg og gir meg selv helt til deg i mitt hjertes søken etter liv. Du alene er livet, og du har blitt mitt liv.

Jeg fornekter alle andre guder og avguder og gir deg den plass i mitt hjerte som du fortjener. Dette handler om deg og ikke om meg. Du er helten i denne historien, og jeg tilhører deg.`,
  },
  {
    title: "Bekjennelse, ransakelse og omvendelse",
    text: `Jeg ber deg om tilgivelse for alle mine synder. Ransak meg, utforsk meg, og åpenbar for meg hvor du arbeider i mitt liv, og gi meg den nåde som kommer gjennom helbredelse, utfrielse og en dyp og ekte omvendelse.`,
  },
  {
    title: "Takknemlighet til Faderen for frelsen",
    text: `Himmelske Far, takk for at du elsker meg og valgte meg før du skapte verden. Du er min sanne Far, min skaper, frelser og opprettholder. Takk for at du beviste din kjærlighet ved å sende Jesus.

Jeg mottar ham, hans liv og hans verk som du innviet for meg. Takk for at du tilgir meg mine synder, og gir meg din rettferdighet som gjør meg hel i Jesus. Takk for at du gjorde meg levende med Ham, oppreiser og setter meg med Ham ved din høyre hånd, og etablerer meg i hans autoritet.`,
  },
  {
    title: "Korsets verk og ¨ektefelle¨s beskyttelse",
    text: `Jeg tar nå fullstendig imot korsets verk, hvor jeg ble korsfestet med Kristus og døde med ham. Min synd er straffet, min natur er gått i døden, og jeg er fullstendig forløst. Jeg inkluderer ¨ektefelle¨ i alt dette; ¨subjektpronomen¨ er også korsfestet med Kristus, døde med ham, og er fullstendig forløst.

Jesu blod renser oss fra alle synder og sykdommer, fra alt ondt. Jeg har fullstendig tilgivelse for alt jeg har gjort og er fri fra skyld og dom. Jeg tar nå imot gaven av Jesu liv som gis til meg, og jeg mottar hele hans liv med all dens rikdom og lykksalighet for både meg og ¨ektefelle¨.`,
  },
  {
    title: "Oppstandelse og helliggjørelse",
    text: `Jeg er blitt korsfestet med Kristus og har nå blitt reist til liv i ham. Nå lever jeg med Kristus og han med meg. Jesus lever i meg. Jeg anerkjenner at jeg har blitt gjenreist med Kristus, satt med ham ved Faderens høyre hånd, og at all autoritet i himmelen og på jorden nå er gitt til meg i Jesus.

Jesus, takk for at du sender din Hellige Ånd til å fornye meg og fylle meg og ¨ektefelle¨. Jeg mottar ham nå. Kom Hellige Ånd, du er velkommen her. Fyll meg helt, forny meg helt, gjør meg hel igjen.`,
  },
  {
    title: "Bønn om beskyttelse med Guds fulle rustning",
    text: `Nå tar jeg på meg Guds fulle rustning, og jeg tar den også på ¨ektefelle¨. Jeg tar på sannhetens belte, rettferdighetens brynje, og fredens evangeliums beredskap på føttene. Jeg løfter troens skjold mot hvert eneste onde angrep som kommer mot oss i dag.

Jeg tar på frelsens hjelm, Åndens sverd, og velger å be hele veien. Jesus, takk for at du har gitt meg din autoritet til å stå mot Satan og hans rike, og i ditt navn befaler jeg nå alle onde ånder bort fra meg, fra ¨ektefelle¨, og fra mitt hjem.`,
  },
  {
    title: "Bønn om Guds ledelse og velsignelse",
    text: `Hellige Ånd, takk for at du bor i meg. Du er min rådgiver, trøster og styrke. Du leder meg i all sannhet og åpenbarer Jesus for meg. Åpne mine øyne for å se ham, mine ører for å høre hans stemme, mitt hjerte for å motta hans kjærlighet.

Herre, jeg overgir denne dagen til deg. Gi meg visdom, nåde og styrke til å leve for deg. Velsign ¨ektefelle¨ og bevar ¨objektpronomen¨. Fyll vårt hjem med din fred og kjærlighet.

Jeg ber dette alt i Jesu mektige navn. Amen.`,
  },
]

type SpouseType = "none" | "wife" | "husband"

function getGenitive(name: string): string {
  const trimmed = name.trim()
  if (trimmed.toLowerCase().endsWith("s")) {
    return `${trimmed}'`
  }
  return `${trimmed}s`
}

function processText(text: string, spouseType: SpouseType, spouseName: string): string {
  if (spouseType !== "none" && spouseName.trim()) {
    const genitive = getGenitive(spouseName)
    const isWife = spouseType === "wife"
    
    // Replace spouse name and genitive
    let processed = text.replace(/¨ektefelle¨s/g, genitive)
    processed = processed.replace(/¨ektefelle¨/g, spouseName.trim())
    
    // Replace pronouns based on gender
    processed = processed.replace(/¨subjektpronomen¨/g, isWife ? "hun" : "han")
    processed = processed.replace(/¨objektpronomen¨/g, isWife ? "henne" : "ham")
    processed = processed.replace(/¨eiendomspronomen¨/g, isWife ? "hennes" : "hans")
    
    return processed
  } else {
    // Remove all spouse-related placeholders
    let processed = text.replace(/¨ektefelle¨s\s*/g, "")
    processed = processed.replace(/¨ektefelle¨\s*/g, "")
    processed = processed.replace(/¨subjektpronomen¨\s*/g, "")
    processed = processed.replace(/¨objektpronomen¨\s*/g, "")
    processed = processed.replace(/¨eiendomspronomen¨\s*/g, "")
    processed = processed.replace(/\s+/g, " ")
    processed = processed.replace(/\s+([.,;:])/g, "$1")
    processed = processed.replace(/,\s*,/g, ",")
    processed = processed.replace(/\.\s*\./g, ".")
    return processed.trim()
  }
}

function renderParagraphs(text: string) {
  const paragraphs = text.split(/\n\n+/).filter((p) => p.trim())
  return paragraphs.map((paragraph, index) => (
    <p key={index} className="mb-4 leading-relaxed text-foreground/90">
      {paragraph.trim()}
    </p>
  ))
}

interface PrayerGeneratorProps {
  initialSpouseType?: SpouseType
  initialSpouseName?: string
  isLoggedIn?: boolean
}

export default function PrayerGenerator({ 
  initialSpouseType = "none", 
  initialSpouseName = "",
  isLoggedIn = false 
}: PrayerGeneratorProps) {
  const [spouseType, setSpouseType] = useState<SpouseType>(initialSpouseType)
  const [spouseName, setSpouseName] = useState(initialSpouseName)
  const [showPrayer, setShowPrayer] = useState(Boolean(initialSpouseName && initialSpouseType !== "none"))

  const handleShowPrayer = () => {
    if (spouseType !== "none" && !spouseName.trim()) return
    setShowPrayer(true)
  }

  const handleBack = () => {
    setShowPrayer(false)
  }

  const canShowPrayer = spouseType === "none" || (spouseType !== "none" && spouseName.trim().length > 0)

  const handlePrint = () => {
    window.print()
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Min Daglige Bønn - dinmisjon.no",
          text: "Oppdag personlig bønn på dinmisjon.no",
          url: window.location.href,
        })
      } catch {
        // User cancelled sharing
      }
    }
  }

  if (showPrayer) {
    return (
      <div className="w-full">
        {/* Prayer Header */}
        <div className="bg-section-alt border-b border-border">
          <div className="mx-auto max-w-3xl px-4 py-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
                  Din Daglige Bønn
                </h1>
                {spouseType !== "none" && spouseName && (
                  <p className="mt-1 text-muted-foreground">
                    Inkluderer bønn for din {spouseType === "wife" ? "kone" : "ektemann"} {spouseName}
                  </p>
                )}
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

        {/* Prayer Content */}
        <div className="mx-auto max-w-3xl px-4 py-10">
          <div className="space-y-10">
            {SECTIONS.map((section, index) => {
              const processedTitle = processText(section.title, spouseType, spouseName)
              const processedText = processText(section.text, spouseType, spouseName)

              return (
                <section key={index} className="group">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h2 className="font-serif text-xl font-semibold text-foreground">
                        {processedTitle}
                      </h2>
                      <div className="mt-4 space-y-4 text-muted-foreground leading-relaxed">
                        {renderParagraphs(processedText)}
                      </div>
                    </div>
                  </div>
                  {index < SECTIONS.length - 1 && (
                    <div className="mt-10 border-b border-border/50" />
                  )}
                </section>
              )
            })}
          </div>

          {/* Back Button */}
          <div className="mt-12 border-t border-border pt-8">
            <Button onClick={handleBack} variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Tilbake / Endre
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="mx-auto max-w-xl px-4 py-16 sm:py-24">
        {/* Back Link */}
        <div className="mb-8">
          <Link 
            href="/bonn" 
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Tilbake til bønner
          </Link>
        </div>

        {/* Header */}
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Users className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mt-6 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Helhetlig bønn for meg og min ektefelle
          </h1>
          <p className="mt-4 text-muted-foreground text-pretty">
            En omfattende daglig bønn som dekker overgivelse, tilbedelse, bekjennelse, 
            takknemlighet, beskyttelse og velsignelse. Kan personliggjøres med din ektefelles navn.
          </p>
        </div>

        {/* Form Card */}
        <Card className="mt-10 border shadow-lg">
          <CardContent className="p-6 sm:p-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base font-medium">Har du en ektefelle?</Label>
                <RadioGroup
                  value={spouseType}
                  onValueChange={(value: SpouseType) => {
                    setSpouseType(value)
                    if (value === "none") {
                      setSpouseName("")
                    }
                  }}
                  className="flex flex-wrap gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="none" />
                    <Label htmlFor="none" className="cursor-pointer">
                      Nei
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="wife" id="wife" />
                    <Label htmlFor="wife" className="cursor-pointer">
                      Ja, jeg har kone
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="husband" id="husband" />
                    <Label htmlFor="husband" className="cursor-pointer">
                      Ja, jeg har ektemann
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {spouseType !== "none" && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <Label htmlFor="spouseName" className="text-base font-medium">
                    Hva heter {spouseType === "wife" ? "hun" : "han"}?
                  </Label>
                  <Input
                    id="spouseName"
                    type="text"
                    placeholder="Skriv inn navnet"
                    value={spouseName}
                    onChange={(e) => setSpouseName(e.target.value)}
                    className="h-12 text-base"
                  />
                </div>
              )}

              <Button 
                onClick={handleShowPrayer} 
                disabled={!canShowPrayer} 
                className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90" 
                size="lg"
              >
                <Heart className="h-5 w-5" />
                Vis bønnen
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Info */}
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Bønnen er basert på bibelske prinsipper og kan brukes som en daglig andakt.
        </p>

        {/* Login prompt */}
        {!isLoggedIn && (
          <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-center">
            <p className="text-sm text-muted-foreground">
              <a href="/auth/registrer" className="text-primary hover:underline font-medium">
                Opprett konto
              </a>
              {" "}for å lagre informasjonen din og få automatisk personlige bønner.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
