import React from 'react'
import { getWeatherIconUrl } from '../services/weatherAPI'

function CurrentWeather({ data }) {
  if (!data) return null

  const { main, weather, sys, clouds, visibility, coord } = data
  const temp = Math.round(main.temp)
  const feelsLike = Math.round(main.feels_like)
  const description = weather[0].description
  const weatherIcon = weather[0].icon

  return (
    <div className="mb-8">
      <div className="weather-card glass-effect rounded-3xl p-8 shadow-2xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Temperature */}
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              {data.name}, {sys.country}
            </h2>
            <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
              <img
                src={getWeatherIconUrl(weatherIcon)}
                alt={description}
                className="w-20 h-20"
              />
              <div>
                <div className="text-6xl font-bold text-blue-600">{temp}°C</div>
                <p className="text-gray-600 capitalize text-lg mt-2">{description}</p>
              </div>
            </div>
            <p className="text-gray-600 text-base">
              Feels like <span className="font-semibold">{feelsLike}°C</span>
            </p>
          </div>

          {/* Right side - Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-100 rounded-xl p-4">
              <p className="text-gray-600 text-sm font-semibold mb-1">
                <i className="fas fa-droplet text-blue-500 mr-1"></i>
                Humidity
              </p>
              <p className="text-2xl font-bold text-blue-600">{main.humidity}%</p>
            </div>
            <div className="bg-purple-100 rounded-xl p-4">
              <p className="text-gray-600 text-sm font-semibold mb-1">
                <i className="fas fa-wind text-purple-500 mr-1"></i>
                Wind Speed
              </p>
              <p className="text-2xl font-bold text-purple-600">{Math.round(data.wind.speed * 3.6)} km/h</p>
            </div>
            <div className="bg-green-100 rounded-xl p-4">
              <p className="text-gray-600 text-sm font-semibold mb-1">
                <i className="fas fa-compress text-green-500 mr-1"></i>
                Pressure
              </p>
              <p className="text-2xl font-bold text-green-600">{main.pressure} mb</p>
            </div>
            <div className="bg-orange-100 rounded-xl p-4">
              <p className="text-gray-600 text-sm font-semibold mb-1">
                <i className="fas fa-cloud text-orange-500 mr-1"></i>
                Cloudiness
              </p>
              <p className="text-2xl font-bold text-orange-600">{clouds.all}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeather
