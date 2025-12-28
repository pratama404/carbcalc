// Header/Footer removed (global)
import Link from 'next/link'

export default function Businesses() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow bg-gradient-to-br from-green-50 to-blue-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">For Businesses</h1>
          <div className="text-center mb-12">
            <p className="text-xl text-gray-600">Enterprise-grade carbon management solutions for companies of all sizes</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all hover:-translate-y-1">
              <h3 className="text-2xl font-bold mb-4">Small Business</h3>
              <p className="text-gray-600 mb-6 font-medium">Perfect for companies with 1-50 employees</p>
              <div className="text-3xl font-bold text-green-600 mb-6">$29<span className="text-base font-normal text-gray-500">/month</span></div>
              <ul className="space-y-3 mb-8 text-gray-700">
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Team carbon tracking</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Basic reporting</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Email support</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> 5 Admin seats</li>
              </ul>
              <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold shadow-md transition-colors">
                Start Free Trial
              </button>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all hover:-translate-y-1 border-2 border-transparent hover:border-green-500">
              <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
              <p className="text-gray-600 mb-6 font-medium">For large organizations with complex needs</p>
              <div className="text-3xl font-bold text-green-600 mb-6">Custom</div>
              <ul className="space-y-3 mb-8 text-gray-700">
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Advanced analytics & AI insights</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> API integration</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Dedicated success manager</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Unlimited seats</li>
              </ul>
              <Link href="/business" className="block w-full bg-gray-800 text-white text-center py-3 rounded-lg hover:bg-gray-900 font-semibold shadow-md transition-colors">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}