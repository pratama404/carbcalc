'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button' // Assuming we have this, or I'll check/create it.
import { ArrowRight, Leaf, Globe, Wind } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-green-50 to-blue-50 pt-32 pb-20 lg:pt-40 lg:pb-28">
            {/* Background Blobs */}
            <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 opacity-30">
                <div className="w-96 h-96 bg-green-300 rounded-full blur-3xl filter mix-blend-multiply animate-blob"></div>
            </div>
            <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 opacity-30">
                <div className="w-96 h-96 bg-blue-300 rounded-full blur-3xl filter mix-blend-multiply animate-blob animation-delay-2000"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-sm border border-green-200 text-green-700 text-sm font-semibold mb-6 shadow-sm">
                            <Leaf className="w-4 h-4 mr-2" />
                            #1 Carbon Footprint Tracker for Students
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-green-800 to-blue-900 mb-6 leading-tight tracking-tight">
                            Calculate. Reduce. <br className="hidden md:block" />
                            <span className="text-green-600">Restore the Planet.</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Track your daily emissions, complete eco-challenges, and visualize your impact on air quality. Join thousands of students making a difference today.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                            <Link href="/calculator" className="w-full sm:w-auto">
                                <button className="w-full sm:w-auto px-8 py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 hover:scale-105 transition-all shadow-lg shadow-green-200 flex items-center justify-center">
                                    Start Calculating
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </button>
                            </Link>
                            <Link href="/dashboard" className="w-full sm:w-auto">
                                <button className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-xl font-bold text-lg hover:bg-gray-50 hover:border-green-200 transition-all shadow-sm flex items-center justify-center">
                                    View Dashboard
                                </button>
                            </Link>
                        </div>

                        <div className="mt-12 flex items-center justify-center space-x-8 text-gray-500 text-sm font-medium">
                            <div className="flex items-center">
                                <Globe className="w-4 h-4 mr-2 text-blue-500" />
                                Global Impact
                            </div>
                            <div className="flex items-center">
                                <Wind className="w-4 h-4 mr-2 text-teal-500" />
                                Real-time Air Quality
                            </div>
                            <div className="flex items-center">
                                <Leaf className="w-4 h-4 mr-2 text-green-500" />
                                Eco-friendly
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
