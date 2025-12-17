import Link from 'next/link'
import { Leaf, FileText, Scale, AlertTriangle, Users } from 'lucide-react'

export default function TermsPage() {
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
          <FileText className="w-16 h-16 text-green-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600">
            Last updated: December 2024
          </p>
        </div>

        {/* Quick Summary */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-12">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">Terms Summary</h2>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start space-x-2">
              <Scale className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <div className="font-medium text-blue-900">Fair Use</div>
                <div className="text-blue-700">Use CarbCalc responsibly and legally</div>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Users className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <div className="font-medium text-blue-900">Community Guidelines</div>
                <div className="text-blue-700">Respect other users and our platform</div>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <div className="font-medium text-blue-900">Limitations</div>
                <div className="text-blue-700">Service provided &quot;as is&quot; with reasonable limitations</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-4">
              By accessing or using CarbCalc (&quot;Service&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;).
              If you disagree with any part of these terms, you may not access the Service.
            </p>
            <p className="text-gray-700">
              These Terms apply to all visitors, users, and others who access or use the Service.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
            <p className="text-gray-700 mb-4">
              CarbCalc is a carbon footprint tracking and reduction platform that provides:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>Carbon footprint calculation tools</li>
              <li>AI-powered recommendations for emission reduction</li>
              <li>Progress tracking and analytics</li>
              <li>Community features and social sharing</li>
              <li>Educational content about climate action</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Creation</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>You must provide accurate and complete information</li>
              <li>You are responsible for maintaining account security</li>
              <li>You must be at least 13 years old to create an account</li>
              <li>One person may not maintain multiple accounts</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Responsibilities</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>Keep your password secure and confidential</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>You are responsible for all activities under your account</li>
              <li>Provide accurate carbon footprint data for best results</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Acceptable Use</h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">You May:</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>Use the Service for personal or business carbon tracking</li>
              <li>Share your progress and achievements</li>
              <li>Provide feedback and suggestions</li>
              <li>Export your own data</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">You May Not:</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>Use the Service for illegal activities</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the Service</li>
              <li>Upload malicious code or content</li>
              <li>Harass or abuse other users</li>
              <li>Scrape or automatically collect data</li>
              <li>Reverse engineer our software</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Content and Data</h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Your Content</h3>
            <p className="text-gray-700 mb-4">
              You retain ownership of data you submit to CarbCalc. By using our Service, you grant us a license to:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>Process your data to provide the Service</li>
              <li>Use aggregated, anonymized data for research and improvement</li>
              <li>Display your content as part of community features (with your permission)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Content</h3>
            <p className="text-gray-700 mb-4">
              CarbCalc and its content are protected by intellectual property laws. You may not:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>Copy, modify, or distribute our content without permission</li>
              <li>Use our trademarks or branding</li>
              <li>Create derivative works based on our Service</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Privacy</h2>
            <p className="text-gray-700 mb-4">
              Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information.
              By using CarbCalc, you agree to our Privacy Policy.
            </p>
            <Link href="/privacy" className="text-green-600 hover:text-green-700 font-medium">
              Read our Privacy Policy →
            </Link>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Payments and Subscriptions</h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Free Service</h3>
            <p className="text-gray-700 mb-4">
              CarbCalc offers a free tier with basic features. We reserve the right to modify free features with notice.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Premium Subscriptions</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>Premium features require a paid subscription</li>
              <li>Subscriptions auto-renew unless cancelled</li>
              <li>Refunds are provided according to our refund policy</li>
              <li>We may change pricing with 30 days notice</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Disclaimers and Limitations</h2>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-yellow-800 font-medium">
                Important: CarbCalc provides estimates and recommendations. Results may vary and should not be considered professional advice.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Service Availability</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>We strive for 99.9% uptime but cannot guarantee uninterrupted service</li>
              <li>We may suspend service for maintenance or updates</li>
              <li>We are not liable for service interruptions</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Accuracy</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>Carbon calculations are estimates based on available data</li>
              <li>We use scientifically-backed methodologies but cannot guarantee perfect accuracy</li>
              <li>Users should verify important calculations independently</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              To the maximum extent permitted by law, CarbCalc shall not be liable for:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>Indirect, incidental, or consequential damages</li>
              <li>Loss of profits, data, or business opportunities</li>
              <li>Damages exceeding the amount paid for our Service</li>
              <li>Issues arising from third-party integrations</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Termination</h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">By You</h3>
            <p className="text-gray-700 mb-4">
              You may terminate your account at any time by contacting us or using account settings.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">By Us</h3>
            <p className="text-gray-700 mb-4">
              We may terminate or suspend accounts for:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>Violation of these Terms</li>
              <li>Fraudulent or illegal activity</li>
              <li>Extended inactivity (with notice)</li>
              <li>Non-payment of subscription fees</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to Terms</h2>
            <p className="text-gray-700 mb-4">
              We may modify these Terms at any time. We will notify users of significant changes by:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>Email notification</li>
              <li>In-app notifications</li>
              <li>Website announcements</li>
            </ul>
            <p className="text-gray-700">
              Continued use of the Service after changes constitutes acceptance of new Terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
            <p className="text-gray-700 mb-4">
              These Terms are governed by the laws of California, United States. Any disputes will be resolved in
              the courts of San Francisco County, California.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Information</h2>
            <p className="text-gray-700 mb-4">
              Questions about these Terms? Contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700">
                <strong>Email:</strong> legal@carbcalc.com<br />
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
              These terms are effective as of December 2024
            </p>
            <div className="flex space-x-4">
              <Link href="/privacy" className="text-green-600 hover:text-green-700 font-medium">
                Privacy Policy
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