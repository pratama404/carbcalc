// Header/Footer removed (global)

export default function Approach() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow bg-gradient-to-br from-green-50 to-blue-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Our Approach</h1>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Science-Based Carbon Tracking</h2>
            <p className="text-gray-600 mb-6">
              EcoTrack uses internationally recognized methodologies and emission factors
              to ensure accurate carbon footprint calculations. Our approach is based on:
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-green-600 font-bold mr-3">•</span>
                <span>IPCC Guidelines for National Greenhouse Gas Inventories</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 font-bold mr-3">•</span>
                <span>GHG Protocol Corporate Accounting and Reporting Standard</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 font-bold mr-3">•</span>
                <span>ISO 14064 standards for greenhouse gas accounting</span>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100">
              <h3 className="text-xl font-bold mb-4">Our Methodology</h3>
              <p className="text-gray-600">
                We collect user activity data across transportation, energy usage, diet, and waste.
                This data is processed using localized emission factors to provide a precise CO2e (CO2 equivalent) estimation.
                Our AI engine then analyzes this data to suggest impacts.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}