import React, { useState } from 'react';
import {
  Users,
  UserCheck,
  UserX,
  Share2,
  Search,
  Network,
  ChevronRight,
  TrendingUp,
  Award,
  Crown,
  Phone,
  Calendar,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TeamMember } from '../../types';

export const TeamView: React.FC = () => {
  const { user, teamMembers, setIsShareOpen } = useApp();
  const [viewMode, setViewMode] = useState<'list' | 'tree'>('list');
  const [selectedLevel, setSelectedLevel] = useState<number | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Active' | 'Inactive'>('all');
  const [search, setSearch] = useState('');

  const filteredMembers = teamMembers.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.spayId.toLowerCase().includes(search.toLowerCase()) ||
      m.mobile.includes(search);
    const matchLevel = selectedLevel === 'all' || m.level === selectedLevel;
    const matchStatus = statusFilter === 'all' || m.status === statusFilter;
    return matchSearch && matchLevel && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-6 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Users className="h-6 w-6 text-indigo-200" />
            <h1 className="text-2xl font-black tracking-tight text-white">MLM Team & Network</h1>
          </div>
          <p className="text-xs text-indigo-100/80">
            Monitor your 10-level direct referrals, downline team volume, and PV earnings
          </p>
        </div>

        <button
          onClick={() => setIsShareOpen(true)}
          className="flex items-center space-x-2 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2.5 text-xs font-bold text-white transition-all border border-white/20 cursor-pointer shadow-sm"
        >
          <Share2 className="h-4 w-4" />
          <span>Invite New Member</span>
        </button>
      </div>

      {/* Team Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Direct Referrals</span>
          <p className="text-2xl font-black text-slate-800 dark:text-slate-100 mt-1">
            {user.directReferralsCount} Members
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Total Downline</span>
          <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">
            {user.totalTeamCount} Members
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Active Network</span>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            {user.activeTeamCount} Active
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Total Team P.V</span>
          <p className="text-2xl font-black text-amber-500 mt-1">
            420 P.V
          </p>
        </div>
      </div>

      {/* View Mode Toggle & Level Filter */}
      <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100 dark:bg-slate-800/90 dark:border-slate-700/80 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search member by Name, SPAY ID, Phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>

          {/* Level selector */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1">
            {(['all', 1, 2, 3, 4, 5] as const).map((lvl) => (
              <button
                key={lvl.toString()}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedLevel === lvl
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                }`}
              >
                {lvl === 'all' ? 'All Levels' : `Level ${lvl}`}
              </button>
            ))}
          </div>

          {/* View Mode (List / Tree) */}
          <div className="flex rounded-2xl bg-slate-100 p-1 dark:bg-slate-700/50">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-white text-indigo-600 shadow-sm dark:bg-slate-800 dark:text-indigo-400'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setViewMode('tree')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                viewMode === 'tree'
                  ? 'bg-white text-indigo-600 shadow-sm dark:bg-slate-800 dark:text-indigo-400'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
              }`}
            >
              Genealogy Tree
            </button>
          </div>
        </div>

        {/* Tree View Render */}
        {viewMode === 'tree' ? (
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 flex flex-col items-center space-y-6">
            {/* Root Node (Current User) */}
            <div className="flex flex-col items-center">
              <div className="p-4 rounded-3xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-xl flex items-center space-x-3 border-2 border-white">
                <Crown className="h-6 w-6 text-amber-300" />
                <div>
                  <span className="text-sm font-black">{user.name} (YOU)</span>
                  <p className="text-[10px] text-indigo-200 font-mono">
                    {user.inviteCode} • Diamond Leader
                  </p>
                </div>
              </div>
              <div className="h-6 w-0.5 bg-indigo-300 dark:bg-indigo-600 mt-2" />
            </div>

            {/* Level 1 Nodes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
              {teamMembers.slice(0, 3).map((m) => (
                <div
                  key={m.id}
                  className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center font-bold text-xs text-indigo-600 dark:text-indigo-400">
                      L1
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block">
                        {m.name}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">{m.spayId}</span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-indigo-600 dark:text-indigo-400">
                    {m.package}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* List View Table */
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-700/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="pb-3 pl-2">MEMBER</th>
                  <th className="pb-3">LEVEL & SPONSOR</th>
                  <th className="pb-3 text-center">PACKAGE</th>
                  <th className="pb-3 text-center">STATUS</th>
                  <th className="pb-3 text-right">DIRECTS / PV</th>
                  <th className="pb-3 pr-2 text-right">JOINING DATE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-700/40 text-xs">
                {filteredMembers.map((m) => (
                  <tr
                    key={m.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-700/30 transition-colors"
                  >
                    <td className="py-3.5 pl-2">
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 text-white flex items-center justify-center font-black text-xs">
                          {m.name.charAt(0)}
                        </div>
                        <div>
                          <span className="font-bold text-slate-800 dark:text-slate-100 block">
                            {m.name}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">{m.spayId}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5">
                      <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                        Level {m.level}
                      </span>
                      <p className="text-[10px] text-slate-400 mt-0.5">Sponsor: {m.sponsorId}</p>
                    </td>

                    <td className="py-3.5 text-center font-bold text-slate-800 dark:text-slate-200">
                      {m.package}
                    </td>

                    <td className="py-3.5 text-center">
                      <span className="inline-flex items-center space-x-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                        <UserCheck className="h-3 w-3" />
                        <span>{m.status}</span>
                      </span>
                    </td>

                    <td className="py-3.5 text-right font-semibold text-slate-700 dark:text-slate-300">
                      <div>{m.directCount} Directs</div>
                      <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold">
                        {m.pvPoints} PV
                      </span>
                    </td>

                    <td className="py-3.5 pr-2 text-right text-slate-400 whitespace-nowrap">
                      {m.joinDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
