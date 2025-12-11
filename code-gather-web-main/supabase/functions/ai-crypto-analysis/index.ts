import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { cryptoData, analysisType } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let systemPrompt = "";
    let userPrompt = "";

    if (analysisType === "prediction") {
      systemPrompt = `You are an expert crypto analyst AI. Analyze the provided cryptocurrency market data and provide:
1. Short-term price prediction (next 24 hours)
2. Signal recommendation (Strong Buy, Buy, Hold, Sell, Strong Sell)
3. Confidence level (0-100%)
4. Key factors influencing your prediction
5. Risk assessment

Be specific with numbers and percentages. Format your response in a structured way.`;

      userPrompt = `Analyze this crypto market data and provide predictions:

${JSON.stringify(cryptoData, null, 2)}

Provide a detailed analysis with price predictions, trading signals, and risk assessment.`;
    } else if (analysisType === "market-overview") {
      systemPrompt = `You are a crypto market analyst AI. Provide a comprehensive market overview based on the data provided. Include:
1. Overall market sentiment
2. Top performing assets
3. Assets to watch
4. Market trends
5. Risk factors`;

      userPrompt = `Here is the current crypto market data:

${JSON.stringify(cryptoData, null, 2)}

Provide a comprehensive market overview.`;
    }

    console.log("Calling Lovable AI for crypto analysis...");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const analysis = data.choices?.[0]?.message?.content || "Unable to generate analysis";

    console.log("AI analysis generated successfully");

    return new Response(
      JSON.stringify({ analysis, timestamp: new Date().toISOString() }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in AI crypto analysis:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});