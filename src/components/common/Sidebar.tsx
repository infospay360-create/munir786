import React from 'react';
import {
  LayoutDashboard,
  Smartphone,
  WalletCards,
  BookOpen,
  ArrowLeftRight,
  History,
  LifeBuoy,
  Users,
  FileBarChart,
  Settings,
  LogOut,
  ShoppingBag,
  ArrowUpRight,
  ShieldAlert,
} from 'lucide-react';
import { useApp, ActiveTab } from '../../context/AppContext';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, setIsShareOpen, logout } = useApp();

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { id: 'recharge', label: 'Recharge', icon: <Smartphone className="h-5 w-5" /> },
    { id: 'add_money', label: 'Add Money', icon: <WalletCards className="h-5 w-5" /> },
    { id: 'passbook', label: 'Passbook', icon: <BookOpen className="h-5 w-5" /> },
    { id: 'money_transfer', label: 'Money Transfer', icon: <ArrowLeftRight className="h-5 w-5" /> },
    { id: 'fund_history', label: 'Fund History', icon: <History className="h-5 w-5" /> },
    { id: 'support_ticket', label: 'Support Ticket', icon: <LifeBuoy className="h-5 w-5" /> },
    { id: 'my_team', label: 'My Team', icon: <Users className="h-5 w-5" /> },
    { id: 'repurchase_mall', label: 'Repurchase Mall', icon: <ShoppingBag className="h-5 w-5" /> },
    { id: 'reports', label: 'Reports', icon: <FileBarChart className="h-5 w-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
    { id: 'admin_panel', label: 'Admin Console', icon: <ShieldAlert className="h-5 w-5 text-purple-400" /> },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 shrink-0 border-r border-slate-200/80 bg-white/70 backdrop-blur-md p-4 dark:border-slate-800 dark:bg-slate-900/70 justify-between transition-colors">
      {/* Navigation List */}
      <div className="space-y-1.5 overflow-y-auto pr-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`group flex w-full items-center space-x-3.5 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 scale-[1.02]'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/80 dark:hover:text-slate-100'
              }`}
            >
              <div
                className={`transition-transform duration-200 group-hover:scale-110 ${
                  isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                }`}
              >
                {item.icon}
              </div>
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}

        {/* Logout button */}
        <button
          onClick={logout}
          className="flex w-full items-center space-x-3.5 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-red-50 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-950/40 dark:hover:text-red-400 transition-all cursor-pointer"
        >
          <LogOut className="h-5 w-5 text-slate-400" />
          <span>Logout</span>
        </button>
      </div>

      {/* Promo Card: "Grow Your Business" */}
      <div className="mt-4 relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-purple-700 to-blue-800 p-4 text-white shadow-xl shadow-indigo-900/20">
        <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-purple-400/20 blur-2xl pointer-events-none" />

        {/* 3D Visual graphics */}
        <div className="mb-2 flex items-center justify-center">
          <div className="relative h-16 w-20">
            <div className="absolute top-1 left-2 h-11 w-16 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 shadow-md transform -rotate-6" />
            <div className="absolute top-3 left-3 h-11 w-16 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg transform rotate-6 border border-white/30" />
            <div className="absolute top-2 left-4 h-8 w-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center font-bold text-xs">
              ₹
            </div>
          </div>
        </div>

        <h4 className="text-sm font-bold tracking-tight">Grow Your Business</h4>
        <p className="mt-1 text-[11px] text-indigo-100/80 leading-snug">
          Invite more people and earn big rewards with SPAY360.
        </p>

        <button
          onClick={() => setIsShareOpen(true)}
          className="mt-3 flex w-full items-center justify-center space-x-2 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md px-3 py-2 text-xs font-bold text-white transition-all hover:shadow-md cursor-pointer"
        >
          <span>Invite Now</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </aside>
  );
};
