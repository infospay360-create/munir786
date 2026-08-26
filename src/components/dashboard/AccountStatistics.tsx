import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Icon3D, Icon3DType } from '../icons/3d/Icon3D';

interface StatItem {
  id: string;
  label: string;
  value: string;
  iconType: Icon3DType;
  actionTab: any;
  highlight?: boolean;
}

export const AccountStatistics: React.FC = () => {
  const { user, setActiveTab } = useApp();
  const [isExpanded, setIsExpanded] = useState(true);

  const stats: StatItem[] = [
    {
      id: 'smart_points',
      label: 'Smart Points',
      value: user.smartPoints.toLocaleString('en-IN', { minimumFractionDigits: 2 }),
      iconType: 'smart_points',
      actionTab: 'passbook',
      highlight: true,
    },
    {
      id: 'pv_wallet',
      label: 'P.V Wallet',
      value: `${user.pvWallet} P.V`,
      iconType: 'pv_wallet',
      actionTab: 'repurchase_mall',
    },
    {
      id: 'direct_referrals',
      label: 'Direct Referrals',
      value: `${user.directReferralsCount}`,
      iconType: 'direct_referrals',
      actionTab: 'my_team',
    },
    {
      id: 'total_team',
      label: 'Total Team',
      value: `${user.totalTeamCount}`,
      iconType: 'total_team',
      actionTab: 'my_team',
    },
    {
      id: 'active_team',
      label: 'Active Team',
      value: `${user.activeTeamCount}`,
      iconType: 'active_team',
      actionTab: 'my_team',
    },
    {
      id: 'total_earnings',
      label: 'Total Earnings',
      value: `₹${user.totalEarnings.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
      iconType: 'total_earnings',
      actionTab: 'earnings_analytics',
      highlight: true,
    },
    {
      id: 'active_packages',
      label: 'Active Packages',
      value: `₹${user.activePackagePrice}`,
      iconType: 'active_packages',
      actionTab: 'packages',
    },
    {
      id: 'total_withdrawn',
      label: 'Total Withdrawn',
      value: `₹${user.totalWithdrawn}`,
      iconType: 'total_withdrawn',
      actionTab: 'fund_history',
    },
    {
      id: 'repurchase',
      label: 'Repurchase',
      value: `₹${user.repurchaseBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
      iconType: 'repurchase',
      actionTab: 'repurchase_mall',
    },
    {
      id: 'level_income',
      label: 'Level Income',
      value: `₹${user.levelIncome.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
      iconType: 'level_income',
      actionTab: 'level_income',
    },
    {
      id: 'self_cashback',
      label: 'Self Cashback',
      value: `₹${user.selfCashback}`,
      iconType: 'self_cashback',
      actionTab: 'passbook',
    },
    {
      id: 'today_income',
      label: 'Today Income',
      value: `₹${user.todayIncome}`,
      iconType: 'today_income',
      actionTab: 'earnings_analytics',
    },
    {
      id: 'today_joining',
      label: 'Today Joining',
      value: `${user.todayJoining}`,
      iconType: 'today_joining',
      actionTab: 'my_team',
    },
  ];

  const displayedStats = isExpanded ? stats : stats.slice(0, 8);

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100 dark:bg-slate-800/90 dark:border-slate-700/80">
      {/* Box Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-2">
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 tracking-tight">
            Account Statistics
          </h3>
          <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800/60">
            <Sparkles className="w-2.5 h-2.5 mr-1" />
            Live Ledger
          </span>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 cursor-pointer"
        >
          <span>{isExpanded ? 'Collapse' : 'View All (13)'}</span>
          {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </button>
      </div>

      {/* Grid of Box-Type Statistics (4 items per row matching Quick Actions) */}
      <div className="grid grid-cols-4 gap-y-4 gap-x-2 text-center">
        {displayedStats.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.actionTab)}
            className="group flex flex-col items-center justify-center p-2 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700/50 border border-transparent hover:border-slate-100 dark:hover:border-slate-700 transition-all duration-200 cursor-pointer"
          >
            {/* 3D Glossy Box Logo Badge */}
            <div className="mb-2 transition-transform duration-200 group-hover:scale-110">
              <Icon3D type={item.iconType} size={44} />
            </div>

            {/* Value Display */}
            <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight mb-0.5">
              {item.value}
            </span>

            {/* Label */}
            <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-tight">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
