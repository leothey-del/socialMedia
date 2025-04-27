import React from 'react'

export const Footer = () => {
  return (
    <footer className="w-full py-6 bg-gray-800 text-white text-center mt-8">
      <p className="text-sm">&copy; {new Date().getFullYear()} [Your Name]. All rights reserved.</p>
      <div className="flex justify-center space-x-4 mt-2">
        <a href="#" className="hover:underline">LinkedIn</a>
        <a href="#" className="hover:underline">GitHub</a>
        <a href="#" className="hover:underline">Twitter</a>
      </div>
    </footer>
  )
}
