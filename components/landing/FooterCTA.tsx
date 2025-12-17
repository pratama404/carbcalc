'use client'

import Link from 'next/link'
import { ArrowRight, Leaf, Instagram, Twitter, Facebook } from 'lucide-react'

export function CTA() {
    return (
        <section className="py-24 bg-gradient-to-r from-green-900 to-blue-900 text-white text-center relative overflow-hidden">
            {/* Blobs */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-green-500 opacity-20 blur-3xl rounded-full translate-x-1/2 translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500 opacity-20 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2"></div>

            <div className="container mx-auto px-4 relative z-10">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to make a difference?</h2>
                <p className="text-green-100 text-xl mb-10 max-w-2xl mx-auto">
                    Start tracking your carbon footprint today and join thousands of others in the fight against climate change.
                </p>
                <Link href="/auth/signup">
                    <button className="bg-white text-green-900 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl flex items-center mx-auto">
                        Get Started for Free
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                </Link>
                <p className="mt-6 text-sm text-green-200 opacity-70">No credit card required. Free for students.</p>
            </div>
        </section>
    )
}

export function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-16 border-t border-gray-800">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center space-x-2 text-white mb-6">
                            <Leaf className="w-6 h-6 text-green-400" />
                            <span className="text-xl font-bold">CarbCalc</span>
                        </Link>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            Empowering students to understand and reduce their environmental impact through data and community.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Features</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/calculator" className="hover:text-green-400 transition-colors">Calculator</Link></li>
                            <li><Link href="/air-quality" className="hover:text-green-400 transition-colors">Air Quality</Link></li>
                            <li><Link href="/dashboard" className="hover:text-green-400 transition-colors">Dashboard</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/about" className="hover:text-green-400 transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-green-400 transition-colors">Contact</Link></li>
                            <li><Link href="/privacy" className="hover:text-green-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-green-400 transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Connect</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors text-white">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors text-white">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors text-white">
                                <Facebook className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-600">
                    © {new Date().getFullYear()} CarbCalc. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
