import type { Metadata, Viewport } from 'next'
import { Inter, Merriweather } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
})

const merriweather = Merriweather({ 
  subsets: ["latin"],
  weight: ['300', '400', '700', '900'],
  variable: '--font-merriweather',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Din Misjon - Daglig Bønn og Bibellesning',
  description: 'Styrk din tro med daglig bønn, bibelvers og leseplaner. En norsk plattform for åndelig vekst og fellesskap.',
  keywords: ['bibel', 'bønn', 'kristen', 'andakt', 'bibelvers', 'leseplaner', 'tro', 'norsk'],
  authors: [{ name: 'Din Misjon' }],
  openGraph: {
    title: 'Din Misjon - Daglig Bønn og Bibellesning',
    description: 'Styrk din tro med daglig bønn, bibelvers og leseplaner.',
    type: 'website',
    locale: 'nb_NO',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#3d5a3d' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="nb" className={`${inter.variable} ${merriweather.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
