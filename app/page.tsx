'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Leaf, Calculator, TrendingUp, Users, Star, ChevronRight, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return
    if (session) {
      router.push('/dashboard')
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (session) {
    return null // Will redirect to dashboard
  }

  const features = [
    {
      icon: Calculator,
      title: 'Easy Carbon Tracking',
      description: 'Track your daily activities across transportation, energy, food, and waste with our intuitive calculator.'
    },
    {
      icon: TrendingUp,
      title: 'AI-Powered Insights',
      description: 'Get personalized recommendations from Google Gemini AI to reduce your environmental impact.'
    },
    {
      icon: Users,
      title: 'Social Impact',
      description: 'Share your progress and inspire others with beautiful infographics and social media integration.'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Leaf className="w-8 h-8 text-green-600 mr-3" />
              <span className="text-2xl font-bold text-gray-900">CarbCalc</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/signin" className="text-gray-600 hover:text-gray-900">
                Sign In
              </Link>
              <Link href="/auth/signup" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Track Your Carbon Footprint,
              <span className="text-green-600"> Make a Difference</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Calculate, track, and reduce your daily carbon emissions with AI-powered recommendations. 
              Join thousands making a positive impact on our planet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/auth/signup" className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 flex items-center">
                Start Tracking Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link href="/auth/signin" className="text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-50 flex items-center">
                Sign In
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Go Green
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform makes it fun and easy to track, understand, and reduce your environmental impact.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="text-center p-8 rounded-xl bg-gray-50 hover:bg-green-50 transition-colors">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Start your carbon reduction journey today. It's free, easy, and makes a real impact.
          </p>
          <Link href="/auth/signup" className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 inline-flex items-center">
            Get Started Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Leaf className="w-8 h-8 text-green-400 mr-3" />
              <span className="text-2xl font-bold">CarbCalc</span>
            </div>
            <p className="text-gray-400 mb-6">
              Making carbon tracking simple, accurate, and actionable for everyone.
            </p>
            <div className="flex justify-center space-x-8 text-sm text-gray-400">
              <span>Built with Next.js</span>
              <span>•</span>
              <span>Powered by Gemini AI</span>
              <span>•</span>
              <span>MongoDB Database</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}