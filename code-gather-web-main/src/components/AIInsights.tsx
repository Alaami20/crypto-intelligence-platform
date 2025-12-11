import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  AlertTriangle, 
  TrendingUp, 
  MessageSquare, 
  LineChart,
  Zap,
  ArrowRight
} from "lucide-react";

const insights = [
  {
    id: 1,
    type: "alert",
    priority: "high",
    icon: AlertTriangle,
    title: "Whale Movement Detected",
    description: "Large BTC transfer of 2,500 BTC ($168.5M) moved from unknown wallet to Binance. Historical patterns suggest potential sell pressure within 24-48 hours.",
    action: "Monitor closely",
    time: "2 min ago",
  },
  {
    id: 2,
    type: "signal",
    priority: "medium",
    icon: TrendingUp,
    title: "SOL Breakout Pattern",
    description: "Solana showing strong ascending triangle pattern on 4H chart. RSI at 62, MACD crossover imminent. AI confidence: 78%",
    action: "Consider entry",
    time: "15 min ago",
  },
  {
    id: 3,
    type: "sentiment",
    priority: "medium",
    icon: MessageSquare,
    title: "Social Sentiment Spike",
    description: "PEPE mentions increased 340% in the last hour across Twitter and Reddit. Historical correlation with 12-24h price movement: 67%",
    action: "Analyze further",
    time: "28 min ago",
  },
  {
    id: 4,
    type: "technical",
    priority: "low",
    icon: LineChart,
    title: "ETH Support Test",
    description: "Ethereum approaching key support level at $3,480. Previous bounces from this level: 4/5 times. Accumulation zone identified.",
    action: "Set alerts",
    time: "45 min ago",
  },
];

export const AIInsights = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Insights Feed */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold">AI Insights</h2>
                <p className="text-sm text-muted-foreground">Real-time market intelligence</p>
              </div>
            </motion.div>

            <div className="space-y-4">
              {insights.map((insight, index) => (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card variant="glass" className="p-5 group hover:border-primary/50 transition-colors">
                    <div className="flex gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        insight.priority === "high" 
                          ? "bg-destructive/20 text-destructive" 
                          : insight.priority === "medium"
                          ? "bg-warning/20 text-warning"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        <insight.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="font-display font-semibold text-lg">{insight.title}</h3>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">{insight.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {insight.description}
                        </p>
                        <Button variant="ghost" size="sm" className="text-primary -ml-3 group-hover:translate-x-1 transition-transform">
                          {insight.action}
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card variant="gradient" className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-primary" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-pulse" />
                  </div>
                  <div>
                    <div className="font-display font-semibold">AI Engine</div>
                    <div className="text-sm text-success">Active & Learning</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Models Running</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Data Points/sec</span>
                    <span className="font-medium">2.4M</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Prediction Accuracy</span>
                    <span className="font-medium text-success">87.3%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Last Training</span>
                    <span className="font-medium">2h ago</span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card variant="glass" className="p-6">
                <h3 className="font-display font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <LineChart className="w-4 h-4 mr-2" />
                    Run Technical Analysis
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Check Social Sentiment
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    View All Alerts
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
