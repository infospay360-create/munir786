import React, { useState } from 'react';
import {
  Settings,
  User,
  ShieldCheck,
  Building,
  Lock,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SettingsView: React.FC = () => {
  const { user, bankAccounts, updateProfile, submitKyc, addBankAccount, addToast } = useApp();
  const [activeTab, setActiveTab] = useState<'profile' | 'kyc' | 'banking' | 'security'>('profile');

  // Profile fields
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [mobile, setMobile] = useState(user.mobile);

  // KYC fields
  const [panNumber, setPanNumber] = useState(user.panNumber || '');
  const [aadhaarNumber, setAadhaarNumber] = useState(user.aadhaarNumber || '');

  // Bank fields
  const [isAddingBank, setIsAddingBank] = useState(false);
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [holderName, setHolderName] = useState(user.name);

  // Security fields
  const [oldPin, setOldPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email, mobile });
    addToast({ type: 'success', title: 'Profile Updated', message: 'Personal details saved successfully' });
  };

  const handleSubmitKyc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!panNumber || !aadhaarNumber) {
      addToast({ type: 'error', title: 'Missing Info', message: 'Please enter PAN and Aadhaar number' });
      return;
    }
    submitKyc(panNumber, aadhaarNumber);
  };

  const handleAddBank = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bankName || !accountNumber || !ifsc) return;
    addBankAccount({
      bankName,
      accountNumber,
      ifsc: ifsc.toUpperCase(),
      holderName,
      isPrimary: bankAccounts.length === 0,
    });
    setIsAddingBank(false);
    setBankName('');
    setAccountNumber('');
    setIfsc('');
  };

  const handleUpdatePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length < 4) {
      addToast({ type: 'error', title: 'Invalid PIN', message: 'PIN must be 4 digits' });
      return;
    }
    addToast({ type: 'success', title: 'Security PIN Updated', message: 'Your transaction PIN has been changed' });
    setOldPin('');
    setNewPin('');
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-6 text-white shadow-xl flex items-center space-x-3">
        <Settings className="h-6 w-6 text-indigo-200" />
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white">Account Settings & Security</h1>
          <p className="text-xs text-indigo-100/80">Manage profile info, KYC compliance, bank accounts, and PIN security</p>
        </div>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex rounded-2xl bg-white p-1 shadow-sm border border-slate-100 dark:bg-slate-800 dark:border-slate-700 max-w-xl">
        {[
          { id: 'profile', label: 'Profile', icon: <User className="h-4 w-4" /> },
          { id: 'kyc', label: 'KYC Verification', icon: <ShieldCheck className="h-4 w-4" /> },
          { id: 'banking', label: 'Bank Accounts', icon: <Building className="h-4 w-4" /> },
          { id: 'security', label: 'Security & PIN', icon: <Lock className="h-4 w-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-2.5 flex items-center justify-center space-x-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
            }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Profile Section */}
      {activeTab === 'profile' && (
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100 dark:bg-slate-800/90 dark:border-slate-700/80 max-w-2xl">
          <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-4">
            Personal Information
          </h2>
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  SPAY Member ID
                </label>
                <input
                  type="text"
                  disabled
                  value={user.inviteCode}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-xs font-mono font-bold text-slate-500 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-3d rounded-2xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-indigo-700 cursor-pointer"
            >
              Save Profile Changes
            </button>
          </form>
        </div>
      )}

      {/* KYC Section */}
      {activeTab === 'kyc' && (
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100 dark:bg-slate-800/90 dark:border-slate-700/80 max-w-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
              Government KYC Verification
            </h2>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 flex items-center space-x-1">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Status: {user.kycStatus}</span>
            </span>
          </div>

          <form onSubmit={handleSubmitKyc} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Permanent Account Number (PAN)
              </label>
              <input
                type="text"
                maxLength={10}
                value={panNumber}
                onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                placeholder="ABCDE1234F"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-mono font-bold uppercase focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Aadhaar Card Number (12 Digits)
              </label>
              <input
                type="text"
                maxLength={12}
                value={aadhaarNumber}
                onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, ''))}
                placeholder="123456789012"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-mono font-bold focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
            </div>

            <button
              type="submit"
              className="btn-3d rounded-2xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-indigo-700 cursor-pointer"
            >
              Submit KYC for Re-Verification
            </button>
          </form>
        </div>
      )}

      {/* Bank Section */}
      {activeTab === 'banking' && (
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100 dark:bg-slate-800/90 dark:border-slate-700/80 max-w-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
              Linked Bank Accounts
            </h2>
            <button
              onClick={() => setIsAddingBank(!isAddingBank)}
              className="flex items-center space-x-1 text-xs font-bold text-indigo-600 hover:underline cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Add New Bank</span>
            </button>
          </div>

          {/* Bank Accounts List */}
          <div className="space-y-3">
            {bankAccounts.map((b) => (
              <div
                key={b.id}
                className="p-4 rounded-2xl border border-slate-100 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/50 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Building className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block">
                      {b.bankName}
                    </span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      A/C: {b.accountNumber} • IFSC: {b.ifsc}
                    </p>
                  </div>
                </div>
                {b.isPrimary && (
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    Primary
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Add Bank Form */}
          {isAddingBank && (
            <form onSubmit={handleAddBank} className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-700">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Bank Name (e.g. ICICI)"
                  required
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none dark:border-slate-700 dark:bg-slate-800"
                />
                <input
                  type="text"
                  placeholder="IFSC Code"
                  required
                  value={ifsc}
                  onChange={(e) => setIfsc(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs uppercase focus:outline-none dark:border-slate-700 dark:bg-slate-800"
                />
              </div>
              <input
                type="text"
                placeholder="Account Number"
                required
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none dark:border-slate-700 dark:bg-slate-800"
              />
              <button
                type="submit"
                className="btn-3d rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-indigo-700 cursor-pointer"
              >
                Save Bank Account
              </button>
            </form>
          )}
        </div>
      )}

      {/* Security Section */}
      {activeTab === 'security' && (
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100 dark:bg-slate-800/90 dark:border-slate-700/80 max-w-2xl space-y-5">
          <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
            Security & Transaction PIN
          </h2>

          <form onSubmit={handleUpdatePin} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Current PIN
                </label>
                <input
                  type="password"
                  maxLength={6}
                  placeholder="••••"
                  value={oldPin}
                  onChange={(e) => setOldPin(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:outline-none dark:border-slate-700 dark:bg-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  New 4-Digit PIN
                </label>
                <input
                  type="password"
                  maxLength={6}
                  placeholder="••••"
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:outline-none dark:border-slate-700 dark:bg-slate-900"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-3d rounded-2xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-indigo-700 cursor-pointer"
            >
              Update Security PIN
            </button>
          </form>

          {/* 2FA Toggle */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block">
                Two-Factor SMS OTP Authentication
              </span>
              <p className="text-[11px] text-slate-400">
                Require OTP for withdrawals and sensitive P2P fund transfers
              </p>
            </div>
            <input
              type="checkbox"
              checked={twoFactorEnabled}
              onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className="h-5 w-5 accent-indigo-600 rounded cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
};
