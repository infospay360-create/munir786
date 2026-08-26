import React from 'react';
import {
  FileBarChart,
  TrendingUp,
  Award,
  Crown,
  Download,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ReportsView: React.FC = () => {
  const { user, addToast } = useApp();

  const handleDownloadTds = () => {
    addToast({
      type: 'success',
      title: 'TDS Certificate Generated',
      message: 'Form 16A downloaded to your device',
    });
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-6 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <FileBarChart className="h-6 w-6 text-indigo-200" />
            <h1 className="text-2xl font-black tracking-tight text-white">Financial & MLM Reports</h1>
          </div>
          <p className="text-xs text-indigo-100/80">
            In-depth analytics, downline performance metrics, level income reports, and tax compliance certificates
          </p>
        </div>

        <button
          onClick={handleDownloadTds}
          className="flex items-center space-x-2 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2.5 text-xs font-bold text-white transition-all border border-white/20 cursor-pointer shadow-sm"
        >
          <Download className="h-4 w-4" />
          <span>Download TDS Report (Form 16A)</span>
        </button>
      </div>

      {/* Income Summary Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase">Direct Referral Income</span>
          <div className="text-2xl font-black text-slate-800 dark:text-slate-100">₹250.00</div>
          <span className="text-[10px] text-emerald-600 font-bold">5 Direct Registrations</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase">Level Generation Income</span>
          <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">₹1,438.50</div>
          <span className="text-[10px] text-indigo-600 font-bold">Levels 1 through 5 Active</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase">Self Utility Cashback</span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">₹64.20</div>
          <span className="text-[10px] text-emerald-600 font-bold">100% Guaranteed BBPS Rebates</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase">Repurchase Team Royalty</span>
          <div className="text-2xl font-black text-amber-500">₹1.067</div>
          <span className="text-[10px] text-amber-600 font-bold">Pool Share: Silver Rank</span>
        </div>
      </div>

      {/* Rank & Royalty Progress Bar */}
      <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100 dark:bg-slate-800/90 dark:border-slate-700/80 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Crown className="h-5 w-5 text-amber-400" />
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
              Rank & Royalty Progression: {user.rank} Rank
            </h3>
          </div>
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
            Next: Gold Leader
          </span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
            <span>Direct Team Requirement (6/10 Active)</span>
            <span>60%</span>
          </div>
          <div className="h-3 w-full rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 w-3/5" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50">
            <span className="text-slate-400 block text-[10px]">CURRENT RANK</span>
            <span className="font-bold text-slate-800 dark:text-slate-100">{user.rank}</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50">
            <span className="text-slate-400 block text-[10px]">ROYALTY POOL SHARE</span>
            <span className="font-bold text-indigo-600 dark:text-indigo-400">2% of Company Turnover</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50">
            <span className="text-slate-400 block text-[10px]">NEXT REWARD AT GOLD</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">₹10,000 Cash Bonus</span>
          </div>
        </div>
      </div>
    </div>
  );
};
