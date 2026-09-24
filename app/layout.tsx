import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Dancing_Script, Manrope, Playfair_Display } from 'next/font/google'
import './globals.css'
import { SmoothScroll } from '@/components/smooth-scroll-provider'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700', '800', '900'],
  display: 'swap',
})

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-logo',
  weight: ['600', '700'],
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

const siteUrl = 'https://giovanni-rana.example.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Giovanni Rana | Pasta fresca italiana dal 1962',
    template: '%s | Giovanni Rana',
  },
  description:
    "Scopri la storia, i valori e le ricette di Giovanni Rana: pasta fresca artigianale italiana, tradizione di famiglia e passione autentica dal 1962.",
  keywords: [
    'Giovanni Rana',
    'pasta fresca',
    'pasta artigianale',
    'ricette italiane',
    'tradizione italiana',
    'tortellini',
    'gnocchi',
    'lasagne',
    'ravioli',
    'tagliatelle',
  ],
  authors: [{ name: 'Davide Arduini' }],
  creator: 'Davide Arduini',
  publisher: 'Giovanni Rana',
  alternates: {
    canonical: '/',
    languages: { 'it-IT': '/' },
  },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: siteUrl,
    siteName: 'Giovanni Rana',
    title: 'Giovanni Rana | Pasta fresca italiana dal 1962',
    description:
      'Ingredienti veri, ricette di famiglia e la cura artigianale di chi crede che il buon cibo unisca le persone attorno a un tavolo.',
    images: [
      {
        url: '/images/hero-bg.png',
        width: 1200,
        height: 630,
        alt: 'Famiglia italiana prepara pasta fresca a mano in cucina',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Giovanni Rana | Pasta fresca italiana dal 1962',
    description:
      'Ingredienti veri, ricette di famiglia e la cura artigianale di chi crede che il buon cibo unisca le persone attorno a un tavolo.',
    images: ['/images/hero-bg.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'food & drink',
  generator: 'v0.app',
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png', sizes: '64x64' }],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#FFF4DC',
  userScalable: true,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="it"
      className={`${playfair.variable} ${manrope.variable} ${dancingScript.variable}`}
    >
      <body className="antialiased bg-cream text-anthracite font-sans">
        <SmoothScroll>
          {children}
        </SmoothScroll>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
