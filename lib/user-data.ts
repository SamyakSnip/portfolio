/**
 * USER PROFILE DATA
 * Central configuration for all personal information displayed in the portfolio
 */

export interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
  featured?: boolean;
}

export interface Contact {
  email: string;
  github: string;
  twitter: string;
  linkedin: string;
}

export interface UserData {
  displayName: string;
  headline: string;
  shortBio: string;
  skills: string[];
  projects: Project[];
  contact: Contact;
}

export const userData: UserData = {
  displayName: "Samyak Shende",
  
  headline: "UI/UX Designer | Frontend Developer | Game Dev & AI/ML Enthusiast",
  
  shortBio: "I design and build interactive digital experiences blending creativity, usability, and motion. Currently exploring game development and AI/ML.",
  
  skills: [
    "UI/UX Design",
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Next.js",
    "Three.js",
    "TailwindCSS",
    "Git"
  ],
  
  projects: [
    {
      title: "Interactive Portfolio",
      description: "A 3D-driven personal portfolio using Three.js and Next.js with animated particle backgrounds and terminal-inspired UI.",
      tech: ["Next.js", "Three.js", "TypeScript", "Framer Motion"],
      link: "#",
      featured: true
    },
    {
      title: "Concept UI Projects",
      description: "Experimental UI/UX design explorations featuring modern layouts, micro-interactions, and responsive components.",
      tech: ["Figma", "React", "Framer Motion", "TailwindCSS"],
      link: "#",
      featured: true
    },
    {
      title: "E-Commerce Dashboard",
      description: "Clean and intuitive admin dashboard with real-time analytics, inventory management, and order tracking.",
      tech: ["React", "Chart.js", "TailwindCSS"],
      link: "#",
      featured: false
    },
    {
      title: "Weather App",
      description: "Minimalist weather application with geolocation support and 7-day forecasts using OpenWeather API.",
      tech: ["JavaScript", "HTML", "CSS", "API Integration"],
      link: "#",
      featured: false
    }
  ],
  
  contact: {
    email: "sam@example.com",
    github: "samyak",
    twitter: "@samyak",
    linkedin: "samyakshende"
  }
};

// Terminal boot messages for typewriter effect
export const bootMessages = [
  "> Initializing portfolio...",
  "> Loading creative modules...",
  "> samyak.dev",
  `> ${userData.headline}`
];

// Navigation items
export const navItems = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" }
];

// Skill categories for better organization
export const skillCategories = {
  design: ["UI/UX Design", "Figma", "Adobe XD"],
  frontend: ["HTML", "CSS", "JavaScript", "React", "Next.js"],
  tools: ["Git", "TailwindCSS", "Three.js"]
};

// Social links with icons (icon names for lucide-react)
export const socialLinks = [
  {
    platform: "GitHub",
    url: `https://github.com/${userData.contact.github}`,
    icon: "Github",
    label: "View GitHub Profile"
  },
  {
    platform: "Twitter",
    url: `https://twitter.com/${userData.contact.twitter}`,
    icon: "Twitter",
    label: "Follow on Twitter"
  },
  {
    platform: "LinkedIn",
    url: `https://linkedin.com/in/${userData.contact.linkedin}`,
    icon: "Linkedin",
    label: "Connect on LinkedIn"
  },
  {
    platform: "Email",
    url: `mailto:${userData.contact.email}`,
    icon: "Mail",
    label: "Send Email"
  }
];

// Featured projects only (for hero section)
export const featuredProjects = userData.projects.filter(p => p.featured);

// Command suggestions for future terminal input feature
export const commandSuggestions = [
  "projects",
  "about",
  "contact",
  "skills",
  "clear",
  "help"
];