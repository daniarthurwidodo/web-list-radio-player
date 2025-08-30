'use client'

import { Home, Search, Library, Radio } from 'lucide-react'

export default function Sidebar() {
  return (
    <div className="w-64 bg-black p-6 flex flex-col">
      <div className="mb-8">
        <h1 className="text-white text-xl font-bold flex items-center gap-2">
          <Radio size={24} />
          Web Radio Player
        </h1>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-4">
          <li>
            <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
              <Home size={20} />
              Home
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
              <Search size={20} />
              Search
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
              <Library size={20} />
              Your Library
            </a>
          </li>
        </ul>
        
        <div className="mt-8 pt-4 border-t border-gray-800">
          <h3 className="text-gray-400 text-sm font-semibold mb-4">RADIO STATIONS</h3>
          <div className="text-gray-400 text-sm">
            Loading stations...
          </div>
        </div>
      </nav>
    </div>
  )
}