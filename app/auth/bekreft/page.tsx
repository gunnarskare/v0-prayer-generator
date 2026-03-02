import Link from "next/link"
import { BookOpen, Mail, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ConfirmPage() {
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
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          
          <h1 className="mt-6 font-serif text-3xl font-bold tracking-tight text-foreground">
            Sjekk e-posten din
          </h1>
          
          <p className="mt-4 text-muted-foreground text-pretty">
            Vi har sendt deg en bekreftelseslenke. Klikk på lenken i e-posten for å aktivere kontoen din.
          </p>

          <Card className="mt-8 border shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start gap-3 text-left">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">Neste steg</p>
                  <p className="mt-1">
                    Etter at du har bekreftet e-posten, kan du logge inn og begynne å bruke personlige bønner.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8">
            <Button asChild variant="outline">
              <Link href="/auth/logg-inn">
                Gå til innlogging
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
