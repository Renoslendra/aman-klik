import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustStrip from "@/components/TrustStrip";
import ProblemSection from "@/components/ProblemSection";
import LiveDemoSection from "@/components/LiveDemoSection";
import FeatureCardsSection from "@/components/FeatureCardsSection";
import ScamFlowSection from "@/components/ScamFlowSection";
import ResultPreviewSection from "@/components/ResultPreviewSection";
import EmergencyModeSection from "@/components/EmergencyModeSection";
import EducationSection from "@/components/EducationSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <TrustStrip />
      <ProblemSection />
      <LiveDemoSection />
      <FeatureCardsSection />
      <ScamFlowSection />
      <ResultPreviewSection />
      <EmergencyModeSection />
      <EducationSection />
      <HowItWorksSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}
