'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, BookOpen } from 'lucide-react'
import GuideCard from '@/components/guides/GuideCard'

const guidesData = [
  {
    id: '1',
    title: 'Zero Waste Student Life: A Starter Utility Guide',
    category: 'Lifestyle',
    readTime: '5 min',
    excerpt: 'Practical tips to reduce waste on campus without breaking the bank. From reusable cups to digital notes.',
    emoji: '🎒',
    color: 'bg-blue-500'
  },
  {
    id: '2',
    title: 'The Hidden Carbon Cost of Your Digital Habits',
    category: 'Tech',
    readTime: '4 min',
    excerpt: 'Did you know your emails and streaming habits have a carbon footprint? Learn how to optimize your digital life.',
    emoji: '💻',
    color: 'bg-violet-500'
  },
  {
    id: '3',
    title: 'Sustainable Eating on a Budget',
    category: 'Food',
    readTime: '7 min',
    excerpt: 'How to eat plant-based and eco-friendly meals that are affordable and easy to prep in a dorm.',
    emoji: '🥗',
    color: 'bg-green-500'
  },
  {
    id: '4',
    title: 'Public Transport Hacks for Urban Students',
    category: 'Transport',
    readTime: '6 min',
    excerpt: 'Maximize your commute efficiency while minimizing your carbon emissions. A guide to buses, trains, and bikes.',
    emoji: '🚇',
    color: 'bg-orange-500'
  },
  {
    id: '5',
    title: 'Energy Saving Tips for Your Apartment',
    category: 'Energy',
    readTime: '3 min',
    excerpt: 'Simple changes to your daily routine that can lower your bills and save the planet.',
    emoji: '⚡',
    color: 'bg-yellow-500'
  },
  {
    id: '6',
    title: 'Starting Your First Compost Pile',
    category: 'Waste',
    readTime: '8 min',
    excerpt: 'A complete beginner methodology for composting food scraps, even if you live in a small space.',
    emoji: '🌱',
    color: 'bg-emerald-500'
  }
]

const categories = ['All', 'Lifestyle', 'Tech', 'Food', 'Transport', 'Energy', 'Waste']

export default function GuidesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredGuides = guidesData.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) || guide.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || guide.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Header Section */}
      <div className="container mx-auto px-4 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-bold mb-6">
              <BookOpen className="w-4 h-4 mr-2" />
              Knowledge Hub
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Eco-Living <span className="text-green-600">Guides</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Everything you need to know about reducing your carbon footprint, curated for students and young professionals.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filter & Search Section */}
      <div className="container mx-auto px-4 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-6xl mx-auto bg-white p-4 rounded-2xl shadow-sm border border-gray-100">

          {/* Categories */}
          <div className="flex overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${selectedCategory === category
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search guides..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border-gray-100 focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all outline-none"
            />
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {filteredGuides.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredGuides.map((guide, index) => (
                <GuideCard key={guide.id} guide={guide} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No guides found</h3>
              <p className="text-gray-500">Try adjusting your search or filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}