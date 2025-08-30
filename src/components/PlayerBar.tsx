'use client'

import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react'
import { usePlayer } from '@/contexts/PlayerContext'

export default function PlayerBar() {
  const { 
    isPlaying, 
    isLoading,
    currentStation, 
    volume, 
    isMuted, 
    play, 
    pause, 
    setVolume, 
    toggleMute 
  } = usePlayer()

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 z-40">
      {/* Mobile Layout */}
      <div className="md:hidden">
        {currentStation && (
          <>
            {/* Mini Player Info */}
            <div className="flex items-center justify-between p-2 border-b border-gray-800">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center shrink-0">
                  <span className="text-sm">📻</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-white text-sm font-medium truncate">
                    {currentStation.name}
                  </div>
                  <div className="text-gray-400 text-xs truncate">
                    {currentStation.frequency}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleMute}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                
                <button
                  onClick={isPlaying ? pause : () => play()}
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-black"></div>
                  ) : isPlaying ? (
                    <Pause size={14} />
                  ) : (
                    <Play size={14} />
                  )}
                </button>
              </div>
            </div>
            
            {/* Volume Control */}
            <div className="px-4 py-2">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #1db954 0%, #1db954 ${(isMuted ? 0 : volume) * 100}%, #4b5563 ${(isMuted ? 0 : volume) * 100}%, #4b5563 100%)`
                }}
              />
            </div>
            
            {isLoading ? (
              <div className="text-center pb-2">
                <div className="text-xs text-gray-400 flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-2 w-2 border-b border-gray-400"></div>
                  LOADING
                </div>
              </div>
            ) : isPlaying && (
              <div className="text-center pb-2">
                <div className="text-xs text-gray-400 flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  LIVE
                </div>
              </div>
            )}

            {/* Mobile Ads Section */}
            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm rounded-lg p-2 mx-2 mb-2 border border-green-500/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center shrink-0">
                    <span className="text-white text-xs font-bold">AD</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-white text-xs font-medium truncate">🎮 New Game - Download Now!</p>
                    <p className="text-gray-300 text-xs truncate">Free to play</p>
                  </div>
                </div>
                <button className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium hover:bg-green-600 transition-colors shrink-0">
                  Play
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex h-20 px-4 items-center justify-between">
        <div className="flex items-center gap-4 min-w-0 w-1/4">
          {currentStation && (
            <>
              <div className="w-12 h-12 bg-gray-700 rounded flex items-center justify-center shrink-0">
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

        {/* Desktop Ads Section */}
        <div className="flex items-center gap-3 min-w-0 w-1/3">
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-lg px-3 py-2 border border-yellow-500/30 flex items-center gap-2 min-w-0 flex-1">
            <div className="w-6 h-6 bg-yellow-500 rounded flex items-center justify-center shrink-0">
              <span className="text-black text-xs font-bold">AD</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-white text-xs font-medium truncate">🍕 Pizza Palace - Order Now!</p>
              <p className="text-gray-300 text-xs truncate">30% off your first order</p>
            </div>
            <button className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-medium hover:bg-yellow-600 transition-colors shrink-0">
              Order
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 w-1/4">
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-white transition-colors">
              <SkipBack size={20} />
            </button>
            
            <button
              onClick={isPlaying ? pause : () => play()}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform"
              disabled={!currentStation || isLoading}
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
              ) : isPlaying ? (
                <Pause size={16} />
              ) : (
                <Play size={16} />
              )}
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

        <div className="flex items-center gap-2 w-1/4 justify-end">
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
    </div>
  )
}