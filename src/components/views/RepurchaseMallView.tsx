import React, { useState } from 'react';
import {
  ShoppingBag,
  ShoppingCart,
  Star,
  Tag,
  CheckCircle2,
  ShieldCheck,
  Zap,
  TrendingUp,
  Package,
  Store,
  MapPin,
  Phone,
  KeyRound,
  RefreshCw,
  Clock,
  XCircle,
  ArrowRight,
  Truck,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProductItem, OrderItem } from '../../types';
import { FranchiseSelectorModal } from '../franchise/FranchiseSelectorModal';

export const RepurchaseMallView: React.FC = () => {
  const {
    user,
    products,
    orders,
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    placeOrder,
    addToast,
    selectedFranchise,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'shop' | 'my_orders'>('shop');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isFranchiseModalOpen, setIsFranchiseModalOpen] = useState(false);
  const [directOrderProduct, setDirectOrderProduct] = useState<ProductItem | undefined>(undefined);
  const [reassigningOrder, setReassigningOrder] = useState<OrderItem | null>(null);
  const [isDirectBuying, setIsDirectBuying] = useState(false);

  const categories = ['All', 'Health & Wellness', 'Protection & Tech', 'Personal Care', 'Starter & ID Activation'];

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const cartTotalAmount = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartTotalPV = cart.reduce((acc, item) => acc + item.product.pv * item.quantity, 0);
  const cartTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleOpenFranchiseCheckout = (prod?: ProductItem) => {
    if (prod) {
      setDirectOrderProduct(prod);
    } else {
      setDirectOrderProduct(undefined);
    }
    setReassigningOrder(null);
    setIsFranchiseModalOpen(true);
  };

  const handleReassignOrder = (order: OrderItem) => {
    setReassigningOrder(order);
    setDirectOrderProduct(undefined);
    setIsFranchiseModalOpen(true);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-6 text-white shadow-xl">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-6 w-6 text-indigo-200" />
              <h1 className="text-2xl font-black tracking-tight text-white">SPAY360 Repurchase Mall & Franchise Delivery</h1>
            </div>
            <p className="text-xs text-indigo-100/80 max-w-xl">
              Shop official SPAY360 products, select your nearest regional franchise for swift delivery, and generate BV/PV commissions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-2xl bg-white/10 backdrop-blur-md px-4 py-2 text-right border border-white/20">
              <span className="text-[10px] text-indigo-200 uppercase font-semibold">Repurchase Wallet</span>
              <div className="text-lg font-black text-amber-300">₹{user.repurchaseBalance.toFixed(2)}</div>
            </div>
            <div className="rounded-2xl bg-white/10 backdrop-blur-md px-4 py-2 text-right border border-white/20">
              <span className="text-[10px] text-indigo-200 uppercase font-semibold">E-Wallet</span>
              <div className="text-lg font-black text-emerald-300">₹{user.eWalletBalance.toFixed(2)}</div>
            </div>
          </div>
        </div>

        {/* Decorative backdrop glow */}
        <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-pink-500/20 blur-2xl" />
      </div>

      {/* Main Tabs (Product Catalog vs My Orders) */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
          <button
            onClick={() => setActiveTab('shop')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
              activeTab === 'shop'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <ShoppingBag className="h-4 w-4" />
            Product Catalog
          </button>
          <button
            onClick={() => setActiveTab('my_orders')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
              activeTab === 'my_orders'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Package className="h-4 w-4" />
            My Orders & Delivery Codes ({orders.length})
          </button>
        </div>

        {activeTab === 'shop' && (
          <div className="flex items-center space-x-2 overflow-x-auto pb-1">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === c
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                    : 'bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 border border-slate-100 dark:border-slate-700'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* VIEW 1: PRODUCT CATALOG & CHECKOUT */}
      {activeTab === 'shop' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Product Cards */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="rounded-3xl bg-white p-4 shadow-sm border border-slate-100 dark:bg-slate-900 dark:border-slate-800 flex flex-col justify-between hover:shadow-lg transition-all"
              >
                <div>
                  <div className="h-36 rounded-2xl bg-gradient-to-tr from-slate-100 to-indigo-50 dark:from-slate-800 dark:to-slate-800/80 flex items-center justify-center relative overflow-hidden mb-3">
                    <div className="p-4 rounded-3xl bg-white/80 dark:bg-slate-900/80 shadow-md">
                      <Package className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <span className="absolute top-2.5 right-2.5 rounded-full bg-indigo-600 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
                      {p.pv} PV Points
                    </span>
                    <span className="absolute bottom-2.5 left-2.5 rounded-full bg-slate-900/70 backdrop-blur-md px-2 py-0.5 text-[9px] font-semibold text-white">
                      Franchise Stock Available
                    </span>
                  </div>

                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {p.category}
                  </span>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 line-clamp-1 mt-0.5">
                    {p.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                    {p.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 mt-3">
                  <div className="flex items-center justify-between mb-2.5">
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="text-base font-black text-slate-800 dark:text-slate-100">
                          ₹{p.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs line-through text-slate-400">
                          ₹{p.originalPrice?.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                        BV: {p.bv} Pts
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(p, 1)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition"
                    >
                      + Cart
                    </button>
                  </div>

                  {/* Direct Buy via Franchise Button (Requirement #3) */}
                  <button
                    onClick={() => handleOpenFranchiseCheckout(p)}
                    className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white py-2 text-xs font-bold shadow-md transition flex items-center justify-center gap-1.5"
                  >
                    <Store className="h-3.5 w-3.5" />
                    Select Franchise & Buy
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart & Franchise Summary */}
          <div className="rounded-3xl bg-white dark:bg-slate-900 p-5 shadow-sm border border-slate-100 dark:border-slate-800 space-y-4 h-fit">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  Cart Summary ({cartTotalItems})
                </h3>
              </div>
              {cartTotalItems > 0 && (
                <button
                  onClick={clearCart}
                  className="text-[10px] text-rose-500 font-bold hover:underline cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {cart.length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-400">
                Your cart is currently empty. Click "Select Franchise & Buy" on any product to order directly!
              </div>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1 text-xs">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center justify-between py-1 border-b border-slate-50 dark:border-slate-800">
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">{item.product.name}</div>
                      <div className="text-[10px] text-slate-400">Qty: {item.quantity} × ₹{item.product.price}</div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-rose-500 hover:text-rose-700 text-xs font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-2 text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Subtotal Price:</span>
                <span className="font-bold text-slate-800 dark:text-slate-100">₹{cartTotalAmount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">PV Generated:</span>
                <span className="font-bold text-amber-500">+{cartTotalPV} PV</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Franchise Handover:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">Doorstep / Pickup</span>
              </div>
            </div>

            <button
              onClick={() => handleOpenFranchiseCheckout()}
              disabled={cartTotalItems === 0}
              className="w-full flex items-center justify-center space-x-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 disabled:opacity-50"
            >
              <Store className="h-4 w-4" />
              <span>Select Franchise to Place Order (₹{cartTotalAmount})</span>
            </button>
          </div>
        </div>
      )}

      {/* VIEW 2: MY ORDERS, CODES & FRANCHISE REASSIGNMENT (Requirement #5 & #6) */}
      {activeTab === 'my_orders' && (
        <div className="space-y-4">
          <div className="rounded-2xl bg-white dark:bg-slate-900 p-5 shadow-sm border border-slate-100 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">My Franchise Orders & Delivery Verification Codes</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Share the 4-digit Delivery Verification Code (OTP) with your franchise executive during handover.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {orders.map((ord) => {
              const isRejected = ord.status === 'Rejected by Franchise';
              return (
                <div
                  key={ord.id}
                  className={`rounded-2xl p-5 shadow-sm border space-y-3.5 transition ${
                    isRejected
                      ? 'bg-rose-50/40 border-rose-200 dark:bg-rose-950/20 dark:border-rose-900/50'
                      : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-indigo-600 dark:text-indigo-400 text-sm">
                          {ord.orderCode || ord.id}
                        </span>
                        {ord.productCode && (
                          <span className="text-[11px] font-mono text-slate-400">({ord.productCode})</span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{ord.date}</div>
                    </div>

                    <div>
                      {ord.status === 'Ordered' && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                          <Clock className="h-3 w-3" />
                          Pending Franchise Accept
                        </span>
                      )}
                      {ord.status === 'Processing' && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-950/60 dark:text-blue-300">
                          <Truck className="h-3 w-3" />
                          Accepted by Franchise
                        </span>
                      )}
                      {ord.status === 'Delivered' && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                          <CheckCircle2 className="h-3 w-3" />
                          Delivered & Verified
                        </span>
                      )}
                      {isRejected && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-semibold text-rose-800 dark:bg-rose-950/60 dark:text-rose-300">
                          <XCircle className="h-3 w-3" />
                          Rejected by Franchise
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Assigned Franchise Box (Requirement #3) */}
                  <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3 text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                      <span className="flex items-center gap-1.5">
                        <Store className="h-3.5 w-3.5 text-indigo-500" />
                        {ord.franchiseName || selectedFranchise.name}
                      </span>
                      {ord.franchiseMobile && <span className="text-slate-400 font-normal">{ord.franchiseMobile}</span>}
                    </div>
                    {ord.franchiseAddress && (
                      <div className="text-[11px] text-slate-500 flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
                        {ord.franchiseAddress}
                      </div>
                    )}
                  </div>

                  {/* Items List */}
                  <div className="text-xs space-y-1">
                    {ord.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between text-slate-700 dark:text-slate-300">
                        <span>{it.product.name} (×{it.quantity})</span>
                        <span className="font-bold">₹{it.product.price * it.quantity}</span>
                      </div>
                    ))}
                    <div className="flex justify-between font-bold text-slate-900 dark:text-white pt-1 border-t border-slate-100 dark:border-slate-800">
                      <span>Total Amount Paid:</span>
                      <span>₹{ord.totalAmount}</span>
                    </div>
                  </div>

                  {/* Delivery Verification Code Box (Requirement #5) */}
                  {ord.deliveryOtp && ord.status !== 'Delivered' && !isRejected && (
                    <div className="rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 p-3 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-emerald-800 dark:text-emerald-300">
                          Delivery Verification Code (OTP)
                        </div>
                        <div className="text-[11px] text-slate-500">Provide this code to franchise at handover</div>
                      </div>
                      <div className="text-2xl font-mono font-black tracking-widest text-emerald-700 dark:text-emerald-300 bg-white dark:bg-slate-900 px-3 py-1 rounded-lg shadow-sm border border-emerald-200 dark:border-emerald-700">
                        {ord.deliveryOtp}
                      </div>
                    </div>
                  )}

                  {/* Rejected Order Action (Requirement #6: User order remains valid to reassign!) */}
                  {isRejected && (
                    <div className="space-y-2 pt-2 border-t border-rose-200 dark:border-rose-900/60">
                      <div className="text-xs text-rose-700 dark:text-rose-300">
                        ⚠️ <strong>Order Rejected:</strong> This franchise could not fulfill this parcel. Your order & product
                        code <strong>({ord.productCode || ord.id})</strong> are valid!
                      </div>
                      <button
                        onClick={() => handleReassignOrder(ord)}
                        className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white py-2 text-xs font-bold shadow transition flex items-center justify-center gap-1.5"
                      >
                        <RefreshCw className="h-3.5 w-3.5" />
                        Forward Order to Another Available Franchise →
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* FRANCHISE SELECTOR & CHECKOUT MODAL */}
      <FranchiseSelectorModal
        isOpen={isFranchiseModalOpen}
        onClose={() => {
          setIsFranchiseModalOpen(false);
          setReassigningOrder(null);
          setDirectOrderProduct(undefined);
        }}
        stockType={directOrderProduct?.category?.includes('Activation') ? 'id_activation' : 'shopping'}
        directProduct={directOrderProduct}
        reassignOrderId={reassigningOrder?.id}
        onOrderSuccess={() => {
          setActiveTab('my_orders');
        }}
      />
    </div>
  );
};
