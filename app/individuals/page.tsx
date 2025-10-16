export default function Individuals() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">For Individuals</h1>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Personal Carbon Tracking</h2>
            <p className="text-gray-600 mb-6">
              Take control of your environmental impact with our easy-to-use personal carbon tracker.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-green-600 mr-3">✓</span>
                <span>Daily activity tracking</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-3">✓</span>
                <span>Personalized recommendations</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-3">✓</span>
                <span>Progress visualization</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold mb-4">Start Your Journey</h3>
            <p className="text-gray-600 mb-6">Join thousands of individuals making a difference</p>
            <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
              Get Started Free
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}