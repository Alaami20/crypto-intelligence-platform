import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Zap, Brain, Shield, Play, ChevronRight, Sparkles, BarChart3, Globe, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCryptoData, formatPrice, formatMarketCap, formatVolume } from "@/hooks/useCryptoData";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const [isHovering, setIsHovering] = useState(false);
  const { data, loading } = useCryptoData(30000);
  const navigate = useNavigate();

  const bitcoin = data?.cryptos.find(c => c.symbol === "BTC");
  const ethereum = data?.cryptos.find(c => c.symbol === "ETH");
  const solana = data?.cryptos.find(c => c.symbol === "SOL");

  const sentiment = data?.sentiment || "Bullish";
  const sentimentScore = data?.sentimentScore || 72;
  const marketStats = data?.marketStats;

  const handleStartTrial = () => {
    // Scroll to pricing section
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleViewDemo = () => {
    // Scroll to crypto cards section (the demo)
    document.getElementById("signals")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/15 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-[200px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass text-sm mb-8"
          >
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-muted-foreground">Real-time market intelligence •</span>
            <span className="text-success font-medium">{marketStats?.activeCryptos?.toLocaleString() || "10,000+"} markets tracked</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] mb-8"
          >
            <span className="text-foreground">Decode the </span>
            <span className="text-gradient">Crypto Market</span>
            <br />
            <span className="text-foreground">with </span>
            <span className="text-gradient">AI Intelligence</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10"
          >
            Advanced machine learning algorithms analyze millions of data points to deliver 
            actionable signals, sentiment analysis, and predictive insights in real-time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button variant="glow" size="xl" className="w-full sm:w-auto" onClick={handleStartTrial}>
              <Sparkles className="w-5 h-5" />
              Start 7-Day Free Trial
              <ChevronRight className="w-5 h-5" />
            </Button>
            <Button 
              variant="glass" 
              size="xl" 
              className="w-full sm:w-auto group"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onClick={handleViewDemo}
            >
              <div className="relative w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-1">
                <Play className={`w-4 h-4 text-primary transition-transform ${isHovering ? "scale-110" : ""}`} />
              </div>
              View Live Demo
            </Button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-10"
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-5 h-5 text-success" />
              <span>Bank-grade security</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="w-5 h-5 text-success" />
              <span>87% accuracy rate</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="w-5 h-5 text-primary" />
              <span>50,000+ active users</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BarChart3 className="w-5 h-5 text-warning" />
              <span>{formatMarketCap(marketStats?.totalMarketCap || 2540000000000)} tracked</span>
            </div>
          </motion.div>
        </div>

        {/* Live Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative max-w-6xl mx-auto"
        >
          <div className="glass rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-2xl">
            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              {/* Market Sentiment */}
              <div className="md:col-span-2 bg-muted/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm text-muted-foreground">Global Market Sentiment</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                    <span className="text-xs text-success">LIVE</span>
                    {loading && <RefreshCw className="w-3 h-3 animate-spin text-muted-foreground" />}
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  {sentimentScore >= 50 ? (
                    <TrendingUp className="w-12 h-12 text-success" />
                  ) : (
                    <TrendingDown className="w-12 h-12 text-destructive" />
                  )}
                  <div>
                    <span className={`font-display text-4xl md:text-5xl font-bold ${sentimentScore >= 50 ? "text-success" : "text-destructive"}`}>
                      {sentiment}
                    </span>
                    <div className="text-sm text-muted-foreground mt-1">
                      Market {marketStats?.marketCapChange24h ? (marketStats.marketCapChange24h >= 0 ? "up" : "down") : ""} {Math.abs(marketStats?.marketCapChange24h || 0).toFixed(2)}% in 24h
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-3 flex-1 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${sentimentScore}%` }}
                      transition={{ duration: 1.5, delay: 0.8 }}
                      className={`h-full rounded-full ${sentimentScore >= 50 ? "bg-gradient-to-r from-success to-primary" : "bg-gradient-to-r from-destructive to-warning"}`}
                    />
                  </div>
                  <span className={`text-lg font-bold ${sentimentScore >= 50 ? "text-success" : "text-destructive"}`}>{sentimentScore}%</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="space-y-4">
                <StatCard
                  label="BTC Dominance"
                  value={`${marketStats?.btcDominance?.toFixed(1) || "52.4"}%`}
                  subtext={`ETH: ${marketStats?.ethDominance?.toFixed(1) || "18.2"}%`}
                  trend="up"
                />
                <StatCard
                  label="24h Volume"
                  value={formatVolume(marketStats?.totalVolume || 142000000000)}
                  subtext="Global trading"
                  trend="up"
                />
                <StatCard
                  label="Active AI Signals"
                  value={data?.cryptos.filter(c => c.signal.includes("Buy")).length?.toString() || "24"}
                  subtext={`${data?.cryptos.filter(c => c.signal === "Strong Buy").length || 8} strong buy`}
                  trend="neutral"
                />
              </div>
            </div>

            {/* Bottom Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border/30">
              <QuickStat icon={<TrendingUp className="w-4 h-4" />} label="Total Market Cap" value={formatMarketCap(marketStats?.totalMarketCap || 2540000000000)} change={`${marketStats?.marketCapChange24h?.toFixed(1) || "+3.2"}%`} />
              <QuickStat icon={<Globe className="w-4 h-4" />} label="Active Cryptos" value={marketStats?.activeCryptos?.toLocaleString() || "10,847"} change="Live" />
              <QuickStat icon={<Zap className="w-4 h-4" />} label="Buy Signals" value={data?.cryptos.filter(c => c.signal.includes("Buy")).length?.toString() || "32"} change="AI Generated" />
              <QuickStat icon={<Brain className="w-4 h-4" />} label="AI Predictions" value="15K+/hr" change="Live" />
            </div>
          </div>

          {/* Floating Elements */}
          {bitcoin && (
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-4 md:-right-8 glass rounded-xl p-4 shadow-xl hidden md:block"
            >
              <div className="flex items-center gap-3">
                <img src={bitcoin.image} alt="Bitcoin" className="w-10 h-10 rounded-full" />
                <div>
                  <div className="text-xs text-muted-foreground">Bitcoin</div>
                  <div className="font-semibold">{formatPrice(bitcoin.price)}</div>
                  <div className={`text-sm font-medium ${bitcoin.change24h >= 0 ? "text-success" : "text-destructive"}`}>
                    {bitcoin.change24h >= 0 ? "+" : ""}{bitcoin.change24h.toFixed(2)}%
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {ethereum && (
            <motion.div
              animate={{ y: [8, -8, 8] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute -bottom-4 -left-4 md:-left-8 glass rounded-xl p-4 shadow-xl hidden md:block"
            >
              <div className="flex items-center gap-3">
                <img src={ethereum.image} alt="Ethereum" className="w-10 h-10 rounded-full" />
                <div>
                  <div className="text-xs text-muted-foreground">Ethereum</div>
                  <div className="font-semibold">{formatPrice(ethereum.price)}</div>
                  <div className={`text-sm font-medium ${ethereum.change24h >= 0 ? "text-success" : "text-destructive"}`}>
                    {ethereum.change24h >= 0 ? "+" : ""}{ethereum.change24h.toFixed(2)}%
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {solana && (
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-1/2 -right-4 md:-right-12 glass rounded-xl p-3 shadow-xl hidden lg:block"
            >
              <div className="flex items-center gap-2">
                <Zap className={`w-5 h-5 ${solana.signal.includes("Buy") ? "text-success" : solana.signal.includes("Sell") ? "text-destructive" : "text-warning"}`} />
                <div>
                  <div className={`text-xs font-medium ${solana.signal.includes("Buy") ? "text-success" : solana.signal.includes("Sell") ? "text-destructive" : "text-warning"}`}>
                    {solana.signal}
                  </div>
                  <div className="text-xs text-muted-foreground">SOL Signal</div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
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
  <div className="bg-muted/30 rounded-xl p-4">
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

const QuickStat = ({
  icon,
  label,
  value,
  change,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
}) => (
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-primary">
      {icon}
    </div>
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-semibold">{value}</div>
      <div className="text-xs text-success">{change}</div>
    </div>
  </div>
);
