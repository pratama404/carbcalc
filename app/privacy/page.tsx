import Link from 'next/link'
import { Leaf, Shield, Eye, Lock, Users, Download } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Leaf className="w-8 h-8 text-green-600" />
              <span className="text-xl font-bold">CarbCalc</span>
            </Link>
            <Link href="/contact" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              Contact Us
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <Shield className="w-16 h-16 text-green-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">
            Last updated: December 2024
          </p>
        </div>

        {/* Quick Summary */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-12">
          <h2 className="text-xl font-semibold text-green-900 mb-4">Privacy at a Glance</h2>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start space-x-2">
              <Eye className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <div className="font-medium text-green-900">We don&apos;t sell your data</div>
                <div className="text-green-700">Your personal information is never sold to third parties</div>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Lock className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <div className="font-medium text-green-900">Secure & encrypted</div>
                <div className="text-green-700">All data is encrypted and stored securely</div>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Download className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <div className="font-medium text-green-900">You control your data</div>
                <div className="text-green-700">Export or delete your data anytime</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Information You Provide</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>Account information (name, email, password)</li>
              <li>Carbon footprint data (transportation, energy, food, waste)</li>
              <li>Profile preferences and settings</li>
              <li>Communications with our support team</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Information We Collect Automatically</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>Usage data and analytics (pages visited, features used)</li>
              <li>Device information (browser type, operating system)</li>
              <li>IP address and general location (for regional emission factors)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li><strong>Provide our services:</strong> Calculate carbon footprints, generate recommendations, track progress</li>
              <li><strong>Personalization:</strong> Customize AI recommendations and user experience</li>
              <li><strong>Communication:</strong> Send important updates, tips, and respond to inquiries</li>
              <li><strong>Improvement:</strong> Analyze usage patterns to improve our platform</li>
              <li><strong>Security:</strong> Protect against fraud and unauthorized access</li>
              <li><strong>Legal compliance:</strong> Meet legal obligations and enforce our terms</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800 font-medium">We never sell your personal data to third parties.</p>
            </div>

            <p className="text-gray-700 mb-4">We may share information in these limited circumstances:</p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li><strong>Service providers:</strong> Trusted partners who help us operate our platform (hosting, analytics, customer support)</li>
              <li><strong>Aggregated data:</strong> Anonymous, aggregated statistics for research and community features</li>
              <li><strong>Legal requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business transfers:</strong> In case of merger or acquisition (with continued privacy protection)</li>
              <li><strong>With your consent:</strong> When you explicitly authorize sharing</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
            <p className="text-gray-700 mb-4">We implement industry-standard security measures:</p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>Encryption in transit and at rest</li>
              <li>Regular security audits and penetration testing</li>
              <li>Access controls and authentication</li>
              <li>Secure data centers with physical security</li>
              <li>Employee training on data protection</li>
              <li>Incident response procedures</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Rights and Choices</h2>
            <p className="text-gray-700 mb-4">You have the following rights regarding your data:</p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your account and data</li>
              <li><strong>Portability:</strong> Export your data in a machine-readable format</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
              <li><strong>Restrict processing:</strong> Limit how we use your data</li>
            </ul>
            <p className="text-gray-700">To exercise these rights, contact us at privacy@carbcalc.com</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies and Tracking</h2>
            <p className="text-gray-700 mb-4">We use cookies and similar technologies for:</p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>Essential functionality (login, preferences)</li>
              <li>Analytics and performance monitoring</li>
              <li>Personalization and recommendations</li>
              <li>Security and fraud prevention</li>
            </ul>
            <p className="text-gray-700">You can control cookies through your browser settings.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. International Transfers</h2>
            <p className="text-gray-700 mb-4">
              Your data may be processed in countries other than your own. We ensure adequate protection through:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>Standard contractual clauses</li>
              <li>Adequacy decisions by relevant authorities</li>
              <li>Other appropriate safeguards</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children&apos;s Privacy</h2>
            <p className="text-gray-700 mb-4">
              CarbCalc is not intended for children under 13. We do not knowingly collect personal information from children under 13.
              If you believe we have collected such information, please contact us immediately.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to This Policy</h2>
            <p className="text-gray-700 mb-4">
              We may update this privacy policy from time to time. We will notify you of significant changes by:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>Email notification to registered users</li>
              <li>Prominent notice on our website</li>
              <li>In-app notifications</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have questions about this privacy policy or our data practices, contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700">
                <strong>Email:</strong> privacy@carbcalc.com<br />
                <strong>Address:</strong> CarbCalc Inc., 123 Green Street, Suite 100, San Francisco, CA 94105<br />
                <strong>Phone:</strong> +1 (555) 123-4567
              </p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 pt-8 mt-12">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-600 mb-4 sm:mb-0">
              This policy is effective as of December 2024
            </p>
            <div className="flex space-x-4">
              <Link href="/terms" className="text-green-600 hover:text-green-700 font-medium">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-green-600 hover:text-green-700 font-medium">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}