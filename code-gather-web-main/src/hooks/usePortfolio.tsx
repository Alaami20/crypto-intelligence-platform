import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface Portfolio {
  id: string;
  balance: number;
  total_deposited: number;
  total_withdrawn: number;
}

export interface Transaction {
  id: string;
  type: "deposit" | "withdraw";
  amount: number;
  status: string;
  description: string | null;
  created_at: string;
}

export const usePortfolio = () => {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPortfolio = useCallback(async () => {
    if (!user) {
      setPortfolio(null);
      setTransactions([]);
      setLoading(false);
      return;
    }

    try {
      const { data: portfolioData, error: portfolioError } = await supabase
        .from("portfolios")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (portfolioError) throw portfolioError;
      setPortfolio(portfolioData);

      const { data: transactionsData, error: transactionsError } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(10);

      if (transactionsError) throw transactionsError;
      setTransactions(transactionsData as Transaction[]);
    } catch (error) {
      console.error("Error fetching portfolio:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  const deposit = async (amount: number, description?: string) => {
    if (!user) return { error: new Error("Not authenticated") };

    const { error } = await supabase
      .from("transactions")
      .insert({
        user_id: user.id,
        type: "deposit",
        amount,
        description: description || "Deposit",
        status: "completed"
      });

    if (!error) {
      await fetchPortfolio();
    }

    return { error };
  };

  const withdraw = async (amount: number, description?: string) => {
    if (!user) return { error: new Error("Not authenticated") };
    if (portfolio && amount > portfolio.balance) {
      return { error: new Error("Insufficient balance") };
    }

    const { error } = await supabase
      .from("transactions")
      .insert({
        user_id: user.id,
        type: "withdraw",
        amount,
        description: description || "Withdrawal",
        status: "completed"
      });

    if (!error) {
      await fetchPortfolio();
    }

    return { error };
  };

  return {
    portfolio,
    transactions,
    loading,
    deposit,
    withdraw,
    refetch: fetchPortfolio
  };
};
