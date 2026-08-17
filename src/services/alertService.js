/**
 * Weather alert detection and generation
 * Analyzes weather data and generates appropriate alerts
 */

/**
 * Generate weather alerts based on current weather data
 * @param {Object} weatherData - Current weather data from API
 * @returns {Array} Array of alert objects
 */
export const generateWeatherAlerts = (weatherData) => {
  if (!weatherData) return []

  const alerts = []
  const { weather, main, wind, visibility } = weatherData

  // Check for thunderstorm
  if (weather.some(w => w.main === 'Thunderstorm')) {
    alerts.push({
      type: 'Thunderstorm',
      severity: 'critical',
      icon: 'fas fa-bolt',
      message: 'Severe thunderstorm warning. Stay indoors and avoid outdoor activities.',
      color: 'red'
    })
  }

  // Check for heavy rain
  if (weather.some(w => w.main === 'Rain')) {
    const rainIntensity = weather.find(w => w.main === 'Rain')?.description || ''
    if (rainIntensity.includes('heavy') || rainIntensity.includes('extreme')) {
      alerts.push({
        type: 'Heavy Rain',
        severity: 'critical',
        icon: 'fas fa-cloud-rain',
        message: 'Heavy rainfall warning. Expect flooding in low-lying areas.',
        color: 'red'
      })
    } else {
      alerts.push({
        type: 'Rain',
        severity: 'warning',
        icon: 'fas fa-cloud-rain',
        message: 'Rain expected. Carry an umbrella when going outside.',
        color: 'orange'
      })
    }
  }

  // Check for snow
  if (weather.some(w => w.main === 'Snow')) {
    alerts.push({
      type: 'Snow Alert',
      severity: 'warning',
      icon: 'fas fa-snowflake',
      message: 'Snow expected. Roads may become hazardous.',
      color: 'orange'
    })
  }

  // Check for high wind
  if (wind && wind.speed > 15) { // > 54 km/h
    alerts.push({
      type: 'High Wind',
      severity: wind.speed > 20 ? 'critical' : 'warning', // > 72 km/h is critical
      icon: 'fas fa-wind',
      message: `Strong winds up to ${Math.round(wind.speed * 3.6)} km/h. Secure loose objects.`,
      color: wind.speed > 20 ? 'red' : 'orange'
    })
  }

  // Check for low visibility
  if (visibility && visibility < 1000) { // < 1 km
    alerts.push({
      type: 'Low Visibility',
      severity: visibility < 500 ? 'critical' : 'warning',
      icon: 'fas fa-smog',
      message: `Visibility reduced to ${(visibility / 1000).toFixed(1)} km. Drive with caution.`,
      color: visibility < 500 ? 'red' : 'orange'
    })
  }

  // Check for extreme heat
  if (main && main.temp > 35) {
    alerts.push({
      type: 'Heat Warning',
      severity: main.temp > 40 ? 'critical' : 'warning',
      icon: 'fas fa-fire',
      message: `Extreme heat warning: ${Math.round(main.temp)}°C. Stay hydrated and avoid prolonged sun exposure.`,
      color: main.temp > 40 ? 'red' : 'orange'
    })
  }

  // Check for extreme cold
  if (main && main.temp < -15) {
    alerts.push({
      type: 'Frost Warning',
      severity: main.temp < -25 ? 'critical' : 'warning',
      icon: 'fas fa-icicles',
      message: `Severe cold warning: ${Math.round(main.temp)}°C. Dress warmly and limit outdoor time.`,
      color: main.temp < -25 ? 'red' : 'orange'
    })
  }

  // Check for fog
  if (weather.some(w => w.main === 'Mist' || w.main === 'Fog')) {
    alerts.push({
      type: 'Fog Advisory',
      severity: 'advisory',
      icon: 'fas fa-cloud',
      message: 'Fog conditions. Visibility reduced. Drive carefully.',
      color: 'yellow'
    })
  }

  return alerts
}

/**
 * Get color class for alert severity
 * @param {string} severity - Alert severity level
 * @returns {string} CSS color class
 */
export const getAlertColor = (severity) => {
  switch (severity) {
    case 'critical':
      return 'bg-red-500 border-red-600'
    case 'warning':
      return 'bg-orange-500 border-orange-600'
    case 'advisory':
      return 'bg-yellow-500 border-yellow-600'
    default:
      return 'bg-blue-500 border-blue-600'
  }
}

/**
 * Get alert badge label
 * @param {string} severity - Alert severity level
 * @returns {string} Badge text
 */
export const getAlertBadge = (severity) => {
  switch (severity) {
    case 'critical':
      return '🔴 CRITICAL'
    case 'warning':
      return '🟠 WARNING'
    case 'advisory':
      return '🟡 ADVISORY'
    default:
      return 'ℹ️ INFO'
  }
}
