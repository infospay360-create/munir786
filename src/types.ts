export type TransactionStatus = 'Success' | 'Pending' | 'Failed' | 'Processing' | 'Cancelled' | 'Refunded';

export type TransactionType =
  | 'mobile_recharge'
  | 'dth_recharge'
  | 'electricity_bill'
  | 'gas_bill'
  | 'water_bill'
  | 'broadband_bill'
  | 'fastag_recharge'
  | 'postpaid_bill'
  | 'add_money'
  | 'withdraw_fund'
  | 'money_transfer'
  | 'level_income'
  | 'self_cashback'
  | 'royalty_income'
  | 'package_purchase'
  | 'repurchase_order';

export interface Transaction {
  id: string;
  type: TransactionType;
  title: string;
  details: string;
  amount: number;
  fee?: number;
  cashback?: number;
  status: TransactionStatus;
  date: string;
  time: string;
  timestamp: number;
  referenceNumber: string;
  paymentMethod: string;
  sender?: string;
  receiver?: string;
  customerNumber?: string;
  operator?: string;
  remarks?: string;
  receiptData?: {
    consumerName?: string;
    billerName?: string;
    units?: number;
    dueDate?: string;
    circle?: string;
    planDetails?: string;
  };
}

export interface UserProfile {
  name: string;
  userId: string;
  mobile: string;
  email: string;
  avatar: string;
  inviteCode: string;
  sponsorCode: string;
  sponsorName: string;
  joiningDate: string;
  rank: string;
  accountStatus: 'Active' | 'Inactive' | 'Pending Activation';
  kycStatus: 'Verified' | 'Pending' | 'Not Submitted' | 'Rejected';
  role: 'User' | 'Admin' | 'Franchise';
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  smartPoints: number;
  pvWallet: number;
  directReferralsCount: number;
  totalTeamCount: number;
  activeTeamCount: number;
  totalEarnings: number;
  activePackagePrice: number;
  activePackageName: string;
  totalWithdrawn: number;
  repurchaseBalance: number;
  levelIncome: number;
  selfCashback: number;
  todayIncome: number;
  todayJoining: number;
  withdrawalBalance: number;
  eWalletBalance: number;
}

export interface TeamMember {
  id: string;
  name: string;
  userId: string;
  joiningDate: string;
  rank: string;
  status: 'Active' | 'Inactive';
  directSponsor: string;
  sponsorId: string;
  personalSales: number;
  teamBusiness: number;
  directReferrals: number;
  level: number;
  position?: 'left' | 'right';
  mobile: string;
  email: string;
  pv: number;
  avatar?: string;
  children?: TeamMember[];
}

export interface LevelIncomeData {
  level: number;
  percentage: number;
  eligibleBusiness: number;
  generatedIncome: number;
  membersCount: number;
  status: 'Active' | 'Locked';
}

export interface RoyaltyRank {
  id: number;
  name: string;
  badge: string;
  requiredTeam: number;
  requiredBusiness: number;
  achievedBusiness: number;
  royaltyPercentage: number;
  royaltyIncome: number;
  status: 'Achieved' | 'In Progress' | 'Locked';
  benefits: string[];
}

export interface PackageItem {
  id: string;
  name: string;
  price: number;
  color?: string;
  gradient?: string;
  benefits?: string[];
  features?: string[];
  dailyRoi?: string;
  dailyCashback?: number;
  cappingLimit?: string;
  directBonus?: string;
  directIncome?: number;
  levelIncomeDepth?: number;
  popular?: boolean;
  isCurrent?: boolean;
}

export type Package = PackageItem;

export interface SupportTicket {
  id: string;
  category?: 'Recharge' | 'Bill Payment' | 'Wallet' | 'MLM / Team' | 'KYC' | 'Withdrawal' | 'Other' | 'Billing' | 'Technical' | 'MLM / Commission' | 'General';
  department?: 'Billing' | 'Technical' | 'KYC' | 'MLM / Commission' | 'General';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  subject: string;
  message?: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  createdAt?: string;
  lastUpdated?: string;
  messages?: {
    id: string;
    sender: 'user' | 'admin';
    text: string;
    time: string;
  }[];
  replies?: {
    id: string;
    sender: 'user' | 'admin';
    message: string;
    timestamp: string;
  }[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'transaction' | 'earning' | 'team' | 'security' | 'order' | 'system' | 'offer';
  timestamp?: string;
  time?: string;
  isRead: boolean;
  amount?: number;
  actionTab?: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: number;
  mrp?: number;
  originalPrice?: number;
  pv: number;
  bv?: number;
  cashback?: number;
  image?: string;
  rating?: number;
  reviewsCount?: number;
  stock?: number;
  franchiseId?: string;
  franchiseName?: string;
  description: string;
}

export type Product = ProductItem;

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

export interface OrderItem {
  id: string;
  items: CartItem[];
  totalAmount: number;
  totalPv: number;
  cashbackEarned: number;
  paymentMethod: string;
  status: 'Ordered' | 'Confirmed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  date: string;
  trackingNumber: string;
  shippingAddress: string;
  franchiseName: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountHolder: string;
  accountNumber: string;
  ifsc: string;
  upiId?: string;
  isPrimary: boolean;
  isVerified: boolean;
}

export interface KycRecord {
  aadhaarNumber: string;
  panNumber: string;
  fullName: string;
  dob: string;
  address: string;
  documentType: 'Aadhaar Card' | 'Passport' | 'Voter ID' | 'Driving License';
  status: 'Verified' | 'Pending' | 'Rejected' | 'Not Submitted';
  submittedAt?: string;
  adminRemarks?: string;
}

export interface ActiveSession {
  id: string;
  device: string;
  browser: string;
  location: string;
  ip: string;
  lastActive: string;
  isCurrent: boolean;
}
