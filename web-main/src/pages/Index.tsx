import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { CryptoCards } from "@/components/CryptoCards";
import { AIInsights } from "@/components/AIInsights";
import { NewsSection } from "@/components/NewsSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CryptoCards />
        <AIInsights />
        <NewsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
