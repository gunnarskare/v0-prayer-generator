"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { User, Heart, Loader2, CheckCircle, LogOut } from "lucide-react"

interface ProfileSectionProps {
  userId: string
  initialProfile: {
    full_name: string
    has_wife: boolean
    wife_name: string
  }
}

export function ProfileSection({ userId, initialProfile }: ProfileSectionProps) {
  const [fullName, setFullName] = useState(initialProfile.full_name)
  const [hasWife, setHasWife] = useState(initialProfile.has_wife)
  const [wifeName, setWifeName] = useState(initialProfile.wife_name)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  async function handleSave() {
    setLoading(true)
    setError(null)
    setSuccess(false)

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        has_wife: hasWife,
        wife_name: hasWife ? wifeName : null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)

    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
      router.refresh()
      setTimeout(() => setSuccess(false), 3000)
    }

    setLoading(false)
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <div className="space-y-6">
      {/* Profile Info */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Min profil</CardTitle>
              <CardDescription>Oppdater informasjonen din for personlige bønner</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-primary/20 bg-primary/5">
              <CheckCircle className="h-4 w-4 text-primary" />
              <AlertDescription className="text-primary">
                Profilen din er oppdatert!
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="fullName">Ditt navn</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Ola Nordmann"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="h-11"
            />
          </div>

          <div className="space-y-3 rounded-lg border border-border bg-section-alt p-4">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-primary" />
              <Label className="text-base font-medium">Har du kone?</Label>
            </div>
            <p className="text-sm text-muted-foreground">
              Bønnene dine vil automatisk inkludere henne.
            </p>
            <RadioGroup
              value={hasWife ? "yes" : "no"}
              onValueChange={(value) => {
                setHasWife(value === "yes")
                if (value === "no") setWifeName("")
              }}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="profile-wife-yes" />
                <Label htmlFor="profile-wife-yes" className="cursor-pointer">Ja</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="profile-wife-no" />
                <Label htmlFor="profile-wife-no" className="cursor-pointer">Nei</Label>
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

          <Button onClick={handleSave} disabled={loading} className="w-full sm:w-auto">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Lagrer...
              </>
            ) : (
              "Lagre endringer"
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Sign Out */}
      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="font-medium text-foreground">Logg ut</p>
            <p className="text-sm text-muted-foreground">Avslutt økten din trygt</p>
          </div>
          <Button variant="outline" onClick={handleSignOut} className="gap-2">
            <LogOut className="h-4 w-4" />
            Logg ut
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
