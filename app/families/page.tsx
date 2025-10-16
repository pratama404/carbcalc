export default function Families() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">For Families</h1>
        <div className="text-center mb-12">
          <p className="text-xl text-gray-600">Track your household's carbon footprint together</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
            <h3 className="text-xl font-bold mb-4">Family Dashboard</h3>
            <p className="text-gray-600">See everyone's contributions and progress in one place</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-xl font-bold mb-4">Family Challenges</h3>
            <p className="text-gray-600">Compete in fun eco-friendly challenges together</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold mb-4">Educational Content</h3>
            <p className="text-gray-600">Learn about sustainability as a family</p>
          </div>
        </div>
      </div>
    </div>
  )
}