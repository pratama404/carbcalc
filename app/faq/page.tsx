'use client'

import { useState } from 'react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "How accurate is the carbon calculator?",
      answer: "Our calculator uses scientifically-backed emission factors and is regularly updated with the latest data from environmental agencies."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we use industry-standard encryption and never share your personal data with third parties."
    },
    {
      question: "Can I track my family's emissions?",
      answer: "Yes, you can create family accounts and track emissions for multiple household members."
    },
    {
      question: "How do I offset my carbon footprint?",
      answer: "We partner with verified carbon offset projects. You can purchase offsets directly through our platform."
    },
    {
      question: "What makes EcoTrack different?",
      answer: "We combine AI-powered recommendations, real-time tracking, and social features to make carbon reduction engaging and effective."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h1>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <span className="text-2xl">{openIndex === index ? '−' : '+'}</span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a href="/contact" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  )
}