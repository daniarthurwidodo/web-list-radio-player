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
  const [selectedGenre, setSelectedGenre] = useState<string>('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

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

  const applyFilters = () => {
    let filtered = stations

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(station => 
        station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        station.frequency.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (station.country && station.country.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (station.genre && station.genre.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Apply genre filter
    if (selectedGenre !== 'All') {
      filtered = filtered.filter(station => 
        station.genre && station.genre.toLowerCase().includes(selectedGenre.toLowerCase())
      )
    }

    setFilteredStations(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleGenreFilter = (genre: string) => {
    setSelectedGenre(genre)
  }

  useEffect(() => {
    applyFilters()
  }, [searchQuery, selectedGenre, stations])

  // Get unique genres from stations
  const getUniqueGenres = (): string[] => {
    const genresSet = new Set<string>()
    genresSet.add('All')
    
    stations.forEach(station => {
      if (station.genre) {
        // Handle comma-separated genres
        const genres = station.genre.split(',').map(g => g.trim())
        genres.forEach(genre => {
          if (genre) {
            genresSet.add(genre.charAt(0).toUpperCase() + genre.slice(1))
          }
        })
      }
    })
    
    return Array.from(genresSet)
  }

  // Pagination logic
  const totalPages = Math.ceil(filteredStations.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedStations = filteredStations.slice(startIndex, endIndex)

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
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-lg p-4 border border-blue-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">AD</span>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">🎧 Premium Headphones - 50% OFF</p>
                  <p className="text-gray-300 text-xs">Limited time offer • Free shipping</p>
                </div>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors">
                Shop Now
              </button>
            </div>
          </div>
        </section>

        {/* Genre Filter Section */}
        <section id="genre-filter-section" className="mb-6">
          <div className="flex flex-wrap gap-2">
            {getUniqueGenres().map((genre) => (
              <button
                key={genre}
                onClick={() => handleGenreFilter(genre)}
                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                  selectedGenre === genre
                    ? 'bg-green-400 text-black'
                    : 'bg-gray-800/60 text-gray-300 hover:bg-gray-700/60 hover:text-white'
                }`}
              >
                {genre}
              </button>
            ))}
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
          ) : paginatedStations.length > 0 ? (
            <>
              <div id="stations-list" className="space-y-2">
                {paginatedStations.map((station) => (
                  <StationCard key={station.id} station={station} />
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div id="pagination" className="flex items-center justify-center gap-2 mt-6">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 text-sm font-medium rounded-lg bg-gray-800/60 text-gray-300 hover:bg-gray-700/60 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 text-sm font-medium rounded-lg transition-colors ${
                          currentPage === page
                            ? 'bg-green-400 text-black'
                            : 'bg-gray-800/60 text-gray-300 hover:bg-gray-700/60 hover:text-white'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 text-sm font-medium rounded-lg bg-gray-800/60 text-gray-300 hover:bg-gray-700/60 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
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
    </div>
  )
}
