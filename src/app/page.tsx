'use client'

import { useState, useEffect } from 'react'
import SearchBar from '@/components/SearchBar'
import StationCard from '@/components/StationCard'
import { fetchRadioStations } from '@/lib/data-fetcher'
import { RadioStation } from '@/types/radio'

export default function Home() {
  const [stations, setStations] = useState<RadioStation[]>([])
  const [filteredStations, setFilteredStations] = useState<RadioStation[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const loadStations = async () => {
      try {
        const data = await fetchRadioStations()
        setStations(data)
        setFilteredStations(data)
      } catch (error) {
        console.error('Failed to load stations:', error)
      } finally {
        setLoading(false)
      }
    }

    loadStations()
  }, [])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (!query.trim()) {
      setFilteredStations(stations)
    } else {
      const filtered = stations.filter(station => 
        station.name.toLowerCase().includes(query.toLowerCase()) ||
        station.frequency.toLowerCase().includes(query.toLowerCase()) ||
        (station.country && station.country.toLowerCase().includes(query.toLowerCase()))
      )
      setFilteredStations(filtered)
    }
  }

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Radio Stations</h1>
          <p className="text-gray-400 mb-6">Discover and listen to radio stations from around the world</p>
          <SearchBar onSearch={handleSearch} />
        </header>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-white">
              {searchQuery ? `Search results for "${searchQuery}"` : 'All Stations'}
            </h2>
            <span className="text-gray-400 text-sm">
              {filteredStations.length} station{filteredStations.length !== 1 ? 's' : ''}
            </span>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
            </div>
          ) : filteredStations.length > 0 ? (
            <div className="grid gap-2">
              {filteredStations.map((station) => (
                <StationCard key={station.id} station={station} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg mb-2">
                {searchQuery ? 'No stations found' : 'No stations available'}
              </p>
              <p className="text-gray-500 text-sm">
                {searchQuery ? 'Try a different search term' : 'Check back later for more stations'}
              </p>
            </div>
          )}
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-white mb-4">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800/40 p-6 rounded-lg">
              <div className="text-3xl mb-3">🎵</div>
              <h3 className="text-lg font-semibold text-white mb-2">Live Streaming</h3>
              <p className="text-gray-400 text-sm">
                Listen to live radio streams with high-quality audio
              </p>
            </div>
            <div className="bg-gray-800/40 p-6 rounded-lg">
              <div className="text-3xl mb-3">🔍</div>
              <h3 className="text-lg font-semibold text-white mb-2">Smart Search</h3>
              <p className="text-gray-400 text-sm">
                Find stations by name, frequency, or location
              </p>
            </div>
            <div className="bg-gray-800/40 p-6 rounded-lg">
              <div className="text-3xl mb-3">🎛️</div>
              <h3 className="text-lg font-semibold text-white mb-2">Player Controls</h3>
              <p className="text-gray-400 text-sm">
                Full control with play, pause, and volume controls
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
