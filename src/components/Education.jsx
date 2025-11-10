import React from 'react'
import './Education.css'

const Education = () => {
  const education = [
    {
      institution: 'ESPRIT',
      degree: 'Software Engineering',
      location: 'Ariana, Tunisia',
      period: 'Sep 2024 - Present',
      icon: '🎓',
      status: 'current'
    },
    {
      institution: 'ISTIC',
      degree: 'Bachelor in Computer Science',
      location: 'Soliman, Tunisia',
      period: 'Sep 2021 - May 2024',
      icon: '📚',
      status: 'completed'
    },
    {
      institution: 'High School of Borj Cedria',
      degree: 'Baccalaureate in Computer Science',
      location: 'Borj Cedria, Tunisia',
      period: 'Sep 2018 - Jan 2021',
      icon: '🏫',
      status: 'completed'
    }
  ]

  return (
    <section id="education" className="education-section">
      <h2 className="section-title">Education Journey</h2>
      <div className="education-timeline">
        {education.map((edu, index) => (
          <div key={index} className={`education-card ${edu.status}`}>
            <div className="education-icon">{edu.icon}</div>
            <div className="education-content">
              <h3 className="education-institution">{edu.institution}</h3>
              <h4 className="education-degree">{edu.degree}</h4>
              <p className="education-location">📍 {edu.location}</p>
              <span className="education-period">{edu.period}</span>
              {edu.status === 'current' && (
                <span className="current-badge">In Progress</span>
              )}
            </div>
            {index < education.length - 1 && <div className="timeline-connector"></div>}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Education

