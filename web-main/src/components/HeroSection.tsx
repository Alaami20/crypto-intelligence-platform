import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Zap, Brain, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm">
              <Zap className="w-4 h-4 text-warning" />
              <span className="text-muted-foreground">Real-time market intelligence</span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-foreground">Decode the </span>
              <span className="text-gradient">Crypto Market</span>
              <span className="text-foreground"> with AI</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg">
              Advanced machine learning algorithms analyze millions of data points to deliver 
              actionable insights, sentiment analysis, and predictive signals.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button variant="glow" size="xl">
                <Brain className="w-5 h-5" />
                Start Free Trial
              </Button>
              <Button variant="glass" size="xl">
                View Live Demo
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-success" />
                Bank-grade security
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="w-4 h-4 text-success" />
                87% accuracy rate
              </div>
            </div>
          </motion.div>

          {/* Right Content - Live Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="glass rounded-2xl p-6 space-y-6">
              {/* Market Sentiment */}
              <div className="text-center pb-4 border-b border-border/50">
                <span className="text-sm text-muted-foreground">Global Market Sentiment</span>
                <div className="flex items-center justify-center gap-3 mt-2">
                  <TrendingUp className="w-8 h-8 text-success" />
                  <span className="font-display text-4xl font-bold text-success">Bullish</span>
                </div>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden max-w-xs">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "72%" }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-success to-primary rounded-full"
                    />
                  </div>
                  <span className="text-sm font-medium text-success">72%</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <StatCard
                  label="Fear & Greed Index"
                  value="68"
                  subtext="Greed"
                  trend="up"
                />
                <StatCard
                  label="BTC Dominance"
                  value="52.4%"
                  subtext="+0.8% today"
                  trend="up"
                />
                <StatCard
                  label="24h Volume"
                  value="$142B"
                  subtext="+12.3%"
                  trend="up"
                />
                <StatCard
                  label="Active Signals"
                  value="24"
                  subtext="8 high priority"
                  trend="neutral"
                />
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 glass rounded-xl p-3 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-warning/20 flex items-center justify-center">
                  <span className="text-lg">₿</span>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Bitcoin</div>
                  <div className="text-sm font-semibold text-success">+4.2%</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 -left-4 glass rounded-xl p-3 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                  <span className="text-lg">Ξ</span>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Ethereum</div>
                  <div className="text-sm font-semibold text-success">+2.8%</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ 
  label, 
  value, 
  subtext, 
  trend 
}: { 
  label: string; 
  value: string; 
  subtext: string; 
  trend: "up" | "down" | "neutral";
}) => (
  <div className="bg-muted/50 rounded-xl p-4">
    <div className="text-xs text-muted-foreground mb-1">{label}</div>
    <div className="font-display text-2xl font-bold">{value}</div>
    <div className={`text-xs ${
      trend === "up" ? "text-success" : 
      trend === "down" ? "text-destructive" : 
      "text-muted-foreground"
    }`}>
      {subtext}
    </div>
  </div>
);
