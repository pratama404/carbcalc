'use client'

import { motion } from 'framer-motion'
import { Users, Target, Globe, Heart } from 'lucide-react'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mb-6">
              <Users className="w-4 h-4 mr-2" />
              Our Story
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Empowering the Next Generation of <span className="text-green-600">Eco-Leaders</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              CarbCalc was born from a simple idea: that students have the power to change the world, one calculation at a time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Grid */}
      <section className="container mx-auto px-4 mb-24">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Target,
              title: "Our Mission",
              desc: "To provide accessible, data-driven tools that help students understand and reduce their carbon footprint.",
              color: "bg-green-100 text-green-700"
            },
            {
              icon: Globe,
              title: "Global Vision",
              desc: "A world where every individual decision is informed by its environmental impact, leading to a sustainable future.",
              color: "bg-blue-100 text-blue-700"
            },
            {
              icon: Heart,
              title: "Community First",
              desc: "Building a supportive network of eco-conscious students who inspire and hold each other accountable.",
              color: "bg-red-100 text-red-700"
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all"
            >
              <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mb-6`}>
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-900 text-white py-24 mb-24 relative overflow-hidden rounded-[3rem] mx-4">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500 opacity-20 blur-[100px] rounded-full"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "50k+", label: "Daily Calculations" },
              { num: "120", label: "University Partners" },
              { num: "5k", label: "Tons CO₂ Saved" },
              { num: "24/7", label: "Real-time Monitors" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl lg:text-5xl font-bold text-green-400 mb-2">{stat.num}</div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Join the Movement</h2>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">We are always looking for passionate students to join our ambassador program.</p>
        <button className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors">
          Contact Us
        </button>
      </section>
    </div>
  )
}