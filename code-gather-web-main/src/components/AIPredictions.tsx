import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Brain, TrendingUp, TrendingDown, Sparkles, 
  RefreshCw, AlertTriangle, CheckCircle, Target,
  Zap, BarChart3
} from "lucide-react";
import { useCryptoData, formatPrice } from "@/hooks/useCryptoData";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface PredictionResult {
  analysis: string;
  timestamp: string;
}

export const AIPredictions = () => {
  const { data, loading: dataLoading } = useCryptoData(60000);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null);

  const analyzeCrypto = async (cryptoId?: string) => {
    setIsAnalyzing(true);
    setSelectedCrypto(cryptoId || null);
    
    try {
      const cryptoData = cryptoId 
        ? data?.cryptos.find(c => c.id === cryptoId)
        : {
            topCryptos: data?.cryptos.slice(0, 10),
            marketStats: data?.marketStats,
            sentiment: data?.sentiment,
          };

      const { data: result, error } = await supabase.functions.invoke("ai-crypto-analysis", {
        body: {
          cryptoData,
          analysisType: cryptoId ? "prediction" : "market-overview",
        },
      });

      if (error) throw error;

      setPrediction(result);
      toast.success("AI analysis complete!");
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error("Failed to generate analysis. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const topCryptos = data?.cryptos?.slice(0, 6) || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent">
              <Brain className="w-6 h-6 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-display font-bold">AI Price Predictions</h2>
          </div>
          <p className="text-muted-foreground">
            Advanced AI analysis powered by machine learning
          </p>
        </div>
        <Button 
          onClick={() => analyzeCrypto()} 
          disabled={isAnalyzing || dataLoading}
          variant="glow"
          className="gap-2"
        >
          {isAnalyzing ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          Analyze Market
        </Button>
      </div>

      {/* Crypto Selection Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {topCryptos.map((crypto) => (
          <motion.button
            key={crypto.id}
            onClick={() => analyzeCrypto(crypto.id)}
            disabled={isAnalyzing}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`glass p-4 rounded-xl text-left transition-all ${
              selectedCrypto === crypto.id ? "ring-2 ring-primary" : ""
            } ${isAnalyzing ? "opacity-50 cursor-not-allowed" : "hover:bg-muted/30"}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <img src={crypto.image} alt={crypto.name} className="w-6 h-6 rounded-full" />
              <span className="font-semibold text-sm">{crypto.symbol}</span>
            </div>
            <p className="font-bold">{formatPrice(crypto.price)}</p>
            <p className={`text-xs ${crypto.change24h >= 0 ? "text-success" : "text-destructive"}`}>
              {crypto.change24h >= 0 ? "+" : ""}{crypto.change24h.toFixed(2)}%
            </p>
          </motion.button>
        ))}
      </div>

      {/* Analysis Result */}
      {prediction && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">AI Analysis Result</h3>
            </div>
            <Badge variant="outline" className="text-xs">
              {new Date(prediction.timestamp).toLocaleTimeString()}
            </Badge>
          </div>
          <div className="prose prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-sm leading-relaxed">
              {prediction.analysis}
            </div>
          </div>
        </motion.div>
      )}

      {/* Loading State */}
      {isAnalyzing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass rounded-2xl p-8 text-center"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-pulse">
            <Brain className="w-8 h-8 text-primary-foreground" />
          </div>
          <h3 className="font-semibold mb-2">Analyzing Market Data...</h3>
          <p className="text-sm text-muted-foreground">
            Our AI is processing real-time market data to generate insights
          </p>
        </motion.div>
      )}

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card variant="glass" className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h4 className="font-medium">Technical Analysis</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            AI analyzes price patterns, volume, and momentum indicators
          </p>
        </Card>
        <Card variant="glass" className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-5 h-5 text-success" />
            <h4 className="font-medium">Price Targets</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            Get predicted price ranges for short and medium term
          </p>
        </Card>
        <Card variant="glass" className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-5 h-5 text-warning" />
            <h4 className="font-medium">Risk Assessment</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            Understand potential risks and volatility factors
          </p>
        </Card>
      </div>
    </div>
  );
};