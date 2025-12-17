import Link from 'next/link'
import { FileQuestion } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <div className="text-center">
                <div className="bg-green-100 p-4 rounded-full inline-block mb-6">
                    <FileQuestion className="w-12 h-12 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
                <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                    User requested resource was not found. Please check the URL or return to the dashboard.
                </p>
                <Link
                    href="/"
                    className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 font-semibold transition-colors"
                >
                    Return Home
                </Link>
            </div>
        </div>
    )
}
