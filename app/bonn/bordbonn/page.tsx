import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SimplePrayer } from "@/components/simple-prayer"

const sections = [
  {
    title: "Tradisjonell bordbønn",
    text: `I Jesu navn går vi til bords,
å spise, drikke på ditt ord.
Deg Gud til ære, oss til gavn,
så får vi mat i Jesu navn.
Amen.`
  },
  {
    title: "Kort takkebønn",
    text: `Kjære Gud, velsign denne maten og hendene som har laget den.
Takk for at du sørger for oss hver dag.
Amen.`
  },
  {
    title: "Familiens bordbønn",
    text: `Takk, Gud, for maten vi skal spise.
Takk for alle gaver du gir.
Hjelp oss å dele med dem som ikke har nok.
Velsign dette måltidet og vårt fellesskap.
I Jesu navn, Amen.`
  }
]

export default function BordbonnPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <SimplePrayer title="Bordbønn" sections={sections} />
      </main>
      <Footer />
    </div>
  )
}
