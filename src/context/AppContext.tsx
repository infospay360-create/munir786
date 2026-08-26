import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  UserProfile,
  Transaction,
  TeamMember,
  LevelIncomeData,
  RoyaltyRank,
  PackageItem,
  SupportTicket,
  NotificationItem,
  ProductItem,
  CartItem,
  OrderItem,
  BankAccount,
  KycRecord,
  TransactionType,
} from '../types';
import {
  initialUser,
  initialTransactions,
  mockTeamMembers,
  mockLevelIncome,
  mockRoyaltyRanks,
  mockPackages,
  mockProducts,
  mockBankAccounts,
  mockKyc,
  mockTickets,
  mockNotifications,
} from '../data/mockData';

export type ActiveTab =
  | 'dashboard'
  | 'recharge'
  | 'add_money'
  | 'withdraw_fund'
  | 'passbook'
  | 'money_transfer'
  | 'fund_history'
  | 'support_ticket'
  | 'my_team'
  | 'genealogy'
  | 'level_income'
  | 'repurchase_mall'
  | 'royalty_ranks'
  | 'packages'
  | 'earnings_analytics'
  | 'reports'
  | 'settings'
  | 'admin_panel'
  | 'franchise_portal'
  | 'kyc_portal';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}

interface AppContextType {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  transactions: Transaction[];
  teamMembers: TeamMember[];
  levelIncome: LevelIncomeData[];
  royaltyRanks: RoyaltyRank[];
  packages: PackageItem[];
  products: ProductItem[];
  cart: CartItem[];
  orders: OrderItem[];
  bankAccounts: BankAccount[];
  kyc: KycRecord;
  tickets: SupportTicket[];
  notifications: NotificationItem[];
  unreadNotifsCount: number;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  language: string;
  setLanguage: (lang: string) => void;
  // Modal controls
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isNotifOpen: boolean;
  setIsNotifOpen: (open: boolean) => void;
  isShareOpen: boolean;
  setIsShareOpen: (open: boolean) => void;
  selectedTransactionForReceipt: Transaction | null;
  setSelectedTransactionForReceipt: (txn: Transaction | null) => void;
  activeUtilityServiceModal: string | null;
  setActiveUtilityServiceModal: (service: string | null) => void;
  // Auth state
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  // Actions
  triggerConfetti: () => void;
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
  // Core financial operations
  processRechargeOrBill: (params: {
    serviceType: TransactionType;
    title: string;
    operator: string;
    customerNumber: string;
    amount: number;
    cashbackEarned: number;
    details: string;
    extraReceiptData?: Record<string, any>;
  }) => Promise<{ success: boolean; txn?: Transaction; error?: string }>;
  processAddMoney: (amount: number, method: string, ref?: string) => Promise<boolean>;
  processWithdrawal: (amount: number, bankId: string, upi?: string) => Promise<boolean>;
  processP2PTransfer: (recipientId: string, amount: number, pin: string, remarks?: string) => Promise<boolean>;
  upgradePackage: (pkg: PackageItem) => Promise<boolean>;
  addToCart: (product: ProductItem, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  placeOrder: (shippingAddress: string, paymentMethod: string) => Promise<boolean>;
  createTicket: (category: SupportTicket['category'], priority: SupportTicket['priority'], subject: string, message: string) => void;
  addTicketReply: (ticketId: string, message: string, sender?: 'user' | 'admin') => void;
  submitKyc: (data: Partial<KycRecord>) => void;
  addBankAccount: (bank: Omit<BankAccount, 'id' | 'isVerified'>) => void;
  markNotifAsRead: (id: string) => void;
  markAllNotifsAsRead: () => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('spay360_user');
    return saved ? JSON.parse(saved) : initialUser;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('spay360_transactions');
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  const [teamMembers] = useState<TeamMember[]>(mockTeamMembers);
  const [levelIncome] = useState<LevelIncomeData[]>(mockLevelIncome);
  const [royaltyRanks] = useState<RoyaltyRank[]>(mockRoyaltyRanks);
  const [packages, setPackages] = useState<PackageItem[]>(mockPackages);
  const [products] = useState<ProductItem[]>(mockProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>(mockBankAccounts);
  const [kyc, setKyc] = useState<KycRecord>(mockKyc);
  const [tickets, setTickets] = useState<SupportTicket[]>(mockTickets);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [language, setLanguage] = useState<string>('English');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [selectedTransactionForReceipt, setSelectedTransactionForReceipt] = useState<Transaction | null>(null);
  const [activeUtilityServiceModal, setActiveUtilityServiceModal] = useState<string | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    localStorage.setItem('spay360_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('spay360_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4f46e5', '#7c3aed', '#2563eb', '#10b981', '#f59e0b', '#ec4899'],
      });
    } catch {
      // safe fallback
    }
  };

  const unreadNotifsCount = notifications.filter((n) => !n.isRead).length;

  const markNotifAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const markAllNotifsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    addToast({
      type: 'info',
      title: 'Notifications Cleared',
      message: 'All notifications marked as read',
    });
  };

  // Process Recharge or Utility bill
  const processRechargeOrBill = async (params: {
    serviceType: TransactionType;
    title: string;
    operator: string;
    customerNumber: string;
    amount: number;
    cashbackEarned: number;
    details: string;
    extraReceiptData?: Record<string, any>;
  }): Promise<{ success: boolean; txn?: Transaction; error?: string }> => {
    if (user.eWalletBalance < params.amount) {
      addToast({
        type: 'error',
        title: 'Insufficient Balance',
        message: `E-Wallet balance is ₹${user.eWalletBalance.toFixed(2)}. Please add money to continue.`,
      });
      return { success: false, error: 'Insufficient E-Wallet Balance' };
    }

    // Deduct E-Wallet, credit cashback to Smart Points
    const newTxnId = `TXN-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newTxn: Transaction = {
      id: newTxnId,
      type: params.serviceType,
      title: params.title,
      details: params.details,
      amount: params.amount,
      cashback: params.cashbackEarned,
      status: 'Success',
      date: 'Today',
      time: timeStr,
      timestamp: Date.now(),
      referenceNumber: `SPY${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      paymentMethod: 'E-Wallet',
      customerNumber: params.customerNumber,
      operator: params.operator,
      remarks: `${params.title} payment processed instantly via SPAY360 Bharat BillPay Gateway`,
      receiptData: {
        consumerName: user.name,
        billerName: params.operator,
        circle: 'Mumbai & Maharashtra',
        ...params.extraReceiptData,
      },
    };

    // Update balances
    setUser((prev) => ({
      ...prev,
      eWalletBalance: Number((prev.eWalletBalance - params.amount).toFixed(3)),
      smartPoints: Number((prev.smartPoints + params.cashbackEarned).toFixed(2)),
      selfCashback: Number((prev.selfCashback + params.cashbackEarned).toFixed(2)),
    }));

    setTransactions((prev) => [newTxn, ...prev]);

    // Create Notification
    setNotifications((prev) => [
      {
        id: `NOTIF-${Date.now()}`,
        title: `${params.title} Successful! ✅`,
        message: `Payment of ₹${params.amount} for ${params.details} was processed. ₹${params.cashbackEarned} cashback added to Smart Points.`,
        type: 'transaction',
        timestamp: 'Just now',
        isRead: false,
        amount: params.amount,
      },
      ...prev,
    ]);

    triggerConfetti();
    addToast({
      type: 'success',
      title: 'Payment Successful!',
      message: `₹${params.amount} paid successfully. ₹${params.cashbackEarned} cashback credited!`,
    });

    return { success: true, txn: newTxn };
  };

  // Add Money to Wallet
  const processAddMoney = async (amount: number, method: string, ref?: string): Promise<boolean> => {
    if (amount <= 0) {
      addToast({
        type: 'error',
        title: 'Invalid Amount',
        message: 'Please enter a valid amount greater than ₹0',
      });
      return false;
    }

    const newTxnId = `TXN-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newTxn: Transaction = {
      id: newTxnId,
      type: 'add_money',
      title: 'Add Money',
      details: `Wallet Topup via ${method}`,
      amount: amount,
      status: 'Success',
      date: 'Today',
      time: timeStr,
      timestamp: Date.now(),
      referenceNumber: ref || `UPI${Math.floor(100000000000 + Math.random() * 900000000000)}`,
      paymentMethod: method,
      remarks: `Direct bank topup into SPAY360 E-Wallet via ${method}`,
    };

    setUser((prev) => ({
      ...prev,
      eWalletBalance: Number((prev.eWalletBalance + amount).toFixed(3)),
    }));

    setTransactions((prev) => [newTxn, ...prev]);

    setNotifications((prev) => [
      {
        id: `NOTIF-${Date.now()}`,
        title: 'Wallet Funded Successfully 💳',
        message: `₹${amount} has been added to your E-Wallet via ${method}.`,
        type: 'transaction',
        timestamp: 'Just now',
        isRead: false,
        amount: amount,
      },
      ...prev,
    ]);

    triggerConfetti();
    addToast({
      type: 'success',
      title: 'Wallet Topup Success',
      message: `₹${amount} added to E-Wallet. New Balance: ₹${(user.eWalletBalance + amount).toFixed(2)}`,
    });

    return true;
  };

  // Submit Withdrawal
  const processWithdrawal = async (amount: number, bankId: string, upi?: string): Promise<boolean> => {
    if (amount < 100) {
      addToast({
        type: 'error',
        title: 'Minimum Withdrawal Limit',
        message: 'Minimum withdrawal amount is ₹100.',
      });
      return false;
    }

    if (amount > user.withdrawalBalance) {
      addToast({
        type: 'error',
        title: 'Insufficient Withdrawal Balance',
        message: `Available Withdrawal balance is ₹${user.withdrawalBalance.toFixed(2)}.`,
      });
      return false;
    }

    const fee = Number((amount * 0.05).toFixed(2)); // 5% TDS / Admin processing charge
    const netPayout = amount - fee;
    const bank = bankAccounts.find((b) => b.id === bankId) || bankAccounts[0];
    const newTxnId = `TXN-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newTxn: Transaction = {
      id: newTxnId,
      type: 'withdraw_fund',
      title: 'Bank Withdrawal Request',
      details: `Payout to ${bank.bankName} (${bank.accountNumber.slice(-4)})`,
      amount: amount,
      fee: fee,
      status: 'Processing',
      date: 'Today',
      time: timeStr,
      timestamp: Date.now(),
      referenceNumber: `WTH${Math.floor(100000000 + Math.random() * 900000000)}`,
      paymentMethod: 'IMPS Direct Payout',
      remarks: `Withdrawal request submitted. TDS (5%): ₹${fee}. Net Payout: ₹${netPayout.toFixed(2)}. Direct credit in 15 mins.`,
      receiptData: {
        consumerName: user.name,
        billerName: bank.bankName,
        planDetails: `A/C: ${bank.accountNumber} | IFSC: ${bank.ifsc}`,
      },
    };

    setUser((prev) => ({
      ...prev,
      withdrawalBalance: Number((prev.withdrawalBalance - amount).toFixed(3)),
      totalWithdrawn: Number((prev.totalWithdrawn + amount).toFixed(2)),
    }));

    setTransactions((prev) => [newTxn, ...prev]);

    setNotifications((prev) => [
      {
        id: `NOTIF-${Date.now()}`,
        title: 'Withdrawal Initiated 🏦',
        message: `Withdrawal request of ₹${amount} initiated to ${bank.bankName}. Processing via IMPS.`,
        type: 'transaction',
        timestamp: 'Just now',
        isRead: false,
        amount: amount,
      },
      ...prev,
    ]);

    addToast({
      type: 'info',
      title: 'Withdrawal Processing',
      message: `Request for ₹${amount} submitted. Net amount ₹${netPayout.toFixed(2)} will reflect shortly.`,
    });

    return true;
  };

  // P2P Money Transfer
  const processP2PTransfer = async (
    recipientId: string,
    amount: number,
    pin: string,
    remarks?: string
  ): Promise<boolean> => {
    if (amount <= 0) {
      addToast({
        type: 'error',
        title: 'Invalid Amount',
        message: 'Please enter a valid transfer amount.',
      });
      return false;
    }

    if (amount > user.eWalletBalance) {
      addToast({
        type: 'error',
        title: 'Insufficient Balance',
        message: `Your E-Wallet balance is ₹${user.eWalletBalance.toFixed(2)}.`,
      });
      return false;
    }

    if (pin.length < 4) {
      addToast({
        type: 'error',
        title: 'Invalid Transaction PIN',
        message: 'Please enter your 4 or 6-digit transaction security PIN.',
      });
      return false;
    }

    const newTxnId = `TXN-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newTxn: Transaction = {
      id: newTxnId,
      type: 'money_transfer',
      title: 'Money Transfer (P2P)',
      details: `To: ${recipientId}`,
      amount: amount,
      status: 'Success',
      date: 'Today',
      time: timeStr,
      timestamp: Date.now(),
      referenceNumber: `P2P${Math.floor(10000000 + Math.random() * 90000000)}`,
      paymentMethod: 'E-Wallet Transfer',
      receiver: recipientId,
      remarks: remarks || 'P2P Member Wallet Transfer',
      receiptData: {
        consumerName: `Recipient: ${recipientId}`,
        billerName: 'SPAY360 P2P Engine',
        planDetails: 'Instant zero-fee peer-to-peer wallet transfer',
      },
    };

    setUser((prev) => ({
      ...prev,
      eWalletBalance: Number((prev.eWalletBalance - amount).toFixed(3)),
    }));

    setTransactions((prev) => [newTxn, ...prev]);

    setNotifications((prev) => [
      {
        id: `NOTIF-${Date.now()}`,
        title: 'Money Transferred 🚀',
        message: `Transferred ₹${amount} to ${recipientId} successfully.`,
        type: 'transaction',
        timestamp: 'Just now',
        isRead: false,
        amount: amount,
      },
      ...prev,
    ]);

    triggerConfetti();
    addToast({
      type: 'success',
      title: 'Transfer Completed',
      message: `₹${amount} transferred to ${recipientId} instantly!`,
    });

    return true;
  };

  // Upgrade Package
  const upgradePackage = async (pkg: PackageItem): Promise<boolean> => {
    if (user.eWalletBalance < pkg.price) {
      addToast({
        type: 'error',
        title: 'Insufficient Balance',
        message: `Package requires ₹${pkg.price}. Your E-Wallet has ₹${user.eWalletBalance.toFixed(2)}. Please add funds first.`,
      });
      return false;
    }

    const newTxnId = `TXN-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newTxn: Transaction = {
      id: newTxnId,
      type: 'package_purchase',
      title: 'Package Upgrade',
      details: `${pkg.name} Activated`,
      amount: pkg.price,
      status: 'Success',
      date: 'Today',
      time: timeStr,
      timestamp: Date.now(),
      referenceNumber: `PKG${Math.floor(10000000 + Math.random() * 90000000)}`,
      paymentMethod: 'E-Wallet',
      remarks: `Upgraded to ${pkg.name}. Benefits: ${pkg.benefits.join(', ')}`,
    };

    // Calculate added PV
    const pvToAdd = pkg.price >= 3999 ? 1000 : pkg.price >= 1499 ? 350 : pkg.price >= 599 ? 120 : 50;

    setUser((prev) => ({
      ...prev,
      eWalletBalance: Number((prev.eWalletBalance - pkg.price).toFixed(3)),
      activePackagePrice: pkg.price,
      activePackageName: pkg.name,
      pvWallet: prev.pvWallet + pvToAdd,
      accountStatus: 'Active',
    }));

    setPackages((prev) =>
      prev.map((p) => ({
        ...p,
        isCurrent: p.id === pkg.id,
      }))
    );

    setTransactions((prev) => [newTxn, ...prev]);

    setNotifications((prev) => [
      {
        id: `NOTIF-${Date.now()}`,
        title: `Package Upgraded to ${pkg.name}! 🎉`,
        message: `You are now on ${pkg.name}. Enjoy higher daily capping & increased referral commissions!`,
        type: 'earning',
        timestamp: 'Just now',
        isRead: false,
        amount: pkg.price,
      },
      ...prev,
    ]);

    triggerConfetti();
    addToast({
      type: 'success',
      title: 'Package Activated!',
      message: `Congratulations! ${pkg.name} is now active on your account.`,
    });

    return true;
  };

  // Shopping Cart & Order functions
  const addToCart = (product: ProductItem, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { product, quantity: qty }];
    });
    addToast({
      type: 'success',
      title: 'Added to Cart',
      message: `${product.name.slice(0, 30)}... added to your cart.`,
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = async (shippingAddress: string, paymentMethod: string): Promise<boolean> => {
    if (cart.length === 0) return false;

    const totalAmount = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const totalPv = cart.reduce((acc, item) => acc + item.product.pv * item.quantity, 0);
    const totalCashback = cart.reduce((acc, item) => acc + item.product.cashback * item.quantity, 0);

    if (paymentMethod === 'E-Wallet' && user.eWalletBalance < totalAmount) {
      addToast({
        type: 'error',
        title: 'Insufficient Balance',
        message: `Order total is ₹${totalAmount}. Your E-Wallet has ₹${user.eWalletBalance.toFixed(2)}.`,
      });
      return false;
    }

    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const trackingNo = `TRK-SPY-${Math.floor(1000000 + Math.random() * 9000000)}`;

    const newOrder: OrderItem = {
      id: orderId,
      items: [...cart],
      totalAmount,
      totalPv,
      cashbackEarned: totalCashback,
      paymentMethod,
      status: 'Confirmed',
      date: 'Today',
      trackingNumber: trackingNo,
      shippingAddress,
      franchiseName: cart[0]?.product.franchiseName || 'Apex Mumbai Franchise',
    };

    const newTxnId = `TXN-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newTxn: Transaction = {
      id: newTxnId,
      type: 'repurchase_order',
      title: 'Repurchase Order',
      details: `${cart.length} item(s) - Order #${orderId}`,
      amount: totalAmount,
      cashback: totalCashback,
      status: 'Success',
      date: 'Today',
      time: timeStr,
      timestamp: Date.now(),
      referenceNumber: trackingNo,
      paymentMethod,
      remarks: `Repurchase shopping order. Earned ${totalPv} PV and ₹${totalCashback} cashback.`,
    };

    if (paymentMethod === 'E-Wallet') {
      setUser((prev) => ({
        ...prev,
        eWalletBalance: Number((prev.eWalletBalance - totalAmount).toFixed(3)),
        pvWallet: prev.pvWallet + totalPv,
        repurchaseBalance: Number((prev.repurchaseBalance + totalCashback).toFixed(3)),
        smartPoints: Number((prev.smartPoints + totalCashback).toFixed(2)),
      }));
    } else {
      setUser((prev) => ({
        ...prev,
        pvWallet: prev.pvWallet + totalPv,
        repurchaseBalance: Number((prev.repurchaseBalance + totalCashback).toFixed(3)),
        smartPoints: Number((prev.smartPoints + totalCashback).toFixed(2)),
      }));
    }

    setOrders((prev) => [newOrder, ...prev]);
    setTransactions((prev) => [newTxn, ...prev]);
    setCart([]);

    setNotifications((prev) => [
      {
        id: `NOTIF-${Date.now()}`,
        title: 'Order Confirmed! 📦',
        message: `Order #${orderId} for ₹${totalAmount} placed successfully. Tracking: ${trackingNo}`,
        type: 'order',
        timestamp: 'Just now',
        isRead: false,
        amount: totalAmount,
      },
      ...prev,
    ]);

    triggerConfetti();
    addToast({
      type: 'success',
      title: 'Order Placed Successfully!',
      message: `Your order #${orderId} is being packed by the regional franchise hub.`,
    });

    return true;
  };

  // Support Tickets
  const createTicket = (
    category: SupportTicket['category'],
    priority: SupportTicket['priority'],
    subject: string,
    message: string
  ) => {
    const newTicketId = `TCK-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const dateStr = `Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const newTicket: SupportTicket = {
      id: newTicketId,
      category,
      priority,
      subject,
      message,
      status: 'Open',
      createdAt: dateStr,
      replies: [],
    };

    setTickets((prev) => [newTicket, ...prev]);
    addToast({
      type: 'success',
      title: 'Ticket Created',
      message: `Support ticket #${newTicketId} has been submitted. Our executive will respond shortly.`,
    });

    // Auto-simulate helpful AI assistant or admin reply after 4 seconds
    setTimeout(() => {
      addTicketReply(
        newTicketId,
        `Hello ${user.name}, our priority support desk has received your ticket regarding "${subject}". A customer care specialist is investigating this and will update you shortly. Reference: ${newTicketId}.`,
        'admin'
      );
    }, 4000);
  };

  const addTicketReply = (ticketId: string, message: string, sender: 'user' | 'admin' = 'user') => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              status: sender === 'admin' ? 'In Progress' : t.status,
              replies: [
                ...t.replies,
                {
                  id: `REP-${Math.random()}`,
                  sender,
                  message,
                  timestamp: `Today, ${timeStr}`,
                },
              ],
            }
          : t
      )
    );

    if (sender === 'admin') {
      setNotifications((prev) => [
        {
          id: `NOTIF-${Date.now()}`,
          title: `Reply on Ticket #${ticketId}`,
          message: `Admin support replied to your ticket. Click to view response.`,
          type: 'system',
          timestamp: 'Just now',
          isRead: false,
        },
        ...prev,
      ]);
    }
  };

  // Submit KYC
  const submitKyc = (data: Partial<KycRecord>) => {
    setKyc((prev) => ({
      ...prev,
      ...data,
      status: 'Pending',
      submittedAt: 'Today',
      adminRemarks: 'Documents submitted. Under automated biometric & NSDL clearance.',
    }));

    setUser((prev) => ({
      ...prev,
      kycStatus: 'Pending',
    }));

    addToast({
      type: 'info',
      title: 'KYC Submitted',
      message: 'Your verification documents are being processed by the compliance team.',
    });

    // Simulate instant verification after 3 seconds for smooth UX demo
    setTimeout(() => {
      setKyc((prev) => ({
        ...prev,
        status: 'Verified',
        adminRemarks: 'Government ID and Aadhaar biometric successfully verified.',
      }));
      setUser((prev) => ({ ...prev, kycStatus: 'Verified' }));
      addToast({
        type: 'success',
        title: 'KYC Approved! 🛡️',
        message: 'Your account is now 100% verified. All payout limits unlocked.',
      });
      triggerConfetti();
    }, 3500);
  };

  // Bank accounts
  const addBankAccount = (bank: Omit<BankAccount, 'id' | 'isVerified'>) => {
    const newBank: BankAccount = {
      ...bank,
      id: `BANK-${Math.floor(100 + Math.random() * 900)}`,
      isVerified: true,
    };
    setBankAccounts((prev) => [...prev, newBank]);
    addToast({
      type: 'success',
      title: 'Bank Account Linked',
      message: `${bank.bankName} account has been verified and saved.`,
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAuthModalOpen(true);
    addToast({
      type: 'info',
      title: 'Logged Out',
      message: 'You have been securely signed out of SPAY360.',
    });
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        transactions,
        teamMembers,
        levelIncome,
        royaltyRanks,
        packages,
        products,
        cart,
        orders,
        bankAccounts,
        kyc,
        tickets,
        notifications,
        unreadNotifsCount,
        activeTab,
        setActiveTab,
        theme,
        toggleTheme,
        language,
        setLanguage,
        isSearchOpen,
        setIsSearchOpen,
        isNotifOpen,
        setIsNotifOpen,
        isShareOpen,
        setIsShareOpen,
        selectedTransactionForReceipt,
        setSelectedTransactionForReceipt,
        activeUtilityServiceModal,
        setActiveUtilityServiceModal,
        isAuthenticated,
        setIsAuthenticated,
        isAuthModalOpen,
        setIsAuthModalOpen,
        triggerConfetti,
        addToast,
        toasts,
        removeToast,
        processRechargeOrBill,
        processAddMoney,
        processWithdrawal,
        processP2PTransfer,
        upgradePackage,
        addToCart,
        removeFromCart,
        clearCart,
        placeOrder,
        createTicket,
        addTicketReply,
        submitKyc,
        addBankAccount,
        markNotifAsRead,
        markAllNotifsAsRead,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
