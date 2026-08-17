import React, { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import CurrentWeather from './components/CurrentWeather'
import Forecast from './components/Forecast'
import WeatherDetails from './components/WeatherDetails'
import WeatherAlerts from './components/WeatherAlerts'
import GeolocationButton from './components/GeolocationButton'
import ThemeToggle from './components/ThemeToggle'
import { fetchWeatherData, fetchWeatherByCoordinates } from './services/weatherAPI'
import { getLocationFromCoordinates } from './services/geolocationService'
import { generateWeatherAlerts } from './services/alertService'
import { useTheme } from './context/ThemeContext'
import './App.css'

function App() {
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [city, setCity] = useState('Nairobi')
  const [locationLoading, setLocationLoading] = useState(false)
  const [userLocation, setUserLocation] = useState(null)
  const [alerts, setAlerts] = useState([])
  const { isDark } = useTheme()

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

      // Generate alerts based on weather data
      const generatedAlerts = generateWeatherAlerts(data.current)
      setAlerts(generatedAlerts)
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data. Please try again.')
      setCurrentWeather(null)
      setForecast(null)
      setAlerts([])
    } finally {
      setLoading(false)
    }
  }

  const handleGeolocation = async () => {
    setLocationLoading(true)
    setError(null)

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.')
      setLocationLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        setUserLocation({ latitude, longitude })

        setLoading(true)
        setError(null)

        try {
          // Fetch weather directly by coordinates - no name lookup involved,
          // so this never breaks due to reverse-geocoding returning a
          // ward/township-level name the weather API can't match by name.
          const data = await fetchWeatherByCoordinates(latitude, longitude)
          setCurrentWeather(data.current)
          setForecast(data.forecast)

          const generatedAlerts = generateWeatherAlerts(data.current)
          setAlerts(generatedAlerts)

          // Reverse geocode purely for the display label; a failure here
          // must never block or clear the weather data we already have.
          try {
            const cityName = await getLocationFromCoordinates(latitude, longitude)
            setCity(cityName)
          } catch (geoErr) {
            setCity('Your location')
          }
        } catch (err) {
          setError(err.message || 'Failed to get weather for your location. Please try again.')
          setCurrentWeather(null)
          setForecast(null)
          setAlerts([])
        } finally {
          setLoading(false)
          setLocationLoading(false)
        }
      },
      (error) => {
        let errorMessage = 'Unable to access your location.'
        if (error.code === error.PERMISSION_DENIED) {
          errorMessage = 'Location permission denied. Please enable it in your browser settings.'
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMessage = 'Location information is unavailable.'
        } else if (error.code === error.TIMEOUT) {
          errorMessage = 'Location request timed out.'
        }
        setError(errorMessage)
        setLocationLoading(false)
      },
      { timeout: 10000, enableHighAccuracy: true }
    )
  }

  const handleDismissAlert = (index) => {
    setAlerts(alerts.filter((_, i) => i !== index))
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 p-4 ${
        isDark
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
          : 'bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header with Theme Toggle */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex-1"></div>
          <div className="flex-1 text-center">
            <h1
              className={`text-5xl font-bold mb-2 drop-shadow-lg ${
                isDark ? 'text-white' : 'text-white'
              }`}
            >
              <i className="fas fa-cloud-sun-rain mr-2"></i>
              Weather Dashboard
            </h1>
            <p className={`text-lg ${ isDark ? 'text-gray-300' : 'text-blue-100' }`}>
              Get real-time weather updates for any location
            </p>
          </div>
          <div className="flex-1 flex justify-end">
            <ThemeToggle />
          </div>
        </div>

        {/* Search Bar and Geolocation */}
        <div className="flex gap-2 justify-center mb-8 flex-wrap">
          <div className="flex-1 max-w-md">
            <SearchBar onSearch={handleSearch} />
          </div>
          <GeolocationButton
            onGeolocation={handleGeolocation}
            loading={locationLoading}
          />
        </div>

        {/* Current Location Display */}
        {userLocation && (
          <div className={`text-center mb-4 text-sm ${ isDark ? 'text-gray-300' : 'text-white' }`}>
            <i className="fas fa-map-marker-alt mr-2 text-red-300"></i>
            Location detected: {city}
          </div>
        )}

        {/* Weather Alerts */}
        {alerts.length > 0 && <WeatherAlerts alerts={alerts} onDismiss={handleDismissAlert} />}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500 text-white rounded-lg shadow-lg text-center">
            <i className="fas fa-exclamation-circle mr-2"></i>
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className={`text-center text-xl ${ isDark ? 'text-gray-300' : 'text-white' }`}>
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