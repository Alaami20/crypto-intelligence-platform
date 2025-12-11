import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Plus, Wallet, PieChart, ArrowUpRight, Eye, EyeOff, RefreshCw } from "lucide-react";
import { useState } from "react";

const portfolioHoldings = [
  { symbol: "BTC", name: "Bitcoin", amount: "0.5234", value: "$35,201.45", change: "+$1,423.12", changePercent: "+4.2%", isUp: true, allocation: 45 },
  { symbol: "ETH", name: "Ethereum", amount: "4.2156", value: "$14,567.23", change: "+$389.45", changePercent: "+2.8%", isUp: true, allocation: 25 },
  { symbol: "SOL", name: "Solana", amount: "52.34", value: "$7,451.23", change: "+$582.34", changePercent: "+8.5%", isUp: true, allocation: 15 },
  { symbol: "LINK", name: "Chainlink", amount: "156.78", value: "$2,282.71", change: "+$134.56", changePercent: "+6.2%", isUp: true, allocation: 8 },
  { symbol: "ADA", name: "Cardano", amount: "2,345.67", value: "$1,060.57", change: "-$8.56", changePercent: "-0.8%", isUp: false, allocation: 4 },
  { symbol: "AVAX", name: "Avalanche", amount: "28.45", value: "$1,014.81", change: "+$52.34", changePercent: "+5.4%", isUp: true, allocation: 3 },
];

const portfolioStats = [
  { label: "24h Change", value: "+$2,573.25", subtext: "+4.12%", isUp: true },
  { label: "7d Change", value: "+$8,234.56", subtext: "+15.2%", isUp: true },
  { label: "30d Change", value: "+$12,456.78", subtext: "+24.8%", isUp: true },
  { label: "All Time P/L", value: "+$28,456.78", subtext: "+84.2%", isUp: true },
];

export const Portfolio = () => {
  const [showBalances, setShowBalances] = useState(true);
  const totalValue = "$61,578.00";
  const totalChange = "+$2,573.25";

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-card/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-12"
        >
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
              <span className="text-gradient">Portfolio Tracker</span>
            </h2>
            <p className="text-muted-foreground">
              Real-time portfolio tracking with AI-powered insights and recommendations.
            </p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button variant="glass" size="sm" onClick={() => setShowBalances(!showBalances)}>
              {showBalances ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {showBalances ? "Hide" : "Show"}
            </Button>
            <Button variant="glass" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Sync
            </Button>
            <Button variant="glow" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Asset
            </Button>
          </div>
        </motion.div>

        {/* Portfolio Overview */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Main Balance Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card variant="glass" className="p-6 h-full">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Wallet className="w-5 h-5" />
                    <span>Total Portfolio Value</span>
                  </div>
                  <div className="font-display text-4xl md:text-5xl font-bold">
                    {showBalances ? totalValue : "••••••"}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <TrendingUp className="w-5 h-5 text-success" />
                    <span className="text-success font-medium">{showBalances ? totalChange : "••••"}</span>
                    <span className="text-muted-foreground">(24h)</span>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="w-32 h-32 rounded-full border-8 border-primary/30 relative">
                    <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <PieChart className="w-10 h-10 text-primary-foreground" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {portfolioStats.map((stat, i) => (
                  <div key={i} className="bg-muted/50 rounded-xl p-4">
                    <div className="text-xs text-muted-foreground mb-1">{stat.label}</div>
                    <div className={`font-semibold ${stat.isUp ? "text-success" : "text-destructive"}`}>
                      {showBalances ? stat.value : "••••"}
                    </div>
                    <div className={`text-xs ${stat.isUp ? "text-success/70" : "text-destructive/70"}`}>
                      {stat.subtext}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Allocation Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Card variant="glass" className="p-6 h-full">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-primary" />
                Allocation
              </h3>
              <div className="space-y-3">
                {portfolioHoldings.slice(0, 5).map((holding, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-xs font-bold">
                      {holding.symbol.slice(0, 2)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm">
                        <span>{holding.symbol}</span>
                        <span className="text-muted-foreground">{holding.allocation}%</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full mt-1 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${holding.allocation}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: i * 0.1 }}
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Holdings Table */}
        <Card variant="glass" className="overflow-hidden">
          <div className="p-4 border-b border-border/50 flex items-center justify-between">
            <h3 className="font-semibold">Your Holdings</h3>
            <span className="text-sm text-muted-foreground">{portfolioHoldings.length} assets</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground">Asset</th>
                  <th className="text-right p-4 text-xs font-medium text-muted-foreground">Holdings</th>
                  <th className="text-right p-4 text-xs font-medium text-muted-foreground">Value</th>
                  <th className="text-right p-4 text-xs font-medium text-muted-foreground">24h P/L</th>
                  <th className="text-center p-4 text-xs font-medium text-muted-foreground"></th>
                </tr>
              </thead>
              <tbody>
                {portfolioHoldings.map((holding, i) => (
                  <motion.tr
                    key={holding.symbol}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-border/30 hover:bg-muted/30 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center font-bold text-sm">
                          {holding.symbol.slice(0, 2)}
                        </div>
                        <div>
                          <div className="font-medium">{holding.name}</div>
                          <div className="text-xs text-muted-foreground">{holding.symbol}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="font-medium">{showBalances ? holding.amount : "••••"}</div>
                      <div className="text-xs text-muted-foreground">{holding.symbol}</div>
                    </td>
                    <td className="p-4 text-right font-medium">{showBalances ? holding.value : "••••••"}</td>
                    <td className="p-4 text-right">
                      <div className={holding.isUp ? "text-success" : "text-destructive"}>
                        {showBalances ? holding.change : "••••"}
                      </div>
                      <div className={`text-xs ${holding.isUp ? "text-success/70" : "text-destructive/70"}`}>
                        {holding.changePercent}
                      </div>
                    </td>
                    <td className="p-4">
                      <Button variant="ghost" size="icon">
                        <ArrowUpRight className="w-4 h-4" />
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </section>
  );
};
