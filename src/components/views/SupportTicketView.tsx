import React, { useState } from 'react';
import {
  LifeBuoy,
  PlusCircle,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  Send,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SupportTicket } from '../../types';

export const SupportTicketView: React.FC = () => {
  const { supportTickets, createSupportTicket, addTicketReply } = useApp();
  const [selectedTicketId, setSelectedTicketId] = useState<string>(supportTickets[0]?.id || '');
  const [isCreating, setIsCreating] = useState(false);

  // New ticket form state
  const [subject, setSubject] = useState('');
  const [department, setDepartment] = useState<'Billing' | 'Technical' | 'KYC' | 'MLM / Commission' | 'General'>('Billing');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [message, setMessage] = useState('');

  // Reply message state
  const [replyText, setReplyText] = useState('');

  const activeTicket = supportTickets.find((t) => t.id === selectedTicketId) || supportTickets[0];

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) return;
    createSupportTicket(subject, department, priority, message);
    setIsCreating(false);
    setSubject('');
    setMessage('');
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeTicket) return;
    addTicketReply(activeTicket.id, replyText);
    setReplyText('');
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-6 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <LifeBuoy className="h-6 w-6 text-indigo-200" />
            <h1 className="text-2xl font-black tracking-tight text-white">24x7 Helpdesk & Support</h1>
          </div>
          <p className="text-xs text-indigo-100/80">
            Submit inquiry tickets for instant assistance with recharge, KYC, payouts or downline issues
          </p>
        </div>

        <button
          onClick={() => setIsCreating(!isCreating)}
          className="flex items-center space-x-2 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2.5 text-xs font-bold text-white transition-all border border-white/20 cursor-pointer shadow-sm"
        >
          <PlusCircle className="h-4 w-4" />
          <span>{isCreating ? 'View Existing Tickets' : 'Create New Ticket'}</span>
        </button>
      </div>

      {isCreating ? (
        /* Create Ticket Form */
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100 dark:bg-slate-800/90 dark:border-slate-700/80 max-w-2xl mx-auto">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">
            Open a Support Request
          </h2>
          <form onSubmit={handleCreateTicket} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Subject
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief summary of the issue"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Department
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value as any)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                >
                  <option value="Billing">Billing & Top-ups</option>
                  <option value="Technical">Technical & App</option>
                  <option value="KYC">KYC & Banking</option>
                  <option value="MLM / Commission">MLM / Level Commission</option>
                  <option value="General">General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Detailed Message
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Explain the problem and include any transaction IDs..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
            </div>

            <button
              type="submit"
              className="btn-3d w-full rounded-2xl bg-indigo-600 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-700 cursor-pointer"
            >
              Submit Ticket
            </button>
          </form>
        </div>
      ) : (
        /* Ticket Split View */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tickets Sidebar */}
          <div className="rounded-3xl bg-white p-4 shadow-sm border border-slate-100 dark:bg-slate-800/90 dark:border-slate-700/80 space-y-2 max-h-[600px] overflow-y-auto">
            <span className="text-xs font-bold text-slate-400 uppercase px-2 block mb-2">
              Your Tickets ({supportTickets.length})
            </span>

            {supportTickets.map((t) => {
              const isSelected = activeTicket?.id === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedTicketId(t.id)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/40 dark:border-indigo-400'
                      : 'border-slate-100 bg-slate-50/50 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-slate-400">{t.id}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        t.status === 'Open'
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                      }`}
                    >
                      {t.status}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 line-clamp-1">
                    {t.subject}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1">{t.lastUpdated}</p>
                </div>
              );
            })}
          </div>

          {/* Ticket Messages Thread */}
          {activeTicket ? (
            <div className="lg:col-span-2 rounded-3xl bg-white p-6 shadow-sm border border-slate-100 dark:bg-slate-800/90 dark:border-slate-700/80 flex flex-col justify-between h-[600px]">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4 dark:border-slate-700">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                      {activeTicket.subject}
                    </h3>
                    <p className="text-[10px] text-slate-400 font-mono">
                      Ticket #{activeTicket.id} • Dept: {activeTicket.department}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2.5 py-1 rounded-xl">
                    {activeTicket.priority} Priority
                  </span>
                </div>

                {/* Messages Box */}
                <div className="space-y-3 overflow-y-auto max-h-96 pr-2">
                  {activeTicket.message && (
                    <div className="flex flex-col items-start">
                      <div className="max-w-md p-3.5 rounded-2xl text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-100 rounded-bl-none">
                        <p>{activeTicket.message}</p>
                        <span className="text-[9px] opacity-75 mt-1 block text-right">
                          {activeTicket.createdAt || 'Initial Request'}
                        </span>
                      </div>
                    </div>
                  )}

                  {(activeTicket.messages || []).map((m) => (
                    <div
                      key={m.id}
                      className={`flex flex-col ${
                        m.sender === 'user' ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div
                        className={`max-w-md p-3.5 rounded-2xl text-xs font-medium ${
                          m.sender === 'user'
                            ? 'bg-indigo-600 text-white rounded-br-none'
                            : 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-100 rounded-bl-none'
                        }`}
                      >
                        <p>{m.text}</p>
                        <span className="text-[9px] opacity-75 mt-1 block text-right">{m.time}</span>
                      </div>
                    </div>
                  ))}

                  {(activeTicket.replies || []).map((r) => (
                    <div
                      key={r.id}
                      className={`flex flex-col ${
                        r.sender === 'user' ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div
                        className={`max-w-md p-3.5 rounded-2xl text-xs font-medium ${
                          r.sender === 'user'
                            ? 'bg-indigo-600 text-white rounded-br-none'
                            : 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-100 rounded-bl-none'
                        }`}
                      >
                        <p>{r.message}</p>
                        <span className="text-[9px] opacity-75 mt-1 block text-right">{r.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reply Box */}
              <form onSubmit={handleSendReply} className="flex space-x-2 pt-4 border-t border-slate-100 dark:border-slate-700">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your message reply..."
                  className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                />
                <button
                  type="submit"
                  className="px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center space-x-1 cursor-pointer shadow-md"
                >
                  <Send className="h-4 w-4" />
                  <span>Send</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="lg:col-span-2 py-20 text-center text-xs text-slate-400">
              Select a ticket to view conversation
            </div>
          )}
        </div>
      )}
    </div>
  );
};
