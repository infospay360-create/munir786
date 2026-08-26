import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const EarningsChart: React.FC = () => {
  const { setActiveTab } = useApp();
  const [timeRange, setTimeRange] = useState('This Week');
  const [activePointIndex, setActivePointIndex] = useState<number | null>(2); // Default active on Saturday peak

  const dataPoints = [
    { day: 'Thu', val: 0.05, label: '₹0.05' },
    { day: 'Fri', val: 0.08, label: '₹0.08' },
    { day: 'Sat', val: 0.52, label: '₹0.52' },
    { day: 'Sun', val: 0.04, label: '₹0.04' },
    { day: 'Mon', val: 0.12, label: '₹0.12' },
    { day: 'Tue', val: 0.38, label: '₹0.38' },
    { day: 'Wed', val: 0.02, label: '₹0.02' },
  ];

  const ranges = ['This Week', 'This Month', 'Last Month', 'This Year'];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // SVG dimensions
  const width = 500;
  const height = 180;
  const paddingX = 40;
  const paddingY = 25;

  const points = dataPoints.map((pt, i) => {
    const x = paddingX + (i * (width - 2 * paddingX)) / (dataPoints.length - 1);
    const maxVal = 0.65;
    const y = height - paddingY - (pt.val / maxVal) * (height - 2 * paddingY);
    return { x, y, ...pt };
  });

  // Generate smooth SVG path
  const pathD = points.reduce((acc, pt, i, arr) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = arr[i - 1];
    const cx1 = prev.x + (pt.x - prev.x) / 2;
    const cy1 = prev.y;
    const cx2 = prev.x + (pt.x - prev.x) / 2;
    const cy2 = pt.y;
    return `${acc} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${pt.x} ${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100 dark:bg-slate-800/90 dark:border-slate-700/80">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 tracking-tight">
            This Week's Earnings
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-400">Your daily earnings breakdown</p>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 cursor-pointer"
          >
            <span>{timeRange}</span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-36 rounded-2xl border border-slate-100 bg-white p-1 shadow-xl dark:border-slate-700 dark:bg-slate-800 z-20">
              {ranges.map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setTimeRange(r);
                    setIsDropdownOpen(false);
                  }}
                  className={`flex w-full items-center rounded-xl px-3 py-1.5 text-xs font-medium ${
                    timeRange === r
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400'
                      : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* SVG Chart Canvas */}
      <div className="relative w-full cursor-pointer" onClick={() => setActiveTab('earnings_analytics')}>
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-44 overflow-visible">
          <defs>
            <linearGradient id="chart-area-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#818CF8" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#C7D2FE" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="chart-line-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>

          {/* Horizontal grid lines and Y-axis labels */}
          {['₹0.60', '₹0.45', '₹0.30', '₹0.15', '₹0'].map((label, idx) => {
            const y = paddingY + idx * ((height - 2 * paddingY) / 4);
            return (
              <g key={label}>
                <text x="5" y={y + 3} className="text-[9px] fill-slate-400 font-medium select-none">
                  {label}
                </text>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - 10}
                  y2={y}
                  stroke="currentColor"
                  className="text-slate-100 dark:text-slate-700/60"
                  strokeDasharray="4 4"
                />
              </g>
            );
          })}

          {/* Area Fill */}
          <path d={areaD} fill="url(#chart-area-grad)" />

          {/* Smooth Line Curve */}
          <path
            d={pathD}
            fill="none"
            stroke="url(#chart-line-grad)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Data Points */}
          {points.map((pt, idx) => {
            const isActive = activePointIndex === idx;
            return (
              <g
                key={pt.day}
                onMouseEnter={() => setActivePointIndex(idx)}
                className="cursor-pointer"
              >
                {/* Connecting vertical helper */}
                {isActive && (
                  <line
                    x1={pt.x}
                    y1={pt.y}
                    x2={pt.x}
                    y2={height - paddingY}
                    stroke="#6366F1"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                )}

                {/* Point circle */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isActive ? 6.5 : 4}
                  fill={isActive ? '#4F46E5' : '#FFFFFF'}
                  stroke="#4F46E5"
                  strokeWidth={isActive ? 3 : 2.5}
                  className="transition-all duration-150"
                />

                {/* Tooltip on active */}
                {isActive && (
                  <g transform={`translate(${pt.x}, ${pt.y - 14})`}>
                    <rect
                      x="-24"
                      y="-18"
                      width="48"
                      height="20"
                      rx="6"
                      fill="#1E1B4B"
                      className="drop-shadow-md"
                    />
                    <text
                      x="0"
                      y="-5"
                      textAnchor="middle"
                      fill="#FFFFFF"
                      className="text-[10px] font-bold"
                    >
                      {pt.label}
                    </text>
                  </g>
                )}

                {/* Day label */}
                <text
                  x={pt.x}
                  y={height - 5}
                  textAnchor="middle"
                  className={`text-[10px] font-semibold select-none ${
                    isActive ? 'fill-indigo-600 font-bold' : 'fill-slate-400'
                  }`}
                >
                  {pt.day}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
