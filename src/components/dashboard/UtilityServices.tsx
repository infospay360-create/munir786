import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Icon3D, Icon3DType } from '../icons/3d/Icon3D';

interface UtilityItem {
  id: string;
  label: string;
  iconType: Icon3DType;
}

export const UtilityServices: React.FC = () => {
  const { setActiveUtilityServiceModal } = useApp();

  const services: UtilityItem[] = [
    { id: 'mobile', label: 'Mobile', iconType: 'mobile' },
    { id: 'dth', label: 'DTH', iconType: 'dth' },
    { id: 'electricity', label: 'Electricity', iconType: 'electricity' },
    { id: 'gas', label: 'Gas', iconType: 'gas' },
    { id: 'water', label: 'Water', iconType: 'water' },
    { id: 'broadband', label: 'Broadband', iconType: 'broadband' },
    { id: 'fastag', label: 'Fastag', iconType: 'fastag' },
    { id: 'postpaid', label: 'Postpaid', iconType: 'postpaid' },
  ];

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100 dark:bg-slate-800/90 dark:border-slate-700/80">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 tracking-tight">
          Utility Services
        </h3>
        <button
          onClick={() => setActiveUtilityServiceModal('mobile')}
          className="flex items-center space-x-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 cursor-pointer"
        >
          <span>View All</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-4 gap-y-4 gap-x-2 text-center">
        {services.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveUtilityServiceModal(item.id)}
            className="group flex flex-col items-center justify-center p-2 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 cursor-pointer"
          >
            <div className="mb-2 transition-transform duration-200 group-hover:scale-110">
              <Icon3D type={item.iconType} size={44} />
            </div>
            <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-200 leading-tight">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
