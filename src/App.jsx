import React, { useState } from 'react'
import Particles from './components/Particles'
import PointerTrail from './components/PointerTrail'
import Desktop from './components/Desktop'
import ProjectModal from './components/ProjectModal'
import LoadingScreen from './components/LoadingScreen'
import './App.css'

function App() {
  // selectedProject state is kept here so the existing ProjectModal works
  const [selectedProject, setSelectedProject] = useState(null)
  const [showLoading, setShowLoading] = useState(true)

  return (
    <div className="app">
      {showLoading && <LoadingScreen onLoadComplete={() => setShowLoading(false)} />}
      
      <PointerTrail />
      <Particles />
      <div className="background-effects">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      {/* Desktop-style UI: icons and draggable windows */}
      <Desktop onOpenProject={setSelectedProject} />

      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  )
}

export default App