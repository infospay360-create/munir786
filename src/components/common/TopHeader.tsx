import React, { useState } from 'react';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Globe,
  LogOut,
  Shield,
  CreditCard,
  UserCheck,
  Building,
  ChevronDown,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SpayLogo } from '../icons/3d/Icon3D';

export const TopHeader: React.FC = () => {
  const {
    user,
    theme,
    toggleTheme,
    language,
    setLanguage,
    unreadNotifsCount,
    setIsSearchOpen,
    setIsNotifOpen,
    setActiveTab,
    logout,
  } = useApp();

  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const languages = ['English', 'हिन्दी (Hindi)', 'मराठी (Marathi)', 'বাংলা (Bengali)', 'தமிழ் (Tamil)', 'తెలుగు (Telugu)'];

  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 sm:px-6 md:px-8 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90 transition-colors">
      {/* Left: Brand Identity */}
      <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
        <SpayLogo size={42} />
        <div>
          <div className="flex items-center space-x-1.5">
            <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
              SPAY360
            </span>
          </div>
          <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 tracking-wide">
            Smart Payments, Smarter You
          </p>
        </div>
      </div>

      {/* Center: Global Search Bar */}
      <div className="hidden lg:flex flex-1 max-w-md mx-8">
        <button
          type="button"
          onClick={() => setIsSearchOpen(true)}
          className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-2.5 text-sm text-slate-400 shadow-inner hover:border-indigo-300 hover:bg-white dark:border-slate-700 dark:bg-slate-800/80 dark:hover:border-indigo-500 transition-all cursor-pointer"
        >
          <div className="flex items-center space-x-2.5">
            <Search className="h-4 w-4 text-slate-400" />
            <span className="text-slate-500 dark:text-slate-400">Search services, transactions, members...</span>
          </div>
          <kbd className="rounded-lg border border-slate-200 bg-white px-2 py-0.5 text-xs font-semibold text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
            /
          </kbd>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Mobile Search Button */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex lg:hidden h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
          title="Search"
        >
          <Search className="h-4 w-4" />
        </button>

        {/* Notifications Icon with Badge */}
        <div className="relative">
          <button
            onClick={() => setIsNotifOpen(true)}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-all cursor-pointer"
            title="Notifications"
          >
            <Bell className="h-4 w-4" />
            {unreadNotifsCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-rose-600 px-1 text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-slate-900">
                {unreadNotifsCount}
              </span>
            )}
          </button>
        </div>

        {/* Dark/Light Mode Switch */}
        <button
          onClick={toggleTheme}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 hover:text-amber-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-amber-400 transition-all cursor-pointer"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        {/* Quick Franchise Portal Switcher */}
        <button
          onClick={() => setActiveTab('franchise_portal')}
          className="hidden md:flex h-10 items-center space-x-1.5 rounded-xl border border-amber-300/80 bg-amber-50/70 px-3 text-xs font-bold text-amber-800 hover:bg-amber-100 dark:border-amber-700/60 dark:bg-amber-950/40 dark:text-amber-300 dark:hover:bg-amber-900/50 shadow-xs transition cursor-pointer"
          title="Open Regional Franchise Portal"
        >
          <Building className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
          <span>Franchise Portal</span>
        </button>

        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
            className="hidden sm:flex h-10 items-center space-x-1.5 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 transition-all cursor-pointer"
          >
            <Globe className="h-3.5 w-3.5 text-indigo-500" />
            <span>{language.split(' ')[0]}</span>
            <ChevronDown className="h-3 w-3 opacity-60" />
          </button>

          {isLangDropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 rounded-2xl border border-slate-100 bg-white p-1.5 shadow-xl dark:border-slate-700 dark:bg-slate-800 z-50">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setLanguage(lang);
                    setIsLangDropdownOpen(false);
                  }}
                  className={`flex w-full items-center rounded-xl px-3 py-2 text-left text-xs font-medium transition-colors ${
                    language === lang
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Profile Pill & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            className="flex items-center space-x-2.5 rounded-2xl border border-slate-200 bg-white p-1.5 pr-3 shadow-sm hover:border-indigo-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-indigo-500 transition-all cursor-pointer"
          >
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-8 w-8 rounded-full object-cover ring-2 ring-indigo-500/30"
              />
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
            </div>
            <div className="text-left hidden sm:block">
              <div className="flex items-center space-x-1">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-100">{user.name}</span>
                <span className="text-xs">👋</span>
              </div>
              <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400">
                ID: {user.userId}
              </span>
            </div>
            <ChevronDown className="h-3 w-3 text-slate-400 hidden sm:block" />
          </button>

          {isProfileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl dark:border-slate-700 dark:bg-slate-800 z-50">
              <div className="border-b border-slate-100 px-3 py-2.5 dark:border-slate-700">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-100">{user.name}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{user.email}</p>
                <div className="mt-2 flex items-center justify-between text-[10px]">
                  <span className="rounded-md bg-purple-50 px-2 py-0.5 font-bold text-purple-600 dark:bg-purple-950/60 dark:text-purple-400">
                    {user.rank}
                  </span>
                  <span className="rounded-md bg-emerald-50 px-2 py-0.5 font-bold text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                    KYC: {user.kycStatus}
                  </span>
                </div>
              </div>

              <div className="py-1 space-y-0.5 text-xs font-medium">
                <button
                  onClick={() => {
                    setActiveTab('settings');
                    setIsProfileDropdownOpen(false);
                  }}
                  className="flex w-full items-center space-x-2.5 rounded-xl px-3 py-2 text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  <UserCheck className="h-4 w-4 text-indigo-500" />
                  <span>Profile & KYC</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('settings');
                    setIsProfileDropdownOpen(false);
                  }}
                  className="flex w-full items-center space-x-2.5 rounded-xl px-3 py-2 text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  <CreditCard className="h-4 w-4 text-blue-500" />
                  <span>Bank & UPI Settings</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('franchise_portal');
                    setIsProfileDropdownOpen(false);
                  }}
                  className="flex w-full items-center space-x-2.5 rounded-xl px-3 py-2 text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  <Building className="h-4 w-4 text-amber-500" />
                  <span>Franchise Portal</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('admin_panel');
                    setIsProfileDropdownOpen(false);
                  }}
                  className="flex w-full items-center space-x-2.5 rounded-xl px-3 py-2 text-purple-600 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-950/40"
                >
                  <Shield className="h-4 w-4 text-purple-600" />
                  <span>Super Admin Console</span>
                </button>
              </div>

              <div className="border-t border-slate-100 pt-1 dark:border-slate-700">
                <button
                  onClick={() => {
                    setIsProfileDropdownOpen(false);
                    logout();
                  }}
                  className="flex w-full items-center space-x-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
