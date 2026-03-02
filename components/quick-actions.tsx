import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, BookOpen, Calendar, Sparkles } from "lucide-react"

interface QuickActionsProps {
  hasWife: boolean
  wifeName: string
}

export function QuickActions({ hasWife, wifeName }: QuickActionsProps) {
  return (
    <div className="space-y-6">
      {/* Today's Prayer */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="h-5 w-5 text-primary" />
            Din bønn
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            {hasWife && wifeName
              ? `Bønnen din inkluderer ${wifeName} automatisk.`
              : "Generer din personlige daglige bønn."}
          </p>
          <Button asChild className="w-full">
            <Link href={`/bonn${hasWife && wifeName ? `?kone=${encodeURIComponent(wifeName)}` : ""}`}>
              <Heart className="mr-2 h-4 w-4" />
              Vis dagens bønn
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Snarveier</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button asChild variant="outline" className="w-full justify-start">
            <Link href="/bibel">
              <BookOpen className="mr-2 h-4 w-4" />
              Les i Bibelen
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full justify-start">
            <Link href="/leseplaner">
              <Calendar className="mr-2 h-4 w-4" />
              Mine leseplaner
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Status */}
      {hasWife && wifeName && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Bønner for</p>
                <p className="font-medium text-foreground">{wifeName}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
