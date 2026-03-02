import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Search, BookOpen, ChevronRight } from "lucide-react"

const oldTestament = [
  { name: "1. Mosebok", chapters: 50 },
  { name: "2. Mosebok", chapters: 40 },
  { name: "3. Mosebok", chapters: 27 },
  { name: "4. Mosebok", chapters: 36 },
  { name: "5. Mosebok", chapters: 34 },
  { name: "Josva", chapters: 24 },
  { name: "Dommerne", chapters: 21 },
  { name: "Rut", chapters: 4 },
  { name: "1. Samuel", chapters: 31 },
  { name: "2. Samuel", chapters: 24 },
  { name: "1. Kongebok", chapters: 22 },
  { name: "2. Kongebok", chapters: 25 },
  { name: "1. Krønikebok", chapters: 29 },
  { name: "2. Krønikebok", chapters: 36 },
  { name: "Esra", chapters: 10 },
  { name: "Nehemja", chapters: 13 },
  { name: "Ester", chapters: 10 },
  { name: "Job", chapters: 42 },
  { name: "Salmene", chapters: 150 },
  { name: "Ordspråkene", chapters: 31 },
  { name: "Forkynneren", chapters: 12 },
  { name: "Høysangen", chapters: 8 },
  { name: "Jesaja", chapters: 66 },
  { name: "Jeremia", chapters: 52 },
  { name: "Klagesangene", chapters: 5 },
  { name: "Esekiel", chapters: 48 },
  { name: "Daniel", chapters: 12 },
  { name: "Hosea", chapters: 14 },
  { name: "Joel", chapters: 3 },
  { name: "Amos", chapters: 9 },
  { name: "Obadja", chapters: 1 },
  { name: "Jona", chapters: 4 },
  { name: "Mika", chapters: 7 },
  { name: "Nahum", chapters: 3 },
  { name: "Habakkuk", chapters: 3 },
  { name: "Sefanja", chapters: 3 },
  { name: "Haggai", chapters: 2 },
  { name: "Sakarja", chapters: 14 },
  { name: "Malaki", chapters: 4 },
]

const newTestament = [
  { name: "Matteus", chapters: 28 },
  { name: "Markus", chapters: 16 },
  { name: "Lukas", chapters: 24 },
  { name: "Johannes", chapters: 21 },
  { name: "Apostlenes gjerninger", chapters: 28 },
  { name: "Romerne", chapters: 16 },
  { name: "1. Korinterbrev", chapters: 16 },
  { name: "2. Korinterbrev", chapters: 13 },
  { name: "Galaterne", chapters: 6 },
  { name: "Efeserne", chapters: 6 },
  { name: "Filipperne", chapters: 4 },
  { name: "Kolosserne", chapters: 4 },
  { name: "1. Tessalonikerne", chapters: 5 },
  { name: "2. Tessalonikerne", chapters: 3 },
  { name: "1. Timoteus", chapters: 6 },
  { name: "2. Timoteus", chapters: 4 },
  { name: "Titus", chapters: 3 },
  { name: "Filemon", chapters: 1 },
  { name: "Hebreerne", chapters: 13 },
  { name: "Jakob", chapters: 5 },
  { name: "1. Peter", chapters: 5 },
  { name: "2. Peter", chapters: 3 },
  { name: "1. Johannes", chapters: 5 },
  { name: "2. Johannes", chapters: 1 },
  { name: "3. Johannes", chapters: 1 },
  { name: "Judas", chapters: 1 },
  { name: "Åpenbaringen", chapters: 22 },
]

function BookList({ books, title }: { books: typeof oldTestament; title: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-1">
          {books.map((book) => (
            <Link
              key={book.name}
              href={`/bibel/${encodeURIComponent(book.name.toLowerCase())}`}
              className="group flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-secondary"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                {book.name}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                {book.chapters} kap
                <ChevronRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
              </span>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function BibelPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-hero-bg py-16 text-hero-foreground sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">
                Les Bibelen
              </h1>
              <p className="mt-4 text-lg text-hero-foreground/80">
                Utforsk Guds ord. Velg en bok for å begynne å lese.
              </p>

              {/* Search */}
              <div className="relative mt-8 mx-auto max-w-md">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Søk i Bibelen..."
                  className="h-12 pl-10 bg-white text-foreground"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Book Lists */}
        <section className="bg-background py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2">
              <BookList books={oldTestament} title="Det Gamle Testamentet" />
              <BookList books={newTestament} title="Det Nye Testamentet" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
