import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Calendar, User, Clock, Tag, TrendingUp } from 'lucide-react'

export default function NewsPage() {
  const featuredArticle = {
    title: 'Global Carbon Emissions Reach Record High in 2024',
    excerpt: 'New data shows urgent need for accelerated climate action as emissions continue to rise despite international commitments.',
    author: 'Dr. Climate Expert',
    date: '2024-01-15',
    readTime: 8,
    category: 'Climate Science',
    image: '🌡️'
  }

  const articles = [
    {
      title: 'Renewable Energy Adoption Accelerates Worldwide',
      excerpt: 'Solar and wind power installations hit new records as costs continue to decline.',
      author: 'Energy Analyst',
      date: '2024-01-12',
      readTime: 5,
      category: 'Renewable Energy',
      image: '⚡'
    },
    {
      title: 'Corporate Carbon Neutrality Commitments Double',
      excerpt: 'Major corporations announce ambitious net-zero targets for the next decade.',
      author: 'Business Reporter',
      date: '2024-01-10',
      readTime: 6,
      category: 'Business',
      image: '🏢'
    },
    {
      title: 'New Carbon Capture Technology Shows Promise',
      excerpt: 'Breakthrough in direct air capture could revolutionize carbon removal efforts.',
      author: 'Tech Journalist',
      date: '2024-01-08',
      readTime: 7,
      category: 'Technology',
      image: '🔬'
    }
  ]

  const categories = [
    'All News',
    'Climate Science',
    'Renewable Energy',
    'Policy Updates',
    'Technology',
    'Business'
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Carbon News</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest developments in climate science, renewable energy, and environmental policy.
            </p>
          </div>
        </section>

        {/* Featured Article */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-lg border overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center p-12">
                  <div className="text-8xl">{featuredArticle.image}</div>
                </div>
                <div className="md:w-2/3 p-8">
                  <div className="flex items-center mb-4">
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                    <span className="ml-3 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {featuredArticle.category}
                    </span>
                  </div>
                  
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {featuredArticle.title}
                  </h2>
                  
                  <p className="text-lg text-gray-600 mb-6">
                    {featuredArticle.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {featuredArticle.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(featuredArticle.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {featuredArticle.readTime} min read
                      </div>
                    </div>
                    
                    <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Filter */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    index === 0
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="text-4xl mb-4 text-center">{article.image}</div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {article.category}
                      </span>
                      <div className="flex items-center text-xs text-gray-500">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trending
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        {article.author}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {article.readTime} min
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {new Date(article.date).toLocaleDateString()}
                      </span>
                      <button className="text-green-600 text-sm font-medium hover:text-green-700">
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-20 bg-green-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-xl text-green-100 mb-8">
              Get the latest climate news and insights delivered to your inbox weekly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-green-300"
              />
              <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}