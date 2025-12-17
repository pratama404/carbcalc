'use client'

import { Calculator, MapPin, Trophy, Leaf, Zap, LineChart } from 'lucide-react'

const features = [
    {
        icon: Calculator,
        title: 'Precise Calculations',
        description: 'Calculate emissions from transport, food, energy, and waste with our scientifically-backed algorithms.'
    },
    {
        icon: MapPin,
        title: 'Local Air Quality',
        description: 'Get real-time air quality updates for your specific location and see forecast trends.'
    },
    {
        icon: Trophy,
        title: 'Eco-Challenges',
        description: 'Gamify your journey with daily and weekly challenges designed to build sustainable habits.'
    },
    {
        icon: LineChart,
        title: 'Progress Tracking',
        description: 'Visualize your carbon footprint reduction over time with detailed charts and insights.'
    },
    {
        icon: Leaf,
        title: 'Offset Projects',
        description: 'Discover verified carbon offset projects and contribute directly to reforestation.'
    },
    {
        icon: Zap,
        title: 'Energy Tips',
        description: 'Receive personalized recommendations to reduce energy consumption and save money.'
    }
]

export default function Features() {
    return (
        <section className="py-24 bg-white" id="features">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-green-600 font-bold tracking-wider uppercase text-sm">Why CarbCalc?</span>
                    <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">Everything you need to go green</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        We provide the tools, data, and motivation you need to understand and reduce your environmental impact.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon
                        return (
                            <div key={index} className="p-8 bg-white border border-gray-100 rounded-2xl hover:shadow-xl hover:border-green-100 transition-all duration-300 group">
                                <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors">
                                    <Icon className="w-7 h-7 text-green-600 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
