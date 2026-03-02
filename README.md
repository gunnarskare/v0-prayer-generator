# Din Misjon

En norsk nettside for daglig bønn og bibellesning, bygget med Next.js og Supabase.

## Om prosjektet

Din Misjon er en plattform designet for å hjelpe brukere med å styrke sin tro gjennom daglig bønn og bibellesning. Nettsiden tilbyr ferdige bønner, mulighet til å lage egne personlige bønner, og bibelleseplaner.

## Funksjoner

- **Bønnesamling** - Ferdigskrevne bønner for ulike anledninger (morgen, kveld, måltider, beskyttelse, takknemlighet)
- **Helhetlig bønn** - En omfattende daglig bønn som kan personliggjøres med ektefelles navn og tilpasses kjønn
- **Lag egen bønn** - Brukere kan opprette egne bønner med dynamiske variabler for familie og venner
- **Bibeloversikt** - Navigerbar oversikt over alle 66 bibelbøker
- **Leseplaner** - Kuraterte leseplaner for systematisk bibellesning
- **Dagens vers** - Daglig bibelvers med mulighet for deling
- **Brukerkontoer** - Registrering og innlogging for å lagre personlig informasjon


## Teknologi

- **Frontend**: Next.js 16, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Supabase (autentisering og database)
- **Deployment**: Vercel


## Kom i gang

### Forutsetninger

- Node.js 18+
- pnpm (eller npm/yarn)
- Supabase-konto


### Installasjon

1. Klon repositoriet:


```shellscript
git clone https://github.com/gunnarskare/v0-prayer-generator.git
cd v0-prayer-generator
```

2. Installer avhengigheter:


```shellscript
pnpm install
```

3. Sett opp miljøvariabler:


```shellscript
cp .env.example .env.local
```

Fyll inn følgende variabler:

```plaintext
NEXT_PUBLIC_SUPABASE_URL=din_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=din_supabase_anon_key
```

4. Kjør databasemigrasjoner i Supabase (se `/scripts`-mappen)
5. Start utviklingsserveren:


```shellscript
pnpm dev
```

Åpne [http://localhost:3000](http://localhost:3000) i nettleseren.

## Databasestruktur

- **profiles** - Brukerprofilinformasjon
- **family_members** - Familiemedlemmer og venner for dynamiske bønner
- **user_prayers** - Brukergenererte bønner
- **prayer_variants** - Ulike varianter av bønner (ren, ektefelle, familie, etc.)


## Mappestruktur

```plaintext
├── app/                  # Next.js App Router sider
│   ├── auth/            # Autentiseringssider
│   ├── bibel/           # Bibeloversikt
│   ├── bonn/            # Bønnesider
│   ├── leseplaner/      # Leseplaner
│   └── min-side/        # Brukerens profilside
├── components/          # React-komponenter
├── lib/                 # Hjelpefunksjoner og Supabase-klienter
└── scripts/             # Databasemigrasjoner
```

## Lisens

Dette prosjektet er privat og ikke lisensiert for offentlig bruk.

