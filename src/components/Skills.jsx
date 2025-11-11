import React, { useState } from 'react'
import './Skills.css'

const Skills = () => {
  const [expandedCategory, setExpandedCategory] = useState(null)

  const skillCategories = [
    {
      title: 'Languages',
      icon: '💻',
      skills: ['Python', 'C', 'Java', 'C#', 'C++', 'JavaScript', 'TypeScript'],
      color: 'var(--primary)'
    },
    {
      title: 'Game Development',
      icon: '🎮',
      skills: ['Unity', 'Blender', 'C#', 'Java'],
      color: 'var(--game-dev)'
    },
    {
      title: 'Blockchain',
      icon: '⛓️',
      skills: ['Blockchain', 'Solidity'],
      color: 'var(--blockchain)'
    },
    {
      title: 'Web Technologies',
      icon: '🌐',
      skills: ['HTML5', 'CSS', 'JavaScript/TypeScript', 'Bootstrap', 'ReactJS', 'AngularJS'],
      color: 'var(--secondary)'
    },
    {
      title: 'Frameworks',
      icon: '⚙️',
      skills: ['ReactJS', 'AngularJS', 'Java EE', 'Spring Boot', 'Node.js', 'Flask', 'Flutter', 'Symfony', '.NET'],
      color: 'var(--accent)'
    },
    {
      title: 'Databases',
      icon: '🗄️',
      skills: ['SQL', 'PostgreSQL', 'MongoDB', 'MySQL', 'Data Warehouse'],
      color: 'var(--success)'
    },
    {
      title: 'AI/ML Libraries',
      icon: '🤖',
      skills: ['Pandas', 'NumPy', 'TensorFlow', 'PyTorch', 'scikit-learn', 'Keras'],
      color: 'var(--warning)'
    },
    {
      title: 'Tools',
      icon: '🛠️',
      skills: ['Git', 'VS Code', 'IntelliJ', 'Vim/Neovim'],
      color: 'var(--danger)'
    }
  ]

  const toggleCategory = (index) => {
    setExpandedCategory(expandedCategory === index ? null : index)
  }

  return (
    <section id="skills" className="skills-section">
      <h2 className="section-title">Technical Arsenal</h2>
      <div className="skills-grid">
        {skillCategories.map((category, index) => (
          <div 
            key={index} 
            className={`skill-category ${expandedCategory === index ? 'expanded' : 'collapsed'}`}
            style={{ '--category-color': category.color }}
            onClick={() => toggleCategory(index)}
          >
            <div className="category-header">
              <span className="category-icon">{category.icon}</span>
              <h3 className="category-title">{category.title}</h3>
              <span className="expand-toggle">{expandedCategory === index ? '▼' : '▶'}</span>
            </div>
            
            {expandedCategory === index && (
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <div 
                    key={skillIndex} 
                    className="skill-item"
                    style={{ animationDelay: `${skillIndex * 0.05}s` }}
                  >
                    <span className="skill-name">{skill}</span>
                  </div>
                ))}
              </div>
            )}

            {expandedCategory !== index && (
              <div className="skills-preview">
                <div className="skill-badges">
                  {category.skills.slice(0, 3).map((skill, idx) => (
                    <span key={idx} className="skill-badge">{typeof skill === 'string' ? skill : skill.name}</span>
                  ))}
                  {category.skills.length > 3 && (
                    <span className="skill-badge more">+{category.skills.length - 3}</span>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills


