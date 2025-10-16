export default function Businesses() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">For Businesses</h1>
        <div className="text-center mb-12">
          <p className="text-xl text-gray-600">Enterprise-grade carbon management solutions</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Small Business</h3>
            <p className="text-gray-600 mb-6">Perfect for companies with 1-50 employees</p>
            <div className="text-3xl font-bold text-green-600 mb-6">$29/month</div>
            <ul className="space-y-3 mb-8">
              <li>✓ Team carbon tracking</li>
              <li>✓ Basic reporting</li>
              <li>✓ Email support</li>
            </ul>
            <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
              Start Free Trial
            </button>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
            <p className="text-gray-600 mb-6">For large organizations with complex needs</p>
            <div className="text-3xl font-bold text-green-600 mb-6">Custom</div>
            <ul className="space-y-3 mb-8">
              <li>✓ Advanced analytics</li>
              <li>✓ API integration</li>
              <li>✓ Dedicated support</li>
            </ul>
            <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}