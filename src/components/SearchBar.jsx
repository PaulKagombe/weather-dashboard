import React, { useState } from 'react'

function SearchBar({ onSearch }) {
  const [input, setInput] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Popular cities for suggestions
  const popularCities = [
    'London', 'New York', 'Tokyo', 'Paris', 'Sydney',
    'Dubai', 'Singapore', 'Toronto', 'Amsterdam', 'Bangkok'
  ]

  const handleInputChange = (e) => {
    const value = e.target.value
    setInput(value)

    if (value.length > 0) {
      const filtered = popularCities.filter(city =>
        city.toLowerCase().includes(value.toLowerCase())
      )
      setSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (input.trim()) {
      onSearch(input.trim())
      setInput('')
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (city) => {
    onSearch(city)
    setInput('')
    setSuggestions([])
    setShowSuggestions(false)
  }

  return (
    <div className="mb-8 relative">
      <form onSubmit={handleSearch} className="flex justify-center gap-2">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onFocus={() => input && setShowSuggestions(true)}
            placeholder="Search for a city..."
            className="w-full px-6 py-3 rounded-full bg-white text-gray-800 placeholder-gray-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-10">
              {suggestions.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => handleSuggestionClick(city)}
                  className="w-full text-left px-4 py-2 hover:bg-blue-100 text-gray-800 first:rounded-t-lg last:rounded-b-lg"
                >
                  <i className="fas fa-map-marker-alt mr-2 text-blue-500"></i>
                  {city}
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="px-8 py-3 bg-white text-blue-600 rounded-full font-semibold shadow-lg hover:bg-blue-50 transition transform hover:scale-105"
        >
          <i className="fas fa-search mr-2"></i>
          Search
        </button>
      </form>
    </div>
  )
}

export default SearchBar
