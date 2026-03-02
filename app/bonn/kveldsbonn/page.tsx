import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SimplePrayer } from "@/components/simple-prayer"

const sections = [
  {
    text: `Kjære Gud, takk for denne dagen som nå går mot slutten. Takk for alle velsignelser, store og små, som du har gitt meg i dag.

Tilgi meg der jeg har feilet, der jeg har såret andre med mine ord eller handlinger, og der jeg har unnlatt å gjøre det gode jeg burde gjort.

Jeg legger alle bekymringer og urolige tanker i dine hender. Du er større enn alle mine problemer, og jeg stoler på din omsorg.

Vern over meg og mine kjære gjennom natten. La din fred fylle våre hjerter og gi oss god hvile.

Takk for at du aldri slumrer eller sover, men våker over dine barn.

I Jesu navn, Amen.`
  }
]

export default function KveldsbonnPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <SimplePrayer title="Kveldsbønn" sections={sections} />
      </main>
      <Footer />
    </div>
  )
}
