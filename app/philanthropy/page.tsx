export default function Philanthropy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Philanthropy Programs</h1>
        <div className="text-center mb-12">
          <p className="text-xl text-gray-600">Supporting environmental initiatives worldwide</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Our Impact</h2>
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold mb-2">🌍 Global Reach</h3>
                <p className="text-gray-600">Supporting projects in 25+ countries</p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold mb-2">💰 Funding</h3>
                <p className="text-gray-600">$2M+ donated to environmental causes</p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold mb-2">🤝 Partnerships</h3>
                <p className="text-gray-600">Working with 50+ NGOs and organizations</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Get Involved</h2>
            <p className="text-gray-600 mb-6">
              Join our philanthropic efforts and make a lasting impact on the environment.
            </p>
            <div className="space-y-4">
              <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
                Become a Partner
              </button>
              <button className="w-full border border-green-600 text-green-600 py-3 rounded-lg hover:bg-green-50">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}