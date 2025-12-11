import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCryptoData, formatPrice, formatMarketCap } from "@/hooks/useCryptoData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AIPredictions } from "@/components/AIPredictions";
import { 
  Sparkles, TrendingUp, TrendingDown, Brain, 
  Zap, Target, AlertTriangle, CheckCircle2, 
  ArrowRight, BarChart3, Activity
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function AISignalsPage() {
  const { data, loading } = useCryptoData(30000);
  const [filter, setFilter] = useState("all");

  const getSignalIcon = (signal: string) => {
    if (signal === "Strong Buy") return <CheckCircle2 className="w-5 h-5 text-success" />;
    if (signal === "Buy") return <TrendingUp className="w-5 h-5 text-success" />;
    if (signal === "Strong Sell") return <AlertTriangle className="w-5 h-5 text-destructive" />;
    if (signal === "Sell") return <TrendingDown className="w-5 h-5 text-destructive" />;
    return <Target className="w-5 h-5 text-warning" />;
  };

  const getSignalColor = (signal: string) => {
    if (signal.includes("Buy")) return "bg-success/20 border-success/40 text-success";
    if (signal.includes("Sell")) return "bg-destructive/20 border-destructive/40 text-destructive";
    return "bg-warning/20 border-warning/40 text-warning";
  };

  const filteredCryptos = data?.cryptos?.filter(crypto => {
    if (filter === "all") return true;
    if (filter === "buy") return crypto.signal.toLowerCase().includes("buy");
    if (filter === "sell") return crypto.signal.toLowerCase().includes("sell");
    if (filter === "hold") return crypto.signal === "Hold";
    return true;
  }) || [];

  const signalCounts = {
    strongBuy: data?.cryptos?.filter(c => c.signal === "Strong Buy").length || 0,
    buy: data?.cryptos?.filter(c => c.signal === "Buy").length || 0,
    hold: data?.cryptos?.filter(c => c.signal === "Hold").length || 0,
    sell: data?.cryptos?.filter(c => c.signal === "Sell").length || 0,
    strongSell: data?.cryptos?.filter(c => c.signal === "Strong Sell").length || 0,
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent">
              <Brain className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">AI Trading Signals</h1>
          </div>
          <p className="text-muted-foreground">
            Real-time AI-powered trading signals and price predictions
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="signals" className="space-y-6">
          <TabsList className="glass">
            <TabsTrigger value="signals" className="gap-2">
              <Sparkles className="w-4 h-4" />
              Trading Signals
            </TabsTrigger>
            <TabsTrigger value="predictions" className="gap-2">
              <Brain className="w-4 h-4" />
              AI Predictions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="signals" className="space-y-6">
            {/* Signal Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 md:grid-cols-5 gap-4"
            >
              <button
                onClick={() => setFilter("all")}
                className={`glass rounded-xl p-4 text-left transition-all hover:scale-105 ${filter === "all" ? "ring-2 ring-primary" : ""}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">All Signals</span>
                </div>
                <p className="text-2xl font-bold">{data?.cryptos?.length || 0}</p>
              </button>
              
              <button
                onClick={() => setFilter("buy")}
                className={`glass rounded-xl p-4 text-left transition-all hover:scale-105 ${filter === "buy" ? "ring-2 ring-success" : ""}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-success" />
                  <span className="text-xs text-muted-foreground">Buy Signals</span>
                </div>
                <p className="text-2xl font-bold text-success">{signalCounts.strongBuy + signalCounts.buy}</p>
              </button>

              <button
                onClick={() => setFilter("hold")}
                className={`glass rounded-xl p-4 text-left transition-all hover:scale-105 ${filter === "hold" ? "ring-2 ring-warning" : ""}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-warning" />
                  <span className="text-xs text-muted-foreground">Hold Signals</span>
                </div>
                <p className="text-2xl font-bold text-warning">{signalCounts.hold}</p>
              </button>

              <button
                onClick={() => setFilter("sell")}
                className={`glass rounded-xl p-4 text-left transition-all hover:scale-105 ${filter === "sell" ? "ring-2 ring-destructive" : ""}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="w-4 h-4 text-destructive" />
                  <span className="text-xs text-muted-foreground">Sell Signals</span>
                </div>
                <p className="text-2xl font-bold text-destructive">{signalCounts.sell + signalCounts.strongSell}</p>
              </button>

              <div className="glass rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground">Market Sentiment</span>
                </div>
                <p className={`text-lg font-bold ${data?.sentiment?.includes('Bull') ? 'text-success' : data?.sentiment?.includes('Bear') ? 'text-destructive' : 'text-warning'}`}>
                  {data?.sentiment || "Loading..."}
                </p>
              </div>
            </motion.div>

            {/* Signals Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {loading ? (
                Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="glass rounded-2xl p-6 animate-pulse">
                    <div className="h-16 bg-muted/30 rounded mb-4" />
                    <div className="h-8 bg-muted/30 rounded" />
                  </div>
                ))
              ) : (
                filteredCryptos.map((crypto, index) => (
                  <motion.div
                    key={crypto.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.02 }}
                    className="glass rounded-2xl p-6 card-hover"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <img src={crypto.image} alt={crypto.name} className="w-12 h-12 rounded-full" />
                        <div>
                          <p className="font-semibold">{crypto.name}</p>
                          <p className="text-sm text-muted-foreground">{crypto.symbol}</p>
                        </div>
                      </div>
                      {getSignalIcon(crypto.signal)}
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <p className="text-2xl font-bold">{formatPrice(crypto.price)}</p>
                      <Badge className={`${getSignalColor(crypto.signal)} border font-semibold`}>
                        {crypto.signal}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                      <div className="p-2 bg-muted/30 rounded-lg">
                        <p className="text-xs text-muted-foreground">1h</p>
                        <p className={`text-sm font-medium ${crypto.change1h >= 0 ? 'text-success' : 'text-destructive'}`}>
                          {crypto.change1h >= 0 ? '+' : ''}{crypto.change1h.toFixed(2)}%
                        </p>
                      </div>
                      <div className="p-2 bg-muted/30 rounded-lg">
                        <p className="text-xs text-muted-foreground">24h</p>
                        <p className={`text-sm font-medium ${crypto.change24h >= 0 ? 'text-success' : 'text-destructive'}`}>
                          {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                        </p>
                      </div>
                      <div className="p-2 bg-muted/30 rounded-lg">
                        <p className="text-xs text-muted-foreground">7d</p>
                        <p className={`text-sm font-medium ${crypto.change7d >= 0 ? 'text-success' : 'text-destructive'}`}>
                          {crypto.change7d >= 0 ? '+' : ''}{crypto.change7d.toFixed(2)}%
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Market Cap: {formatMarketCap(crypto.marketCap)}</span>
                      <span>Rank #{crypto.rank}</span>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          </TabsContent>

          <TabsContent value="predictions">
            <AIPredictions />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}