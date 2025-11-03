"use client";

import { useState, useEffect } from "react";
import ThreeCanvas from "@/components/ThreeCanvas";
import ParticleField from "@/components/ParticleField";
import TerminalOverlay, { TerminalSection, TerminalDivider } from "@/components/TerminalOverlay";
import TerminalHeader from "@/components/TerminalHeader";
import TerminalNav, { CommandPrompt } from "@/components/TerminalNav";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  const [activeSection, setActiveSection] = useState("#home");
  const [isBootComplete, setIsBootComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Handle boot sequence completion
  const handleBootComplete = () => {
    setIsBootComplete(true);
    setTimeout(() => setShowContent(true), 300);
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["#home", "#projects", "#about", "#contact"];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const sectionId of sections) {
        const element = document.querySelector(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element as HTMLElement;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative min-h-screen">
      {/* 3D Particle Background */}
      <ThreeCanvas>
        <ParticleField count={800} mouseInfluence={true} />
      </ThreeCanvas>

      {/* Main Content */}
      <div className="content-wrapper">
        {/* Hero Terminal Section */}
        <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
          <TerminalOverlay showHeader={true}>
            {/* Terminal Header with Boot Sequence */}
            <TerminalSection id="home">
              <TerminalHeader onBootComplete={handleBootComplete} />
            </TerminalSection>

            {/* Navigation - Shows after boot */}
            {isBootComplete && (
              <>
                <TerminalDivider />
                <TerminalSection>
                  <CommandPrompt />
                  <TerminalNav 
                    activeSection={activeSection}
                    onNavigate={setActiveSection}
                  />
                </TerminalSection>
              </>
            )}

            {/* Hero Content - Shows after boot */}
            {showContent && (
              <>
                <TerminalDivider />
                <TerminalSection>
                  <HeroSection />
                </TerminalSection>
              </>
            )}
          </TerminalOverlay>
        </div>

        {/* Projects Section */}
        {showContent && (
          <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
            <TerminalOverlay showHeader={false}>
              <TerminalSection id="projects">
                <ProjectsSection />
              </TerminalSection>
            </TerminalOverlay>
          </div>
        )}

        {/* About Section */}
        {showContent && (
          <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
            <TerminalOverlay showHeader={false}>
              <TerminalSection id="about">
                <AboutSection />
              </TerminalSection>
            </TerminalOverlay>
          </div>
        )}

        {/* Contact Section */}
        {showContent && (
          <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
            <TerminalOverlay showHeader={false}>
              <TerminalSection id="contact">
                <ContactSection />
              </TerminalSection>
            </TerminalOverlay>
          </div>
        )}
      </div>
    </main>
  );
}