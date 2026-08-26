import React from 'react';
import {
  X,
  Bell,
  CheckCircle2,
  AlertCircle,
  Tag,
  ShieldCheck,
  TrendingUp,
  Clock,
  Trash2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NotificationModal: React.FC = () => {
  const {
    isNotificationOpen,
    setIsNotificationOpen,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    setActiveTab,
  } = useApp();

  if (!isNotificationOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end pt-16 pr-4 sm:pr-8 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-md max-h-[85vh] flex flex-col rounded-3xl bg-white shadow-2xl dark:bg-slate-800 dark:border dark:border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
              <Bell className="h-4 w-4" />
            </div>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
              Notifications ({notifications.filter((n) => !n.isRead).length})
            </h3>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={markAllNotificationsAsRead}
              className="text-xs font-bold text-indigo-600 hover:underline dark:text-indigo-400 cursor-pointer"
            >
              Mark all read
            </button>
            <button
              onClick={() => setIsNotificationOpen(false)}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="p-4 space-y-3 overflow-y-auto flex-1">
          {notifications.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              You have no new notifications
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => {
                  markNotificationAsRead(n.id);
                  if (n.actionTab) {
                    setActiveTab(n.actionTab as any);
                    setIsNotificationOpen(false);
                  }
                }}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  n.isRead
                    ? 'border-slate-100 bg-slate-50/50 dark:border-slate-700/50 dark:bg-slate-900/30'
                    : 'border-indigo-100 bg-indigo-50/40 dark:border-indigo-900/40 dark:bg-indigo-950/20 shadow-xs'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5 shrink-0">
                    {n.type === 'transaction' && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                    {n.type === 'system' && <ShieldCheck className="h-4 w-4 text-indigo-500" />}
                    {n.type === 'team' && <TrendingUp className="h-4 w-4 text-blue-500" />}
                    {n.type === 'offer' && <Tag className="h-4 w-4 text-amber-500" />}
                  </div>

                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                        {n.title}
                      </span>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {n.message}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
