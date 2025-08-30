'use client'

import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react'
import { usePlayer } from '@/contexts/PlayerContext'

export default function PlayerBar() {
  const { 
    isPlaying, 
    currentStation, 
    volume, 
    isMuted, 
    play, 
    pause, 
    setVolume, 
    toggleMute 
  } = usePlayer()

  return (
    <div className="h-20 bg-gray-900 border-t border-gray-800 px-4 flex items-center justify-between">
      <div className="flex items-center gap-4 min-w-0 w-1/3">
        {currentStation && (
          <>
            <div className="w-12 h-12 bg-gray-700 rounded flex items-center justify-center">
              📻
            </div>
            <div className="min-w-0">
              <div className="text-white text-sm font-medium truncate">
                {currentStation.name}
              </div>
              <div className="text-gray-400 text-xs truncate">
                {currentStation.frequency}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col items-center gap-2 w-1/3">
        <div className="flex items-center gap-4">
          <button className="text-gray-400 hover:text-white transition-colors">
            <SkipBack size={20} />
          </button>
          
          <button
            onClick={isPlaying ? pause : () => play()}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform"
            disabled={!currentStation}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          
          <button className="text-gray-400 hover:text-white transition-colors">
            <SkipForward size={20} />
          </button>
        </div>
        
        {currentStation && isPlaying && (
          <div className="text-xs text-gray-400">
            🔴 LIVE
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 w-1/3 justify-end">
        <button
          onClick={toggleMute}
          className="text-gray-400 hover:text-white transition-colors"
        >
          {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #1db954 0%, #1db954 ${(isMuted ? 0 : volume) * 100}%, #4b5563 ${(isMuted ? 0 : volume) * 100}%, #4b5563 100%)`
          }}
        />
      </div>
    </div>
  )
}