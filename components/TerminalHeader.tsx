"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { bootMessages } from "@/lib/user-data";

interface TerminalHeaderProps {
  onBootComplete?: () => void;
}

/**
 * TerminalHeader Component
 * Boot sequence with typewriter effect for terminal-style header
 */
export default function TerminalHeader({ onBootComplete }: TerminalHeaderProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentLineIndex >= bootMessages.length) {
      setIsComplete(true);
      onBootComplete?.();
      return;
    }

    const currentMessage = bootMessages[currentLineIndex];
    let charIndex = 0;

    // Typewriter effect
    const typeInterval = setInterval(() => {
      if (charIndex <= currentMessage.length) {
        setDisplayedText(currentMessage.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        // Move to next line after delay
        setTimeout(() => {
          setCurrentLineIndex((prev) => prev + 1);
          setDisplayedText("");
        }, 500);
      }
    }, 50); // 50ms per character

    return () => clearInterval(typeInterval);
  }, [currentLineIndex, onBootComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-2"
    >
      {/* Previous completed lines */}
      {bootMessages.slice(0, currentLineIndex).map((message, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          className="font-mono text-sm md:text-base text-cyan/60"
        >
          {message}
        </motion.div>
      ))}

      {/* Current typing line */}
      {!isComplete && (
        <div className="font-mono text-sm md:text-base text-cyan flex items-center">
          <span>{displayedText}</span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="inline-block w-2 h-4 bg-cyan ml-1"
          />
        </div>
      )}

      {/* Final state - all lines visible */}
      {isComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-2 pt-4 border-t border-cyan/20"
        >
          <h1 className="font-mono text-2xl md:text-4xl font-bold gradient-text">
            {bootMessages[bootMessages.length - 2]}
          </h1>
          <p className="font-mono text-base md:text-lg text-white/80">
            {bootMessages[bootMessages.length - 1]}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

/**
 * SimpleTerminalHeader Component
 * Simplified version without boot animation for faster loading
 */
export function SimpleTerminalHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-2"
    >
      <div className="font-mono text-sm text-cyan/60">
        &gt; samyak.dev
      </div>
      <h1 className="font-mono text-2xl md:text-4xl font-bold gradient-text">
        Samyak Shende
      </h1>
      <p className="font-mono text-base md:text-lg text-white/80">
        UI/UX Designer | Frontend Developer | Game Dev & AI/ML Enthusiast
      </p>
    </motion.div>
  );
}