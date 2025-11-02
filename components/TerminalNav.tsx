"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { navItems } from "@/lib/user-data";
import { navItemVariants } from "@/lib/animation-utils";

interface TerminalNavProps {
  activeSection?: string;
  onNavigate?: (href: string) => void;
}

/**
 * TerminalNav Component
 * Terminal-style navigation buttons with smooth scroll
 */
export default function TerminalNav({ 
  activeSection = "#home",
  onNavigate 
}: TerminalNavProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleClick = (href: string) => {
    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    onNavigate?.(href);
  };

  return (
    <nav 
      className="flex flex-wrap gap-2 md:gap-3"
      role="navigation"
      aria-label="Main navigation"
    >
      {navItems.map((item, index) => {
        const isActive = activeSection === item.href;
        const isHovered = hoveredItem === item.label;

        return (
          <motion.button
            key={item.label}
            custom={index}
            variants={navItemVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            onClick={() => handleClick(item.href)}
            onMouseEnter={() => setHoveredItem(item.label)}
            onMouseLeave={() => setHoveredItem(null)}
            className={`
              relative px-4 py-2 font-mono text-sm md:text-base
              border rounded transition-all duration-300
              focus:outline-none focus:ring-2 focus:ring-cyan focus:ring-offset-2 focus:ring-offset-bg-dark
              ${isActive 
                ? "bg-cyan/20 border-cyan text-cyan shadow-glow-cyan" 
                : "bg-transparent border-cyan/30 text-cyan/80 hover:border-cyan hover:text-cyan"
              }
            `}
            aria-label={`Navigate to ${item.label}`}
            aria-current={isActive ? "page" : undefined}
          >
            {/* Button content */}
            <span className="relative z-10 flex items-center gap-2">
              <span className="text-cyan/60">[</span>
              {item.label}
              <span className="text-cyan/60">]</span>
            </span>

            {/* Hover glow effect */}
            {(isHovered || isActive) && (
              <motion.div
                layoutId="navGlow"
                className="absolute inset-0 bg-cyan/10 rounded"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}

            {/* Active indicator */}
            {isActive && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-2 h-2 bg-cyan rounded-full shadow-glow-cyan"
              />
            )}
          </motion.button>
        );
      })}
    </nav>
  );
}

/**
 * MobileTerminalNav Component
 * Compact vertical navigation for mobile screens
 */
export function MobileTerminalNav({ 
  activeSection = "#home",
  onNavigate 
}: TerminalNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsOpen(false);
    onNavigate?.(href);
  };

  return (
    <div className="md:hidden">
      {/* Menu toggle button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 border border-cyan/30 rounded bg-transparent text-cyan font-mono"
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2">
          <span>[</span>
          <span>Menu</span>
          <span>]</span>
        </span>
      </motion.button>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 right-0 mt-2 glass p-4 border-glow"
        >
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <button
                  key={item.label}
                  onClick={() => handleClick(item.href)}
                  className={`
                    px-4 py-2 font-mono text-left rounded transition-all
                    ${isActive 
                      ? "bg-cyan/20 border border-cyan text-cyan" 
                      : "bg-transparent text-cyan/80 hover:bg-cyan/10"
                    }
                  `}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="text-cyan/60">&gt; </span>
                  {item.label}
                </button>
              );
            })}
          </nav>
        </motion.div>
      )}
    </div>
  );
}

/**
 * CommandPrompt Component
 * Decorative command prompt line above nav
 */
export function CommandPrompt() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="font-mono text-sm text-cyan/60 mb-4"
    >
      <span className="text-purple">samyak@portfolio</span>
      <span className="text-white/40">:</span>
      <span className="text-cyan/80">~</span>
      <span className="text-white/40">$ </span>
      <span className="text-white/60">navigate</span>
    </motion.div>
  );
}