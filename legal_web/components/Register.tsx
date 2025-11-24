"use client"
import React, { useState, useEffect } from 'react';
import { ArrowLeft, User, Mail, Phone, Scale, MapPin, HelpCircle, Shield, CheckCircle, AlertCircle, Eye, EyeOff, FileText, X, Zap, Users, Crown, Building, Check, Divide } from 'lucide-react';
import { Button } from '@/components/ui//button';
import { Input } from '@/components/ui//input';
import { Label } from '@/components/ui//label';
import { Card, CardContent, CardHeader } from '@/components/ui//card';
import { Badge } from '@/components/ui//badge';
import { Alert, AlertDescription } from '@/components/ui//alert';
import { Checkbox } from '@/components/ui//checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui//select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui//accordion';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link'
// import ChangePlan from '@/components/Plans';
import plans from '@/Data/plans_data';

import Footer from '@/components/Footer';
import axios from 'axios';
import { usePlan } from '@/context/PlansContext';
import ChangePlan from '../components/ChangePlan';
import regions from '@/Data/regions_data';
const TermsAndConditionsModalSubscription = ({ onClose, onAccept }: { onClose: () => void; onAccept: () => void }) => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900">Subscription Terms & Conditions</h3>
                            <p className="text-sm text-gray-600">Legal Platform Subscription Agreement</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-96">
                <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
                    <section>
                        <h4 className="font-semibold text-gray-900 mb-2">1. Subscription Services</h4>
                        <p className="text-sm leading-relaxed">By subscribing to our legal lead generation platform, you agree to receive verified client leads based on your selected plan tier and practice areas.</p>
                    </section>

                    <section>
                        <h4 className="font-semibold text-gray-900 mb-2">2. Payment Terms</h4>
                        <ul className="text-sm space-y-1 list-disc pl-4">
                            <li>Subscription fees are billed monthly or annually as selected</li>
                            <li>All payments are processed securely through encrypted payment gateways</li>
                            <li>Refunds are available within 30 days of initial subscription</li>
                            <li>Auto-renewal can be cancelled anytime before the next billing cycle</li>
                        </ul>
                    </section>

                    <section>
                        <h4 className="font-semibold text-gray-900 mb-2">3. Service Guarantees</h4>
                        <ul className="text-sm space-y-1 list-disc pl-4">
                            <li>We guarantee delivery of the minimum leads specified in your plan</li>
                            <li>All leads are verified and qualified before delivery</li>
                            <li>Response time commitments are met as per plan specifications</li>
                            <li>Platform uptime of 99.9% guaranteed</li>
                        </ul>
                    </section>

                    <section>
                        <h4 className="font-semibold text-gray-900 mb-2">4. Cancellation Policy</h4>
                        <ul className="text-sm space-y-1 list-disc pl-4">
                            <li>Cancel anytime with 30 days written notice</li>
                            <li>No cancellation fees or penalties</li>
                            <li>Access continues until end of current billing period</li>
                            <li>Data export available upon request</li>
                        </ul>
                    </section>
                </div>
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex gap-3">
                    <Button variant="outline" onClick={onClose} className="flex-1">
                        Cancel
                    </Button>
                    <Button onClick={onAccept} className="flex-1 bg-blue-600 hover:bg-blue-700">
                        Accept & Continue
                    </Button>
                </div>
            </div>
        </div>
    </div>
);

// Enhanced FAQ Modal
// const FAQModal = ({ onClose }: { onClose: () => void }) => {
//     const faqItems = [
//         {
//             question: "How does the subscription billing work?",
//             answer: "Subscriptions are billed automatically based on your selected plan (monthly or yearly). You'll receive an invoice 3 days before each billing cycle and can cancel anytime with 30 days notice."
//         },
//         {
//             question: "What types of leads will I receive?",
//             answer: "You'll receive verified leads from potential clients actively seeking legal services in your practice areas. All leads include contact information, case details, and urgency level."
//         },
//         {
//             question: "Can I upgrade or downgrade my plan?",
//             answer: "Yes, you can change your plan anytime. Upgrades take effect immediately, while downgrades take effect at your next billing cycle. No fees for plan changes."
//         },
//         {
//             question: "Is there a minimum contract period?",
//             answer: "No, there are no long-term contracts. You can cancel your subscription anytime with 30 days written notice. We believe in earning your business through value."
//         },
//         {
//             question: "How is my data protected?",
//             answer: "We use bank-level encryption and comply with all legal industry standards including attorney-client privilege protection. All data is stored securely and never shared with third parties."
//         },
//         {
//             question: "What support is included?",
//             answer: "All plans include email support. Growth plan includes priority support (24hr response), and Pro Plus includes dedicated account management with real-time support."
//         }
//     ];

//     return (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
//                 <div className="p-6 border-b border-gray-200">
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-3">
//                             <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
//                                 <HelpCircle className="w-5 h-5 text-blue-600" />
//                             </div>
//                             <div>
//                                 <h3 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h3>
//                                 <p className="text-sm text-gray-600">Common questions about our subscription service</p>
//                             </div>
//                         </div>
//                         <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//                             <X className="w-5 h-5" />
//                         </button>
//                     </div>
//                 </div>

//                 <div className="p-6 overflow-y-auto max-h-96">
//                     <Accordion type="single" collapsible className="w-full">
//                         {faqItems.map((item, idx) => (
//                             <AccordionItem key={idx} value={`item-${idx}`} className="border-gray-200">
//                                 <AccordionTrigger className="text-left hover:no-underline">
//                                     <span className="font-medium text-gray-900 text-sm">{item.question}</span>
//                                 </AccordionTrigger>
//                                 <AccordionContent className="text-gray-600 leading-relaxed text-sm">
//                                     {item.answer}
//                                 </AccordionContent>
//                             </AccordionItem>
//                         ))}
//                     </Accordion>
//                 </div>

//                 <div className="p-6 border-t border-gray-200 bg-gray-50">
//                     <Button onClick={onClose} className="w-full">
//                         Close
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// Success Modal
const SuccessModal = ({ onClose, planName }: { onClose: () => void; planName: string }) => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-md w-full shadow-2xl overflow-hidden">
            <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Subscription Request Submitted!</h3>
                <p className="text-gray-600 mb-6">
                    Your {planName} plan subscription request has been received. Our team will contact you within 24 hours to complete the setup.
                </p>
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <p className="text-sm text-blue-800">
                        <strong>Next Steps:</strong><br />
                        1. Check your email for confirmation<br />
                        2. Our team will verify your credentials<br />
                        3. Account activation within 24 hours
                    </p>
                </div>
                <Button onClick={onClose} className="w-full bg-blue-600 hover:bg-blue-700">
                    Continue to Login
                </Button>
            </div>
        </div>
    </div>
);

const SubscriptionForm = () => {
    const iconMap = {
        Users,
        Zap,
        Crown,
        Building
    };
    // Get plan details from mock location state (in real app this would come from useLocation)
    const navigate=useRouter()
   const { selectedPlan,isPlanLoaded,selectedRegions,setSelectedRegions } = usePlan();
 useEffect(()=>{

    //  console.log("Selected Plan:", selectedPlan);
 },[selectedPlan])

  // state setup
  const [price, setPrice] = useState('');
  const [planName, setPlanName] = useState('');
  const [icon, setIcon] = useState('');
//   const IconComponent=selectedPlan.icon
  useEffect(() => {
  if (isPlanLoaded && selectedPlan) {
    setPrice(selectedPlan.price);
    setPlanName(selectedPlan.name);
    setIcon(selectedPlan.icon);
    // setSelectedRegions(selectedPlan.regions)
  }
}, [isPlanLoaded, selectedPlan]);
useEffect(() => {
    // console.log('useeffect register')
  if (isPlanLoaded && selectedPlan) {
    setPrice(selectedPlan.price);
    // console.log('inside register',selectedPlan.price)
    setPlanName(selectedPlan.name);
  
    //  console.log('inside register',selectedPlan.name)
    setIcon(selectedPlan.icon);
      const IconComponent=iconMap[selectedPlan?.icon]
    //  console.log('inside register',selectedPlan.icon)
    setSelectedRegions(selectedPlan.regions); // ✅ sync regions here

    // also update formData to include those regions
    setFormData(prev => ({
      ...prev,
      regions: selectedPlan.regions
    }));
 setFormData(prev => ({
      ...prev,
      plan: selectedPlan.name
    }));

  }
}, [isPlanLoaded, selectedPlan]);
// useEffect(() => {
//   if (isPlanLoaded && !selectedPlan) {
//     alert("Please select a plan before proceeding.");
//     navigate.replace("/signup"); // or whatever your plans page route is
//   }
// }, [isPlanLoaded, selectedPlan, navigate]);
  const [changePlan, setChangePlan] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
    const plan = plans.find((p) => p.name === planName)
    // console.log(plans)
    // console.log("this are the plans", plan)
    // console.log(icon)
    type IconName = keyof typeof iconMap;
    const IconComponent = iconMap[icon as IconName]
    // console.log(IconComponent)
type Lawyer = {
  lawyerName: string;
  barCouncilId: string;
  jurisdiction: string;
  phone: string;
  email: string;
  practiceAreas: string[];
  experience: string;
  firm: string;
  plan:any;
  regions:any

};

    const [formData, setFormData] = useState<Lawyer>({
        lawyerName: '',
        barCouncilId: '',
        jurisdiction: '',
        phone: '',
        email: '',
        practiceAreas: [] as string[],
        experience: '',
        firm: '',
        plan:selectedPlan?.name,
        regions:selectedPlan?.regions
    });

    const [formState, setFormState] = useState({
        isSubmitting: false,
        showSuccessModal: false,
        showTermsModal: false,
        showFaqModal: false,
        termsAccepted: false,
        currentStep: 1
    });

    const [validation, setValidation] = useState({
        email: { isValid: true, message: '' },
        phone: { isValid: true, message: '' },
        name: { isValid: true, message: '' }
    });

    const [focusedFields, setFocusedFields] = useState({
        lawyerName: false,
        email: false,
        phone: false,
        barCouncilId: false,
        firm: false
    });

    const practiceAreaOptions = [
        'Civil Law', 'Criminal Law', 'Family Law', 'Corporate Law',
        'Tax Law', 'Property Law', 'Labour Law', 'Constitutional Law',
        'Environmental Law', 'Intellectual Property', 'Immigration Law'
    ];

    const handleInputChange = (field: any, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        // Real-time validation
        if (field === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setValidation(prev => ({
                ...prev,
                email: {
                    isValid: emailRegex.test(value) || value === '',
                    message: emailRegex.test(value) || value === '' ? '' : 'Please enter a valid email address'
                }
            }));
        }

        if (field === 'phone') {
            const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
            setValidation(prev => ({
                ...prev,
                phone: {
                    isValid: phoneRegex.test(value) || value === '',
                    message: phoneRegex.test(value) || value === '' ? '' : 'Please enter a valid phone number'
                }
            }));
        }

        if (field === 'lawyerName') {
            setValidation(prev => ({
                ...prev,
                name: {
                    isValid: value.length >= 2 || value === '',
                    message: value.length >= 2 || value === '' ? '' : 'Name must be at least 2 characters'
                }
            }));
        }
    };

    const handlePracticeAreaToggle = (area: string) => {
        setFormData(prev => ({
            ...prev,
            practiceAreas: prev.practiceAreas.includes(area)
                ? prev.practiceAreas.filter(a => a !== area)
                : [...prev.practiceAreas, area]
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmit(!isSubmit)
        // console.log('change plan is disabled')
        // console.log('advregister form', formData)


        if (!formState.termsAccepted) {
            alert("Please agree to the Terms and Conditions before submitting.");
            return;
        }

        // Validate required fields
        const requiredFields = ['lawyerName', 'email', 'phone','barCouncilId'];
        const missingFields = requiredFields.filter(field => !formData[field as keyof Lawyer]);

        if (missingFields.length > 0) {
            alert("Please fill in all required fields.");
            return;
        }

        // Check validation
        const hasValidationErrors = Object.values(validation).some(v => !v.isValid);
        if (hasValidationErrors) {
            alert("Please fix the validation errors before submitting.");
            return;
        }

        setFormState(prev => ({ ...prev, isSubmitting: true }));

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            const res = await axios.post('http://localhost:3001/api/register', { formData })
            // console.log('res from server', res)
            // console.log('Subscription form submitted:', formData);
            const planName = res.data.planDetails.name;
            const price = res.data.planDetails.price;
            // console.log(planName,price)
        navigate.replace(`/Payments?plan=${encodeURIComponent(planName)}&price=${price}`);

            setFormState(prev => ({
                ...prev,
                isSubmitting: false,
                showSuccessModal: true
            }));
        } catch (error) {
            setFormState(prev => ({ ...prev, isSubmitting: false }));
            alert("Submission failed. Please try again.");
        }
        setFormData((prev) => ({
            ...prev,
            lawyerName: '',
            barCouncilId: '',
            jurisdiction: '',
            phone: '',
            email: '',
            practiceAreas: [] as string[],
            experience: '',
            firm: ''
        }));
    }
    const handleSuccessClose = () => {
        setFormState(prev => ({ ...prev, showSuccessModal: false }));
        navigate.replace('/login');
    };

    const setFieldFocus = (field: string, focused: boolean) => {
        setFocusedFields(prev => ({ ...prev, [field]: focused }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            {/* Header */}
            <div className="bg-black shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-7">
                    <div className="flex items-center justify-between h-16">
                        <Link href='/signup' className="inline-flex items-center text-white hover:text-white transition-colors group">
                            <>
                                <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                                <span className="font-medium">Back to Plans</span>
                            </></Link>

                        <div className="hidden lg:flex items-center gap-3">
                            <div className="w-14 h-14 bg-white flex items-center rounded-lg  justify-center">
                                {/* <Scale className="w-7 h-7 text-white" /> */}
                                <img src="/jpicon4.png" alt="img" className="w-14 h-14 rounded-lg" />
                            </div>
                            <span className="text-xl font-semibold text-white font-serif">JP Law Suvidha</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-7 sm:px-6 lg:px-7 py-7">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
                    {/* Main Form */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader className="border-b border-gray-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                        <User className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">Complete Your Subscription</h2>
                                        <p className="text-gray-600">Please provide your professional details to get started</p>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="p-7">
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    {/* Personal Information Section */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                            <User className="w-5 h-5 text-blue-600" />
                                            Personal Information
                                        </h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Lawyer Name */}
                                            <div className="relative">
                                                <input
                                                    id="lawyerName"
                                                    type="text"
                                                    value={formData.lawyerName}
                                                    onChange={(e) => handleInputChange('lawyerName', e.target.value)}
                                                    onFocus={() => setFieldFocus('lawyerName', true)}
                                                    onBlur={() => setFieldFocus('lawyerName', false)}
                                                    className={`w-full h-14 px-4 pt-6 pb-2 border-2 rounded-lg transition-colors bg-white ${validation.name.isValid
                                                        ? focusedFields.lawyerName ? 'border-blue-500 focus:border-blue-500' : 'border-gray-200 hover:border-gray-300'
                                                        : 'border-red-500'
                                                        }`}
                                                    // className="w-full h-14 px-4 pt-6 pb-2 border-2 border-gray-400 rounded-lg hover:border-blue-700 "

                                                    placeholder=" "
                                                    required
                                                />
                                                <Label
                                                    htmlFor="lawyerName"
                                                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedFields.lawyerName || formData.lawyerName
                                                        ? 'top-2 text-xs font-medium text-blue-600'
                                                        : 'top-4 text-base text-gray-500'
                                                        }`}
                                                >
                                                    Full Name *
                                                </Label>
                                                {!validation.name.isValid && (
                                                    <p className="text-xs text-red-600 mt-1">{validation.name.message}</p>
                                                )}
                                            </div>

                                            {/* Phone */}
                                            <div className="relative">
                                                <input
                                                    id="phone"
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                                    onFocus={() => setFieldFocus('phone', true)}
                                                    onBlur={() => setFieldFocus('phone', false)}
                                                    className={`w-full h-14 px-4 pt-6 pb-2 border-2 rounded-lg transition-colors bg-white ${validation.phone.isValid
                                                        ? focusedFields.phone ? 'border-blue-500 focus:border-blue-500' : 'border-gray-200 hover:border-gray-300'
                                                        : 'border-red-500'
                                                        }`}
                                                    placeholder=" "
                                                    required
                                                />
                                                <Label
                                                    htmlFor="phone"
                                                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedFields.phone || formData.phone
                                                        ? 'top-2 text-xs font-medium text-blue-600'
                                                        : 'top-4 text-base text-gray-500'
                                                        }`}
                                                >
                                                    Phone Number *
                                                </Label>
                                                <Phone className="absolute right-4 top-4 w-5 h-5 text-gray-400" />
                                                {!validation.phone.isValid && (
                                                    <p className="text-xs text-red-600 mt-1">{validation.phone.message}</p>
                                                )}
                                            </div>
                                            {/* Email */}
                                            <div className="relative">
                                                <input
                                                    id="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                                    onFocus={() => setFieldFocus('email', true)}
                                                    onBlur={() => setFieldFocus('email', false)}
                                                    className={`w-full h-14 px-4 pt-6 pb-2 border-2 rounded-lg transition-colors bg-white ${validation.email.isValid
                                                        ? focusedFields.email ? 'border-blue-500 focus:border-blue-500' : 'border-gray-200 hover:border-gray-300'
                                                        : 'border-red-500'
                                                        }`}
                                                    placeholder=" "
                                                    required
                                                />
                                                <Label
                                                    htmlFor="email"
                                                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedFields.email || formData.email
                                                        ? 'top-2 text-xs font-medium text-blue-600'
                                                        : 'top-4 text-base text-gray-500'
                                                        }`}
                                                >
                                                    Email Address *
                                                </Label>
                                                <Mail className="absolute right-4 top-4 w-5 h-5 text-gray-400" />
                                                {!validation.email.isValid && (
                                                    <p className="text-xs text-red-600 mt-1">{validation.email.message}</p>
                                                )}
                                            </div>


                                            {/* Firm Name */}
                                            <div className="relative">
                                                <input
                                                    id="firm"
                                                    type="text"
                                                    value={formData.firm}
                                                    onChange={(e) => handleInputChange('firm', e.target.value)}
                                                    onFocus={() => setFieldFocus('firm', true)}
                                                    onBlur={() => setFieldFocus('firm', false)}
                                                    className={`w-full h-14 px-4 pt-6 pb-2 border-2 rounded-lg transition-colors bg-white ${focusedFields.firm ? 'border-blue-500 focus:border-blue-500' : 'border-gray-200 hover:border-gray-300'
                                                        }`}
                                                    placeholder=" "
                                                />
                                                <Label
                                                    htmlFor="firm"
                                                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedFields.firm || formData.firm
                                                        ? 'top-2 text-xs font-medium text-blue-600'
                                                        : 'top-4 text-base text-gray-500'
                                                        }`}
                                                >
                                                   Place of Practice
                                                </Label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Professional Information Section */}
                                    <div className="border-t border-gray-200 pt-8">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                            <Scale className="w-5 h-5 text-blue-600" />
                                            Professional Information
                                        </h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Bar Council ID */}
                                            <div className="relative">
                                                <input
                                                    id="barCouncilId"
                                                    type="text"
                                                    value={formData.barCouncilId}
                                                    onChange={(e) => handleInputChange('barCouncilId', e.target.value)}
                                                    onFocus={() => setFieldFocus('barCouncilId', true)}
                                                    onBlur={() => setFieldFocus('barCouncilId', false)}
                                                    className={`w-full h-14 px-4 pt-6 pb-2 border-2 rounded-lg transition-colors bg-white ${focusedFields.barCouncilId ? 'border-blue-500 focus:border-blue-500' : 'border-gray-200 hover:border-gray-300'
                                                        }`}
                                                    placeholder=" "
                                                />
                                                <Label
                                                    htmlFor="barCouncilId"
                                                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedFields.barCouncilId || formData.barCouncilId
                                                        ? 'top-2 text-xs font-medium text-blue-600'
                                                        : 'top-4 text-base text-gray-500'
                                                        }`}
                                                >
                                                    Bar Council ID *
                                                </Label>
                                                <span className='text-sm'>* Bar Council ID is compulsory for verification.</span>
                                            </div>
                                            {/* <div>some text</div> */}

                                            {/* Primary Jurisdiction */}
                                            {/* <div>
                        <Label className="block text-sm font-medium text-gray-700 mb-2">Primary Jurisdiction</Label>
                        <Select value={formData.jurisdiction} onValueChange={(value) => handleInputChange('jurisdiction', value)}>
                          <SelectTrigger className="w-full h-12 border-2 border-gray-200 hover:border-gray-300">
                            <SelectValue placeholder="Select jurisdiction" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="civil">Civil Law</SelectItem>
                            <SelectItem value="criminal">Criminal Law</SelectItem>
                            <SelectItem value="family">Family Law</SelectItem>
                            <SelectItem value="corporate">Corporate Law</SelectItem>
                            <SelectItem value="tax">Tax Law</SelectItem>
                            <SelectItem value="property">Property Law</SelectItem>
                          </SelectContent>
                        </Select>
                      </div> */}

                                            {/* Experience */}
                                            <div className='relative -mt-4'>
                                                <Label className="block text-sm font-medium text-gray-700">Years of Experience</Label>
                                                <Select value={formData.experience} onValueChange={(value: string) => handleInputChange('experience', value)}>
                                                    <SelectTrigger className="w-full h-14 border-2 border-gray-200 hover:border-gray-300">
                                                        <SelectValue placeholder="Select experience" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="0-2">0-2 years</SelectItem>
                                                        <SelectItem value="3-5">3-5 years</SelectItem>
                                                        <SelectItem value="6-10">6-10 years</SelectItem>
                                                        <SelectItem value="11-15">11-15 years</SelectItem>
                                                        <SelectItem value="15+">15+ years</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        {/* Practice Areas */}
                                        <div className="mt-6">
                                            <Label className="block text-sm font-medium text-gray-700 mb-3">Practice Areas (Select all that apply)</Label>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                {practiceAreaOptions.map((area) => (
                                                    <div key={area} className="flex items-center space-x-2">
                                                        <Checkbox
                                                            id={area}
                                                            checked={formData.practiceAreas.includes(area)}
                                                            onCheckedChange={() => handlePracticeAreaToggle(area)}
                                                            className="rounded"
                                                        />
                                                        <Label htmlFor={area} className="text-sm text-gray-700 cursor-pointer">
                                                            {area}
                                                        </Label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>


                                    {/* Terms and Actions */}
                                    <div className="border-t border-gray-200 pt-8">
                                        <div className="flex items-start gap-3 mb-6">
                                            <Checkbox
                                                id="terms"
                                                checked={formState.termsAccepted}
                                                onCheckedChange={(checked: boolean) => setFormState(prev => ({ ...prev, termsAccepted: checked as boolean }))}
                                                className="mt-1 rounded"
                                            />
                                            <Label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer leading-relaxed">
                                                I agree to the{' '}
                                                <button
                                                    type="button"
                                                    className="text-blue-600 hover:text-blue-800 underline transition-colors"
                                                    onClick={() => setFormState(prev => ({ ...prev, showTermsModal: true }))}
                                                >
                                                    Terms and Conditions
                                                </button>
                                                {' '}and understand the subscription billing terms.
                                            </Label>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <Button
                                                type="submit"
                                                disabled={formState.isSubmitting || !formState.termsAccepted}
                                                className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
                                            >
                                                {formState.isSubmitting ? (
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                        Processing Request...
                                                    </div>
                                                ) : (
                                                    <>
                                                        Submit Subscription Request
                                                    </>
                                                )}
                                            </Button>

                                            {/* <Button
                        type="button"
                        variant="outline"
                        onClick={() => setFormState(prev => ({ ...prev, showFaqModal: true }))}
                        className="border-gray-300 hover:bg-gray-50"
                      >
                        <HelpCircle className="w-4 h-4 mr-2" />
                        FAQ
                      </Button> */}
                                        </div>

                                        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                            <div className="flex items-start gap-3">
                                                <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                                                <div className="text-sm text-blue-800">
                                                    <strong>Secure & Confidential:</strong> Your information is encrypted and protected according to legal industry standards. We never share your data with third parties.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>

                    </div>
                    <div className="lg:col-span-1">
  {/* ✅ Case 1: Plan is still loading */}
  {!isPlanLoaded ? (
    <div className="h-[400px] flex flex-col items-center justify-center text-center bg-gray-50 rounded-xl shadow-sm">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 mb-4"></div>
      <h2 className="text-xl font-semibold text-gray-700">Loading selected plan...</h2>
      <p className="text-gray-500 mt-2">
        Please wait while we fetch your subscription details.
      </p>
    </div>
  ) : !selectedPlan ? (
    /* ✅ Case 2: No plan selected */
    <div className="h-[400px] flex flex-col items-center justify-center text-center bg-gray-50 rounded-xl shadow-sm">
      <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
        <X className="w-8 h-8" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-800">No Plan Selected</h2>
      <p className="text-gray-600 mt-2">
        Please go back and choose a subscription plan to continue.
      </p>
      <Button
        onClick={() => navigate.push("/signup")}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
      >
        View Plans
      </Button>
    </div>
  ) : (
    /* ✅ Case 3: Plan loaded successfully */
    <Card
      key={plan?.name}
      className={`relative flex flex-col justify-between rounded-xl border ${
        plan?.highlight
          ? "border-orange-400 ring-2 ring-orange-300"
          : "border-gray-200"
      } shadow-sm overflow-hidden`}
    >
      {/* Popular Badge */}
      {plan?.highlight && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-400 to-yellow-400 text-white px-4 py-1 text-sm font-bold rounded-bl-lg">
          {plan.badge}
        </div>
      )}

      {/* Savings Badge */}
      {!plan?.highlight && (
        <div className="absolute top-4 right-4">
          {plan?.name !== "Corporate" && plan?.name !== "Trial" && (
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-800 text-xs"
            >
              {plan?.savings}
            </Badge>
          )}
        </div>
      )}

      <CardHeader className={`bg-gradient-to-br ${plan?.color} p-8`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-white/80 flex items-center justify-center">
          {IconComponent ? (
    <IconComponent className="w-6 h-6 text-gray-700" />
  ) : (
    <div className="w-6 h-6" /> // or a skeleton/placeholder
  )}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{plan?.name}</h3>
            {!plan?.highlight && (
              <p className="text-sm text-gray-600">{plan?.badge}</p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-gray-900">
              {plan?.name === "Corporate" ? " " : `₹${plan?.price}`}
            </span>
            <span className="text-gray-600">
              {plan?.name === "Corporate" ? "" : `/${plan?.period}`}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg text-gray-400 line-through">
              {plan?.name !== "Corporate" && plan?.name !== "Trial"
                ? `₹${plan?.originalPrice}`
                : ""}
            </span>

            {plan?.name !== "Corporate" && plan?.name !== "Trial" && (
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800 text-xs"
              >
                {plan?.savings}
              </Badge>
            )}
          </div>
        </div>

        <p className="text-gray-600 leading-relaxed">{plan?.description}</p>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-3">
          <ul className="space-y-2 mt-4">
            {plan?.features.map((feature, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-sm text-gray-700"
              >
                {feature.status ? (
                  <Check className="w-5 h-5 text-green-600 mt-0.5" />
                ) : (
                  <X className="w-5 h-5 text-red-500 mt-0.5" />
                )}
                <span
                  className={
                    feature.status ? "" : "line-through text-gray-400"
                  }
                >
                  {feature.label}
                </span>
              </li>
            ))}
          </ul>
          <span className=''>selected regions</span>
         {Array.isArray(selectedPlan?.regions) && selectedPlan.regions.length > 0 ? (
  selectedPlan.regions.map((r) => <li key={r}>{r}</li>)
) : (
  <li>No regions selected</li>
)}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <button
              className="px-4 py-2 border border-blue-700 text-blue-700 font-medium rounded-lg hover:bg-blue-700 hover:text-white transition duration-200 shadow-sm"
              onClick={() => setChangePlan(!changePlan)}
              disabled={isSubmit}
            >
              Change Plan
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )}
</div>


                </div>
            </div>

            {/* Modals */}
            {formState.showTermsModal && (
                <TermsAndConditionsModalSubscription
                    onClose={() => setFormState(prev => ({ ...prev, showTermsModal: false }))}
                    onAccept={() => setFormState(prev => ({
                        ...prev,
                        showTermsModal: false,
                        termsAccepted: true
                    }))}
                />
            )}

            {/* {formState.showFaqModal && (
        <FAQModal onClose={() => setFormState(prev => ({ ...prev, showFaqModal: false }))} />
      )} */}
            {
        changePlan &&
        (<ChangePlan onSelect={function (planName: string, price: string, icon: any,requiredRegions:any): void {
          //  price=price
          //  planName=planName
          //  console.log('new price',price)
          setPrice(price)
          setPlanName(planName)
          setIcon(icon)
          // console.log(icon)
          setChangePlan(!changePlan)

        }} onClose={function (): void {
          // throw new Error('Function not implemented.');
          setChangePlan(!changePlan)
        }} />)
      }
            {formState.showSuccessModal && (
                <SuccessModal onClose={handleSuccessClose} planName={planName} />
            )}
            <Footer />
        </div>
    );
};

export default SubscriptionForm;

// import React from 'react'

// function Register() {
//   return (
//     <div>Register Component goes here</div>
//   )
// }

// export default Register