import Link from "next/link"
import { BookOpen, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-serif text-xl font-bold text-foreground">Din Misjon</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          
          <h1 className="mt-6 font-serif text-3xl font-bold tracking-tight text-foreground">
            Noe gikk galt
          </h1>
          
          <p className="mt-4 text-muted-foreground text-pretty">
            Det oppstod en feil under autentiseringen. Vennligst prøv igjen.
          </p>

          <Card className="mt-8 border shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col gap-3">
                <Button asChild>
                  <Link href="/auth/logg-inn">
                    Prøv å logge inn igjen
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/">
                    Gå til forsiden
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
