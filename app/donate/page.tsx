import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Sprout, TreePine, Globe, Heart } from 'lucide-react'

export default function Donate() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow bg-gradient-to-br from-green-50 to-blue-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Make a Donation</h1>
          <div className="text-center mb-12">
            <p className="text-xl text-gray-600">Support environmental projects and carbon offset initiatives</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Choose Your Impact</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 border-2 border-gray-200 rounded-lg hover:border-green-500 cursor-pointer hover:bg-green-50 transition-all group">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <Sprout className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-bold mb-2 text-xl">$25</h3>
                <p className="text-sm text-gray-600">Plant 5 trees</p>
              </div>
              <div className="text-center p-6 border-2 border-green-500 rounded-lg bg-green-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  POPULAR
                </div>
                <div className="bg-green-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TreePine className="w-8 h-8 text-green-700" />
                </div>
                <h3 className="font-bold mb-2 text-xl text-green-700">$50</h3>
                <p className="text-sm text-green-800">Offset 4 tons CO2</p>
              </div>
              <div className="text-center p-6 border-2 border-gray-200 rounded-lg hover:border-green-500 cursor-pointer hover:bg-green-50 transition-all group">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <Globe className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold mb-2 text-xl">$100</h3>
                <p className="text-sm text-gray-600">Support renewable energy</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-500 fill-red-500" />
              Donation Form
            </h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">First Name</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-shadow" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Last Name</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-shadow" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
                <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-shadow" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Donation Amount ($)</label>
                <input type="number" placeholder="50" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-shadow" />
              </div>
              <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 text-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                Donate Now
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}