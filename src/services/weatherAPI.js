import axios from 'axios'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || 'YOUR_API_KEY_HERE'
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

/**
 * Fetch current weather and forecast data for a given city
 * @param {string} city - City name
 * @returns {Promise<Object>} Weather data object
 */
export const fetchWeatherData = async (city) => {
  try {
    if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
      throw new Error('API key not configured. Please set VITE_OPENWEATHER_API_KEY in .env')
    }

    // Fetch current weather
    const currentResponse = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    })

    // Fetch 5-day forecast
    const forecastResponse = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    })

    return {
      current: currentResponse.data,
      forecast: forecastResponse.data.list
    }
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('City not found. Please check the spelling and try again.')
    } else if (error.response?.status === 401) {
      throw new Error('Invalid API key. Please check your configuration.')
    } else if (error.message.includes('API key not configured')) {
      throw error
    } else {
      throw new Error('Unable to fetch weather data. Please try again later.')
    }
  }
}

/**
 * Fetch weather data by coordinates
 * @param {number} latitude - Latitude
 * @param {number} longitude - Longitude
 * @returns {Promise<Object>} Weather data object
 */
export const fetchWeatherByCoordinates = async (latitude, longitude) => {
  try {
    if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
      throw new Error('API key not configured. Please set VITE_OPENWEATHER_API_KEY in .env')
    }

    // Fetch current weather
    const currentResponse = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat: latitude,
        lon: longitude,
        appid: API_KEY,
        units: 'metric'
      }
    })

    // Fetch 5-day forecast
    const forecastResponse = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        lat: latitude,
        lon: longitude,
        appid: API_KEY,
        units: 'metric'
      }
    })

    return {
      current: currentResponse.data,
      forecast: forecastResponse.data.list
    }
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error('Invalid API key. Please check your configuration.')
    } else {
      throw new Error('Unable to fetch weather data for this location.')
    }
  }
}

/**
 * Get weather icon URL
 * @param {string} iconCode - Icon code from API
 * @returns {string} Icon URL
 */
export const getWeatherIconUrl = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@4x.png`
}

/**
 * Get weather icon class for Font Awesome
 * @param {string} description - Weather description
 * @returns {string} Font Awesome icon class
 */
export const getWeatherIcon = (description) => {
  const desc = description.toLowerCase()
  if (desc.includes('clear') || desc.includes('sunny')) return 'fas fa-sun'
  if (desc.includes('cloud')) return 'fas fa-cloud'
  if (desc.includes('rain')) return 'fas fa-cloud-rain'
  if (desc.includes('snow')) return 'fas fa-snowflake'
  if (desc.includes('thunderstorm')) return 'fas fa-bolt'
  if (desc.includes('mist') || desc.includes('fog')) return 'fas fa-smog'
  return 'fas fa-cloud-sun'
}
