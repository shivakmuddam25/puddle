// app/(protected)/parent-dashboard/payments/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  CreditCard, 
  Wallet, 
  Calendar, 
  Download, 
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import UserProfile from '@/components/UserProfile';

interface Payment {
  id: string;
  amount: number;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  payment_date: string;
  invoice_number?: string;
  child_name?: string;
}

export default function PaymentsPage() {
  const router = useRouter();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [parentData, setParentData] = useState<any>(null);

  // Payment form
  const [paymentForm, setPaymentForm] = useState({
    amount: '',
    childId: '',
    description: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      
      // Fetch payments
      const paymentsRes = await fetch('/api/parent/payments', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (paymentsRes.ok) {
        const data = await paymentsRes.json();
        setPayments(data.payments || []);
      }
      
      // Fetch parent profile and children
      const profileRes = await fetch('/api/parent/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (profileRes.ok) {
        const data = await profileRes.json();
        setParentData(data);
      }
      
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMakePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!paymentForm.amount || parseFloat(paymentForm.amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    
    try {
      setProcessing(true);
      setError(null);
      
      const token = localStorage.getItem('authToken');
      
      const response = await fetch('/api/parent/payments', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          amount: parseFloat(paymentForm.amount),
          childId: paymentForm.childId || undefined,
          description: paymentForm.description || 'Course Payment'
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess('Payment initiated successfully!');
        setPaymentForm({ amount: '', childId: '', description: '' });
        fetchData(); // Refresh payments list
        setTimeout(() => setSuccess(null), 3000);
      } else {
        throw new Error(data.error || 'Payment failed');
      }
    } catch (error: any) {
      setError(error.message || 'Failed to process payment');
      setTimeout(() => setError(null), 3000);
    } finally {
      setProcessing(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 text-blue-600 animate-spin mx-auto" />
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/parent-dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <ArrowLeft size={20} />
                Back to Dashboard
              </Link>
              <Link href="/" className="text-xl font-bold text-blue-800">
                Puddle
              </Link>
            </div>
            <UserProfile />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payments</h1>
          <p className="text-gray-600 mb-6">Manage your payments and subscriptions</p>

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <p className="text-green-700">{success}</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Make Payment Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-20">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  <h2 className="text-lg font-semibold">Make a Payment</h2>
                </div>
                
                <form onSubmit={handleMakePayment} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
                    <input
                      type="number"
                      value={paymentForm.amount}
                      onChange={(e) => setPaymentForm({...paymentForm, amount: e.target.value})}
                      placeholder="Enter amount"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">For Child (Optional)</label>
                    <select
                      value={paymentForm.childId}
                      onChange={(e) => setPaymentForm({...paymentForm, childId: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">General Payment</option>
                      {parentData?.children?.map((child: any) => (
                        <option key={child.id} value={child.id}>{child.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                    <input
                      type="text"
                      value={paymentForm.description}
                      onChange={(e) => setPaymentForm({...paymentForm, description: e.target.value})}
                      placeholder="e.g., Monthly Subscription"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {processing ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Wallet className="h-4 w-4" />
                        Pay Now
                      </>
                    )}
                  </button>
                </form>
                
                <div className="mt-6 pt-6 border-t">
                  <p className="text-xs text-gray-500 text-center">
                    Secure payment processing. All transactions are encrypted.
                  </p>
                </div>
              </div>
            </div>

            {/* Payment History */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Payment History</h2>
                    <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
                      <Download size={14} />
                      Export
                    </button>
                  </div>
                </div>
                
                <div className="divide-y">
                  {payments.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                      No payment history found.
                    </div>
                  ) : (
                    payments.map((payment) => (
                      <div key={payment.id} className="p-4 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">
                              {formatCurrency(payment.amount)}
                            </p>
                            <p className="text-sm text-gray-500">{payment.description || 'Course Payment'}</p>
                            {payment.child_name && (
                              <p className="text-xs text-gray-400">For: {payment.child_name}</p>
                            )}
                          </div>
                          <div className="text-right">
                            <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                              payment.status === 'completed' ? 'bg-green-100 text-green-700' :
                              payment.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                            </span>
                            <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                              <Calendar size={10} />
                              {formatDate(payment.payment_date)}
                            </p>
                          </div>
                        </div>
                        {payment.invoice_number && (
                          <div className="mt-2">
                            <button className="text-xs text-blue-600 hover:text-blue-700">
                              View Invoice #{payment.invoice_number}
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}