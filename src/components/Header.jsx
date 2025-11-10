import React from 'react'
import { FaGithub, FaLinkedin, FaYoutube, FaInstagram } from 'react-icons/fa'
import './Header.css'

const Header = () => {
  const socialLinks = [
    { icon: FaGithub, url: 'https://github.com/Idriss-Chefai', label: 'GitHub' },
    { icon: FaLinkedin, url: 'https://www.linkedin.com/in/idriss-chefai/', label: 'LinkedIn' },
    { icon: FaYoutube, url: 'https://youtube.com', label: 'YouTube' },
    { icon: FaInstagram, url: 'https://www.instagram.com/_idriss_c_/', label: 'Instagram' },
  ]

  return (
    <header id="header" className="header">
      {/* widgets: moved outside the centered container so they sit on the right edge */}
      <div className="stats-widgets">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🎮</div>
            <div className="stat-content">
              <div className="stat-value">2+</div>
              <div className="stat-label">Game Projects</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💻</div>
            <div className="stat-content">
              <div className="stat-value">6+</div>
              <div className="stat-label">Web Projects</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-content">
              <div className="stat-value">3+</div>
              <div className="stat-label">Years Experience</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⚡</div>
            <div className="stat-content">
              <div className="stat-value">20+</div>
              <div className="stat-label">Technologies</div>
            </div>
          </div>
        </div>

        {/* link widgets removed per user request; social links remain in the profile area */}
      </div>
      <div className="header-container">
        <div className="welcome-text">Welcome to</div>
        
        <div className="profile-section">
          <div className="profile-image-wrapper">
            <div className="profile-glow"></div>
            <img 
              src="/professional img.jpeg" 
              alt="Idriss Chefai" 
              className="profile-image"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
            <div className="profile-placeholder" style={{ display: 'none' }}>
              <span>IC</span>
            </div>
          </div>
          
          <h1 className="name">
            <span className="name-text">Idriss Chefai</span>
            <span className="name-glow"></span>
          </h1>
          
          <div className="title">
            <span className="title-icon">🎮</span>
            <span>Game Developer & Software Engineer</span>
            <span className="title-icon">💻</span>
          </div>
          
          <p className="description">
            I build immersive games and scalable applications. From interactive gameplay mechanics to robust backends—I turn concepts into working products.
          </p>
          
          
          
          <div className="social-links">
            {socialLinks.map((link, index) => {
              const Icon = link.icon
              return (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={link.label}
                >
                  <Icon className="social-icon" />
                  <span className="social-label">{link.label}</span>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

