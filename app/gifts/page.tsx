export default function Gifts() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Gift Carbon Offsets</h1>
          <p className="text-xl text-gray-600">Give the gift of environmental impact</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-4xl mb-4">🎁</div>
            <h3 className="text-2xl font-bold mb-4">Eco Gift Card</h3>
            <p className="text-gray-600 mb-6">Let them choose their preferred offset project</p>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>$25</span>
                <span className="text-green-600">~2 tons CO2</span>
              </div>
              <div className="flex justify-between">
                <span>$50</span>
                <span className="text-green-600">~4 tons CO2</span>
              </div>
              <div className="flex justify-between">
                <span>$100</span>
                <span className="text-green-600">~8 tons CO2</span>
              </div>
            </div>
            <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
              Purchase Gift Card
            </button>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-4xl mb-4">🌱</div>
            <h3 className="text-2xl font-bold mb-4">Tree Planting</h3>
            <p className="text-gray-600 mb-6">Gift trees planted in their name</p>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>1 Tree</span>
                <span className="text-green-600">$5</span>
              </div>
              <div className="flex justify-between">
                <span>10 Trees</span>
                <span className="text-green-600">$45</span>
              </div>
              <div className="flex justify-between">
                <span>100 Trees</span>
                <span className="text-green-600">$400</span>
              </div>
            </div>
            <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
              Gift Trees
            </button>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="text-2xl font-bold mb-4">Premium Access</h3>
            <p className="text-gray-600 mb-6">Gift premium features and analytics</p>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>1 Month</span>
                <span className="text-green-600">$9.99</span>
              </div>
              <div className="flex justify-between">
                <span>6 Months</span>
                <span className="text-green-600">$49.99</span>
              </div>
              <div className="flex justify-between">
                <span>1 Year</span>
                <span className="text-green-600">$89.99</span>
              </div>
            </div>
            <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
              Gift Premium
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8 mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Perfect for Any Occasion</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl mb-2">🎂</div>
              <h3 className="font-semibold">Birthdays</h3>
            </div>
            <div>
              <div className="text-3xl mb-2">💒</div>
              <h3 className="font-semibold">Weddings</h3>
            </div>
            <div>
              <div className="text-3xl mb-2">🎓</div>
              <h3 className="font-semibold">Graduations</h3>
            </div>
            <div>
              <div className="text-3xl mb-2">🎄</div>
              <h3 className="font-semibold">Holidays</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}