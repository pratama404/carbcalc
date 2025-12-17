'use client'

import { useState } from 'react'
import { Car, Fuel } from 'lucide-react'

export default function InteractiveDemo() {
    const [km, setKm] = useState(50)
    const [fuel, setFuel] = useState('gasoline')

    const calculate = () => {
        const factors: { [key: string]: number } = { gasoline: 0.21, diesel: 0.25, electric: 0.05 }
        return (km * factors[fuel]).toFixed(1)
    }

    return (
        <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden relative">
            {/* Background patterns */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="inline-block py-1 px-3 rounded bg-green-500/20 text-green-400 text-sm font-bold mb-4">Try it yourself</span>
                        <h2 className="text-4xl font-bold mb-6">See how much CO₂ you generate instantly.</h2>
                        <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                            Transport is one of the biggest contributors to personal carbon footprints.
                            Use our mini-calculator to see the impact of your daily commute.
                        </p>
                        <ul className="space-y-4">
                            {[
                                'Real-time conversion factors',
                                'Compare different fuel types',
                                'Visual feedback immediately'
                            ].map((item, i) => (
                                <li key={i} className="flex items-center text-gray-300">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white text-gray-900 rounded-2xl p-8 shadow-2xl">
                        <div className="flex items-center space-x-3 mb-6 pb-6 border-b border-gray-100">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                <Car className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold">Trip Calculator</h3>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Distance (km)</label>
                                <input
                                    type="range"
                                    min="1"
                                    max="500"
                                    value={km}
                                    onChange={(e) => setKm(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                                />
                                <div className="mt-2 text-right font-bold text-gray-900">{km} km</div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['gasoline', 'diesel', 'electric'].map(type => (
                                        <button
                                            key={type}
                                            onClick={() => setFuel(type)}
                                            className={`py-2 px-3 rounded-lg text-sm font-medium capitalize transition-colors ${fuel === type
                                                    ? 'bg-gray-900 text-white'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-6 text-center mt-6">
                                <div className="text-sm text-gray-500 mb-1">Estimated Emissions</div>
                                <div className="text-4xl font-bold text-gray-900">
                                    {calculate()} <span className="text-lg text-gray-500 font-medium">kg CO₂</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
