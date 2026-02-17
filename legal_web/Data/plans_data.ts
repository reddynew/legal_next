import regions from "./regions_data";

export interface PlanFeature {
  label: string;
  status: boolean;
}

export interface Plan {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  period?: string;
  annual?: string;
  annualprice: string;
  annualdisprice: string;
  description: string;
  features: PlanFeature[];
  highlight: boolean;
  icon: string;
  color: string;
  borderColor: string;
  badge: string;
  savings: string;
  annualsavings: string,
  regions: number;
}

const plans: Plan[] = [
  {
    id: 1,
    name: "Starter",
    price: "999",
    originalPrice: "1,299",
    period: "month",
    annual: "6 months",
    annualprice: "7,799",
    annualdisprice: '5,399',
    description: "Perfect for new advocates getting started with online client acquisition.",
    features: [
      { label: "Up to 1 Verified Lead per Month", status: true },
      { label: "CRM Support", status: true },
      { label: "Customer Support (24-72 hrs)", status: true },
      { label: "Lead Retention Period 1 day", status: true },
      { label: "Hot Line Leads", status: false },

    ],
    highlight: false,
    icon: "Users",
    color: "from-blue-50 to-indigo-50",
    borderColor: "border-blue-200",
    badge: "Best for Beginners",
    savings: "Save 23%",
    annualsavings: "Save 30%",
    regions: 1
  },
  {
    id: 2,
    name: "Growth",
    price: "1,999",
    originalPrice: "2,999",
    period: "month",
    annual: "6 months",
    annualprice: "17,999",
    annualdisprice: "10,799",
    description: "Ideal for practicing advocates aiming to significantly grow their clients.",
    features: [
      { label: "Up to 2 Verified Leads per Month", status: true },
      { label: "CRM Support", status: true },
      { label: "Priority Support (24-48 hrs)", status: true },
      { label: "Lead Retention Period 2 days", status: true },
      { label: "Hot Line Leads", status: false },

    ],
    highlight: true,
    icon: "Zap",
    color: "from-orange-50 to-yellow-50",
    borderColor: "border-orange-300",
    badge: "Most Popular",
    savings: "Save 33%",
    annualsavings: "Save 40%",
    regions: 2
  },
  {
    id: 3,
    name: "Pro Plus",
    price: "4,999",
    originalPrice: "9,999",
    period: "month",
    annual: "6 months",
    annualprice: "59,999",
    annualdisprice: "26,999",
    description: "Premium plan for maximum reach and growth.",
    features: [
      { label: "Up to 4 Verified Leads per Month", status: true },
      { label: "CRM Support", status: true },
      { label: "Premium Support (2-4 hrs)", status: true },
      { label: "Lead Retention Period 15 days", status: true },
      { label: "Hot Line Leads", status: true },


    ],
    highlight: false,
    icon: "Crown",
    color: "from-purple-50 to-pink-50",
    borderColor: "border-purple-300",
    badge: "Enterprise Ready",
    savings: "Save 50%",
    annualsavings: "Save 55%",

    regions: 3
  },
  {
    id: 4,
    name: "Trial",
    price: "0",
    originalPrice: "0",
    annualprice: "0",
    annualdisprice: "0",
    period: "try free for 7 Days",
    annual: "try free for 7 Days",
    description: "Ideal for advocates beginning their client journey.",
    features: [
      { label: "Sample Data", status: true },
      { label: "CRM Support", status: true },
      { label: "Customer Support (24-72 hrs)", status: true },
    ],
    highlight: false,
    icon: "Zap",
    color: "from-gray-100 to-gray-400",
    borderColor: "border-orange-300",
    badge: "Free Trial",
    savings: "Save 40%",
    annualsavings: "Save %",

    regions: 0
  },
  {
    id: 5,
    name: "Corporate",
    price: "",
    annualprice: "",
    annualdisprice: "",
    // originalPrice: "2799",
    // period: "month",
    description: "Legal solutions designed for corporates with expert help and prompt service.",
    features: [
      { label: "Book a Demo", status: true },
      { label: "Chat with Customer Support", status: true },
      { label: "Call us at +91 8019097373", status: true },
      { label: "Mail us at support@jplawsuvidha.com", status: true },
      // { label: "Up to 15 Verified Leads/month", status: true },
      // { label: "CRM support", status: true },
      // { label: "Priority Support (24-48hrs)", status: true },
      // { label: "Priority Listing in Search Results", status: false },
      // { label: "Advanced Client Chat with Video Calls", status: false },
      // { label: "Lead Insights & Analytics Dashboard", status: false },
      // { label: "Advanced Legal Templates", status: false },
      // { label: "Client Management System", status: false },
      // { label: "Custom Profile Showcase", status: false }
    ],
    highlight: false,
    icon: "Building",
    color: "from-gray-100 to-orange-200",
    borderColor: "border-gray-200",
    badge: "Exclusive for Corporate",
    savings: "Save 10%",
    annualsavings: "Save %",
    regions: 0
  }


];
export default plans