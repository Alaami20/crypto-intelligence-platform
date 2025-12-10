import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ExternalLink, TrendingUp, TrendingDown } from "lucide-react";

const news = [
  {
    id: 1,
    title: "SEC Approves Spot Bitcoin ETF Options Trading",
    source: "Reuters",
    time: "1h ago",
    impact: "bullish",
    category: "Regulation",
    summary: "The SEC has approved options trading on spot Bitcoin ETFs, potentially opening new avenues for institutional investment.",
  },
  {
    id: 2,
    title: "Ethereum Foundation Announces Major Protocol Upgrade",
    source: "CoinDesk",
    time: "3h ago",
    impact: "bullish",
    category: "Technology",
    summary: "New upgrade promises 40% improvement in transaction throughput and reduced gas fees for L2 solutions.",
  },
  {
    id: 3,
    title: "Major Bank Warns of Crypto Market Volatility",
    source: "Bloomberg",
    time: "5h ago",
    impact: "bearish",
    category: "Analysis",
    summary: "Goldman Sachs analysts predict increased volatility ahead of upcoming Federal Reserve meeting.",
  },
  {
    id: 4,
    title: "Solana Network Processes Record 65M Daily Transactions",
    source: "The Block",
    time: "6h ago",
    impact: "bullish",
    category: "Network",
    summary: "Solana achieves new milestone as DeFi and NFT activity surge on the network.",
  },
];

export const NewsSection = () => {
  return (
    <section className="py-16 border-t border-border/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold">
            Market <span className="text-gradient">News</span>
          </h2>
          <p className="text-muted-foreground mt-1">AI-curated news impacting the market</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {news.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                variant="glass" 
                hover 
                className="p-5 h-full group"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                    <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${
                      item.impact === "bullish" 
                        ? "bg-success/20 text-success" 
                        : "bg-destructive/20 text-destructive"
                    }`}>
                      {item.impact === "bullish" ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {item.impact}
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {item.summary}
                </p>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-medium">{item.source}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.time}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
