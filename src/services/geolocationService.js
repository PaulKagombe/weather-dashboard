/**
 * Convert coordinates to city name using reverse geocoding
 * Uses OpenWeatherMap reverse geocoding API
 * @param {number} latitude - Latitude coordinate
 * @param {number} longitude - Longitude coordinate
 * @returns {Promise<string>} City name
 */
export const getLocationFromCoordinates = async (latitude, longitude) => {
  try {
    const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
    
    console.log('API Key loaded:', API_KEY ? 'Yes (hidden)' : 'No')
    console.log('Latitude:', latitude, 'Longitude:', longitude)
    
    if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE' || API_KEY === '') {
      throw new Error('API key not configured. Check environment variables.')\n    }

    const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`
    console.log('Fetching from:', url.split('appid=')[0] + 'appid=***')
    
    const response = await fetch(url)

    console.log('Reverse geocoding response status:', response.status)
    
    if (!response.ok) {
      const errorData = await response.text()
      console.error('API Error Response:', errorData)
      throw new Error(`API returned ${response.status}: ${errorData}`)
    }

    const data = await response.json()
    console.log('Reverse geocoding data:', data)

    if (data.length === 0) {
      throw new Error('No location found for these coordinates')
    }

    // Return city name, or country if city is not available
    const location = data[0]
    const cityName = location.name || location.country || 'Unknown'
    console.log('Detected city:', cityName)
    return cityName
  } catch (error) {
    console.error('Geolocation error:', error)
    throw new Error(`Location detection failed: ${error.message}`)
  }
}

/**
 * Get user's current position
 * @returns {Promise<Object>} User's coordinates {latitude, longitude}
 */
export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        })
      },
      (error) => {
        let message = 'Unable to get your location'
        if (error.code === error.PERMISSION_DENIED) {
          message = 'Location permission denied'
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          message = 'Location information unavailable'
        } else if (error.code === error.TIMEOUT) {
          message = 'Location request timed out'
        }
        reject(new Error(message))
      }
    )
  })
}
