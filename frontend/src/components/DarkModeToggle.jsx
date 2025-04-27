// src/components/DarkModeToggle.jsx
import { useDarkMode } from '../context/DarkModeContext'

export default function DarkModeToggle() {
  const { darkmode, toggleDarkmode } = useDarkMode()
  
  return (
    <button
      onClick={toggleDarkmode}
      className="p-2 rounded-full transition-colors"
      aria-label={darkmode ? 'Light mode' : 'Dark mode'}
    >
      {darkmode ? '☀️' : '🌙'}
    </button>
  )
}