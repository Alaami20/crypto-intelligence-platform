import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCryptoData, formatPrice, formatMarketCap } from "@/hooks/useCryptoData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet, Plus, TrendingUp, TrendingDown, PieChart, 
  DollarSign, Percent, Target, Trash2, Edit2
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Holding {
  id: string;
  symbol: string;
  name: string;
  amount: number;
  buyPrice: number;
  image: string;
}

export default function PortfolioPage() {
  const { data, loading } = useCryptoData(30000);
  const [holdings, setHoldings] = useState<Holding[]>([
    { id: "bitcoin", symbol: "BTC", name: "Bitcoin", amount: 0.5, buyPrice: 42000, image: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png" },
    { id: "ethereum", symbol: "ETH", name: "Ethereum", amount: 4, buyPrice: 2200, image: "https://assets.coingecko.com/coins/images/279/small/ethereum.png" },
    { id: "solana", symbol: "SOL", name: "Solana", amount: 25, buyPrice: 95, image: "https://assets.coingecko.com/coins/images/4128/small/solana.png" },
  ]);
  const [newHolding, setNewHolding] = useState({ cryptoId: "", amount: "", buyPrice: "" });
  const [dialogOpen, setDialogOpen] = useState(false);

  const getHoldingWithCurrentPrice = (holding: Holding) => {
    const currentCrypto = data?.cryptos?.find(c => c.id === holding.id);
    const currentPrice = currentCrypto?.price || holding.buyPrice;
    const currentValue = holding.amount * currentPrice;
    const investedValue = holding.amount * holding.buyPrice;
    const pnl = currentValue - investedValue;
    const pnlPercent = ((currentValue - investedValue) / investedValue) * 100;
    return {
      ...holding,
      currentPrice,
      currentValue,
      investedValue,
      pnl,
      pnlPercent,
      signal: currentCrypto?.signal || "Hold",
      change24h: currentCrypto?.change24h || 0,
    };
  };

  const portfolioData = holdings.map(getHoldingWithCurrentPrice);
  const totalValue = portfolioData.reduce((acc, h) => acc + h.currentValue, 0);
  const totalInvested = portfolioData.reduce((acc, h) => acc + h.investedValue, 0);
  const totalPnl = totalValue - totalInvested;
  const totalPnlPercent = totalInvested > 0 ? ((totalValue - totalInvested) / totalInvested) * 100 : 0;

  const addHolding = () => {
    const crypto = data?.cryptos?.find(c => c.id === newHolding.cryptoId);
    if (crypto && newHolding.amount && newHolding.buyPrice) {
      setHoldings([...holdings, {
        id: crypto.id,
        symbol: crypto.symbol,
        name: crypto.name,
        amount: parseFloat(newHolding.amount),
        buyPrice: parseFloat(newHolding.buyPrice),
        image: crypto.image,
      }]);
      setNewHolding({ cryptoId: "", amount: "", buyPrice: "" });
      setDialogOpen(false);
    }
  };

  const removeHolding = (id: string) => {
    setHoldings(holdings.filter(h => h.id !== id));
  };

  const getSignalColor = (signal: string) => {
    if (signal.includes("Buy")) return "text-success";
    if (signal.includes("Sell")) return "text-destructive";
    return "text-warning";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Wallet className="w-8 h-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-display font-bold">Portfolio</h1>
            </div>
            <p className="text-muted-foreground">Track your holdings with real-time prices</p>
          </div>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="glow" className="mt-4 md:mt-0 gap-2">
                <Plus className="w-4 h-4" />
                Add Holding
              </Button>
            </DialogTrigger>
            <DialogContent className="glass">
              <DialogHeader>
                <DialogTitle>Add New Holding</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <Select value={newHolding.cryptoId} onValueChange={(v) => setNewHolding({...newHolding, cryptoId: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select cryptocurrency" />
                  </SelectTrigger>
                  <SelectContent>
                    {data?.cryptos?.slice(0, 50).map(crypto => (
                      <SelectItem key={crypto.id} value={crypto.id}>
                        <div className="flex items-center gap-2">
                          <img src={crypto.image} alt={crypto.name} className="w-5 h-5 rounded-full" />
                          {crypto.name} ({crypto.symbol})
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  placeholder="Amount"
                  value={newHolding.amount}
                  onChange={(e) => setNewHolding({...newHolding, amount: e.target.value})}
                />
                <Input
                  type="number"
                  placeholder="Buy Price (USD)"
                  value={newHolding.buyPrice}
                  onChange={(e) => setNewHolding({...newHolding, buyPrice: e.target.value})}
                />
                <Button onClick={addHolding} className="w-full">Add to Portfolio</Button>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Portfolio Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="glass rounded-2xl p-6 col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <DollarSign className="w-4 h-4" />
              <span className="text-sm">Total Portfolio Value</span>
            </div>
            <p className="text-4xl font-display font-bold">{formatPrice(totalValue)}</p>
            <div className={`flex items-center gap-2 mt-2 ${totalPnl >= 0 ? 'text-success' : 'text-destructive'}`}>
              {totalPnl >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span className="font-medium">
                {totalPnl >= 0 ? '+' : ''}{formatPrice(totalPnl)} ({totalPnlPercent.toFixed(2)}%)
              </span>
            </div>
          </div>
          
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Target className="w-4 h-4" />
              <span className="text-sm">Total Invested</span>
            </div>
            <p className="text-2xl font-bold">{formatPrice(totalInvested)}</p>
          </div>
          
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Percent className="w-4 h-4" />
              <span className="text-sm">Total Return</span>
            </div>
            <p className={`text-2xl font-bold ${totalPnlPercent >= 0 ? 'text-success' : 'text-destructive'}`}>
              {totalPnlPercent >= 0 ? '+' : ''}{totalPnlPercent.toFixed(2)}%
            </p>
          </div>
        </motion.div>

        {/* Allocation Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
        >
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <PieChart className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Allocation</h3>
            </div>
            <div className="space-y-3">
              {portfolioData.map((holding, index) => {
                const allocation = totalValue > 0 ? (holding.currentValue / totalValue) * 100 : 0;
                const colors = ['bg-primary', 'bg-accent', 'bg-success', 'bg-warning', 'bg-destructive'];
                return (
                  <div key={holding.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{holding.symbol}</span>
                      <span>{allocation.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${colors[index % colors.length]} rounded-full`}
                        style={{ width: `${allocation}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Holdings List */}
          <div className="glass rounded-2xl p-6 lg:col-span-2">
            <h3 className="font-semibold mb-4">Your Holdings</h3>
            <div className="space-y-4">
              {portfolioData.map((holding, index) => (
                <motion.div
                  key={holding.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <img src={holding.image} alt={holding.name} className="w-10 h-10 rounded-full" />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{holding.name}</p>
                        <Badge variant="outline" className={getSignalColor(holding.signal)}>
                          {holding.signal}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {holding.amount} {holding.symbol} @ {formatPrice(holding.buyPrice)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatPrice(holding.currentValue)}</p>
                    <div className={`flex items-center justify-end gap-1 text-sm ${holding.pnl >= 0 ? 'text-success' : 'text-destructive'}`}>
                      {holding.pnl >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {holding.pnl >= 0 ? '+' : ''}{formatPrice(holding.pnl)} ({holding.pnlPercent.toFixed(2)}%)
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeHolding(holding.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}