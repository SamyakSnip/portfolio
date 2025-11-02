"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { 
  containerVariants, 
  fadeInUpVariants, 
  cardHoverVariants 
} from "@/lib/animation-utils";
import { userData, Project } from "@/lib/user-data";
import { ExternalLink, Github, Code2, Sparkles } from "lucide-react";

/**
 * ProjectsSection Component
 * Grid of project cards with filtering and animations
 */
export default function ProjectsSection() {
  const [filter, setFilter] = useState<"all" | "featured">("all");

  const filteredProjects = filter === "all" 
    ? userData.projects 
    : userData.projects.filter(p => p.featured);

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="space-y-8 py-8"
      id="projects"
    >
      {/* Section header */}
      <motion.div variants={fadeInUpVariants} className="space-y-4">
        <div className="flex items-center gap-2 font-mono text-sm text-cyan/60">
          <span className="text-purple">&gt;</span>
          <span>portfolio.showProjects()</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold gradient-text">
          Featured Work
        </h2>
        <p className="text-white/70 text-base md:text-lg max-w-2xl">
          A collection of projects showcasing my skills in UI/UX design, 
          frontend development, and creative problem-solving.
        </p>
      </motion.div>

      {/* Filter buttons */}
      <motion.div variants={fadeInUpVariants} className="flex gap-3">
        <FilterButton
          label="All Projects"
          count={userData.projects.length}
          isActive={filter === "all"}
          onClick={() => setFilter("all")}
        />
        <FilterButton
          label="Featured"
          count={userData.projects.filter(p => p.featured).length}
          isActive={filter === "featured"}
          onClick={() => setFilter("featured")}
        />
      </motion.div>

      {/* Projects grid */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </motion.div>

      {/* Empty state */}
      {filteredProjects.length === 0 && (
        <motion.div
          variants={fadeInUpVariants}
          className="text-center py-12 text-white/50 font-mono"
        >
          No projects found.
        </motion.div>
      )}
    </motion.section>
  );
}

/**
 * FilterButton Component
 * Filter toggle button with count badge
 */
function FilterButton({
  label,
  count,
  isActive,
  onClick
}: {
  label: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        relative px-4 py-2 font-mono text-sm rounded transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-cyan focus:ring-offset-2 focus:ring-offset-bg-dark
        ${isActive
          ? "bg-cyan/20 border border-cyan text-cyan"
          : "bg-transparent border border-cyan/30 text-cyan/70 hover:border-cyan hover:text-cyan"
        }
      `}
    >
      <span className="flex items-center gap-2">
        {label}
        <span className="px-2 py-0.5 bg-cyan/20 rounded-full text-xs">
          {count}
        </span>
      </span>
    </motion.button>
  );
}

/**
 * ProjectCard Component
 * Individual project card with hover effects
 */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      variants={fadeInUpVariants}
      custom={index}
      initial="rest"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative glass rounded-lg p-6 border border-cyan/20 card-hover cursor-pointer"
    >
      {/* Featured badge */}
      {project.featured && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute -top-2 -right-2 flex items-center gap-1 px-2 py-1 bg-purple text-white text-xs font-mono rounded-full shadow-lg"
        >
          <Sparkles className="w-3 h-3" />
          Featured
        </motion.div>
      )}

      {/* Project content */}
      <div className="space-y-4">
        {/* Title and icon */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan transition-colors">
            {project.title}
          </h3>
          <motion.div
            animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 0.5 }}
            className="text-cyan"
          >
            <Code2 className="w-6 h-6" />
          </motion.div>
        </div>

        {/* Description */}
        <p className="text-white/70 text-sm md:text-base leading-relaxed">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-cyan/10 border border-cyan/30 text-cyan text-xs font-mono rounded"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 pt-2">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-cyan text-bg-dark font-mono text-sm rounded hover:bg-cyan/90 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan focus:ring-offset-2 focus:ring-offset-bg-dark"
            onClick={(e) => {
              if (project.link === "#") {
                e.preventDefault();
              }
            }}
          >
            <ExternalLink className="w-4 h-4" />
            View Project
          </motion.a>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 border border-cyan/30 text-cyan font-mono text-sm rounded hover:bg-cyan/10 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan focus:ring-offset-2 focus:ring-offset-bg-dark"
            aria-label="View code on GitHub"
          >
            <Github className="w-4 h-4" />
            Code
          </motion.button>
        </div>
      </div>

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(0, 240, 255, 0.1), transparent 70%)"
        }}
      />
    </motion.article>
  );
}

/**
 * ProjectsHeader Component
 * Alternative compact header
 */
export function ProjectsHeader() {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 bg-cyan rounded-full animate-pulse" />
        <h2 className="text-2xl md:text-3xl font-bold text-white font-mono">
          Projects
        </h2>
      </div>
      <div className="font-mono text-sm text-cyan/60">
        [{userData.projects.length} items]
      </div>
    </div>
  );
}