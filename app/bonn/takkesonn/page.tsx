import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SimplePrayer } from "@/components/simple-prayer"

const sections = [
  {
    title: "Takk og lov",
    text: `Herre, min Gud, du er verdig all takk og pris! Jeg løfter mitt hjerte til deg i takknemlighet for alt du er og alt du gjør.

Takk for livet du har gitt meg, for hver dag som er en gave fra deg. Takk for luften jeg puster, for solen som skinner, og for naturen som vitner om din skaperkraft.`
  },
  {
    title: "Takk for frelsen",
    text: `Takk for din uendelige kjærlighet som sendte Jesus til verden for min skyld. Takk for korset, for tilgivelsen, og for det evige livet som er mitt i Kristus.

Takk for Den Hellige Ånd som bor i meg, trøster meg, veileder meg og gir meg kraft til å leve for deg.`
  },
  {
    title: "Takk for velsignelser",
    text: `Takk for familien min, for venner, og for fellesskapet av troende. Takk for arbeid, helse, mat og hjem.

Takk for alle velsignelser jeg ofte tar for gitt. Åpne mine øyne til å se din godhet i det store og det små.

Måtte mitt liv være en lovsang til deg, i dag og alle dager.

I Jesu navn, Amen.`
  }
]

export default function TakkesonnPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <SimplePrayer title="Takkebønn" sections={sections} />
      </main>
      <Footer />
    </div>
  )
}
