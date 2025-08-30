'use client'

import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

interface AdsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AdsModal({ isOpen, onClose }: AdsModalProps) {
  const [countdown, setCountdown] = useState(15)

  useEffect(() => {
    if (!isOpen) return

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          onClose()
          return 15
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) {
      setCountdown(15)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-xl max-w-md w-full relative overflow-hidden border border-gray-200 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors"
        >
          <X size={16} />
        </button>

        {/* Countdown Badge */}
        <div className="absolute top-4 left-4 z-10 bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
          Auto-close in {countdown}s
        </div>

        {/* Ad Content */}
        <div className="p-8 text-center">
          {/* Ad Badge */}
          <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
            SPONSORED
          </div>

          {/* Main Content */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              🎧 Best Headphones Sale!
            </h2>
            <p className="text-gray-700 text-sm mb-4">
              Experience crystal-clear audio with premium wireless headphones. Limited time offer!
            </p>
            
            {/* Product Image Mockup */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-8 mb-6 flex items-center justify-center">
              <div className="text-6xl">🎧</div>
            </div>

            {/* Features */}
            <div className="text-left bg-gray-50 rounded-lg p-4 mb-6">
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Active noise cancellation
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  30-hour battery life
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Premium sound quality
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Free shipping worldwide
                </li>
              </ul>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg p-3 mb-4">
              <div className="text-xl font-bold">50% OFF - $199</div>
              <div className="text-sm opacity-90">Was $399 - Save $200!</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <button className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors">
              Shop Now
            </button>
            <button 
              onClick={onClose}
              className="w-full text-gray-500 py-2 text-sm hover:text-gray-700 transition-colors"
            >
              Skip Ad
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}