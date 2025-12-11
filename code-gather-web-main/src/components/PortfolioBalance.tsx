import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Eye, EyeOff, Wallet, ArrowDownToLine, ArrowUpFromLine, History, LogIn } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { usePortfolio } from "@/hooks/usePortfolio";
import { TransactionDialog } from "./TransactionDialog";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";

export const PortfolioBalance = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [depositOpen, setDepositOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  
  const { user, loading: authLoading } = useAuth();
  const { portfolio, transactions, loading: portfolioLoading } = usePortfolio();

  // Calculate 24h change (mock for now, would need historical data)
  const balance = portfolio?.balance || 0;
  const change24h = balance * 0.042; // 4.2% mock change
  const changePercent = 4.2;

  // Not logged in state
  if (!authLoading && !user) {
    return (
      <section className="py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card variant="glass" className="p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
              
              <div className="relative z-10 text-center py-8">
                <Wallet className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-display text-xl font-bold mb-2">Track Your Portfolio</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Sign in to access your portfolio, deposit funds, and start trading with AI-powered insights.
                </p>
                <Link to="/auth">
                  <Button variant="glow" size="lg" className="gap-2">
                    <LogIn className="w-4 h-4" />
                    Sign In to Get Started
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    );
  }

  // Loading state
  if (authLoading || portfolioLoading) {
    return (
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Card variant="glass" className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Skeleton className="w-12 h-12 rounded-xl" />
              <div>
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <Skeleton className="h-12 w-48 mb-4" />
            <Skeleton className="h-8 w-32" />
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card variant="glass" className="p-6 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground font-medium">Portfolio Balance</h3>
                    <p className="text-xs text-muted-foreground/70">Real-time tracking</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowBalance(!showBalance)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </Button>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                <div>
                  <motion.div 
                    className="font-display text-4xl md:text-5xl font-bold tracking-tight"
                    key={showBalance ? "visible" : "hidden"}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {showBalance ? (
                      `$${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
                    ) : (
                      "••••••••"
                    )}
                  </motion.div>
                  
                  <div className="flex items-center gap-2 mt-2">
                    {balance > 0 ? (
                      <>
                        <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full ${
                          changePercent >= 0 ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
                        }`}>
                          {changePercent >= 0 ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          )}
                          <span className="font-semibold">
                            {showBalance ? `+$${change24h.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : "•••••"}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ({changePercent >= 0 ? "+" : ""}{changePercent.toFixed(2)}%) 24h
                        </span>
                      </>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        Deposit funds to start trading
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-border/50 gap-2"
                    onClick={() => setDepositOpen(true)}
                  >
                    <ArrowDownToLine className="w-4 h-4" />
                    Deposit
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-primary hover:bg-primary/90 gap-2"
                    onClick={() => setWithdrawOpen(true)}
                    disabled={balance <= 0}
                  >
                    <ArrowUpFromLine className="w-4 h-4" />
                    Withdraw
                  </Button>
                </div>
              </div>

              {/* Recent Transactions */}
              {transactions.length > 0 && (
                <div className="mt-6 pt-6 border-t border-border/30">
                  <div className="flex items-center gap-2 mb-3">
                    <History className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">Recent Transactions</span>
                  </div>
                  <div className="space-y-2">
                    {transactions.slice(0, 3).map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          {tx.type === "deposit" ? (
                            <ArrowDownToLine className="w-3 h-3 text-success" />
                          ) : (
                            <ArrowUpFromLine className="w-3 h-3 text-primary" />
                          )}
                          <span className="capitalize">{tx.type}</span>
                          <span className="text-muted-foreground text-xs">
                            {formatDistanceToNow(new Date(tx.created_at), { addSuffix: true })}
                          </span>
                        </div>
                        <span className={tx.type === "deposit" ? "text-success" : "text-foreground"}>
                          {tx.type === "deposit" ? "+" : "-"}${tx.amount.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>

      <TransactionDialog open={depositOpen} onOpenChange={setDepositOpen} type="deposit" />
      <TransactionDialog open={withdrawOpen} onOpenChange={setWithdrawOpen} type="withdraw" />
    </section>
  );
};
