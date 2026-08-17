import React, { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import CurrentWeather from './components/CurrentWeather'
import Forecast from './components/Forecast'
import WeatherDetails from './components/WeatherDetails'
import { fetchWeatherData } from './services/weatherAPI'
import './App.css'

function App() {
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [city, setCity] = useState('Nairobi') // Default city

  useEffect(() => {
    handleSearch(city)
  }, [])

  const handleSearch = async (searchCity) => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchWeatherData(searchCity)
      setCurrentWeather(data.current)
      setForecast(data.forecast)
      setCity(searchCity)
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data. Please try again.')
      setCurrentWeather(null)
      setForecast(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">
            <i className="fas fa-cloud-sun-rain mr-2"></i>
            Weather Dashboard
          </h1>
          <p className="text-blue-100 text-lg">Get real-time weather updates for any location</p>
        </div>

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} />

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500 text-white rounded-lg shadow-lg text-center">
            <i className="fas fa-exclamation-circle mr-2"></i>
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center text-white text-xl">
            <i className="fas fa-spinner fa-spin mr-2"></i>
            Loading weather data...
          </div>
        )}

        {/* Weather Content */}
        {!loading && currentWeather && (
          <div className="fade-in">
            {/* Current Weather */}
            <CurrentWeather data={currentWeather} />

            {/* Weather Details Grid */}
            <WeatherDetails data={currentWeather} />

            {/* Forecast */}
            {forecast && <Forecast data={forecast} />}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
