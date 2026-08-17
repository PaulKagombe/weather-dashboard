import React from 'react'
import { format } from 'date-fns'
import { getWeatherIconUrl } from '../services/weatherAPI'

function Forecast({ data }) {
  if (!data || data.length === 0) return null

  // Get forecast for every 24 hours (every 8th item since API returns 3-hour intervals)
  const dailyForecast = data.filter((item, index) => index % 8 === 0).slice(0, 5)

  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold text-white mb-4">
        <i className="fas fa-calendar-alt mr-2"></i>
        5-Day Forecast
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {dailyForecast.map((day, index) => {
          const date = new Date(day.dt * 1000)
          const temp = Math.round(day.main.temp)
          const weather = day.weather[0]
          const icon = weather.icon
          const description = weather.description

          return (
            <div key={index} className="weather-card rounded-2xl p-4 shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
              <p className="text-white font-semibold text-center mb-3">
                {format(date, 'EEE, MMM d')}
              </p>
              <div className="text-center mb-3">
                <img
                  src={getWeatherIconUrl(icon)}
                  alt={description}
                  className="w-16 h-16 mx-auto"
                />
              </div>
              <p className="text-white text-center text-lg font-bold mb-1">
                {temp}°C
              </p>
              <p className="text-blue-100 text-center text-sm capitalize">
                {description}
              </p>
              <div className="mt-3 pt-3 border-t border-white/20 text-xs text-blue-100">
                <div className="flex justify-between">
                  <span>
                    <i className="fas fa-tint mr-1"></i>
                    {day.main.humidity}%
                  </span>
                  <span>
                    <i className="fas fa-wind mr-1"></i>
                    {Math.round(day.wind.speed * 3.6)} km/h
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Forecast
