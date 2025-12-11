import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCryptoData, formatPrice, formatMarketCap, formatVolume } from "@/hooks/useCryptoData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, TrendingUp, TrendingDown, Star, Filter, 
  ArrowUpDown, RefreshCw, Sparkles, BarChart3 
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function MarketsPage() {
  const { data, loading, refetch } = useCryptoData(30000);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("rank");
  const [filterSignal, setFilterSignal] = useState("all");
  const [watchlist, setWatchlist] = useState<string[]>([]);

  const toggleWatchlist = (id: string) => {
    setWatchlist(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const filteredCryptos = data?.cryptos
    ?.filter(crypto => 
      crypto.name.toLowerCase().includes(search.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(search.toLowerCase())
    )
    ?.filter(crypto => 
      filterSignal === "all" ? true : crypto.signal.toLowerCase().includes(filterSignal)
    )
    ?.sort((a, b) => {
      switch(sortBy) {
        case "price": return b.price - a.price;
        case "change24h": return b.change24h - a.change24h;
        case "marketCap": return b.marketCap - a.marketCap;
        case "volume": return b.volume - a.volume;
        default: return a.rank - b.rank;
      }
    }) || [];

  const getSignalColor = (signal: string) => {
    if (signal.includes("Buy")) return "text-success";
    if (signal.includes("Sell")) return "text-destructive";
    return "text-warning";
  };

  const getSignalBg = (signal: string) => {
    if (signal.includes("Buy")) return "bg-success/20 border-success/30";
    if (signal.includes("Sell")) return "bg-destructive/20 border-destructive/30";
    return "bg-warning/20 border-warning/30";
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
            <BarChart3 className="w-8 h-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-display font-bold">All Markets</h1>
          </div>
          <p className="text-muted-foreground">
            Real-time prices for {data?.cryptos?.length || 100}+ cryptocurrencies with AI-powered signals
          </p>
          {data?.lastUpdated && (
            <p className="text-xs text-muted-foreground mt-1">
              Last updated: {new Date(data.lastUpdated).toLocaleTimeString()}
            </p>
          )}
        </motion.div>

        {/* Market Stats Bar */}
        {data?.marketStats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
          >
            <div className="glass rounded-xl p-4">
              <p className="text-xs text-muted-foreground">Total Market Cap</p>
              <p className="text-lg font-bold">{formatMarketCap(data.marketStats.totalMarketCap)}</p>
              <p className={`text-xs ${data.marketStats.marketCapChange24h >= 0 ? 'text-success' : 'text-destructive'}`}>
                {data.marketStats.marketCapChange24h >= 0 ? '+' : ''}{data.marketStats.marketCapChange24h.toFixed(2)}%
              </p>
            </div>
            <div className="glass rounded-xl p-4">
              <p className="text-xs text-muted-foreground">24h Volume</p>
              <p className="text-lg font-bold">{formatVolume(data.marketStats.totalVolume)}</p>
            </div>
            <div className="glass rounded-xl p-4">
              <p className="text-xs text-muted-foreground">BTC Dominance</p>
              <p className="text-lg font-bold">{data.marketStats.btcDominance.toFixed(1)}%</p>
            </div>
            <div className="glass rounded-xl p-4">
              <p className="text-xs text-muted-foreground">ETH Dominance</p>
              <p className="text-lg font-bold">{data.marketStats.ethDominance.toFixed(1)}%</p>
            </div>
            <div className="glass rounded-xl p-4">
              <p className="text-xs text-muted-foreground">Market Sentiment</p>
              <p className={`text-lg font-bold ${data.sentiment.includes('Bull') ? 'text-success' : data.sentiment.includes('Bear') ? 'text-destructive' : 'text-warning'}`}>
                {data.sentiment}
              </p>
            </div>
          </motion.div>
        )}

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-6"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search cryptocurrencies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-card/50 border-border/50"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48 bg-card/50">
              <ArrowUpDown className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rank">Rank</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="change24h">24h Change</SelectItem>
              <SelectItem value="marketCap">Market Cap</SelectItem>
              <SelectItem value="volume">Volume</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterSignal} onValueChange={setFilterSignal}>
            <SelectTrigger className="w-full md:w-48 bg-card/50">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter signals" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Signals</SelectItem>
              <SelectItem value="buy">Buy Signals</SelectItem>
              <SelectItem value="sell">Sell Signals</SelectItem>
              <SelectItem value="hold">Hold Signals</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={refetch} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </motion.div>

        {/* Markets Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/30">
                <tr className="text-xs text-muted-foreground uppercase">
                  <th className="text-left p-4 w-12"></th>
                  <th className="text-left p-4">#</th>
                  <th className="text-left p-4">Name</th>
                  <th className="text-right p-4">Price</th>
                  <th className="text-right p-4">1h %</th>
                  <th className="text-right p-4">24h %</th>
                  <th className="text-right p-4">7d %</th>
                  <th className="text-right p-4">Market Cap</th>
                  <th className="text-right p-4">Volume (24h)</th>
                  <th className="text-center p-4">AI Signal</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 20 }).map((_, i) => (
                    <tr key={i} className="border-t border-border/30">
                      <td colSpan={10} className="p-4">
                        <div className="h-12 bg-muted/30 rounded animate-pulse" />
                      </td>
                    </tr>
                  ))
                ) : (
                  filteredCryptos.map((crypto, index) => (
                    <motion.tr
                      key={crypto.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.02 }}
                      className="border-t border-border/30 hover:bg-muted/20 transition-colors"
                    >
                      <td className="p-4">
                        <button
                          onClick={() => toggleWatchlist(crypto.id)}
                          className="text-muted-foreground hover:text-warning transition-colors"
                        >
                          <Star className={`w-4 h-4 ${watchlist.includes(crypto.id) ? 'fill-warning text-warning' : ''}`} />
                        </button>
                      </td>
                      <td className="p-4 text-muted-foreground">{crypto.rank}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img src={crypto.image} alt={crypto.name} className="w-8 h-8 rounded-full" />
                          <div>
                            <p className="font-medium">{crypto.name}</p>
                            <p className="text-xs text-muted-foreground">{crypto.symbol}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-right font-mono font-medium">
                        {formatPrice(crypto.price)}
                      </td>
                      <td className={`p-4 text-right font-mono ${crypto.change1h >= 0 ? 'text-success' : 'text-destructive'}`}>
                        <div className="flex items-center justify-end gap-1">
                          {crypto.change1h >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {crypto.change1h.toFixed(2)}%
                        </div>
                      </td>
                      <td className={`p-4 text-right font-mono ${crypto.change24h >= 0 ? 'text-success' : 'text-destructive'}`}>
                        <div className="flex items-center justify-end gap-1">
                          {crypto.change24h >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {crypto.change24h.toFixed(2)}%
                        </div>
                      </td>
                      <td className={`p-4 text-right font-mono ${crypto.change7d >= 0 ? 'text-success' : 'text-destructive'}`}>
                        {crypto.change7d.toFixed(2)}%
                      </td>
                      <td className="p-4 text-right font-mono text-muted-foreground">
                        {formatMarketCap(crypto.marketCap)}
                      </td>
                      <td className="p-4 text-right font-mono text-muted-foreground">
                        {formatVolume(crypto.volume)}
                      </td>
                      <td className="p-4 text-center">
                        <Badge className={`${getSignalBg(crypto.signal)} ${getSignalColor(crypto.signal)} border`}>
                          <Sparkles className="w-3 h-3 mr-1" />
                          {crypto.signal}
                        </Badge>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}