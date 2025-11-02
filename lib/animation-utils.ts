/**
 * ANIMATION UTILITIES
 * Framer Motion variants and animation configurations for consistent transitions
 */

import { Variants } from "framer-motion";

// Container variants for staggered children animations
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Fade in from bottom (for cards, sections)
export const fadeInUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] // cubic-bezier easing
    }
  }
};

// Fade in from left (for text elements)
export const fadeInLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -30
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

// Fade in from right (for alternate elements)
export const fadeInRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 30
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

// Scale in (for buttons, icons)
export const scaleInVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

// Terminal boot sequence variants
export const terminalBootVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

// Card hover animation
export const cardHoverVariants = {
  rest: {
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  hover: {
    scale: 1.02,
    y: -10,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

// Button hover/tap animations
export const buttonVariants = {
  rest: {
    scale: 1
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  tap: {
    scale: 0.95
  }
};

// Typewriter text animation config
export const typewriterConfig = {
  hidden: { width: 0 },
  visible: {
    width: "100%",
    transition: {
      duration: 2,
      ease: "linear"
    }
  }
};

// Pulse animation (for active indicators)
export const pulseVariants: Variants = {
  initial: {
    scale: 1,
    opacity: 1
  },
  animate: {
    scale: [1, 1.1, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Glow animation (for borders, highlights)
export const glowVariants = {
  initial: {
    boxShadow: "0 0 10px rgba(0, 240, 255, 0.2)"
  },
  animate: {
    boxShadow: [
      "0 0 10px rgba(0, 240, 255, 0.2)",
      "0 0 20px rgba(0, 240, 255, 0.4)",
      "0 0 10px rgba(0, 240, 255, 0.2)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Scroll-triggered animation config
export const scrollTriggerConfig = {
  viewport: { once: true, amount: 0.2 }, // Trigger when 20% visible
  initial: "hidden",
  whileInView: "visible"
};

// Page transition variants
export const pageTransitionVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3
    }
  }
};

// Stagger configuration for lists/grids
export const staggerConfig = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Intersection Observer options for scroll animations
export const intersectionObserverOptions = {
  threshold: 0.2,
  triggerOnce: true
};

// Particle fade in (for canvas elements)
export const particleFadeVariants: Variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: "easeOut"
    }
  }
};

// Nav item variants (for menu animations)
export const navItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -20
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1]
    }
  })
};

// Utility function: Check for reduced motion preference
export const shouldReduceMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

// Utility function: Get animation variants based on reduced motion preference
export const getVariants = (variants: Variants): Variants => {
  if (shouldReduceMotion()) {
    // Return simplified variants with no animation
    return {
      hidden: { opacity: 1 },
      visible: { opacity: 1 }
    };
  }
  return variants;
};

// Transition presets
export const transitions = {
  smooth: {
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1]
  },
  fast: {
    duration: 0.2,
    ease: [0.4, 0, 0.2, 1]
  },
  slow: {
    duration: 0.6,
    ease: [0.4, 0, 0.2, 1]
  },
  spring: {
    type: "spring" as const,
    stiffness: 300,
    damping: 30
  }
};

// Easing functions
export const easings = {
  easeOut: [0.4, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
  easeInOut: [0.4, 0, 0.2, 1],
  sharp: [0.4, 0, 0.6, 1]
};