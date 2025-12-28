// Header/Footer removed (global)
import { Building2, Globe, Users, Award, Handshake } from 'lucide-react'

export default function PartnersPage() {
  const partners = [
    {
      name: 'Green Earth Foundation',
      type: 'NGO',
      color: 'bg-green-100 text-green-600',
      icon: Globe,
      description: 'Leading environmental conservation organization focused on climate action.',
      impact: '2M+ trees planted'
    },
    {
      name: 'EcoTech Solutions',
      type: 'Corporate',
      color: 'bg-blue-100 text-blue-600',
      icon: Building2,
      description: 'Technology company developing sustainable solutions for businesses.',
      impact: '500+ companies helped'
    },
    {
      name: 'Ministry of Environment',
      type: 'Government',
      color: 'bg-yellow-100 text-yellow-600',
      icon: '🏛️', // Keeping emoji for this one as lucide might not have perfect match
      description: 'Government agency promoting environmental policies and regulations.',
      impact: 'National policy support'
    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow bg-gradient-to-br from-green-50 to-blue-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Partners</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Working together with leading organizations to create a sustainable future for our planet.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {partners.map((partner, index) => {
              const Icon = partner.icon
              return (
                <div key={index} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className={`w-16 h-16 rounded-2xl ${partner.color} flex items-center justify-center mb-6 mx-auto`}>
                    {typeof Icon === 'string' ? <span className="text-3xl">{Icon}</span> : <Icon className="w-8 h-8" />}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">{partner.name}</h3>
                  <div className="text-center mb-4">
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">{partner.type} Partner</span>
                  </div>
                  <p className="text-gray-600 mb-6 text-center">{partner.description}</p>
                  <div className="flex items-center justify-center text-sm text-green-600 font-medium bg-green-50 py-2 rounded-lg">
                    <Award className="w-4 h-4 mr-2" />
                    {partner.impact}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Become a partner section */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-12 bg-gray-900 text-white flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-4">Become a Partner</h2>
                <p className="text-gray-300 mb-8">Join our network of organizations committed to making a difference. Let&apos;s amplify our impact together.</p>
                <ul className="space-y-3">
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Access to carbon tracking API</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Co-branding opportunities</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Joint sustainability initiatives</li>
                </ul>
              </div>
              <div className="md:w-1/2 p-12">
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">Organization Name</label>
                      <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">Contact Person</label>
                      <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">Email Address</label>
                    <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">Partnership Interior</label>
                    <textarea className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24 focus:ring-2 focus:ring-green-500 outline-none"></textarea>
                  </div>
                  <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-bold shadow-md">Submit Application</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}