import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { TreePine, Zap, Recycle, Calendar, Users, Target } from 'lucide-react'

export default function CampaignsPage() {
  const campaigns = [
    {
      title: 'Plant a Million Trees',
      description: 'Join our global tree planting initiative to combat climate change and restore forests.',
      icon: TreePine,
      status: 'Active',
      participants: '25,847',
      target: '1,000,000 trees',
      progress: 65,
      color: 'green'
    },
    {
      title: 'Clean Energy Challenge',
      description: 'Switch to renewable energy sources and reduce your carbon footprint.',
      icon: Zap,
      status: 'Active',
      participants: '12,456',
      target: '50,000 households',
      progress: 25,
      color: 'yellow'
    },
    {
      title: 'Zero Waste Month',
      description: 'Reduce, reuse, and recycle to minimize waste generation.',
      icon: Recycle,
      status: 'Upcoming',
      participants: '8,234',
      target: '100,000 participants',
      progress: 8,
      color: 'purple'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Climate Action Campaigns</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our global community in taking meaningful action against climate change. Every contribution counts!
            </p>
          </div>
        </section>

        {/* Campaigns Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {campaigns.map((campaign, index) => {
                const Icon = campaign.icon
                return (
                  <div key={index} className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                    <div className={`w-16 h-16 rounded-lg bg-${campaign.color}-100 flex items-center justify-center mb-6`}>
                      <Icon className={`w-8 h-8 text-${campaign.color}-600`} />
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">{campaign.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        campaign.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {campaign.status}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-6">{campaign.description}</p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-500">
                          <Users className="w-4 h-4 mr-2" />
                          {campaign.participants} participants
                        </div>
                        <div className="flex items-center text-gray-500">
                          <Target className="w-4 h-4 mr-2" />
                          {campaign.target}
                        </div>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`bg-${campaign.color}-600 h-2 rounded-full transition-all duration-300`}
                          style={{ width: `${campaign.progress}%` }}
                        ></div>
                      </div>
                      
                      <div className="text-sm text-gray-600 text-center">
                        {campaign.progress}% Complete
                      </div>
                      
                      <button className={`w-full bg-${campaign.color}-600 text-white py-3 rounded-lg hover:bg-${campaign.color}-700 font-medium`}>
                        Join Campaign
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}