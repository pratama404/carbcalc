'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { ArrowLeft, User, Bell, Lock, Globe, Moon, Save } from 'lucide-react'
import { useToast } from '@/context/ToastContext'
import Link from 'next/link'

export default function SettingsPage() {
    const router = useRouter()
    const { data: session } = useSession()
    const { addToast } = useToast()
    const [loading, setLoading] = useState(false)
    const [activeTab, setActiveTab] = useState('profile')
    const [settings, setSettings] = useState({
        notifications: true,
        emailDigest: 'weekly',
        publicProfile: false,
        darkMode: false,
        language: 'en'
    })

    // Mock save function
    const handleSave = async () => {
        setLoading(true)
        await new Promise(resolve => setTimeout(resolve, 1000))
        await new Promise(resolve => setTimeout(resolve, 1000))
        setLoading(false)
        addToast('Settings saved successfully!', 'success')
    }

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'privacy', label: 'Privacy & Security', icon: Lock },
        { id: 'preferences', label: 'Preferences', icon: Globe },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm p-4 sticky top-8">
                            <nav className="space-y-2">
                                {tabs.map(tab => {
                                    const Icon = tab.icon
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.id
                                                ? 'bg-green-50 text-green-700'
                                                : 'text-gray-600 hover:bg-gray-50'
                                                }`}
                                        >
                                            <Icon className="w-5 h-5" />
                                            <span>{tab.label}</span>
                                        </button>
                                    )
                                })}
                            </nav>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-lg shadow-sm p-8 min-h-[500px]">
                            {activeTab === 'profile' && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>
                                    <div className="flex items-center space-x-4 mb-8">
                                        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                            {session?.user?.name?.charAt(0) || 'U'}
                                        </div>
                                        <div>
                                            <button className="bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
                                                Change Photo
                                            </button>
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
                                            <input
                                                type="text"
                                                defaultValue={session?.user?.name || ''}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                            <input
                                                type="email"
                                                defaultValue={session?.user?.email || ''}
                                                disabled
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'notifications' && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between py-4 border-b border-gray-100">
                                            <div>
                                                <div className="font-medium text-gray-900">Email Notifications</div>
                                                <div className="text-sm text-gray-500">Receive updates about your progress</div>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={settings.notifications}
                                                    onChange={e => setSettings({ ...settings, notifications: e.target.checked })}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                                            </label>
                                        </div>
                                        <div className="flex items-center justify-between py-4 border-b border-gray-100">
                                            <div>
                                                <div className="font-medium text-gray-900">Weekly Digest</div>
                                                <div className="text-sm text-gray-500">Summary of your carbon footprint</div>
                                            </div>
                                            <select
                                                value={settings.emailDigest}
                                                onChange={e => setSettings({ ...settings, emailDigest: e.target.value })}
                                                className="border border-gray-300 rounded-lg text-sm p-2"
                                            >
                                                <option value="daily">Daily</option>
                                                <option value="weekly">Weekly</option>
                                                <option value="monthly">Monthly</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'privacy' && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-semibold mb-6">Privacy & Security</h2>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between py-4 border-b border-gray-100">
                                            <div>
                                                <div className="font-medium text-gray-900">Public Profile</div>
                                                <div className="text-sm text-gray-500">Allow others to see your achievements</div>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={settings.publicProfile}
                                                    onChange={e => setSettings({ ...settings, publicProfile: e.target.checked })}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                                            </label>
                                        </div>
                                        <div className="py-4">
                                            <button className="text-green-600 font-medium hover:text-green-700">Change Password</button>
                                        </div>
                                        <div className="py-4">
                                            <button className="text-red-600 font-medium hover:text-red-700">Delete Account</button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Save Button */}
                            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                                <button
                                    onClick={handleSave}
                                    disabled={loading}
                                    className="flex items-center space-x-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4" />
                                            <span>Save Changes</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
