import React, { useState } from 'react';
import {
  Gift,
  Check,
  Zap,
  ShieldCheck,
  Crown,
  Sparkles,
  TrendingUp,
  Award,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Package } from '../../types';

export const PackagesView: React.FC = () => {
  const { user, packages, processPackageUpgrade } = useApp();
  const [selectedPkg, setSelectedPkg] = useState<Package | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpgrade = async (pkg: Package) => {
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 1200));
    await processPackageUpgrade(pkg);
    setIsProcessing(false);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-6 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Gift className="h-6 w-6 text-indigo-200" />
            <h1 className="text-2xl font-black tracking-tight text-white">Membership Packages</h1>
          </div>
          <p className="text-xs text-indigo-100/80">
            Activate or upgrade your account to unlock higher level commission depths, daily ROI, and royalty perks
          </p>
        </div>

        <div className="rounded-2xl bg-white/20 backdrop-blur-md px-4 py-2 border border-white/20">
          <span className="text-[10px] text-indigo-200 uppercase font-semibold">Current Active Plan</span>
          <div className="text-base font-black text-amber-300">
            ₹{user.activePackagePrice} ({user.rank} Member)
          </div>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {packages.map((pkg) => {
          const isCurrent = user.activePackagePrice === pkg.price;
          const isHigher = pkg.price > user.activePackagePrice;

          return (
            <div
              key={pkg.id}
              className={`rounded-3xl bg-white p-6 shadow-sm border transition-all flex flex-col justify-between dark:bg-slate-800/90 relative ${
                pkg.popular
                  ? 'border-indigo-500 ring-2 ring-indigo-500/20 shadow-xl dark:border-indigo-400'
                  : 'border-slate-100 dark:border-slate-700/80 hover:shadow-lg'
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-white shadow-md">
                  Most Popular
                </span>
              )}

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {pkg.name}
                  </span>
                  <Crown className="h-5 w-5 text-amber-400" />
                </div>

                <div className="flex items-baseline space-x-1 mb-4">
                  <span className="text-3xl font-black text-slate-900 dark:text-white">
                    ₹{pkg.price}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">/ One-time</span>
                </div>

                <div className="rounded-2xl bg-indigo-50/70 p-3 mb-4 dark:bg-indigo-950/40 text-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-700 dark:text-slate-200">
                    <span>Direct Referral Payout:</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">
                      ₹{pkg.directIncome}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-700 dark:text-slate-200">
                    <span>Level Income Depth:</span>
                    <span className="font-bold">{pkg.levelIncomeDepth} Levels</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-700 dark:text-slate-200">
                    <span>Daily Cashback ROI:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      ₹{pkg.dailyCashback}/day
                    </span>
                  </div>
                </div>

                {/* Features list */}
                <div className="space-y-2 mb-6">
                  {pkg.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs text-slate-600 dark:text-slate-300">
                      <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleUpgrade(pkg)}
                disabled={isCurrent || isProcessing}
                className={`btn-3d flex w-full items-center justify-center space-x-2 rounded-2xl py-3 text-xs font-bold transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-slate-100 text-slate-400 dark:bg-slate-700 dark:text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40'
                }`}
              >
                {isCurrent ? (
                  <span>Active Plan ✓</span>
                ) : (
                  <>
                    <Zap className="h-4 w-4" />
                    <span>{isHigher ? 'Upgrade Now' : 'Activate Package'}</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
