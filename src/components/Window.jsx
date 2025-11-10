import React, { useRef, useState, useEffect } from 'react'
import './Window.css'

export default function Window({ id, title, children, left = 100, top = 100, width = 600, height = 420, maxWidth, maxHeight, auto = false, zIndex, onFocus, onMoveEnd, onClose }) {
  const winRef = useRef(null)
  const [pos, setPos] = useState({ left, top })
  const posRef = useRef({ left, top })
  const [size, setSize] = useState({ width, height })
  const sizeRef = useRef({ width, height })
  const [dragging, setDragging] = useState(false)
  const dragRef = useRef({ startX: 0, startY: 0, startLeft: 0, startTop: 0 })
  const [resizing, setResizing] = useState(false)
  const resizeRef = useRef({ startX: 0, startY: 0, startWidth: 0, startHeight: 0 })
  const [maximized, setMaximized] = useState(false)

  useEffect(() => {
    function onMove(e) {
      if (dragging) {
        const clientX = e.clientX ?? (e.touches && e.touches[0].clientX)
        const clientY = e.clientY ?? (e.touches && e.touches[0].clientY)
        const dx = clientX - dragRef.current.startX
        const dy = clientY - dragRef.current.startY
        const newPos = { left: dragRef.current.startLeft + dx, top: dragRef.current.startTop + dy }
        setPos(newPos)
        posRef.current = newPos
      } else if (resizing) {
        const clientX = e.clientX ?? (e.touches && e.touches[0].clientX)
        const clientY = e.clientY ?? (e.touches && e.touches[0].clientY)
        const dx = clientX - resizeRef.current.startX
        const dy = clientY - resizeRef.current.startY
        const newWidth = Math.max(200, resizeRef.current.startWidth + dx)
        const newHeight = Math.max(100, resizeRef.current.startHeight + dy)
        const newSize = { width: newWidth, height: newHeight }
        setSize(newSize)
        sizeRef.current = newSize
      }
    }
    function onUp() {
      setDragging(false)
      setResizing(false)
      if (typeof onMoveEnd === 'function') {
        onMoveEnd({ id, left: posRef.current.left, top: posRef.current.top, width: sizeRef.current.width, height: sizeRef.current.height })
      }
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchmove', onMove)
    window.addEventListener('touchend', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onUp)
    }
  }, [dragging, resizing, id, onMoveEnd])

  const onHeaderDown = (e) => {
    e.preventDefault()
    if (typeof onFocus === 'function') onFocus()
    setDragging(true)
    const clientX = e.clientX ?? (e.touches && e.touches[0].clientX)
    const clientY = e.clientY ?? (e.touches && e.touches[0].clientY)
    dragRef.current = { startX: clientX, startY: clientY, startLeft: pos.left, startTop: pos.top }
  }

  const onResizeHandleDown = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (typeof onFocus === 'function') onFocus()
    setResizing(true)
    const clientX = e.clientX ?? (e.touches && e.touches[0].clientX)
    const clientY = e.clientY ?? (e.touches && e.touches[0].clientY)
    resizeRef.current = {
      startX: clientX,
      startY: clientY,
      startWidth: typeof size.width === 'number' ? size.width : winRef.current?.offsetWidth || 600,
      startHeight: typeof size.height === 'number' ? size.height : winRef.current?.offsetHeight || 420
    }
  }

  const toggleMax = () => {
    setMaximized(m => !m)
  }

  // Sync incoming prop changes to internal state unless the user is dragging or maximized
  useEffect(() => {
    if (!dragging && !maximized && !resizing) {
      setPos({ left, top })
      const newSize = { width: auto || width === 'auto' ? 'auto' : width, height: auto || height === 'auto' ? 'auto' : height }
      setSize(newSize)
      posRef.current = { left, top }
      sizeRef.current = { width: typeof newSize.width === 'number' ? newSize.width : (el => el ? el.offsetWidth : 0)(winRef.current), height: typeof newSize.height === 'number' ? newSize.height : (el => el ? el.offsetHeight : 0)(winRef.current) }
    }
  }, [left, top, width, height, dragging, maximized, resizing])

  const style = maximized ? {
    left: 0,
    top: 0,
    width: '100%',
    height: '100%'
  } : (() => {
    const s = { left: pos.left, top: pos.top }
    if (zIndex) s.zIndex = zIndex
    if (size.width === 'auto') {
      s.width = 'auto'
      if (maxWidth) s.maxWidth = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth
    } else {
      s.width = typeof size.width === 'number' ? size.width : size.width
    }
    if (size.height === 'auto') {
      s.height = 'auto'
      if (maxHeight) s.maxHeight = typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight
    } else {
      s.height = typeof size.height === 'number' ? size.height : size.height
    }
    return s
  })()

  return (
    <div
      className={`window`} 
      ref={winRef}
      style={style}
      onMouseDown={() => { if (typeof onFocus === 'function') onFocus() }}
    >
      <div className="window-header" onMouseDown={onHeaderDown} onTouchStart={onHeaderDown}>
        <div className="window-title">{title}</div>
        <div className="window-controls">
          <button className="win-btn" onClick={toggleMax} aria-label="maximize">▢</button>
          <button className="win-btn close" onClick={() => onClose && onClose()} aria-label="close">✕</button>
        </div>
      </div>

      <div className="window-content" style={{ width: '100%', height: 'calc(100% - 38px)', overflow: 'auto' }}>
        {children}
      </div>

      {/* Resize handle for touch devices */}
      <div
        className="window-resize-handle"
        onMouseDown={onResizeHandleDown}
        onTouchStart={onResizeHandleDown}
        title="Drag to resize"
      />
    </div>
  )
}
