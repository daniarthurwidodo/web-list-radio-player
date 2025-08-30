'use client'

import { Home, Search, Library, Radio, X } from 'lucide-react'

interface SidebarProps {
  onClose?: () => void
  isMobile?: boolean
}

export default function Sidebar({ onClose, isMobile = false }: SidebarProps) {
  return (
    <div className={`w-64 bg-black flex flex-col h-full ${isMobile ? 'border-r border-gray-800' : ''}`}>
      {/* Mobile Header */}
      {isMobile && (
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Radio size={20} className="text-green-400" />
            <h1 className="text-white font-bold text-lg">Web Radio</h1>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      )}

      {/* Desktop Header */}
      {!isMobile && (
        <div className="p-6 pb-4">
          <h1 className="text-white text-xl font-bold flex items-center gap-2">
            <Radio size={24} className="text-green-400" />
            Web Radio Player
          </h1>
        </div>
      )}
      
      <nav className={`flex-1 ${isMobile ? 'px-4 pb-4' : 'px-6 pb-6'}`}>
        <ul className="space-y-2">
          <li>
            <a 
              href="#" 
              className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors p-3 rounded-lg hover:bg-gray-800"
              onClick={isMobile ? onClose : undefined}
            >
              <Home size={20} />
              <span className="font-medium">Home</span>
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors p-3 rounded-lg hover:bg-gray-800"
              onClick={isMobile ? onClose : undefined}
            >
              <Search size={20} />
              <span className="font-medium">Search</span>
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors p-3 rounded-lg hover:bg-gray-800"
              onClick={isMobile ? onClose : undefined}
            >
              <Library size={20} />
              <span className="font-medium">Your Library</span>
            </a>
          </li>
        </ul>
        
        <div className="mt-6 pt-4 border-t border-gray-800">
          <h3 className="text-gray-400 text-xs font-bold tracking-wider mb-4 uppercase px-3">
            Radio Stations
          </h3>
          <div className="text-gray-400 text-sm px-3">
            Browse stations above
          </div>
        </div>

        {/* Mobile-specific footer */}
        {isMobile && (
          <div className="mt-8 pt-4 border-t border-gray-800">
            <div className="text-xs text-gray-500 px-3">
              Web Radio Player v1.0
            </div>
          </div>
        )}
      </nav>
    </div>
  )
}