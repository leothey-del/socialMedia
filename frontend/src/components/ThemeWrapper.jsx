import { useDarkMode } from '../context/DarkModeContext'

export default function ThemeWrapper({ children }) {
  const { darkmode } = useDarkMode()
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkmode 
        ? 'bg-gray-900 text-gray-100' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      {children}
    </div>
  )
}