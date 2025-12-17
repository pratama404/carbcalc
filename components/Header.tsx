'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Leaf, Menu, X, ChevronDown, User, LogOut, LayoutDashboard, Settings } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { data: session } = useSession()
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' })
  }

  const toggleDropdown = (name: string) => {
    if (activeDropdown === name) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(name)
    }
  }

  const navGroups = [
    {
      name: 'Features',
      items: [
        { name: 'Calculator', href: '/calculator' },
        { name: 'Dashboard', href: '/dashboard', requireAuth: true },
        { name: 'Challenges', href: '/challenges', requireAuth: true },
        { name: 'Offset Projects', href: '/projects' },
      ]
    },
    {
      name: 'Solutions',
      items: [
        { name: 'For Individuals', href: '/individuals' },
        { name: 'For Families', href: '/families' },
        { name: 'For Business', href: '/business' },
      ]
    },
    {
      name: 'Learn',
      items: [
        { name: 'Articles', href: '/articles' },
        { name: 'Air Quality Map', href: '/air-quality' },
        { name: 'Guides', href: '/guides' },
        { name: 'Impact', href: '/impact' },
      ]
    }
  ]

  // Filter items based on auth status
  const getVisibleItems = (items: any[]) => {
    return items.filter(item => !item.requireAuth || session?.user)
  }

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 z-50">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">CarbCalc</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-6" ref={dropdownRef}>
            {navGroups.map((group) => (
              <div key={group.name} className="relative group">
                <button
                  onClick={() => toggleDropdown(group.name)}
                  onMouseEnter={() => setActiveDropdown(group.name)}
                  className={`flex items-center space-x-1 text-sm font-medium transition-colors ${activeDropdown === group.name ? 'text-green-600' : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  <span>{group.name}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === group.name ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                <div
                  className={`absolute top-full left-0 w-56 pt-2 transition-all duration-200 ease-in-out transform origin-top-left z-50 ${activeDropdown === group.name
                    ? 'opacity-100 scale-100 translate-y-0 visible'
                    : 'opacity-0 scale-95 -translate-y-2 invisible'
                    }`}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2 ring-1 ring-black ring-opacity-5">
                    {getVisibleItems(group.items).map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setActiveDropdown(null)}
                        className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-green-50 hover:text-green-700 transition-colors font-medium"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Contact
            </Link>
            <Link href="/donate" className="text-sm font-bold text-green-600 hover:text-green-700">
              Donate
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden xl:flex items-center space-x-4">
            {session?.user ? (
              <div className="flex items-center space-x-4">
                {pathname !== '/dashboard' && (
                  <Link
                    href="/dashboard"
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 font-medium"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                )}

                <div className="relative group">
                  <button className="flex items-center space-x-2 focus:outline-none">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {session.user.name?.charAt(0) || 'U'}
                    </div>
                  </button>
                  {/* User Dropdown */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all z-50 border border-gray-100">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{session.user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                    </div>
                    <Link href="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <User className="w-4 h-4 mr-2" /> Profile
                    </Link>
                    <Link href="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <Settings className="w-4 h-4 mr-2" /> Settings
                    </Link>
                    <button onClick={handleLogout} className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                      <LogOut className="w-4 h-4 mr-2" /> Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link href="/auth/signin" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                  Sign In
                </Link>
                <Link href="/auth/signup" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-medium transition-colors shadow-sm hover:shadow-md">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`xl:hidden fixed inset-y-0 left-0 z-[100] w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <span className="font-bold text-xl text-gray-900">Menu</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-gray-500 hover:text-gray-900"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-4 space-y-6">
            {navGroups.map((group) => (
              <div key={group.name} className="space-y-3">
                <div className="font-semibold text-gray-900 border-b border-gray-100 pb-2">{group.name}</div>
                <div className="flex flex-col space-y-2 pl-2">
                  {getVisibleItems(group.items).map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-sm text-gray-600 hover:text-green-600 font-medium py-1"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <div className="border-t border-gray-100 pt-6 space-y-3">
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="block text-base font-medium text-gray-600">About</Link>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block text-base font-medium text-gray-600">Contact</Link>
              <Link href="/donate" onClick={() => setIsMobileMenuOpen(false)} className="block text-base font-bold text-green-600">Donate</Link>
            </div>
          </div>

          <div className="p-4 border-t border-gray-100 bg-gray-50">
            {session?.user ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">
                    {session.user.name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{session.user.name}</div>
                    <div className="text-xs text-gray-500 truncate max-w-[150px]">{session.user.email}</div>
                  </div>
                </div>
                <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Dashboard</Link>
                <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="block w-full text-center py-2 text-sm font-medium text-red-600 hover:text-red-700">Logout</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link href="/auth/signin" onClick={() => setIsMobileMenuOpen(false)} className="flex justify-center py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Sign In</Link>
                <Link href="/auth/signup" onClick={() => setIsMobileMenuOpen(false)} className="flex justify-center py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 shadow-sm">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 xl:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  )
}