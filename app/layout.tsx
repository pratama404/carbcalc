import type { Metadata } from 'next'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'Carbon Calculator - Track Your Environmental Impact',
  description: 'Calculate, track, and reduce your daily carbon footprint with AI-powered recommendations and social sharing.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}