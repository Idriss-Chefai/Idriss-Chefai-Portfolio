# Idriss Chefai - Portfolio Website

A modern, gamified portfolio website showcasing my work as a Game Developer and Software Engineer.

## Features

- 🎮 **Gamified Design** - Creative, game-inspired UI with animations and effects
- 📱 **Fully Responsive** - Works seamlessly on all devices
- 🎨 **Modern UI/UX** - Beautiful, colorful, and professional design
- 🚀 **Fast Performance** - Built with React and Vite for optimal speed
- 📂 **Project Showcase** - Interactive project cards with detailed modals
- 📧 **Contact Form** - Easy way for visitors to reach out
- 📄 **Resume Download** - Direct download link for my resume

## Tech Stack

- React 18
- Vite
- React Icons
- CSS3 (with animations and gradients)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Idriss-Chefai-Portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## Customization

### Adding Your Profile Picture

Place your profile image in the `public` folder as `profile.jpg`. The component will automatically use it, or display a placeholder with your initials if the image is not found.

### Adding Your Resume

Place your resume PDF in the `public` folder as `resume.pdf`. The download button will automatically link to it.

### Updating Social Links

Edit the `socialLinks` array in `src/components/Header.jsx` with your actual social media URLs.

### Adding Projects

Edit the `projects` array in `src/components/Projects.jsx` to add or modify your projects. Each project can include:
- Title and description
- Category (gamedev, web, mobile, ai, 3d)
- Technologies used
- Demo video URL (optional)
- Screenshot URLs (optional)

### Contact Form

The contact form currently simulates sending an email. To enable actual email functionality, you'll need to:
1. Set up a backend service (e.g., using Node.js/Express with nodemailer, or a service like Formspree, EmailJS, etc.)
2. Update the `handleSubmit` function in `src/components/Contact.jsx`

## Project Structure

```
├── public/
│   ├── profile.jpg      # Your profile picture
│   └── resume.pdf       # Your resume
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Skills.jsx
│   │   ├── Experience.jsx
│   │   ├── Projects.jsx
│   │   ├── ProjectModal.jsx
│   │   ├── Education.jsx
│   │   └── Contact.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## License

This project is open source and available under the MIT License.

## Contact

Feel free to reach out through the contact form on the website or via the social links provided!

