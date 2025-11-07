"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Plan = {
  name: string;
  price: string;
  icon: string;
  regions:any
} | null;

type PlanContextType = {
  selectedPlan: Plan;
  setSelectedPlan: (plan: Plan) => void;
   isPlanLoaded: boolean;
    selectedRegions: { [key: string]: string[] };
  setSelectedRegions: (regions: { [key: string]: string[] }) => void;
};

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPlan, setSelectedPlan] = useState<Plan>(null);
  const [isPlanLoaded, setIsPlanLoaded] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState<{ [key: string]: string[] }>({});
  

  // ✅ Load from localStorage only once
  useEffect(() => {
    const stored = localStorage.getItem("selectedPlan");
    // console.log('stored',stored)
    if (stored) {
      setSelectedPlan(JSON.parse(stored));
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
    localStorage.setItem("selectedPlan", JSON.stringify(safePlan));
  } else {
    localStorage.removeItem("selectedPlan");
  }
}, [selectedPlan]);
  return (
    <PlanContext.Provider value={{ selectedPlan, setSelectedPlan,isPlanLoaded,selectedRegions,setSelectedRegions }}>
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
