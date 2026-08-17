import React from 'react'
import { useTheme } from '../context/ThemeContext'

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
        isDark
          ? 'bg-gray-700 hover:bg-gray-600 text-yellow-300'
          : 'bg-white/20 hover:bg-white/30 text-white'
      }`}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label="Toggle theme"
    >
      <i className={`fas fa-${isDark ? 'sun' : 'moon'} text-xl`}></i>
    </button>
  )
}

export default ThemeToggle
