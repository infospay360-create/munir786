import React, { useState } from 'react';
import { Copy, Check, Share2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Icon3D } from '../icons/3d/Icon3D';

export const WelcomeBanner: React.FC = () => {
  const { user, setIsShareOpen, setActiveTab, addToast } = useApp();
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(user.inviteCode);
    setCopied(true);
    addToast({
      type: 'success',
      title: 'Invite Code Copied!',
      message: `${user.inviteCode} copied to clipboard`,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const currentDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-6 sm:p-8 text-white shadow-2xl shadow-indigo-900/25">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 h-64 w-64 rounded-full bg-pink-500/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left: Greetings & Invite Code */}
        <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-200">
            {currentDate}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-2">
            Good Morning, {user.name} <span className="inline-block animate-bounce">👋</span>
          </h1>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {/* Invite Code Pill */}
            <button
              type="button"
              onClick={handleCopyCode}
              className="group flex items-center space-x-2.5 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-md px-4 py-2.5 text-xs sm:text-sm font-bold text-white transition-all border border-white/20 hover:border-white/40 shadow-inner cursor-pointer"
            >
              <span className="text-indigo-200 group-hover:text-white transition-colors">Invite Code:</span>
              <span className="font-mono text-amber-300 font-extrabold tracking-wider">{user.inviteCode}</span>
              {copied ? (
                <Check className="h-4 w-4 text-emerald-400" />
              ) : (
                <Copy className="h-4 w-4 text-indigo-200 group-hover:text-white transition-colors" />
              )}
            </button>

            {/* Share Button */}
            <button
              type="button"
              onClick={() => setIsShareOpen(true)}
              className="flex items-center space-x-2 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-md px-4 py-2.5 text-xs sm:text-sm font-bold text-white transition-all border border-white/20 hover:border-white/40 shadow-inner cursor-pointer"
            >
              <Share2 className="h-4 w-4 text-indigo-200" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Right: 3D Balance Cards */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          {/* Withdrawal Balance Card */}
          <div
            onClick={() => setActiveTab('withdraw_fund')}
            className="group relative flex flex-1 sm:w-60 items-center justify-between rounded-3xl bg-white/10 hover:bg-white/15 backdrop-blur-md p-4.5 border border-white/20 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
          >
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-indigo-200 uppercase tracking-wider">
                Withdrawal Balance
              </span>
              <div className="text-xl sm:text-2xl font-black text-white">
                ₹{user.withdrawalBalance.toLocaleString('en-IN', { minimumFractionDigits: 3 })}
              </div>
            </div>
            <div className="shrink-0 transition-transform duration-200 group-hover:scale-110">
              <Icon3D type="wallet_purple" size={48} />
            </div>
          </div>

          {/* E-Wallet Card */}
          <div
            onClick={() => setActiveTab('add_money')}
            className="group relative flex flex-1 sm:w-52 items-center justify-between rounded-3xl bg-white/10 hover:bg-white/15 backdrop-blur-md p-4.5 border border-white/20 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
          >
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-indigo-200 uppercase tracking-wider">
                E-Wallet
              </span>
              <div className="text-xl sm:text-2xl font-black text-white">
                ₹{user.eWalletBalance.toLocaleString('en-IN', { minimumFractionDigits: 0 })}
              </div>
            </div>
            <div className="shrink-0 transition-transform duration-200 group-hover:scale-110">
              <Icon3D type="wallet_blue" size={48} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
