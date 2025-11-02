import ThreeCanvas from "@/components/ThreeCanvas";
import ParticleField from "@/components/ParticleField";
import TerminalOverlay, { TerminalSection, TerminalDivider } from "@/components/TerminalOverlay";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import TerminalNav, { CommandPrompt } from "@/components/TerminalNav";

export default function Home() {
  return (
    <main>
      <ThreeCanvas>
        <ParticleField count={500} />
      </ThreeCanvas>
      
      <TerminalOverlay>
        <TerminalSection>
          <CommandPrompt />
          <TerminalNav activeSection="#home" />
        </TerminalSection>

        <TerminalDivider />

        <TerminalSection>
          <HeroSection />
        </TerminalSection>

        <TerminalDivider />

        <TerminalSection>
          <ProjectsSection />
        </TerminalSection>

        <TerminalDivider />

        <TerminalSection>
          <AboutSection />
        </TerminalSection>
      </TerminalOverlay>
    </main>
  );
}