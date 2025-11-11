import React, { useState } from 'react'
import './Projects.css'

const Projects = ({ onProjectClick }) => {
  const [activeCategory, setActiveCategory] = useState('all')

  const projects = [
    {
      id: 1,
      title: '2D Puzzle Adventure Game',
      category: 'gamedev',
      description: 'Created a multi-level 2D puzzle game with interactive gameplay and smooth animations. Features include challenging puzzles, character movement, and engaging game mechanics.',
      fullDescription: 'A comprehensive 2D puzzle adventure game built with Java and JavaFX. The game features multiple levels with increasing difficulty, smooth character animations, interactive puzzle mechanics, and an engaging storyline. Players navigate through various challenges, solving puzzles to progress through the game world.',
      technologies: ['Java', 'JavaFX', 'Maven'],
      demoVideo: null, // If you have a Google Drive share link put it here (will be auto-converted to preview)
      screenshots: [
        '/assets/projects/2d-puzzle-1.png',
        '/assets/projects/2d-puzzle-2.png'
      ],
      icon: '🎮'
    },
    {
      id: 2,
      title: 'Camping & Outdoor Adventures Platform',
      category: 'web',
      description: 'Collaborated on a platform with two backends (Java and Symfony) sharing one MySQL database. Features included campsite discovery, reservations, reviews, a gear store, social features, and gamification.',
      fullDescription: 'A full-stack platform for camping and outdoor adventures. This collaborative project features a unique dual-backend architecture using Java and Symfony, both connected to a shared MySQL database. The platform includes campsite discovery and booking, user reviews, an integrated gear store, social networking features, and gamification elements to enhance user engagement.',
      technologies: ['JavaFX', 'Java', 'Symfony', 'MySQL'],
      demoVideo: null,
      screenshots: ['/assets/projects/camping-1.png', '/assets/projects/camping-2.png'],
      icon: '🏕️',
      period: 'Feb 2025 - Mar 2025'
    },
    {
      id: 3,
      title: 'E-Commerce Website',
      category: 'web',
      description: 'Built an electronics e-commerce site with JWT-based user authentication, product catalog, shopping cart, and secure payment integration.',
      fullDescription: 'A complete e-commerce solution for electronics built with the MERN stack. Features include user authentication using JWT tokens, product catalog with search and filtering, shopping cart functionality, secure checkout process, order management, and admin dashboard for product and order management.',
      technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT'],
      demoVideo: null,
      screenshots: ['/assets/projects/ecomm-1.png', '/assets/projects/ecomm-2.png'],
      icon: '🛒',
      period: 'Aug 2023 - Sep 2023'
    },
    {
      id: 4,
      title: 'Dia-track - Diabetes Tracking App',
      category: 'mobile',
      description: 'A React Native mobile application for diabetes tracking with management features for doctors, appointments, and patient profiles.',
      fullDescription: 'Dia-track is a comprehensive mobile application developed with React Native for diabetes management. The app allows patients to track their blood sugar levels, medications, and meals. It includes features for doctors to manage patient profiles, schedule appointments, and monitor patient progress. Built with a Node.js/Express backend and MySQL database.',
      technologies: ['React Native', 'Node.js', 'Express', 'MySQL'],
      demoVideo: null,
      screenshots: ['/assets/projects/dia-track-1.png', '/assets/projects/dia-track-2.png'],
      icon: '📱'
    },
    {
      id: 5,
      title: 'Stock Market Analysis ML Model',
      category: 'ai',
      description: 'A Python machine learning model for stock market analysis with deployment using Angular frontend and Flask backend.',
      fullDescription: 'A comprehensive data science project involving stock market analysis using Python. The project includes data collection, preprocessing, feature engineering, and model training using scikit-learn and TensorFlow. The trained model was deployed with a user-friendly Angular frontend and Flask REST API backend, allowing users to input stock data and receive predictions.',
      technologies: ['Python', 'scikit-learn', 'TensorFlow', 'Angular', 'Flask', 'Pandas', 'NumPy'],
      demoVideo: null,
      screenshots: ['/assets/projects/stock-1.png', '/assets/projects/stock-2.png'],
      icon: '🤖'
    },
    {
      id: 6,
      title: 'Gestion Maintenance - Asset Management System',
      category: 'software',
      description: 'A comprehensive maintenance and asset management software built with Java. Manage equipment, track maintenance schedules, generate reports, and optimize operational efficiency.',
      fullDescription: 'Gestion Maintenance is a full-featured asset and maintenance management software application built with Java. The system allows organizations to efficiently manage equipment inventory, track maintenance schedules and history, generate comprehensive reports, manage work orders, and optimize maintenance operations. Features include real-time status monitoring, preventive maintenance planning, failure tracking, and performance analytics. The application uses a relational database for robust data management and provides an intuitive user interface for administrators and technicians.',
      technologies: ['Java', 'Swing/JavaFX', 'MySQL', 'JDBC', 'Maven'],
      demoVideo: null,
      screenshots: ['/assets/projects/gestion-1.png', '/assets/projects/gestion-2.png'],
      icon: '🔧',
      period: 'School Project'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Projects', icon: '🌟' },
    { id: 'gamedev', name: 'Game Dev', icon: '🎮' },
    { id: 'web', name: 'Web', icon: '🌐' },
    { id: 'mobile', name: 'Mobile', icon: '📱' },
    { id: 'ai', name: 'AI', icon: '🤖' },
    { id: 'software', name: 'Software', icon: '🔧' },
    { id: '3d', name: '3D', icon: '🎨' }
  ]

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeCategory)

  return (
    <section id="projects" className="projects-section">
      <h2 className="section-title">Project Showcase</h2>
      
      <div className="category-filters">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-filter ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            <span className="filter-icon">{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {filteredProjects.map(project => (
          <div
            key={project.id}
            className="project-card"
            onClick={() => onProjectClick(project)}
          >
            <div className="project-icon">{project.icon}</div>
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            <div className="project-tech-preview">
              {project.technologies.slice(0, 3).map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
              {project.technologies.length > 3 && (
                <span className="tech-tag">+{project.technologies.length - 3}</span>
              )}
            </div>
            <div className="project-hover-effect">
              <span>View Details →</span>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="no-projects">
          <p>No projects in this category yet. Check back soon! 🚀</p>
        </div>
      )}
    </section>
  )
}

export default Projects

