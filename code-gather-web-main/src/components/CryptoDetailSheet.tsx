import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { TrendingUp, TrendingDown, Sparkles, Target, AlertTriangle, Activity, DollarSign } from "lucide-react";
import { CryptoData, formatPrice, formatMarketCap, formatVolume } from "@/hooks/useCryptoData";
import { useState } from "react";

interface CryptoDetailSheetProps {
  crypto: CryptoData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CryptoDetailSheet = ({ crypto, open, onOpenChange }: CryptoDetailSheetProps) => {
  const [riskLevel, setRiskLevel] = useState([50]);
  const [targetPrice, setTargetPrice] = useState<number | null>(null);

  if (!crypto) return null;

  const isPositive = crypto.change24h >= 0;
  
  const getSignalDetails = (signal: string) => {
    switch (signal) {
      case "Strong Buy":
        return { 
          color: "text-success", 
          bg: "bg-success/20", 
          description: "Strong bullish momentum detected. High probability of upward movement.",
          confidence: 85
        };
      case "Buy":
        return { 
          color: "text-success", 
          bg: "bg-success/20", 
          description: "Positive indicators suggest potential price increase.",
          confidence: 70
        };
      case "Sell":
        return { 
          color: "text-destructive", 
          bg: "bg-destructive/20", 
          description: "Bearish signals detected. Consider reducing position.",
          confidence: 65
        };
      case "Strong Sell":
        return { 
          color: "text-destructive", 
          bg: "bg-destructive/20", 
          description: "Strong bearish momentum. High probability of price decline.",
          confidence: 80
        };
      default:
        return { 
          color: "text-warning", 
          bg: "bg-warning/20", 
          description: "Market is consolidating. Wait for clearer signals.",
          confidence: 50
        };
    }
  };

  const signalDetails = getSignalDetails(crypto.signal);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto bg-background border-border">
        <SheetHeader className="pb-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden">
              <img src={crypto.image} alt={crypto.name} className="w-10 h-10 rounded-full" />
            </div>
            <div>
              <SheetTitle className="font-display text-2xl">{crypto.name}</SheetTitle>
              <p className="text-muted-foreground">{crypto.symbol} • Rank #{crypto.rank}</p>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-6">
          {/* Price Section */}
          <Card variant="glass" className="p-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Current Price</p>
                <p className="font-display text-3xl font-bold">{formatPrice(crypto.price)}</p>
              </div>
              <div className={`flex items-center gap-1 px-3 py-1.5 rounded-lg ${isPositive ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"}`}>
                {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span className="font-semibold">{isPositive ? "+" : ""}{crypto.change24h.toFixed(2)}%</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border/50">
              <div>
                <p className="text-xs text-muted-foreground">1h</p>
                <p className={`font-medium ${crypto.change1h >= 0 ? "text-success" : "text-destructive"}`}>
                  {crypto.change1h >= 0 ? "+" : ""}{crypto.change1h.toFixed(2)}%
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">24h</p>
                <p className={`font-medium ${crypto.change24h >= 0 ? "text-success" : "text-destructive"}`}>
                  {crypto.change24h >= 0 ? "+" : ""}{crypto.change24h.toFixed(2)}%
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">7d</p>
                <p className={`font-medium ${crypto.change7d >= 0 ? "text-success" : "text-destructive"}`}>
                  {crypto.change7d >= 0 ? "+" : ""}{crypto.change7d.toFixed(2)}%
                </p>
              </div>
            </div>
          </Card>

          {/* AI Signal */}
          <Card variant="glass" className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="font-display font-semibold">AI Signal Analysis</h3>
            </div>
            
            <div className={`p-4 rounded-lg ${signalDetails.bg} mb-4`}>
              <div className="flex items-center justify-between mb-2">
                <Badge className={`${signalDetails.bg} ${signalDetails.color} border-0`}>
                  {crypto.signal}
                </Badge>
                <span className={`text-sm font-medium ${signalDetails.color}`}>
                  {signalDetails.confidence}% confidence
                </span>
              </div>
              <p className="text-sm text-foreground/80">{signalDetails.description}</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Signal Strength</span>
                <span className="font-medium">{crypto.signalStrength}/100</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all ${signalDetails.color === "text-success" ? "bg-success" : signalDetails.color === "text-destructive" ? "bg-destructive" : "bg-warning"}`}
                  style={{ width: `${crypto.signalStrength}%` }}
                />
              </div>
            </div>
          </Card>

          {/* Market Stats */}
          <Card variant="glass" className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-5 h-5 text-primary" />
              <h3 className="font-display font-semibold">Market Stats</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Market Cap</span>
                <span className="font-medium">{formatMarketCap(crypto.marketCap)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">24h Volume</span>
                <span className="font-medium">{formatVolume(crypto.volume)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">24h High</span>
                <span className="font-medium text-success">{formatPrice(crypto.high24h)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">24h Low</span>
                <span className="font-medium text-destructive">{formatPrice(crypto.low24h)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">All-Time High</span>
                <span className="font-medium">{formatPrice(crypto.ath)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">ATH Change</span>
                <span className={`font-medium ${crypto.athChangePercent >= 0 ? "text-success" : "text-destructive"}`}>
                  {crypto.athChangePercent.toFixed(2)}%
                </span>
              </div>
            </div>
          </Card>

          {/* Risk Settings */}
          <Card variant="glass" className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-warning" />
              <h3 className="font-display font-semibold">Risk Settings</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Risk Tolerance</span>
                  <span className="text-sm font-medium">{riskLevel[0]}%</span>
                </div>
                <Slider
                  value={riskLevel}
                  onValueChange={setRiskLevel}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>Conservative</span>
                  <span>Aggressive</span>
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Target Price Alert</label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="number"
                      placeholder={crypto.price.toFixed(2)}
                      className="w-full pl-8 pr-3 py-2 bg-muted/50 border border-border rounded-lg text-sm"
                      onChange={(e) => setTargetPrice(parseFloat(e.target.value) || null)}
                    />
                  </div>
                  <Button size="sm" variant="outline">
                    <Target className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button className="flex-1 bg-success hover:bg-success/90 text-success-foreground">
              Buy {crypto.symbol}
            </Button>
            <Button variant="outline" className="flex-1 border-destructive text-destructive hover:bg-destructive/10">
              Sell {crypto.symbol}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
