"use client";
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from "next/navigation";

// Separate component that uses useSearchParams
function PaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const qOrderId = searchParams?.get('plan');
  const Order_price = searchParams?.get('price');

alert(`Order ID:${qOrderId}, price:${Order_price}`);

  const [order, setOrder] = useState<{ price?: string | null }>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [billing, setBilling] = useState({ name: '', email: '', phone: '' });
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (!qOrderId) return;
    setLoading(true);
    fetch(`http://localhost:3001/api/orders/${qOrderId}`)
      .then((r) => {
        if (!r.ok) throw new Error('Order not found');
        return r.json();
      })
      .then((data) => {
        // console.log('data in payments page', data);
        if (data.success) {
          setOrder({ price: data.data.price });
        } else {
          throw new Error('Plan not found');
        }
        setBilling((b) => ({ ...b, email: data.email || '', name: data.name || '' }));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [qOrderId]);

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBilling({ ...billing, [e.target.name]: e.target.value });
  };

  const handlePayNow = async () => {
    if (!order) return setError('No order loaded');
    setProcessing(true);
    setError('');

    try {
      // Payment processing logic here
      setTimeout(() => {
        router.push('/dashboard');
      }, 1200);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Complete Payment</h2>
          <div className="text-sm text-gray-500">Order: {qOrderId || '—'}</div>
        </div>

        {loading && <div className="py-6 text-center">Loading order…</div>}
        {error && <div className="mb-4 text-red-600">{error}</div>}
        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded">
            <strong>Payment successful!</strong>
          </div>
        )}

        {!loading && order && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Payment form */}
            <div className="space-y-4">
              <div className="border p-4 rounded-lg">
                <div className="text-sm text-gray-600">Plan</div>
                <div className="text-lg font-medium">{qOrderId}</div>
              </div>

              <div className="border p-4 rounded-lg">
                <div className="text-sm text-gray-600">Amount</div>
                <div className="mt-1 text-2xl font-bold">{`INR ${order.price}`}</div>
                <div className="mt-3 text-xs text-gray-500">Amount is set by server and can't be changed here.</div>
              </div>

              <div className="border p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-2">Choose payment method</div>
                <div className="space-y-2">
                  <label className="flex items-center gap-3">
                    <input checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} type="radio" name="method" />
                    <span className="font-medium">UPI (recommended)</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} type="radio" name="method" />
                    <span className="font-medium">Card</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input checked={paymentMethod === 'netbanking'} onChange={() => setPaymentMethod('netbanking')} type="radio" name="method" />
                    <span className="font-medium">Netbanking</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input checked={paymentMethod === 'wallet'} onChange={() => setPaymentMethod('wallet')} type="radio" name="method" />
                    <span className="font-medium">Wallet</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  className="flex-1 py-3 rounded-lg bg-indigo-600 text-white font-semibold disabled:opacity-50"
                  onClick={handlePayNow}
                  disabled={processing}
                >
                  {processing ? 'Processing…' : `Pay INR ${order.price}`}
                </button>
                <button
                  className="py-3 px-4 rounded-lg border"
                  onClick={() => router.back()}
                  disabled={processing}
                >
                  Cancel
                </button>
              </div>
            </div>

            {/* Right: Billing & Summary */}
            <div className="space-y-4">
              <div className="border p-4 rounded-lg">
                <div className="text-sm text-gray-600">Billing Details</div>
                <div className="mt-3 space-y-3">
                  <input name="name" value={billing.name} onChange={handleBillingChange} placeholder="Full name" className="w-full border rounded px-3 py-2" />
                  <input name="email" value={billing.email} onChange={handleBillingChange} placeholder="Email" className="w-full border rounded px-3 py-2" />
                  <input name="phone" value={billing.phone} onChange={handleBillingChange} placeholder="Phone" className="w-full border rounded px-3 py-2" />
                </div>
                <div className="mt-2 text-xs text-gray-500">Billing fields are optional but helpful for receipts.</div>
              </div>

              <div className="border p-4 rounded-lg">
                <div className="text-sm text-gray-600">Order Summary</div>
                <div className="mt-3">
                  <div className="flex justify-between">
                    <div>{qOrderId}</div>
                    <div>INR {order.price}</div>
                  </div>
                  <div className="mt-3 border-t pt-3 text-lg font-semibold flex justify-between">
                    <div>Total</div>
                    <div>INR {order.price}</div>
                  </div>
                </div>
              </div>

              <div className="text-xs text-gray-500">By clicking Pay, you agree to our Terms & Privacy.</div>
            </div>
          </div>
        )}

        {!loading && !order && !error && (
          <div className="py-6 text-center text-gray-500">No order loaded. Provide an orderId query param.</div>
        )}
      </div>
    </div>
  );
}

// Main component with Suspense wrapper
export default function PaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading payment details...</p>
        </div>
      </div>
    }>
      <PaymentContent />
    </Suspense>
  );
}