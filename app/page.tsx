import ThreeCanvas from "@/components/ThreeCanvas";
import ParticleField from "@/components/ParticleField";
import TerminalHeader from "@/components/TerminalHeader";
import TerminalNav, { CommandPrompt } from "@/components/TerminalNav";
import TerminalOverlay, { TerminalSection, TerminalDivider } from "@/components/TerminalOverlay";

export default function Home() {
  return (
    <main>
      <ThreeCanvas>
        <ParticleField count={500} />
      </ThreeCanvas>
      
      <TerminalOverlay>
        <TerminalSection>
          <TerminalHeader />
        </TerminalSection>

        <TerminalDivider />

        <TerminalSection>
          <CommandPrompt />
          <TerminalNav activeSection="#home" />
        </TerminalSection>

        <TerminalDivider />

        <TerminalSection>
          <p className="text-white/80 font-mono text-sm md:text-base">
            Welcome to my interactive portfolio. Navigate using the buttons above.
          </p>
        </TerminalSection>
      </TerminalOverlay>
    </main>
  );
}