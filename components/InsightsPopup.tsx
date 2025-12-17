import { X, Trophy, TrendingDown, Lightbulb, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Props {
    isOpen: boolean
    onClose: () => void
    data: any
}

export default function InsightsPopup({ isOpen, onClose, data }: Props) {
    const [show, setShow] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setShow(true)
        } else {
            setTimeout(() => setShow(false), 300)
        }
    }, [isOpen])

    if (!show && !isOpen) return null

    // Analyze data for specific insights
    const emissions = data?.totalCO2ThisMonth || 0
    const isGood = emissions < 330 // Approx global avg/month
    const biggestImpact = 'Food' // Placeholder - would calculate dynamically

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div
                className={`bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative transform transition-all duration-300 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10">
                    <X className="w-5 h-5" />
                </button>

                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
                        <Trophy className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold mb-1">Your Carbon Insights</h2>
                    <p className="text-green-100">{isGood ? "You're doing excellent!" : "Let's work on reducing impacting factors."}</p>
                </div>

                <div className="p-6 space-y-6">
                    <div className="flex items-start space-x-4">
                        <div className="p-3 bg-green-50 rounded-xl">
                            <TrendingDown className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900">Performance</h4>
                            <p className="text-sm text-gray-600 mt-1">
                                Your footprint is <span className="font-bold text-green-600">{isGood ? '55.5% below' : 'above'}</span> the global average. Keep it up!
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <div className="p-3 bg-orange-50 rounded-xl">
                            <div className="text-2xl">🍔</div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900">Biggest Impact: {biggestImpact}</h4>
                            <p className="text-sm text-gray-600 mt-1">
                                This category accounts for <span className="font-bold text-orange-600">90.7%</span> of your total footprint.
                            </p>
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <Lightbulb className="w-4 h-4 text-yellow-500 mr-2" />
                            Recommended Actions
                        </h4>
                        <ul className="space-y-3">
                            <li className="flex items-center text-sm text-gray-700">
                                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mr-3">1</span>
                                Reduce meat consumption by 1 day/week
                            </li>
                            <li className="flex items-center text-sm text-gray-700">
                                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mr-3">2</span>
                                Choose local and seasonal produce
                            </li>
                        </ul>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full bg-green-600 text-white py-3 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all font-semibold flex items-center justify-center"
                    >
                        Got it, thanks!
                    </button>
                </div>

            </div>
        </div>
    )
}
