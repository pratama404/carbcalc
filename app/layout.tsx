import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CarbCalc - Smart Carbon Footprint Calculator',
  description: 'Track, analyze, and reduce your carbon footprint with AI-powered insights. Join thousands making a positive impact.',
  keywords: ['carbon footprint', 'sustainability', 'climate action', 'CO2 calculator'],
}

import Header from '@/components/Header'
import Footer from '@/components/Footer'

// ... imports remain the same

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-gradient-to-br from-green-50 to-blue-50 text-gray-900 min-h-screen selection:bg-green-100 selection:text-green-900 overflow-x-hidden`}>
        <Providers>
          <Header />
          <div className="flex-grow min-h-screen">
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}