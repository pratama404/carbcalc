export default function Guides() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Carbon Reduction Guides</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">🚗 Transportation</h3>
            <p className="text-gray-600 mb-4">Learn how to reduce your transport emissions</p>
            <ul className="space-y-2 text-sm">
              <li>• Use public transportation</li>
              <li>• Consider electric vehicles</li>
              <li>• Walk or cycle for short trips</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">⚡ Energy</h3>
            <p className="text-gray-600 mb-4">Tips for home energy efficiency</p>
            <ul className="space-y-2 text-sm">
              <li>• Switch to LED bulbs</li>
              <li>• Use smart thermostats</li>
              <li>• Install solar panels</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">🍽️ Food</h3>
            <p className="text-gray-600 mb-4">Sustainable eating habits</p>
            <ul className="space-y-2 text-sm">
              <li>• Reduce meat consumption</li>
              <li>• Buy local produce</li>
              <li>• Minimize food waste</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">🗑️ Waste</h3>
            <p className="text-gray-600 mb-4">Waste reduction strategies</p>
            <ul className="space-y-2 text-sm">
              <li>• Recycle properly</li>
              <li>• Compost organic waste</li>
              <li>• Reduce single-use items</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}