"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { terminalBootVariants } from "@/lib/animation-utils";

interface TerminalOverlayProps {
  children: ReactNode;
  className?: string;
  showHeader?: boolean;
}

/**
 * TerminalOverlay Component
 * Main glassmorphic container that wraps all terminal content
 */
export default function TerminalOverlay({ 
  children, 
  className = "",
  showHeader = true 
}: TerminalOverlayProps) {
  return (
    <div className="content-wrapper">
      <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
        <motion.div
          variants={terminalBootVariants}
          initial="hidden"
          animate="visible"
          className={`
            glass terminal-border
            w-full max-w-4xl
            p-6 md:p-8 lg:p-10
            relative
            ${className}
          `}
        >
          {/* Terminal window controls (decorative) */}
          {showHeader && <TerminalWindowControls />}

          {/* Main content */}
          <div className="space-y-6 md:space-y-8">
            {children}
          </div>

          {/* Terminal corner accent */}
          <TerminalCornerAccent />
        </motion.div>
      </div>
    </div>
  );
}

/**
 * TerminalWindowControls Component
 * Decorative window control buttons (macOS style)
 */
function TerminalWindowControls() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="flex items-center gap-2 mb-6 pb-4 border-b border-cyan/20"
    >
      {/* Control buttons */}
      <div className="flex gap-2">
        <div 
          className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-not-allowed"
          aria-label="Close (disabled)"
          title="Close"
        />
        <div 
          className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-not-allowed"
          aria-label="Minimize (disabled)"
          title="Minimize"
        />
        <div 
          className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors cursor-not-allowed"
          aria-label="Maximize (disabled)"
          title="Maximize"
        />
      </div>

      {/* Terminal title */}
      <div className="flex-1 text-center">
        <span className="font-mono text-xs md:text-sm text-cyan/60">
          samyak@portfolio:~
        </span>
      </div>

      {/* Connection status indicator */}
      <div className="flex items-center gap-2">
        <motion.div
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-2 h-2 rounded-full bg-cyan shadow-glow-cyan"
          aria-label="Connected"
        />
        <span className="font-mono text-xs text-cyan/60 hidden md:inline">
          Online
        </span>
      </div>
    </motion.div>
  );
}

/**
 * TerminalCornerAccent Component
 * Animated corner decoration
 */
function TerminalCornerAccent() {
  return (
    <>
      {/* Top-left corner */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan/30 rounded-tl-lg"
        aria-hidden="true"
      />

      {/* Top-right corner */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.3 }}
        className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan/30 rounded-tr-lg"
        aria-hidden="true"
      />

      {/* Bottom-left corner */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.3 }}
        className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan/30 rounded-bl-lg"
        aria-hidden="true"
      />

      {/* Bottom-right corner */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.3 }}
        className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan/30 rounded-br-lg"
        aria-hidden="true"
      />
    </>
  );
}

/**
 * TerminalSection Component
 * Reusable section wrapper with consistent spacing
 */
export function TerminalSection({ 
  children, 
  className = "",
  id
}: { 
  children: ReactNode; 
  className?: string;
  id?: string;
}) {
  return (
    <section 
      id={id}
      className={`space-y-4 ${className}`}
    >
      {children}
    </section>
  );
}

/**
 * TerminalDivider Component
 * Styled divider for separating sections
 */
export function TerminalDivider() {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent"
      aria-hidden="true"
    />
  );
}

/**
 * TerminalPromptLine Component
 * Decorative command prompt line
 */
export function TerminalPromptLine({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="font-mono text-sm md:text-base text-cyan/60"
    >
      <span className="text-purple">&gt;</span> {text}
    </motion.div>
  );
}