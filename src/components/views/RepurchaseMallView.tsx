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
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';

export const RepurchaseMallView: React.FC = () => {
  const { user, products, processShoppingOrder, addToast } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [cart, setCart] = useState<{ [id: string]: number }>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const categories = ['All', 'Health & Wellness', 'Electronics & Gadgets', 'Home & Lifestyle', 'Personal Care'];

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const cartTotalAmount = Object.entries(cart).reduce((acc: number, [id, qty]: [string, number]) => {
    const p = products.find((x) => x.id === id);
    return acc + (p ? p.price * Number(qty) : 0);
  }, 0);

  const cartTotalPV = Object.entries(cart).reduce((acc: number, [id, qty]: [string, number]) => {
    const p = products.find((x) => x.id === id);
    return acc + (p ? p.pv * Number(qty) : 0);
  }, 0);

  const cartTotalItems: number = (Object.values(cart) as number[]).reduce((a: number, b: number) => a + b, 0);

  const handleAddToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    addToast({
      type: 'success',
      title: 'Added to Cart',
      message: 'Item added to your Repurchase cart',
    });
  };

  const handleCheckout = async () => {
    if (cartTotalItems === 0) {
      addToast({
        type: 'error',
        title: 'Cart Empty',
        message: 'Please add items to cart before checking out',
      });
      return;
    }

    const availableBal = user.repurchaseBalance + user.eWalletBalance;
    if (cartTotalAmount > availableBal) {
      addToast({
        type: 'error',
        title: 'Insufficient Balance',
        message: `Total cost ₹${cartTotalAmount} exceeds Repurchase + E-Wallet balance (₹${availableBal.toFixed(2)})`,
      });
      return;
    }

    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 1400));

    const firstItem = Object.keys(cart)[0];
    const productObj = products.find((p) => p.id === firstItem) || products[0];

    const success = await processShoppingOrder(
      productObj,
      cart[firstItem] || 1,
      cartTotalAmount,
      cartTotalPV
    );

    setIsProcessing(false);
    if (success) {
      setCart({});
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-6 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6 text-indigo-200" />
            <h1 className="text-2xl font-black tracking-tight text-white">SPAY360 Repurchase Mall</h1>
          </div>
          <p className="text-xs text-indigo-100/80">
            Shop premium products with your Repurchase Wallet & generate BV/PV points for team level income
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="rounded-2xl bg-white/20 backdrop-blur-md px-4 py-2 text-right border border-white/20">
            <span className="text-[10px] text-indigo-200 uppercase font-semibold">Repurchase Balance</span>
            <div className="text-lg font-black text-amber-300">₹{user.repurchaseBalance.toFixed(3)}</div>
          </div>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCategory(c)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === c
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 border border-slate-100 dark:border-slate-700'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Products Grid & Cart Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Product Cards */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="rounded-3xl bg-white p-4 shadow-sm border border-slate-100 dark:bg-slate-800/90 dark:border-slate-700/80 flex flex-col justify-between hover:shadow-lg transition-all"
            >
              <div>
                {/* Image placeholder with icon */}
                <div className="h-36 rounded-2xl bg-gradient-to-tr from-slate-100 to-indigo-50 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center relative overflow-hidden mb-3">
                  <div className="p-4 rounded-3xl bg-white/80 dark:bg-slate-900/80 shadow-md">
                    <Package className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <span className="absolute top-2.5 right-2.5 rounded-full bg-indigo-600 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
                    {p.pv} PV Points
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

              <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 mt-3 flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-base font-black text-slate-800 dark:text-slate-100">
                      ₹{p.price}
                    </span>
                    <span className="text-xs line-through text-slate-400">₹{p.originalPrice}</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                    BV: {p.bv} Pts
                  </span>
                </div>

                <button
                  onClick={() => handleAddToCart(p.id)}
                  className="px-3.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300 font-bold text-xs transition-all cursor-pointer shadow-xs"
                >
                  + Add ({cart[p.id] || 0})
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Checkout Box */}
        <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-100 dark:bg-slate-800/90 dark:border-slate-700/80 space-y-4 h-fit">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-700">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                Order Summary ({cartTotalItems})
              </h3>
            </div>
            {cartTotalItems > 0 && (
              <button
                onClick={() => setCart({})}
                className="text-[10px] text-rose-500 font-bold hover:underline cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">Subtotal Price:</span>
              <span className="font-bold text-slate-800 dark:text-slate-100">₹{cartTotalAmount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">PV Generated:</span>
              <span className="font-bold text-amber-500">+{cartTotalPV} PV</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">Delivery:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">FREE</span>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3 dark:border-slate-700">
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="text-slate-400">Payment Source:</span>
              <span className="font-bold text-indigo-600 dark:text-indigo-400">
                Repurchase / E-Wallet
              </span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={cartTotalItems === 0 || isProcessing}
              className="btn-3d flex w-full items-center justify-center space-x-2 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 disabled:opacity-50 cursor-pointer"
            >
              {isProcessing ? (
                <div className="flex items-center space-x-2">
                  <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Processing Order...</span>
                </div>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" />
                  <span>Place Order (₹{cartTotalAmount})</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
