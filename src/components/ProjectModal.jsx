import React from 'react'
import { FaTimes } from 'react-icons/fa'
import './ProjectModal.css'

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <FaTimes />
        </button>
        
        <div className="modal-header">
          <div className="modal-icon">{project.icon}</div>
          <h2 className="modal-title">{project.title}</h2>
        </div>

        {project.period && (
          <p className="modal-period">📅 {project.period}</p>
        )}

        <div className="modal-body">
          <div className="modal-section">
            <h3 className="section-heading">Description</h3>
            <p className="modal-description">{project.fullDescription || project.description}</p>
          </div>

          {project.demoVideo && (
            <div className="modal-section">
              <h3 className="section-heading">Demo Video</h3>
              <div className="video-container">
                <iframe
                  src={project.demoVideo}
                  title={`${project.title} Demo`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          {project.screenshots && project.screenshots.length > 0 && (
            <div className="modal-section">
              <h3 className="section-heading">Screenshots</h3>
              <div className="screenshots-grid">
                {project.screenshots.map((screenshot, index) => (
                  <img
                    key={index}
                    src={screenshot}
                    alt={`${project.title} Screenshot ${index + 1}`}
                    className="screenshot"
                  />
                ))}
              </div>
            </div>
          )}

          <div className="modal-section">
            <h3 className="section-heading">Technologies Used</h3>
            <div className="technologies-list">
              {project.technologies.map((tech, index) => (
                <span key={index} className="technology-badge">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectModal

