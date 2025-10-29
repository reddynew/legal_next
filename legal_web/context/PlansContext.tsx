"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Plan = {
  name: string;
  price: string;
  icon: string;
} | null;

type PlanContextType = {
  selectedPlan: Plan;
  setSelectedPlan: (plan: Plan) => void;
   isPlanLoaded: boolean;
};

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPlan, setSelectedPlan] = useState<Plan>(null);
  const [isPlanLoaded, setIsPlanLoaded] = useState(false);

  // ✅ Load from localStorage only once
  useEffect(() => {
    const stored = localStorage.getItem("selectedPlan");
    if (stored) {
      setSelectedPlan(JSON.parse(stored));
    }
    setIsPlanLoaded(true);
  }, []);

  // ✅ Save to localStorage whenever plan changes
  useEffect(() => {
    if (selectedPlan) {
      localStorage.setItem("selectedPlan", JSON.stringify(selectedPlan));
    } else {
      localStorage.removeItem("selectedPlan");
    }
  }, [selectedPlan]);
  return (
    <PlanContext.Provider value={{ selectedPlan, setSelectedPlan,isPlanLoaded }}>
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
