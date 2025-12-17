'use client'

import { Star } from 'lucide-react'

const testimonials = [
    {
        name: "Sarah M.",
        role: "University Student",
        content: "CarbCalc made it so easy to understand my carbon footprint. The dashboard is beautiful and the challenges keep me motivated!",
        avatar: "S"
    },
    {
        name: "Mr. Budi",
        role: "High School Teacher",
        content: "I use this tool in my Biology class. The students love the interactive calculator and seeing real-time air quality updates.",
        avatar: "B"
    },
    {
        name: "Dina R.",
        role: "Environmental Activist",
        content: "Finally, an app that focuses on local context. The air quality data for Jakarta is spot on and helps me plan my day.",
        avatar: "D"
    }
]

export default function Testimonials() {
    return (
        <section className="py-24 bg-white border-t border-gray-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Loved by Students & Educators</h2>
                    <p className="text-gray-600">Join the growing community making a positive impact.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                            <div className="flex items-center space-x-1 mb-4 text-yellow-400">
                                {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-4 h-4 fill-current" />)}
                            </div>
                            <p className="text-gray-700 leading-relaxed mb-6 italic">&quot;{t.content}&quot;</p>
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-700">
                                    {t.avatar}
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900">{t.name}</div>
                                    <div className="text-xs text-gray-500">{t.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
