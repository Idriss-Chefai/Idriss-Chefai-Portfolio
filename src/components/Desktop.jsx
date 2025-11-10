import React, { useState, useCallback, useRef, useEffect } from 'react'
import './Desktop.css'
import Window from './Window'
import Header from './Header'
import Skills from './Skills'
import Experience from './Experience'
import Projects from './Projects'
import Education from './Education'
import Contact from './Contact'

let idCounter = 1

const ICONS = [
  { key: 'projects', title: 'Projects', icon: '📁' },
  { key: 'skills', title: 'Skills', icon: '🛠️' },
  { key: 'experience', title: 'Experience', icon: '💼' },
  { key: 'education', title: 'Education', icon: '🎓' },
  { key: 'contact', title: 'Contact', icon: '✉️' }
]

export default function Desktop({ onOpenProject }) {
  const [windows, setWindows] = useState([])
  const rootRef = useRef(null)
  const [zCounter, setZCounter] = useState(1)

  // Previously we auto-tiled on resize. To allow free dragging/resizing
  // and overlapping windows, we no longer auto-re-tile on window resize.

  const SIZE_MAP = {
    about: { width: 520, height: 360 },
    projects: { width: 940, height: 540 },
    skills: { width: 640, height: 420 },
    experience: { width: 760, height: 480 },
    education: { width: 640, height: 420 },
    contact: { width: 520, height: 360 }
  }

  const createGamingLoader = () => {
    const el = document.createElement('div')
    el.className = 'desktop-gaming-loader'
    document.body.appendChild(el)

    const onMove = (e) => {
      const x = e.clientX ?? (e.touches && e.touches[0] && e.touches[0].clientX) ?? 0
      const y = e.clientY ?? (e.touches && e.touches[0] && e.touches[0].clientY) ?? 0
      el.style.transform = `translate(${x + 16}px, ${y + 16}px)`
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onMove)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onMove)
      if (el.parentElement) el.parentElement.removeChild(el)
    }
  }

  // Recalculate a tiled layout for all windows so they dock like a tiling manager.
  // Flow layout: place windows left-to-right and wrap to next row when needed.
  const tileAllWindows = (wins) => {
    const rect = rootRef.current?.getBoundingClientRect()
    const containerWidth = rect ? rect.width : window.innerWidth
    const containerHeight = rect ? rect.height : window.innerHeight
    const ICONS_AREA_WIDTH = containerWidth < 768 ? 0 : 160
    const PADDING = 20

    let availableWidth = Math.max(containerWidth - ICONS_AREA_WIDTH - PADDING * 2, 280)
    let availableHeight = Math.max(containerHeight - PADDING * 2, 200)
    let areaLeft = ICONS_AREA_WIDTH + PADDING
    let areaTop = PADDING

    try {
      const headerEl = rootRef.current?.querySelector('#header') || rootRef.current?.querySelector('.header')
      if (headerEl) {
        const hRect = headerEl.getBoundingClientRect()
        const rootRect = rect || { left: 0, top: 0 }
        areaLeft = Math.max(ICONS_AREA_WIDTH + PADDING, Math.floor(hRect.left - rootRect.left))
        areaTop = Math.max(PADDING, Math.floor(hRect.top - rootRect.top))
        availableWidth = Math.max(200, Math.floor(hRect.width))
        availableHeight = Math.max(150, Math.floor(hRect.height))
      }
    } catch (e) {
      // fallback
    }

    const N = wins.length
    if (N === 0) return []

    // Mobile: simple vertical stack
    if (containerWidth < 768) {
      const result = []
      const heightPer = Math.floor((availableHeight - (N + 1) * PADDING) / Math.max(1, N))
      let top = areaTop
      for (let i = 0; i < N; i++) {
        const win = wins[i]
        const pref = SIZE_MAP[win.key] || { width: availableWidth, height: heightPer }
        const w = Math.min(pref.width || availableWidth, availableWidth)
        const h = Math.max(120, heightPer)
        result.push({ ...win, left: areaLeft, top, width: w, height: h })
        top += h + PADDING
      }
      return result
    }

    // Desktop flow layout
    const placed = []
    let cursorX = areaLeft
    let cursorY = areaTop
    let rowHeight = 0

    for (let i = 0; i < N; i++) {
      const win = { ...wins[i] }
      const pref = SIZE_MAP[win.key] || { width: Math.min(420, availableWidth), height: Math.min(320, availableHeight) }
      const prefW = win.width || pref.width
      const prefH = win.height || pref.height
      const w = Math.min(prefW, availableWidth)
      const h = Math.min(prefH, availableHeight)

      if (cursorX + Math.max(240, w) > areaLeft + availableWidth) {
        cursorX = areaLeft
        cursorY += rowHeight + PADDING
        rowHeight = 0
      }

      if (win.auto) {
        // auto-sized: set width/height to 'auto' and provide max constraints
        placed.push({ ...win, left: cursorX, top: cursorY, width: 'auto', height: 'auto', maxWidth: Math.min(w, availableWidth), maxHeight: Math.min(h, availableHeight) })
        const assumed = Math.max(160, prefH)
        rowHeight = Math.max(rowHeight, assumed)
        cursorX += Math.max(240, Math.min(w, availableWidth)) + PADDING
      } else {
        placed.push({ ...win, left: cursorX, top: cursorY, width: Math.max(240, w), height: Math.max(140, h), maxWidth: Math.min(w, availableWidth), maxHeight: Math.min(h, availableHeight) })
        rowHeight = Math.max(rowHeight, Math.max(140, h))
        cursorX += Math.max(240, w) + PADDING
      }
    }

    return placed
  }

  // helper used in effect above; define after tileAllWindows in scope

  const openWindow = useCallback((key) => {
    const removeLoader = createGamingLoader()
    setTimeout(() => {
      removeLoader()
      const pref = SIZE_MAP[key] || { width: 600, height: 420 }
      // compute a centered starting position over the header area (fallback to center of desktop)
      const rootRect = rootRef.current?.getBoundingClientRect() || { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight }
      let areaLeft = 0, areaTop = 0, areaW = rootRect.width, areaH = rootRect.height
      try {
        const headerEl = rootRef.current?.querySelector('#header') || rootRef.current?.querySelector('.header')
        if (headerEl) {
          const hRect = headerEl.getBoundingClientRect()
          areaLeft = Math.floor(hRect.left - rootRect.left)
          areaTop = Math.floor(hRect.top - rootRect.top)
          areaW = hRect.width
          areaH = hRect.height
        }
      } catch (e) {}

      const w = Math.min(pref.width, Math.floor(areaW * 0.7))
      const h = Math.min(pref.height, Math.floor(areaH * 0.7))
      const left = Math.floor(areaLeft + Math.max(0, (areaW - w) / 2))
      const top = Math.floor(areaTop + Math.max(0, (areaH - h) / 2))

      const newZ = zCounter + 1
      const newWin = {
        id: idCounter++,
        key,
        title: ICONS.find(i => i.key === key)?.title || key,
        left,
        top,
        width: w,
        height: h,
        z: newZ,
        auto: false
      }

      setZCounter(newZ)
      setWindows(prev => [...prev, newWin])
    }, 520)
  }, [zCounter])

  const closeWindow = useCallback((id) => {
    setWindows(w => w.filter(x => x.id !== id))
  }, [])

  const bringToFront = useCallback((id) => {
    setZCounter(z => {
      const nextZ = z + 1
      setWindows(ws => ws.map(w => w.id === id ? { ...w, z: nextZ } : w))
      return nextZ
    })
  }, [])

  const updateWindow = useCallback((updated) => {
    // updated: { id, left, top, width, height }
    setWindows(ws => ws.map(w => w.id === updated.id ? { ...w, left: updated.left, top: updated.top, width: updated.width, height: updated.height } : w))
  }, [])

  const renderWindowContent = (key, props) => {
    // Map keys to components, pass the onProjectClick handler down
    switch (key) {
      case 'projects':
        return <Projects onProjectClick={props.onOpenProject} />
      case 'skills':
        return <Skills />
      case 'experience':
        return <Experience />
      case 'education':
        return <Education />
      case 'contact':
        return <Contact />
      default:
        return <div style={{ padding: 16 }}>Unknown: {key}</div>
    }
  }

  return (
    <div className="desktop-root" ref={rootRef}>
      {/* Header/About as background */}
      <div className="desktop-background">
        <Header />
      </div>

      {/* Icons layer */}
      <div className="desktop-icons">
        {ICONS.map(icon => (
            <div
              key={icon.key}
              className="desktop-icon"
              onClick={() => openWindow(icon.key)}
              title={`Click to open ${icon.title}`}
            >
              <div className="desktop-icon-emoji">{icon.icon}</div>
              <div className="desktop-icon-title">{icon.title}</div>
            </div>
          ))}
      </div>

      {/* Render windows */}
      {windows.map(w => (
        <Window
          key={w.id}
          id={w.id}
          title={w.title}
          left={w.left}
          top={w.top}
          width={w.width}
          height={w.height}
          maxWidth={w.maxWidth}
          maxHeight={w.maxHeight}
          auto={w.auto}
          zIndex={w.z}
          onFocus={() => bringToFront(w.id)}
          onMoveEnd={updateWindow}
          onClose={() => closeWindow(w.id)}
          onOpenProject={onOpenProject}
        >
          {renderWindowContent(w.key, { onOpenProject })}
        </Window>
      ))}
    </div>
  )
}
