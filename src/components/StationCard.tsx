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
    <div 
      className="group bg-gray-800/40 p-3 md:p-4 rounded-lg hover:bg-gray-700/40 transition-all duration-200 active:bg-gray-700/60 cursor-pointer"
      onClick={handlePlayPause}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1 pointer-events-none">
          <div className="relative w-10 h-10 md:w-12 md:h-12 bg-gray-700 rounded-lg flex items-center justify-center shrink-0">
            <span className="text-lg md:text-2xl">📻</span>
            
            {/* Play/Pause overlay */}
            <div className={`absolute inset-0 bg-black/70 rounded-lg flex items-center justify-center transition-opacity md:opacity-0 md:group-hover:opacity-100 ${
              isCurrentlyPlaying ? 'opacity-100' : 'opacity-80 md:opacity-0'
            }`}>
              {isCurrentlyPlaying ? (
                <Pause size={16} className="text-white md:w-5 md:h-5" />
              ) : (
                <Play size={16} className="text-white ml-0.5 md:w-5 md:h-5" />
              )}
            </div>
          </div>
          
          <div className="min-w-0 flex-1">
            <h3 className={`font-medium truncate text-sm md:text-base ${isCurrentStation ? 'text-green-400' : 'text-white'}`}>
              {station.name}
            </h3>
            <p className="text-gray-400 text-xs md:text-sm truncate">
              {station.frequency}
            </p>
            {station.country && (
              <p className="text-gray-500 text-xs hidden md:block">
                {station.country}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2 shrink-0 pointer-events-none">
          {isCurrentlyPlaying && (
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            </div>
          )}
          
          {/* Mobile: Show explicit play button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handlePlayPause()
            }}
            className="md:hidden w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors pointer-events-auto"
          >
            {isCurrentlyPlaying ? (
              <Pause size={14} className="text-white" />
            ) : (
              <Play size={14} className="text-white ml-0.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}