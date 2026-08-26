import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Filter,
  Download,
  Calendar,
  Smartphone,
  Zap,
  Tv,
  ArrowLeftRight,
  PlusCircle,
  ShoppingBag,
  Gift,
  FileText,
  CheckCircle2,
  Clock,
  XCircle,
  ArrowUpRight,
  ArrowDownLeft,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Transaction } from '../../types';

export const PassbookView: React.FC = () => {
  const { user, transactions, setSelectedTransactionForReceipt, addToast } = useApp();
  const [filterType, setFilterType] = useState<'All' | 'Debit' | 'Credit'>('All');
  const [walletFilter, setWalletFilter] = useState<'All' | 'E-Wallet' | 'Withdrawal' | 'Repurchase' | 'Smart Points'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = transactions.filter((txn) => {
    // Search match
    const matchSearch =
      txn.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase());

    // Type filter
    let matchType = true;
    if (filterType === 'Credit') {
      matchType = ['add_money', 'cashback', 'commission'].includes(txn.type);
    } else if (filterType === 'Debit') {
      matchType = !['add_money', 'cashback', 'commission'].includes(txn.type);
    }

    return matchSearch && matchType;
  });

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'ID,Date,Time,Title,Details,Amount,Status,RefNo\n' +
      filteredTransactions
        .map(
          (t) =>
            `"${t.id}","${t.date}","${t.time}","${t.title}","${t.details}",${t.amount},"${t.status}","${t.referenceNumber}"`
        )
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SPAY360_Passbook_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast({
      type: 'success',
      title: 'Passbook Exported',
      message: 'CSV statement downloaded successfully',
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-6 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-indigo-200" />
            <h1 className="text-2xl font-black tracking-tight text-white">Digital Passbook</h1>
          </div>
          <p className="text-xs text-indigo-100/80">
            Real-time ledger of all debits, credits, cashback, and MLM commissions
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center space-x-2 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2.5 text-xs font-bold text-white transition-all border border-white/20 cursor-pointer shadow-sm"
          >
            <Download className="h-4 w-4" />
            <span>Export Statement (CSV)</span>
          </button>
        </div>
      </div>

      {/* Wallet Balance Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase">E-Wallet Balance</span>
          <p className="text-xl font-black text-slate-800 dark:text-slate-100 mt-1">
            ₹{user.eWalletBalance.toFixed(2)}
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Withdrawal Bal</span>
          <p className="text-xl font-black text-indigo-600 dark:text-indigo-400 mt-1">
            ₹{user.withdrawalBalance.toFixed(3)}
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Repurchase Bal</span>
          <p className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            ₹{user.repurchaseBalance.toFixed(3)}
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Smart Points</span>
          <p className="text-xl font-black text-amber-500 mt-1">
            {user.smartPoints.toFixed(2)} PTS
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100 dark:bg-slate-800/90 dark:border-slate-700/80 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, number, ref ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>

          {/* Type filters */}
          <div className="flex rounded-2xl bg-slate-100 p-1 dark:bg-slate-700/50">
            {(['All', 'Credit', 'Debit'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  filterType === t
                    ? 'bg-white text-indigo-600 shadow-sm dark:bg-slate-800 dark:text-indigo-400'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 pl-2">TRANSACTION</th>
                <th className="pb-3">REFERENCE & DETAILS</th>
                <th className="pb-3 text-right">AMOUNT</th>
                <th className="pb-3 text-center">STATUS</th>
                <th className="pb-3 text-right">DATE & TIME</th>
                <th className="pb-3 pr-2 text-right">RECEIPT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-700/40 text-xs">
              {filteredTransactions.map((txn) => {
                const isCredit = ['add_money', 'cashback', 'commission'].includes(txn.type);
                return (
                  <tr
                    key={txn.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-700/30 transition-colors"
                  >
                    <td className="py-3.5 pl-2">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-xl ${
                            isCredit
                              ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
                              : 'bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400'
                          }`}
                        >
                          {isCredit ? (
                            <ArrowDownLeft className="h-4 w-4" />
                          ) : (
                            <ArrowUpRight className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <span className="font-bold text-slate-800 dark:text-slate-100 block">
                            {txn.title}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">{txn.id}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 text-slate-500 dark:text-slate-400">
                      <span className="font-medium text-slate-700 dark:text-slate-200 block">
                        {txn.details}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        Ref: {txn.referenceNumber}
                      </span>
                    </td>

                    <td className="py-3.5 text-right font-black">
                      <span
                        className={
                          isCredit
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-slate-800 dark:text-slate-100'
                        }
                      >
                        {isCredit ? '+' : '-'}₹{txn.amount.toLocaleString('en-IN')}
                      </span>
                      {txn.cashback && txn.cashback > 0 && (
                        <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                          +₹{txn.cashback} CB
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 text-center">
                      <span className="inline-flex items-center space-x-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>{txn.status}</span>
                      </span>
                    </td>

                    <td className="py-3.5 text-right text-slate-400 whitespace-nowrap">
                      {txn.date}
                      <br />
                      <span className="text-[10px]">{txn.time}</span>
                    </td>

                    <td className="py-3.5 pr-2 text-right">
                      <button
                        onClick={() => setSelectedTransactionForReceipt(txn)}
                        className="px-3 py-1 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 font-bold text-xs cursor-pointer"
                      >
                        Receipt
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
