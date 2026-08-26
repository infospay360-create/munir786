import React, { useState } from 'react';
import {
  X,
  Zap,
  Tv,
  Flame,
  Droplets,
  Wifi,
  Car,
  FileText,
  CheckCircle2,
  ShieldCheck,
  Tag,
  Search,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TransactionType } from '../../types';

export const UtilityBillModal: React.FC = () => {
  const {
    user,
    activeUtilityServiceModal,
    setActiveUtilityServiceModal,
    processRechargeOrBill,
    setSelectedTransactionForReceipt,
    addToast,
  } = useApp();

  const serviceId = activeUtilityServiceModal;
  const isUtility =
    serviceId &&
    ['electricity', 'dth', 'gas', 'water', 'broadband', 'fastag', 'postpaid'].includes(serviceId);

  const [state, setState] = useState('Maharashtra');
  const [biller, setBiller] = useState('MSEDCL - Maharashtra State Electricity');
  const [consumerNumber, setConsumerNumber] = useState('1234567890');
  const [billFetched, setBillFetched] = useState(true);
  const [billAmount, setBillAmount] = useState<number>(560);
  const [customerName, setCustomerName] = useState('Munir Khan');
  const [dueDate, setDueDate] = useState('28 Aug 2026');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  if (!isUtility) return null;

  const getServiceMeta = () => {
    switch (serviceId) {
      case 'electricity':
        return {
          title: 'Electricity Bill Payment',
          icon: <Zap className="h-6 w-6" />,
          color: 'from-amber-500 to-orange-500',
          numberLabel: 'Consumer Number / CA Number',
          placeholder: 'e.g. 1234567890',
          type: 'electricity_bill' as TransactionType,
          billers: [
            'MSEDCL - Maharashtra State Electricity',
            'Tata Power - Mumbai',
            'Adani Electricity - Mumbai',
            'BESCOM - Bengaluru',
            'BSES Rajdhani - Delhi',
            'UPPCL - Uttar Pradesh',
          ],
        };
      case 'dth':
        return {
          title: 'DTH Recharge',
          icon: <Tv className="h-6 w-6" />,
          color: 'from-pink-500 to-rose-600',
          numberLabel: 'Subscriber ID / VC Number',
          placeholder: 'e.g. 1029384756',
          type: 'dth_recharge' as TransactionType,
          billers: ['Tata Play (Tata Sky)', 'Airtel Digital TV', 'Dish TV', 'Sun Direct', 'D2H'],
        };
      case 'gas':
        return {
          title: 'Piped Gas / Cylinder Payment',
          icon: <Flame className="h-6 w-6" />,
          color: 'from-orange-500 to-red-600',
          numberLabel: 'Customer ID / BP Number',
          placeholder: 'e.g. 90182471',
          type: 'gas_bill' as TransactionType,
          billers: ['Mahanagar Gas (MGL)', 'Indraprastha Gas (IGL)', 'Gujarat Gas', 'Adani Total Gas', 'HP Gas'],
        };
      case 'water':
        return {
          title: 'Water Bill Payment',
          icon: <Droplets className="h-6 w-6" />,
          color: 'from-cyan-500 to-blue-600',
          numberLabel: 'Consumer ID / K-Number',
          placeholder: 'e.g. 40192837',
          type: 'water_bill' as TransactionType,
          billers: [
            'Municipal Corporation of Greater Mumbai (MCGM)',
            'Delhi Jal Board (DJB)',
            'Bangalore Water Supply (BWSSB)',
            'Chennai Metropolitan Water',
          ],
        };
      case 'broadband':
        return {
          title: 'Broadband & Landline Bill',
          icon: <Wifi className="h-6 w-6" />,
          color: 'from-purple-600 to-indigo-600',
          numberLabel: 'Account Number / Telephone No.',
          placeholder: 'e.g. 022-28491028',
          type: 'broadband_bill' as TransactionType,
          billers: ['Airtel Broadband', 'JioFiber', 'ACT Fibernet', 'Hathway Broadband', 'BSNL Broadband', 'Tata Play Fiber'],
        };
      case 'fastag':
        return {
          title: 'FASTag Recharge',
          icon: <Car className="h-6 w-6" />,
          color: 'from-emerald-500 to-teal-600',
          numberLabel: 'Vehicle Registration Number',
          placeholder: 'e.g. MH02AB1234',
          type: 'fastag_recharge' as TransactionType,
          billers: ['ICICI Bank FASTag', 'Paytm Payments Bank FASTag', 'HDFC Bank FASTag', 'SBI FASTag', 'Axis Bank FASTag'],
        };
      case 'postpaid':
        return {
          title: 'Postpaid Mobile Bill',
          icon: <FileText className="h-6 w-6" />,
          color: 'from-slate-600 to-slate-800',
          numberLabel: 'Postpaid Mobile Number',
          placeholder: 'e.g. 9876543210',
          type: 'postpaid_bill' as TransactionType,
          billers: ['Airtel Postpaid', 'Jio Postpaid Plus', 'Vi Postpaid (Vodafone Idea)', 'BSNL Postpaid'],
        };
      default:
        return {
          title: 'Utility Bill Payment',
          icon: <Zap className="h-6 w-6" />,
          color: 'from-blue-600 to-indigo-600',
          numberLabel: 'Consumer Number',
          placeholder: 'Enter details',
          type: 'electricity_bill' as TransactionType,
          billers: ['MSEDCL'],
        };
    }
  };

  const meta = getServiceMeta();
  const cashbackEarned = Math.round(billAmount * 0.03) + 10;

  const handleFetchBill = async () => {
    if (!consumerNumber) {
      addToast({
        type: 'error',
        title: 'Input Required',
        message: `Please enter your ${meta.numberLabel}`,
      });
      return;
    }

    setIsFetching(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsFetching(false);
    setBillFetched(true);
    setBillAmount(Math.floor(250 + Math.random() * 800));
    setCustomerName('Munir Khan');
    setDueDate('28 Aug 2026');
    addToast({
      type: 'success',
      title: 'Bill Fetched',
      message: 'Latest invoice details retrieved from Bharat BillPay',
    });
  };

  const handlePayBill = async () => {
    if (!billFetched) {
      addToast({
        type: 'warning',
        title: 'Fetch Bill First',
        message: 'Please fetch the bill before proceeding to payment.',
      });
      return;
    }

    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 1500));

    const result = await processRechargeOrBill({
      serviceType: meta.type,
      title: meta.title,
      operator: biller,
      customerNumber: consumerNumber,
      amount: billAmount,
      cashbackEarned,
      details: `${biller} - ${consumerNumber}`,
      extraReceiptData: {
        consumerName: customerName,
        dueDate,
      },
    });

    setIsProcessing(false);

    if (result.success && result.txn) {
      setActiveUtilityServiceModal(null);
      setSelectedTransactionForReceipt(result.txn);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 sm:p-8 shadow-2xl dark:bg-slate-800 dark:border dark:border-slate-700">
        <button
          onClick={() => setActiveUtilityServiceModal(null)}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr ${meta.color} text-white shadow-lg`}
          >
            {meta.icon}
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">{meta.title}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Bharat BillPay BBPS Certified Instant Clearance
            </p>
          </div>
        </div>

        {/* Form Inputs */}
        <div className="space-y-4 mb-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Service Provider / Biller
            </label>
            <select
              value={biller}
              onChange={(e) => setBiller(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-semibold text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            >
              {meta.billers.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              {meta.numberLabel}
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={consumerNumber}
                onChange={(e) => setConsumerNumber(e.target.value)}
                placeholder={meta.placeholder}
                className="flex-1 rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-semibold text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
              <button
                type="button"
                onClick={handleFetchBill}
                disabled={isFetching}
                className="px-4 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-xs font-bold text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 cursor-pointer"
              >
                {isFetching ? 'Fetching...' : 'Fetch Bill'}
              </button>
            </div>
          </div>
        </div>

        {/* Bill Fetched Card */}
        {billFetched && (
          <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4 mb-5 dark:border-indigo-900/50 dark:bg-indigo-950/30 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">Customer Name:</span>
              <span className="font-bold text-slate-800 dark:text-slate-100">{customerName}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">Due Date:</span>
              <span className="font-bold text-amber-600 dark:text-amber-400">{dueDate}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">Bill Status:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                Unpaid / Due for Settlement
              </span>
            </div>
            <div className="border-t border-indigo-100 pt-2 flex items-center justify-between dark:border-indigo-900/50">
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Bill Amount:</span>
              <span className="text-xl font-black text-indigo-700 dark:text-indigo-300">
                ₹{billAmount}
              </span>
            </div>
          </div>
        )}

        {/* Cashback Banner */}
        <div className="rounded-2xl border border-dashed border-emerald-300 bg-emerald-50/60 p-3 mb-5 dark:border-emerald-700 dark:bg-emerald-950/30 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Tag className="h-4 w-4 text-emerald-600" />
            <div>
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                SPAY360 Utility Guarantee
              </span>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                ₹{cashbackEarned} cashback will be credited to Smart Points on successful payment
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Active ✓</span>
        </div>

        {/* Wallet Balance & Total */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-4 mb-5 dark:border-slate-700">
          <div>
            <span className="text-xs text-slate-400">Deducting from E-Wallet:</span>
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Available: ₹{user.eWalletBalance.toFixed(2)}
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400">Total Payable:</span>
            <div className="text-2xl font-black text-slate-800 dark:text-slate-100">
              ₹{billAmount}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handlePayBill}
          disabled={isProcessing}
          className="btn-3d flex w-full items-center justify-center space-x-2 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-3.5 text-sm font-bold text-white shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 disabled:opacity-50 cursor-pointer"
        >
          {isProcessing ? (
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Settling Bill via BBPS...</span>
            </div>
          ) : (
            <>
              <ShieldCheck className="h-4 w-4" />
              <span>Pay Bill ₹{billAmount}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
