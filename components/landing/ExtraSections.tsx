'use client'

import { Check, X } from 'lucide-react'

export function ComparisonSection() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Why Switch to CarbCalc?</h2>
                    <p className="mt-4 text-lg text-gray-600">See how we stack up against traditional tracking methods.</p>
                </div>

                <div className="max-w-4xl mx-auto overflow-hidden rounded-2xl border border-gray-200 shadow-xl bg-white">
                    <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200 p-4">
                        <div className="font-bold text-gray-900">Feature</div>
                        <div className="font-bold text-center text-gray-500">Spreadsheets</div>
                        <div className="font-bold text-center text-green-600 text-lg">CarbCalc</div>
                    </div>
                    {[
                        { name: 'Automated Calculations', old: false, new: true },
                        { name: 'Real-time Air Quality', old: false, new: true },
                        { name: 'Visual Dashboard', old: false, new: true },
                        { name: 'Community Challenges', old: false, new: true },
                        { name: 'Mobile Accessible', old: true, new: true },
                    ].map((item, i) => (
                        <div key={i} className="grid grid-cols-3 border-b border-gray-100 p-4 items-center hover:bg-gray-50">
                            <div className="text-sm font-medium text-gray-700">{item.name}</div>
                            <div className="flex justify-center text-gray-400">
                                {item.old ? <Check className="w-5 h-5" /> : <X className="w-5 h-5 opacity-50" />}
                            </div>
                            <div className="flex justify-center text-green-600">
                                {item.new ? <div className="bg-green-100 p-1 rounded-full"><Check className="w-5 h-5 font-bold" /></div> : <X className="w-5 h-5" />}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export function FAQSection() {
    const faqs = [
        { q: "Is CarbCalc really free for students?", a: "Yes! Our core features are completely free for students and educators to support environmental education." },
        { q: "How accurate is the data?", a: "We use globally recognized emission factors from reputable environmental agencies to ensure accuracy." },
        { q: "Can I use it for my school project?", a: "Absolutely. CarbCalc is designed to help you track, analyze, and present data for school projects effortlessly." },
        { q: "What devices are supported?", a: "CarbCalc works on any modern web browser, on desktops, tablets, and mobile phones." }
    ]

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
                </div>
                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                            <p className="text-gray-600">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
