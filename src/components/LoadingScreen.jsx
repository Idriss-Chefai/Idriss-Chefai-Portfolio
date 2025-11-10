import React, { useEffect, useState } from 'react'
import './LoadingScreen.css'

export default function LoadingScreen({ onLoadComplete }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Show loading screen for 3 seconds, then fade out
    const timer = setTimeout(() => {
      setIsVisible(false)
      // Call onLoadComplete after fade-out animation completes (~0.8s)
      setTimeout(() => {
        onLoadComplete()
      }, 800)
    }, 3000)

    return () => clearTimeout(timer)
  }, [onLoadComplete])

  if (!isVisible) return null

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-title">
          <span className="loading-welcome">Welcome to</span>
          <h1 className="loading-name">Idriss Chefai</h1>
          <span className="loading-subtitle">Portfolio</span>
        </div>
        
        <div className="loading-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-dot"></div>
        </div>

        <div className="loading-text">Initializing desktop environment...</div>
      </div>
    </div>
  )
}
