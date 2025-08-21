'use client'

import Link from 'next/link'
import { Leaf, Instagram, Twitter, Youtube, Send, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  const productsTools = [
    { name: 'Subscription', href: '/subscription' },
    { name: 'Reduction Guides', href: '/guides' },
    { name: 'Carbon Calculator', href: '/calculator' },
    { name: 'Offset Anything', href: '/offset' },
    { name: 'Purchase Gift', href: '/gifts' },
    { name: 'Use Cases for Business', href: '/business' }
  ]

  const supportCompany = [
    { name: 'Contact Us', href: '/contact' },
    { name: 'Our Projects', href: '/projects' },
    { name: 'Our Approach', href: '/approach' },
    { name: 'About Us', href: '/about' },
    { name: 'Project Updates', href: '/updates' },
    { name: 'FAQ', href: '/faq' }
  ]

  const projectsFor = [
    { name: 'Individuals', href: '/individuals' },
    { name: 'Families', href: '/families' },
    { name: 'Businesses', href: '/businesses' },
    { name: 'Philanthropy', href: '/philanthropy' },
    { name: 'Donation', href: '/donate' }
  ]

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/thegeotera/', color: 'hover:text-pink-500' },
    { name: 'X', icon: Twitter, href: 'https://x.com/thegeotera', color: 'hover:text-blue-400' },
    { name: 'YouTube', icon: Youtube, href: 'https://www.youtube.com/channel/UCr5W2EpnCGTsDX7iab6CDBA', color: 'hover:text-red-500' },
    { name: 'Telegram', icon: Send, href: 'https://t.me/thegeotera', color: 'hover:text-blue-500' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/geotera-carbon-air-7800aa329/', color: 'hover:text-blue-600' }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          
          {/* Section 1: Motto + Social Media */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-4 sm:mb-6">
              <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 mr-2 sm:mr-3" />
              <span className="text-xl sm:text-2xl font-bold">CarbCalc</span>
            </div>
            
            <p className="text-base sm:text-lg font-medium text-green-400 mb-3 sm:mb-4">
              "Empowering Climate Action – One Step at a Time"
            </p>
            
            <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 leading-relaxed">
              Join millions of users worldwide in tracking, reducing, and offsetting their carbon footprint. 
              Together, we can make a meaningful impact on our planet's future.
            </p>
            
            <div className="flex space-x-3 sm:space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className={`p-2 bg-gray-800 rounded-lg text-gray-400 ${social.color} transition-colors`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Section 2: Products & Tools */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-green-400">Products & Tools</h3>
            <ul className="space-y-3">
              {productsTools.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Support & Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-green-400">Support & Company</h3>
            <ul className="space-y-3">
              {supportCompany.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 4: Projects For... */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-green-400">Projects For</h3>
            <ul className="space-y-3 mb-6">
              {projectsFor.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>hello@carbcalc.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-0.5" />
                <span>123 Green Street<br />Eco City, EC 12345</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            
            {/* Copyright */}
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 CarbCalc. All rights reserved. | Built with 💚 for the planet.
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
              
              {/* Language Toggle */}
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">🌐</span>
                <select className="bg-gray-800 text-gray-300 text-sm border border-gray-700 rounded px-2 py-1">
                  <option value="en">English</option>
                  <option value="id">Bahasa Indonesia</option>
                  <option value="es">Español</option>
                </select>
              </div>
            </div>
          </div>

          {/* Environmental Stats */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-400">2.5M+</div>
                <div className="text-sm text-gray-400">kg CO₂ Offset</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">50K+</div>
                <div className="text-sm text-gray-400">Active Users</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">15K+</div>
                <div className="text-sm text-gray-400">Trees Planted</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">100+</div>
                <div className="text-sm text-gray-400">Partner Organizations</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}