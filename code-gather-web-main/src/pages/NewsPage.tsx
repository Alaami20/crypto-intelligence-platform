import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Newspaper, Clock, ExternalLink, TrendingUp, 
  TrendingDown, Zap, Globe, Filter
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  source: string;
  time: string;
  sentiment: "bullish" | "bearish" | "neutral";
  category: string;
  coins: string[];
}

const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "Bitcoin Surges Past $100K as Institutional Demand Grows",
    description: "Bitcoin has broken through the psychological $100,000 barrier as major institutions continue to accumulate BTC amid growing adoption.",
    source: "CryptoNews",
    time: "2 hours ago",
    sentiment: "bullish",
    category: "Market",
    coins: ["BTC"]
  },
  {
    id: "2",
    title: "Ethereum 2.0 Staking Rewards Reach All-Time High",
    description: "ETH staking yields have increased significantly following the latest network upgrade, attracting more validators to the network.",
    source: "DeFi Pulse",
    time: "4 hours ago",
    sentiment: "bullish",
    category: "Technology",
    coins: ["ETH"]
  },
  {
    id: "3",
    title: "SEC Announces New Cryptocurrency Regulatory Framework",
    description: "The Securities and Exchange Commission has unveiled comprehensive guidelines for cryptocurrency exchanges and token issuers.",
    source: "Reuters",
    time: "6 hours ago",
    sentiment: "neutral",
    category: "Regulation",
    coins: []
  },
  {
    id: "4",
    title: "Solana Network Processes Record 100M Transactions Daily",
    description: "Solana blockchain achieves a major milestone, processing over 100 million transactions in a single day with minimal fees.",
    source: "The Block",
    time: "8 hours ago",
    sentiment: "bullish",
    category: "Technology",
    coins: ["SOL"]
  },
  {
    id: "5",
    title: "Major Bank Launches Bitcoin Custody Services",
    description: "One of the world's largest banks has announced the launch of cryptocurrency custody services for institutional clients.",
    source: "Bloomberg",
    time: "10 hours ago",
    sentiment: "bullish",
    category: "Adoption",
    coins: ["BTC"]
  },
  {
    id: "6",
    title: "DeFi Protocol Suffers $50M Exploit",
    description: "A popular decentralized finance protocol has been exploited due to a smart contract vulnerability, resulting in significant losses.",
    source: "CoinDesk",
    time: "12 hours ago",
    sentiment: "bearish",
    category: "Security",
    coins: []
  },
  {
    id: "7",
    title: "XRP Wins Key Legal Battle Against SEC",
    description: "Ripple Labs secures a favorable ruling in its ongoing legal dispute with the SEC, clearing regulatory uncertainty.",
    source: "Law360",
    time: "14 hours ago",
    sentiment: "bullish",
    category: "Regulation",
    coins: ["XRP"]
  },
  {
    id: "8",
    title: "NFT Market Shows Signs of Recovery",
    description: "Trading volumes in the NFT market have increased by 40% this month, signaling renewed interest in digital collectibles.",
    source: "NFT Now",
    time: "16 hours ago",
    sentiment: "bullish",
    category: "NFT",
    coins: ["ETH", "SOL"]
  },
];

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>(mockNews);
  const [filter, setFilter] = useState("all");
  const [sentimentFilter, setSentimentFilter] = useState("all");

  const filteredNews = news.filter(item => {
    const categoryMatch = filter === "all" || item.category.toLowerCase() === filter.toLowerCase();
    const sentimentMatch = sentimentFilter === "all" || item.sentiment === sentimentFilter;
    return categoryMatch && sentimentMatch;
  });

  const getSentimentIcon = (sentiment: string) => {
    if (sentiment === "bullish") return <TrendingUp className="w-4 h-4 text-success" />;
    if (sentiment === "bearish") return <TrendingDown className="w-4 h-4 text-destructive" />;
    return <Zap className="w-4 h-4 text-warning" />;
  };

  const getSentimentColor = (sentiment: string) => {
    if (sentiment === "bullish") return "bg-success/20 text-success border-success/30";
    if (sentiment === "bearish") return "bg-destructive/20 text-destructive border-destructive/30";
    return "bg-warning/20 text-warning border-warning/30";
  };

  const categories = ["All", "Market", "Technology", "Regulation", "Adoption", "Security", "NFT"];

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
            <Newspaper className="w-8 h-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-display font-bold">Crypto News</h1>
          </div>
          <p className="text-muted-foreground">
            Stay updated with the latest cryptocurrency news and market insights
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={filter === category.toLowerCase() || (category === "All" && filter === "all") ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(category === "All" ? "all" : category.toLowerCase())}
              >
                {category}
              </Button>
            ))}
          </div>
          <Select value={sentimentFilter} onValueChange={setSentimentFilter}>
            <SelectTrigger className="w-full md:w-48 bg-card/50">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Sentiment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sentiment</SelectItem>
              <SelectItem value="bullish">Bullish</SelectItem>
              <SelectItem value="bearish">Bearish</SelectItem>
              <SelectItem value="neutral">Neutral</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Breaking News Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl p-6 mb-8 border border-primary/30"
        >
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-sm font-semibold text-primary">BREAKING NEWS</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold mb-2">{news[0]?.title}</h2>
          <p className="text-muted-foreground">{news[0]?.description}</p>
          <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              {news[0]?.source}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {news[0]?.time}
            </span>
          </div>
        </motion.div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.slice(1).map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="glass rounded-2xl p-6 card-hover group"
            >
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline" className="text-xs">
                  {item.category}
                </Badge>
                <Badge className={`${getSentimentColor(item.sentiment)} border`}>
                  {getSentimentIcon(item.sentiment)}
                  <span className="ml-1 capitalize">{item.sentiment}</span>
                </Badge>
              </div>

              <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {item.description}
              </p>

              {item.coins.length > 0 && (
                <div className="flex gap-2 mb-4">
                  {item.coins.map(coin => (
                    <Badge key={coin} variant="secondary" className="text-xs">
                      {coin}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  {item.source}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {item.time}
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-8"
        >
          <Button variant="outline" className="gap-2">
            Load More News
            <ExternalLink className="w-4 h-4" />
          </Button>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}