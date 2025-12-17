'use client'

import { Users, CloudLightning, TreeDeciduous, Trophy } from 'lucide-react'

const stats = [
    {
        id: 1,
        name: 'Active Users',
        value: '5,000+',
        icon: Users,
        color: 'bg-blue-100 text-blue-600'
    },
    {
        id: 2,
        name: 'CO₂ Reduced (kg)',
        value: '125 Tons',
        icon: CloudLightning,
        color: 'bg-green-100 text-green-600'
    },
    {
        id: 3,
        name: 'Trees Planted',
        value: '1,200',
        icon: TreeDeciduous,
        color: 'bg-emerald-100 text-emerald-600'
    },
    {
        id: 4,
        name: 'Challenges Won',
        value: '15k',
        icon: Trophy,
        color: 'bg-orange-100 text-orange-600'
    },
]

export default function Stats() {
    return (
        <section className="bg-white py-12 border-b border-gray-100">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-8">
                    {stats.map((stat) => {
                        const Icon = stat.icon
                        return (
                            <div key={stat.id} className="flex flex-col items-center justify-center text-center group">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">{stat.name}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
