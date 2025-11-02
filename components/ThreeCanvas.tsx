"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ThreeCanvasProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * ThreeCanvas Component
 * Reusable Canvas wrapper with performance optimizations and fallbacks
 */
export default function ThreeCanvas({ children, className = "" }: ThreeCanvasProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    setIsMounted(true);

    // Check for WebGL support
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setHasWebGL(false);
        console.warn("WebGL not supported, falling back to CSS background");
      }
    } catch (e) {
      setHasWebGL(false);
      console.warn("WebGL check failed:", e);
    }
  }, []);

  // Don't render canvas on server (avoid hydration issues)
  if (!isMounted) {
    return <CanvasFallback />;
  }

  // Fallback for browsers without WebGL
  if (!hasWebGL) {
    return <CanvasFallback />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className={`canvas-container ${className}`}
      aria-hidden="true"
    >
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 75,
          near: 0.1,
          far: 1000
        }}
        dpr={[1, 2]} // Device pixel ratio: min 1, max 2 for performance
        performance={{ min: 0.5 }} // Throttle to 50% if performance drops
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </motion.div>
  );
}

/**
 * CanvasFallback Component
 * CSS-based animated gradient fallback for non-WebGL browsers
 */
function CanvasFallback() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="canvas-container"
      aria-hidden="true"
      style={{
        background: `
          radial-gradient(ellipse at top, rgba(0, 240, 255, 0.15), transparent 50%),
          radial-gradient(ellipse at bottom, rgba(157, 78, 221, 0.15), transparent 50%),
          linear-gradient(180deg, #0a0a0f 0%, #1a1a2e 100%)
        `,
        animation: "gradientShift 15s ease infinite"
      }}
    >
      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </motion.div>
  );
}