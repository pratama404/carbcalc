'use client'

import { useState, useEffect, useRef } from 'react'
import { Bot, Send, X, Minimize2, Maximize2, Phone, MessageCircle } from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'bot'
  message: string
  timestamp: Date
  typing?: boolean
}

export default function TelegramBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      message: 'Halo! 👋 Saya EcoBot, asisten AI untuk jejak karbon Anda. Saya bisa membantu:\n\n🧮 Menghitung emisi karbon\n📊 Menganalisis data Anda\n💡 Memberikan tips eco-friendly\n🎯 Membuat rencana aksi\n\nAda yang bisa saya bantu hari ini?',
      timestamp: new Date()
    }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showQuickReplies, setShowQuickReplies] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const quickReplies = [
    { text: '🧮 Hitung Jejak Karbon', action: 'calculate' },
    { text: '💡 Tips Hemat Energi', action: 'tips' },
    { text: '📊 Lihat Progress', action: 'progress' },
    { text: '🎯 Buat Target Baru', action: 'target' }
  ]

  const botResponses = {
    calculate: 'Untuk menghitung jejak karbon, saya perlu tahu aktivitas harian Anda:\n\n🚗 Berapa km Anda berkendara per hari?\n⚡ Berapa kWh listrik yang digunakan?\n🍽️ Berapa porsi daging per hari?\n🗑️ Berapa kg sampah yang dihasilkan?\n\nSilakan input data di calculator atau beritahu saya satu per satu!',
    tips: 'Berikut tips hemat energi yang bisa langsung diterapkan:\n\n💡 Ganti lampu dengan LED (hemat 80% energi)\n🌡️ Set AC di 24°C (hemat 10% per derajat)\n🔌 Cabut charger yang tidak dipakai\n🚿 Mandi dengan air dingin 2-3x seminggu\n🚲 Gunakan sepeda untuk jarak dekat\n\nMau tips spesifik untuk kategori tertentu?',
    progress: 'Berdasarkan data terbaru Anda:\n\n📈 Total emisi bulan ini: 156.8 kg CO₂\n📉 Pengurangan: -23.5% vs bulan lalu\n🏆 Eco Score: 87/100 (Grade A+)\n🌳 Setara dengan menanam 12 pohon\n\nProgress Anda sangat bagus! Terus pertahankan ya! 🎉',
    target: 'Mari buat target baru! Pilih kategori yang ingin Anda fokuskan:\n\n🚗 Transportasi: Target kurangi 30%\n⚡ Energi: Target hemat 25%\n🍽️ Makanan: Target plant-based 3x/minggu\n♻️ Waste: Target zero waste 1 hari/minggu\n\nKategori mana yang ingin Anda prioritaskan?'
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = async (message?: string) => {
    const messageText = message || newMessage.trim()
    if (!messageText) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      message: messageText,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setNewMessage('')
    setShowQuickReplies(false)
    setIsTyping(true)

    // Simulate bot typing delay
    setTimeout(() => {
      setIsTyping(false)
      
      let botResponse = 'Terima kasih atas pertanyaannya! 😊\n\nSaya sedang belajar untuk memberikan respons yang lebih baik. Sementara itu, Anda bisa:\n\n• Menggunakan calculator untuk hitung emisi\n• Melihat dashboard untuk analisis\n• Hubungi tim support untuk bantuan lebih lanjut\n\nAda yang lain yang bisa saya bantu?'

      // Check for keywords and provide relevant responses
      const lowerMessage = messageText.toLowerCase()
      if (lowerMessage.includes('hitung') || lowerMessage.includes('kalkulat')) {
        botResponse = botResponses.calculate
      } else if (lowerMessage.includes('tips') || lowerMessage.includes('hemat')) {
        botResponse = botResponses.tips
      } else if (lowerMessage.includes('progress') || lowerMessage.includes('data')) {
        botResponse = botResponses.progress
      } else if (lowerMessage.includes('target') || lowerMessage.includes('goal')) {
        botResponse = botResponses.target
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        message: botResponse,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
      setShowQuickReplies(true)
    }, 1500)
  }

  const handleQuickReply = (action: string) => {
    const response = botResponses[action as keyof typeof botResponses]
    const quickReplyText = quickReplies.find(q => q.action === action)?.text || ''
    
    handleSendMessage(quickReplyText)
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/6289676011352?text=Halo! Saya tertarik dengan CarbCalc dan ingin konsultasi tentang jejak karbon"
          target="_blank"
          rel="noopener noreferrer"
          className="block mb-4 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 animate-float"
          title="Chat via WhatsApp"
        >
          <Phone className="w-6 h-6" />
        </a>

        {/* Telegram Bot Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 animate-pulse-glow"
          title="Chat dengan EcoBot AI"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    )
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
    }`}>
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold">EcoBot AI</div>
              <div className="text-xs text-blue-100 flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                Online • Siap membantu 24/7
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white/80 hover:text-white p-1"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    msg.type === 'user' 
                      ? 'bg-blue-500 text-white rounded-br-md' 
                      : 'bg-white text-gray-800 shadow-sm rounded-bl-md border'
                  } animate-slide-up`}>
                    <div className="whitespace-pre-line text-sm leading-relaxed">
                      {msg.message}
                    </div>
                    <div className={`text-xs mt-2 ${
                      msg.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {msg.timestamp.toLocaleTimeString('id-ID', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-bl-md shadow-sm border animate-bounce-in">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Replies */}
              {showQuickReplies && !isTyping && (
                <div className="space-y-2">
                  <div className="text-xs text-gray-500 text-center">Quick replies:</div>
                  <div className="grid grid-cols-2 gap-2">
                    {quickReplies.map((reply, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickReply(reply.action)}
                        className="text-xs bg-white border border-blue-200 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors animate-slide-up"
                        style={{animationDelay: `${index * 0.1}s`}}
                      >
                        {reply.text}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ketik pesan Anda..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <button 
                  onClick={() => handleSendMessage()}
                  disabled={!newMessage.trim()}
                  className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              
              <div className="mt-2 text-xs text-gray-500 text-center">
                Powered by AI • Respons dalam bahasa Indonesia
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}