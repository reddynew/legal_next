// ChangePlanModal.tsx
"use client"
import {  Building, Check, Crown, Users, X, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import plans from '@/Data/plans_data';
import { Badge } from '@/components/ui/badge';
import { usePlan } from '@/context/PlansContext';
import regions from '@/Data/regions_data';


function ChangePlan({ onSelect, onClose }: {
  

  onSelect: (planName: string, price: string, icon: any,requiredRegions:any) => void;
  onClose: () => void;
}) {
  //  useEffect(() => {
  
  //       // Cleanup when leaving the page
  //       setSelectedRegions({});
  //       setOpenSelect(null);
      
  //   }, []);
  const {selectedPlan, setSelectedPlan,selectedRegions,setSelectedRegions} = usePlan()
  const [isProcessing, setIsProcessing] = useState(false);
  const iconMap = {
    Users,
    Zap,
    Crown,
    Building
  };
  type IconName = keyof typeof iconMap;
  const handleChange = async (planName: string, price: string, icon: any,requiredRegions:any) => {
    // console.log('in handle chage in change plans')
    const planRegions = selectedRegions[planName] || [];
    const currentPlan = plans.find(p => p.name === planName);
const reqregions = currentPlan?.regions || 0;
    // console.log('plans',plans)
    // console.log('reqregions',reqregions)
    // console.log('planname',planName)
    // console.log('plan regions ',planRegions)
  
  // Check if user has selected the required number of regions
  if (reqregions > 0 && planRegions.length !== reqregions) {
    alert(`Please select exactly ${reqregions} region${reqregions > 1 ? 's' : ''} for the ${planName} plan.`);
    return; // Don't proceed further
  }
setSelectedPlan({
  name: planName,
  price,
  icon,
  regions:planRegions
});

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
const [openSelect, setOpenSelect] = useState<string | null>();
const handleRegionSelect = (planName: string, region: string, limit: number) => {
    const current = selectedRegions[planName] || [];

    if (current.includes(region)) {
      // deselect region
      setSelectedRegions({
        ...selectedRegions,
        [planName]: current.filter(r => r !== region),
      });
    } else if (current.length < limit) {
      // select new region
      setSelectedRegions({
        ...selectedRegions,
        [planName]: [...current, region],
      });
    } else {
      alert(`You can select only ${limit} region${limit > 1 ? 's' : ''} for ${planName} plan.`);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-7xl max-h-[90vh] overflow-y-auto p-6">
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
                  } shadow-sm overflow-visible`}
              >
                <div className={`bg-gradient-to-br ${plan.color} p-6`}
                                  style={{ clipPath: 'inset(0 round 0.7rem 0.7rem 0 0)' }}>

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
              {/* Region dropdown only for plans that have regions > 0 */}
              {(plan.regions??0) > 0 && (
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select up to {plan.regions} region{plan.regions??0 > 1 ? 's' : ''}
                  </label>

                  <div className="relative w-full">
  <button
    type="button"
    onClick={() => {
      const limit = plan.regions ?? 0;
      const currentCount = selectedRegions[plan.name]?.length || 0;
      
      // Toggle open, but don't close if limit not reached
      if (openSelect === plan.name) {
        if (currentCount < limit) {
          setOpenSelect(null);
        }
      } else {
        setOpenSelect(plan.name);
      }
    }}
    className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between"
  >
    <span className="flex-1">
      {selectedRegions[plan.name]?.length > 0 ? (
        <span className="flex items-center gap-2">
          <span className="text-sm">
            {selectedRegions[plan.name].join(', ')}
          </span>
          <span className="text-xs text-gray-500">
            ({selectedRegions[plan.name].length}/{plan.regions ?? 0})
          </span>
        </span>
      ) : (
        <span className="text-gray-500">
          Choose {plan.regions ?? 0} Region{(plan.regions ?? 0) > 1 ? 's' : ''}
        </span>
      )}
    </span>
    <svg
      className={`w-5 h-5 text-gray-400 transition-transform ${
        openSelect === plan.name ? 'rotate-180' : ''
      }`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  {openSelect === plan.name && (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-10"
        onClick={() => {
          const limit = plan.regions ?? 0;
          const currentCount = selectedRegions[plan.name]?.length || 0;
          if (currentCount <= limit) {
            setOpenSelect(null);
          }
        }}
      />
      
      {/* Dropdown */}
      <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
        {regions.map((region) => {
          const checked = (selectedRegions[plan.name] || []).includes(region);
          const limit = plan.regions ?? 0;
          const disabled = !checked && (selectedRegions[plan.name]?.length || 0) >= limit;

          return (
            <button
              key={region}
              type="button"
              disabled={disabled}
              onClick={() => {
                if (!disabled) {
                  handleRegionSelect(plan.name, region, plan.regions ?? 0);
                  
                  // Auto-close when limit reached
                  const updatedRegions = selectedRegions[plan.name]
                    ? [...selectedRegions[plan.name]]
                    : [];
                  
                  if (!updatedRegions.includes(region) && updatedRegions.length + 1 >= limit) {
                    setTimeout(() => setOpenSelect(null), 10);
                  }
                }
              }}
              className={`w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 ${
                disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              } ${checked ? 'bg-blue-50' : ''}`}
            >
              <input
                type="checkbox"
                checked={checked}
                readOnly
                className="w-4 h-4 accent-blue-600 pointer-events-none"
              />
              <span>{region}</span>
            </button>
          );
        })}
      </div>
    </>
  )}
</div>

                  {/* {planRegions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {planRegions.map((r) => (
                        <Badge key={r} variant="secondary" className="text-sm">
                          {r}
                        </Badge>
                      ))}
                    </div>
                  )} */}
                </div>
              )}



                  <button
                    onClick={() => {handleChange(plan.name, plan.price, plan.icon,regions)}}
                    className="w-full px-4 py-2 rounded bg-blue-700 text-white hover:bg-blue-800 mt-4"
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
