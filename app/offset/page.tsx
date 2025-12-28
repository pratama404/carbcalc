// Header/Footer removed (global)
import { TreePine, Zap, Factory, Calculator, MousePointer2, CreditCard, Heart } from 'lucide-react'

export default function Offset() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow bg-gradient-to-br from-green-50 to-blue-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Carbon Offset Projects</h1>
            <p className="text-xl text-gray-600">Neutralize your carbon footprint with verified offset projects</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all group">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <TreePine className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Reforestation</h3>
              <p className="text-gray-600 mb-4 text-center">Plant trees in deforested areas to absorb CO2 from the atmosphere.</p>
              <div className="text-2xl font-bold text-green-600 mb-4 text-center">$15<span className="text-sm font-normal text-gray-500">/ton CO2</span></div>
              <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold shadow-md transition-transform hover:-translate-y-1">
                Offset Now
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all group">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Renewable Energy</h3>
              <p className="text-gray-600 mb-4 text-center">Support solar and wind energy projects in developing countries.</p>
              <div className="text-2xl font-bold text-green-600 mb-4 text-center">$12<span className="text-sm font-normal text-gray-500">/ton CO2</span></div>
              <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold shadow-md transition-transform hover:-translate-y-1">
                Offset Now
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all group">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Factory className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Clean Technology</h3>
              <p className="text-gray-600 mb-4 text-center">Fund clean cookstoves and efficient technology adoption.</p>
              <div className="text-2xl font-bold text-green-600 mb-4 text-center">$18<span className="text-sm font-normal text-gray-500">/ton CO2</span></div>
              <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold shadow-md transition-transform hover:-translate-y-1">
                Offset Now
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mt-12">
            <h2 className="text-2xl font-bold mb-8 text-center">How Carbon Offsetting Works</h2>
            <div className="grid md:grid-cols-4 gap-6 relative">
              {/* Connecting line (desktop only) */}
              <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-gray-200 -z-10"></div>

              <div className="text-center bg-white p-4">
                <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-sm">
                  <Calculator className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-bold mb-2">1. Calculate</h3>
                <p className="text-sm text-gray-600">Measure your carbon footprint</p>
              </div>
              <div className="text-center bg-white p-4">
                <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-sm">
                  <MousePointer2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-bold mb-2">2. Choose</h3>
                <p className="text-sm text-gray-600">Select verified offset projects</p>
              </div>
              <div className="text-center bg-white p-4">
                <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-sm">
                  <CreditCard className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-bold mb-2">3. Purchase</h3>
                <p className="text-sm text-gray-600">Buy carbon credits securely</p>
              </div>
              <div className="text-center bg-white p-4">
                <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-sm">
                  <Heart className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-bold mb-2">4. Impact</h3>
                <p className="text-sm text-gray-600">Track your positive impact</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}