'use client'

import { Play, Pause } from 'lucide-react'
import { RadioStation } from '@/types/radio'
import { usePlayer } from '@/contexts/PlayerContext'

interface StationCardProps {
  station: RadioStation
}

export default function StationCard({ station }: StationCardProps) {
  const { currentStation, isPlaying, play, pause } = usePlayer()
  
  const isCurrentStation = currentStation?.id === station.id
  const isCurrentlyPlaying = isCurrentStation && isPlaying

  const handlePlayPause = () => {
    if (isCurrentlyPlaying) {
      pause()
    } else {
      play(station)
    }
  }

  return (
    <div className="group bg-gray-800/40 p-4 rounded-lg hover:bg-gray-700/40 transition-all duration-200 cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <div className="relative w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center shrink-0">
            <span className="text-2xl">📻</span>
            
            <button
              onClick={handlePlayPause}
              className={`absolute inset-0 bg-black/70 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ${
                isCurrentlyPlaying ? 'opacity-100' : ''
              }`}
            >
              {isCurrentlyPlaying ? (
                <Pause size={20} className="text-white" />
              ) : (
                <Play size={20} className="text-white ml-0.5" />
              )}
            </button>
          </div>
          
          <div className="min-w-0 flex-1">
            <h3 className={`font-medium truncate ${isCurrentStation ? 'text-green-400' : 'text-white'}`}>
              {station.name}
            </h3>
            <p className="text-gray-400 text-sm truncate">
              {station.frequency}
            </p>
            {station.country && (
              <p className="text-gray-500 text-xs">
                {station.country}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {isCurrentlyPlaying && (
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}