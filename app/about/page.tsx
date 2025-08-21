import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Target, Heart, Globe, Users, Award, Zap } from 'lucide-react'

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: 'Mission-Driven',
      description: 'Empowering individuals and organizations to take meaningful climate action through accessible tools and education.'
    },
    {
      icon: Heart,
      title: 'Passionate',
      description: 'We are deeply committed to environmental sustainability and believe in the power of collective action.'
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'Working towards a sustainable future for our planet through innovative technology and community engagement.'
    }
  ]

  const team = [
    {
      name: 'Dr.Eng Ageng',
      role: 'CEO & Founder',
      bio: 'Environmental scientist with 15+ years experience in climate research and sustainability.',
      avatar: '👩‍🔬'
    },
    {
      name: 'Putra',
      role: 'CTO',
      bio: 'Tech entrepreneur passionate about using technology to solve environmental challenges.',
      avatar: '👨‍💻'
    },
    {
      name: 'Pratama',
      role: 'Head of Sustainability',
      bio: 'Climate activist and policy expert focused on corporate sustainability initiatives.',
      avatar: '👩‍🌾'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">About CarbCalc</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're on a mission to make carbon tracking accessible, accurate, and actionable for everyone. 
              Join us in creating a more sustainable future.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-lg text-gray-600 mb-6">
                  To democratize carbon footprint tracking and empower individuals, families, and businesses 
                  to make informed decisions about their environmental impact.
                </p>
                <p className="text-lg text-gray-600">
                  We believe that by making carbon tracking simple, accurate, and engaging, we can inspire 
                  millions of people to take meaningful climate action.
                </p>
              </div>
              <div className="bg-green-100 p-8 rounded-2xl">
                <div className="text-center">
                  <Globe className="w-24 h-24 text-green-600 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                  <p className="text-gray-700">
                    A world where every person has the tools and knowledge to live sustainably 
                    and contribute to a healthier planet.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-xl text-gray-600">The principles that guide everything we do</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <div key={index} className="bg-white p-8 rounded-xl shadow-sm text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
              <p className="text-xl text-gray-600">Passionate experts working to combat climate change</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-sm text-center">
                  <div className="text-6xl mb-4">{member.avatar}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <div className="text-green-600 font-medium mb-4">{member.role}</div>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-green-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Our Impact</h2>
              <p className="text-xl text-green-100">Making a difference together</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
              <div>
                <div className="text-4xl font-bold mb-2">2.5M+</div>
                <div className="text-green-100">kg CO₂ Offset</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">50K+</div>
                <div className="text-green-100">Active Users</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">15K+</div>
                <div className="text-green-100">Trees Planted</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">100+</div>
                <div className="text-green-100">Partners</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}