import React, { useState, useRef, useEffect } from 'react'
import './Terminal.css'

const Terminal = () => {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([
    { type: 'system', text: 'Welcome to Idriss AI Terminal v1.0' },
    { type: 'system', text: 'Type "help" to see available commands' },
    { type: 'system', text: '' }
  ])
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const terminalRef = useRef(null)

  const responses = {
    help: {
      type: 'response',
      text: `Available commands:
  > skills        - View my technical skills
  > projects      - See my recent projects
  > gamedev       - Learn about my game development experience
  > contact       - Get contact information
  > resume        - Download my resume
  > about         - About me
  > clear         - Clear terminal
  > exit          - Close terminal`
    },
    skills: {
      type: 'response',
      text: `Technical Arsenal:
  Languages: Python, Java, C, C#, C++, JavaScript, TypeScript
  Game Dev: Unity, Blender, JavaFX
  Web: React, Angular, Node.js, Express, Flask, Spring Boot
  Databases: MySQL, PostgreSQL, MongoDB
  AI/ML: TensorFlow, PyTorch, scikit-learn, Pandas
  Tools: Git, VS Code, IntelliJ, Vim
  
  → Type "projects" to see what I built with these!`
    },
    projects: {
      type: 'response',
      text: `Recent Projects:
  🎮 2D Puzzle Adventure Game - Java, JavaFX
  🏕️ Camping Platform - Java, Symfony, MySQL (Dual Backend!)
  🛒 E-Commerce Site - MERN Stack
  📱 Dia-track - React Native Diabetes App
  🤖 Stock Market ML Model - Python, TensorFlow, Angular
  🔧 Gestion Maintenance - Java Asset Management System
  
  → Type "gamedev" for more details!`
    },
    gamedev: {
      type: 'response',
      text: `Game Development Experience:
  → Built a 2D Puzzle Adventure Game with engaging mechanics
  → Created interactive gameplay with smooth animations
  → Designed level progression and puzzle difficulty curves
  → Used Unity and JavaFX for game development
  → Passionate about creating immersive gaming experiences
  
  Currently exploring: 3D game development, Blender modeling
  Next Goal: Create a 3D multiplayer game`
    },
    contact: {
      type: 'response',
      text: `Contact Information:
  📧 Email: idriss@example.com
  🔗 GitHub: https://github.com/Idriss-Chefai
  💼 LinkedIn: https://www.linkedin.com/in/idriss-chefai/
  📸 Instagram: https://www.instagram.com/_idriss_c_/
  
  → Feel free to reach out! I love collaborating.`
    },
    resume: {
      type: 'response',
      text: `📄 Resume: Idriss_s_Resume_2025 v2.pdf
  
  → Resume link: /Idriss_s_Resume_2025 v2.pdf
  → Opening in new window...
  
  ✓ Resume downloaded successfully!`
    },
    about: {
      type: 'response',
      text: `About Me:
  Hi! I'm Idriss Chefai, a Game Developer & Software Engineer.
  
  I specialize in:
  • Building immersive games with engaging mechanics
  • Creating scalable web applications
  • Machine learning & data analysis
  • Full-stack development (frontend + backend)
  
  My philosophy: "I turn concepts into working products"
  
  Experience: 3+ years in software development
  Passion: Gaming, AI, and innovative tech solutions
  
  → Want to work together? Type "contact"`
    },
    clear: {
      type: 'clear',
      text: ''
    },
    default: {
      type: 'response',
      text: `Command not found: "${input}"
  Type "help" to see available commands.`
    }
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const typeText = (text, callback) => {
    setIsTyping(true)
    let index = 0
    setDisplayedText('')

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.substring(0, index + 1))
        index++
      } else {
        clearInterval(interval)
        setIsTyping(false)
        if (callback) callback()
      }
    }, 30) // Typing speed
  }

  const handleCommand = (command) => {
    const trimmedCommand = command.trim().toLowerCase()

    // Add user input to history
    setHistory(prev => [
      ...prev,
      { type: 'input', text: `> ${command}` }
    ])

    if (trimmedCommand === 'clear') {
      setHistory([
        { type: 'system', text: 'Terminal cleared' },
        { type: 'system', text: '' }
      ])
      setInput('')
      return
    }

    if (trimmedCommand === 'exit') {
      setHistory(prev => [
        ...prev,
        { type: 'response', text: 'Closing terminal...' }
      ])
      setInput('')
      return
    }

    const response = responses[trimmedCommand] || responses.default

    if (response.type === 'clear') {
      setHistory([])
    } else {
      // Add response with typing effect
      setHistory(prev => [...prev, { type: 'response', text: '', isLoading: true }])
      
      typeText(response.text, () => {
        setHistory(prev => {
          const updated = [...prev]
          updated[updated.length - 1] = { type: 'response', text: response.text, isLoading: false }
          return updated
        })
      })
    }

    setInput('')

    // Handle special command: resume download
    if (trimmedCommand === 'resume') {
      setTimeout(() => {
        const link = document.createElement('a')
        link.href = '/Idriss_s_Resume_2025 v2.pdf'
        link.download = 'Idriss_Chefai_Resume.pdf'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }, 1000)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      handleCommand(input)
    }
  }

  return (
    <section id="terminal" className="terminal-section">
      <h2 className="section-title">AI Terminal</h2>
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-buttons">
            <div className="terminal-btn close"></div>
            <div className="terminal-btn minimize"></div>
            <div className="terminal-btn maximize"></div>
          </div>
          <div className="terminal-title">idriss-terminal ~ bash</div>
        </div>

        <div className="terminal-body" ref={terminalRef}>
          {history.map((line, index) => (
            <div key={index} className={`terminal-line ${line.type}`}>
              <span className="terminal-text">
                {line.type === 'response' && index === history.length - 1 && isTyping
                  ? displayedText
                  : line.text}
                {line.isLoading && <span className="cursor">▊</span>}
                {line.type === 'response' && index === history.length - 1 && isTyping && <span className="cursor">▊</span>}
              </span>
            </div>
          ))}
        </div>

        <div className="terminal-input-section">
          <span className="terminal-prompt">❯ </span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="terminal-input"
            placeholder="Enter command..."
            autoFocus
          />
        </div>
      </div>

      <div className="terminal-hint">
        💡 Tip: Try typing "help" to see all available commands!
      </div>
    </section>
  )
}

export default Terminal
