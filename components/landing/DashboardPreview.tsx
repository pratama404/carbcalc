'use client'

import { motion } from 'framer-motion'
import Image from 'next/image' // Assuming we might use an image, but I'll build a CSS mock first to avoid asset dependency
import { PieChart, Activity, Bell } from 'lucide-react'

export default function DashboardPreview() {
    return (
        <section className="py-24 bg-gray-50 overflow-hidden w-full">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        Your Environmental Impact, <span className="text-green-600">Visualized</span>
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Track your progress with our intuitive dashboard. Analyze trends, get personalized insights, and see real-time air quality data.
                    </p>
                </div>

                {/* Mock Dashboard UI */}
                <motion.div
                    initial={{ opacity: 0, y: 40, rotateX: 10 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative max-w-5xl mx-auto"
                >
                    {/* Glass Frame */}
                    <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-2 md:p-4 perspective-1000">
                        <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 aspect-[16/9] relative group">

                            {/* Sidebar Mock */}
                            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-64 bg-white border-r border-gray-100 hidden md:block">
                                <div className="p-6 border-b border-gray-100">
                                    <div className="w-8 h-8 bg-green-500 rounded-lg"></div>
                                </div>
                                <div className="p-4 space-y-4">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="h-10 bg-gray-100 rounded-lg w-full"></div>
                                    ))}
                                </div>
                            </div>

                            {/* Main Content Mock */}
                            <div className="absolute top-0 right-0 bottom-0 left-0 md:left-64 p-6 md:p-8 bg-gray-50/50">
                                <div className="flex justify-between items-center mb-8">
                                    <div className="w-1/3 h-8 bg-gray-200 rounded-lg"></div>
                                    <div className="flex space-x-3">
                                        <div className="w-10 h-10 bg-white rounded-full shadow-sm"></div>
                                        <div className="w-10 h-10 bg-white rounded-full shadow-sm"></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="bg-white p-6 rounded-xl shadow-sm h-32 animate-pulse">
                                            <div className="w-8 h-8 bg-green-100 rounded-lg mb-4"></div>
                                            <div className="w-1/2 h-6 bg-gray-100 rounded mb-2"></div>
                                            <div className="w-1/3 h-4 bg-gray-50 rounded"></div>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-64">
                                    <div className="bg-white rounded-xl shadow-sm p-6 relative overflow-hidden group-hover:scale-[1.01] transition-transform">
                                        {/* Pie Chart Mock */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-10">
                                            <PieChart className="w-32 h-32" />
                                        </div>
                                        <div className="w-2/3 h-4 bg-gray-100 rounded mb-4"></div>
                                        <div className="w-full h-32 bg-gradient-to-tr from-green-50 to-blue-50 rounded-full"></div>
                                    </div>
                                    <div className="bg-white rounded-xl shadow-sm p-6">
                                        <div className="w-1/2 h-4 bg-gray-100 rounded mb-4"></div>
                                        <div className="space-y-3">
                                            {[1, 2, 3].map(j => (
                                                <div key={j} className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 bg-gray-100 rounded-full"></div>
                                                    <div className="flex-1 h-2 bg-gray-100 rounded-full"></div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Badge / Pop-up */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0, x: 20 }}
                                whileInView={{ scale: 1, opacity: 1, x: 0 }}
                                transition={{ delay: 0.8, type: 'spring' }}
                                className="absolute -bottom-6 -right-6 md:bottom-8 md:right-8 bg-white/90 backdrop-blur-md shadow-2xl p-4 rounded-2xl flex items-center space-x-4 border border-green-100 z-20 max-w-xs"
                            >
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Activity className="w-6 h-6 text-green-600 animate-pulse" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-gray-900">Weekly Insight</div>
                                    <div className="text-xs text-gray-600 mt-1">
                                        You saved <span className="font-bold text-green-600">12kg CO₂</span> by cycling today! 🚲
                                    </div>
                                </div>
                            </motion.div>

                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-green-300 to-blue-300 rounded-[2.5rem] blur-2xl opacity-20 -z-10 animate-pulse"></div>
                </motion.div>
            </div>
        </section>
    )
}
