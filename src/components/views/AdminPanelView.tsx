import React, { useState } from 'react';
import {
  ShieldAlert,
  Users,
  Wallet,
  Settings,
  CheckCircle2,
  XCircle,
  PlusCircle,
  MinusCircle,
  Activity,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminPanelView: React.FC = () => {
  const { user, teamMembers, processAddMoney, addToast } = useApp();
  const [targetUserId, setTargetUserId] = useState(user.inviteCode);
  const [amount, setAmount] = useState('500');
  const [actionType, setActionType] = useState<'credit' | 'debit'>('credit');
  const [walletTarget, setWalletTarget] = useState<'eWallet' | 'withdrawal' | 'repurchase' | 'smartPoints'>('eWallet');
  const [reason, setReason] = useState('Admin Manual Compensation / Promo');

  const handleAdjustWallet = (e: React.FormEvent) => {
    e.preventDefault();
    const val = Number(amount) || 0;
    if (val <= 0) return;

    if (actionType === 'credit') {
      processAddMoney(val, `Admin Credit (${reason})`);
    } else {
      addToast({
        type: 'warning',
        title: 'Wallet Adjusted',
        message: `Debited ₹${val} from ${targetUserId}`,
      });
    }

    setAmount('');
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 p-6 text-white shadow-xl border border-indigo-900/50">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="h-6 w-6 text-amber-400" />
            <h1 className="text-2xl font-black tracking-tight text-white">SPAY360 SuperAdmin Console</h1>
          </div>
          <p className="text-xs text-slate-300">
            Full platform administration, ledger adjustment, KYC approvals, and real-time network controls
          </p>
        </div>

        <span className="px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-black">
          ROOT PRIVILEGES ACTIVE
        </span>
      </div>

      {/* Admin Stat Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase">Total System Turnover</span>
          <div className="text-2xl font-black text-slate-800 dark:text-slate-100 mt-1">₹4,892,100</div>
          <span className="text-[10px] text-emerald-600 font-bold">+18.4% this month</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase">Registered MLM Users</span>
          <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">12,450</div>
          <span className="text-[10px] text-slate-400">9,820 Active packages</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase">Pending KYC Verifications</span>
          <div className="text-2xl font-black text-amber-500 mt-1">14 Docs</div>
          <span className="text-[10px] text-amber-600 font-bold">Auto-AI verification active</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase">BBPS Gateway Health</span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">99.98%</div>
          <span className="text-[10px] text-emerald-600 font-bold">All 8 API Nodes Online</span>
        </div>
      </div>

      {/* Manual Wallet Credit / Debit Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100 dark:bg-slate-800/90 dark:border-slate-700/80">
          <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center space-x-2">
            <Wallet className="h-5 w-5 text-indigo-600" />
            <span>Manual Wallet Balance Adjustment</span>
          </h2>

          <form onSubmit={handleAdjustWallet} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Target User ID</label>
                <input
                  type="text"
                  required
                  value={targetUserId}
                  onChange={(e) => setTargetUserId(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 font-mono font-bold focus:outline-none dark:border-slate-700 dark:bg-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Target Wallet</label>
                <select
                  value={walletTarget}
                  onChange={(e) => setWalletTarget(e.target.value as any)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 font-bold focus:outline-none dark:border-slate-700 dark:bg-slate-900"
                >
                  <option value="eWallet">E-Wallet</option>
                  <option value="withdrawal">Withdrawal Balance</option>
                  <option value="repurchase">Repurchase Balance</option>
                  <option value="smartPoints">Smart Points</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Action Type</label>
                <div className="flex rounded-xl bg-slate-100 p-1 dark:bg-slate-700">
                  <button
                    type="button"
                    onClick={() => setActionType('credit')}
                    className={`flex-1 py-1.5 font-bold rounded-lg ${
                      actionType === 'credit' ? 'bg-emerald-600 text-white' : 'text-slate-600'
                    }`}
                  >
                    Credit (+)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActionType('debit')}
                    className={`flex-1 py-1.5 font-bold rounded-lg ${
                      actionType === 'debit' ? 'bg-rose-600 text-white' : 'text-slate-600'
                    }`}
                  >
                    Debit (-)
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Amount (₹)</label>
                <input
                  type="number"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 500"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 font-bold focus:outline-none dark:border-slate-700 dark:bg-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Reason / Note</label>
              <input
                type="text"
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 focus:outline-none dark:border-slate-700 dark:bg-slate-900"
              />
            </div>

            <button
              type="submit"
              className="btn-3d w-full rounded-2xl bg-indigo-600 py-3 text-xs font-bold text-white shadow-md hover:bg-indigo-700 cursor-pointer"
            >
              Execute Ledger Transaction
            </button>
          </form>
        </div>

        {/* System Activity & Gateway Logs */}
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100 dark:bg-slate-800/90 dark:border-slate-700/80 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-3 flex items-center space-x-2">
              <Activity className="h-5 w-5 text-emerald-500" />
              <span>Real-Time System Audit Trail</span>
            </h2>

            <div className="space-y-3 font-mono text-[11px]">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/60">
                <span className="text-emerald-600 font-bold">[2026-08-26 10:45:12]</span> BBPS Mobile Recharge #TXN-90218 completed (Operator: Airtel Circle: MH)
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/60">
                <span className="text-indigo-600 font-bold">[2026-08-26 09:30:04]</span> Electricity Settlement #TXN-80194 dispatched to MSEDCL billing gateway
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/60">
                <span className="text-amber-600 font-bold">[2026-08-26 08:15:22]</span> MLM Level Income auto-calculated and credited for 6 downline tiers
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/60">
                <span className="text-emerald-600 font-bold">[2026-08-26 07:01:00]</span> Daily Royalty Turnover Distribution pool executed: ₹12,400 distributed
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs">
            <span className="text-slate-400">Database Cluster: Cloud Spanner</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">Sync: 100% In-Memory</span>
          </div>
        </div>
      </div>
    </div>
  );
};
