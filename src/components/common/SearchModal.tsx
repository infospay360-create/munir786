import React, { useState } from 'react';
import {
  X,
  Search,
  Smartphone,
  Zap,
  WalletCards,
  ArrowLeftRight,
  ShoppingBag,
  Users,
  LifeBuoy,
  FileBarChart,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, setActiveTab, setActiveUtilityServiceModal } = useApp();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const searchableItems = [
    { label: 'Mobile Prepaid Recharge', category: 'Utility Services', action: () => { setIsSearchOpen(false); setActiveUtilityServiceModal('mobile'); } },
    { label: 'Electricity Bill Payment', category: 'Utility Services', action: () => { setIsSearchOpen(false); setActiveUtilityServiceModal('electricity'); } },
    { label: 'DTH TV Recharge', category: 'Utility Services', action: () => { setIsSearchOpen(false); setActiveUtilityServiceModal('dth'); } },
    { label: 'Gas Pipeline Bill', category: 'Utility Services', action: () => { setIsSearchOpen(false); setActiveUtilityServiceModal('gas'); } },
    { label: 'Water Tax / Bill', category: 'Utility Services', action: () => { setIsSearchOpen(false); setActiveUtilityServiceModal('water'); } },
    { label: 'Broadband Internet Bill', category: 'Utility Services', action: () => { setIsSearchOpen(false); setActiveUtilityServiceModal('broadband'); } },
    { label: 'FASTag Toll Recharge', category: 'Utility Services', action: () => { setIsSearchOpen(false); setActiveUtilityServiceModal('fastag'); } },
    { label: 'Add Money to E-Wallet', category: 'Wallet & Banking', action: () => { setIsSearchOpen(false); setActiveTab('add_money'); } },
    { label: 'Withdraw Funds to Bank', category: 'Wallet & Banking', action: () => { setIsSearchOpen(false); setActiveTab('withdraw_fund'); } },
    { label: 'P2P Money Transfer', category: 'Wallet & Banking', action: () => { setIsSearchOpen(false); setActiveTab('money_transfer'); } },
    { label: 'Passbook & Transaction History', category: 'Reports', action: () => { setIsSearchOpen(false); setActiveTab('passbook'); } },
    { label: 'My MLM Team & Genealogy Tree', category: 'Network', action: () => { setIsSearchOpen(false); setActiveTab('my_team'); } },
    { label: 'Repurchase Mall Products', category: 'Shopping', action: () => { setIsSearchOpen(false); setActiveTab('repurchase_mall'); } },
    { label: 'Activate / Upgrade Packages', category: 'Membership', action: () => { setIsSearchOpen(false); setActiveTab('packages'); } },
    { label: 'Support Ticket System', category: 'Helpdesk', action: () => { setIsSearchOpen(false); setActiveTab('support_ticket'); } },
  ];

  const filtered = searchableItems.filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-800 dark:border dark:border-slate-700">
        <button
          onClick={() => setIsSearchOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Search Input */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-indigo-500" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search any service, recharge, transfer, report..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 pl-12 pr-4 py-3 text-sm font-semibold text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </div>

        {/* Results List */}
        <div className="space-y-1 max-h-80 overflow-y-auto pr-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-sm text-slate-400">
              No matching service or report found for "{query}"
            </div>
          ) : (
            filtered.map((item, idx) => (
              <button
                key={idx}
                onClick={item.action}
                className="flex w-full items-center justify-between p-3 rounded-2xl hover:bg-indigo-50/60 dark:hover:bg-indigo-950/40 text-left transition-colors cursor-pointer group"
              >
                <div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                    {item.label}
                  </span>
                  <p className="text-[10px] text-slate-400">{item.category}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
