// Header/Footer removed (global)
import { Users, Trophy, BookOpen } from 'lucide-react'

export default function Families() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow bg-gradient-to-br from-green-50 to-blue-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">For Families</h1>
          <div className="text-center mb-12">
            <p className="text-xl text-gray-600">Track your household&apos;s carbon footprint together</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all group">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Family Dashboard</h3>
              <p className="text-gray-600 leading-relaxed">See everyone&apos;s contributions and progress in one place. Manage multiple profiles under one account.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all group">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Trophy className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Family Challenges</h3>
              <p className="text-gray-600 leading-relaxed">Compete in fun eco-friendly challenges together. Who can save the most energy this week?</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all group">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Educational Content</h3>
              <p className="text-gray-600 leading-relaxed">Learn about sustainability as a family with kid-friendly guides and activities.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}