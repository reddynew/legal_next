import React, { useState, useEffect } from 'react';
import { Sparkles, Users, Crown, Zap, Building } from 'lucide-react';
import { subscriptionService } from "@/lib/api";
import '../app/index.css';
import clsx from 'clsx';
import plans from '@/Data/plans_data';
const DashboardBanner = () => {
    const [subscription, setSubscription] = useState({});
    const [loading, setLoading] = useState(true);
    const [isEnd, setIsEnd] = useState(false)

    useEffect(() => {
        const fetchSubscription = async () => {

            try {
                const response = await subscriptionService.getSubscription();
                const subscriptionRow = response?.data?.[0];
                console.log('subscription data is', subscriptionRow)
                const ended =
                    new Date(subscriptionRow.subscription_end_date) < Date.now();
                if (ended) {
                    setIsEnd(!isEnd)
                }
                if (!subscriptionRow) return;

                const plan = plans.find(
                    p => String(p.id) === String(subscriptionRow.plan_id)
                );

                setSubscription(prev => ({
                    ...prev,
                    plan: plan?.name ?? 'Unknown Plan',
                    icon: plan?.icon ?? null,
                    regions: subscriptionRow.regions,
                    expiryDate: subscriptionRow.subscription_end_date

                }));
            } catch (err) {
                console.error('[DashboardBanner] Failed to fetch subscription:', err);
            } finally {
                setLoading(false);
            }

        };
        fetchSubscription();
    }, []);
    useEffect(() => {
        console.log('subscription updated:', subscription);
    }, [subscription]);

    if (loading) return null;

    const formattedDate = subscription?.expiryDate ? new Date(subscription.expiryDate).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }) : null;

    console.log('formatted date is', formattedDate)

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let day1 = false, day3 = false, day7 = false;
    let diffInDays = null;

    if (subscription?.expiryDate) {
        const targetDate = new Date(subscription.expiryDate);
        targetDate.setHours(0, 0, 0, 0);

        const diffInDays = Math.max(
            0,
            Math.ceil(
                (targetDate - new Date()) / 86400000
            )
        );

        day1 = diffInDays <= 1 && diffInDays > 0;
        day3 = diffInDays <= 3 && diffInDays > 1;
        day7 = diffInDays <= 7 && diffInDays > 3;
    }

    const iconMap = {
        "Users": Users,
        "Zap": Zap,
        "Crown": Crown,
        "Building": Building
    };
    const IconComponent = iconMap[subscription?.icon] || Sparkles;
    console.log('icon component', IconComponent)


    return (
        <div className="hidden sm:block text-slate-900 px-4 py-3 text-sm relative mb-6 -ml-10">
            <div className="container-custom mx-auto flex items-center justify-between relative z-10 sticky">
                <div className="flex items-center gap-4">
                    <div className='flex items-center gap-1'>
                        <span className='text-slate-900 font-serif'>Subscribed Plan:</span>
                        <div className="flex items-center gap-1 bg-blue-50 border border-blue-100 px-3 py-1 rounded-lg">

                            <IconComponent className="w-4 h-4 text-blue-600" />
                            <span className="font-semibold text-blue-700">
                                {subscription?.plan || 'Basic Plan'}
                            </span>
                        </div>
                    </div>
                    <div className="h-4 w-[1px] bg-gray-400 hidden md:block"></div>

                    <span className="text-slate-900 font-serif">
                        Subscribed Regions: <span className="text-slate-900 font-medium">{Array.isArray(subscription?.regions) ? subscription.regions.join(', ') : (subscription?.regions || 'All India')}</span>
                    </span>

                    <div className="h-4 w-[1px] bg-gray-400 hidden md:block"></div>

                    {formattedDate ? (
                        <div className="flex items-center">
                            <span className="text-slate-900 font-serif">Subscription ends:</span>
                            <span
                                className={clsx(
                                    'px-1 py-0.5 rounded-full  font-bold',
                                    {
                                        'text-orange-500 animate-pulse ': day7,
                                        'text-red-400 animate-pulse ': day3,
                                        'text-red-700 animate-pulse ': day1,
                                        'text-orange-600': !day1 && !day3 && !day7
                                    }
                                )}
                            >                                {formattedDate && !isEnd ? formattedDate : 'subscription ended'}
                            </span>

                        </div>
                    ) : (<span>NEVER ENDS</span>)}
                </div>
            </div>
        </div>
    );
};

export default DashboardBanner;
