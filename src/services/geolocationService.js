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
    
    if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
      throw new Error('API key not configured')
    }

    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch location data')
    }

    const data = await response.json()

    if (data.length === 0) {
      throw new Error('No location found for these coordinates')
    }

    // Return city name, or country if city is not available
    const location = data[0]
    return location.name || location.country || 'Unknown'
  } catch (error) {
    console.error('Geolocation error:', error)
    throw new Error('Unable to determine your location. Please search manually.')
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
