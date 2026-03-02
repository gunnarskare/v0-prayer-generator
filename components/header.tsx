"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Book, Heart, Calendar, Home, User, LogIn } from "lucide-react"
import type { User as SupabaseUser } from "@supabase/supabase-js"

const navigation = [
  { name: "Hjem", href: "/", icon: Home },
  { name: "Bibel", href: "/bibel", icon: Book },
  { name: "Bønn", href: "/bonn", icon: Heart },
  { name: "Leseplaner", href: "/leseplaner", icon: Calendar },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  return (
    <header className="sticky top-0 z-50 w-full bg-hero-bg text-hero-foreground">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Book className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold tracking-tight">dinmisjon</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-hero-foreground/80 transition-colors hover:bg-white/10 hover:text-hero-foreground"
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex md:items-center md:gap-2">
          {user ? (
            <Button 
              asChild 
              variant="ghost"
              className="text-hero-foreground/80 hover:bg-white/10 hover:text-hero-foreground"
            >
              <Link href="/min-side" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Min side
              </Link>
            </Button>
          ) : (
            <>
              <Button 
                asChild 
                variant="ghost"
                className="text-hero-foreground/80 hover:bg-white/10 hover:text-hero-foreground"
              >
                <Link href="/auth/logg-inn">Logg inn</Link>
              </Button>
              <Button 
                asChild 
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/auth/registrer">Registrer</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-hero-foreground hover:bg-white/10">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Meny</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-hero-bg text-hero-foreground border-l-0">
            <div className="flex flex-col gap-6 pt-6">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                    <Book className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="text-lg font-semibold">dinmisjon</span>
                </Link>
              </div>
              <nav className="flex flex-col gap-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium text-hero-foreground/80 transition-colors hover:bg-white/10 hover:text-hero-foreground"
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="pt-4 space-y-2">
                {user ? (
                  <Button 
                    asChild 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Link href="/min-side" onClick={() => setIsOpen(false)}>
                      <User className="mr-2 h-4 w-4" />
                      Min side
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button 
                      asChild 
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Link href="/auth/registrer" onClick={() => setIsOpen(false)}>
                        Registrer
                      </Link>
                    </Button>
                    <Button 
                      asChild 
                      variant="outline"
                      className="w-full border-hero-foreground/20 text-hero-foreground hover:bg-white/10"
                    >
                      <Link href="/auth/logg-inn" onClick={() => setIsOpen(false)}>
                        <LogIn className="mr-2 h-4 w-4" />
                        Logg inn
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
