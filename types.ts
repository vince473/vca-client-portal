export type Route = "home" | "pricing" | "about" | "thankyou";

export type PlanTier =
  | "Strategic Launchpad"
  | "Full-Scale Development"
  | "Starter"
  | "Growth"
  | "Pro";

export type Plan = {
  id: PlanTier;
  priceLabel: string;
  cadence: string;
  blurb: string;
  features: string[];
  category: "Enterprise & Institutional" | "Local Business Plans";
};

export type IntakeFormData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  selectedPlan?: PlanTier;
  services: string[];
  notes?: string;
  consent: boolean;
};
