import React from 'react'
import './Experience.css'

const Experience = () => {
  const experiences = [
    {
      title: 'Software Engineering Intern',
      company: 'STEG (Tunisian Electricity & Gas Company)',
      location: 'Tunis, Tunisia',
      period: 'Jul 2025 - Sep 2025',
      description: 'Digitized internal workflows using Jotform (built dynamic forms, conditional logic, approval flows), integrated form data with SQL services, and added custom JavaScript widgets.',
      technologies: ['Jotform', 'SQL', 'JavaScript'],
      icon: '⚡'
    },
    {
      title: 'Software Engineering Intern',
      company: 'Elite Council Consulting',
      location: 'Tunis, Tunisia',
      period: 'Oct 2024 - Dec 2024',
      description: 'Developed "Dia-track," a React Native app for diabetes tracking. Built management features for doctors, appointments, and patient profiles.',
      technologies: ['React Native', 'Node.js', 'Express', 'MySQL'],
      icon: '🏥'
    },
    {
      title: 'Data Science Intern',
      company: 'NA Soft',
      location: 'Centre Urbain Nord, Tunisia',
      period: 'Feb 2024 - May 2024',
      description: 'Performed stock market analysis and created a Python ML model. Deployed the model with an Angular frontend and Flask backend.',
      technologies: ['Python', 'scikit-learn', 'TensorFlow', 'Angular', 'Flask'],
      icon: '📊'
    },
    {
      title: 'Software Engineering Intern',
      company: 'CERTE',
      location: 'Soliman, Tunisia',
      period: 'Jun 2023 - Sep 2023',
      description: 'Developed equipment management software in Java with MySQL. Designed database schema and optimized data storage.',
      technologies: ['Java', 'MySQL', 'Git'],
      icon: '🔧'
    }
  ]

  return (
    <section id="experience" className="experience-section">
      <h2 className="section-title">Experience Quest</h2>
      <div className="experience-timeline">
        {experiences.map((exp, index) => (
          <div key={index} className="experience-card">
            <div className="experience-icon">{exp.icon}</div>
            <div className="experience-content">
              <div className="experience-header">
                <h3 className="experience-title">{exp.title}</h3>
                <span className="experience-period">{exp.period}</span>
              </div>
              <h4 className="experience-company">{exp.company}</h4>
              <p className="experience-location">📍 {exp.location}</p>
              <p className="experience-description">{exp.description}</p>
              <div className="experience-tech">
                {exp.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="tech-badge">{tech}</span>
                ))}
              </div>
            </div>
            {index < experiences.length - 1 && <div className="timeline-connector"></div>}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Experience

