export default function Donate() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Make a Donation</h1>
        <div className="text-center mb-12">
          <p className="text-xl text-gray-600">Support environmental projects and carbon offset initiatives</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Choose Your Impact</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 border-2 border-gray-200 rounded-lg hover:border-green-500 cursor-pointer">
              <div className="text-3xl mb-3">🌱</div>
              <h3 className="font-bold mb-2">$25</h3>
              <p className="text-sm text-gray-600">Plant 5 trees</p>
            </div>
            <div className="text-center p-6 border-2 border-green-500 rounded-lg bg-green-50">
              <div className="text-3xl mb-3">🌳</div>
              <h3 className="font-bold mb-2">$50</h3>
              <p className="text-sm text-gray-600">Offset 4 tons CO2</p>
            </div>
            <div className="text-center p-6 border-2 border-gray-200 rounded-lg hover:border-green-500 cursor-pointer">
              <div className="text-3xl mb-3">🌍</div>
              <h3 className="font-bold mb-2">$100</h3>
              <p className="text-sm text-gray-600">Support renewable energy</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Donation Form</h2>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">First Name</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Donation Amount</label>
              <input type="number" placeholder="50" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 text-lg font-semibold">
              Donate Now
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}