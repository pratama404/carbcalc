'use client'

import React from 'react'

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html>
            <body>
                <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
                    <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong!</h2>
                        <p className="text-gray-600 mb-6">
                            Critical error encountered. Please try refreshing the page.
                        </p>
                        {error.digest && (
                            <p className="text-xs text-gray-400 mb-4">Error ID: {error.digest}</p>
                        )}
                        <button
                            onClick={() => reset()}
                            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Try again
                        </button>
                    </div>
                </div>
            </body>
        </html>
    )
}
