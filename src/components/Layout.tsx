'use client'

import { ReactNode } from 'react'
import PlayerBar from './PlayerBar'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="h-screen bg-black text-white flex flex-col overflow-hidden">
      {/* Main Content */}
      <main className="flex-1 bg-gradient-to-b from-gray-900 to-black overflow-y-auto pb-20">
        {children}
      </main>

      {/* Player Bar */}
      <PlayerBar />
    </div>
  )
}