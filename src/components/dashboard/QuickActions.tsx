import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Icon3D, Icon3DType } from '../icons/3d/Icon3D';

interface ActionItem {
  id: string;
  label: string;
  iconType: Icon3DType;
  action: () => void;
}

export const QuickActions: React.FC = () => {
  const { setActiveTab } = useApp();

  const actions: ActionItem[] = [
    {
      id: 'activate',
      label: 'Activate Account',
      iconType: 'action_activate',
      action: () => setActiveTab('packages'),
    },
    {
      id: 'add_money',
      label: 'Add Money',
      iconType: 'action_add_money',
      action: () => setActiveTab('add_money'),
    },
    {
      id: 'withdraw',
      label: 'Withdraw Fund',
      iconType: 'action_withdraw',
      action: () => setActiveTab('withdraw_fund'),
    },
    {
      id: 'team',
      label: 'My Team',
      iconType: 'action_team',
      action: () => setActiveTab('my_team'),
    },
    {
      id: 'passbook',
      label: 'Passbook',
      iconType: 'action_passbook',
      action: () => setActiveTab('passbook'),
    },
    {
      id: 'support',
      label: 'Support Ticket',
      iconType: 'action_support',
      action: () => setActiveTab('support_ticket'),
    },
    {
      id: 'history',
      label: 'Fund History',
      iconType: 'action_history',
      action: () => setActiveTab('fund_history'),
    },
    {
      id: 'profile',
      label: 'Profile Settings',
      iconType: 'action_settings',
      action: () => setActiveTab('settings'),
    },
  ];

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100 dark:bg-slate-800/90 dark:border-slate-700/80">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 tracking-tight">
          Quick Actions
        </h3>
        <button
          onClick={() => setActiveTab('packages')}
          className="flex items-center space-x-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 cursor-pointer"
        >
          <span>View All</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-4 gap-y-4 gap-x-2 text-center">
        {actions.map((item) => (
          <button
            key={item.id}
            onClick={item.action}
            className="group flex flex-col items-center justify-center p-2 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 cursor-pointer"
          >
            <div className="mb-2 transition-transform duration-200 group-hover:scale-110">
              <Icon3D type={item.iconType} size={44} />
            </div>
            <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-200 leading-tight">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
