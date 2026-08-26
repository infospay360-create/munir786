import React, { useState } from 'react';
import {
  X,
  ArrowLeftRight,
  UserCheck,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TransferModal: React.FC = () => {
  const { user, activeTab, setActiveTab, processP2PTransfer, addToast } = useApp();

  const isOpen = activeTab === 'money_transfer';
  const [recipient, setRecipient] = useState('');
  const [recipientName, setRecipientName] = useState<string | null>(null);
  const [amount, setAmount] = useState('500');
  const [pin, setPin] = useState('');
  const [remarks, setRemarks] = useState('P2P wallet balance transfer');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isOpen) return null;

  const handleVerifyRecipient = async () => {
    if (!recipient) {
      addToast({ type: 'error', title: 'User ID Required', message: 'Enter SPAY User ID or 10-digit Mobile' });
      return;
    }
    setIsVerifying(true);
    await new Promise((r) => setTimeout(r, 600));
    setIsVerifying(false);

    if (recipient.includes('591024') || recipient === '9833445566') {
      setRecipientName('Priya Sharma (SPAY591024)');
    } else if (recipient.includes('890124') || recipient === '9820112233') {
      setRecipientName('Rajesh Verma (SPAY890124)');
    } else {
      setRecipientName(`Verified Member (${recipient.toUpperCase()})`);
    }
  };

  const handleTransfer = async () => {
    const numAmount = Number(amount) || 0;
    if (numAmount <= 0) {
      addToast({ type: 'error', title: 'Invalid Amount', message: 'Please enter valid transfer amount' });
      return;
    }

    if (numAmount > user.eWalletBalance) {
      addToast({
        type: 'error',
        title: 'Insufficient Balance',
        message: `Your E-Wallet balance is ₹${user.eWalletBalance.toFixed(2)}`,
      });
      return;
    }

    if (pin.length < 4) {
      addToast({
        type: 'error',
        title: 'Security PIN Required',
        message: 'Please enter your 4-digit transaction PIN (e.g. 1234)',
      });
      return;
    }

    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 1200));

    const target = recipientName || recipient;
    const success = await processP2PTransfer(target, numAmount, pin, remarks);
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
            <ArrowLeftRight className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              P2P Money Transfer
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Transfer funds instantly to any SPAY360 member with zero fees
            </p>
          </div>
        </div>

        {/* Available Balance */}
        <div className="rounded-2xl bg-indigo-50/60 p-4 mb-5 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800/40 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Available E-Wallet Balance
            </span>
            <p className="text-2xl font-black text-indigo-950 dark:text-white">
              ₹{user.eWalletBalance.toFixed(2)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('add_money')}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-md hover:bg-indigo-700 cursor-pointer"
          >
            + Add Funds
          </button>
        </div>

        {/* Recipient User ID / Mobile */}
        <div className="space-y-3 mb-4">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            Recipient SPAY User ID or Mobile Number
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={recipient}
              onChange={(e) => {
                setRecipient(e.target.value);
                setRecipientName(null);
              }}
              placeholder="e.g. SPAY591024 or 9833445566"
              className="flex-1 rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-semibold text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
            <button
              type="button"
              onClick={handleVerifyRecipient}
              disabled={isVerifying}
              className="px-4 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-xs font-bold text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 cursor-pointer"
            >
              {isVerifying ? 'Checking...' : 'Verify'}
            </button>
          </div>

          {recipientName && (
            <div className="flex items-center space-x-2 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
              <span>Beneficiary: {recipientName}</span>
            </div>
          )}
        </div>

        {/* Amount Input */}
        <div className="space-y-3 mb-4">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            Transfer Amount (₹)
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

        {/* Remarks */}
        <div className="mb-4">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Remarks (Optional)
          </label>
          <input
            type="text"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="e.g. Split bill / Gift / Team fund"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs font-semibold text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </div>

        {/* Transaction PIN */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Enter 4-Digit Security PIN
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
          onClick={handleTransfer}
          disabled={isProcessing}
          className="btn-3d flex w-full items-center justify-center space-x-2 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 py-3.5 text-sm font-bold text-white shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 disabled:opacity-50 cursor-pointer"
        >
          {isProcessing ? (
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Authorizing & Transferring...</span>
            </div>
          ) : (
            <>
              <ShieldCheck className="h-4 w-4" />
              <span>Transfer ₹{amount || 0} Instantly</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
