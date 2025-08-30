'use client'

import { Menu, Radio } from 'lucide-react'

interface MobileHeaderProps {
  onMenuClick: () => void
}

export default function MobileHeader({ onMenuClick }: MobileHeaderProps) {
  return (
    <header className="h-14 bg-black border-b border-gray-800 flex items-center justify-between px-4">
      <button 
        onClick={onMenuClick}
        className="text-gray-400 hover:text-white transition-colors"
      >
        <Menu size={24} />
      </button>
      
      <div className="flex items-center gap-2">
        <Radio size={20} className="text-green-400" />
        <h1 className="text-white font-semibold text-sm">Web Radio</h1>
      </div>
      
      <div className="w-6" />
    </header>
  )
}