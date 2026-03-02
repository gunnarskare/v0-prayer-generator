import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SimplePrayer } from "@/components/simple-prayer"

const sections = [
  {
    title: "Guds beskyttelse",
    text: `Himmelske Far, jeg kommer til deg og ber om din beskyttelse over meg og mine kjære. Du er vår tilflukt og vår borg, vår Gud som vi setter vår lit til.

Dekk oss med dine vinger og la oss finne ly under din beskyttelse. Send dine engler til å vokte oss på alle våre veier.`
  },
  {
    title: "Beskyttelse mot det onde",
    text: `I Jesu mektige navn befaler jeg alt ondt bort fra mitt liv, min familie og mitt hjem. Fyll hvert rom med din tilstedeværelse og fred.

La Jesu blod dekke oss og beskytte oss mot alle fiendens angrep. Ingen våpen som smis mot oss skal ha fremgang.`
  },
  {
    title: "Trygghet i Gud",
    text: `Herre, du har sagt at du aldri vil forlate oss eller svikte oss. Jeg hviler i denne sannheten.

Gi meg din fred som overgår all forstand, og bevar mitt hjerte og mine tanker i Kristus Jesus.

Takk for at du er med oss alle dager, og at ingenting kan skille oss fra din kjærlighet.

I Jesu navn, Amen.`
  }
]

export default function BeskyttelsesbonnPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <SimplePrayer title="Bønn om beskyttelse" sections={sections} />
      </main>
      <Footer />
    </div>
  )
}
