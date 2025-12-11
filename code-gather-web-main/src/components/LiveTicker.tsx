import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react";
import { useCryptoData, formatPrice } from "@/hooks/useCryptoData";

export const LiveTicker = () => {
  const { data, loading } = useCryptoData(15000);

  const tickerData = data?.cryptos.slice(0, 15) || [];

  if (loading && tickerData.length === 0) {
    return (
      <div className="w-full bg-card/80 border-b border-border/50 py-3">
        <div className="flex items-center justify-center gap-2">
          <RefreshCw className="w-4 h-4 animate-spin text-primary" />
          <span className="text-sm text-muted-foreground">Loading live prices...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-card/80 border-b border-border/50 overflow-hidden">
      <div className="flex items-center">
        <div className="flex-shrink-0 px-4 py-2 bg-primary/10 border-r border-border/50">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-xs font-medium text-primary">LIVE</span>
          </div>
        </div>
        <div className="overflow-hidden flex-1">
          <motion.div
            animate={{ x: [0, -2500] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-8 py-2 px-4"
          >
            {[...tickerData, ...tickerData].map((item, i) => (
              <div key={`${item.symbol}-${i}`} className="flex items-center gap-3 flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-5 h-5 rounded-full" />
                <span className="font-medium text-foreground">{item.symbol}</span>
                <span className="text-muted-foreground text-sm">{formatPrice(item.price)}</span>
                <span className={`flex items-center gap-1 text-sm ${item.change24h >= 0 ? "text-success" : "text-destructive"}`}>
                  {item.change24h >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {item.change24h >= 0 ? "+" : ""}{item.change24h.toFixed(2)}%
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
