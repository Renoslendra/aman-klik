import HeroSection from "@/components/sections/HeroSection";
import TrustStrip from "@/components/sections/TrustStrip";
import ProblemSection from "@/components/sections/ProblemSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import LiveDemoSection from "@/components/sections/LiveDemoSection";
import FAQSection from "@/components/sections/FAQSection";
import FinalCTASection from "@/components/sections/FinalCTASection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TrustStrip />
      <div className="section-glow-divider" />
      <ProblemSection />
      <div className="section-glow-divider" />
      <HowItWorksSection />
      <div className="section-glow-divider" />
      <LiveDemoSection />
      <div className="section-glow-divider" />
      <FAQSection />
      <div className="section-glow-divider" />
      <FinalCTASection />
    </main>
  );
}


