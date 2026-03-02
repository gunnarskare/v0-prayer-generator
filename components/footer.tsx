import Link from "next/link"
import { Book, Heart, Calendar, Mail } from "lucide-react"

const footerLinks = {
  ressurser: [
    { name: "Bibel", href: "/bibel" },
    { name: "Leseplaner", href: "/leseplaner" },
    { name: "Daglig Bønn", href: "/bonn" },
  ],
  om: [
    { name: "Om Oss", href: "/om" },
    { name: "Kontakt", href: "/kontakt" },
    { name: "Personvern", href: "/personvern" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-hero-bg text-hero-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Book className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold">dinmisjon</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-hero-foreground/70 leading-relaxed">
              En norsk plattform for daglig bønn og bibellesning. 
              Styrk din tro og voks i fellesskap med Gud.
            </p>
            <div className="mt-6 flex gap-4">
              <Link 
                href="/bonn" 
                className="flex items-center gap-2 text-sm text-hero-foreground/70 hover:text-hero-foreground transition-colors"
              >
                <Heart className="h-4 w-4" />
                Bønn
              </Link>
              <Link 
                href="/leseplaner" 
                className="flex items-center gap-2 text-sm text-hero-foreground/70 hover:text-hero-foreground transition-colors"
              >
                <Calendar className="h-4 w-4" />
                Leseplaner
              </Link>
            </div>
          </div>

          {/* Ressurser */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-hero-foreground/50">
              Ressurser
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.ressurser.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-hero-foreground/70 hover:text-hero-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Om */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-hero-foreground/50">
              Om
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.om.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-hero-foreground/70 hover:text-hero-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-hero-foreground/10 pt-8">
          <p className="text-center text-sm text-hero-foreground/50">
            {new Date().getFullYear()} dinmisjon.no. Alle rettigheter forbeholdt.
          </p>
        </div>
      </div>
    </footer>
  )
}
