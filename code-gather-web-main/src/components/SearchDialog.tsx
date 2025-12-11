import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, TrendingUp, TrendingDown, Sparkles } from "lucide-react";
import { useCryptoData, formatPrice } from "@/hooks/useCryptoData";
import { useNavigate } from "react-router-dom";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const [query, setQuery] = useState("");
  const { data } = useCryptoData();
  const navigate = useNavigate();

  const filteredCryptos = data?.cryptos?.filter(crypto =>
    crypto.name.toLowerCase().includes(query.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 8) || [];

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onOpenChange]);

  const handleSelect = (symbol: string) => {
    onOpenChange(false);
    navigate(`/markets?search=${symbol}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 gap-0 overflow-hidden">
        <div className="p-4 border-b border-border/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search cryptocurrencies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-20"
              autoFocus
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </div>

        <div className="max-h-80 overflow-y-auto">
          {query === "" ? (
            <div className="p-4 text-center text-muted-foreground">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Start typing to search cryptocurrencies</p>
            </div>
          ) : filteredCryptos.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              <p className="text-sm">No results found for "{query}"</p>
            </div>
          ) : (
            <div className="divide-y divide-border/30">
              {filteredCryptos.map((crypto) => (
                <button
                  key={crypto.id}
                  onClick={() => handleSelect(crypto.symbol)}
                  className="w-full p-4 flex items-center gap-3 hover:bg-muted/30 transition-colors text-left"
                >
                  <img
                    src={crypto.image}
                    alt={crypto.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{crypto.symbol}</span>
                      <span className="text-sm text-muted-foreground">{crypto.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span>{formatPrice(crypto.price)}</span>
                      <span className={`flex items-center gap-0.5 ${
                        crypto.change24h >= 0 ? "text-success" : "text-destructive"
                      }`}>
                        {crypto.change24h >= 0 ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        {crypto.change24h.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${
                    crypto.signal.includes("Buy") 
                      ? "bg-success/20 text-success"
                      : crypto.signal.includes("Sell")
                      ? "bg-destructive/20 text-destructive"
                      : "bg-warning/20 text-warning"
                  }`}>
                    <Sparkles className="w-3 h-3" />
                    {crypto.signal}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
