'use client'

import React, { useEffect, useState } from 'react'
import {
    BarChart3, TrendingDown, Leaf, Zap, Car, Utensils, Trash2,
    Award, ArrowUp, ArrowDown, Bell, Search, Plus, Trophy, Globe, Sparkles
} from 'lucide-react'

// A lightweight, code-based visualization of the dashboard for the landing page
export default function DashboardPreview() {
    const [animatedValues, setAnimatedValues] = useState({
        emissions: 0,
        reduction: 0,
        score: 0
    })

    const [activeTooltip, setActiveTooltip] = useState<string | null>(null)

    // Simulate data changing
    useEffect(() => {
        const interval = setInterval(() => {
            setAnimatedValues(prev => ({
                emissions: Math.min(prev.emissions + 5, 245.8),
                reduction: Math.min(prev.reduction + 0.5, 12.5),
                score: Math.min(prev.score + 2, 85)
            }))
        }, 50)

        // Cycle through tooltips every 3 seconds to show features
        const tooltips = ['metrics', 'chart', 'recommendations']
        let tooltipIndex = 0
        const tooltipInterval = setInterval(() => {
            setActiveTooltip(tooltips[tooltipIndex])
            tooltipIndex = (tooltipIndex + 1) % tooltips.length
        }, 4000)

        return () => {
            clearInterval(interval)
            clearInterval(tooltipInterval)
        }
    }, [])

    return (
        <div className="relative w-full max-w-5xl mx-auto perspective-1000 group">
            {/* Background Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition duration-1000"></div>

            {/* Dashboard Container - Tilted 3D Effect on Desktop */}
            <div className="relative bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 overflow-hidden transform transition-transform duration-700 md:rotate-x-2 md:group-hover:rotate-0">

                {/* Mock Header */}
                <div className="h-14 border-b border-gray-100 flex items-center justify-between px-6 bg-white">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                            <Leaf className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-gray-800">CarbCalc</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="hidden sm:flex relative bg-gray-100 rounded-full px-4 py-1.5 items-center space-x-2 w-64">
                            <Search className="w-4 h-4 text-gray-400" />
                            <span className="text-xs text-gray-400">Search activity...</span>
                        </div>
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <Bell className="w-4 h-4 text-gray-500" />
                        </div>
                        <div className="w-8 h-8 bg-blue-500 rounded-full text-white flex items-center justify-center text-xs font-bold">
                            U
                        </div>
                    </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-6 bg-gray-50/50">

                    {/* Metrics Row */}
                    <div className="grid grid-cols-3 gap-4 mb-6 relative">

                        {/* Tooltip for Metrics */}
                        <div className={`absolute -top-16 left-1/4 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm transition-opacity duration-500 z-20 ${activeTooltip === 'metrics' ? 'opacity-100' : 'opacity-0'}`}>
                            <div className="font-bold mb-1">Real-time Metrics</div>
                            <div className="text-xs text-gray-300">Track CO2, reductions, and eco-score instantly.</div>
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
                        </div>

                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-2">
                                <div className="p-2 bg-red-50 rounded-lg">
                                    <BarChart3 className="w-5 h-5 text-red-500" />
                                </div>
                                <span className="text-xs font-semibold text-red-500 flex items-center">
                                    <ArrowUp className="w-3 h-3 mr-1" /> 2.3%
                                </span>
                            </div>
                            <div className="text-2xl font-bold text-gray-900">{animatedValues.emissions.toFixed(1)}</div>
                            <div className="text-xs text-gray-500">kg CO2 Emissions</div>
                        </div>

                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-2">
                                <div className="p-2 bg-green-50 rounded-lg">
                                    <TrendingDown className="w-5 h-5 text-green-500" />
                                </div>
                                <span className="text-xs font-semibold text-green-500 flex items-center">
                                    <ArrowDown className="w-3 h-3 mr-1" /> Good
                                </span>
                            </div>
                            <div className="text-2xl font-bold text-gray-900">{animatedValues.reduction.toFixed(1)}%</div>
                            <div className="text-xs text-gray-500">Reduction Rate</div>
                        </div>

                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hidden sm:block">
                            <div className="flex justify-between items-start mb-2">
                                <div className="p-2 bg-blue-50 rounded-lg">
                                    <Award className="w-5 h-5 text-blue-500" />
                                </div>
                                <span className="text-xs font-semibold text-blue-500">Top 10%</span>
                            </div>
                            <div className="text-2xl font-bold text-gray-900">{Math.floor(animatedValues.score)}</div>
                            <div className="text-xs text-gray-500">Eco Score</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Chart Area */}
                        <div className="md:col-span-2 bg-white p-5 rounded-xl shadow-sm border border-gray-100 relative">
                            {/* Tooltip for Chart */}
                            <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm transition-opacity duration-500 z-20 ${activeTooltip === 'chart' ? 'opacity-100' : 'opacity-0'}`}>
                                <div className="font-bold mb-1">Interactive Analytics</div>
                                <div className="text-xs text-gray-300">Visualize your impact over time.</div>
                                <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                            </div>

                            <div className="flex justify-between items-center mb-6">
                                <h4 className="font-bold text-gray-800">Emissions Trend</h4>
                                <div className="flex space-x-2">
                                    <div className="w-20 h-6 bg-gray-100 rounded animate-pulse"></div>
                                </div>
                            </div>
                            <div className="h-40 flex items-end justify-between space-x-2 px-2">
                                {[40, 70, 50, 90, 60, 80].map((h, i) => (
                                    <div key={i} className="w-full bg-gray-100 rounded-t-lg relative group/bar overflow-hidden h-full">
                                        <div
                                            className="absolute bottom-0 w-full bg-gradient-to-t from-green-500 to-emerald-400 transition-all duration-1000 ease-out"
                                            style={{ height: `${h}%`, transitionDelay: `${i * 100}ms` }}
                                        >
                                            <div className="opacity-0 group-hover/bar:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded">
                                                {h}kg
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-2 text-xs text-gray-400 px-2">
                                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                            </div>
                        </div>

                        {/* Recommendations / Sidebar */}
                        <div className="space-y-4 relative">
                            {/* Tooltip for AI */}
                            <div className={`absolute -right-4 top-10 transform translate-x-full bg-gray-900 text-white px-4 py-2 rounded-lg text-sm transition-opacity duration-500 z-20 w-48 hidden md:block ${activeTooltip === 'recommendations' ? 'opacity-100' : 'opacity-0'}`}>
                                <div className="absolute top-4 -left-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                                <div className="flex items-center space-x-2 mb-1">
                                    <Sparkles className="w-4 h-4 text-yellow-400" />
                                    <span className="font-bold">AI Powered</span>
                                </div>
                                <div className="text-xs text-gray-300">Get personalized tips to reduce your footprint.</div>
                            </div>

                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex items-center space-x-2 mb-3">
                                    <Zap className="w-4 h-4 text-yellow-500" />
                                    <h4 className="font-bold text-sm">AI Suggestion</h4>
                                </div>
                                <div className="text-sm text-gray-600 mb-2">Switch to LED bulbs to save energy.</div>
                                <div className="text-xs font-bold text-green-600">+5 Eco Points</div>
                            </div>

                            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-xl shadow-lg text-white">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Leaf className="w-4 h-4" />
                                    <h4 className="font-bold text-sm">Add Activity</h4>
                                </div>
                                <div className="bg-white/20 h-1 rounded full mb-3"></div>
                                <div className="flex justify-between items-center text-xs">
                                    <span>Transport</span>
                                    <Plus className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Feature Cards (Left/Right) - Absolute Positioned */}
            <div className="absolute top-1/3 -left-12 z-20 bg-white/90 backdrop-blur shadow-lg p-3 rounded-lg border border-gray-200 hidden lg:block animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="flex items-center space-x-2">
                    <div className="p-1.5 bg-blue-100 rounded text-blue-600">
                        <Globe className="w-4 h-4" />
                    </div>
                    <div>
                        <div className="text-xs font-bold text-gray-800">Global Impact</div>
                        <div className="text-[10px] text-gray-500">Compare with world</div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-1/4 -right-8 z-20 bg-white/90 backdrop-blur shadow-lg p-3 rounded-lg border border-gray-200 hidden lg:block animate-bounce" style={{ animationDuration: '4s' }}>
                <div className="flex items-center space-x-2">
                    <div className="p-1.5 bg-purple-100 rounded text-purple-600">
                        <Trophy className="w-4 h-4" />
                    </div>
                    <div>
                        <div className="text-xs font-bold text-gray-800">Gamified</div>
                        <div className="text-[10px] text-gray-500">Earn badges & rewards</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
