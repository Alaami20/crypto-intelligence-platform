import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Zap, Crown, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for exploring our platform",
    features: [
      "Real-time prices for top 100 coins",
      "Basic AI signals (3/day)",
      "Portfolio tracking (up to 5 assets)",
      "Market news feed",
      "Community access",
    ],
    cta: "Start Free",
    variant: "glass" as const,
    popular: false,
    icon: Zap,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For serious crypto traders",
    features: [
      "Unlimited real-time data",
      "Advanced AI signals (unlimited)",
      "Portfolio tracking (unlimited)",
      "Price alerts & notifications",
      "API access",
      "Priority support",
      "Custom watchlists",
      "Historical data analysis",
    ],
    cta: "Start 7-Day Free Trial",
    variant: "glow" as const,
    popular: true,
    icon: Sparkles,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/month",
    description: "For teams and institutions",
    features: [
      "Everything in Pro",
      "Team collaboration (up to 10)",
      "White-label reports",
      "Custom AI models",
      "Dedicated account manager",
      "SLA guarantee",
      "On-chain analytics",
      "Institutional data feeds",
    ],
    cta: "Contact Sales",
    variant: "glass" as const,
    popular: false,
    icon: Crown,
  },
];

export const PricingSection = () => {
  const handlePlanClick = (planName: string, cta: string) => {
    if (planName === "Free") {
      toast.success("Welcome! You now have access to the Free plan.", {
        description: "Start exploring real-time crypto data and AI signals.",
      });
    } else if (planName === "Pro") {
      toast.success("Starting your 7-day free trial!", {
        description: "You'll get full access to all Pro features. No credit card required.",
      });
    } else {
      toast.info("Contact our sales team", {
        description: "We'll get back to you within 24 hours to discuss your enterprise needs.",
      });
    }
  };

  return (
    <section id="pricing" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm mb-6">
            <Sparkles className="w-4 h-4 text-warning" />
            <span className="text-muted-foreground">7-day free trial on Pro plan</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Simple, Transparent Pricing</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Start for free and upgrade when you're ready. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              <Card
                variant={plan.popular ? "glow" : "glass"}
                className={`p-6 h-full flex flex-col ${plan.popular ? "border-primary/50 scale-105" : ""}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl ${plan.popular ? "bg-gradient-to-br from-primary to-accent" : "bg-muted"} flex items-center justify-center`}>
                    <plan.icon className={`w-6 h-6 ${plan.popular ? "text-primary-foreground" : "text-primary"}`} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold">{plan.name}</h3>
                    <p className="text-xs text-muted-foreground">{plan.description}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="font-display text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.popular ? "glow" : "glass"}
                  className="w-full"
                  size="lg"
                  onClick={() => handlePlanClick(plan.name, plan.cta)}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-8 mt-12 pt-12 border-t border-border/30"
        >
          <div className="text-center">
            <div className="font-display text-3xl font-bold text-gradient">50K+</div>
            <div className="text-sm text-muted-foreground">Active Users</div>
          </div>
          <div className="text-center">
            <div className="font-display text-3xl font-bold text-gradient">$2B+</div>
            <div className="text-sm text-muted-foreground">Portfolio Tracked</div>
          </div>
          <div className="text-center">
            <div className="font-display text-3xl font-bold text-gradient">99.9%</div>
            <div className="text-sm text-muted-foreground">Uptime</div>
          </div>
          <div className="text-center">
            <div className="font-display text-3xl font-bold text-gradient">4.9/5</div>
            <div className="text-sm text-muted-foreground">User Rating</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
