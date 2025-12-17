'use client'

import { motion } from 'framer-motion'
import { Clock, ArrowRight, Tag } from 'lucide-react'
import Link from 'next/link'

interface GuideProps {
    id: string
    title: string
    category: string
    readTime: string
    excerpt: string
    emoji: string
    color: string
}

export default function GuideCard({ guide, index }: { guide: GuideProps; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200"
        >
            <div className={`h-2 w-full ${guide.color}`}></div>
            <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-3xl shadow-inner">
                        {guide.emoji}
                    </div>
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${guide.color.replace('bg-', 'bg-').replace('500', '100')} ${guide.color.replace('bg-', 'text-').replace('500', '700')}`}>
                        {guide.category}
                    </span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors line-clamp-2">
                    {guide.title}
                </h3>

                <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed">
                    {guide.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 pt-6 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{guide.readTime} read</span>
                    </div>
                    <Link href={`/guides/${guide.id}`} className="flex items-center space-x-2 font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                        <span>Read Guide</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>

            {/* Hover Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/0 to-green-50/50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        </motion.div>
    )
}
