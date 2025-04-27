
// src/context/DarkModeContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'

const DarkModeContext = createContext()

export function DarkModeProvider({ children }) {
  const [darkmode, setDarkmode] = useState(false)

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true'
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDarkmode(savedMode || (!('darkMode' in localStorage) && systemPrefersDark))
  }, [])

  useEffect(() => {
    if (darkmode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('darkMode', 'true')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('darkMode', 'false')
    }
  }, [darkmode])

  const toggleDarkmode = () => setDarkmode(!darkmode)

  return (
    <DarkModeContext.Provider value={{ darkmode, toggleDarkmode }}>
      {children}
    </DarkModeContext.Provider>
  )
}

export const useDarkMode = () => useContext(DarkModeContext)
