import React, { useState } from 'react'
import Navigation from './components/Navigation'
import Particles from './components/Particles'
import Header from './components/Header'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'
import ProjectModal from './components/ProjectModal'
import './App.css'

function App() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <div className="app">
      <Navigation />
      <Particles />
      <div className="background-effects">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
      
      <Header />
      <Skills />
      <Experience />
      <Projects onProjectClick={setSelectedProject} />
      <Education />
      <Contact />
      
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

