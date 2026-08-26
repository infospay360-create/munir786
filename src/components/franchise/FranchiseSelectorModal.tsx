import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Store,
  MapPin,
  Phone,
  Search,
  CheckCircle2,
  XCircle,
  Sparkles,
  ShieldCheck,
  Building2,
  ArrowRight,
  Package,
  Navigation,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FranchiseInfo, StockType, ProductItem } from '../../types';

interface FranchiseSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  stockType?: StockType;
  directProduct?: ProductItem;
  directQuantity?: number;
  reassignOrderId?: string;
  onOrderSuccess?: (res: { orderId?: string; deliveryOtp?: string; productCode?: string }) => void;
}

export const FranchiseSelectorModal: React.FC<FranchiseSelectorModalProps> = ({
  isOpen,
  onClose,
  stockType = 'shopping',
  directProduct,
  directQuantity = 1,
  reassignOrderId,
  onOrderSuccess,
}) => {
  const {
    franchises,
    user,
    placeFranchiseOrder,
    reassignOrderToFranchise,
    cart,
  } = useApp();

  const [searchPincodeOrCity, setSearchPincodeOrCity] = useState('');
  const [selectedFranchiseId, setSelectedFranchiseId] = useState<string>(franchises[0]?.id || '');
  const [productCodeInput, setProductCodeInput] = useState(
    stockType === 'id_activation' ? 'ACT-SPY-991' : 'PRD-SHOP-402'
  );
  const [shippingAddress, setShippingAddress] = useState(
    user.address ? `${user.address.street}, ${user.address.city} - ${user.address.pincode}` : 'Malad West, Mumbai - 400064'
  );
  const [paymentMethod, setPaymentMethod] = useState<'E-Wallet' | 'UPI' | 'Cash on Delivery'>('E-Wallet');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderCompleteData, setOrderCompleteData] = useState<{
    orderId: string;
    productCode: string;
    deliveryOtp: string;
    franchiseName: string;
  } | null>(null);

  // Filter franchises by search
  const filteredFranchises = franchises.filter((f) => {
    if (!searchPincodeOrCity) return true;
    const q = searchPincodeOrCity.toLowerCase();
    return (
      f.name.toLowerCase().includes(q) ||
      f.city.toLowerCase().includes(q) ||
      f.pincode.includes(q) ||
      f.address.toLowerCase().includes(q)
    );
  });

  const selectedFranchise = franchises.find((f) => f.id === selectedFranchiseId) || franchises[0];

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFranchise) return;
    setIsSubmitting(true);

    if (reassignOrderId) {
      // Reassigning existing rejected order (Requirement #6)
      await reassignOrderToFranchise(reassignOrderId, selectedFranchise.id);
      setIsSubmitting(false);
      onClose();
      return;
    }

    // Placing new franchise order (Requirement #3)
    const directItem = directProduct ? { product: directProduct, quantity: directQuantity } : undefined;
    const res = await placeFranchiseOrder({
      franchiseId: selectedFranchise.id,
      stockType,
      shippingAddress,
      paymentMethod,
      directItem,
    });

    setIsSubmitting(false);

    if (res.success && res.orderId && res.deliveryOtp) {
      setOrderCompleteData({
        orderId: res.orderId,
        productCode: res.productCode || productCodeInput,
        deliveryOtp: res.deliveryOtp,
        franchiseName: selectedFranchise.name,
      });

      if (onOrderSuccess) {
        onOrderSuccess(res);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-100 dark:border-slate-800 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
              <Store className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {reassignOrderId ? 'Forward Order to Another Franchise' : 'Select Regional Franchise for Order'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {reassignOrderId
                  ? 'Your order code remains valid. Select a new nearby franchise hub.'
                  : 'Choose nearby franchise for pickup or speedy local doorstep delivery.'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <XCircle className="h-5 w-5" />
          </button>
        </div>

        {orderCompleteData ? (
          /* Success Screen with Delivery Verification Code & Product Code */
          <div className="py-6 text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                Order Placed with {orderCompleteData.franchiseName}!
              </h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                Your order request has been sent to the selected franchise. When receiving the parcel, provide the
                Delivery Verification Code below to the franchise executive.
              </p>
            </div>

            {/* Generated Codes Display */}
            <div className="mx-auto max-w-sm rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 border border-indigo-100 dark:border-indigo-900/50 p-5 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Order ID:</span>
                <span className="font-bold text-slate-900 dark:text-white">{orderCompleteData.orderId}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Product Code:</span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  {orderCompleteData.productCode}
                </span>
              </div>
              <div className="pt-2 border-t border-indigo-200 dark:border-indigo-800/60">
                <div className="text-xs text-slate-500 font-medium">Your Delivery Verification Code (OTP):</div>
                <div className="mt-1 text-3xl font-mono font-black tracking-widest text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-900 py-2 rounded-xl shadow-inner border border-emerald-200 dark:border-emerald-800">
                  {orderCompleteData.deliveryOtp}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Keep this code ready for handover. Franchise enters this code to complete delivery.
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setOrderCompleteData(null);
                onClose();
              }}
              className="rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow hover:bg-indigo-500"
            >
              Done & View Order
            </button>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="mt-4 space-y-4">
            {/* Search Pincode or City */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search franchise by Area, City or Pincode (e.g. 400064, Malad, Mumbai)..."
                value={searchPincodeOrCity}
                onChange={(e) => setSearchPincodeOrCity(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-9 pr-4 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            {/* List of Nearby Franchises (Requirement #3: Name, Address, PIN, Mobile) */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>Select Nearest Franchise Hub:</span>
                <span className="text-[11px] text-slate-400">{filteredFranchises.length} Franchises Available</span>
              </label>

              <div className="mt-2 space-y-2.5 max-h-56 overflow-y-auto pr-1">
                {filteredFranchises.map((fr) => {
                  const isSelected = fr.id === selectedFranchiseId;
                  return (
                    <div
                      key={fr.id}
                      onClick={() => setSelectedFranchiseId(fr.id)}
                      className={`cursor-pointer rounded-xl p-3.5 border transition flex items-start justify-between gap-3 ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 ring-2 ring-indigo-600/20'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg ${
                            isSelected
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-100 dark:bg-slate-700 text-slate-500'
                          }`}
                        >
                          <Building2 className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-slate-900 dark:text-white text-xs">{fr.name}</h4>
                            <span className="rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 px-1.5 py-0.2 text-[10px] font-bold">
                              ★ {fr.rating}
                            </span>
                            {fr.distanceKm && (
                              <span className="text-[10px] text-indigo-600 font-semibold flex items-center gap-0.5">
                                <Navigation className="h-2.5 w-2.5" />
                                {fr.distanceKm} km
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
                            {fr.address} - <strong className="text-slate-700 dark:text-slate-200">PIN: {fr.pincode}</strong>
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                            <Phone className="h-3 w-3 text-slate-400" />
                            {fr.mobile}
                          </div>
                        </div>
                      </div>

                      <div className="shrink-0 mt-1">
                        <div
                          className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300'
                          }`}
                        >
                          {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Product Code & Order details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Product / Activation Code
                </label>
                <input
                  type="text"
                  value={productCodeInput}
                  onChange={(e) => setProductCodeInput(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Payment Mode
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none"
                >
                  <option value="E-Wallet">E-Wallet (Bal: ₹{user.eWalletBalance.toFixed(2)})</option>
                  <option value="UPI">Instant UPI / QR</option>
                  <option value="Cash on Delivery">Cash on Handover / Franchise Pay</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Delivery / Handover Address
              </label>
              <input
                type="text"
                required
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            {/* Submit buttons */}
            <div className="flex gap-2 pt-3">
              <button
                type="button"
                onClick={onClose}
                className="w-1/3 rounded-xl bg-slate-100 dark:bg-slate-800 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-2/3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-2.5 text-xs font-bold text-white shadow hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting
                  ? 'Processing...'
                  : reassignOrderId
                  ? 'Forward Order to Selected Franchise'
                  : 'Place Order via Selected Franchise →'}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};
