import React, { useState } from 'react';
import {
  X,
  PlusCircle,
  QrCode,
  Building,
  CreditCard,
  CheckCircle2,
  Copy,
  Check,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AddMoneyModal: React.FC = () => {
  const { user, activeTab, setActiveTab, processAddMoney, addToast } = useApp();

  const isOpen = activeTab === 'add_money';
  const [method, setMethod] = useState<'upi' | 'bank' | 'card'>('upi');
  const [amount, setAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState('1000');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedAcc, setCopiedAcc] = useState(false);

  if (!isOpen) return null;

  const quickAmounts = [500, 1000, 2000, 5000, 10000];

  const handleCopyUpi = () => {
    navigator.clipboard.writeText('spay360.topup@icici');
    setCopiedUpi(true);
    addToast({ type: 'info', title: 'UPI ID Copied', message: 'spay360.topup@icici copied to clipboard' });
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleCopyAcc = () => {
    navigator.clipboard.writeText('SPAY3609876543210');
    setCopiedAcc(true);
    addToast({ type: 'info', title: 'Account Number Copied', message: 'Virtual A/C copied' });
    setTimeout(() => setCopiedAcc(false), 2000);
  };

  const handleAddFunds = async () => {
    const val = Number(customAmount);
    if (!val || val <= 0) {
      addToast({ type: 'error', title: 'Invalid Amount', message: 'Please enter amount greater than 0' });
      return;
    }

    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 1200));

    const methodLabel =
      method === 'upi'
        ? 'Google Pay (UPI)'
        : method === 'bank'
        ? 'NEFT/IMPS Virtual Account'
        : 'Visa/Mastercard Gateway';

    const success = await processAddMoney(val, methodLabel);
    setIsProcessing(false);

    if (success) {
      setActiveTab('dashboard');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 sm:p-8 shadow-2xl dark:bg-slate-800 dark:border dark:border-slate-700">
        {/* Close Button */}
        <button
          onClick={() => setActiveTab('dashboard')}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/25">
            <PlusCircle className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              Add Money to E-Wallet
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Instant credit via UPI, Bank Transfer (IMPS/NEFT) or Card
            </p>
          </div>
        </div>

        {/* Payment Method Selector */}
        <div className="flex rounded-2xl bg-slate-100 p-1 mb-5 dark:bg-slate-700/50">
          <button
            onClick={() => setMethod('upi')}
            className={`flex-1 py-2.5 flex items-center justify-center space-x-1.5 text-xs font-bold rounded-xl transition-all ${
              method === 'upi'
                ? 'bg-white text-indigo-600 shadow-sm dark:bg-slate-800 dark:text-indigo-400'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
          >
            <QrCode className="h-4 w-4" />
            <span>Instant UPI / QR</span>
          </button>

          <button
            onClick={() => setMethod('bank')}
            className={`flex-1 py-2.5 flex items-center justify-center space-x-1.5 text-xs font-bold rounded-xl transition-all ${
              method === 'bank'
                ? 'bg-white text-indigo-600 shadow-sm dark:bg-slate-800 dark:text-indigo-400'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
          >
            <Building className="h-4 w-4" />
            <span>Virtual Bank (NEFT)</span>
          </button>

          <button
            onClick={() => setMethod('card')}
            className={`flex-1 py-2.5 flex items-center justify-center space-x-1.5 text-xs font-bold rounded-xl transition-all ${
              method === 'card'
                ? 'bg-white text-indigo-600 shadow-sm dark:bg-slate-800 dark:text-indigo-400'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
          >
            <CreditCard className="h-4 w-4" />
            <span>Debit / Credit Card</span>
          </button>
        </div>

        {/* Amount Section */}
        <div className="space-y-3 mb-5">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            Enter Deposit Amount (₹)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-3 text-lg font-black text-slate-400">₹</span>
            <input
              type="number"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder="e.g. 1000"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 pl-9 pr-4 py-3 text-lg font-black text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>

          {/* Quick Amounts */}
          <div className="flex flex-wrap gap-2">
            {quickAmounts.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => setCustomAmount(q.toString())}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-300 text-xs font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 cursor-pointer transition-all"
              >
                +₹{q}
              </button>
            ))}
          </div>
        </div>

        {/* Method Specific Display */}
        {method === 'upi' && (
          <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4 mb-5 dark:border-indigo-900/50 dark:bg-indigo-950/30 flex flex-col sm:flex-row items-center gap-4">
            {/* Realistic QR code canvas representation */}
            <div className="flex flex-col items-center p-3 bg-white rounded-xl shadow-md shrink-0">
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                <rect width="100" height="100" fill="white" />
                <rect x="10" y="10" width="25" height="25" rx="3" fill="#1E1B4B" />
                <rect x="15" y="15" width="15" height="15" fill="white" />
                <rect x="18" y="18" width="9" height="9" fill="#1E1B4B" />

                <rect x="65" y="10" width="25" height="25" rx="3" fill="#1E1B4B" />
                <rect x="70" y="15" width="15" height="15" fill="white" />
                <rect x="73" y="18" width="9" height="9" fill="#1E1B4B" />

                <rect x="10" y="65" width="25" height="25" rx="3" fill="#1E1B4B" />
                <rect x="15" y="70" width="15" height="15" fill="white" />
                <rect x="18" y="73" width="9" height="9" fill="#1E1B4B" />

                {/* Matrix dots */}
                <rect x="42" y="15" width="6" height="6" fill="#1E1B4B" />
                <rect x="52" y="25" width="6" height="6" fill="#1E1B4B" />
                <rect x="42" y="42" width="16" height="16" rx="2" fill="#4F46E5" />
                <rect x="65" y="48" width="8" height="8" fill="#1E1B4B" />
                <rect x="48" y="72" width="10" height="10" fill="#1E1B4B" />
                <rect x="70" y="70" width="15" height="15" fill="#1E1B4B" />
              </svg>
              <span className="text-[10px] font-bold text-slate-500 mt-1">Scan with any UPI App</span>
            </div>

            <div className="space-y-2 text-xs w-full">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Virtual VPA:</span>
                <button
                  type="button"
                  onClick={handleCopyUpi}
                  className="flex items-center space-x-1 font-mono font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  <span>spay360.topup@icici</span>
                  {copiedUpi ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Supported:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  GPay, PhonePe, Paytm, BHIM, CRED
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Fee:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  ₹0 (Zero Surcharge)
                </span>
              </div>
            </div>
          </div>
        )}

        {method === 'bank' && (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 mb-5 dark:border-slate-700 dark:bg-slate-900/60 space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">Bank Name:</span>
              <span className="font-bold text-slate-800 dark:text-slate-100">ICICI Bank Ltd</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">Account Name:</span>
              <span className="font-bold text-slate-800 dark:text-slate-100">SPAY360 Technologies Pvt Ltd</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">Virtual A/C No:</span>
              <button
                type="button"
                onClick={handleCopyAcc}
                className="flex items-center space-x-1 font-mono font-bold text-indigo-600 dark:text-indigo-400"
              >
                <span>SPAY360{user.mobile}</span>
                {copiedAcc ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">IFSC Code:</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-100">ICIC0000104</span>
            </div>
          </div>
        )}

        {method === 'card' && (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 mb-5 dark:border-slate-700 dark:bg-slate-900/60 space-y-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Card Number</label>
              <input
                type="text"
                placeholder="4532 •••• •••• 8912"
                defaultValue="4532 9012 8410 4912"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-mono text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  defaultValue="08/29"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-mono text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">CVV</label>
                <input
                  type="password"
                  placeholder="•••"
                  defaultValue="812"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-mono text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>
            </div>
          </div>
        )}

        {/* Current & Future Balance summary */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-4 mb-5 dark:border-slate-700">
          <div>
            <span className="text-xs text-slate-400">Current E-Wallet:</span>
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
              ₹{user.eWalletBalance.toFixed(2)}
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400">New Balance after Topup:</span>
            <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">
              ₹{(user.eWalletBalance + (Number(customAmount) || 0)).toFixed(2)}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleAddFunds}
          disabled={isProcessing}
          className="btn-3d flex w-full items-center justify-center space-x-2 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 py-3.5 text-sm font-bold text-white shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 disabled:opacity-50 cursor-pointer"
        >
          {isProcessing ? (
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Verifying & Crediting E-Wallet...</span>
            </div>
          ) : (
            <>
              <ShieldCheck className="h-4 w-4" />
              <span>Deposit ₹{customAmount || 0} Instantly</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
