'use client'

import { ReactNode } from 'react'
import Sidebar from './Sidebar'
import PlayerBar from './PlayerBar'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <main className="flex-1 bg-gradient-to-b from-gray-900 to-black">
          {children}
        </main>
      </div>
      <PlayerBar />
    </div>
  )
}