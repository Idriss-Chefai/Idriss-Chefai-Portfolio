import React, { useState } from 'react'
import './Skills.css'

const Skills = () => {
  const [expandedCategory, setExpandedCategory] = useState(null)

  const skillCategories = [
    {
      title: 'Languages',
      icon: '💻',
      skills: [
        { name: 'Python', level: 85 },
        { name: 'C', level: 75 },
        { name: 'Java', level: 90 },
        { name: 'C#', level: 80 },
        { name: 'C++', level: 70 },
        { name: 'JavaScript', level: 88 },
        { name: 'TypeScript', level: 85 }
      ],
      color: 'var(--primary)'
    },
    {
      title: 'Game Development',
      icon: '🎮',
      skills: [
        { name: 'Unity', level: 85 },
        { name: 'Blender', level: 75 },
        { name: 'C#', level: 80 },
        { name: 'Java', level: 90 }
      ],
      color: 'var(--game-dev)'
    },
    {
      title: 'Blockchain',
      icon: '⛓️',
      skills: [
        { name: 'Blockchain', level: 70 },
        { name: 'Solidity', level: 75 }
      ],
      color: 'var(--blockchain)'
    },
    {
      title: 'Web Technologies',
      icon: '🌐',
      skills: [
        { name: 'HTML5', level: 95 },
        { name: 'CSS', level: 90 },
        { name: 'JavaScript/TypeScript', level: 88 },
        { name: 'Bootstrap', level: 85 },
        { name: 'ReactJS', level: 90 },
        { name: 'AngularJS', level: 80 }
      ],
      color: 'var(--secondary)'
    },
    {
      title: 'Frameworks',
      icon: '⚙️',
      skills: [
        { name: 'ReactJS', level: 90 },
        { name: 'AngularJS', level: 80 },
        { name: 'Java EE', level: 85 },
        { name: 'Spring Boot', level: 82 },
        { name: 'Node.js', level: 88 },
        { name: 'Flask', level: 80 },
        { name: 'Flutter', level: 75 },
        { name: 'Symfony', level: 78 },
        { name: '.NET', level: 80 }
      ],
      color: 'var(--accent)'
    },
    {
      title: 'Databases',
      icon: '🗄️',
      skills: [
        { name: 'SQL', level: 88 },
        { name: 'PostgreSQL', level: 85 },
        { name: 'MongoDB', level: 82 },
        { name: 'MySQL', level: 90 },
        { name: 'Data Warehouse', level: 75 }
      ],
      color: 'var(--success)'
    },
    {
      title: 'AI/ML Libraries',
      icon: '🤖',
      skills: [
        { name: 'Pandas', level: 85 },
        { name: 'NumPy', level: 80 },
        { name: 'TensorFlow', level: 75 },
        { name: 'PyTorch', level: 70 },
        { name: 'scikit-learn', level: 82 },
        { name: 'Keras', level: 75 }
      ],
      color: 'var(--warning)'
    },
    {
      title: 'Tools',
      icon: '🛠️',
      skills: [
        { name: 'Git', level: 90 },
        { name: 'VS Code', level: 95 },
        { name: 'IntelliJ', level: 88 },
        { name: 'Vim/Neovim', level: 75 }
      ],
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
                {category.skills.map((skill, skillIndex) => {
                  const skillName = typeof skill === 'string' ? skill : skill.name
                  const skillLevel = typeof skill === 'object' ? skill.level : 75
                  return (
                    <div 
                      key={skillIndex} 
                      className="skill-item"
                      style={{ animationDelay: `${skillIndex * 0.05}s` }}
                    >
                      <div className="skill-header">
                        <span className="skill-name">{skillName}</span>
                        <span className="skill-percentage">{skillLevel}%</span>
                      </div>
                      <div className="skill-progress-bar">
                        <div 
                          className="skill-progress-fill"
                          style={{ 
                            width: `${skillLevel}%`,
                            '--category-color': category.color
                          }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
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


