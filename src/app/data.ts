// ─────────────────────────────────────────────────────────────────────────
// PORTFOLIO CENTRAL HUB
// This file acts as the switchboard. High-level settings live here,
// while heavy content is pulled from projects.ts, timeline.ts, and blog.ts.
// ─────────────────────────────────────────────────────────────────────────

import { MD_BLOGS } from "./blog"; // Pulls the parsed markdown blogs
import { Cat } from "./data-types";

// 1. High-Level Profile Info
export const PROFILE = {
  name: "Idriss Chefai",
  initials: "IC",
  title: "Game Developer & Software Engineer",
  bio: "I build immersive games and scalable applications. From interactive gameplay mechanics to robust backends — I turn concepts into working products.",
  email: "idriss@example.com", // TODO: replace with your real contact email
  avatar: "/professional-img.jpeg",
  resumeFile: "/Idriss_s_Resume_2025 v2.pdf",
  resumeDownloadName: "Idriss_Chefai_Resume.pdf",
  location: "Tunis, Tunisia",
  availability: "Open to Opportunities",
};

// 2. Social Media Links
export const SOCIALS = [
  { label: "GitHub", handle: "@yourprofile", url: "...", color: "#24292e" },
  { label: "LinkedIn", handle: "@yourprofile", url: "...", color: "#0077b5" },
  { label: "Instagram", handle: "@yourprofile", url: "...", color: "#e1306c" },
  // Everything below here stays tucked away dynamically!
  { label: "GitLab", handle: "@yourprofile", url: "...", color: "#fc6d26" },
  { label: "LeetCode", handle: "@yourprofile", url: "...", color: "#f89f1b" },
  { label: "Codeforces", handle: "@yourprofile", url: "...", color: "#3182ce" },
  { label: "Facebook", handle: "@yourprofile", url: "...", color: "#1877f2" },
  { label: "WhatsApp", handle: "@yourprofile", url: "...", color: "#25d366" },
];

// 3. Re-exporting Types and Large Data Chunks
export { type Cat, type MediaItem, type Project, type TimelineItem, type BlogPost} from "./data-types";
export { PROJECTS } from "./projects"; // Kept completely in projects.ts!
export { TIMELINE } from "./timeline"; // Kept completely in timeline.ts!
export {CERTIFICATIONS} from "./certifications"; // Kept completely in certifications.ts!
export {COMPETITIONS} from "./competitions"; // Kept completely in competitions.ts!
export const BLOGS = MD_BLOGS;         // Kept completely in blog.ts / markdown files!

// 4. Category Array (Runtime array for App.tsx's filter buttons)
export const CATS: Cat[] = ["All", "Games", "Web", "Mobile", "AI", "Software"];

// 5. Skills Marquee List
export const SKILLS = [
  "Python", "Java", "C", "C#", "C++", "JavaScript", "TypeScript",
  "Unity", "Blender",
  "React", "Angular", "Node.js", "Flask", "Spring Boot", "Symfony", ".NET", "Flutter",
  "MySQL", "PostgreSQL", "MongoDB",
  "TensorFlow", "PyTorch", "scikit-learn", "Pandas",
  "Solidity",
  "Git",
];

// 6. SVG Brand Icons
export const BRAND_LOGOS: Record<string, { svg: string; color: string }> = {
  "C++": { color: "#00599C", svg: `<svg viewBox="0 0 32 32" fill="currentColor"><text x="2" y="24" font-size="18" font-weight="bold" font-family="serif">C++</text></svg>` },
  "C#": { color: "#239120", svg: `<svg viewBox="0 0 32 32" fill="currentColor"><text x="2" y="24" font-size="18" font-weight="bold" font-family="serif">C#</text></svg>` },
  "Java": { color: "#f89820", svg: `<svg viewBox="0 0 32 32" fill="currentColor"><text x="1" y="24" font-size="14" font-weight="bold" font-family="serif">Java</text></svg>` },
  "TypeScript": { color: "#3178c6", svg: `<svg viewBox="0 0 32 32" fill="currentColor"><rect x="0" y="0" width="32" height="32" rx="4" fill="currentColor" opacity="0.15"/><text x="2" y="24" font-size="13" font-weight="bold" font-family="sans-serif">TS</text></svg>` },
  "Python": { color: "#3776AB", svg: `<svg viewBox="0 0 32 32" fill="currentColor"><text x="1" y="24" font-size="11" font-weight="bold" font-family="sans-serif">Py</text></svg>` },
  "Unity": { color: "#FFFFFF", svg: `<svg viewBox="0 0 32 32" fill="currentColor"><circle cx="16" cy="16" r="12" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="16" cy="16" r="4" fill="currentColor"/></svg>` },
  "React": { color: "#61DAFB", svg: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="16" cy="16" rx="12" ry="5"/><ellipse cx="16" cy="16" rx="12" ry="5" transform="rotate(60 16 16)"/><ellipse cx="16" cy="16" rx="12" ry="5" transform="rotate(120 16 16)"/><circle cx="16" cy="16" r="2" fill="currentColor"/></svg>` },
  "PyTorch": { color: "#EE4C2C", svg: `<svg viewBox="0 0 32 32" fill="currentColor"><circle cx="16" cy="16" r="10" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="16" cy="10" r="3"/></svg>` },
  "Git": { color: "#F05032", svg: `<svg viewBox="0 0 32 32" fill="currentColor"><circle cx="16" cy="16" r="3"/><circle cx="8" cy="8" r="3"/><circle cx="24" cy="8" r="3"/><line x1="16" y1="16" x2="8" y2="8" stroke="currentColor" stroke-width="2"/><line x1="16" y1="16" x2="24" y2="8" stroke="currentColor" stroke-width="2"/></svg>` },
};
