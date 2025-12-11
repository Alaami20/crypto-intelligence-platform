import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const COINGECKO_API = "https://api.coingecko.com/api/v3";

// In-memory cache to avoid rate limits
let cachedData: any = null;
let lastFetchTime = 0;
const CACHE_DURATION = 60000; // 60 seconds cache

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const now = Date.now();
    
    // Return cached data if still valid
    if (cachedData && (now - lastFetchTime) < CACHE_DURATION) {
      console.log("Returning cached data");
      return new Response(
        JSON.stringify(cachedData),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Fetching fresh data from CoinGecko...");
    
    // Fetch top 100 cryptocurrencies with market data
    const response = await fetch(
      `${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h,24h,7d`,
      {
        headers: {
          'Accept': 'application/json',
        }
      }
    );

    if (!response.ok) {
      // If rate limited and we have cached data, return it
      if (response.status === 429 && cachedData) {
        console.log("Rate limited, returning cached data");
        return new Response(
          JSON.stringify(cachedData),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data = await response.json();

    // Transform and add AI signals based on price action
    const cryptoData = data.map((coin: any) => {
      const change24h = coin.price_change_percentage_24h || 0;
      const change7d = coin.price_change_percentage_7d_in_currency || 0;
      const change1h = coin.price_change_percentage_1h_in_currency || 0;
      
      // Calculate AI signal based on multiple factors
      let signal = "Hold";
      let signalStrength = 0;
      
      // Momentum score
      if (change1h > 2) signalStrength += 2;
      else if (change1h > 0.5) signalStrength += 1;
      else if (change1h < -2) signalStrength -= 2;
      else if (change1h < -0.5) signalStrength -= 1;
      
      if (change24h > 5) signalStrength += 3;
      else if (change24h > 2) signalStrength += 2;
      else if (change24h > 0) signalStrength += 1;
      else if (change24h < -5) signalStrength -= 3;
      else if (change24h < -2) signalStrength -= 2;
      else if (change24h < 0) signalStrength -= 1;
      
      if (change7d > 10) signalStrength += 2;
      else if (change7d > 5) signalStrength += 1;
      else if (change7d < -10) signalStrength -= 2;
      else if (change7d < -5) signalStrength -= 1;

      // Determine signal
      if (signalStrength >= 5) signal = "Strong Buy";
      else if (signalStrength >= 3) signal = "Buy";
      else if (signalStrength >= 1) signal = "Hold";
      else if (signalStrength <= -5) signal = "Strong Sell";
      else if (signalStrength <= -3) signal = "Sell";
      else signal = "Hold";

      return {
        id: coin.id,
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        image: coin.image,
        price: coin.current_price,
        marketCap: coin.market_cap,
        volume: coin.total_volume,
        change1h: change1h,
        change24h: change24h,
        change7d: change7d,
        rank: coin.market_cap_rank,
        signal: signal,
        signalStrength: signalStrength,
        sparkline: coin.sparkline_in_7d?.price || [],
        high24h: coin.high_24h,
        low24h: coin.low_24h,
        ath: coin.ath,
        athChangePercent: coin.ath_change_percentage,
        circulatingSupply: coin.circulating_supply,
        totalSupply: coin.total_supply,
        maxSupply: coin.max_supply,
      };
    });

    // Fetch global market stats
    let marketStats = {
      totalMarketCap: 0,
      totalVolume: 0,
      btcDominance: 0,
      ethDominance: 0,
      activeCryptos: 0,
      marketCapChange24h: 0,
    };

    try {
      const globalResponse = await fetch(`${COINGECKO_API}/global`);
      if (globalResponse.ok) {
        const globalData = await globalResponse.json();
        marketStats = {
          totalMarketCap: globalData.data?.total_market_cap?.usd || 0,
          totalVolume: globalData.data?.total_volume?.usd || 0,
          btcDominance: globalData.data?.market_cap_percentage?.btc || 0,
          ethDominance: globalData.data?.market_cap_percentage?.eth || 0,
          activeCryptos: globalData.data?.active_cryptocurrencies || 0,
          marketCapChange24h: globalData.data?.market_cap_change_percentage_24h_usd || 0,
        };
      }
    } catch (e) {
      console.log("Failed to fetch global stats, using defaults");
    }

    // Calculate sentiment
    const avgChange = cryptoData.slice(0, 20).reduce((acc: number, coin: any) => acc + coin.change24h, 0) / 20;
    let sentiment = "Neutral";
    let sentimentScore = 50;
    
    if (avgChange > 5) { sentiment = "Bullish"; sentimentScore = 75; }
    else if (avgChange > 2) { sentiment = "Bullish"; sentimentScore = 65; }
    else if (avgChange > 0) { sentiment = "Slightly Bullish"; sentimentScore = 55; }
    else if (avgChange < -5) { sentiment = "Bearish"; sentimentScore = 25; }
    else if (avgChange < -2) { sentiment = "Bearish"; sentimentScore = 35; }
    else if (avgChange < 0) { sentiment = "Slightly Bearish"; sentimentScore = 45; }

    const result = {
      cryptos: cryptoData,
      marketStats,
      sentiment,
      sentimentScore,
      lastUpdated: new Date().toISOString(),
    };

    // Cache the result
    cachedData = result;
    lastFetchTime = now;

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    
    // Return cached data if available on error
    if (cachedData) {
      console.log("Error occurred, returning cached data");
      return new Response(
        JSON.stringify(cachedData),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
