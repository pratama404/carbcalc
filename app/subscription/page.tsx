export default function Subscription() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
          <p className="text-xl text-gray-600">Start your carbon reduction journey today</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Basic</h3>
            <div className="text-3xl font-bold text-green-600 mb-6">Free</div>
            <ul className="space-y-3 mb-8">
              <li>✓ Basic carbon tracking</li>
              <li>✓ Monthly reports</li>
              <li>✓ Community access</li>
            </ul>
            <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
              Get Started
            </button>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-green-500">
            <h3 className="text-2xl font-bold mb-4">Premium</h3>
            <div className="text-3xl font-bold text-green-600 mb-6">$9.99/mo</div>
            <ul className="space-y-3 mb-8">
              <li>✓ Advanced analytics</li>
              <li>✓ AI recommendations</li>
              <li>✓ Priority support</li>
              <li>✓ Custom goals</li>
            </ul>
            <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
              Upgrade Now
            </button>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
            <div className="text-3xl font-bold text-green-600 mb-6">Custom</div>
            <ul className="space-y-3 mb-8">
              <li>✓ Team management</li>
              <li>✓ API access</li>
              <li>✓ Custom integrations</li>
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