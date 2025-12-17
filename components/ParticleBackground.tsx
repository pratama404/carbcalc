'use client'

export default function ParticleBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-10 left-10 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-75"></div>
      <div className="absolute top-20 right-20 w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-3 h-3 bg-purple-400 rounded-full animate-bounce opacity-50"></div>
      <div className="absolute bottom-10 right-10 w-2 h-2 bg-green-300 rounded-full animate-ping opacity-60"></div>
      <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-blue-300 rounded-full animate-pulse opacity-40"></div>
      <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-purple-300 rounded-full animate-bounce opacity-30"></div>
    </div>
  )
}