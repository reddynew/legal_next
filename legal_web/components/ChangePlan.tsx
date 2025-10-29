// ChangePlanModal.tsx
"use client"
import {  Building, Check, Crown, Users, X, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import plans from '@/Data/plans_data';
import { Badge } from '@/components/ui/badge';
import { usePlan } from '@/context/PlansContext';

function ChangePlan({ onSelect, onClose }: {

  onSelect: (planName: string, price: string, icon: any) => void;
  onClose: () => void;
}) {
  const {selectedPlan, setSelectedPlan} = usePlan()
  const [isProcessing, setIsProcessing] = useState(false);
  const iconMap = {
    Users,
    Zap,
    Crown,
    Building
  };
  type IconName = keyof typeof iconMap;
  const handleChange = async (planName: string, price: string, icon: any) => {
    setSelectedPlan({name:planName,price,icon});
    setIsProcessing(true);
    setTimeout(() => {
      onClose()
    }, 0);
    // onSelect(planName, price, icon); // Pass selected plan back to parent
    // setIsProcessing(false);
  };
// useEffect(() => {
//   console.log('Selected plan changed:', selectedPlan);
// }, [selectedPlan]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">Change Your Plan</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const IconComponent = iconMap[plan.icon as IconName];
            // const isSelected =  selectedPlan?.name;
          const isProcessingThis =
  isProcessing && selectedPlan?.name === plan.name;

            return (
              <div
                key={plan.name}
                className={`flex flex-col justify-between rounded-xl border ${plan.highlight ? 'border-orange-400 ring-2 ring-orange-300' : 'border-gray-200'
                  } shadow-sm overflow-hidden`}
              >
                <div className={`bg-gradient-to-br ${plan.color} p-6`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-gray-800" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                      <p className="text-sm text-gray-600">{plan.name === 'Corporate'? ' ': `${plan.badge}`}</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <span className="text-3xl font-bold text-gray-900">{plan.name === 'Corporate'? ' ' :`₹${plan.price}`}</span>
                    <span className="text-sm text-gray-500">{plan.name === 'Corporate'? ' ': `/ ${plan.period}`}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-lg text-gray-400 line-through">
                        {(plan.name !== 'Corporate' && plan.name !== 'Trial') ? `₹${plan.originalPrice}` : ''}
                      </span>
                      {(plan.name !== 'Corporate' && plan.name !== 'Trial') &&
                        <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                          {plan.savings}
                        </Badge>}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{plan.description}</p>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                <ul className="space-y-2 mt-4 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        {feature.status ? (
                          <Check className="w-5 h-5 text-green-600 mt-0.5" />
                        ) : (
                          <X className="w-5 h-5 text-red-500 mt-0.5" />
                        )}
                        <span className={feature.status ? "" : "line-through text-gray-400"}>
                          {feature.label}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => {handleChange(plan.name, plan.price, plan.icon)}}
                    className="w-full px-4 py-2 rounded bg-blue-700 text-white hover:bg-blue-800"
                  >
                    {isProcessingThis ? 'Processing...' : 'Choose Plan'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ChangePlan;
