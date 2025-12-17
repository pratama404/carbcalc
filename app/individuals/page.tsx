import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CheckCircle, User, Activity, PieChart } from 'lucide-react'
import Link from 'next/link'

export default function Individuals() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow bg-gradient-to-br from-green-50 to-blue-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">For Individuals</h1>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Personal Carbon Tracking</h2>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Take control of your environmental impact with our easy-to-use personal carbon tracker.
                Understand where your emissions come from and find actionable ways to reduce them.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-lg mr-4">
                    <Activity className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Daily Activity Tracking</h3>
                    <p className="text-gray-600">Log your transportation, diet, and energy usage effortlessly.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-lg mr-4">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Personalized Recommendations</h3>
                    <p className="text-gray-600">Get AI-powered tips tailored to your lifestyle.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-lg mr-4">
                    <PieChart className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Progress Visualization</h3>
                    <p className="text-gray-600">See your impact grow with beautiful, interactive charts.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-green-50 rounded-full blur-3xl opacity-50"></div>
              <h3 className="text-2xl font-bold mb-4 relative z-10">Start Your Journey</h3>
              <p className="text-gray-600 mb-8 relative z-10">Join thousands of individuals making a difference. It&apos;s free to get started.</p>

              <div className="flex justify-center mb-8 relative z-10">
                <div className="bg-gray-50 p-6 rounded-full">
                  <User className="w-16 h-16 text-green-600" />
                </div>
              </div>

              <Link href="/auth/signup" className="block w-full bg-green-600 text-white text-center py-4 rounded-xl hover:bg-green-700 font-bold text-lg shadow-lg hover:shadow-green-500/30 transition-all transform hover:-translate-y-1 relative z-10">
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}