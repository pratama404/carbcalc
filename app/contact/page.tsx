export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Contact Us</h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="text-2xl mr-4">📧</div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-600">geoterateam@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-2xl mr-4">💬</div>
                <div>
                  <h3 className="font-semibold">WhatsApp</h3>
                  <a href="https://wa.me/6289676011352" className="text-green-600 hover:underline">
                    Chat with us
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-2xl mr-4">📍</div>
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-gray-600">
                    123 Geotera Carbon<br/>
                    Surabaya, East Java, ID 60111
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Send Message</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"></textarea>
              </div>
              <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}