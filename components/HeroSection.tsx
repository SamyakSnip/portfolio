"use client";

import { motion } from "framer-motion";
import { fadeInUpVariants, containerVariants, buttonVariants } from "@/lib/animation-utils";
import { userData } from "@/lib/user-data";
import { ArrowDown, Sparkles } from "lucide-react";

interface HeroSectionProps {
  onCTAClick?: () => void;
}

/**
 * HeroSection Component
 * Landing hero content with animated text and CTA
 */
export default function HeroSection({ onCTAClick }: HeroSectionProps) {
  const handleExploreClick = () => {
    const projectsSection = document.querySelector("#projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    onCTAClick?.();
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 py-8"
      id="home"
    >
      {/* Greeting line */}
      <motion.div variants={fadeInUpVariants} className="space-y-2">
        <div className="flex items-center gap-2 font-mono text-sm md:text-base text-cyan/60">
          <span className="text-purple">&gt;</span>
          <span>Hello, I'm</span>
          <motion.div
            animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            👋
          </motion.div>
        </div>
      </motion.div>

      {/* Name */}
      <motion.h1
        variants={fadeInUpVariants}
        className="text-4xl md:text-6xl lg:text-7xl font-bold gradient-text"
      >
        {userData.displayName}
      </motion.h1>

      {/* Headline */}
      <motion.p
        variants={fadeInUpVariants}
        className="text-lg md:text-xl lg:text-2xl text-white/90 font-mono"
      >
        {userData.headline}
      </motion.p>

      {/* Short bio */}
      <motion.p
        variants={fadeInUpVariants}
        className="text-base md:text-lg text-white/70 max-w-2xl leading-relaxed"
      >
        {userData.shortBio}
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        variants={fadeInUpVariants}
        className="flex flex-wrap gap-4 pt-4"
      >
        {/* Primary CTA */}
        <motion.button
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          onClick={handleExploreClick}
          className="group relative px-6 py-3 bg-cyan text-bg-dark font-mono font-semibold rounded overflow-hidden transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan focus:ring-offset-2 focus:ring-offset-bg-dark"
          aria-label="Explore my projects"
        >
          <span className="relative z-10 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Explore Projects
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </span>

          {/* Hover effect overlay */}
          <motion.div
            className="absolute inset-0 bg-purple"
            initial={{ x: "-100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>

        {/* Secondary CTA */}
        <motion.a
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            const contactSection = document.querySelector("#contact");
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }}
          className="px-6 py-3 border-2 border-cyan text-cyan font-mono font-semibold rounded hover:bg-cyan/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan focus:ring-offset-2 focus:ring-offset-bg-dark"
          aria-label="Get in touch"
        >
          Get in Touch
        </motion.a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        variants={fadeInUpVariants}
        className="pt-8"
      >
        <ScrollIndicator />
      </motion.div>
    </motion.section>
  );
}

/**
 * ScrollIndicator Component
 * Animated scroll down indicator
 */
function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
      className="flex flex-col items-center gap-2"
    >
      <span className="font-mono text-xs text-cyan/60">Scroll to explore</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="text-cyan/60"
        aria-hidden="true"
      >
        <ArrowDown className="w-5 h-5" />
      </motion.div>
    </motion.div>
  );
}

/**
 * HeroStats Component
 * Optional stats display (years of experience, projects, etc.)
 */
export function HeroStats() {
  const stats = [
    { label: "Projects", value: userData.projects.length },
    { label: "Skills", value: userData.skills.length },
    { label: "Experience", value: "2+" }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-3 gap-4 mt-8"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          variants={fadeInUpVariants}
          className="text-center p-4 glass rounded border-glow"
        >
          <div className="text-2xl md:text-3xl font-bold gradient-text font-mono">
            {stat.value}
          </div>
          <div className="text-xs md:text-sm text-white/60 font-mono mt-1">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}