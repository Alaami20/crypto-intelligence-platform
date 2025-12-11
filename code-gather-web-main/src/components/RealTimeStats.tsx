import { motion } from "framer-motion";
import { Activity, Globe, Users, Zap, Clock, BarChart3, Shield } from "lucide-react";
import { useCryptoData, formatMarketCap } from "@/hooks/useCryptoData";
import { useEffect, useState } from "react";

export const RealTimeStats = () => {
  const { data } = useCryptoData(30000);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timeInterval);
  }, []);

  const stats = [
    { icon: Activity, label: "Active Signals", value: data?.cryptos.filter(c => c.signal.includes("Buy") || c.signal.includes("Sell")).length || 0, suffix: "", color: "text-primary" },
    { icon: Globe, label: "Markets Tracked", value: data?.marketStats?.activeCryptos || 10847, suffix: "", color: "text-accent" },
    { icon: Users, label: "Online Now", value: 3842, suffix: "", color: "text-success" },
    { icon: Zap, label: "AI Predictions/hr", value: 15000, suffix: "+", color: "text-warning" },
  ];

  const realtimeActivity = [
    ...(data?.cryptos.slice(0, 3).filter(c => c.signal === "Strong Buy").map(c => ({
      type: "signal",
      message: `Strong Buy signal for ${c.symbol} detected`,
      time: "Just now",
      color: "text-success"
    })) || []),
    ...(data?.cryptos.slice(0, 1).map(c => ({
      type: "alert",
      message: `${c.symbol} at ${formatMarketCap(c.price)} (${c.change24h >= 0 ? "+" : ""}${c.change24h.toFixed(2)}%)`,
      time: "Live",
      color: "text-primary"
    })) || []),
    { type: "news", message: "Market sentiment analysis updated", time: "5s ago", color: "text-warning" },
    ...(data?.cryptos.filter(c => c.change24h > 5).slice(0, 2).map(c => ({
      type: "signal",
      message: `${c.symbol} momentum shift +${c.change24h.toFixed(1)}%`,
      time: "Recent",
      color: "text-accent"
    })) || []),
  ].slice(0, 6);

  return (
    <section id="signals" className="py-8 border-y border-border/30 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {/* Stats */}
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="font-display text-xl font-bold">
                  {stat.value.toLocaleString()}{stat.suffix}
                </div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            </motion.div>
          ))}

          {/* Live Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3 col-span-2 md:col-span-4 lg:col-span-2"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/30">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-success text-sm font-medium">LIVE</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-mono">
                {currentTime.toLocaleTimeString()}
              </span>
            </div>
          </motion.div>

          {/* Additional Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="hidden lg:flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-primary">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="font-display text-xl font-bold">87%</div>
              <div className="text-xs text-muted-foreground">Accuracy</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="hidden lg:flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-success">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="font-display text-xl font-bold">99.9%</div>
              <div className="text-xs text-muted-foreground">Uptime</div>
            </div>
          </motion.div>
        </div>

        {/* Real-time Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 overflow-hidden"
        >
          <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {realtimeActivity.map((activity, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border/30"
              >
                <div className={`w-2 h-2 rounded-full ${activity.color.replace("text-", "bg-")}`} />
                <span className="text-sm whitespace-nowrap">{activity.message}</span>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
