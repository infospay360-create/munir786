import React from 'react';

// Reusable 3D realistic icon component with pure SVG gradients, glossy highlights & realistic drop-shadows
export type Icon3DType =
  | 'smart_points'
  | 'pv_wallet'
  | 'direct_referrals'
  | 'total_team'
  | 'active_team'
  | 'total_earnings'
  | 'active_packages'
  | 'total_withdrawn'
  | 'repurchase'
  | 'level_income'
  | 'self_cashback'
  | 'today_income'
  | 'today_joining'
  | 'wallet_purple'
  | 'wallet_blue'
  | 'mobile'
  | 'dth'
  | 'electricity'
  | 'gas'
  | 'water'
  | 'broadband'
  | 'fastag'
  | 'postpaid'
  | 'action_activate'
  | 'action_add_money'
  | 'action_withdraw'
  | 'action_team'
  | 'action_passbook'
  | 'action_support'
  | 'action_history'
  | 'action_settings';

export const Icon3D: React.FC<{ type: Icon3DType; className?: string; size?: number }> = ({
  type,
  className = '',
  size = 48,
}) => {
  const w = size;
  const h = size;

  switch (type) {
    case 'smart_points':
      // 3D Golden Star Coin with realistic bevel and glow
      return (
        <svg width={w} height={h} viewBox="0 0 64 64" fill="none" className={className}>
          <defs>
            <radialGradient id="gold-radial" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#FFF7B2" />
              <stop offset="40%" stopColor="#FBBF24" />
              <stop offset="85%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#92400E" />
            </radialGradient>
            <radialGradient id="star-radial" cx="40%" cy="30%" r="60%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#FEF08A" />
              <stop offset="100%" stopColor="#F59E0B" />
            </radialGradient>
            <filter id="shadow-gold" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#F59E0B" floodOpacity="0.45" />
            </filter>
          </defs>
          <g filter="url(#shadow-gold)">
            {/* Outer Rim */}
            <circle cx="32" cy="32" r="26" fill="url(#gold-radial)" stroke="#FEF3C7" strokeWidth="2.5" />
            {/* Inner Ring */}
            <circle cx="32" cy="32" r="21" fill="#B45309" fillOpacity="0.3" stroke="#FDE68A" strokeWidth="1.5" strokeDasharray="3 2" />
            {/* 3D Star */}
            <path
              d="M32 15L36.5 24.5L47 25.8L39.2 33.2L41.3 43.6L32 38.3L22.7 43.6L24.8 33.2L17 25.8L27.5 24.5L32 15Z"
              fill="url(#star-radial)"
              stroke="#FFF"
              strokeWidth="0.8"
            />
            {/* Gloss highlight */}
            <ellipse cx="28" cy="18" rx="8" ry="4" fill="#FFFFFF" fillOpacity="0.6" transform="rotate(-15 28 18)" />
          </g>
        </svg>
      );

    case 'pv_wallet':
      // 3D Bar Chart with green ascending arrow
      return (
        <svg width={w} height={h} viewBox="0 0 64 64" fill="none" className={className}>
          <defs>
            <linearGradient id="pv-green" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="pv-green-light" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6EE7B7" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
            <filter id="shadow-pv" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#10B981" floodOpacity="0.4" />
            </filter>
          </defs>
          <g filter="url(#shadow-pv)">
            {/* Base platform */}
            <rect x="8" y="44" width="48" height="8" rx="4" fill="#047857" opacity="0.4" />
            {/* Bars */}
            <rect x="14" y="32" width="9" height="18" rx="3" fill="url(#pv-green)" />
            <rect x="27" y="24" width="9" height="26" rx="3" fill="url(#pv-green)" />
            <rect x="40" y="14" width="9" height="36" rx="3" fill="url(#pv-green)" />
            {/* Tops */}
            <rect x="14" y="32" width="9" height="3" rx="1.5" fill="#A7F3D0" />
            <rect x="27" y="24" width="9" height="3" rx="1.5" fill="#A7F3D0" />
            <rect x="40" y="14" width="9" height="3" rx="1.5" fill="#A7F3D0" />
            {/* Ascending 3D arrow */}
            <path
              d="M12 40L26 26L36 32L49 14M49 14H40M49 14V23"
              stroke="#ECFDF5"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      );

    case 'direct_referrals':
      // 3D Purple Team silhouettes
      return (
        <svg width={w} height={h} viewBox="0 0 64 64" fill="none" className={className}>
          <defs>
            <linearGradient id="purple-grad-3d" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#C084FC" />
              <stop offset="50%" stopColor="#9333EA" />
              <stop offset="100%" stopColor="#6B21A8" />
            </linearGradient>
            <filter id="shadow-purp" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#9333EA" floodOpacity="0.4" />
            </filter>
          </defs>
          <g filter="url(#shadow-purp)">
            {/* Left Member */}
            <circle cx="20" cy="24" r="7" fill="url(#purple-grad-3d)" opacity="0.85" />
            <path d="M10 46C10 38 15 35 20 35C25 35 30 38 30 46" fill="url(#purple-grad-3d)" opacity="0.85" />
            {/* Right Member */}
            <circle cx="44" cy="24" r="7" fill="url(#purple-grad-3d)" opacity="0.85" />
            <path d="M34 46C34 38 39 35 44 35C49 35 54 38 54 46" fill="url(#purple-grad-3d)" opacity="0.85" />
            {/* Center Leader */}
            <circle cx="32" cy="18" r="9" fill="url(#purple-grad-3d)" stroke="#F3E8FF" strokeWidth="1.5" />
            <path d="M19 46C19 36 25 32 32 32C39 32 45 36 45 46" fill="url(#purple-grad-3d)" stroke="#F3E8FF" strokeWidth="1" />
          </g>
        </svg>
      );

    case 'total_team':
      // 3D Blue Team avatars
      return (
        <svg width={w} height={h} viewBox="0 0 64 64" fill="none" className={className}>
          <defs>
            <linearGradient id="blue-team-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="50%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
            <filter id="shadow-blue-t" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#2563EB" floodOpacity="0.4" />
            </filter>
          </defs>
          <g filter="url(#shadow-blue-t)">
            <circle cx="22" cy="24" r="7" fill="url(#blue-team-grad)" opacity="0.9" />
            <path d="M12 46C12 38 17 35 22 35C27 35 32 38 32 46" fill="url(#blue-team-grad)" opacity="0.9" />
            <circle cx="42" cy="20" r="8.5" fill="url(#blue-team-grad)" stroke="#DBEAFE" strokeWidth="1.5" />
            <path d="M30 46C30 36 36 31 42 31C48 31 54 36 54 46" fill="url(#blue-team-grad)" stroke="#DBEAFE" strokeWidth="1" />
          </g>
        </svg>
      );

    case 'active_team':
      // 3D Green Team
      return (
        <svg width={w} height={h} viewBox="0 0 64 64" fill="none" className={className}>
          <defs>
            <linearGradient id="active-green-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4ADE80" />
              <stop offset="50%" stopColor="#16A34A" />
              <stop offset="100%" stopColor="#15803D" />
            </linearGradient>
            <filter id="shadow-green-t" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#16A34A" floodOpacity="0.4" />
            </filter>
          </defs>
          <g filter="url(#shadow-green-t)">
            <circle cx="24" cy="24" r="7" fill="url(#active-green-grad)" />
            <path d="M14 46C14 38 19 35 24 35C29 35 34 38 34 46" fill="url(#active-green-grad)" />
            <circle cx="40" cy="22" r="8" fill="url(#active-green-grad)" stroke="#DCFCE7" strokeWidth="1.5" />
            <path d="M29 46C29 36 35 32 40 32C45 32 51 36 51 46" fill="url(#active-green-grad)" stroke="#DCFCE7" strokeWidth="1" />
            <circle cx="46" cy="18" r="3" fill="#22C55E" stroke="#FFF" strokeWidth="1" />
          </g>
        </svg>
      );

    case 'total_earnings':
      // 3D Golden Leather Wallet with cash
      return (
        <svg width={w} height={h} viewBox="0 0 64 64" fill="none" className={className}>
          <defs>
            <linearGradient id="wallet-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="50%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
            <filter id="shadow-earn" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#D97706" floodOpacity="0.4" />
            </filter>
          </defs>
          <g filter="url(#shadow-earn)">
            <rect x="12" y="20" width="40" height="28" rx="6" fill="url(#wallet-gold)" stroke="#FDE68A" strokeWidth="1" />
            <path d="M12 26H52" stroke="#92400E" strokeWidth="1.5" />
            {/* Clasp */}
            <path d="M38 27H52V41H38C34.7 41 32 38.3 32 35C32 31.7 34.7 27 38 27Z" fill="#F59E0B" stroke="#FEF3C7" strokeWidth="1" />
            <circle cx="42" cy="34" r="2.5" fill="#FFF" />
            {/* Stacked bills peaking */}
            <rect x="18" y="14" width="28" height="8" rx="2" fill="#10B981" stroke="#A7F3D0" strokeWidth="1" />
          </g>
        </svg>
      );

    case 'active_packages':
      // 3D Pink Gift / Package Box with ribbon
      return (
        <svg width={w} height={h} viewBox="0 0 64 64" fill="none" className={className}>
          <defs>
            <linearGradient id="pink-box" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F472B6" />
              <stop offset="50%" stopColor="#DB2777" />
              <stop offset="100%" stopColor="#9D174D" />
            </linearGradient>
            <filter id="shadow-pink-pkg" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#DB2777" floodOpacity="0.4" />
            </filter>
          </defs>
          <g filter="url(#shadow-pink-pkg)">
            <rect x="14" y="24" width="36" height="26" rx="5" fill="url(#pink-box)" stroke="#FCE7F3" strokeWidth="1" />
            <rect x="12" y="19" width="40" height="9" rx="3" fill="#F472B6" stroke="#FFF" strokeWidth="1" />
            {/* Ribbon */}
            <rect x="29" y="19" width="6" height="31" fill="#FEF08A" />
            {/* Bow */}
            <path d="M32 19C28 13 22 15 25 19C28 20 32 19 32 19Z" fill="#FDE047" stroke="#FEF08A" strokeWidth="0.8" />
            <path d="M32 19C36 13 42 15 39 19C36 20 32 19 32 19Z" fill="#FDE047" stroke="#FEF08A" strokeWidth="0.8" />
          </g>
        </svg>
      );

    case 'total_withdrawn':
      // 3D Red circle with white download arrow
      return (
        <svg width={w} height={h} viewBox="0 0 64 64" fill="none" className={className}>
          <defs>
            <linearGradient id="red-with" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F87171" />
              <stop offset="50%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#B91C1C" />
            </linearGradient>
            <filter id="shadow-red-w" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#EF4444" floodOpacity="0.4" />
            </filter>
          </defs>
          <g filter="url(#shadow-red-w)">
            <circle cx="32" cy="32" r="23" fill="url(#red-with)" stroke="#FEE2E2" strokeWidth="1.5" />
            <path
              d="M32 20V38M32 38L24 30M32 38L40 30M22 44H42"
              stroke="#FFFFFF"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      );

    case 'repurchase':
      // 3D Green recycle arrows / reload
      return (
        <svg width={w} height={h} viewBox="0 0 64 64" fill="none" className={className}>
          <defs>
            <linearGradient id="rep-green" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#86EFAC" />
              <stop offset="50%" stopColor="#22C55E" />
              <stop offset="100%" stopColor="#16A34A" />
            </linearGradient>
            <filter id="shadow-rep" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#22C55E" floodOpacity="0.4" />
            </filter>
          </defs>
          <g filter="url(#shadow-rep)">
            <circle cx="32" cy="32" r="23" fill="url(#rep-green)" stroke="#DCFCE7" strokeWidth="1.5" />
            <path
              d="M32 19C38 19 43 23 44.5 29M45 23V30H38M32 45C26 45 21 41 19.5 35M19 41V34H26"
              stroke="#FFFFFF"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      );

    case 'level_income':
      // 3D Pink Heart / Diamond
      return (
        <svg width={w} height={h} viewBox="0 0 64 64" fill="none" className={className}>
          <defs>
            <linearGradient id="pink-heart" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F472B6" />
              <stop offset="50%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#BE185D" />
            </linearGradient>
            <filter id="shadow-heart" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#EC4899" floodOpacity="0.45" />
            </filter>
          </defs>
          <g filter="url(#shadow-heart)">
            <path
              d="M32 49C32 49 14 38 14 26C14 20 18.5 16 24 16C28 16 31 18.5 32 21C33 18.5 36 16 40 16C45.5 16 50 20 50 26C50 38 32 49 32 49Z"
              fill="url(#pink-heart)"
              stroke="#FCE7F3"
              strokeWidth="1.5"
            />
            {/* Highlight */}
            <ellipse cx="22" cy="22" rx="4" ry="2" fill="#FFF" fillOpacity="0.6" transform="rotate(-30 22 22)" />
          </g>
        </svg>
      );

    case 'self_cashback':
      // 3D Cyan Blue Rupee / Cashback badge
      return (
        <svg width={w} height={h} viewBox="0 0 64 64" fill="none" className={className}>
          <defs>
            <linearGradient id="cash-cyan" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="50%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0369A1" />
            </linearGradient>
            <filter id="shadow-cash" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#0284C7" floodOpacity="0.4" />
            </filter>
          </defs>
          <g filter="url(#shadow-cash)">
            <circle cx="32" cy="32" r="23" fill="url(#cash-cyan)" stroke="#E0F2FE" strokeWidth="1.5" />
            <path
              d="M24 23H40M24 29H36M24 23H28C32 23 35 25 35 28C35 32 31 34 27 34L37 43M24 34H30"
              stroke="#FFFFFF"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      );

    case 'today_income':
      // 3D Green Ascending Zig-Zag Graph Arrow
      return (
        <svg width={w} height={h} viewBox="0 0 64 64" fill="none" className={className}>
          <defs>
            <linearGradient id="today-green" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4ADE80" />
              <stop offset="50%" stopColor="#16A34A" />
              <stop offset="100%" stopColor="#15803D" />
            </linearGradient>
            <filter id="shadow-today" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#16A34A" floodOpacity="0.4" />
            </filter>
          </defs>
          <g filter="url(#shadow-today)">
            <path
              d="M14 44L26 32L34 38L50 18M50 18H38M50 18V30"
              stroke="url(#today-green)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      );

    case 'today_joining':
      // 3D Purple Avatar with Plus badge
      return (
        <svg width={w} height={h} viewBox="0 0 64 64" fill="none" className={className}>
          <defs>
            <linearGradient id="today-join" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#C084FC" />
              <stop offset="50%" stopColor="#9333EA" />
              <stop offset="100%" stopColor="#7E22CE" />
            </linearGradient>
            <filter id="shadow-join" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#9333EA" floodOpacity="0.4" />
            </filter>
          </defs>
          <g filter="url(#shadow-join)">
            <circle cx="28" cy="22" r="9" fill="url(#today-join)" stroke="#F3E8FF" strokeWidth="1.5" />
            <path d="M15 48C15 37 21 33 28 33C35 33 41 37 41 48" fill="url(#today-join)" stroke="#F3E8FF" strokeWidth="1" />
            {/* Plus button */}
            <circle cx="44" cy="40" r="9" fill="#3B82F6" stroke="#EFF6FF" strokeWidth="1.5" />
            <path d="M44 35V45M39 40H49" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        </svg>
      );

    case 'wallet_purple':
    case 'wallet_blue':
      // Top banner 3D wallet
      return (
        <svg width={w} height={h} viewBox="0 0 64 64" fill="none" className={className}>
          <defs>
            <linearGradient id="banner-wallet-p" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#818CF8" />
              <stop offset="50%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#3730A3" />
            </linearGradient>
            <filter id="shadow-ban-wal" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#4F46E5" floodOpacity="0.5" />
            </filter>
          </defs>
          <g filter="url(#shadow-ban-wal)">
            <rect x="8" y="16" width="48" height="34" rx="7" fill="url(#banner-wallet-p)" stroke="#C7D2FE" strokeWidth="1" />
            <rect x="36" y="24" width="20" height="18" rx="4" fill="#6366F1" stroke="#E0E7FF" strokeWidth="1" />
            <circle cx="44" cy="33" r="3" fill="#FEF08A" stroke="#FFF" strokeWidth="0.8" />
          </g>
        </svg>
      );

    // Utility icons (glossy rounded colored square badges)
    case 'mobile':
      return renderSquareBadge('#2563EB', '#60A5FA', '📱', w, h, className, 'mobile');
    case 'dth':
      return renderSquareBadge('#EF4444', '#F87171', '📺', w, h, className, 'dth');
    case 'electricity':
      return renderSquareBadge('#F59E0B', '#FBBF24', '⚡', w, h, className, 'elec');
    case 'gas':
      return renderSquareBadge('#EA580C', '#FB923C', '🔥', w, h, className, 'gas');
    case 'water':
      return renderSquareBadge('#0284C7', '#38BDF8', '💧', w, h, className, 'water');
    case 'broadband':
      return renderSquareBadge('#7C3AED', '#A855F7', '📡', w, h, className, 'broad');
    case 'fastag':
      return renderSquareBadge('#059669', '#34D399', '🚗', w, h, className, 'fastag');
    case 'postpaid':
      return renderSquareBadge('#475569', '#94A3B8', '📄', w, h, className, 'postpaid');

    // Quick Actions
    case 'action_activate':
      return renderSquareBadge('#2563EB', '#3B82F6', '🛡️', w, h, className, 'act_shield');
    case 'action_add_money':
      return renderSquareBadge('#059669', '#10B981', '💳', w, h, className, 'act_add');
    case 'action_withdraw':
      return renderSquareBadge('#7C3AED', '#8B5CF6', '🎁', w, h, className, 'act_with');
    case 'action_team':
      return renderSquareBadge('#1D4ED8', '#3B82F6', '👥', w, h, className, 'act_team');
    case 'action_passbook':
      return renderSquareBadge('#0284C7', '#38BDF8', '📖', w, h, className, 'act_pass');
    case 'action_support':
      return renderSquareBadge('#D97706', '#F59E0B', '🎧', w, h, className, 'act_sup');
    case 'action_history':
      return renderSquareBadge('#DB2777', '#EC4899', '👤', w, h, className, 'act_hist');
    case 'action_settings':
      return renderSquareBadge('#0D9488', '#14B8A6', '⚙️', w, h, className, 'act_set');

    default:
      return null;
  }
};

function renderSquareBadge(
  c1: string,
  c2: string,
  emoji: string,
  w: number,
  h: number,
  className: string,
  id: string
) {
  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-2xl p-2 transition-transform duration-200 hover:scale-105 active:scale-95 ${className}`}
      style={{
        width: w,
        height: h,
        background: `linear-gradient(135deg, ${c2} 0%, ${c1} 100%)`,
        boxShadow: `0 8px 18px -4px ${c1}60, inset 0 2px 3px rgba(255,255,255,0.4)`,
      }}
    >
      <span className="text-xl filter drop-shadow-sm select-none">{emoji}</span>
      <div className="absolute top-1 left-2 right-2 h-1.5 rounded-full bg-white opacity-30" />
    </div>
  );
}

// SPAY360 3D Logo Icon
export const SpayLogo: React.FC<{ size?: number; className?: string }> = ({ size = 44, className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        <defs>
          <linearGradient id="spay-ring-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#818CF8" />
            <stop offset="35%" stopColor="#4F46E5" />
            <stop offset="70%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#C026D3" />
          </linearGradient>
          <linearGradient id="spay-glow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#A5B4FC" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
          <filter id="logo-drop" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#6366F1" floodOpacity="0.45" />
          </filter>
        </defs>
        <g filter="url(#logo-drop)">
          {/* Stylized outer toroidal ring loop forming S */}
          <path
            d="M44 20C40 14 31 13 24 16C15 20 14 31 22 36C28 40 37 39 42 44C47 49 43 56 34 56C25 56 19 50 18 45"
            stroke="url(#spay-ring-grad)"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* Inner glossy highlight dot */}
          <circle cx="34" cy="22" r="3.5" fill="#FFFFFF" fillOpacity="0.9" />
          <circle cx="28" cy="46" r="3" fill="#FFFFFF" fillOpacity="0.7" />
        </g>
      </svg>
    </div>
  );
};
