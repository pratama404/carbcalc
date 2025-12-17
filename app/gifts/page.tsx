import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Gift, TreePine, Crown, PartyPopper, Heart, GraduationCap, Calendar } from 'lucide-react'

export default function Gifts() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow bg-gradient-to-br from-green-50 to-blue-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Gift Carbon Offsets</h1>
            <p className="text-xl text-gray-600">Give the gift of environmental impact</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all group">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Gift className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">Eco Gift Card</h3>
              <p className="text-gray-600 mb-6 text-center">Let them choose their preferred offset project</p>
              <div className="space-y-3 mb-8">
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                  <span className="font-semibold">$25</span>
                  <span className="text-green-600 text-sm font-medium">~2 tons CO2</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-green-200">
                  <span className="font-semibold">$50</span>
                  <span className="text-green-600 text-sm font-medium">~4 tons CO2</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                  <span className="font-semibold">$100</span>
                  <span className="text-green-600 text-sm font-medium">~8 tons CO2</span>
                </div>
              </div>
              <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-bold shadow-md transition-shadow">
                Purchase Gift Card
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all group border-2 border-transparent hover:border-green-500">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <TreePine className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">Tree Planting</h3>
              <p className="text-gray-600 mb-6 text-center">Gift trees planted in their name</p>
              <div className="space-y-3 mb-8">
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                  <span className="font-semibold">1 Tree</span>
                  <span className="text-green-600 text-sm font-medium">$5</span>
                </div>
                <div className="flex justify-between items-center bg-green-50 p-3 rounded-lg border border-green-200">
                  <span className="font-semibold">10 Trees</span>
                  <span className="text-green-600 text-sm font-medium">$45</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                  <span className="font-semibold">100 Trees</span>
                  <span className="text-green-600 text-sm font-medium">$400</span>
                </div>
              </div>
              <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-bold shadow-md transition-shadow">
                Gift Trees
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all group">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Crown className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">Premium Access</h3>
              <p className="text-gray-600 mb-6 text-center">Gift premium CarbCalc features</p>
              <div className="space-y-3 mb-8">
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                  <span className="font-semibold">1 Month</span>
                  <span className="text-green-600 text-sm font-medium">$9.99</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                  <span className="font-semibold">6 Months</span>
                  <span className="text-green-600 text-sm font-medium">$49.99</span>
                </div>
                <div className="flex justify-between items-center bg-purple-50 p-3 rounded-lg border border-purple-200">
                  <span className="font-semibold">Pure Year</span>
                  <span className="text-green-600 text-sm font-medium">$89.99</span>
                </div>
              </div>
              <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-bold shadow-md transition-shadow">
                Gift Premium
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-10 mt-12">
            <h2 className="text-2xl font-bold mb-8 text-center">Perfect for Any Occasion</h2>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div className="group">
                <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <PartyPopper className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold">Birthdays</h3>
              </div>
              <div className="group">
                <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Heart className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-semibold">Weddings</h3>
              </div>
              <div className="group">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold">Graduations</h3>
              </div>
              <div className="group">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold">Holidays</h3>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}