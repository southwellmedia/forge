export const PRICING_FEATURES = {
  free: [
    { text: "Full source code access", included: true },
    { text: "40+ UI components", included: true },
    { text: "Authentication system", included: true },
    { text: "Database + Drizzle ORM", included: true },
    { text: "tRPC API layer", included: true },
    { text: "Email templates", included: true },
    { text: "Community support", included: true },
    { text: "Premium templates", included: false },
    { text: "CLI scaffolding", included: false },
  ],
  pro: [
    { text: "Everything in Free", included: true },
    { text: "Premium templates", included: true },
    { text: "CLI scaffolding tool", included: true },
    { text: "Priority support", included: true },
    { text: "Team management", included: true },
    { text: "Advanced analytics", included: true },
    { text: "Custom domains", included: true },
    { text: "White-label options", included: true },
    { text: "Dedicated support", included: true },
  ],
} as const;
