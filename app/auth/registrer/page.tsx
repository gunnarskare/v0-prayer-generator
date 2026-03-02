"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { BookOpen, Loader2, Mail, Lock, User, Heart } from "lucide-react"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [hasWife, setHasWife] = useState<boolean | null>(null)
  const [wifeName, setWifeName] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo:
          process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
          `${window.location.origin}/min-side`,
        data: {
          full_name: fullName,
          has_wife: hasWife ?? false,
          wife_name: hasWife ? wifeName : null,
        },
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push("/auth/bekreft")
  }

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
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center">
            <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground">
              Opprett konto
            </h1>
            <p className="mt-2 text-muted-foreground">
              Start din åndelige reise med personlige bønner
            </p>
          </div>

          {/* Form Card */}
          <Card className="mt-8 border shadow-lg">
            <CardContent className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="fullName">Ditt navn</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Ola Nordmann"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="h-12 pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-post</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="din@epost.no"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Passord</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Minst 6 tegn"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 pl-10"
                      minLength={6}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3 rounded-lg border border-border bg-section-alt p-4">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-primary" />
                    <Label className="text-base font-medium">Har du kone?</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Hvis ja, vil bønnene inkludere henne automatisk.
                  </p>
                  <RadioGroup
                    value={hasWife === null ? "" : hasWife ? "yes" : "no"}
                    onValueChange={(value) => {
                      setHasWife(value === "yes")
                      if (value === "no") setWifeName("")
                    }}
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="wife-yes" />
                      <Label htmlFor="wife-yes" className="cursor-pointer">Ja</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="wife-no" />
                      <Label htmlFor="wife-no" className="cursor-pointer">Nei</Label>
                    </div>
                  </RadioGroup>

                  {hasWife && (
                    <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-300">
                      <Label htmlFor="wifeName" className="text-sm">Hva heter hun?</Label>
                      <Input
                        id="wifeName"
                        type="text"
                        placeholder="Konas navn"
                        value={wifeName}
                        onChange={(e) => setWifeName(e.target.value)}
                        className="mt-1.5 h-11"
                      />
                    </div>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-base" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Oppretter konto...
                    </>
                  ) : (
                    "Opprett konto"
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                Har du allerede konto?{" "}
                <Link href="/auth/logg-inn" className="text-primary hover:underline font-medium">
                  Logg inn
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
