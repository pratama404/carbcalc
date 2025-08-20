import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CarbCalc - Carbon Footprint Calculator',
  description: 'Track, calculate, and reduce your carbon footprint with AI-powered insights. Monitor air quality and take climate action.',
  keywords: ['carbon footprint', 'climate change', 'sustainability', 'air quality', 'environment', 'CO2 calculator'],
  authors: [{ name: 'CarbCalc Team' }],
  creator: 'CarbCalc',
  publisher: 'CarbCalc',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://carbcalc.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'CarbCalc - Carbon Footprint Calculator',
    description: 'Track, calculate, and reduce your carbon footprint with AI-powered insights',
    url: 'https://carbcalc.com',
    siteName: 'CarbCalc',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CarbCalc - Carbon Footprint Calculator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CarbCalc - Carbon Footprint Calculator',
    description: 'Track, calculate, and reduce your carbon footprint with AI-powered insights',
    images: ['/og-image.png'],
    creator: '@carbcalc',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  manifest: '/manifest.json',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="theme-color" content="#10b981" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}