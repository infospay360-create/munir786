import React, { useState } from 'react';
import {
  ChevronRight,
  MoreVertical,
  Smartphone,
  Zap,
  Tv,
  ArrowLeftRight,
  PlusCircle,
  ShoppingBag,
  Gift,
  FileText,
  Share2,
  AlertCircle,
  CheckCircle2,
  Clock,
  XCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Transaction } from '../../types';

export const RecentTransactionsTable: React.FC = () => {
  const { transactions, setActiveTab, setSelectedTransactionForReceipt } = useApp();
  const [activeMenuTxnId, setActiveMenuTxnId] = useState<string | null>(null);

  // Helper icon for transaction type
  const getTxnIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'mobile_recharge':
        return (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
            <Smartphone className="h-4 w-4" />
          </div>
        );
      case 'electricity_bill':
        return (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
            <Zap className="h-4 w-4" />
          </div>
        );
      case 'dth_recharge':
        return (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-100 text-pink-600 dark:bg-pink-950/60 dark:text-pink-400">
            <Tv className="h-4 w-4" />
          </div>
        );
      case 'money_transfer':
        return (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400">
            <ArrowLeftRight className="h-4 w-4" />
          </div>
        );
      case 'add_money':
        return (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
            <PlusCircle className="h-4 w-4" />
          </div>
        );
      case 'package_purchase':
        return (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
            <Gift className="h-4 w-4" />
          </div>
        );
      case 'repurchase_order':
        return (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-100 text-teal-600 dark:bg-teal-950/60 dark:text-teal-400">
            <ShoppingBag className="h-4 w-4" />
          </div>
        );
      default:
        return (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
            <FileText className="h-4 w-4" />
          </div>
        );
    }
  };

  const getStatusBadge = (status: Transaction['status']) => {
    switch (status) {
      case 'Success':
        return (
          <span className="inline-flex items-center space-x-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
            <CheckCircle2 className="h-3 w-3" />
            <span>Success</span>
          </span>
        );
      case 'Pending':
      case 'Processing':
        return (
          <span className="inline-flex items-center space-x-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
            <Clock className="h-3 w-3" />
            <span>{status}</span>
          </span>
        );
      case 'Failed':
      case 'Cancelled':
      case 'Refunded':
        return (
          <span className="inline-flex items-center space-x-1 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-600 dark:bg-rose-950/60 dark:text-rose-400">
            <XCircle className="h-3 w-3" />
            <span>{status}</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100 dark:bg-slate-800/90 dark:border-slate-700/80">
      {/* Table Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 tracking-tight">
            Recent Transactions
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-400">Your most recent transactions</p>
        </div>

        <button
          onClick={() => setActiveTab('passbook')}
          className="flex items-center space-x-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 cursor-pointer"
        >
          <span>View All</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-700/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="pb-3 pl-2">TYPE</th>
              <th className="pb-3">DETAILS</th>
              <th className="pb-3 text-right">AMOUNT</th>
              <th className="pb-3 text-center">STATUS</th>
              <th className="pb-3 text-right">TIME</th>
              <th className="pb-3 pr-2 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-700/40 text-sm">
            {transactions.slice(0, 6).map((txn) => (
              <tr
                key={txn.id}
                className="group hover:bg-slate-50/80 dark:hover:bg-slate-700/30 transition-colors"
              >
                {/* Type Icon & Name */}
                <td className="py-3.5 pl-2">
                  <div className="flex items-center space-x-3">
                    {getTxnIcon(txn.type)}
                    <span className="font-bold text-slate-800 dark:text-slate-100 whitespace-nowrap">
                      {txn.title}
                    </span>
                  </div>
                </td>

                {/* Details */}
                <td className="py-3.5 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-medium">{txn.details}</span>
                  {txn.cashback && txn.cashback > 0 && (
                    <span className="ml-2 inline-block text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                      +₹{txn.cashback} Cashback
                    </span>
                  )}
                </td>

                {/* Amount */}
                <td className="py-3.5 text-right font-extrabold text-slate-800 dark:text-slate-100">
                  ₹{txn.amount.toLocaleString('en-IN')}
                </td>

                {/* Status */}
                <td className="py-3.5 text-center">{getStatusBadge(txn.status)}</td>

                {/* Time */}
                <td className="py-3.5 text-right text-xs text-slate-400 whitespace-nowrap">
                  {txn.date}, {txn.time}
                </td>

                {/* Action 3-dots */}
                <td className="py-3.5 pr-2 text-right relative">
                  <button
                    onClick={() =>
                      setActiveMenuTxnId(activeMenuTxnId === txn.id ? null : txn.id)
                    }
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 dark:hover:text-slate-200 cursor-pointer"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>

                  {/* Dropdown Menu */}
                  {activeMenuTxnId === txn.id && (
                    <div className="absolute right-2 top-10 w-44 rounded-2xl border border-slate-100 bg-white p-1.5 shadow-2xl dark:border-slate-700 dark:bg-slate-800 z-30">
                      <button
                        onClick={() => {
                          setSelectedTransactionForReceipt(txn);
                          setActiveMenuTxnId(null);
                        }}
                        className="flex w-full items-center space-x-2 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-700"
                      >
                        <FileText className="h-3.5 w-3.5 text-indigo-500" />
                        <span>View Receipt</span>
                      </button>

                      <button
                        onClick={() => {
                          setSelectedTransactionForReceipt(txn);
                          setActiveMenuTxnId(null);
                        }}
                        className="flex w-full items-center space-x-2 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-700"
                      >
                        <Share2 className="h-3.5 w-3.5 text-blue-500" />
                        <span>Share Receipt</span>
                      </button>

                      <button
                        onClick={() => {
                          setActiveTab('support_ticket');
                          setActiveMenuTxnId(null);
                        }}
                        className="flex w-full items-center space-x-2 rounded-xl px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40"
                      >
                        <AlertCircle className="h-3.5 w-3.5" />
                        <span>Report Problem</span>
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
