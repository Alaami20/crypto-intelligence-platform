import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { usePortfolio } from "@/hooks/usePortfolio";
import { DollarSign, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";

interface TransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "deposit" | "withdraw";
}

export const TransactionDialog = ({ open, onOpenChange, type }: TransactionDialogProps) => {
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { deposit, withdraw, portfolio } = usePortfolio();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount greater than 0",
        variant: "destructive"
      });
      return;
    }

    if (type === "withdraw" && portfolio && numAmount > portfolio.balance) {
      toast({
        title: "Insufficient Balance",
        description: `Your current balance is $${portfolio.balance.toLocaleString()}`,
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = type === "deposit" 
        ? await deposit(numAmount)
        : await withdraw(numAmount);

      if (error) {
        toast({
          title: "Transaction Failed",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: type === "deposit" ? "Deposit Successful" : "Withdrawal Successful",
          description: `$${numAmount.toLocaleString()} has been ${type === "deposit" ? "added to" : "withdrawn from"} your account.`
        });
        setAmount("");
        onOpenChange(false);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const quickAmounts = [100, 500, 1000, 5000];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {type === "deposit" ? (
              <ArrowDownToLine className="w-5 h-5 text-success" />
            ) : (
              <ArrowUpFromLine className="w-5 h-5 text-primary" />
            )}
            {type === "deposit" ? "Deposit Funds" : "Withdraw Funds"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {type === "withdraw" && portfolio && (
            <div className="p-3 rounded-lg bg-muted/50 text-sm">
              Available balance: <span className="font-semibold">${portfolio.balance.toLocaleString()}</span>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (USD)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-10 text-lg"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {quickAmounts.map((quickAmount) => (
              <Button
                key={quickAmount}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setAmount(quickAmount.toString())}
                disabled={type === "withdraw" && portfolio && quickAmount > portfolio.balance}
              >
                ${quickAmount.toLocaleString()}
              </Button>
            ))}
          </div>

          <Button
            type="submit"
            className="w-full"
            variant={type === "deposit" ? "default" : "outline"}
            disabled={isSubmitting || !amount}
          >
            {isSubmitting ? "Processing..." : type === "deposit" ? "Deposit" : "Withdraw"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
