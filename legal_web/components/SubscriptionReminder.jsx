import React from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const SubscriptionReminder = ({ profile }) => {
    if (!profile || !profile.expiryDate) return null;

    const expiry = new Date(profile.expiryDate);
    const today = new Date();
    const timeDiff = expiry.getTime() - today.getTime();
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

    // Only show if it's within 7 days and has not expired yet
    if (daysRemaining < 0 || daysRemaining > 7) return null;

    return (
        <div className="mb-6 bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="bg-orange-200 p-2 rounded-lg">
                    <AlertTriangle className="text-orange-700 w-5 h-5" />
                </div>
                <div>
                    <h3 className="font-semibold text-orange-900">Subscription Renewal</h3>
                    <p className="text-sm text-orange-700">
                        Your premium subscription is expiring in <span className="font-bold">{daysRemaining} {daysRemaining === 1 ? 'day' : 'days'}</span> ({expiry.toLocaleDateString()}). Renew now to maintain uninterrupted access.
                    </p>
                </div>
            </div>
            <Link
                href="/signup"
                className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm whitespace-nowrap"
            >
                Renew Now
                <ArrowRight size={16} />
            </Link>
        </div>
    );
};

export default SubscriptionReminder;
