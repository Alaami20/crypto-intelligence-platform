import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Activity, Bell, Search, Sparkles } from "lucide-react";

export const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 glass-strong border-b border-border/50"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg text-gradient">CryptoIntel</span>
            <span className="text-[10px] text-muted-foreground -mt-1">AI-Powered Insights</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {["Dashboard", "Markets", "Portfolio", "AI Signals", "News"].map((item, i) => (
            <Button
              key={item}
              variant="ghost"
              className={i === 0 ? "text-primary" : "text-muted-foreground"}
            >
              {item}
            </Button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Search className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="relative text-muted-foreground">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
          </Button>
          <Button variant="glow" size="sm" className="hidden sm:flex gap-2">
            <Sparkles className="w-4 h-4" />
            Upgrade
          </Button>
        </div>
      </div>
    </motion.header>
  );
};
