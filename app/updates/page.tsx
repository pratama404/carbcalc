export default function Updates() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Project Updates</h1>
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">New AI Recommendations Engine</h3>
              <span className="text-sm text-gray-500">Dec 2024</span>
            </div>
            <p className="text-gray-600">
              We&apos;ve launched our new AI-powered recommendations system that provides
              personalized suggestions for reducing your carbon footprint.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">Mobile App Beta Release</h3>
              <span className="text-sm text-gray-500">Nov 2024</span>
            </div>
            <p className="text-gray-600">
              Our mobile app is now available in beta for iOS and Android users.
              Track your carbon footprint on the go!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}