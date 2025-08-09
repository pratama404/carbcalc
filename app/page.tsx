'use client'

import { useState } from 'react'
import { Leaf, Calculator, TrendingUp, Users, Star, ChevronRight, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  const [email, setEmail] = useState('')

  const features = [
    {
      icon: Calculator,
      title: 'Easy Carbon Tracking',
      description: 'Track your daily activities across transportation, energy, food, and waste with our intuitive calculator.'
    },
    {
      icon: TrendingUp,
      title: 'AI-Powered Insights',
      description: 'Get personalized recommendations from Google Gemini AI to reduce your environmental impact.'
    },
    {
      icon: Users,
      title: 'Social Impact',
      description: 'Share your progress and inspire others with beautiful infographics and social media integration.'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Environmental Advocate',
      content: 'This app helped me reduce my carbon footprint by 30% in just 3 months. The AI recommendations are spot-on!',
      rating: 5
    },
    {
      name: 'Mike Chen',
      role: 'Sustainability Manager',
      content: 'Perfect for tracking our team\'s environmental impact. The visualizations make it easy to see progress.',
      rating: 5
    },
    {
      name: 'Emma Davis',
      role: 'Climate Activist',
      content: 'Love how simple it is to use. Finally, a carbon calculator that doesn\'t feel overwhelming!',
      rating: 5
    }
  ]

  const faqs = [
    {
      question: 'How accurate are the carbon calculations?',
      answer: 'Our calculations use scientifically-backed emission factors from reputable sources like the EPA and IPCC, ensuring high accuracy for your carbon footprint tracking.'
    },
    {
      question: 'Is my data secure and private?',
      answer: 'Yes, we use industry-standard encryption and secure MongoDB storage. Your personal data is never shared with third parties.'
    },
    {
      question: 'Can I track multiple family members?',
      answer: 'Currently, each account tracks one user. We\'re working on family plan features for future releases.'
    },
    {
      question: 'How does the AI recommendation system work?',
      answer: 'We use Google Gemini AI to analyze your usage patterns and provide personalized, actionable recommendations based on your specific lifestyle and carbon footprint.'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Leaf className="w-8 h-8 text-green-600 mr-3" />
              <span className="text-2xl font-bold text-gray-900">CarbCalc</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/signin" className="text-gray-600 hover:text-gray-900">
                Sign In
              </Link>
              <Link href="/auth/signup" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Track Your Carbon Footprint,
              <span className="text-green-600"> Make a Difference</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Calculate, track, and reduce your daily carbon emissions with AI-powered recommendations. 
              Join thousands making a positive impact on our planet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/auth/signup" className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 flex items-center">
                Start Tracking Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link href="/auth/signin" className="text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-50 flex items-center">
                Sign In
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Go Green
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform makes it fun and easy to track, understand, and reduce your environmental impact.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="text-center p-8 rounded-xl bg-gray-50 hover:bg-green-50 transition-colors">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by Climate Champions
            </h2>
            <p className="text-xl text-gray-600">
              See what our users are saying about their carbon reduction journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Become the Best Version of Yourself
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Transform your lifestyle with data-driven insights and make a meaningful impact on the environment while saving money.
              </p>
              <div className="space-y-4">
                {[
                  'Reduce your carbon footprint by up to 40%',
                  'Save money on energy and transportation costs',
                  'Get personalized AI recommendations',
                  'Track progress with beautiful visualizations',
                  'Share achievements with your community'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-blue-100 p-8 rounded-2xl">
              <div className="text-center">
                <Leaf className="w-24 h-24 text-green-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Join 10,000+ Users
                </h3>
                <p className="text-gray-600 mb-6">
                  Making a positive impact on our planet, one day at a time.
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-green-600">2.5M</div>
                    <div className="text-sm text-gray-600">kg CO2 Saved</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600">95%</div>
                    <div className="text-sm text-gray-600">User Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about carbon tracking
            </p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Start your carbon reduction journey today. It's free, easy, and makes a real impact.
          </p>
          <Link href="/auth/signup" className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 inline-flex items-center">
            Get Started Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Leaf className="w-8 h-8 text-green-400 mr-3" />
              <span className="text-2xl font-bold">CarbCalc</span>
            </div>
            <p className="text-gray-400 mb-6">
              Making carbon tracking simple, accurate, and actionable for everyone.
            </p>
            <div className="flex justify-center space-x-8 text-sm text-gray-400">
              <span>Built with Next.js</span>
              <span>•</span>
              <span>Powered by Gemini AI</span>
              <span>•</span>
              <span>MongoDB Database</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}