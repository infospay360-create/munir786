import React, { useState } from 'react';
import {
  X,
  Share2,
  Copy,
  Check,
  MessageSquare,
  Send,
  Mail,
  QrCode,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ShareModal: React.FC = () => {
  const { user, isShareOpen, setIsShareOpen, addToast } = useApp();
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isShareOpen) return null;

  const referralUrl = `https://spay360.com/join?ref=${user.inviteCode}`;
  const shareText = `Hey! Join SPAY360 with my referral code ${user.inviteCode} to get 100% utility cashback, lifetime level income, and smart financial tools! ${referralUrl}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopiedLink(true);
    addToast({
      type: 'success',
      title: 'Link Copied',
      message: 'Referral link copied to clipboard',
    });
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(user.inviteCode);
    setCopiedCode(true);
    addToast({
      type: 'success',
      title: 'Invite Code Copied',
      message: `${user.inviteCode} copied to clipboard`,
    });
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const handleTelegram = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(referralUrl)}&text=${encodeURIComponent('Join SPAY360 with code: ' + user.inviteCode)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 sm:p-8 shadow-2xl dark:bg-slate-800 dark:border dark:border-slate-700">
        <button
          onClick={() => setIsShareOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25">
            <Share2 className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              Invite & Earn Big Rewards
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Share your invite link to build your multi-tier MLM network
            </p>
          </div>
        </div>

        {/* Invite Code Highlight Box */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-5 text-white shadow-xl mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-purple-400/20 blur-2xl pointer-events-none" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold text-indigo-200 uppercase tracking-wider">
                Your Exclusive Referral Code
              </span>
              <div className="text-2xl sm:text-3xl font-mono font-black text-amber-300 tracking-wider">
                {user.inviteCode}
              </div>
            </div>

            <button
              onClick={handleCopyCode}
              className="flex items-center space-x-1.5 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2.5 text-xs font-bold text-white transition-all border border-white/20 cursor-pointer"
            >
              {copiedCode ? <Check className="h-4 w-4 text-emerald-300" /> : <Copy className="h-4 w-4" />}
              <span>{copiedCode ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Copy Referral Link */}
        <div className="space-y-2 mb-6">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            Shareable Referral Web Link
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              readOnly
              value={referralUrl}
              className="flex-1 rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs font-mono text-slate-600 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            />
            <button
              onClick={handleCopyLink}
              className="px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white shadow-md cursor-pointer flex items-center space-x-1.5"
            >
              {copiedLink ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span>{copiedLink ? 'Copied' : 'Copy Link'}</span>
            </button>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div className="space-y-3">
          <span className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            Share via Social Channels
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <button
              onClick={handleWhatsApp}
              className="flex items-center justify-center space-x-2 rounded-2xl bg-emerald-500 hover:bg-emerald-600 py-3 text-xs font-bold text-white shadow-md transition-all cursor-pointer"
            >
              <MessageSquare className="h-4 w-4" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={handleTelegram}
              className="flex items-center justify-center space-x-2 rounded-2xl bg-sky-500 hover:bg-sky-600 py-3 text-xs font-bold text-white shadow-md transition-all cursor-pointer"
            >
              <Send className="h-4 w-4" />
              <span>Telegram</span>
            </button>

            <button
              onClick={() => {
                window.location.href = `mailto:?subject=${encodeURIComponent(
                  'Join SPAY360 Financial Network'
                )}&body=${encodeURIComponent(shareText)}`;
              }}
              className="flex items-center justify-center space-x-2 rounded-2xl bg-slate-800 hover:bg-slate-900 py-3 text-xs font-bold text-white shadow-md transition-all cursor-pointer col-span-2 sm:col-span-1"
            >
              <Mail className="h-4 w-4" />
              <span>Email Invite</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
