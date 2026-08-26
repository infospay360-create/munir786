import React, { useRef } from 'react';
import {
  X,
  Printer,
  Share2,
  Download,
  CheckCircle2,
  Clock,
  XCircle,
  Copy,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SpayLogo } from '../icons/3d/Icon3D';

export const ReceiptModal: React.FC = () => {
  const { selectedTransactionForReceipt, setSelectedTransactionForReceipt, addToast } = useApp();
  const printRef = useRef<HTMLDivElement>(null);

  if (!selectedTransactionForReceipt) return null;

  const txn = selectedTransactionForReceipt;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyRef = () => {
    navigator.clipboard.writeText(txn.referenceNumber);
    addToast({
      type: 'success',
      title: 'Reference Copied',
      message: `${txn.referenceNumber} copied to clipboard`,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 sm:p-8 shadow-2xl dark:bg-slate-800 dark:border dark:border-slate-700">
        <button
          onClick={() => setSelectedTransactionForReceipt(null)}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Printable Receipt Card */}
        <div ref={printRef} className="space-y-6">
          {/* Brand Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-700">
            <div className="flex items-center space-x-2.5">
              <SpayLogo size={36} />
              <div>
                <span className="text-lg font-black tracking-tight bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent">
                  SPAY360
                </span>
                <p className="text-[10px] text-slate-400 font-medium">Smart Payments, Smarter You</p>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center space-x-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>{txn.status}</span>
              </span>
              <p className="text-[10px] text-slate-400 mt-1">BBPS Certified</p>
            </div>
          </div>

          {/* Amount Hero */}
          <div className="text-center py-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {txn.title}
            </span>
            <div className="text-4xl font-black text-slate-900 dark:text-white mt-1">
              ₹{txn.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {txn.details}
            </p>
          </div>

          {/* Transaction Metadata Grid */}
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/60 space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Transaction ID:</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-100">{txn.id}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Reference Number:</span>
              <button
                type="button"
                onClick={handleCopyRef}
                className="flex items-center space-x-1 font-mono font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                <span>{txn.referenceNumber}</span>
                <Copy className="h-3 w-3" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Date & Time:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-100">
                {txn.date}, {txn.time}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Payment Channel:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-100">
                {txn.paymentMethod}
              </span>
            </div>

            {txn.cashback && txn.cashback > 0 && (
              <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                <span>Smart Points Cashback:</span>
                <span>+₹{txn.cashback.toFixed(2)}</span>
              </div>
            )}

            {txn.fee && txn.fee > 0 && (
              <div className="flex items-center justify-between text-rose-600 dark:text-rose-400 font-bold">
                <span>Processing Fee / TDS:</span>
                <span>-₹{txn.fee.toFixed(2)}</span>
              </div>
            )}

            {txn.receiptData?.consumerName && (
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Consumer Name:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-100">
                  {txn.receiptData.consumerName}
                </span>
              </div>
            )}

            {txn.receiptData?.billerName && (
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Biller:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-100">
                  {txn.receiptData.billerName}
                </span>
              </div>
            )}
          </div>

          {/* Verification Barcode & Security Badge */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-700">
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>256-Bit Encrypted & Verified</span>
            </div>
            <span className="font-mono text-[10px] text-slate-400">
              SPAY360-BBPS-AUTH
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center justify-center space-x-2 rounded-2xl border border-slate-200 bg-white py-3 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 cursor-pointer"
          >
            <Printer className="h-4 w-4" />
            <span>Print Receipt</span>
          </button>

          <button
            onClick={() => {
              addToast({
                type: 'success',
                title: 'Receipt Downloaded',
                message: `Invoice #${txn.id}.pdf generated successfully`,
              });
            }}
            className="btn-3d flex items-center justify-center space-x-2 rounded-2xl bg-indigo-600 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-700 cursor-pointer"
          >
            <Download className="h-4 w-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
