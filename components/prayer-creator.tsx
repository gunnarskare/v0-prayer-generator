"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  ArrowLeft, 
  Save, 
  Info, 
  User, 
  Heart, 
  Users, 
  UserPlus,
  Sparkles,
  Eye
} from "lucide-react"
import Link from "next/link"

type VariantType = "clean" | "spouse" | "children" | "family" | "friends" | "all"

interface FamilyMember {
  id: string
  type: "spouse" | "son" | "daughter" | "friend"
  name: string
}

const variantInfo: Record<VariantType, { label: string; description: string; icon: React.ReactNode; placeholders: string[] }> = {
  clean: {
    label: "Ren versjon",
    description: "Grunnversjonen uten noen navn",
    icon: <User className="h-4 w-4" />,
    placeholders: [],
  },
  spouse: {
    label: "Med ektefelle",
    description: "Inkluderer ektefelle",
    icon: <Heart className="h-4 w-4" />,
    placeholders: ["{{ektefelle}}"],
  },
  children: {
    label: "Med barn",
    description: "Inkluderer alle barn",
    icon: <Users className="h-4 w-4" />,
    placeholders: ["{{barn}}"],
  },
  family: {
    label: "Med familie",
    description: "Inkluderer ektefelle og barn",
    icon: <Users className="h-4 w-4" />,
    placeholders: ["{{ektefelle}}", "{{barn}}"],
  },
  friends: {
    label: "Med venner",
    description: "Inkluderer venner",
    icon: <UserPlus className="h-4 w-4" />,
    placeholders: ["{{venner}}"],
  },
  all: {
    label: "Alle",
    description: "Inkluderer familie og venner",
    icon: <Sparkles className="h-4 w-4" />,
    placeholders: ["{{ektefelle}}", "{{barn}}", "{{venner}}"],
  },
}

export function PrayerCreator() {
  const router = useRouter()
  const supabase = createClient()
  
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [variants, setVariants] = useState<Record<VariantType, string>>({
    clean: "",
    spouse: "",
    children: "",
    family: "",
    friends: "",
    all: "",
  })
  const [activeVariants, setActiveVariants] = useState<VariantType[]>(["clean"])
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState<VariantType>("clean")
  const [previewMode, setPreviewMode] = useState(false)

  useEffect(() => {
    loadFamilyMembers()
  }, [])

  async function loadFamilyMembers() {
    const { data } = await supabase
      .from("family_members")
      .select("*")
      .order("sort_order")
    
    if (data) {
      setFamilyMembers(data)
    }
  }

  function toggleVariant(variant: VariantType) {
    if (variant === "clean") return // Clean is always required
    
    if (activeVariants.includes(variant)) {
      setActiveVariants(activeVariants.filter((v) => v !== variant))
    } else {
      setActiveVariants([...activeVariants, variant])
    }
  }

  function getPreviewText(variant: VariantType): string {
    let text = variants[variant] || variants.clean
    
    const spouse = familyMembers.find((m) => m.type === "spouse")
    const children = familyMembers.filter((m) => m.type === "son" || m.type === "daughter")
    const friends = familyMembers.filter((m) => m.type === "friend")
    
    // Replace placeholders
    if (spouse) {
      text = text.replace(/\{\{ektefelle\}\}/g, spouse.name)
    }
    
    if (children.length > 0) {
      const childNames = children.map((c) => c.name)
      const childrenText = childNames.length > 1 
        ? childNames.slice(0, -1).join(", ") + " og " + childNames[childNames.length - 1]
        : childNames[0]
      text = text.replace(/\{\{barn\}\}/g, childrenText)
    }
    
    if (friends.length > 0) {
      const friendNames = friends.map((f) => f.name)
      const friendsText = friendNames.length > 1
        ? friendNames.slice(0, -1).join(", ") + " og " + friendNames[friendNames.length - 1]
        : friendNames[0]
      text = text.replace(/\{\{venner\}\}/g, friendsText)
    }
    
    // Clean up any remaining placeholders for preview
    text = text.replace(/\{\{ektefelle\}\}/g, "[ektefelle]")
    text = text.replace(/\{\{barn\}\}/g, "[barn]")
    text = text.replace(/\{\{venner\}\}/g, "[venner]")
    
    return text
  }

  async function handleSave() {
    if (!title.trim()) {
      setError("Du må gi bønnen en tittel")
      return
    }
    
    if (!variants.clean.trim()) {
      setError("Du må skrive den rene versjonen av bønnen")
      return
    }

    setSaving(true)
    setError("")

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setError("Du må være logget inn for å lagre bønner")
        setSaving(false)
        return
      }

      // Create the prayer
      const { data: prayer, error: prayerError } = await supabase
        .from("user_prayers")
        .insert({
          user_id: user.id,
          title: title.trim(),
          description: description.trim() || null,
          is_public: false,
        })
        .select()
        .single()

      if (prayerError || !prayer) {
        throw new Error("Kunne ikke lagre bønnen")
      }

      // Create variants
      const variantsToInsert = activeVariants
        .filter((v) => variants[v].trim())
        .map((v) => ({
          prayer_id: prayer.id,
          variant_type: v,
          content: variants[v].trim(),
        }))

      if (variantsToInsert.length > 0) {
        const { error: variantsError } = await supabase
          .from("prayer_variants")
          .insert(variantsToInsert)

        if (variantsError) {
          throw new Error("Kunne ikke lagre bønnevariantene")
        }
      }

      router.push("/bonn/mine-bonner")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Noe gikk galt")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Back Link */}
      <div className="mb-8">
        <Link 
          href="/bonn" 
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Tilbake til bønner
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-foreground">Lag ny bønn</h1>
        <p className="mt-2 text-muted-foreground">
          Skriv en bønn med dynamiske variabler som kan tilpasses basert på hvem som leser den.
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Form */}
        <div className="space-y-6 lg:col-span-2">
          {/* Title & Description */}
          <Card>
            <CardHeader>
              <CardTitle>Grunnleggende informasjon</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Tittel *</Label>
                <Input
                  id="title"
                  placeholder="F.eks. Morgenbønn for familien"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Beskrivelse</Label>
                <Input
                  id="description"
                  placeholder="En kort beskrivelse av bønnen"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Variant Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Velg varianter</CardTitle>
              <CardDescription>
                Velg hvilke versjoner av bønnen du vil lage. Ren versjon er alltid påkrevd.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {(Object.keys(variantInfo) as VariantType[]).map((variant) => (
                  <button
                    key={variant}
                    onClick={() => toggleVariant(variant)}
                    disabled={variant === "clean"}
                    className={`flex flex-col items-center gap-2 rounded-lg border p-4 text-center transition-colors ${
                      activeVariants.includes(variant)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    } ${variant === "clean" ? "cursor-default" : "cursor-pointer"}`}
                  >
                    <div className={`rounded-full p-2 ${
                      activeVariants.includes(variant) ? "bg-primary/10 text-primary" : "bg-muted"
                    }`}>
                      {variantInfo[variant].icon}
                    </div>
                    <span className="text-sm font-medium">{variantInfo[variant].label}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Variant Content Tabs */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Skriv bønnene</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPreviewMode(!previewMode)}
                  className="gap-2"
                >
                  <Eye className="h-4 w-4" />
                  {previewMode ? "Rediger" : "Forhåndsvis"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as VariantType)}>
                <TabsList className="mb-4 flex-wrap">
                  {activeVariants.map((variant) => (
                    <TabsTrigger key={variant} value={variant} className="gap-2">
                      {variantInfo[variant].icon}
                      {variantInfo[variant].label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {activeVariants.map((variant) => (
                  <TabsContent key={variant} value={variant} className="space-y-4">
                    <div className="rounded-lg bg-muted/50 p-3">
                      <p className="text-sm text-muted-foreground">
                        {variantInfo[variant].description}
                        {variantInfo[variant].placeholders.length > 0 && (
                          <span className="mt-1 block">
                            Bruk disse plassholderne:{" "}
                            {variantInfo[variant].placeholders.map((p, i) => (
                              <code key={i} className="mx-1 rounded bg-background px-1.5 py-0.5 text-xs">
                                {p}
                              </code>
                            ))}
                          </span>
                        )}
                      </p>
                    </div>

                    {previewMode ? (
                      <div className="prose prose-sm max-w-none rounded-lg border bg-card p-4">
                        {getPreviewText(variant).split("\n\n").map((para, i) => (
                          <p key={i}>{para}</p>
                        ))}
                      </div>
                    ) : (
                      <Textarea
                        placeholder={`Skriv ${variantInfo[variant].label.toLowerCase()} av bønnen her...`}
                        value={variants[variant]}
                        onChange={(e) => setVariants({ ...variants, [variant]: e.target.value })}
                        rows={10}
                        className="font-serif"
                      />
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Help Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Info className="h-4 w-4" />
                Slik bruker du plassholdere
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p className="text-muted-foreground">
                Plassholdere erstattes automatisk med riktige navn når bønnen leses.
              </p>
              <div className="space-y-2">
                <div className="rounded border bg-muted/50 p-2">
                  <code className="text-xs">{"{{ektefelle}}"}</code>
                  <p className="mt-1 text-xs text-muted-foreground">Ektefellens navn</p>
                </div>
                <div className="rounded border bg-muted/50 p-2">
                  <code className="text-xs">{"{{barn}}"}</code>
                  <p className="mt-1 text-xs text-muted-foreground">Alle barns navn</p>
                </div>
                <div className="rounded border bg-muted/50 p-2">
                  <code className="text-xs">{"{{venner}}"}</code>
                  <p className="mt-1 text-xs text-muted-foreground">Alle venners navn</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Example Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Eksempel</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <div className="space-y-3">
                <div>
                  <p className="font-medium">Ren versjon:</p>
                  <p className="text-muted-foreground">Kjære Gud, velsign meg i dag.</p>
                </div>
                <div>
                  <p className="font-medium">Med ektefelle:</p>
                  <p className="text-muted-foreground">
                    Kjære Gud, velsign {"{{ektefelle}}"} og meg i dag.
                  </p>
                </div>
                <div>
                  <p className="font-medium">Med familie:</p>
                  <p className="text-muted-foreground">
                    Kjære Gud, velsign {"{{ektefelle}}"}, {"{{barn}}"} og meg i dag.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <Button 
            onClick={handleSave} 
            disabled={saving} 
            className="w-full gap-2"
            size="lg"
          >
            <Save className="h-4 w-4" />
            {saving ? "Lagrer..." : "Lagre bønn"}
          </Button>
        </div>
      </div>
    </div>
  )
}
