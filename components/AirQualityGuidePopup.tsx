import { X, Info, Shield, AlertTriangle, Skull } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Button } from './ui/Button'

interface Props {
    isOpen: boolean
    onClose: () => void
}

export default function AirQualityGuidePopup({ isOpen, onClose }: Props) {
    const [show, setShow] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setShow(true)
        } else {
            setTimeout(() => setShow(false), 300)
        }
    }, [isOpen])

    if (!show && !isOpen) return null

    const levels = [
        { range: '0-50', level: 'Good', description: 'Air quality is satisfactory, and air pollution poses little or no risk.', color: 'bg-green-100 text-green-800', icon: Shield },
        { range: '51-100', level: 'Moderate', description: 'Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.', color: 'bg-yellow-100 text-yellow-800', icon: Info },
        { range: '101-150', level: 'Unhealthy for Sensitive Groups', description: 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.', color: 'bg-orange-100 text-orange-800', icon: AlertTriangle },
        { range: '150-200', level: 'Unhealthy', description: 'Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.', color: 'bg-red-100 text-red-800', icon: AlertTriangle },
        { range: '201-300', level: 'Very Unhealthy', description: 'Health alert: The risk of health effects is increased for everyone.', color: 'bg-purple-100 text-purple-800', icon: Skull },
        { range: '300+', level: 'Hazardous', description: 'Health warning of emergency conditions: everyone is more likely to be affected.', color: 'bg-red-900 text-white', icon: Skull },
    ]

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div
                className={`bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden relative transform transition-all duration-300 flex flex-col max-h-[90vh] ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}
            >
                <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-bold text-gray-900">Air Quality Index Guide</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="overflow-y-auto p-6 space-y-4">
                    <p className="text-gray-600 mb-4">
                        The Air Quality Index (AQI) is used for reporting daily air quality. It tells you how clean or polluted your air is, and what associated health effects might be a concern for you.
                    </p>

                    <div className="space-y-4">
                        {levels.map((item, index) => {
                            const Icon = item.icon
                            return (
                                <div key={index} className="flex items-start p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                                    <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${item.color}`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-2 mb-1">
                                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${item.color}`}>AQI {item.range}</span>
                                            <h3 className="font-bold text-gray-900">{item.level}</h3>
                                        </div>
                                        <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end sticky bottom-0">
                    <Button onClick={onClose}>Close Guide</Button>
                </div>

            </div>
        </div>
    )
}
