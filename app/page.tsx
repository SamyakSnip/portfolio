import ThreeCanvas from "@/components/ThreeCanvas";
import ParticleField from "@/components/ParticleField";
import TerminalHeader from "@/components/TerminalHeader";

export default function Home() {
  return (
    <main>
      <ThreeCanvas>
        <ParticleField count={500} />
      </ThreeCanvas>
      <div className="content-wrapper">
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="glass p-8 max-w-2xl w-full terminal-border">
            <TerminalHeader />
          </div>
        </div>
      </div>
    </main>
  );
}