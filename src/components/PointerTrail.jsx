import React, { useEffect, useRef } from 'react'
import './PointerTrail.css'

export default function PointerTrail() {
  const trailContainerRef = useRef(null)
  const particlesRef = useRef([])

  useEffect(() => {
    const colors = ['#22c55e', '#00ff88', '#00ffff', '#0088ff']
    let colorIndex = 0

    const handleMouseMove = (e) => {
      const x = e.clientX
      const y = e.clientY

      // Create trail particle with neon glow
      const particle = document.createElement('div')
      particle.className = 'trail-particle'
      particle.style.left = x + 'px'
      particle.style.top = y + 'px'
      particle.style.borderColor = colors[colorIndex % colors.length]
      colorIndex++

      if (trailContainerRef.current) {
        trailContainerRef.current.appendChild(particle)
      }

      // Remove particle after animation
      setTimeout(() => {
        particle.remove()
      }, 600)

      // Check if hovering over a shortcut
      const target = document.elementFromPoint(x, y)
      const isShortcut = target?.closest('.desktop-icon')

      if (isShortcut) {
        document.body.style.cursor = 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGV4dCB4PSI0IiB5PSIyNCIgZm9udC1zaXplPSIyNCI+🎮</dGV4dD48L3N2Zz4=") 0 0, auto'
      } else {
        document.body.style.cursor = 'auto'
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.body.style.cursor = 'auto'
    }
  }, [])

  return <div className="trail-container" ref={trailContainerRef}></div>
}
