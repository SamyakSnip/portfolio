"use client";

import { motion } from "framer-motion";
import { 
  containerVariants, 
  fadeInUpVariants,
  scaleInVariants 
} from "@/lib/animation-utils";
import { userData } from "@/lib/user-data";
import { 
  Palette, 
  Code, 
  Layers, 
  Zap, 
  Sparkles,
  Terminal,
  Figma,
  Github
} from "lucide-react";

// Icon mapping for skills
const skillIcons: Record<string, any> = {
  "UI/UX Design": Palette,
  "HTML": Code,
  "CSS": Layers,
  "JavaScript": Zap,
  "React": Sparkles,
  "Next.js": Terminal,
  "Three.js": Figma,
  "TailwindCSS": Layers,
  "Git": Github
};

/**
 * AboutSection Component
 * Skills grid and personal bio
 */
export default function AboutSection() {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="space-y-8 py-8"
      id="about"
    >
      {/* Section header */}
      <motion.div variants={fadeInUpVariants} className="space-y-4">
        <div className="flex items-center gap-2 font-mono text-sm text-cyan/60">
          <span className="text-purple">&gt;</span>
          <span>about.getInfo()</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold gradient-text">
          About Me
        </h2>
      </motion.div>

      {/* Bio */}
      <motion.div variants={fadeInUpVariants} className="space-y-4">
        <p className="text-white/80 text-base md:text-lg leading-relaxed">
          {userData.shortBio}
        </p>
        <p className="text-white/70 text-sm md:text-base leading-relaxed">
          I believe in creating experiences that are not only visually appealing 
          but also functional and accessible. My approach combines modern design 
          principles with performance optimization and user-centered thinking.
        </p>
      </motion.div>

      {/* Skills section */}
      <motion.div variants={fadeInUpVariants} className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-cyan rounded-full animate-pulse" />
          <h3 className="text-xl md:text-2xl font-bold text-white font-mono">
            Skills & Technologies
          </h3>
        </div>

        {/* Skills grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {userData.skills.map((skill, index) => (
            <SkillCard key={skill} skill={skill} index={index} />
          ))}
        </motion.div>
      </motion.div>

      {/* Experience timeline (optional) */}
      <motion.div variants={fadeInUpVariants}>
        <ExperienceTimeline />
      </motion.div>
    </motion.section>
  );
}

/**
 * SkillCard Component
 * Individual skill card with icon and hover effect
 */
function SkillCard({ skill, index }: { skill: string; index: number }) {
  const Icon = skillIcons[skill] || Code;

  return (
    <motion.div
      variants={scaleInVariants}
      custom={index}
      whileHover={{ 
        scale: 1.05,
        rotate: [0, -2, 2, -2, 0],
        transition: { duration: 0.3 }
      }}
      className="group relative glass rounded-lg p-4 border border-cyan/20 cursor-default smooth-transition hover:border-cyan/50"
    >
      {/* Skill content */}
      <div className="flex items-center gap-3">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
          className="text-cyan group-hover:text-purple transition-colors"
        >
          <Icon className="w-5 h-5 md:w-6 md:h-6" />
        </motion.div>
        <span className="text-white font-mono text-sm md:text-base group-hover:text-cyan transition-colors">
          {skill}
        </span>
      </div>

      {/* Hover glow */}
      <div className="absolute inset-0 rounded-lg bg-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
}

/**
 * ExperienceTimeline Component
 * Simple experience/education timeline
 */
function ExperienceTimeline() {
  const timeline = [
    {
      period: "2023 - Present",
      title: "Freelance Designer & Developer",
      description: "Building interactive web experiences and design systems"
    },
    {
      period: "2022 - 2023",
      title: "Learning & Experimentation",
      description: "Exploring Three.js, game development, and AI/ML"
    },
    {
      period: "2021 - 2022",
      title: "Frontend Development",
      description: "Mastering React, Next.js, and modern web technologies"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 bg-purple rounded-full animate-pulse" />
        <h3 className="text-xl md:text-2xl font-bold text-white font-mono">
          Journey
        </h3>
      </div>

      <div className="space-y-4">
        {timeline.map((item, index) => (
          <motion.div
            key={item.period}
            variants={fadeInUpVariants}
            custom={index}
            className="relative pl-8 pb-4 border-l-2 border-cyan/30 last:border-l-0 last:pb-0"
          >
            {/* Timeline dot */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="absolute -left-[5px] top-0 w-3 h-3 bg-cyan rounded-full border-2 border-bg-dark shadow-glow-cyan"
            />

            {/* Content */}
            <div className="space-y-1">
              <div className="font-mono text-xs md:text-sm text-cyan/60">
                {item.period}
              </div>
              <h4 className="text-base md:text-lg font-semibold text-white">
                {item.title}
              </h4>
              <p className="text-sm md:text-base text-white/70">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/**
 * AboutStats Component
 * Quick stats about experience
 */
export function AboutStats() {
  const stats = [
    { label: "Years Experience", value: "2+", icon: Zap },
    { label: "Projects Completed", value: userData.projects.length.toString(), icon: Code },
    { label: "Technologies", value: userData.skills.length.toString(), icon: Layers }
  ];

  return (
    <motion.div
      variants={containerVariants}
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            variants={scaleInVariants}
            custom={index}
            whileHover={{ scale: 1.05 }}
            className="glass rounded-lg p-6 border border-cyan/20 text-center space-y-2 cursor-default"
          >
            <Icon className="w-8 h-8 text-cyan mx-auto" />
            <div className="text-3xl font-bold gradient-text font-mono">
              {stat.value}
            </div>
            <div className="text-sm text-white/60 font-mono">
              {stat.label}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/**
 * SkillCategory Component
 * Alternative grouped skills layout
 */
export function SkillsByCategory() {
  const categories = [
    { name: "Design", skills: ["UI/UX Design", "Figma"], color: "purple" },
    { name: "Frontend", skills: ["HTML", "CSS", "JavaScript", "React", "Next.js"], color: "cyan" },
    { name: "Tools", skills: ["Git", "TailwindCSS", "Three.js"], color: "purple-light" }
  ];

  return (
    <div className="space-y-6">
      {categories.map((category, index) => (
        <motion.div
          key={category.name}
          variants={fadeInUpVariants}
          custom={index}
          className="space-y-3"
        >
          <h4 className="font-mono text-lg text-white/80 flex items-center gap-2">
            <span className="text-cyan">//</span>
            {category.name}
          </h4>
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 bg-cyan/10 border border-cyan/30 text-cyan text-sm font-mono rounded hover:bg-cyan/20 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}