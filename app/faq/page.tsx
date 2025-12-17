'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Leaf, Search, ChevronDown, ChevronUp, Calculator, Shield, Users, Zap } from 'lucide-react'

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [openItems, setOpenItems] = useState<number[]>([])

  const categories = [
    { id: 'all', label: 'All Questions', icon: null },
    { id: 'general', label: 'General', icon: Calculator },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'features', label: 'Features', icon: Zap },
    { id: 'account', label: 'Account', icon: Users }
  ]

  const faqs = [
    {
      id: 1,
      category: 'general',
      question: 'How accurate are CarbCalc\'s carbon calculations?',
      answer: 'Our calculations use IPCC-approved emission factors and are regularly updated based on the latest scientific research. We achieve 95%+ accuracy compared to professional carbon audits. Our methodology is transparent and follows international standards like the GHG Protocol.'
    },
    {
      id: 2,
      category: 'general',
      question: 'Is CarbCalc really free to use?',
      answer: 'Yes! CarbCalc offers a comprehensive free plan that includes basic carbon tracking, simple recommendations, monthly reports, and community access. We also offer premium features for advanced users and enterprise solutions for organizations.'
    },
    {
      id: 3,
      category: 'general',
      question: 'What makes CarbCalc different from other carbon calculators?',
      answer: 'CarbCalc combines AI-powered personalized recommendations, gamification elements, social features, and real-time tracking. Unlike static calculators, we help you take action with specific, achievable suggestions and track your progress over time.'
    },
    {
      id: 4,
      category: 'privacy',
      question: 'How do you protect my personal data?',
      answer: 'We use enterprise-grade security including data encryption, secure servers, and regular security audits. We never sell your personal data to third parties. You can export or delete your data at any time. Read our full Privacy Policy for complete details.'
    },
    {
      id: 5,
      category: 'privacy',
      question: 'Do you share my carbon footprint data?',
      answer: 'Your individual data remains private. We only share anonymized, aggregated statistics (like community totals) to show collective impact. You control what information you share with the community through your privacy settings.'
    },
    {
      id: 6,
      category: 'features',
      question: 'How does the AI recommendation system work?',
      answer: 'Our AI analyzes your carbon footprint patterns, lifestyle factors, and preferences to suggest personalized actions. It uses Google Gemini AI to provide context-aware recommendations that are realistic and achievable for your specific situation.'
    },
    {
      id: 7,
      category: 'features',
      question: 'Can I track my family\'s carbon footprint?',
      answer: 'Yes! Premium users can create family accounts to track multiple household members. You can set up separate profiles for family members and see combined household emissions and progress.'
    },
    {
      id: 8,
      category: 'features',
      question: 'What categories of emissions do you track?',
      answer: 'We track four main categories: Transportation (car, public transport, flights), Energy (electricity, heating, cooling), Food (meat, dairy, vegetables, processed foods), and Waste (recycling, landfill, composting). Each category includes detailed subcategories.'
    },
    {
      id: 9,
      category: 'features',
      question: 'How do achievements and gamification work?',
      answer: 'You earn points for tracking activities, meeting goals, and reducing emissions. Unlock badges for milestones like "Week Warrior" or "Carbon Neutral." Compete with friends on leaderboards and participate in community challenges.'
    },
    {
      id: 10,
      category: 'account',
      question: 'How do I create an account?',
      answer: 'Simply click "Sign Up" and provide your name, email, and password. You can also sign up with Google or Apple. Account creation takes less than 2 minutes and you can start tracking immediately.'
    },
    {
      id: 11,
      category: 'account',
      question: 'Can I use CarbCalc without creating an account?',
      answer: 'You can use our basic calculator without an account, but creating one unlocks features like progress tracking, AI recommendations, achievements, and community features. It\'s free and takes just 2 minutes.'
    },
    {
      id: 12,
      category: 'account',
      question: 'How do I upgrade to premium?',
      answer: 'Go to Settings > Subscription in your dashboard. Premium costs $9/month and includes advanced AI insights, detailed analytics, custom goals, priority support, and data export features.'
    },
    {
      id: 13,
      category: 'general',
      question: 'What is the global average carbon footprint?',
      answer: 'The global average is about 4 tons CO₂ per person per year, but this varies significantly by country. In the US, it\'s about 16 tons per year. To limit global warming to 1.5°C, we need to reach about 2.3 tons per person by 2030.'
    },
    {
      id: 14,
      category: 'features',
      question: 'Can I export my data?',
      answer: 'Yes! Premium users can export their data in CSV, PDF, or JSON formats. This includes all your tracking data, progress reports, and achievements. You can also generate professional reports for sharing.'
    },
    {
      id: 15,
      category: 'general',
      question: 'Do you have a mobile app?',
      answer: 'CarbCalc is fully responsive and works great on mobile browsers. We\'re currently developing native iOS and Android apps with additional features like GPS tracking and offline mode. Join our waitlist to be notified when they launch!'
    }
  ]

  const toggleItem = (id: number) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Leaf className="w-8 h-8 text-green-600" />
              <span className="text-xl font-bold">CarbCalc</span>
            </Link>
            <Link href="/contact" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              Contact Support
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Find answers to common questions about CarbCalc
          </p>

          {/* Search */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
            />
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon
                  const count = category.id === 'all'
                    ? faqs.length
                    : faqs.filter(faq => faq.category === category.id).length

                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${activeCategory === category.id
                          ? 'bg-green-50 text-green-700 border border-green-200'
                          : 'hover:bg-gray-50'
                        }`}
                    >
                      <div className="flex items-center space-x-3">
                        {Icon && <Icon className="w-5 h-5" />}
                        <span className="font-medium">{category.label}</span>
                      </div>
                      <span className="text-sm text-gray-500">({count})</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600">Try adjusting your search or browse different categories</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <div key={faq.id} className="bg-white rounded-2xl shadow-sm border border-gray-100">
                    <button
                      onClick={() => toggleItem(faq.id)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 rounded-2xl transition-colors"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                      {openItems.includes(faq.id) ? (
                        <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      )}
                    </button>

                    {openItems.includes(faq.id) && (
                      <div className="px-6 pb-6">
                        <div className="pt-4 border-t border-gray-100">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Still have questions? */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Can&apos;t find what you&apos;re looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700">
              Contact Support
            </Link>
            <Link href="/auth/signup" className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50">
              Start Using CarbCalc
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}