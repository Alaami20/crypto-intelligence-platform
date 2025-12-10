import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Sparkles } from "lucide-react";

const cryptoData = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    price: "$67,432.18",
    change: "+4.23%",
    positive: true,
    signal: "Strong Buy",
    signalType: "bullish",
    icon: "₿",
    color: "from-orange-500/20 to-orange-600/10",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    price: "$3,542.87",
    change: "+2.81%",
    positive: true,
    signal: "Buy",
    signalType: "bullish",
    icon: "Ξ",
    color: "from-blue-500/20 to-blue-600/10",
  },
  {
    symbol: "SOL",
    name: "Solana",
    price: "$178.34",
    change: "+8.92%",
    positive: true,
    signal: "Strong Buy",
    signalType: "bullish",
    icon: "◎",
    color: "from-purple-500/20 to-purple-600/10",
  },
  {
    symbol: "XRP",
    name: "Ripple",
    price: "$0.5423",
    change: "-1.24%",
    positive: false,
    signal: "Hold",
    signalType: "neutral",
    icon: "✕",
    color: "from-slate-500/20 to-slate-600/10",
  },
  {
    symbol: "ADA",
    name: "Cardano",
    price: "$0.4892",
    change: "+5.67%",
    positive: true,
    signal: "Buy",
    signalType: "bullish",
    icon: "₳",
    color: "from-cyan-500/20 to-cyan-600/10",
  },
  {
    symbol: "AVAX",
    name: "Avalanche",
    price: "$42.15",
    change: "-2.34%",
    positive: false,
    signal: "Sell",
    signalType: "bearish",
    icon: "▲",
    color: "from-red-500/20 to-red-600/10",
  },
];

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

export const CryptoCards = () => {
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
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">Updated 30s ago</span>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {cryptoData.map((crypto) => (
            <motion.div key={crypto.symbol} variants={item}>
              <Card 
                variant="glass" 
                hover 
                className="p-5 relative overflow-hidden group"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${crypto.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${crypto.color} flex items-center justify-center text-xl font-bold`}>
                        {crypto.icon}
                      </div>
                      <div>
                        <div className="font-display font-semibold text-lg">{crypto.symbol}</div>
                        <div className="text-sm text-muted-foreground">{crypto.name}</div>
                      </div>
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${
                      crypto.signalType === "bullish" 
                        ? "bg-success/20 text-success" 
                        : crypto.signalType === "bearish"
                        ? "bg-destructive/20 text-destructive"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      <Sparkles className="w-3 h-3" />
                      {crypto.signal}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="font-display text-2xl font-bold">{crypto.price}</div>
                      <div className={`flex items-center gap-1 mt-1 ${
                        crypto.positive ? "text-success" : "text-destructive"
                      }`}>
                        {crypto.positive ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        <span className="text-sm font-medium">{crypto.change}</span>
                        <span className="text-xs text-muted-foreground ml-1">24h</span>
                      </div>
                    </div>

                    {/* Mini Chart Placeholder */}
                    <div className="w-24 h-12 flex items-end gap-0.5">
                      {[40, 55, 45, 60, 50, 70, 65, 80, 75, 85].map((h, i) => (
                        <div
                          key={i}
                          className={`flex-1 rounded-sm ${
                            crypto.positive ? "bg-success/60" : "bg-destructive/60"
                          }`}
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
