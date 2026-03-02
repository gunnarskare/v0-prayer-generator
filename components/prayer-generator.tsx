"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Heart, Printer, Share2 } from "lucide-react"

const SECTIONS = [
  {
    title: "Overgivelse og gjenopprettelse",
    text: `Min kjære Herre Jesus, jeg kommer til deg nå for å bli gjenopprettet, fornyet, og fylt med ditt liv og din kjærlighet, sammen med all den nåde og barmhjertighet jeg så desperat trenger i dag. Jeg gir deg min dag og natt, alle mine opplevelser og alle jeg har vært i kontakt med. Jeg gir deg min ånd, sjel og kropp; mitt hjerte, sinn og vilje, og dekker meg selv med ditt blod. Jeg ber om at din Hellige Ånd gjenoppretter meg i deg, fornyer meg og leder denne tiden i bønn.

Jeg inkluderer også ¨kone¨ i min bønn og tar henne med i alle ting jeg ber om og for. Dekk oss begge med ditt blod; vår ånd, sjel og kropp, vårt hjerte, sinn og vilje.

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
    title: "Korsets verk og ¨kone¨s beskyttelse",
    text: `Jeg tar nå fullstendig imot korsets verk, hvor jeg ble korsfestet med Kristus og døde med ham. Min synd er straffet, min natur er gått i døden, og jeg er fullstendig forløst. Jeg inkluderer ¨kone¨ i alt dette; hun er også korsfestet med Kristus, døde med ham, og er fullstendig forløst.

Jesu blod renser oss fra alle synder og sykdommer, fra alt ondt. Jeg har fullstendig tilgivelse for alt jeg har gjort og er fri fra skyld og dom. Jeg tar nå imot gaven av Jesu liv som gis til meg, og jeg mottar hele hans liv med all dens rikdom og lykksalighet for både meg og ¨kone¨.`,
  },
  {
    title: "Oppstandelse og helliggjørelse",
    text: `Jeg er blitt korsfestet med Kristus og har nå blitt reist til liv i ham. Nå lever jeg med Kristus og han med meg. Jesus lever i meg. Jeg anerkjenner at jeg har blitt gjenreist med Kristus, satt med ham ved Faderens høyre hånd, og at all autoritet i himmelen og på jorden nå er gitt til meg i Jesus.

Jesus, takk for at du sender din Hellige Ånd til å fornye meg og fylle meg og ¨kone¨. Jeg mottar ham nå. Kom Hellige Ånd, du er velkommen her. Fyll meg helt, forny meg helt, gjør meg hel igjen.`,
  },
  {
    title: "Bønn om beskyttelse med Guds fulle rustning",
    text: `Nå tar jeg på meg Guds fulle rustning, og jeg tar den også på ¨kone¨. Jeg tar på sannhetens belte, rettferdighetens brynje, og fredens evangeliums beredskap på føttene. Jeg løfter troens skjold mot hvert eneste onde angrep som kommer mot oss i dag.

Jeg tar på frelsens hjelm, Åndens sverd, og velger å be hele veien. Jesus, takk for at du har gitt meg din autoritet til å stå mot Satan og hans rike, og i ditt navn befaler jeg nå alle onde ånder bort fra meg, fra ¨kone¨, og fra mitt hjem.`,
  },
  {
    title: "Bønn om Guds ledelse og velsignelse",
    text: `Hellige Ånd, takk for at du bor i meg. Du er min rådgiver, trøster og styrke. Du leder meg i all sannhet og åpenbarer Jesus for meg. Åpne mine øyne for å se ham, mine ører for å høre hans stemme, mitt hjerte for å motta hans kjærlighet.

Herre, jeg overgir denne dagen til deg. Gi meg visdom, nåde og styrke til å leve for deg. Velsign ¨kone¨ og bevar henne. Fyll vårt hjem med din fred og kjærlighet.

Jeg ber dette alt i Jesu mektige navn. Amen.`,
  },
]

function getGenitive(name: string): string {
  const trimmed = name.trim()
  if (trimmed.toLowerCase().endsWith("s")) {
    return `${trimmed}'`
  }
  return `${trimmed}s`
}

function processText(text: string, hasWife: boolean, wifeName: string): string {
  if (hasWife && wifeName.trim()) {
    const genitive = getGenitive(wifeName)
    let processed = text.replace(/¨kone¨s/g, genitive)
    processed = processed.replace(/¨kone¨/g, wifeName.trim())
    return processed
  } else {
    let processed = text.replace(/¨kone¨s\s*/g, "")
    processed = processed.replace(/¨kone¨\s*/g, "")
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

export default function PrayerGenerator() {
  const [hasWife, setHasWife] = useState<boolean | null>(null)
  const [wifeName, setWifeName] = useState("")
  const [showPrayer, setShowPrayer] = useState(false)

  const handleShowPrayer = () => {
    if (hasWife === null) return
    if (hasWife && !wifeName.trim()) return
    setShowPrayer(true)
  }

  const handleBack = () => {
    setShowPrayer(false)
  }

  const canShowPrayer = hasWife === false || (hasWife === true && wifeName.trim().length > 0)

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
                {hasWife && wifeName && (
                  <p className="mt-1 text-muted-foreground">
                    Inkluderer bønn for {wifeName}
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
              const processedTitle = processText(section.title, hasWife ?? false, wifeName)
              const processedText = processText(section.text, hasWife ?? false, wifeName)

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
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Heart className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mt-6 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Generer Din Bønn
          </h1>
          <p className="mt-4 text-muted-foreground text-pretty">
            Lag en personlig bønn tilpasset din livssituasjon. 
            Bønnen kan inkludere din ektefelle hvis du ønsker.
          </p>
        </div>

        {/* Form Card */}
        <Card className="mt-10 border shadow-lg">
          <CardContent className="p-6 sm:p-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base font-medium">Har du kone?</Label>
                <RadioGroup
                  value={hasWife === null ? "" : hasWife ? "yes" : "no"}
                  onValueChange={(value) => {
                    setHasWife(value === "yes")
                    if (value === "no") {
                      setWifeName("")
                    }
                  }}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes" className="cursor-pointer">
                      Ja
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no" className="cursor-pointer">
                      Nei
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {hasWife && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <Label htmlFor="wifeName" className="text-base font-medium">
                    Hva heter hun?
                  </Label>
                  <Input
                    id="wifeName"
                    type="text"
                    placeholder="Skriv inn navnet"
                    value={wifeName}
                    onChange={(e) => setWifeName(e.target.value)}
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
      </div>
    </div>
  )
}
