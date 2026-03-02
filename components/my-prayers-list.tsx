"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { 
  User, 
  Heart, 
  Users, 
  UserPlus, 
  Sparkles, 
  Trash2,
  BookOpen,
  Plus
} from "lucide-react"
import Link from "next/link"

type VariantType = "clean" | "spouse" | "children" | "family" | "friends" | "all"

interface PrayerVariant {
  id: string
  variant_type: VariantType
  content: string
}

interface Prayer {
  id: string
  title: string
  description: string | null
  created_at: string
  prayer_variants: PrayerVariant[]
}

interface FamilyMember {
  id: string
  type: "spouse" | "son" | "daughter" | "friend"
  name: string
}

interface MyPrayersListProps {
  prayers: Prayer[]
  familyMembers: FamilyMember[]
}

const variantLabels: Record<VariantType, { label: string; icon: React.ReactNode }> = {
  clean: { label: "Ren versjon", icon: <User className="h-4 w-4" /> },
  spouse: { label: "Med ektefelle", icon: <Heart className="h-4 w-4" /> },
  children: { label: "Med barn", icon: <Users className="h-4 w-4" /> },
  family: { label: "Med familie", icon: <Users className="h-4 w-4" /> },
  friends: { label: "Med venner", icon: <UserPlus className="h-4 w-4" /> },
  all: { label: "Alle", icon: <Sparkles className="h-4 w-4" /> },
}

export function MyPrayersList({ prayers, familyMembers }: MyPrayersListProps) {
  const router = useRouter()
  const supabase = createClient()
  const [selectedVariants, setSelectedVariants] = useState<Record<string, VariantType>>({})
  const [expandedPrayer, setExpandedPrayer] = useState<string | null>(null)

  function getProcessedContent(content: string): string {
    let text = content

    const spouse = familyMembers.find((m) => m.type === "spouse")
    const children = familyMembers.filter((m) => m.type === "son" || m.type === "daughter")
    const friends = familyMembers.filter((m) => m.type === "friend")

    if (spouse) {
      text = text.replace(/\{\{ektefelle\}\}/g, spouse.name)
    } else {
      text = text.replace(/\{\{ektefelle\}\}/g, "[ektefelle ikke angitt]")
    }

    if (children.length > 0) {
      const childNames = children.map((c) => c.name)
      const childrenText = childNames.length > 1
        ? childNames.slice(0, -1).join(", ") + " og " + childNames[childNames.length - 1]
        : childNames[0]
      text = text.replace(/\{\{barn\}\}/g, childrenText)
    } else {
      text = text.replace(/\{\{barn\}\}/g, "[ingen barn angitt]")
    }

    if (friends.length > 0) {
      const friendNames = friends.map((f) => f.name)
      const friendsText = friendNames.length > 1
        ? friendNames.slice(0, -1).join(", ") + " og " + friendNames[friendNames.length - 1]
        : friendNames[0]
      text = text.replace(/\{\{venner\}\}/g, friendsText)
    } else {
      text = text.replace(/\{\{venner\}\}/g, "[ingen venner angitt]")
    }

    return text
  }

  async function deletePrayer(id: string) {
    await supabase.from("user_prayers").delete().eq("id", id)
    router.refresh()
  }

  if (prayers.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="rounded-full bg-primary/10 p-4">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h3 className="mt-4 font-semibold">Ingen bønner ennå</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Du har ikke laget noen egne bønner ennå. Lag din første bønn med dynamiske variabler.
          </p>
          <Button asChild className="mt-6 gap-2">
            <Link href="/bonn/lag-bonn">
              <Plus className="h-4 w-4" />
              Lag din første bønn
            </Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {prayers.map((prayer) => {
        const availableVariants = prayer.prayer_variants.map((v) => v.variant_type)
        const selectedVariant = selectedVariants[prayer.id] || availableVariants[0] || "clean"
        const currentVariant = prayer.prayer_variants.find((v) => v.variant_type === selectedVariant)
        const isExpanded = expandedPrayer === prayer.id

        return (
          <Card key={prayer.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="font-serif text-xl">{prayer.title}</CardTitle>
                  {prayer.description && (
                    <p className="mt-1 text-sm text-muted-foreground">{prayer.description}</p>
                  )}
                  <p className="mt-2 text-xs text-muted-foreground">
                    Opprettet {new Date(prayer.created_at).toLocaleDateString("nb-NO")}
                  </p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Slett bønn?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Er du sikker på at du vil slette &quot;{prayer.title}&quot;? Denne handlingen kan ikke angres.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Avbryt</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deletePrayer(prayer.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Slett
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Variant Selector */}
              {availableVariants.length > 1 && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-muted-foreground">Vis versjon:</span>
                  <Select
                    value={selectedVariant}
                    onValueChange={(v) => setSelectedVariants({ ...selectedVariants, [prayer.id]: v as VariantType })}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {availableVariants.map((variant) => (
                        <SelectItem key={variant} value={variant}>
                          <span className="flex items-center gap-2">
                            {variantLabels[variant].icon}
                            {variantLabels[variant].label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Prayer Content */}
              {currentVariant && (
                <div className="rounded-lg bg-muted/50 p-4">
                  <div className={`prose prose-sm max-w-none ${!isExpanded && "line-clamp-4"}`}>
                    {getProcessedContent(currentVariant.content).split("\n\n").map((para, i) => (
                      <p key={i} className="text-foreground">{para}</p>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedPrayer(isExpanded ? null : prayer.id)}
                    className="mt-2"
                  >
                    {isExpanded ? "Vis mindre" : "Les hele bønnen"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
