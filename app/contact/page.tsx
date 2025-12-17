'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Leaf, Mail, Phone, MapPin, Send, MessageCircle, Users, Briefcase } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsSubmitted(true)
    setIsSubmitting(false)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        type: 'general'
      })
    }, 3000)
  }

  const contactTypes = [
    { id: 'general', label: 'General Inquiry', icon: MessageCircle },
    { id: 'support', label: 'Technical Support', icon: Phone },
    { id: 'partnership', label: 'Partnership', icon: Users },
    { id: 'enterprise', label: 'Enterprise Sales', icon: Briefcase }
  ]

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'hello@carbcalc.com',
      description: 'Send us an email and we&apos;ll respond within 24 hours'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      description: 'Monday to Friday, 9 AM to 6 PM PST'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: 'San Francisco, CA',
      description: '123 Green Street, Suite 100'
    }
  ]

  const faqs = [
    {
      question: 'How accurate are your carbon calculations?',
      answer: 'Our calculations use IPCC-approved emission factors and are regularly updated. We achieve 95%+ accuracy compared to professional carbon audits.'
    },
    {
      question: 'Is CarbCalc really free?',
      answer: 'Yes! Our core features are completely free. We offer premium features for advanced users and enterprise solutions for organizations.'
    },
    {
      question: 'How do you protect my data?',
      answer: 'We use enterprise-grade security and never sell your personal data. Your information is encrypted and stored securely.'
    },
    {
      question: 'Can I use CarbCalc for my business?',
      answer: 'Absolutely! We offer enterprise solutions with team management, custom reporting, and API access. Contact our sales team for more information.'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Leaf className="w-8 h-8 text-green-600" />
              <span className="text-xl font-bold">CarbCalc</span>
            </Link>
            <Link href="/auth/signup" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about CarbCalc? Want to partner with us? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">Thank you for contacting us. We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Contact Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      What can we help you with?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {contactTypes.map((type) => {
                        const Icon = type.icon
                        return (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, type: type.id })}
                            className={`flex items-center space-x-2 p-3 rounded-lg border-2 transition-colors ${formData.type === type.id
                              ? 'border-green-500 bg-green-50 text-green-700'
                              : 'border-gray-200 hover:border-gray-300'
                              }`}
                          >
                            <Icon className="w-5 h-5" />
                            <span className="text-sm font-medium">{type.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Name and Email */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="What's this about?"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-semibold"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info & FAQ */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <Icon className="w-6 h-6 text-green-600 mt-1" />
                      <div>
                        <div className="font-medium text-gray-900">{info.title}</div>
                        <div className="text-green-600 font-semibold">{info.details}</div>
                        <div className="text-sm text-gray-600">{info.description}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Quick FAQ */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Answers</h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                    <div className="font-medium text-gray-900 mb-2">{faq.question}</div>
                    <div className="text-sm text-gray-600">{faq.answer}</div>
                  </div>
                ))}
              </div>
              <Link href="/faq" className="inline-flex items-center text-green-600 hover:text-green-700 font-medium mt-4">
                View all FAQs
                <Send className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* Response Time */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Times</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">General Inquiries</span>
                  <span className="font-medium">&lt; 24 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Technical Support</span>
                  <span className="font-medium">&lt; 4 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Enterprise Sales</span>
                  <span className="font-medium">&lt; 2 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to start your carbon journey?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of eco-warriors already making a difference with CarbCalc
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup" className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700">
              Start Free Today
            </Link>
            <Link href="/calculator" className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50">
              Try Calculator
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}