export interface RadioStation {
  id: string
  name: string
  frequency: string
  link: string
  image?: string
  genre?: string
  country?: string
}

export interface PlayerState {
  isPlaying: boolean
  isLoading: boolean
  currentStation: RadioStation | null
  volume: number
  isMuted: boolean
}