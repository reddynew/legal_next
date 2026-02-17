export function PhoneClickTracker(phone: any): void {
    if (typeof window === 'undefined') return;
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
        event: 'phone_click',
        phone_number: phone
    });
};
