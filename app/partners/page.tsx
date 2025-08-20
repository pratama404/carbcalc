import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Building2, Globe, Users, Award } from 'lucide-react'

export default function PartnersPage() {
  const partners = [
    {
      name: 'Green Earth Foundation',
      type: 'NGO',
      logo: '🌍',
      description: 'Leading environmental conservation organization focused on climate action.',
      impact: '2M+ trees planted'
    },
    {
      name: 'EcoTech Solutions',
      type: 'Corporate',
      logo: '🏢',
      description: 'Technology company developing sustainable solutions for businesses.',
      impact: '500+ companies helped'
    },
    {
      name: 'Ministry of Environment',
      type: 'Government',
      logo: '🏛️',
      description: 'Government agency promoting environmental policies and regulations.',
      impact: 'National policy support'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Our Partners</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Working together with leading organizations to create a sustainable future for our planet.
            </p>
          </div>
        </section>

        {/* Partners Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              {partners.map((partner, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                  <div className="text-6xl mb-4 text-center">{partner.logo}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{partner.name}</h3>
                  <div className="text-sm text-green-600 font-medium mb-4">{partner.type} Partner</div>
                  <p className="text-gray-600 mb-4">{partner.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Award className="w-4 h-4 mr-2" />
                    {partner.impact}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}