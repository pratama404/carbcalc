'use client'

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

interface Toast {
    id: string
    message: string
    type: ToastType
    duration?: number
}

interface ToastContextType {
    addToast: (message: string, type: ToastType, duration?: number) => void
    removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function useToast() {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider')
    }
    return context
}

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([])

    const addToast = useCallback((message: string, type: ToastType, duration = 3000) => {
        const id = Math.random().toString(36).substring(7)
        setToasts((prev) => [...prev, { id, message, type, duration }])

        if (duration > 0) {
            setTimeout(() => {
                setToasts((prev) => prev.filter((toast) => toast.id !== id))
            }, duration)
        }
    }, [])

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, [])

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`
              flex items-center w-full max-w-sm overflow-hidden rounded-lg shadow-lg border pointer-events-auto transition-all duration-300 animate-slide-in-right
              ${toast.type === 'success' ? 'bg-white border-green-200' :
                                toast.type === 'error' ? 'bg-white border-red-200' :
                                    toast.type === 'warning' ? 'bg-white border-yellow-200' : 'bg-white border-blue-200'}
            `}
                        role="alert"
                    >
                        <div className={`p-4 flex items-start space-x-3 w-full`}>
                            <div className="flex-shrink-0 mt-0.5">
                                {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-green-500" />}
                                {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-500" />}
                                {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-500" />}
                                {toast.type === 'info' && <Info className="w-5 h-5 text-blue-500" />}
                            </div>
                            <div className="flex-1 text-sm font-medium text-gray-900 leading-tight">
                                {toast.message}
                            </div>
                            <button
                                onClick={() => removeToast(toast.id)}
                                className="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-500 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        {/* Progress bar (optional visual flair) */}
                        <div
                            className={`h-1 w-full ${toast.type === 'success' ? 'bg-green-500' :
                                    toast.type === 'error' ? 'bg-red-500' :
                                        toast.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                                } animate-shrink-width`}
                            style={{ animationDuration: `${toast.duration}ms` }}
                        />
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    )
}
