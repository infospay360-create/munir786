import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Icon3D, Icon3DType } from '../icons/3d/Icon3D';

interface StatItem {
  id: string;
  label: string;
  value: string;
  iconType: Icon3DType;
  actionTab: any;
}

export const AccountStatistics: React.FC = () => {
  const { user, setActiveTab } = useApp();
  const [isExpanded, setIsExpanded] = useState(true);

  const stats: StatItem[] = [
    {
      id: 'smart_points',
      label: 'SMART POINTS',
      value: user.smartPoints.toLocaleString('en-IN', { minimumFractionDigits: 2 }),
      iconType: 'smart_points',
      actionTab: 'passbook',
    },
    {
      id: 'pv_wallet',
      label: 'P.V WALLET',
      value: `${user.pvWallet} P.V`,
      iconType: 'pv_wallet',
      actionTab: 'repurchase_mall',
    },
    {
      id: 'direct_referrals',
      label: 'DIRECT REFERRALS',
      value: `${user.directReferralsCount}`,
      iconType: 'direct_referrals',
      actionTab: 'my_team',
    },
    {
      id: 'total_team',
      label: 'TOTAL TEAM',
      value: `${user.totalTeamCount}`,
      iconType: 'total_team',
      actionTab: 'my_team',
    },
    {
      id: 'active_team',
      label: 'ACTIVE TEAM',
      value: `${user.activeTeamCount}`,
      iconType: 'active_team',
      actionTab: 'my_team',
    },
    {
      id: 'total_earnings',
      label: 'TOTAL EARNINGS',
      value: `₹${user.totalEarnings.toLocaleString('en-IN', { minimumFractionDigits: 3 })}`,
      iconType: 'total_earnings',
      actionTab: 'earnings_analytics',
    },
    {
      id: 'active_packages',
      label: 'ACTIVE PACKAGES',
      value: `₹${user.activePackagePrice}`,
      iconType: 'active_packages',
      actionTab: 'packages',
    },
    {
      id: 'total_withdrawn',
      label: 'TOTAL WITHDRAWN',
      value: `₹${user.totalWithdrawn}`,
      iconType: 'total_withdrawn',
      actionTab: 'fund_history',
    },
    {
      id: 'repurchase',
      label: 'REPURCHASE',
      value: `₹${user.repurchaseBalance.toLocaleString('en-IN', { minimumFractionDigits: 3 })}`,
      iconType: 'repurchase',
      actionTab: 'repurchase_mall',
    },
    {
      id: 'level_income',
      label: 'LEVEL INCOME',
      value: `₹${user.levelIncome.toLocaleString('en-IN', { minimumFractionDigits: 1 })}`,
      iconType: 'level_income',
      actionTab: 'level_income',
    },
    {
      id: 'self_cashback',
      label: 'SELF CASHBACK',
      value: `₹${user.selfCashback}`,
      iconType: 'self_cashback',
      actionTab: 'passbook',
    },
    {
      id: 'today_income',
      label: 'TODAY INCOME',
      value: `₹${user.todayIncome}`,
      iconType: 'today_income',
      actionTab: 'earnings_analytics',
    },
    {
      id: 'today_joining',
      label: 'TODAY JOINING',
      value: `${user.todayJoining}`,
      iconType: 'today_joining',
      actionTab: 'my_team',
    },
  ];

  const displayedStats = isExpanded ? stats : stats.slice(0, 8);

  return (
    <div className="space-y-4">
      {/* Header with Title & View All */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">
          Account Statistics
        </h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-all cursor-pointer"
        >
          <span>{isExpanded ? 'Collapse' : 'View All'}</span>
          {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </button>
      </div>

      {/* Grid of 3D Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayedStats.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveTab(item.actionTab)}
            className="group relative flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm border border-slate-100 hover:border-indigo-200 dark:bg-slate-800/90 dark:border-slate-700/80 dark:hover:border-indigo-500/50 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
          >
            <div className="flex items-center space-x-3.5">
              <div className="shrink-0 transition-transform duration-200 group-hover:scale-110">
                <Icon3D type={item.iconType} size={48} />
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-400 uppercase">
                  {item.label}
                </span>
                <p className="text-base font-extrabold text-slate-800 dark:text-slate-100">
                  {item.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
