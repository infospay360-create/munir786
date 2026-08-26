import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Store,
  Wallet,
  TrendingUp,
  Package,
  CheckCircle2,
  XCircle,
  Clock,
  KeyRound,
  PlusCircle,
  Search,
  Filter,
  ArrowUpRight,
  ShieldCheck,
  Phone,
  MapPin,
  RefreshCw,
  Sparkles,
  Building2,
  IndianRupee,
  ShoppingBag,
  Zap,
  ChevronRight,
  Truck,
  AlertCircle,
  Layers,
  Send,
  Eye,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StockType, FranchiseOrderRequest } from '../../types';

export const FranchisePortalView: React.FC = () => {
  const {
    franchises,
    selectedFranchise,
    setSelectedFranchise,
    franchiseStock,
    franchiseOrderRequests,
    stockRefillRequests,
    addFranchiseWalletMoney,
    requestStockRefill,
    companyApproveStockRefill,
    companyRejectStockRefill,
    acceptFranchiseOrder,
    rejectFranchiseOrder,
    verifyAndDeliverOrder,
    products,
    setAppMode,
    setActiveTab,
  } = useApp();

  // Active sub-tabs in Franchise portal
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'orders' | 'stock' | 'company_requests' | 'wallet'>('overview');
  const [stockFilter, setStockFilter] = useState<'all' | 'id_activation' | 'shopping'>('all');
  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | 'pending' | 'accepted' | 'delivered' | 'rejected'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isAddMoneyModalOpen, setIsAddMoneyModalOpen] = useState(false);
  const [addMoneyAmount, setAddMoneyAmount] = useState('10000');
  const [addMoneyMethod, setAddMoneyMethod] = useState('Instant Bank UPI / NetBanking');

  const [isOrderStockModalOpen, setIsOrderStockModalOpen] = useState(false);
  const [refillStockType, setRefillStockType] = useState<StockType>('shopping');
  const [selectedStockItems, setSelectedStockItems] = useState<{ [productId: string]: number }>({});

  const [isVerifyOtpModalOpen, setIsVerifyOtpModalOpen] = useState(false);
  const [selectedOrderForOtp, setSelectedOrderForOtp] = useState<FranchiseOrderRequest | null>(null);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [orderToReject, setOrderToReject] = useState<FranchiseOrderRequest | null>(null);
  const [rejectReason, setRejectReason] = useState('Out of stock currently');

  // Filtered lists
  const filteredStock = franchiseStock.filter((stk) => {
    if (stockFilter !== 'all' && stk.stockType !== stockFilter) return false;
    if (searchQuery && !stk.productName.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const filteredOrders = franchiseOrderRequests.filter((req) => {
    if (orderStatusFilter !== 'all' && req.status !== orderStatusFilter) return false;
    if (
      searchQuery &&
      !req.orderCode.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !req.userName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !req.productName.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  // Calculate live stats
  const pendingCount = franchiseOrderRequests.filter((r) => r.status === 'pending').length;
  const acceptedCount = franchiseOrderRequests.filter((r) => r.status === 'accepted').length;
  const deliveredCount = franchiseOrderRequests.filter((r) => r.status === 'delivered').length;

  // Handle Add Money Submit
  const handleAddMoneySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(addMoneyAmount);
    if (isNaN(amt) || amt <= 0) return;
    await addFranchiseWalletMoney(amt, addMoneyMethod);
    setIsAddMoneyModalOpen(false);
  };

  // Handle Order Stock from Company Submit
  const handleOrderStockSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const itemsToRequest = Object.entries(selectedStockItems)
      .filter(([_, qty]) => Number(qty) > 0)
      .map(([prodId, qty]) => {
        const quantity = Number(qty);
        const prod = products.find((p) => p.id === prodId) || {
          name: prodId,
          price: refillStockType === 'id_activation' ? 999 : 2999,
        };
        const wholesaleUnitPrice = Math.round(prod.price * 0.7); // 30% wholesale discount from company
        return {
          productId: prodId,
          name: prod.name,
          qty: quantity,
          unitPrice: wholesaleUnitPrice,
          total: wholesaleUnitPrice * quantity,
        };
      });

    if (itemsToRequest.length === 0) return;

    await requestStockRefill(refillStockType, itemsToRequest);
    setSelectedStockItems({});
    setIsOrderStockModalOpen(false);
    setActiveSubTab('company_requests');
  };

  // Handle OTP verification
  const handleVerifyOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderForOtp) return;
    setIsVerifying(true);
    setOtpError('');

    const res = await verifyAndDeliverOrder(selectedOrderForOtp.id, enteredOtp);
    setIsVerifying(false);

    if (res.success) {
      setIsVerifyOtpModalOpen(false);
      setEnteredOtp('');
      setSelectedOrderForOtp(null);
    } else {
      setOtpError(res.message);
    }
  };

  // Handle Reject Order
  const handleConfirmReject = async () => {
    if (!orderToReject) return;
    await rejectFranchiseOrder(orderToReject.id, rejectReason);
    setIsRejectModalOpen(false);
    setOrderToReject(null);
  };

  return (
    <div id="franchise-portal-container" className="space-y-6 pb-12">
      {/* Top Banner & Franchise Profile Info */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 p-6 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-inner">
              <Store className="h-8 w-8 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight text-white">{selectedFranchise.name}</h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-0.5 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {selectedFranchise.status}
                </span>
                <span className="rounded-full bg-indigo-500/30 px-2.5 py-0.5 text-xs font-medium text-indigo-200 border border-indigo-400/30">
                  ID: {selectedFranchise.userId}
                </span>
              </div>
              <div className="mt-1.5 flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-indigo-200">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-amber-400" />
                  {selectedFranchise.address}, PIN: {selectedFranchise.pincode}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5 text-emerald-400" />
                  {selectedFranchise.mobile}
                </span>
                <span className="flex items-center gap-1 text-amber-300">
                  ★ {selectedFranchise.rating} / 5.0 Rating
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              id="topup-franchise-wallet-btn"
              onClick={() => setIsAddMoneyModalOpen(true)}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-900/30 hover:from-emerald-500 hover:to-teal-500 transition active:scale-95"
            >
              <PlusCircle className="h-4 w-4" />
              Add Franchise Wallet
            </button>
            <button
              id="order-company-stock-btn"
              onClick={() => setIsOrderStockModalOpen(true)}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-900/30 hover:from-indigo-500 hover:to-purple-500 transition active:scale-95"
            >
              <Package className="h-4 w-4" />
              Order Stock from Company
            </button>
            <button
              id="switch-to-user-app-btn"
              onClick={() => {
                setAppMode('user');
                setActiveTab('dashboard');
              }}
              className="flex items-center gap-1.5 rounded-xl bg-white/10 px-3.5 py-2 text-xs font-medium text-white backdrop-blur-md border border-white/20 hover:bg-white/20 transition"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Switch to User View
            </button>
          </div>
        </div>

        {/* Ambient decorative lighting */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-10 -bottom-10 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl" />
      </div>

      {/* Top 4 Stat Cards Matching the UI Blueprint */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Available Wallet */}
        <div className="relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm border border-slate-100 dark:bg-slate-900 dark:border-slate-800 transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Available Wallet</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
              <Wallet className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              ₹{selectedFranchise.franchiseWallet.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </div>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">Auto-deducted on Stock Approval</span>
              <button
                onClick={() => setIsAddMoneyModalOpen(true)}
                className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-0.5"
              >
                Top-up <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Card 2: Today Earnings */}
        <div className="relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm border border-slate-100 dark:bg-slate-900 dark:border-slate-800 transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Today Earnings</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              ₹{selectedFranchise.todayEarnings.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Orders Completed: <strong className="text-indigo-600 dark:text-indigo-400 font-bold">{selectedFranchise.todayOrdersCompleted}</strong></span>
              <span className="inline-flex items-center gap-0.5 text-emerald-600 font-semibold">
                5% Comm.
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Monthly Earnings */}
        <div className="relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm border border-slate-100 dark:bg-slate-900 dark:border-slate-800 transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Monthly Earnings</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400">
              <IndianRupee className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              ₹{selectedFranchise.monthlyEarnings.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Orders Completed: <strong className="text-purple-600 dark:text-purple-400 font-bold">{selectedFranchise.monthlyOrdersCompleted}</strong></span>
              <span className="text-slate-400">Current Month</span>
            </div>
          </div>
        </div>

        {/* Card 4: Total Stock Value */}
        <div className="relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm border border-slate-100 dark:bg-slate-900 dark:border-slate-800 transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Stock Value</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400">
              <Package className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              ₹{selectedFranchise.totalStockValue.toLocaleString('en-IN')}
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Pending Orders: <strong className="text-amber-600 font-bold">{pendingCount}</strong></span>
              <button
                onClick={() => {
                  setActiveSubTab('stock');
                }}
                className="text-amber-600 dark:text-amber-400 font-semibold hover:underline"
              >
                View Inventory →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl overflow-x-auto">
          <button
            onClick={() => setActiveSubTab('overview')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition ${
              activeSubTab === 'overview'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Store className="h-4 w-4" />
            Dashboard Overview
          </button>
          <button
            onClick={() => setActiveSubTab('orders')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition ${
              activeSubTab === 'orders'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Truck className="h-4 w-4" />
            Order Requests
            {pendingCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                {pendingCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveSubTab('stock')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition ${
              activeSubTab === 'stock'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="h-4 w-4" />
            Stock (ID Activation & Shopping)
          </button>
          <button
            onClick={() => setActiveSubTab('company_requests')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition ${
              activeSubTab === 'company_requests'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Building2 className="h-4 w-4" />
            Company Stock Approval Flow
            {stockRefillRequests.filter((r) => r.status === 'Pending Company Approval').length > 0 && (
              <span className="flex h-2 w-2 rounded-full bg-amber-500" />
            )}
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search orders, products, codes..."
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 pl-9 pr-4 py-1.5 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {/* SUBTAB 1: OVERVIEW & LIVE ORDERS */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6">
          {/* Quick Action & Workflow Banner */}
          <div className="rounded-2xl border border-indigo-100 dark:border-indigo-900/40 bg-gradient-to-br from-indigo-50/70 via-purple-50/40 to-slate-50 dark:from-indigo-950/20 dark:via-purple-950/20 dark:to-slate-900 p-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-xs">
                    5%
                  </span>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    Automatic 5% Commission on Verified Deliveries
                  </h2>
                </div>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 max-w-2xl">
                  When a customer orders from your franchise, you accept the request. Upon handover, enter the customer's
                  <strong> 4-digit Delivery Verification Code</strong>. 5% commission is credited instantly into your Franchise Wallet!
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveSubTab('orders')}
                  className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-indigo-500 transition"
                >
                  <Clock className="h-3.5 w-3.5" />
                  View Pending Orders ({pendingCount})
                </button>
                <button
                  onClick={() => setIsOrderStockModalOpen(true)}
                  className="flex items-center gap-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition"
                >
                  <Package className="h-3.5 w-3.5 text-indigo-500" />
                  Refill Inventory
                </button>
              </div>
            </div>
          </div>

          {/* Real-time Order Requests Table (Matching Screenshot) */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  Recent Order Requests & Deliveries
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Accept/reject requests and complete OTP deliveries to unlock instant commission.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setOrderStatusFilter('all')}
                  className={`rounded-lg px-2.5 py-1 text-xs font-medium ${
                    orderStatusFilter === 'all'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  All ({franchiseOrderRequests.length})
                </button>
                <button
                  onClick={() => setOrderStatusFilter('pending')}
                  className={`rounded-lg px-2.5 py-1 text-xs font-medium ${
                    orderStatusFilter === 'pending'
                      ? 'bg-amber-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  Pending ({pendingCount})
                </button>
                <button
                  onClick={() => setOrderStatusFilter('delivered')}
                  className={`rounded-lg px-2.5 py-1 text-xs font-medium ${
                    orderStatusFilter === 'delivered'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  Delivered ({deliveredCount})
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 font-semibold">
                  <tr>
                    <th className="px-4 py-3">Order & Product Code</th>
                    <th className="px-4 py-3">Customer Details</th>
                    <th className="px-4 py-3">Product Name & Type</th>
                    <th className="px-4 py-3">Qty & Price</th>
                    <th className="px-4 py-3">5% Commission</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                        No orders matching the current filter.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((req) => (
                      <tr key={req.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition">
                        <td className="px-4 py-3 font-medium">
                          <div className="font-bold text-indigo-600 dark:text-indigo-400">{req.orderCode}</div>
                          <div className="text-[11px] font-mono text-slate-400">{req.productCode}</div>
                          <div className="text-[10px] text-slate-400">{req.createdAt}</div>
                        </td>

                        <td className="px-4 py-3">
                          <div className="font-semibold text-slate-900 dark:text-white">{req.userName}</div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-slate-400" />
                            {req.userLocation}
                          </div>
                          <div className="text-[11px] text-slate-400">{req.userMobile}</div>
                        </td>

                        <td className="px-4 py-3">
                          <div className="font-semibold text-slate-900 dark:text-white">{req.productName}</div>
                          <span
                            className={`inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold mt-1 ${
                              req.stockType === 'id_activation'
                                ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300'
                                : 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                            }`}
                          >
                            {req.stockType === 'id_activation' ? 'ID Activation' : 'Shopping Stock'}
                          </span>
                        </td>

                        <td className="px-4 py-3">
                          <div className="font-bold text-slate-900 dark:text-white">
                            ₹{req.totalAmount.toLocaleString('en-IN')}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            Qty: {req.quantity} × ₹{req.unitPrice}
                          </div>
                        </td>

                        <td className="px-4 py-3">
                          <div className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <Sparkles className="h-3 w-3" />
                            +₹{req.commissionEarned.toFixed(2)}
                          </div>
                          <div className="text-[10px] text-slate-400">Direct to wallet</div>
                        </td>

                        <td className="px-4 py-3">
                          {req.status === 'pending' && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
                              <Clock className="h-3 w-3" />
                              Pending Approval
                            </span>
                          )}
                          {req.status === 'accepted' && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-1 text-[11px] font-semibold text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                              <Truck className="h-3 w-3" />
                              Ready for Delivery
                            </span>
                          )}
                          {req.status === 'delivered' && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                              <CheckCircle2 className="h-3 w-3" />
                              Delivered & Paid
                            </span>
                          )}
                          {req.status === 'rejected' && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2.5 py-1 text-[11px] font-semibold text-rose-700 dark:bg-rose-950/50 dark:text-rose-300">
                              <XCircle className="h-3 w-3" />
                              Rejected
                            </span>
                          )}
                        </td>

                        <td className="px-4 py-3 text-right">
                          {req.status === 'pending' && (
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => acceptFranchiseOrder(req.id)}
                                className="flex items-center gap-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1.5 text-xs font-semibold shadow-sm transition"
                              >
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                Accept
                              </button>
                              <button
                                onClick={() => {
                                  setOrderToReject(req);
                                  setIsRejectModalOpen(true);
                                }}
                                className="flex items-center gap-1 rounded-lg bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 hover:bg-rose-100 px-2.5 py-1.5 text-xs font-semibold transition"
                              >
                                <XCircle className="h-3.5 w-3.5" />
                                Reject
                              </button>
                            </div>
                          )}

                          {req.status === 'accepted' && (
                            <button
                              onClick={() => {
                                setSelectedOrderForOtp(req);
                                setEnteredOtp('');
                                setOtpError('');
                                setIsVerifyOtpModalOpen(true);
                              }}
                              className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-3 py-1.5 text-xs font-semibold shadow-md transition ml-auto"
                            >
                              <KeyRound className="h-3.5 w-3.5" />
                              Enter Delivery OTP
                            </button>
                          )}

                          {req.status === 'delivered' && (
                            <span className="text-[11px] text-slate-400 flex items-center justify-end gap-1">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                              Completed
                            </span>
                          )}

                          {req.status === 'rejected' && (
                            <span className="text-[11px] text-rose-500">
                              Forwarded to other hub
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Inventory Snapshot Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ID Activation Stock Box */}
            <div className="rounded-2xl bg-white dark:bg-slate-900 p-5 shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-300">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">ID Activation Stock</h4>
                    <p className="text-[11px] text-slate-500">For new member activations & starter packs</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setRefillStockType('id_activation');
                    setIsOrderStockModalOpen(true);
                  }}
                  className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline"
                >
                  + Refill
                </button>
              </div>

              <div className="space-y-2.5">
                {franchiseStock
                  .filter((s) => s.stockType === 'id_activation')
                  .map((stk) => (
                    <div
                      key={stk.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs"
                    >
                      <div>
                        <div className="font-semibold text-slate-800 dark:text-slate-200">{stk.productName}</div>
                        <div className="text-[11px] text-slate-400">Unit Price: ₹{stk.unitPrice}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-black text-purple-600 dark:text-purple-400 text-sm">
                          {stk.availableStock} Available
                        </div>
                        <div className="text-[10px] text-slate-400">Sold: {stk.soldQty}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Shopping Stock Box */}
            <div className="rounded-2xl bg-white dark:bg-slate-900 p-5 shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300">
                    <ShoppingBag className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Shopping Stock</h4>
                    <p className="text-[11px] text-slate-500">For retail orders, wellness & utility items</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setRefillStockType('shopping');
                    setIsOrderStockModalOpen(true);
                  }}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  + Refill
                </button>
              </div>

              <div className="space-y-2.5">
                {franchiseStock
                  .filter((s) => s.stockType === 'shopping')
                  .slice(0, 3)
                  .map((stk) => (
                    <div
                      key={stk.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs"
                    >
                      <div>
                        <div className="font-semibold text-slate-800 dark:text-slate-200">{stk.productName}</div>
                        <div className="text-[11px] text-slate-400">Unit Price: ₹{stk.unitPrice}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-black text-blue-600 dark:text-blue-400 text-sm">
                          {stk.availableStock} Available
                        </div>
                        <div className="text-[10px] text-slate-400">Sold: {stk.soldQty}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: FULL STOCK MANAGEMENT (Matching specs for 2 types of stock) */}
      {activeSubTab === 'stock' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Franchise Inventory & Stock Levels</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Manage both ID Activation Stock and Shopping Stock inventory.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 text-xs">
                <button
                  onClick={() => setStockFilter('all')}
                  className={`rounded-lg px-3 py-1.5 font-medium ${
                    stockFilter === 'all'
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 font-bold shadow-sm'
                      : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  All Items
                </button>
                <button
                  onClick={() => setStockFilter('id_activation')}
                  className={`rounded-lg px-3 py-1.5 font-medium ${
                    stockFilter === 'id_activation'
                      ? 'bg-purple-600 text-white font-bold shadow-sm'
                      : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  ⚡ ID Activation Stock
                </button>
                <button
                  onClick={() => setStockFilter('shopping')}
                  className={`rounded-lg px-3 py-1.5 font-medium ${
                    stockFilter === 'shopping'
                      ? 'bg-blue-600 text-white font-bold shadow-sm'
                      : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  🛍️ Shopping Stock
                </button>
              </div>

              <button
                onClick={() => setIsOrderStockModalOpen(true)}
                className="flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 text-xs font-semibold shadow-sm transition"
              >
                <Package className="h-4 w-4" />
                Request Stock
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStock.map((stk) => (
              <div
                key={stk.id}
                className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-5 shadow-sm border border-slate-100 dark:border-slate-800 transition hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                      stk.stockType === 'id_activation'
                        ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                    }`}
                  >
                    {stk.stockType === 'id_activation' ? 'ID Activation Stock' : 'Shopping Stock'}
                  </span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    ₹{stk.unitPrice.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="mt-3">
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">{stk.productName}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{stk.category}</p>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3 text-center text-xs">
                  <div>
                    <div className="text-[10px] text-slate-400">Total Stock</div>
                    <div className="font-bold text-slate-700 dark:text-slate-200 mt-0.5">{stk.totalStock}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">Sold Qty</div>
                    <div className="font-bold text-slate-700 dark:text-slate-200 mt-0.5">{stk.soldQty}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">Available</div>
                    <div
                      className={`font-black mt-0.5 ${
                        stk.availableStock < 20
                          ? 'text-rose-600 dark:text-rose-400'
                          : 'text-emerald-600 dark:text-emerald-400'
                      }`}
                    >
                      {stk.availableStock}
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">Total Revenue:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    ₹{stk.totalSalesAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 3: ORDER REQUESTS DETAILED */}
      {activeSubTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Franchise Customer Orders</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Customers choose your franchise at checkout. Manage handover and verify the Delivery Code.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setOrderStatusFilter('all')}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                  orderStatusFilter === 'all'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                All Orders ({franchiseOrderRequests.length})
              </button>
              <button
                onClick={() => setOrderStatusFilter('pending')}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                  orderStatusFilter === 'pending'
                    ? 'bg-amber-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                Pending ({pendingCount})
              </button>
              <button
                onClick={() => setOrderStatusFilter('accepted')}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                  orderStatusFilter === 'accepted'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                Accepted ({acceptedCount})
              </button>
              <button
                onClick={() => setOrderStatusFilter('delivered')}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                  orderStatusFilter === 'delivered'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                Delivered ({deliveredCount})
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredOrders.map((req) => (
              <div
                key={req.id}
                className="rounded-2xl bg-white dark:bg-slate-900 p-5 shadow-sm border border-slate-100 dark:border-slate-800 space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-indigo-600 dark:text-indigo-400 text-sm">{req.orderCode}</span>
                      <span className="text-xs font-mono text-slate-400">({req.productCode})</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{req.createdAt}</div>
                  </div>

                  {req.status === 'pending' && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                      <Clock className="h-3.5 w-3.5" />
                      Pending Approval
                    </span>
                  )}
                  {req.status === 'accepted' && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800 dark:bg-blue-950/60 dark:text-blue-300">
                      <Truck className="h-3.5 w-3.5" />
                      Accepted (Awaiting Delivery)
                    </span>
                  )}
                  {req.status === 'delivered' && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Delivered
                    </span>
                  )}
                  {req.status === 'rejected' && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-800 dark:bg-rose-950/60 dark:text-rose-300">
                      <XCircle className="h-3.5 w-3.5" />
                      Rejected
                    </span>
                  )}
                </div>

                {/* Customer Details Box */}
                <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3 text-xs space-y-1">
                  <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                    <span>{req.userName} ({req.userId})</span>
                    <span className="text-slate-500 font-normal">{req.userMobile}</span>
                  </div>
                  <div className="text-slate-500 flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    {req.userLocation} (PIN: {req.pincode})
                  </div>
                </div>

                {/* Product Summary */}
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">{req.productName}</div>
                    <div className="text-slate-500">
                      Qty: {req.quantity} × ₹{req.unitPrice} | Total: <strong>₹{req.totalAmount.toLocaleString('en-IN')}</strong>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400">5% Franchise Comm.</div>
                    <div className="font-black text-emerald-600 dark:text-emerald-400 text-sm">
                      +₹{req.commissionEarned.toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  {req.status === 'pending' && (
                    <>
                      <button
                        onClick={() => {
                          setOrderToReject(req);
                          setIsRejectModalOpen(true);
                        }}
                        className="rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 hover:bg-rose-100 px-4 py-2 text-xs font-semibold transition"
                      >
                        Reject Order
                      </button>
                      <button
                        onClick={() => acceptFranchiseOrder(req.id)}
                        className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 text-xs font-semibold shadow-sm transition"
                      >
                        Accept & Prepare Delivery
                      </button>
                    </>
                  )}

                  {req.status === 'accepted' && (
                    <button
                      onClick={() => {
                        setSelectedOrderForOtp(req);
                        setEnteredOtp('');
                        setOtpError('');
                        setIsVerifyOtpModalOpen(true);
                      }}
                      className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white py-2.5 text-xs font-bold shadow-md transition flex items-center justify-center gap-2"
                    >
                      <KeyRound className="h-4 w-4" />
                      Enter User Delivery Verification Code (OTP)
                    </button>
                  )}

                  {req.status === 'delivered' && (
                    <div className="w-full flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-xl font-semibold">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4" /> Delivered on {req.deliveredAt}
                      </span>
                      <span>₹{req.commissionEarned.toFixed(2)} Credited</span>
                    </div>
                  )}

                  {req.status === 'rejected' && (
                    <div className="w-full text-xs text-slate-500 bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl">
                      Order was rejected. The customer can reassign this same code to another franchise.
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 4: COMPANY STOCK APPROVAL FLOW (Requirement #1) */}
      {activeSubTab === 'company_requests' && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-indigo-600" />
                  Company Stock Dispatch & Wallet Auto-Deduction Engine
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  1. Franchise submits Stock Order → 2. Request reaches SPAY360 Central Company → 3. Company accepts →
                  Amount is automatically deducted from Franchise Wallet → 4. Stock added to Franchise Available Stock!
                </p>
              </div>

              <button
                onClick={() => setIsOrderStockModalOpen(true)}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 text-xs font-semibold shadow transition"
              >
                <PlusCircle className="h-4 w-4" />
                New Stock Request
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {stockRefillRequests.map((req) => (
                <div
                  key={req.id}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5 bg-slate-50/50 dark:bg-slate-800/30 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white text-sm">{req.id}</span>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                            req.stockType === 'id_activation'
                              ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
                              : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                          }`}
                        >
                          {req.stockType === 'id_activation' ? 'ID Activation Stock' : 'Shopping Stock'}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">Requested on: {req.requestedAt}</div>
                    </div>

                    <div>
                      {req.status === 'Pending Company Approval' && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                          <Clock className="h-3.5 w-3.5" />
                          Pending Company Approval
                        </span>
                      )}
                      {req.status === 'Approved & Stock Added' && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Approved & Stock Added (Wallet Deducted)
                        </span>
                      )}
                      {req.status === 'Rejected' && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-800 dark:bg-rose-950/60 dark:text-rose-300">
                          <XCircle className="h-3.5 w-3.5" />
                          Rejected
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Item breakdown */}
                  <div className="rounded-xl bg-white dark:bg-slate-900 p-3 border border-slate-100 dark:border-slate-800">
                    <div className="text-xs font-semibold text-slate-500 mb-2">Requested Products:</div>
                    <div className="space-y-1.5">
                      {req.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <span className="font-medium text-slate-800 dark:text-slate-200">{item.name}</span>
                          <span className="text-slate-500">
                            {item.qty} units × ₹{item.unitPrice} = <strong>₹{item.total.toLocaleString('en-IN')}</strong>
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold">
                      <span>Total Refill Amount to be Deducted:</span>
                      <span className="text-indigo-600 dark:text-indigo-400 text-sm">
                        ₹{req.totalAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Company Simulation Controls (Allows user to test the approval flow) */}
                  {req.status === 'Pending Company Approval' && (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 bg-indigo-50/50 dark:bg-indigo-950/30 p-3 rounded-xl border border-indigo-100 dark:border-indigo-900/30">
                      <div className="text-xs text-indigo-900 dark:text-indigo-200">
                        <strong>Simulate Company Action:</strong> Company Admin can approve dispatch or reject.
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => companyRejectStockRefill(req.id)}
                          className="rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 hover:bg-rose-100 px-3 py-1.5 text-xs font-semibold transition"
                        >
                          Company Reject
                        </button>
                        <button
                          onClick={() => companyApproveStockRefill(req.id)}
                          className="rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 text-xs font-bold shadow-sm transition flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Company Approve (Auto-Deduct Wallet & Add Stock)
                        </button>
                      </div>
                    </div>
                  )}

                  {req.adminRemarks && (
                    <div className="text-[11px] text-slate-500 italic">
                      Note: {req.adminRemarks}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL 1: ADD MONEY TO FRANCHISE WALLET ================= */}
      <AnimatePresence>
        {isAddMoneyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-100 dark:border-slate-800"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                    <Wallet className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Add Franchise Wallet Balance</h3>
                    <p className="text-[11px] text-slate-500">{selectedFranchise.name} ({selectedFranchise.userId})</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAddMoneyModalOpen(false)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <XCircle className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleAddMoneySubmit} className="mt-4 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Enter Top-up Amount (₹)
                  </label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">₹</span>
                    <input
                      type="number"
                      required
                      min="500"
                      step="500"
                      value={addMoneyAmount}
                      onChange={(e) => setAddMoneyAmount(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-8 pr-4 py-2 text-sm font-bold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div className="mt-2 flex gap-2">
                    {['5000', '10000', '25000', '50000'].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setAddMoneyAmount(preset)}
                        className="rounded-lg bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-emerald-50 hover:text-emerald-600"
                      >
                        +₹{parseInt(preset).toLocaleString('en-IN')}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Payment Channel</label>
                  <select
                    value={addMoneyMethod}
                    onChange={(e) => setAddMoneyMethod(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option>Instant Bank UPI / QR Code</option>
                    <option>NetBanking (Corporate / Current Account)</option>
                    <option>RTGS / NEFT Direct Bank Transfer</option>
                    <option>Main Company Payout Wallet Swap</option>
                  </select>
                </div>

                <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-3 text-xs text-emerald-800 dark:text-emerald-300">
                  💡 This wallet balance will be used to automatically purchase and accept stock orders from the Central Company.
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddMoneyModalOpen(false)}
                    className="w-1/2 rounded-xl bg-slate-100 dark:bg-slate-800 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 py-2.5 text-xs font-bold text-white shadow hover:from-emerald-500 hover:to-teal-500"
                  >
                    Confirm Top-up
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= MODAL 2: ORDER STOCK FROM COMPANY (Requirement #1 & #2) ================= */}
      <AnimatePresence>
        {isOrderStockModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-100 dark:border-slate-800 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                    <Package className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Order Stock from Company</h3>
                    <p className="text-[11px] text-slate-500">Auto-deducted from wallet on Company approval</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOrderStockModalOpen(false)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <XCircle className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleOrderStockSubmit} className="mt-4 space-y-4">
                {/* Stock Type Selector (ID Activation vs Shopping) */}
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Select Stock Category (2 Stock Types)
                  </label>
                  <div className="mt-1.5 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setRefillStockType('id_activation')}
                      className={`p-3 rounded-xl text-left border transition ${
                        refillStockType === 'id_activation'
                          ? 'border-purple-600 bg-purple-50/50 dark:bg-purple-950/30 text-purple-900 dark:text-purple-200 font-bold'
                          : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-purple-600" />
                        <span className="text-xs">ID Activation Stock</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1 font-normal">
                        Starter Kits & Activation Kits
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRefillStockType('shopping')}
                      className={`p-3 rounded-xl text-left border transition ${
                        refillStockType === 'shopping'
                          ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 text-blue-900 dark:text-blue-200 font-bold'
                          : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="h-4 w-4 text-blue-600" />
                        <span className="text-xs">Shopping Stock</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1 font-normal">
                        Retail Products & Wellness
                      </div>
                    </button>
                  </div>
                </div>

                {/* Available Products to Refill */}
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Select Products and Required Quantities
                  </label>
                  <div className="mt-2 space-y-2.5 max-h-60 overflow-y-auto pr-1">
                    {franchiseStock
                      .filter((s) => s.stockType === refillStockType)
                      .map((stk) => {
                        const qty = selectedStockItems[stk.productId] || 0;
                        const wholesaleRate = Math.round(stk.unitPrice * 0.7);
                        return (
                          <div
                            key={stk.id}
                            className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700 text-xs"
                          >
                            <div>
                              <div className="font-bold text-slate-900 dark:text-white">{stk.productName}</div>
                              <div className="text-slate-400 text-[11px]">
                                Wholesale: ₹{wholesaleRate} | Current Available: {stk.availableStock}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  setSelectedStockItems((prev) => ({
                                    ...prev,
                                    [stk.productId]: Math.max(0, (prev[stk.productId] || 0) - 5),
                                  }))
                                }
                                className="h-7 w-7 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-700 dark:text-slate-200"
                              >
                                -
                              </button>
                              <span className="w-8 text-center font-bold text-indigo-600 dark:text-indigo-400 text-sm">
                                {qty}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  setSelectedStockItems((prev) => ({
                                    ...prev,
                                    [stk.productId]: (prev[stk.productId] || 0) + 5,
                                  }))
                                }
                                className="h-7 w-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold shadow"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Info Note */}
                <div className="rounded-xl bg-indigo-50 dark:bg-indigo-950/40 p-3 text-xs text-indigo-900 dark:text-indigo-300">
                  📌 <strong>Process Rule:</strong> When the Company Admin approves this request, the required amount
                  will automatically be deducted from your Franchise Wallet (Current: ₹
                  {selectedFranchise.franchiseWallet.toLocaleString('en-IN')}) and the stock will appear in your Available
                  Stock.
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsOrderStockModalOpen(false)}
                    className="w-1/2 rounded-xl bg-slate-100 dark:bg-slate-800 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={Object.values(selectedStockItems).every((v) => v === 0)}
                    className="w-1/2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-2.5 text-xs font-bold text-white shadow hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50"
                  >
                    Send Request to Company
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= MODAL 3: DELIVERY OTP VERIFICATION (Requirement #5) ================= */}
      <AnimatePresence>
        {isVerifyOtpModalOpen && selectedOrderForOtp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-100 dark:border-slate-800"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400">
                    <KeyRound className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Delivery Verification Code</h3>
                    <p className="text-[11px] text-slate-500">{selectedOrderForOtp.orderCode} - {selectedOrderForOtp.userName}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsVerifyOtpModalOpen(false)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <XCircle className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleVerifyOtpSubmit} className="mt-4 space-y-4">
                <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Customer:</span>
                    <span className="font-bold text-slate-800 dark:text-white">{selectedOrderForOtp.userName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Product:</span>
                    <span className="font-bold text-slate-800 dark:text-white">{selectedOrderForOtp.productName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Value:</span>
                    <span className="font-bold text-slate-800 dark:text-white">₹{selectedOrderForOtp.totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold pt-1 border-t border-slate-200 dark:border-slate-700">
                    <span>5% Commission to Earn:</span>
                    <span>+₹{selectedOrderForOtp.commissionEarned.toFixed(2)}</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Enter Customer's 4-Digit Verification Code
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="Enter Code (e.g. 7845)"
                    value={enteredOtp}
                    onChange={(e) => setEnteredOtp(e.target.value)}
                    className="mt-1.5 w-full text-center tracking-widest text-xl font-mono font-black rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none"
                  />
                  {otpError && (
                    <p className="mt-1.5 text-xs font-medium text-rose-600 flex items-center gap-1">
                      <AlertCircle className="h-3.5 w-3.5" />
                      {otpError}
                    </p>
                  )}
                  <p className="mt-1.5 text-[11px] text-slate-400 text-center">
                    (Customer's code for this order demo: <strong className="text-indigo-600">{selectedOrderForOtp.deliveryOtp}</strong>)
                  </p>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsVerifyOtpModalOpen(false)}
                    className="w-1/2 rounded-xl bg-slate-100 dark:bg-slate-800 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isVerifying || !enteredOtp}
                    className="w-1/2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 py-2.5 text-xs font-bold text-white shadow hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50"
                  >
                    {isVerifying ? 'Verifying...' : 'Verify & Credit 5%'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= MODAL 4: REJECT ORDER WITH REASON (Requirement #6) ================= */}
      <AnimatePresence>
        {isRejectModalOpen && orderToReject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-100 dark:border-slate-800"
            >
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800 text-rose-600">
                <AlertCircle className="h-5 w-5" />
                <h3 className="font-bold text-slate-900 dark:text-white">Reject Order Request</h3>
              </div>

              <div className="mt-4 space-y-3">
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Are you sure you want to reject order <strong>{orderToReject.orderCode}</strong> for {orderToReject.userName}?
                </p>
                <div className="rounded-xl bg-amber-50 dark:bg-amber-950/40 p-3 text-xs text-amber-800 dark:text-amber-300">
                  💡 <strong>Rule #6:</strong> The user's order & product code will remain valid. The user can forward this same order to another nearby franchise.
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Rejection Reason</label>
                  <select
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option>Product currently out of stock</option>
                    <option>Delivery location out of reach</option>
                    <option>Franchise closed for maintenance</option>
                    <option>Quantity not immediately available</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 mt-5">
                <button
                  type="button"
                  onClick={() => setIsRejectModalOpen(false)}
                  className="w-1/2 rounded-xl bg-slate-100 dark:bg-slate-800 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmReject}
                  className="w-1/2 rounded-xl bg-rose-600 hover:bg-rose-500 py-2.5 text-xs font-bold text-white shadow"
                >
                  Confirm Reject
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
