'use client'

import { createContext, useContext, useReducer, useRef, ReactNode } from 'react'
import { RadioStation, PlayerState } from '@/types/radio'

interface PlayerContextType extends PlayerState {
  play: (station?: RadioStation) => void
  pause: () => void
  stop: () => void
  setVolume: (volume: number) => void
  toggleMute: () => void
  setCurrentStation: (station: RadioStation) => void
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined)

type PlayerAction =
  | { type: 'PLAY'; payload?: RadioStation }
  | { type: 'PAUSE' }
  | { type: 'STOP' }
  | { type: 'SET_VOLUME'; payload: number }
  | { type: 'TOGGLE_MUTE' }
  | { type: 'SET_STATION'; payload: RadioStation }

const initialState: PlayerState = {
  isPlaying: false,
  currentStation: null,
  volume: 0.7,
  isMuted: false
}

function playerReducer(state: PlayerState, action: PlayerAction): PlayerState {
  switch (action.type) {
    case 'PLAY':
      return {
        ...state,
        isPlaying: true,
        currentStation: action.payload || state.currentStation
      }
    case 'PAUSE':
      return {
        ...state,
        isPlaying: false
      }
    case 'STOP':
      return {
        ...state,
        isPlaying: false,
        currentStation: null
      }
    case 'SET_VOLUME':
      return {
        ...state,
        volume: action.payload,
        isMuted: action.payload === 0
      }
    case 'TOGGLE_MUTE':
      return {
        ...state,
        isMuted: !state.isMuted
      }
    case 'SET_STATION':
      return {
        ...state,
        currentStation: action.payload
      }
    default:
      return state
  }
}

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(playerReducer, initialState)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const play = (station?: RadioStation) => {
    if (station && station !== state.currentStation) {
      dispatch({ type: 'SET_STATION', payload: station })
    }
    
    if (audioRef.current) {
      const currentStation = station || state.currentStation
      if (currentStation && audioRef.current.src !== currentStation.link) {
        audioRef.current.src = currentStation.link
      }
      audioRef.current.play()
      dispatch({ type: 'PLAY', payload: station })
    }
  }

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
    dispatch({ type: 'PAUSE' })
  }

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    dispatch({ type: 'STOP' })
  }

  const setVolume = (volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
    dispatch({ type: 'SET_VOLUME', payload: volume })
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !state.isMuted
    }
    dispatch({ type: 'TOGGLE_MUTE' })
  }

  const setCurrentStation = (station: RadioStation) => {
    dispatch({ type: 'SET_STATION', payload: station })
  }

  return (
    <PlayerContext.Provider
      value={{
        ...state,
        play,
        pause,
        stop,
        setVolume,
        toggleMute,
        setCurrentStation
      }}
    >
      {children}
      <audio
        ref={audioRef}
        onPlay={() => dispatch({ type: 'PLAY' })}
        onPause={() => dispatch({ type: 'PAUSE' })}
        onVolumeChange={() => {
          if (audioRef.current) {
            dispatch({ type: 'SET_VOLUME', payload: audioRef.current.volume })
          }
        }}
      />
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const context = useContext(PlayerContext)
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider')
  }
  return context
}