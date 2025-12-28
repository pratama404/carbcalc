// Header/Footer removed (global)
import { CheckCircle, Zap, Shield, Star } from 'lucide-react'

export default function Subscription() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow bg-gradient-to-br from-green-50 to-blue-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
            <p className="text-xl text-gray-600">Start your carbon reduction journey today</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 group-hover:bg-gray-400 transition-colors"></div>
              <h3 className="text-2xl font-bold mb-4 text-center">Basic</h3>
              <div className="text-3xl font-bold text-gray-900 mb-6 text-center">Free</div>
              <div className="flex justify-center mb-6">
                <div className="bg-gray-100 p-3 rounded-full">
                  <Zap className="w-6 h-6 text-gray-500" />
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" /> <span className="text-gray-600">Basic carbon tracking</span></li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" /> <span className="text-gray-600">Monthly reports</span></li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" /> <span className="text-gray-600">Community access</span></li>
              </ul>
              <button className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg hover:bg-gray-200 font-bold transition-colors">
                Get Started
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-2xl p-8 border-2 border-green-500 transform scale-105 z-10 relative">
              <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center text-green-600">Premium</h3>
              <div className="text-3xl font-bold text-gray-900 mb-6 text-center">$9.99<span className="text-base font-medium text-gray-500">/mo</span></div>
              <div className="flex justify-center mb-6">
                <div className="bg-green-100 p-3 rounded-full">
                  <Star className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" /> <span className="text-gray-900 font-medium">Advanced analytics</span></li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" /> <span className="text-gray-900 font-medium">AI recommendations</span></li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" /> <span className="text-gray-900 font-medium">Priority support</span></li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" /> <span className="text-gray-900 font-medium">Custom goals</span></li>
              </ul>
              <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-bold shadow-lg hover:shadow-green-500/30 transition-all">
                Upgrade Now
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 group-hover:bg-blue-600 transition-colors"></div>
              <h3 className="text-2xl font-bold mb-4 text-center">Enterprise</h3>
              <div className="text-3xl font-bold text-gray-900 mb-6 text-center">Custom</div>
              <div className="flex justify-center mb-6">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" /> <span className="text-gray-600">Team management</span></li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" /> <span className="text-gray-600">API access</span></li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" /> <span className="text-gray-600">Custom integrations</span></li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" /> <span className="text-gray-600">Dedicated support</span></li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-bold shadow-md transition-shadow">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}