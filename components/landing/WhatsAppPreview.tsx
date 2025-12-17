'use client'

import { Send, Check } from 'lucide-react'
import { motion } from 'framer-motion'

export default function WhatsAppPreview() { // Kept name for file consistency, but UI is Telegram
    return (
        <section className="py-24 bg-blue-50 overflow-hidden relative w-full">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-200/50 rounded-full blur-[100px]"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

                    {/* Left Content */}
                    <div className="lg:w-1/2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
                            <Send className="w-4 h-4 mr-2" />
                            Join the Community
                        </span>
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            Chat, Share, and <br /> Grow Together.
                        </h2>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Join our vibrant Telegram community. Share your achievements, get daily eco-tips, and participate in group challenges with students specifically.
                        </p>
                        <ul className="space-y-4 mb-8">
                            {['Get instant footprint analysis via bot', 'Weekly leaderboard updates', 'Expert sustainability advice', 'Connect with eco-conscious peers'].map((item, i) => (
                                <li key={i} className="flex items-center text-gray-700">
                                    <div className="w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center mr-3">
                                        <Check className="w-3 h-3 text-blue-700" />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <button className="bg-[#0088cc] text-white px-8 py-4 rounded-xl font-bold flex items-center hover:bg-[#0077b9] transition-colors shadow-lg shadow-blue-200/50">
                            <Send className="w-5 h-5 mr-2" />
                            Join Telegram Group
                        </button>
                    </div>

                    {/* Right Mockup (Telegram Style) */}
                    <div className="lg:w-1/2 relative">
                        <div className="mx-auto w-[320px] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border-8 border-gray-900 relative">
                            {/* Notch */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 bg-gray-900 rounded-b-3xl z-20"></div>

                            {/* Chat Interface Header */}
                            <div className="bg-[#517da2] p-4 pt-10 text-white shadow-sm">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-sm font-bold border-2 border-white/20">CC</div>
                                    <div>
                                        <div className="font-bold text-sm">CarbCalc Community</div>
                                        <div className="text-xs opacity-75">125 members, 25 online</div>
                                    </div>
                                </div>
                            </div>

                            {/* Messages Area - Telegram Pattern Background */}
                            <div className="h-[400px] bg-[#92b5ce] p-4 space-y-4 overflow-hidden relative">
                                {/* Abstract Pattern Overlay */}
                                <div className="absolute inset-0 opacity-10 bg-[url('https://telegram.org/file/464001088/1/bOl7e2p_3jM.259740/a2f76717651034c449')] bg-repeat"></div>

                                {/* Message 1 */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[85%] relative z-10"
                                >
                                    <p className="text-xs font-bold text-[#e56464] mb-1">Student Amel</p>
                                    <p className="text-sm text-gray-800">Just reduced my daily transport emissions by 2kg! 🚴‍♀️</p>
                                    <p className="text-[10px] text-gray-400 text-right mt-1">10:42 AM</p>
                                </motion.div>

                                {/* Message 2 (Bot) */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[85%] relative z-10"
                                >
                                    <p className="text-xs font-bold text-[#0088cc] mb-1">EcoBot 🤖</p>
                                    <p className="text-sm text-gray-800">Great job Amel! That&apos;s equivalent to planting 0.1 trees. Keep it up! 🌳</p>
                                    <p className="text-[10px] text-gray-400 text-right mt-1">10:43 AM</p>
                                </motion.div>

                                {/* Message 3 (User) */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className="bg-[#efffde] p-3 rounded-2xl rounded-tr-none shadow-sm max-w-[85%] ml-auto relative z-10"
                                >
                                    <p className="text-sm text-gray-800">How do I verify the hybrid car factor?</p>
                                    <div className="flex items-center justify-end space-x-1 mt-1">
                                        <span className="text-[10px] text-[#5db050] font-medium">10:45 AM</span>
                                        <Check className="w-3 h-3 text-[#5db050]" />
                                    </div>
                                </motion.div>

                                {/* Input Area Mock */}
                                <div className="absolute bottom-0 left-0 right-0 p-2 bg-white flex items-center space-x-2">
                                    <div className="flex-1 h-10 px-2 text-sm text-gray-400 flex items-center">Message...</div>
                                    <div className="w-10 h-10 flex items-center justify-center text-[#0088cc]">
                                        <Send className="w-6 h-6" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Elements */}
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            className="absolute top-1/2 -right-10 bg-white p-4 rounded-xl shadow-lg border border-blue-100"
                        >
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                                <span className="text-sm font-bold text-gray-700">Live Support</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
