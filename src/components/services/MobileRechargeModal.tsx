import React, { useState, useEffect } from 'react';
import {
  X,
  Smartphone,
  CheckCircle2,
  Tag,
  Zap,
  ShieldCheck,
  Flame,
  Wifi,
  Tv,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MobileRechargeModal: React.FC = () => {
  const {
    user,
    activeUtilityServiceModal,
    setActiveUtilityServiceModal,
    processRechargeOrBill,
    setSelectedTransactionForReceipt,
  } = useApp();

  const isOpen = activeUtilityServiceModal === 'mobile';
  const [mobileNumber, setMobileNumber] = useState('');
  const [operator, setOperator] = useState('Airtel');
  const [rechargeType, setRechargeType] = useState<'Prepaid' | 'Postpaid'>('Prepaid');
  const [circle, setCircle] = useState('Maharashtra & Goa');
  const [selectedPlanAmount, setSelectedPlanAmount] = useState<number>(299);
  const [selectedPlanDetails, setSelectedPlanDetails] = useState('1.5GB/Day + Unlimited Calls + 100 SMS/day (28 Days)');
  const [planCategory, setPlanCategory] = useState<'Popular' | '5G' | 'Data' | 'Hero' | 'Annual'>('Popular');
  const [isProcessing, setIsProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState('SPAY15');
  const [isCouponApplied, setIsCouponApplied] = useState(true);

  // Auto-detect operator based on first 2-3 digits
  useEffect(() => {
    if (mobileNumber.length >= 2) {
      const prefix = mobileNumber.slice(0, 2);
      if (['98', '99', '88', '70'].includes(prefix)) setOperator('Airtel');
      else if (['97', '96', '86', '77'].includes(prefix)) setOperator('Jio');
      else if (['91', '90', '84', '78'].includes(prefix)) setOperator('Vodafone Idea (Vi)');
      else if (['94', '95'].includes(prefix)) setOperator('BSNL');
    }
  }, [mobileNumber]);

  if (!isOpen) return null;

  const operators = ['Airtel', 'Jio', 'Vodafone Idea (Vi)', 'BSNL'];
  const circles = [
    'Maharashtra & Goa',
    'Mumbai',
    'Delhi NCR',
    'Karnataka',
    'Tamil Nadu',
    'Gujarat',
    'Uttar Pradesh (West)',
    'Kolkata & WB',
  ];

  const plans = [
    {
      amount: 149,
      validity: '24 Days',
      data: '1 GB/Day',
      calls: 'Unlimited',
      tag: 'Best Value',
      category: 'Popular',
      details: 'Unlimited Local/STD + 1GB/day + 100 SMS/day + Free Hello Tunes',
    },
    {
      amount: 299,
      validity: '28 Days',
      data: '1.5 GB/Day',
      calls: 'Unlimited',
      tag: 'Most Popular',
      category: 'Popular',
      details: '1.5GB/Day + Unlimited 5G Data + Unlimited Calls + 100 SMS/day (28 Days)',
    },
    {
      amount: 349,
      validity: '28 Days',
      data: '2.0 GB/Day',
      calls: 'Unlimited',
      tag: 'True 5G Unlimited',
      category: '5G',
      details: '2GB/Day + Truly Unlimited 5G Data Access + Disney+ Hotstar Mobile 3 Months',
    },
    {
      amount: 666,
      validity: '70 Days',
      data: '1.5 GB/Day',
      calls: 'Unlimited',
      tag: 'Hero Plan',
      category: 'Hero',
      details: 'Unlimited Calls + 1.5GB/day + Binge All Night (12 AM - 6 AM No Data limit)',
    },
    {
      amount: 839,
      validity: '84 Days',
      data: '2.0 GB/Day',
      calls: 'Unlimited',
      tag: 'Super Saver',
      category: 'Popular',
      details: '84 Days Long Validity + 2GB/day + Unlimited Calls + 100 SMS/day',
    },
    {
      amount: 199,
      validity: '30 Days',
      data: '25 GB Bulk',
      calls: 'No Calls',
      tag: 'Data Booster',
      category: 'Data',
      details: '25 GB High Speed 4G/5G Data Add-on with Existing Plan Validity',
    },
    {
      amount: 2999,
      validity: '365 Days',
      data: '2.5 GB/Day',
      calls: 'Unlimited',
      tag: 'Annual King',
      category: 'Annual',
      details: '365 Days Full Year Pack + 2.5GB/day + Unlimited Calls + Prime Video 1 Year',
    },
  ];

  const filteredPlans = plans.filter((p) => (planCategory === 'Popular' ? true : p.category === planCategory));

  const cashbackCalculated = isCouponApplied ? Math.min(Math.round(selectedPlanAmount * 0.05) + 5, 50) : 5;

  const handleRecharge = async () => {
    if (!mobileNumber || mobileNumber.length < 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }

    setIsProcessing(true);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1500));

    const result = await processRechargeOrBill({
      serviceType: 'mobile_recharge',
      title: `${operator} ${rechargeType} Recharge`,
      operator: `${operator} (${circle})`,
      customerNumber: mobileNumber,
      amount: selectedPlanAmount,
      cashbackEarned: cashbackCalculated,
      details: `${mobileNumber} - ${selectedPlanDetails}`,
      extraReceiptData: {
        circle,
        planDetails: selectedPlanDetails,
      },
    });

    setIsProcessing(false);

    if (result.success && result.txn) {
      setActiveUtilityServiceModal(null);
      setSelectedTransactionForReceipt(result.txn);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 sm:p-8 shadow-2xl dark:bg-slate-800 dark:border dark:border-slate-700">
        {/* Close Button */}
        <button
          onClick={() => setActiveUtilityServiceModal(null)}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25">
            <Smartphone className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              Mobile Recharge & Bill
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Instant prepaid & postpaid recharge with guaranteed cashback
            </p>
          </div>
        </div>

        {/* Recharge Type Toggle */}
        <div className="flex rounded-2xl bg-slate-100 p-1 mb-5 dark:bg-slate-700/50">
          {(['Prepaid', 'Postpaid'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setRechargeType(t)}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                rechargeType === t
                  ? 'bg-white text-indigo-600 shadow-sm dark:bg-slate-800 dark:text-indigo-400'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Mobile Number & Operator Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Mobile Number
            </label>
            <div className="relative">
              <input
                type="tel"
                maxLength={10}
                placeholder="Enter 10 digit number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
              <span className="absolute right-3 top-3 text-xs font-bold text-indigo-500">
                {mobileNumber.length}/10
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Operator
            </label>
            <select
              value={operator}
              onChange={(e) => setOperator(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-semibold text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            >
              {operators.map((op) => (
                <option key={op} value={op}>
                  {op}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-5">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Telecom Circle
          </label>
          <select
            value={circle}
            onChange={(e) => setCircle(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs font-semibold text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            {circles.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Plan Category Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 mb-3">
          {(['Popular', '5G', 'Hero', 'Data', 'Annual'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setPlanCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                planCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
              }`}
            >
              {cat === '5G' ? '⚡ True 5G' : cat}
            </button>
          ))}
        </div>

        {/* Plan Cards Grid */}
        <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1 mb-5">
          {filteredPlans.map((plan) => {
            const isSelected = selectedPlanAmount === plan.amount;
            return (
              <div
                key={plan.amount}
                onClick={() => {
                  setSelectedPlanAmount(plan.amount);
                  setSelectedPlanDetails(`${plan.data} + ${plan.calls} (${plan.validity})`);
                }}
                className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-50/70 shadow-sm dark:bg-indigo-950/40 dark:border-indigo-400'
                    : 'border-slate-100 bg-slate-50/60 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/60'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-base font-black text-slate-800 dark:text-slate-100">
                      ₹{plan.amount}
                    </span>
                    <span className="rounded-md bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300">
                      {plan.tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {plan.details}
                  </p>
                </div>

                <div className="text-right shrink-0 pl-3">
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-200">
                    {plan.validity}
                  </div>
                  <div className="text-[11px] font-semibold text-slate-400">{plan.data}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cashback Coupon Section */}
        <div className="rounded-2xl border border-dashed border-emerald-300 bg-emerald-50/60 p-3 mb-5 dark:border-emerald-700 dark:bg-emerald-950/30 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Tag className="h-4 w-4 text-emerald-600" />
            <div>
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                Code: {couponCode}
              </span>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                Get ₹{cashbackCalculated} cashback credited into Smart Points
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCouponApplied(!isCouponApplied)}
            className="text-xs font-bold text-emerald-700 hover:underline dark:text-emerald-300 cursor-pointer"
          >
            {isCouponApplied ? 'Applied ✓' : 'Apply'}
          </button>
        </div>

        {/* Payment Summary & Wallet Balance */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-4 mb-5 dark:border-slate-700">
          <div>
            <span className="text-xs text-slate-400">Paying from E-Wallet:</span>
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Available Balance: ₹{user.eWalletBalance.toFixed(2)}
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400">Total Recharge:</span>
            <div className="text-2xl font-black text-slate-800 dark:text-slate-100">
              ₹{selectedPlanAmount}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleRecharge}
          disabled={isProcessing}
          className="btn-3d flex w-full items-center justify-center space-x-2 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-3.5 text-sm font-bold text-white shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 disabled:opacity-50 cursor-pointer"
        >
          {isProcessing ? (
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Processing Recharge via Bharat BillPay...</span>
            </div>
          ) : (
            <>
              <ShieldCheck className="h-4 w-4" />
              <span>Confirm & Pay ₹{selectedPlanAmount}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
