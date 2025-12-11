import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Star, ArrowUpRight, Flame, Sparkles, Zap, Clock, RefreshCw } from "lucide-react";
import { useState } from "react";
import { useCryptoData, formatPrice, formatMarketCap, formatVolume } from "@/hooks/useCryptoData";

const categories = [
  { id: "all", label: "All Markets", icon: Sparkles },
  { id: "trending", label: "Trending", icon: Flame },
  { id: "gainers", label: "Top Gainers", icon: TrendingUp },
  { id: "signals", label: "AI Signals", icon: Zap },
  { id: "recent", label: "Recently Added", icon: Clock },
];

const getSignalColor = (signal: string) => {
  switch (signal) {
    case "Strong Buy":
      return "text-success";
    case "Buy":
      return "text-success";
    case "Strong Sell":
      return "text-destructive";
    case "Sell":
      return "text-destructive";
    default:
      return "text-warning";
  }
};

export const AllMarkets = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const [starred, setStarred] = useState<Set<string>>(new Set(["bitcoin", "ethereum"]));
  const { data, loading, refetch } = useCryptoData(30000);

  const cryptos = data?.cryptos || [];

  // Filter based on category
  let filteredCryptos = cryptos;
  if (activeCategory === "gainers") {
    filteredCryptos = [...cryptos].sort((a, b) => b.change24h - a.change24h);
  } else if (activeCategory === "signals") {
    filteredCryptos = cryptos.filter(c => c.signal === "Strong Buy" || c.signal === "Buy");
  } else if (activeCategory === "trending") {
    filteredCryptos = [...cryptos].sort((a, b) => b.volume - a.volume);
  }

  const displayedData = showAll ? filteredCryptos : filteredCryptos.slice(0, 12);

  const toggleStar = (id: string) => {
    setStarred(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              <span className="text-gradient">All Markets</span>
            </h2>
            <button
              onClick={refetch}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              title="Refresh prices"
            >
              <RefreshCw className={`w-5 h-5 text-muted-foreground ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Track {data?.marketStats?.activeCryptos?.toLocaleString() || "10,000+"} cryptocurrencies with real-time AI signals, price alerts, and market intelligence.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "ghost"}
              className={activeCategory === category.id ? "bg-primary/20 text-primary border border-primary/30" : "text-muted-foreground"}
              onClick={() => setActiveCategory(category.id)}
            >
              <category.icon className="w-4 h-4 mr-2" />
              {category.label}
            </Button>
          ))}
        </div>

        {/* Markets Table */}
        <Card variant="glass" className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground">#</th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground">Asset</th>
                  <th className="text-right p-4 text-xs font-medium text-muted-foreground">Price</th>
                  <th className="text-right p-4 text-xs font-medium text-muted-foreground">1h</th>
                  <th className="text-right p-4 text-xs font-medium text-muted-foreground">24h</th>
                  <th className="text-right p-4 text-xs font-medium text-muted-foreground hidden md:table-cell">7d</th>
                  <th className="text-right p-4 text-xs font-medium text-muted-foreground hidden lg:table-cell">Market Cap</th>
                  <th className="text-right p-4 text-xs font-medium text-muted-foreground hidden lg:table-cell">Volume</th>
                  <th className="text-center p-4 text-xs font-medium text-muted-foreground">AI Signal</th>
                  <th className="text-center p-4 text-xs font-medium text-muted-foreground"></th>
                </tr>
              </thead>
              <tbody>
                {loading && displayedData.length === 0 ? (
                  [...Array(8)].map((_, i) => (
                    <tr key={i} className="border-b border-border/30">
                      <td colSpan={10} className="p-4">
                        <div className="h-10 bg-muted/50 rounded animate-pulse" />
                      </td>
                    </tr>
                  ))
                ) : (
                  displayedData.map((coin, i) => (
                    <motion.tr
                      key={coin.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-border/30 hover:bg-muted/30 transition-colors cursor-pointer group"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button onClick={() => toggleStar(coin.id)}>
                            <Star className={`w-4 h-4 ${starred.has(coin.id) ? "text-warning fill-warning" : "text-muted-foreground hover:text-warning"}`} />
                          </button>
                          <span className="text-muted-foreground">{coin.rank}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                          <div>
                            <div className="font-medium">{coin.name}</div>
                            <div className="text-xs text-muted-foreground">{coin.symbol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-right font-medium">{formatPrice(coin.price)}</td>
                      <td className="p-4 text-right">
                        <span className={coin.change1h >= 0 ? "text-success" : "text-destructive"}>
                          {coin.change1h >= 0 ? "+" : ""}{coin.change1h?.toFixed(2) || "0.00"}%
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <span className={`flex items-center justify-end gap-1 ${coin.change24h >= 0 ? "text-success" : "text-destructive"}`}>
                          {coin.change24h >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {coin.change24h >= 0 ? "+" : ""}{coin.change24h.toFixed(2)}%
                        </span>
                      </td>
                      <td className="p-4 text-right hidden md:table-cell">
                        <span className={coin.change7d >= 0 ? "text-success" : "text-destructive"}>
                          {coin.change7d >= 0 ? "+" : ""}{coin.change7d?.toFixed(2) || "0.00"}%
                        </span>
                      </td>
                      <td className="p-4 text-right text-muted-foreground hidden lg:table-cell">{formatMarketCap(coin.marketCap)}</td>
                      <td className="p-4 text-right text-muted-foreground hidden lg:table-cell">{formatVolume(coin.volume)}</td>
                      <td className="p-4 text-center">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-muted ${getSignalColor(coin.signal)}`}>
                          <Zap className="w-3 h-3" />
                          {coin.signal}
                        </span>
                      </td>
                      <td className="p-4">
                        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <ArrowUpRight className="w-4 h-4" />
                        </Button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Load More Button */}
        <div className="flex justify-center mt-8">
          <Button variant="glass" size="lg" onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show Less" : `View All ${cryptos.length}+ Markets`}
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};
