import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SimplePrayer } from "@/components/simple-prayer"

const sections = [
  {
    text: `Kjære Gud, jeg takker deg for denne nye dagen du har gitt meg. Takk for at du har voktet over meg gjennom natten og at jeg får våkne opp til en ny dag fylt med muligheter.

Jeg overgir denne dagen til deg, Herre. Led mine skritt, mine tanker og mine ord. Hjelp meg å se andre mennesker med dine øyne og å møte dem med kjærlighet og tålmodighet.

Gi meg visdom til å ta gode valg i dag, og styrke til å stå imot fristelser. La din Hellige Ånd veilede meg i alt jeg gjør.

Velsign min familie og mine kjære. Bevar dem og la din fred hvile over dem.

Takk for at du går foran meg inn i denne dagen. Jeg stoler på deg.

I Jesu navn, Amen.`
  }
]

export default function MorgonbonnPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <SimplePrayer title="Morgenbønn" sections={sections} />
      </main>
      <Footer />
    </div>
  )
}
