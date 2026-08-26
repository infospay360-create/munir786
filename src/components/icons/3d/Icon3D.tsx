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
      return renderSquareBadge('#D97706', '#FBBF24', '⭐', w, h, className, 'smart_pts');

    case 'pv_wallet':
      return renderSquareBadge('#059669', '#34D399', '📊', w, h, className, 'pv_wal');

    case 'direct_referrals':
      return renderSquareBadge('#7C3AED', '#A855F7', '👥', w, h, className, 'dir_ref');

    case 'total_team':
      return renderSquareBadge('#1D4ED8', '#3B82F6', '🌐', w, h, className, 'tot_team');

    case 'active_team':
      return renderSquareBadge('#15803D', '#22C55E', '🟢', w, h, className, 'act_team');

    case 'total_earnings':
      return renderSquareBadge('#B45309', '#F59E0B', '💰', w, h, className, 'tot_earn');

    case 'active_packages':
      return renderSquareBadge('#BE185D', '#EC4899', '🎁', w, h, className, 'act_pkg');

    case 'total_withdrawn':
      return renderSquareBadge('#B91C1C', '#EF4444', '📥', w, h, className, 'tot_with');

    case 'repurchase':
      return renderSquareBadge('#0F766E', '#14B8A6', '🔄', w, h, className, 'repurchase');

    case 'level_income':
      return renderSquareBadge('#A21CAF', '#E879F9', '💎', w, h, className, 'lvl_inc');

    case 'self_cashback':
      return renderSquareBadge('#0369A1', '#38BDF8', '⚡', w, h, className, 'self_cash');

    case 'today_income':
      return renderSquareBadge('#4D7C0F', '#84CC16', '📈', w, h, className, 'tdy_inc');

    case 'today_joining':
      return renderSquareBadge('#6D28D9', '#8B5CF6', '👤', w, h, className, 'tdy_join');

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
