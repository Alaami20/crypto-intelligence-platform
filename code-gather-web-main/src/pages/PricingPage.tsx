import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PricingSection } from "@/components/PricingSection";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Choose Your <span className="text-gradient">Plan</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Start with a 7-day free trial. No credit card required. Cancel anytime.
            </p>
          </motion.div>
        </div>
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}