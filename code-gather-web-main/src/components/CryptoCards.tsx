import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Sparkles, RefreshCw } from "lucide-react";
import { useCryptoData, formatPrice, CryptoData } from "@/hooks/useCryptoData";
import { useState } from "react";
import { CryptoDetailSheet } from "./CryptoDetailSheet";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const getIconBg = (symbol: string) => {
  const colors: Record<string, string> = {
    BTC: "from-orange-500 to-orange-600",
    ETH: "from-blue-400 to-blue-600",
    SOL: "from-purple-400 to-purple-600",
    XRP: "from-slate-400 to-slate-600",
    BNB: "from-yellow-400 to-yellow-600",
    ADA: "from-cyan-400 to-cyan-600",
    AVAX: "from-red-400 to-red-600",
    DOGE: "from-amber-400 to-amber-600",
    DOT: "from-pink-400 to-pink-600",
    MATIC: "from-violet-400 to-violet-600",
  };
  return colors[symbol] || "from-primary to-accent";
};

const SparklineChart = ({ data, positive }: { data: number[]; positive: boolean }) => {
  if (!data || data.length === 0) {
    // Generate random bars if no data
    const bars = Array.from({ length: 12 }, () => Math.random() * 60 + 40);
    return (
      <div className="w-24 h-12 flex items-end gap-0.5">
        {bars.map((h, i) => (
          <div
            key={i}
            className={`flex-1 rounded-sm ${positive ? "bg-success/70" : "bg-destructive/70"}`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    );
  }

  // Sample sparkline data to get 12 points
  const step = Math.floor(data.length / 12);
  const sampledData = Array.from({ length: 12 }, (_, i) => data[Math.min(i * step, data.length - 1)] || 0);
  
  const min = Math.min(...sampledData);
  const max = Math.max(...sampledData);
  const range = max - min || 1;
  
  const normalizedData = sampledData.map(v => ((v - min) / range) * 60 + 30);

  return (
    <div className="w-24 h-12 flex items-end gap-0.5">
      {normalizedData.map((h, i) => (
        <div
          key={i}
          className={`flex-1 rounded-sm transition-all ${positive ? "bg-success/70" : "bg-destructive/70"}`}
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
};

export const CryptoCards = () => {
  const { data, loading, error } = useCryptoData(15000); // Update every 15s for more real-time feel
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoData | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  
  // Get top 6 cryptos
  const topCryptos = data?.cryptos?.slice(0, 6) || [];

  const handleCryptoClick = (crypto: CryptoData) => {
    setSelectedCrypto(crypto);
    setSheetOpen(true);
  };

  const getSignalStyle = (signal: string) => {
    if (signal === "Strong Buy") return "bg-success/20 text-success border border-success/30";
    if (signal === "Buy") return "bg-success/20 text-success border border-success/30";
    if (signal === "Sell") return "bg-destructive/20 text-destructive border border-destructive/30";
    if (signal === "Strong Sell") return "bg-destructive/20 text-destructive border border-destructive/30";
    return "bg-warning/20 text-warning border border-warning/30";
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold">
              Top <span className="text-gradient">AI Signals</span>
            </h2>
            <p className="text-muted-foreground mt-1">Real-time analysis powered by machine learning</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-primary">
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">
              {data?.lastUpdated 
                ? `Updated ${new Date(data.lastUpdated).toLocaleTimeString()}`
                : "Loading..."
              }
            </span>
          </div>
        </motion.div>

        {loading && topCryptos.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} variant="glass" className="p-5 animate-pulse">
                <div className="h-20 bg-muted/30 rounded" />
              </Card>
            ))}
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {topCryptos.map((crypto) => (
              <motion.div key={crypto.id} variants={item}>
                <Card 
                  variant="glass" 
                  hover 
                  className="p-5 relative overflow-hidden group cursor-pointer"
                  onClick={() => handleCryptoClick(crypto)}
                >
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getIconBg(crypto.symbol)} flex items-center justify-center overflow-hidden`}>
                          <img 
                            src={crypto.image} 
                            alt={crypto.name} 
                            className="w-8 h-8 rounded-full"
                          />
                        </div>
                        <div>
                          <div className="font-display font-semibold text-lg">{crypto.symbol}</div>
                          <div className="text-sm text-muted-foreground">{crypto.name}</div>
                        </div>
                      </div>
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${getSignalStyle(crypto.signal)}`}>
                        <Sparkles className="w-3 h-3" />
                        {crypto.signal}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="font-display text-2xl font-bold">
                          {formatPrice(crypto.price)}
                        </div>
                        <div className={`flex items-center gap-1 mt-1 ${
                          crypto.change24h >= 0 ? "text-success" : "text-destructive"
                        }`}>
                          {crypto.change24h >= 0 ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          )}
                          <span className="text-sm font-medium">
                            {crypto.change24h >= 0 ? "+" : ""}{crypto.change24h.toFixed(2)}%
                          </span>
                          <span className="text-xs text-muted-foreground ml-1">24h</span>
                        </div>
                      </div>

                      {/* Sparkline Chart */}
                      <SparklineChart 
                        data={crypto.sparkline} 
                        positive={crypto.change24h >= 0} 
                      />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        <CryptoDetailSheet
          crypto={selectedCrypto}
          open={sheetOpen}
          onOpenChange={setSheetOpen}
        />
      </div>
    </section>
  );
};