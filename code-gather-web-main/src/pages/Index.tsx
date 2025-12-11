import { Header } from "@/components/Header";
import { LiveTicker } from "@/components/LiveTicker";
import { HeroSection } from "@/components/HeroSection";
import { RealTimeStats } from "@/components/RealTimeStats";
import { PortfolioBalance } from "@/components/PortfolioBalance";
import { CryptoCards } from "@/components/CryptoCards";
import { AllMarkets } from "@/components/AllMarkets";
import { Portfolio } from "@/components/Portfolio";
import { AIInsights } from "@/components/AIInsights";
import { NewsSection } from "@/components/NewsSection";
import { PricingSection } from "@/components/PricingSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <LiveTicker />
      <main>
        <HeroSection />
        <PortfolioBalance />
        <RealTimeStats />
        <CryptoCards />
        <AllMarkets />
        <Portfolio />
        <AIInsights />
        <NewsSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
