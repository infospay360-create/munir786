import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { TopHeader } from './components/common/TopHeader';
import { Sidebar } from './components/common/Sidebar';
import { WelcomeBanner } from './components/dashboard/WelcomeBanner';
import { AccountStatistics } from './components/dashboard/AccountStatistics';
import { QuickActions } from './components/dashboard/QuickActions';
import { UtilityServices } from './components/dashboard/UtilityServices';
import { EarningsChart } from './components/dashboard/EarningsChart';
import { PromoCard } from './components/dashboard/PromoCard';
import { RecentTransactionsTable } from './components/dashboard/RecentTransactionsTable';

// Modals
import { MobileRechargeModal } from './components/services/MobileRechargeModal';
import { UtilityBillModal } from './components/services/UtilityBillModal';
import { AddMoneyModal } from './components/wallet/AddMoneyModal';
import { WithdrawModal } from './components/wallet/WithdrawModal';
import { TransferModal } from './components/wallet/TransferModal';
import { ReceiptModal } from './components/common/ReceiptModal';
import { ShareModal } from './components/common/ShareModal';
import { SearchModal } from './components/common/SearchModal';
import { NotificationModal } from './components/common/NotificationModal';
import { AuthModal } from './components/auth/AuthModal';

// Views
import { PassbookView } from './components/views/PassbookView';
import { TeamView } from './components/views/TeamView';
import { RepurchaseMallView } from './components/views/RepurchaseMallView';
import { PackagesView } from './components/views/PackagesView';
import { SupportTicketView } from './components/views/SupportTicketView';
import { ReportsView } from './components/views/ReportsView';
import { SettingsView } from './components/views/SettingsView';
import { AdminPanelView } from './components/views/AdminPanelView';
import { FranchisePortalView } from './components/franchise/FranchisePortalView';

import {
  LayoutDashboard,
  Smartphone,
  WalletCards,
  Users,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Info,
  X,
} from 'lucide-react';

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start space-x-3 rounded-2xl p-4 shadow-2xl backdrop-blur-md border animate-fade-in ${
            toast.type === 'success'
              ? 'bg-emerald-950/90 text-emerald-100 border-emerald-500/50'
              : toast.type === 'error'
              ? 'bg-rose-950/90 text-rose-100 border-rose-500/50'
              : toast.type === 'warning'
              ? 'bg-amber-950/90 text-amber-100 border-amber-500/50'
              : 'bg-indigo-950/90 text-indigo-100 border-indigo-500/50'
          }`}
        >
          <div className="mt-0.5 shrink-0">
            {toast.type === 'success' && <CheckCircle2 className="h-5 w-5 text-emerald-400" />}
            {toast.type === 'error' && <AlertCircle className="h-5 w-5 text-rose-400" />}
            {toast.type === 'warning' && <AlertCircle className="h-5 w-5 text-amber-400" />}
            {toast.type === 'info' && <Info className="h-5 w-5 text-indigo-400" />}
          </div>

          <div className="flex-1 space-y-0.5">
            <h4 className="text-xs font-bold">{toast.title}</h4>
            <p className="text-[11px] opacity-90">{toast.message}</p>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="p-1 text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};

const DashboardContent: React.FC = () => {
  const { activeTab, setActiveTab, isAuthenticated, isAuthModalOpen, setIsAuthModalOpen } = useApp();

  // Render view based on active tab
  const renderMainTabContent = () => {
    switch (activeTab) {
      case 'passbook':
      case 'fund_history':
        return <PassbookView />;
      case 'my_team':
        return <TeamView />;
      case 'repurchase_mall':
        return <RepurchaseMallView />;
      case 'franchise_portal':
        return <FranchisePortalView />;
      case 'packages':
        return <PackagesView />;
      case 'support_ticket':
        return <SupportTicketView />;
      case 'reports':
      case 'earnings_analytics':
      case 'level_income':
        return <ReportsView />;
      case 'settings':
        return <SettingsView />;
      case 'admin_panel':
        return <AdminPanelView />;
      case 'dashboard':
      default:
        return (
          <div className="space-y-6">
            {/* Top Welcome Banner */}
            <WelcomeBanner />

            {/* Account Statistics 13 Cards */}
            <AccountStatistics />

            {/* Quick Actions & Utility Services */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <QuickActions />
              <UtilityServices />
            </div>

            {/* Earnings Chart & Promo Banner */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EarningsChart />
              <PromoCard />
            </div>

            {/* Recent Transactions Table */}
            <RecentTransactionsTable />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Header */}
      <TopHeader />

      {/* Main Layout Container */}
      <div className="flex-1 flex w-full max-w-[1600px] mx-auto overflow-hidden">
        {/* Left Sidebar (Desktop/Tablet) */}
        <Sidebar />

        {/* Dynamic Main View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl pb-24 md:pb-8">
          {renderMainTabContent()}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 dark:bg-slate-900/95 dark:border-slate-800 px-3 py-2 flex items-center justify-around">
        {[
          { id: 'dashboard', label: 'Home', icon: <LayoutDashboard className="h-5 w-5" /> },
          { id: 'recharge', label: 'Recharge', icon: <Smartphone className="h-5 w-5" /> },
          { id: 'add_money', label: 'Add Money', icon: <WalletCards className="h-5 w-5" /> },
          { id: 'my_team', label: 'Team', icon: <Users className="h-5 w-5" /> },
          { id: 'passbook', label: 'Passbook', icon: <BookOpen className="h-5 w-5" /> },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as any)}
            className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === item.id
                ? 'text-indigo-600 dark:text-indigo-400 font-bold scale-105'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            {item.icon}
            <span className="text-[10px] mt-0.5">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Global Interactive Modals */}
      <MobileRechargeModal />
      <UtilityBillModal />
      <AddMoneyModal />
      <WithdrawModal />
      <TransferModal />
      <ReceiptModal />
      <ShareModal />
      <SearchModal />
      <NotificationModal />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      {/* Global Toasts */}
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <DashboardContent />
    </AppProvider>
  );
}

export default App;
