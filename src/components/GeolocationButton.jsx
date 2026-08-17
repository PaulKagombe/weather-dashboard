import React from 'react'

function GeolocationButton({ onGeolocation, loading }) {
  return (
    <button
      onClick={onGeolocation}
      disabled={loading}
      className={`px-6 py-3 rounded-full font-semibold shadow-lg transition transform hover:scale-105 flex items-center gap-2 ${
        loading
          ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
          : 'bg-white text-blue-600 hover:bg-blue-50'
      }`}
      title="Use your current location"
    >
      <i className={`fas fa-map-pin ${ loading ? 'fa-spin' : ''}`}></i>
      {loading ? 'Detecting...' : 'My Location'}
    </button>
  )
}

export default GeolocationButton
