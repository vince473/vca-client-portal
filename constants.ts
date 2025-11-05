import { Plan } from './types';

// 1) LOGO: easiest → put vca-logo.png in the SAME folder as this file.
export const LOGO_SRC: string = ""; // No default logo, fallback will be used. Can be "./vca-logo.png" or "https://your-cdn.com/vca.png" or data: URL

// 2) Calendly link:
export const CALENDLY_URL = "mailto:vince@bmvhd.com?subject=VCA%20Discovery%20Call&body=Hey%20Vince%2C%20I%27d%20like%20to%20book%20a%20call%20about%20VCA.%20My%20company%3A%20_____%20Best%20times%3A%20_____";


// 3) Optional: webhook to receive intake submissions (Google Apps Script etc.)
export const INTAKE_ENDPOINT = ""; // e.g., "https://script.google.com/macros/s/XXXX/exec"

export const ALL_SERVICES = [
  "Strategy",
  "Brand Architecture",
  "Influencer Relations",
  "Experiential Marketing",
  "Artist Development",
  "TikTok Live Shop Coordination",
  "Microfilms Production",
  "Radio/Podcast Production",
  "Sponsorships & Partnerships",
  "Social Media Management",
  "Web/App Development",
];

export const PLANS: Plan[] = [
  {
    id: "Strategic Launchpad",
    priceLabel: "$50K",
    cadence: "/QTR",
    category: "Enterprise & Institutional",
    blurb:
      "Quarterly strategy sprints for funded teams that need velocity with clarity.",
    features: [
      "Executive strategy & OKR alignment",
      "Brand architecture + messaging map",
      "Creator/influencer short-list & outreach",
      "Campaign calendar & KPI dashboards",
      "Investor- and partner-ready materials",
    ],
  },
  {
    id: "Full-Scale Development",
    priceLabel: "$120K",
    cadence: "/QTR",
    category: "Enterprise & Institutional",
    blurb:
      "Hands-on buildout across brand, content, creator ecosystems, and growth ops.",
    features: [
      "All Launchpad inclusions",
      "In-house microfilms/creative pods",
      "Experiential & promo roadmaps",
      "Sponsorship & affiliate pipelines",
      "Engineering coordination (web/app)",
    ],
  },
  {
    id: "Starter",
    priceLabel: "$499",
    cadence: "/mo",
    category: "Local Business Plans",
    blurb:
      "Polished presence for local operators ready to get in the game quickly.",
    features: [
      "Foundations: brand kit & one-page site",
      "Basic social setup + content plan",
      "Local SEO essentials",
      "Monthly check-in + action list",
    ],
  },
  {
    id: "Growth",
    priceLabel: "$899",
    cadence: "/mo",
    category: "Local Business Plans",
    blurb:
      "Level up with consistent content, light ads, and customer pipelines.",
    features: [
      "All Starter inclusions",
      "2 short-form videos/month",
      "Lead-gen funnel + email starter",
      "Quarterly campaign push",
    ],
  },
  {
    id: "Pro",
    priceLabel: "$1499",
    cadence: "/mo",
    category: "Local Business Plans",
    blurb:
      "For local winners: steady media, stronger funnels, and partnership play.",
    features: [
      "All Growth inclusions",
      "4 short-form videos/month",
      "Partnership & collab outreach",
      "Quarterly growth review",
    ],
  },
];
