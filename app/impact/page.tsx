'use client'

import { motion } from 'framer-motion'
import { Activity, Wind, Trees, AlertTriangle } from 'lucide-react'

export default function ImpactPage() {
    return (
        <div className="min-h-screen pt-24 pb-20">

            {/* Header */}
            <section className="container mx-auto px-4 mb-16">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                            Real-World <span className="text-green-600">Impact</span>
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            See how collective individual actions translate into massive global change.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Impact Dashboard Grid */}
            <section className="container mx-auto px-4 mb-24">
                <div className="grid lg:grid-cols-2 gap-8">

                    {/* Main Graph Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 col-span-1 lg:col-span-2"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Annual CO₂ Reduction</h2>
                                <p className="text-gray-500">Community Goal vs Actual Progress</p>
                            </div>
                            <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-bold text-sm">
                                +12% Ahead of Target
                            </div>
                        </div>

                        {/* CSS Bar Chart Mock */}
                        <div className="h-64 flex items-end justify-between space-x-2 md:space-x-8">
                            {[40, 65, 45, 80, 55, 90, 75, 85, 95, 100, 90, 95].map((h, i) => (
                                <div key={i} className="w-full bg-gray-100 rounded-t-xl relative group overflow-hidden">
                                    <div
                                        style={{ height: `${h}%` }}
                                        className="absolute bottom-0 w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-xl transition-all duration-1000 group-hover:opacity-90"
                                    ></div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                            <span>Jan</span><span>Dec</span>
                        </div>
                    </motion.div>

                    {/* Stat Card 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="bg-purple-50 p-8 rounded-3xl border border-purple-100"
                    >
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                            <Trees className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="text-4xl font-bold text-gray-900 mb-2">1.2 Million</h3>
                        <p className="text-gray-600 font-medium mb-4">Trees Equivalent Saved</p>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            Our users have reduced enough carbon to equal the sequestration power of a medium-sized forest over 10 years.
                        </p>
                    </motion.div>

                    {/* Stat Card 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-blue-50 p-8 rounded-3xl border border-blue-100"
                    >
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                            <Wind className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-4xl font-bold text-gray-900 mb-2">45% Better</h3>
                        <p className="text-gray-600 font-medium mb-4">Average Air Quality Awareness</p>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            Users who check our Air Quality map daily report making 45% more eco-conscious transport decisions.
                        </p>
                    </motion.div>

                </div>
            </section>

            {/* Global Alert Section */}
            <section className="container mx-auto px-4">
                <div className="bg-red-50 p-6 md:p-12 rounded-3xl flex flex-col md:flex-row items-center gap-8 border border-red-100">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
                        <AlertTriangle className="w-8 h-8 text-red-600" />
                    </div>
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Climate Tipping Points Ahead</h2>
                        <p className="text-gray-600 max-w-2xl">
                            We are approaching critical temperature thresholds. Every kilogram of carbon reduced today is worth more than a ton reduced in 2050.
                        </p>
                    </div>
                    <button className="px-8 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-200 ml-auto">
                        Take Action Now
                    </button>
                </div>
            </section>

        </div>
    )
}
