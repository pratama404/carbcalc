// Header/Footer removed (global)
import { TreePine, Zap, Recycle, Users, Target, Calendar } from 'lucide-react'

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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow bg-gradient-to-br from-green-50 to-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Climate Action Campaigns</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our global community in taking meaningful action against climate change. Every contribution counts!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns.map((campaign, index) => {
              const Icon = campaign.icon
              return (
                <div key={index} className={`bg-white p-8 rounded-xl shadow-lg border-2 border-transparent hover:border-${campaign.color}-500 transition-all hover:-translate-y-1`}>
                  <div className={`w-16 h-16 rounded-2xl bg-${campaign.color}-100 flex items-center justify-center mb-6`}>
                    <Icon className={`w-8 h-8 text-${campaign.color}-600`} />
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{campaign.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${campaign.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                      {campaign.status}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">{campaign.description}</p>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm font-medium">
                      <div className="flex items-center text-gray-500">
                        <Users className="w-4 h-4 mr-2" />
                        {campaign.participants}
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Target className="w-4 h-4 mr-2" />
                        {campaign.target}
                      </div>
                    </div>

                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                      <div
                        className={`bg-${campaign.color}-600 h-full rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${campaign.progress}%` }}
                      ></div>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">{campaign.progress}% Complete</span>
                      <span className={`text-${campaign.color}-600 font-bold hidden group-hover:block`}>Join Now &rarr;</span>
                    </div>

                    <button className={`w-full bg-${campaign.color}-600 text-white py-3 rounded-lg hover:bg-${campaign.color}-700 font-bold shadow-md transition-shadow`}>
                      Join Campaign
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}