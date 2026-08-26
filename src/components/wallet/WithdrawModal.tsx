import React, { useState } from 'react';
import {
  X,
  ArrowDownCircle,
  Building,
  ShieldAlert,
  ShieldCheck,
  CreditCard,
  Info,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WithdrawModal: React.FC = () => {
  const { user, activeTab, setActiveTab, bankAccounts, processWithdrawal, addToast } = useApp();

  const isOpen = activeTab === 'withdraw_fund';
  const [amount, setAmount] = useState('500');
  const [selectedBankId, setSelectedBankId] = useState(bankAccounts[0]?.id || 'BANK-1');
  const [pin, setPin] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const numAmount = Number(amount) || 0;
  const tdsFee = Number((numAmount * 0.05).toFixed(2)); // 5% TDS / admin fee
  const netAmount = Math.max(0, numAmount - tdsFee);

  const handleWithdraw = async () => {
    if (numAmount < 100) {
      addToast({
        type: 'error',
        title: 'Minimum Limit',
        message: 'Minimum withdrawal amount is ₹100',
      });
      return;
    }

    if (numAmount > user.withdrawalBalance) {
      addToast({
        type: 'error',
        title: 'Insufficient Balance',
        message: `Available Withdrawal Balance is ₹${user.withdrawalBalance.toFixed(2)}`,
      });
      return;
    }

    if (pin.length < 4) {
      addToast({
        type: 'error',
        title: 'Security PIN Required',
        message: 'Please enter your 4-digit transaction security PIN (e.g. 1234)',
      });
      return;
    }

    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 1400));

    const success = await processWithdrawal(numAmount, selectedBankId);
    setIsProcessing(false);

    if (success) {
      setActiveTab('dashboard');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 sm:p-8 shadow-2xl dark:bg-slate-800 dark:border dark:border-slate-700">
        <button
          onClick={() => setActiveTab('dashboard')}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25">
            <ArrowDownCircle className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              Withdraw Funds to Bank
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Instant 24x7 IMPS bank settlement with automated TDS compliance
            </p>
          </div>
        </div>

        {/* Available Balance Box */}
        <div className="rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 p-4 mb-5 dark:from-indigo-950/40 dark:to-purple-950/40 border border-indigo-100 dark:border-indigo-800/40 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-indigo-900/70 dark:text-indigo-300">
              Available Withdrawal Balance
            </span>
            <p className="text-2xl font-black text-indigo-950 dark:text-white">
              ₹{user.withdrawalBalance.toLocaleString('en-IN', { minimumFractionDigits: 3 })}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setAmount(Math.floor(user.withdrawalBalance).toString())}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-md hover:bg-indigo-700 cursor-pointer"
          >
            Withdraw All
          </button>
        </div>

        {/* Amount Input */}
        <div className="space-y-3 mb-5">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            Withdrawal Amount (₹) - Min ₹100
          </label>
          <div className="relative">
            <span className="absolute left-4 top-3 text-lg font-black text-slate-400">₹</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 500"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 pl-9 pr-4 py-3 text-lg font-black text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>
        </div>

        {/* Destination Bank Selection */}
        <div className="mb-5 space-y-2">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            Select Destination Bank Account
          </label>
          <div className="space-y-2">
            {bankAccounts.map((b) => (
              <div
                key={b.id}
                onClick={() => setSelectedBankId(b.id)}
                className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  selectedBankId === b.id
                    ? 'border-indigo-500 bg-indigo-50/70 shadow-sm dark:bg-indigo-950/40 dark:border-indigo-400'
                    : 'border-slate-100 bg-slate-50/60 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                    <Building className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                      {b.bankName}
                    </span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      A/C: {b.accountNumber} • IFSC: {b.ifsc}
                    </p>
                  </div>
                </div>
                {b.isPrimary && (
                  <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    Primary
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Breakdown Calculation Box */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5 mb-5 dark:border-slate-700 dark:bg-slate-900/60 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400">Requested Amount:</span>
            <span className="font-bold text-slate-800 dark:text-slate-100">₹{numAmount.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400">TDS & Admin Handling (5%):</span>
            <span className="font-bold text-rose-600 dark:text-rose-400">-₹{tdsFee.toFixed(2)}</span>
          </div>
          <div className="border-t border-slate-200 pt-2 flex items-center justify-between font-bold dark:border-slate-700">
            <span className="text-slate-800 dark:text-slate-200">Net Direct Bank Payout:</span>
            <span className="text-base text-emerald-600 dark:text-emerald-400">₹{netAmount.toFixed(2)}</span>
          </div>
        </div>

        {/* Security Transaction PIN */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Enter 4-Digit Security Transaction PIN
          </label>
          <input
            type="password"
            maxLength={6}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="•••• (e.g. 1234)"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-center tracking-widest text-lg font-black text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </div>

        {/* Action Button */}
        <button
          onClick={handleWithdraw}
          disabled={isProcessing}
          className="btn-3d flex w-full items-center justify-center space-x-2 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 py-3.5 text-sm font-bold text-white shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 disabled:opacity-50 cursor-pointer"
        >
          {isProcessing ? (
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Initiating Bank Payout via IMPS...</span>
            </div>
          ) : (
            <>
              <ShieldCheck className="h-4 w-4" />
              <span>Submit Withdrawal Request</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
