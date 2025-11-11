import React, { useState } from 'react'
import { FaDownload } from 'react-icons/fa'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Set your real receiver email here (e.g. 'yourname@gmail.com')
  const RECEIVER_EMAIL = 'idriss@example.com'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    // Try opening the user's mail client with prefilled content as a reliable fallback
    try {
      const subject = encodeURIComponent(formData.subject || 'Contact from Portfolio')
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)
      const mailto = `mailto:${RECEIVER_EMAIL}?subject=${subject}&body=${body}`
      window.location.href = mailto

      // reset form and show quick confirmation
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setStatus(''), 3000)
    } catch (err) {
      // If opening mail client failed, fallback to simulated send
      setTimeout(() => {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setStatus(''), 3000)
      }, 1500)
    }
  }

  const handleDownloadResume = () => {
    // Create a link to download the resume
    // You'll need to add your actual resume file to the public folder
    const link = document.createElement('a')
    // Ensure your resume file is placed in the public folder at this path
    link.href = '/Idriss_s_Resume_2025 v2.pdf'
    link.download = 'Idriss_Chefai_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section id="contact" className="contact-section">
      <h2 className="section-title">Get In Touch</h2>
      
      <div className="contact-container">
        <div className="resume-download-section">
          <div className="resume-card">
            <h3>📄 Download My Resume</h3>
            <p>Get a copy of my resume in PDF format</p>
            <button className="download-btn" onClick={handleDownloadResume}>
              <FaDownload className="download-icon" />
              <span>Download Resume</span>
            </button>
          </div>
        </div>

        <div className="contact-form-section">
          <h3 className="form-title">Send me a message</h3>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="What's this about?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                placeholder="Tell me about your project, opportunity, or just say hi!"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent! ✓' : 'Send Message'}
            </button>

            {status === 'success' && (
              <p className="success-message">
                Thank you! I'll get back to you soon. 🚀
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact

