import React from 'react'
import { getAlertBadge } from '../services/alertService'

function WeatherAlerts({ alerts, onDismiss }) {
  if (!alerts || alerts.length === 0) return null

  const alertColorMap = {
    red: 'bg-red-50 border-l-4 border-red-500 text-red-800',
    orange: 'bg-orange-50 border-l-4 border-orange-500 text-orange-800',
    yellow: 'bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800'
  }

  return (
    <div className="mb-8 space-y-3">
      <div className="flex items-center gap-2 text-white mb-4">
        <i className="fas fa-exclamation-triangle text-yellow-300 text-xl"></i>
        <h3 className="text-lg font-bold">Weather Alerts ({alerts.length})</h3>
      </div>

      {alerts.map((alert, index) => (
        <div
          key={index}
          className={`${alertColorMap[alert.color]} p-4 rounded-lg shadow-md flex items-start justify-between gap-4 animate-pulse`}
        >
          <div className="flex items-start gap-3 flex-1">
            <div className="flex-shrink-0">
              <i className={`${alert.icon} text-2xl`}></i>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-bold text-sm">{getAlertBadge(alert.severity)}</p>
                <p className="font-semibold">{alert.type}</p>
              </div>
              <p className="text-sm opacity-90">{alert.message}</p>
            </div>
          </div>
          <button
            onClick={() => onDismiss(index)}
            className="flex-shrink-0 text-lg opacity-60 hover:opacity-100 transition"
            title="Dismiss alert"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}

export default WeatherAlerts
