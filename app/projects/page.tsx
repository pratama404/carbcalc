export default function Projects() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Our Projects</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">🌳 Indonesia Reforestation</h3>
            <p className="text-gray-600 mb-4">Restoring 10,000 hectares of rainforest in Kalimantan</p>
            <div className="text-green-600 font-semibold">Status: Active • 2,500 trees planted</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">⚡ Solar Energy Program</h3>
            <p className="text-gray-600 mb-4">Installing solar panels in rural communities</p>
            <div className="text-green-600 font-semibold">Status: Active • 50 installations</div>
          </div>
        </div>
      </div>
    </div>
  )
}