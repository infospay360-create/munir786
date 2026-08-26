import React from 'react';
import { useApp } from '../../context/AppContext';

export const PromoCard: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <div
      onClick={() => setActiveTab('packages')}
      className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-purple-700 to-blue-800 p-6 text-white shadow-xl shadow-indigo-900/20 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between"
    >
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-purple-400/25 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-blue-400/20 blur-2xl pointer-events-none" />

      <div className="relative z-10 space-y-2 max-w-sm">
        <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight text-white">
          Make Every Transaction Count With SPAY360
        </h3>
        <p className="text-xs text-indigo-100/90 font-medium">
          Fast. Secure. Reliable.
          <br />
          All in One Platform.
        </p>
      </div>

      {/* 3D Realistic Shield & Wallet Illustration Layout */}
      <div className="mt-4 flex items-end justify-end">
        <div className="relative h-28 w-44">
          {/* Stacked 3D Cards */}
          <div className="absolute bottom-2 left-2 h-14 w-24 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 shadow-lg transform -rotate-12 border border-white/30" />
          <div className="absolute bottom-4 left-6 h-14 w-24 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 shadow-xl transform rotate-6 border border-white/40" />

          {/* 3D Glass Shield */}
          <div className="absolute bottom-1 right-2 flex items-center justify-center h-22 w-20 rounded-3xl bg-gradient-to-b from-indigo-500/80 to-purple-600/90 backdrop-blur-md border-2 border-white/60 shadow-2xl transform group-hover:scale-105 transition-transform duration-200">
            <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
              <path
                d="M24 6L10 12V22C10 32 16 39 24 42C32 39 38 32 38 22V12L24 6Z"
                fill="url(#shield-fill)"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
              <path
                d="M18 24L22 28L30 20"
                stroke="#FFFFFF"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient id="shield-fill" x1="10" y1="6" x2="38" y2="42">
                  <stop offset="0%" stopColor="#818CF8" />
                  <stop offset="100%" stopColor="#4F46E5" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Gold coin */}
          <div className="absolute top-2 left-1 h-7 w-7 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 border-2 border-white shadow-md flex items-center justify-center text-[10px] font-black text-amber-900">
            ₹
          </div>
        </div>
      </div>
    </div>
  );
};
