import React from 'react'
import { format } from 'date-fns'

function WeatherDetails({ data }) {
  if (!data) return null

  const { sys, visibility, main } = data
  const sunrise = new Date(sys.sunrise * 1000)
  const sunset = new Date(sys.sunset * 1000)
  const dewPoint = main.temp - ((100 - main.humidity) / 5)

  const details = [
    {
      icon: 'fas fa-sunrise',
      label: 'Sunrise',
      value: format(sunrise, 'HH:mm'),
      color: 'orange'
    },
    {
      icon: 'fas fa-sunset',
      label: 'Sunset',
      value: format(sunset, 'HH:mm'),
      color: 'red'
    },
    {
      icon: 'fas fa-eye',
      label: 'Visibility',
      value: `${(visibility / 1000).toFixed(1)} km`,
      color: 'blue'
    },
    {
      icon: 'fas fa-thermometer-half',
      label: 'Dew Point',
      value: `${Math.round(dewPoint)}°C`,
      color: 'cyan'
    },
    {
      icon: 'fas fa-tint',
      label: 'Max Temp',
      value: `${Math.round(main.temp_max)}°C`,
      color: 'red'
    },
    {
      icon: 'fas fa-snowflake',
      label: 'Min Temp',
      value: `${Math.round(main.temp_min)}°C`,
      color: 'blue'
    }
  ]

  const colorClasses = {
    orange: 'bg-orange-100 text-orange-600',
    red: 'bg-red-100 text-red-600',
    blue: 'bg-blue-100 text-blue-600',
    cyan: 'bg-cyan-100 text-cyan-600'
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      {details.map((detail, index) => (
        <div key={index} className={`glass-effect rounded-xl p-4 text-center shadow-lg`}>
          <i className={`${detail.icon} text-2xl mb-3 block ${colorClasses[detail.color]}`}></i>
          <p className="text-gray-600 text-xs font-semibold mb-2">{detail.label}</p>
          <p className="text-gray-800 font-bold text-lg">{detail.value}</p>
        </div>
      ))}
    </div>
  )
}

export default WeatherDetails
