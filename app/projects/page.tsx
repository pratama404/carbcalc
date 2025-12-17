// Header/Footer removed (global)
import { TreePine, Zap, ArrowRight } from 'lucide-react'

export default function Projects() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow bg-gradient-to-br from-green-50 to-blue-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Our Projects</h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            We invest in high-impact carbon offset projects worldwide. You can contribute directly to these initiatives.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Reforestation */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <TreePine className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">Indonesia Reforestation</h3>
              </div>
              <p className="text-gray-600 mb-4">Restoring 10,000 hectares of rainforest in Kalimantan. This project protects biodiversity and sequesters carbon.</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-full">Active</span>
                <span className="text-gray-500">2,500 trees planted</span>
              </div>
            </div>

            {/* Solar Energy */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-yellow-100 p-3 rounded-full mr-4">
                  <Zap className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold">Solar Energy Program</h3>
              </div>
              <p className="text-gray-600 mb-4">Installing solar panels in rural communities to provide clean energy and replace diesel generators.</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-full">Active</span>
                <span className="text-gray-500">50 installations</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}