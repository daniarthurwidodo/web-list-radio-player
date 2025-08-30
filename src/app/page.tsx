'use client'

import { useState, useEffect } from 'react'
import SearchBar from '@/components/SearchBar'
import StationCard from '@/components/StationCard'
import AdsModal from '@/components/AdsModal'
import { fetchRadioStations } from '@/lib/data-fetcher'
import { RadioStation } from '@/types/radio'

export default function Home() {
  const [stations, setStations] = useState<RadioStation[]>([])
  const [filteredStations, setFilteredStations] = useState<RadioStation[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showAdsModal, setShowAdsModal] = useState(true)

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
    <div id="app-container" className="p-4 md:p-8">
      <div id="main-content" className="max-w-4xl mx-auto">
        {/* Header with App Title and Search */}
        <header id="app-header" className="mb-6">
          <div id="header-brand" className="flex items-center gap-3 mb-4">
            <div id="app-logo" className="w-10 h-10 bg-green-400 rounded-lg flex items-center justify-center">
              <span className="text-black text-xl font-bold">📻</span>
            </div>
            <div id="app-title">
              <h1 className="text-2xl md:text-3xl font-bold text-white">Web Radio Player</h1>
              <p className="text-gray-400 text-sm">Discover live radio stations</p>
            </div>
          </div>
          <div id="search-container">
            <SearchBar onSearch={handleSearch} />
          </div>
        </header>

        {/* Ads Section */}
        <section id="ads-section" className="mb-6">
          <div className="bg-gradient-to-r from-gray-800/60 to-gray-700/60 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center">
                  <span className="text-black text-sm font-bold">AD</span>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Advertisement Space</p>
                  <p className="text-gray-400 text-xs">Premium radio experience</p>
                </div>
              </div>
              <button className="bg-green-400 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-green-500 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Station Results */}
        <section id="stations-section" className="mb-8">
          <div id="stations-header" className="flex items-center justify-between mb-4">
            <h2 id="stations-title" className="text-lg md:text-xl font-semibold text-white">
              {searchQuery ? `Results for "${searchQuery}"` : 'Stations'}
            </h2>
            <span id="stations-count" className="text-gray-400 text-xs md:text-sm">
              {filteredStations.length} found
            </span>
          </div>
          
          {loading ? (
            <div id="loading-spinner" className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
            </div>
          ) : filteredStations.length > 0 ? (
            <div id="stations-list" className="space-y-2">
              {filteredStations.map((station) => (
                <StationCard key={station.id} station={station} />
              ))}
            </div>
          ) : (
            <div id="empty-state" className="text-center py-8">
              <div className="text-4xl mb-3">📻</div>
              <p className="text-gray-400 text-base mb-2">
                {searchQuery ? 'No stations found' : 'No stations available'}
              </p>
              <p className="text-gray-500 text-sm">
                {searchQuery ? 'Try a different search term' : 'Check back later for more stations'}
              </p>
            </div>
          )}
        </section>

      </div>

      {/* Ads Modal */}
      <AdsModal 
        isOpen={showAdsModal} 
        onClose={() => setShowAdsModal(false)} 
      />
    </div>
  )
}
