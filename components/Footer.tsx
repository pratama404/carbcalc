'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Leaf, Twitter, Linkedin, Send, Youtube, Instagram, Mail, MapPin, MessageSquare } from 'lucide-react'

const socialLinks = [
  { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/geotera-carbon-air-7800aa329/' },
  { name: 'Telegram', icon: Send, href: 'https://t.me/thegeotera' },
  { name: 'YouTube', icon: Youtube, href: 'https://www.youtube.com/channel/UCr5W2EpnCGTsDX7iab6CDBA' },
  { name: 'X', icon: Twitter, href: 'https://x.com/thegeotera' },
  { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/thegeotera/' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (data.success) {
        setStatus('success')
        setMessage('Thank you for subscribing!')
        setEmail('')
        setTimeout(() => setStatus('idle'), 3000)
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Failed to subscribe. Please try again.')
    }
  }

  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">CarbCalc</span>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-2">Stay Updated</h3>
              <p className="text-gray-400 text-sm mb-4">
                Get the latest climate news and insights delivered to your inbox weekly.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm placeholder-gray-500"
                    disabled={status === 'loading' || status === 'success'}
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading' || status === 'success'}
                    className="absolute right-1 top-1 bottom-1 bg-green-600 hover:bg-green-700 text-white px-3 rounded-md text-xs font-semibold transition-colors disabled:opacity-50"
                  >
                    {status === 'loading' ? '...' : status === 'success' ? '✓' : 'Subscribe'}
                  </button>
                </div>
                {status === 'error' && <p className="text-red-400 text-xs">{message}</p>}
                {status === 'success' && <p className="text-green-400 text-xs">{message}</p>}
              </form>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Platform</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/calculator" className="hover:text-green-400 transition-colors">Carbon Calculator</Link></li>
              <li><Link href="/dashboard" className="hover:text-green-400 transition-colors">Dashboard</Link></li>
              <li><Link href="/features" className="hover:text-green-400 transition-colors">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-green-400 transition-colors">Pricing</Link></li>
              <li><Link href="/guides" className="hover:text-green-400 transition-colors">Guides</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-green-400 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-green-400 transition-colors">Contact</Link></li>
              <li><Link href="/projects" className="hover:text-green-400 transition-colors">Projects</Link></li>
              <li><Link href="/articles" className="hover:text-green-400 transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <div className="space-y-4 text-sm text-gray-400">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <p>123 Geotera Carbon<br />Surabaya, East Java, ID 60111</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-green-500 shrink-0" />
                <a href="mailto:geoterateam@gmail.com" className="hover:text-white transition-colors">geoterateam@gmail.com</a>
              </div>
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-5 h-5 text-green-500 shrink-0" />
                <span>Chat only via WhatsApp</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <span>© 2024 CarbCalc. All rights reserved.</span>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>

          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-green-600 hover:text-white transition-all transform hover:-translate-y-1"
                  aria-label={social.name}
                >
                  <Icon className="w-4 h-4" />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}