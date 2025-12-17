'use client'

import React, { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong!</h2>
                <p className="text-gray-600 mb-6">
                    An unexpected error occurred. We apologize for the inconvenience.
                </p>
                <button
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => reset()
                    }
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                    Try again
                </button>
            </div>
        </div>
    )
}
