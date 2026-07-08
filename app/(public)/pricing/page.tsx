// app/pricing/page.tsx
"use client";

import Link from 'next/link';
import { 
  CheckCircle, 
  ArrowRight, 
  Home,
  GraduationCap,
  School,
  ChevronLeft,
  BadgeCheck,
  TrendingUp,
  HelpCircle
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface Plan {
  id: string;
  grade_range_start: number;
  grade_range_end: number;
  monthly_price: number;
  yearly_price: number;
  description: string;
  is_active: boolean;
  display_order: number;
}

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [availableGrades, setAvailableGrades] = useState<number[]>([]);

  useEffect(() => {
    fetchPlans();
  }, []);

  useEffect(() => {
    if (plans.length > 0) {
      const grades: number[] = [];
      plans.forEach(plan => {
        for (let i = plan.grade_range_start; i <= plan.grade_range_end; i++) {
          if (!grades.includes(i)) grades.push(i);
        }
      });
      setAvailableGrades(grades.sort((a, b) => a - b));
      if (grades.length > 0 && selectedGrade === null) setSelectedGrade(grades[0]);
    }
  }, [plans]);

  useEffect(() => {
    if (selectedGrade !== null) {
      const plan = plans.find(p => selectedGrade >= p.grade_range_start && selectedGrade <= p.grade_range_end);
      setSelectedPlan(plan || null);
    }
  }, [selectedGrade, plans]);

  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/plans');
      const data = await response.json();
      if (response.ok && data.plans) {
        setPlans(data.plans.filter((p: Plan) => p.is_active));
      }
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setLoading(false);
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

  // Apply psychological pricing: reduce by ₹1 to create left-digit effect
  const getPsychPrice = (price: number) => price;

  const getGradeRangeDescription = (plan: Plan | null) => {
    if (!plan) return '';
    if (plan.grade_range_start === plan.grade_range_end) {
      return `Grade ${plan.grade_range_start}`;
    }
    return `Grades ${plan.grade_range_start} - ${plan.grade_range_end}`;
  };

  const yearlyDiscountPercent = (monthly: number, yearly: number) => {
    return ((monthly * 12 - yearly) / (monthly * 12) * 100).toFixed(0);
  };

  const monthlyEquivalent = (yearly: number) => {
    return (yearly / 12).toFixed(0);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-olive-50/30 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-olive-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading pricing plans...</p>
        </div>
      </div>
    );
  }

  if (plans.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-olive-50/30 to-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <HelpCircle className="h-16 w-16 text-olive-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Plans Available</h2>
          <p className="text-gray-600 mb-6">
            Subscription plans are currently being set up. Please check back soon!
          </p>
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-olive-600 text-white rounded-lg hover:bg-olive-700">
            <Home className="h-5 w-5" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-olive-50/30 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-olive-800 to-olive-900 text-white">
        <div className="container mx-auto px-6 py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
            <p className="text-xl md:text-2xl text-olive-100 mb-8">
              Choose the perfect plan for your grade. All plans include our core features.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Grade Selector */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-olive-200">
            <div className="flex items-center gap-2 mb-4">
              <School className="h-6 w-6 text-olive-600" />
              <h2 className="text-xl font-semibold text-gray-900">Select Your Grade</h2>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
              {availableGrades.map((grade) => (
                <button
                  key={grade}
                  onClick={() => setSelectedGrade(grade)}
                  className={`py-3 rounded-lg font-medium transition-all ${
                    selectedGrade === grade
                      ? 'bg-gradient-to-r from-olive-500 to-emerald-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {grade}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing Card */}
        {selectedPlan && (
          <div className="max-w-3xl mx-auto mb-16">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-olive-200">
              <div className="bg-gradient-to-r from-olive-50 to-emerald-50 p-6 text-center border-b border-olive-200">
                <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1 mb-4 shadow-sm">
                  <BadgeCheck className="h-5 w-5 text-olive-600" />
                  <span className="text-sm font-medium text-olive-700">Recommended Plan</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {getGradeRangeDescription(selectedPlan)}
                </h2>
                <p className="text-gray-600 mt-1">{selectedPlan.description}</p>
              </div>

              <div className="p-8">
                {/* Pricing Options */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {/* Monthly Option */}
                  <div className={`border-2 rounded-xl p-6 transition-all ${billingCycle === 'monthly' ? 'border-olive-500 bg-olive-50' : 'border-gray-200 hover:border-olive-300'}`}>
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Monthly</h3>
                      <div className="flex items-baseline justify-center gap-1 mb-2">
                        <span className="text-4xl font-bold text-gray-900">
                          {formatCurrency(getPsychPrice(selectedPlan.monthly_price))}
                        </span>
                        <span className="text-gray-600">/month</span>
                      </div>
                      <p className="text-sm text-gray-500">Billed monthly</p>
                    </div>
                  </div>

                  {/* Yearly Option – Best Value */}
                  <div className={`border-2 rounded-xl p-6 transition-all relative ${billingCycle === 'yearly' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-emerald-300'}`}>
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        BEST VALUE
                      </span>
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Yearly</h3>
                      <div className="flex items-baseline justify-center gap-1 mb-1">
                        <span className="text-4xl font-bold text-gray-900">
                          {formatCurrency(getPsychPrice(selectedPlan.yearly_price))}
                        </span>
                        <span className="text-gray-600">/year</span>
                      </div>
                      <p className="text-sm text-emerald-600 font-medium">
                        Just {formatCurrency(parseInt(monthlyEquivalent(selectedPlan.yearly_price)))}/month*
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Billed once a year</p>
                      <p className="text-xs text-green-600 mt-2">
                        Save {yearlyDiscountPercent(selectedPlan.monthly_price, selectedPlan.yearly_price)}% compared to monthly
                      </p>
                    </div>
                  </div>
                </div>

                {/* Savings Comparison Table */}
                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                  <h3 className="font-semibold text-gray-900 mb-4">See what you save with yearly</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 font-medium text-gray-600">Plan</th>
                          <th className="text-right py-2 font-medium text-gray-600">Monthly Price</th>
                          <th className="text-right py-2 font-medium text-gray-600">Total per Year</th>
                          <th className="text-right py-2 font-medium text-gray-600">You Save</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-200">
                          <td className="py-3 text-gray-900">Monthly</td>
                          <td className="text-right text-gray-900">{formatCurrency(selectedPlan.monthly_price)}</td>
                          <td className="text-right text-gray-900">{formatCurrency(selectedPlan.monthly_price * 12)}</td>
                          <td className="text-right text-gray-400">–</td>
                        </tr>
                        <tr>
                          <td className="py-3 text-gray-900 font-medium">Yearly</td>
                          <td className="text-right text-gray-900">
                            {formatCurrency(parseInt(monthlyEquivalent(selectedPlan.yearly_price)))}/mo
                          </td>
                          <td className="text-right text-gray-900">{formatCurrency(selectedPlan.yearly_price)}</td>
                          <td className="text-right text-emerald-600 font-bold">
                            {formatCurrency((selectedPlan.monthly_price * 12) - selectedPlan.yearly_price)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">* Based on yearly subscription, billed annually.</p>
                </div>

                {/* CTA */}
                <Link
                  href="/register"
                  className="w-full block text-center bg-gradient-to-r from-olive-500 to-emerald-500 text-white font-semibold py-4 rounded-xl hover:from-olive-600 hover:to-emerald-600 transition-all shadow-md hover:shadow-lg"
                >
                  Get Started with {billingCycle === 'monthly' ? 'Monthly' : 'Yearly'} Plan
                  <ArrowRight className="inline-block ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* All Plans Overview (Quick Reference) */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            All Subscription Plans
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setSelectedGrade(plan.grade_range_start)}
                className={`bg-white rounded-xl border-2 p-6 transition-all cursor-pointer ${
                  selectedPlan?.id === plan.id
                    ? 'border-olive-500 shadow-lg'
                    : 'border-gray-200 hover:border-olive-300'
                }`}
              >
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    {plan.grade_range_start === plan.grade_range_end
                      ? `Grade ${plan.grade_range_start}`
                      : `Grades ${plan.grade_range_start} - ${plan.grade_range_end}`}
                  </h3>
                  <div className="mt-2">
                    <span className="text-2xl font-bold text-gray-900">
                      {formatCurrency(getPsychPrice(plan.monthly_price))}
                    </span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    or {formatCurrency(getPsychPrice(plan.yearly_price))}/year
                  </div>
                  {plan.grade_range_end - plan.grade_range_start > 0 && (
                    <div className="mt-2 text-xs text-olive-600 bg-olive-50 inline-block px-2 py-1 rounded-full">
                      Covers {plan.grade_range_end - plan.grade_range_start + 1} grades
                    </div>
                  )}
                </div>
                <button
                  className={`w-full py-2 rounded-lg font-medium transition-all ${
                    selectedPlan?.id === plan.id
                      ? 'bg-olive-600 text-white'
                      : 'border border-olive-500 text-olive-600 hover:bg-olive-50'
                  }`}
                >
                  {selectedPlan?.id === plan.id ? 'Selected' : 'Select'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section – keep as before */}
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-olive-100 p-6">
              <h3 className="text-lg font-bold mb-3 text-gray-900">How do I know which plan is right for my grade?</h3>
              <p className="text-gray-600">Simply select your grade above, and we'll show you the recommended plan. Each plan is designed for specific grade ranges to ensure age-appropriate content and difficulty levels.</p>
            </div>
            <div className="bg-white rounded-xl border border-olive-100 p-6">
              <h3 className="text-lg font-bold mb-3 text-gray-900">Can I switch between plans?</h3>
              <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. The changes will be prorated accordingly. If you move to a different grade, the plan will automatically adjust.</p>
            </div>
            <div className="bg-white rounded-xl border border-olive-100 p-6">
              <h3 className="text-lg font-bold mb-3 text-gray-900">Is there a free trial?</h3>
              <p className="text-gray-600">Yes, we offer a 7-day free trial for all plans. No credit card required to start the trial.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-olive-50 to-emerald-50 rounded-2xl p-8 md:p-12 text-center border border-olive-200">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Join thousands of students who are already excelling with Puddle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center bg-gradient-to-r from-olive-500 to-emerald-500 text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity shadow-md"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border-2 border-olive-500 text-olive-600 font-semibold px-8 py-3 rounded-lg hover:bg-olive-50 transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}