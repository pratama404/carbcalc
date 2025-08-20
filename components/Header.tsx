'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Leaf, Menu, X, ChevronDown } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const navigation = [
    { name: 'Home', href: '/', hasDropdown: false },
    { 
      name: 'Our Partners', 
      href: '/partners', 
      hasDropdown: true,
      items: [
        { name: 'Environmental NGOs', href: '/partners/ngos' },
        { name: 'Corporate Partners', href: '/partners/corporate' },
        { name: 'Government Agencies', href: '/partners/government' }
      ]
    },
    { 
      name: 'Campaigns', 
      href: '/campaigns', 
      hasDropdown: true,
      items: [
        { name: 'Active Campaigns', href: '/campaigns/active' },
        { name: 'Tree Planting', href: '/campaigns/tree-planting' },
        { name: 'Clean Energy', href: '/campaigns/clean-energy' }
      ]
    },
    { name: 'About Us', href: '/about', hasDropdown: false },
    { name: 'Carbon News', href: '/news', hasDropdown: false }
  ]

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mr-2 sm:mr-3" />
            <span className="text-xl sm:text-2xl font-bold text-gray-900">CarbCalc</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button className="flex items-center text-gray-700 hover:text-green-600 font-medium">
                      {item.name}
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                    
                    {activeDropdown === item.name && (
                      <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2">
                        {item.items?.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-green-600 font-medium"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            <Link
              href="/auth/signin"
              className="text-gray-700 hover:text-green-600 font-medium text-sm lg:text-base px-2 lg:px-0"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="bg-green-600 text-white px-3 lg:px-4 py-2 rounded-lg hover:bg-green-700 font-medium text-sm lg:text-base"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="space-y-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.hasDropdown && item.items && (
                    <div className="ml-4 space-y-1">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-lg"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <div className="pt-4 border-t space-y-2">
                <Link
                  href="/auth/signin"
                  className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mx-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}