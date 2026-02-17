"use client";

import { createContext, useContext, useState, ReactNode, useEffect, SetStateAction } from "react";
import { Plan as BasePlan } from "@/Data/plans_data";

export type BillingCycle = 'Monthly' | 'Half_Yearly';

export interface SelectedPlan {
  name: string;
  price: string;
  icon: string;
  regions: string[];
}

type PlanContextType = {
  selectedPlan: SelectedPlan | null;
  setSelectedPlan: (plan: SelectedPlan | null) => void;
  isPlanLoaded: boolean;
  selectedRegions: { [key: string]: string[] };
  setSelectedRegions: (regions: { [key: string]: string[] }) => void;
  billingCycle: BillingCycle;
  setBillingCycle: (cycle: BillingCycle) => void;
};

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan | null>(null);
  const [isPlanLoaded, setIsPlanLoaded] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState<{ [key: string]: string[] }>({});
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('Monthly')


  // ✅ Load from localStorage only once
  useEffect(() => {
    const stored: any = localStorage.getItem("selectedPlan");
    // console.log('stored',stored)
    if (stored) {
      const parsed = JSON.parse(stored)
      setSelectedPlan(parsed.safePlan);
      // Migration logic for legacy boolean values
      let cycle = parsed.billingCycle;
      if (typeof cycle === 'boolean') {
        cycle = cycle ? 'Half_Yearly' : 'Monthly';
      }
      if (cycle === 'annual') {
        cycle = 'Half_Yearly';
      }
      setBillingCycle(cycle || 'Monthly')
      console.log('inside the plans context', cycle)

    }
    setIsPlanLoaded(true);
  }, []);

  // ✅ Save to localStorage whenever plan changes
  useEffect(() => {
    if (selectedPlan) {
      const safePlan = {
        ...selectedPlan,
        regions: Array.isArray(selectedPlan.regions)
          ? selectedPlan.regions
          : [],
      };
      localStorage.setItem("selectedPlan", JSON.stringify({ safePlan, billingCycle }));
    } else {
      localStorage.removeItem("selectedPlan");
    }
  }, [selectedPlan]);
  return (
    <PlanContext.Provider value={{ selectedPlan, setSelectedPlan, isPlanLoaded, selectedRegions, setSelectedRegions, setBillingCycle, billingCycle }}>
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return context;
};
