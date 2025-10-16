export default function Offset() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Carbon Offset Projects</h1>
          <p className="text-xl text-gray-600">Neutralize your carbon footprint with verified offset projects</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-4xl mb-4">🌳</div>
            <h3 className="text-xl font-bold mb-4">Reforestation</h3>
            <p className="text-gray-600 mb-4">Plant trees in deforested areas to absorb CO2 from the atmosphere.</p>
            <div className="text-2xl font-bold text-green-600 mb-4">$15/ton CO2</div>
            <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
              Offset Now
            </button>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-4">Renewable Energy</h3>
            <p className="text-gray-600 mb-4">Support solar and wind energy projects in developing countries.</p>
            <div className="text-2xl font-bold text-green-600 mb-4">$12/ton CO2</div>
            <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
              Offset Now
            </button>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-4xl mb-4">🏭</div>
            <h3 className="text-xl font-bold mb-4">Clean Technology</h3>
            <p className="text-gray-600 mb-4">Fund clean cookstoves and efficient technology adoption.</p>
            <div className="text-2xl font-bold text-green-600 mb-4">$18/ton CO2</div>
            <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
              Offset Now
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8 mt-12">
          <h2 className="text-2xl font-bold mb-6 text-center">How Carbon Offsetting Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">1️⃣</div>
              <h3 className="font-semibold mb-2">Calculate</h3>
              <p className="text-sm text-gray-600">Measure your carbon footprint</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">2️⃣</div>
              <h3 className="font-semibold mb-2">Choose</h3>
              <p className="text-sm text-gray-600">Select verified offset projects</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">3️⃣</div>
              <h3 className="font-semibold mb-2">Purchase</h3>
              <p className="text-sm text-gray-600">Buy carbon credits securely</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">4️⃣</div>
              <h3 className="font-semibold mb-2">Impact</h3>
              <p className="text-sm text-gray-600">Track your positive impact</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}