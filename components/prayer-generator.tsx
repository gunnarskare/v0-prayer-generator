"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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

  if (showPrayer) {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="border-b">
              <CardTitle className="text-2xl font-serif text-center">Din Daglige Bønn</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-8">
              {SECTIONS.map((section, index) => {
                const processedTitle = processText(section.title, hasWife ?? false, wifeName)
                const processedText = processText(section.text, hasWife ?? false, wifeName)

                return (
                  <section key={index} className="border-b border-border/50 pb-6 last:border-b-0">
                    <h2 className="text-xl font-semibold mb-4 text-primary">{processedTitle}</h2>
                    <div className="text-muted-foreground">{renderParagraphs(processedText)}</div>
                  </section>
                )
              })}

              <div className="pt-4">
                <Button onClick={handleBack} variant="outline" className="w-full">
                  ← Tilbake / Endre
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-8 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center border-b">
          <CardTitle className="text-2xl font-serif">dinmisjon.no</CardTitle>
          <p className="text-muted-foreground text-sm mt-2">Generer din personlige bønn</p>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
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
                className="text-base"
              />
            </div>
          )}

          <Button onClick={handleShowPrayer} disabled={!canShowPrayer} className="w-full" size="lg">
            Vis bønnen
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
