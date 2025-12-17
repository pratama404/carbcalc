import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Business() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow bg-gradient-to-br from-green-50 to-blue-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">EcoTrack for Business</h1>
            <p className="text-xl text-gray-600">Enterprise carbon management solutions</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Choose EcoTrack?</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="text-2xl mr-4">📊</div>
                  <div>
                    <h3 className="font-semibold mb-2">Comprehensive Tracking</h3>
                    <p className="text-gray-600">Monitor Scope 1, 2, and 3 emissions across your organization</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-2xl mr-4">🎯</div>
                  <div>
                    <h3 className="font-semibold mb-2">Goal Setting</h3>
                    <p className="text-gray-600">Set and track science-based targets aligned with climate goals</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-2xl mr-4">📈</div>
                  <div>
                    <h3 className="font-semibold mb-2">Advanced Analytics</h3>
                    <p className="text-gray-600">AI-powered insights and recommendations for reduction</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Request Demo</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Company Name</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Your Name</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Company Size</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                    <option>1-50 employees</option>
                    <option>51-200 employees</option>
                    <option>201-1000 employees</option>
                    <option>1000+ employees</option>
                  </select>
                </div>
                <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold shadow-md">
                  Schedule Demo
                </button>
              </form>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-8 text-center">Enterprise Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">🏢</div>
                <h3 className="font-bold mb-2">Multi-Location</h3>
                <p className="text-gray-600">Track emissions across multiple offices and facilities</p>
              </div>
              <div className="text-center group">
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">👥</div>
                <h3 className="font-bold mb-2">Team Management</h3>
                <p className="text-gray-600">Role-based access and team collaboration tools</p>
              </div>
              <div className="text-center group">
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">🔗</div>
                <h3 className="font-bold mb-2">API Integration</h3>
                <p className="text-gray-600">Connect with existing systems and workflows</p>
              </div>
              <div className="text-center group">
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">📋</div>
                <h3 className="font-bold mb-2">Compliance</h3>
                <p className="text-gray-600">Meet regulatory requirements and standards</p>
              </div>
              <div className="text-center group">
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">🎨</div>
                <h3 className="font-bold mb-2">Custom Branding</h3>
                <p className="text-gray-600">White-label solutions with your company branding</p>
              </div>
              <div className="text-center group">
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">🛡️</div>
                <h3 className="font-bold mb-2">Enterprise Security</h3>
                <p className="text-gray-600">SOC 2 compliance and advanced security features</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}