import React, { useState } from 'react';
import { X, Check, ShoppingBag, ArrowRight, Shield, Truck, RotateCcw, CheckCircle2 } from 'lucide-react';
import { NothingProduct } from '../data/nothingStoreData';

interface ProductDetailModalProps {
  product: NothingProduct;
  currency: 'INR' | 'USD';
  onClose: () => void;
  onAddToCart: (product: NothingProduct) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  currency,
  onClose,
  onAddToCart
}) => {
  const [selectedColor, setSelectedColor] = useState('White');
  const [isOrdered, setIsOrdered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerCity, setCustomerCity] = useState('');

  const formatPrice = () => {
    if (currency === 'INR') {
      return product.priceINR ? `₹${product.priceINR.toLocaleString('en-IN')}` : 'Free Public Beta';
    } else {
      return product.priceUSD ? `$${product.priceUSD.toLocaleString('en-US')}` : 'Free Public Beta';
    }
  };

  const handleSimulateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerEmail) return;

    setIsSubmitting(true);
    try {
      // Dispatch order notice to backend leads pipeline
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: customerEmail.split('@')[0],
          email: customerEmail,
          phone: '+91 99887 76655',
          company: customerCity || 'Nothing Customer',
          services: [product.id],
          budget: currency === 'INR' ? '2L-5L' : 'standard',
          projectDetails: `Pre-order for ${product.name} (${selectedColor}) in ${currency}`
        })
      });
    } catch {
      // Continue
    } finally {
      setIsSubmitting(false);
      setIsOrdered(true);
      onAddToCart(product);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] rounded-3xl bg-[#121212] border border-[#333] shadow-[0_0_60px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden text-white font-mono"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Strip */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#181818] border-b border-[#262626]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff2a2a]" />
            <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
              {product.name} • Hardware Specification
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#737373] hover:text-white hover:bg-[#262626] transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {!isOrdered ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Product Visual */}
              <div className="md:col-span-5 rounded-2xl bg-[#0c0c0c] border border-[#222] p-6 flex flex-col items-center justify-center space-y-4">
                {product.productImage ? (
                  <img
                    src={product.productImage}
                    alt={product.name}
                    className="w-full max-w-[200px] h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
                  />
                ) : (
                  <img
                    src={product.heroImage}
                    alt={product.name}
                    className="w-full h-44 object-cover rounded-xl"
                  />
                )}
                <div className="text-center">
                  <span className="text-lg font-bold text-white uppercase block">
                    {product.name}
                  </span>
                  <span className="text-xs text-[#ff2a2a] block mt-0.5">
                    {product.tagline}
                  </span>
                </div>
              </div>

              {/* Order Form & Highlights */}
              <div className="md:col-span-7 space-y-6">
                <div className="flex items-baseline justify-between border-b border-[#222] pb-4">
                  <div>
                    <span className="text-[10px] text-[#737373] uppercase tracking-wider block">
                      PRICE ({currency})
                    </span>
                    <span className="text-3xl font-bold text-white">{formatPrice()}</span>
                  </div>
                  <span className="text-xs text-[#4edea3] flex items-center gap-1">
                    <Check size={14} /> Available for dispatch
                  </span>
                </div>

                {/* Color Selection */}
                <div className="space-y-2">
                  <span className="text-xs text-[#737373] uppercase tracking-wider block">
                    Select Finish:
                  </span>
                  <div className="flex items-center gap-2">
                    {['White', 'Dark Grey / Black'].map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-xl text-xs border transition-all cursor-pointer ${
                          selectedColor === color
                            ? 'bg-white text-black border-white font-bold'
                            : 'bg-[#171717] text-[#a3a3a3] border-[#292929] hover:border-[#444]'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pre-order Input Form */}
                <form onSubmit={handleSimulateOrder} className="space-y-3">
                  <span className="text-xs text-[#737373] uppercase tracking-wider block">
                    Fast Checkout (Simulated)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="Email for dispatch updates"
                      className="px-3 py-2.5 rounded-xl bg-[#141414] border border-[#2e2e2e] text-xs text-white focus:outline-none focus:border-white"
                    />
                    <input
                      type="text"
                      value={customerCity}
                      onChange={(e) => setCustomerCity(e.target.value)}
                      placeholder="City (e.g. Mumbai, Lucknow)"
                      className="px-3 py-2.5 rounded-xl bg-[#141414] border border-[#2e2e2e] text-xs text-white focus:outline-none focus:border-white"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-[#e5e5e5] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                  >
                    <ShoppingBag size={15} />
                    <span>{isSubmitting ? 'Confirming...' : `Order ${product.name}`}</span>
                  </button>
                </form>

                {/* Guarantees */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#222] text-[10px] text-[#737373]">
                  <div className="flex items-center gap-1.5">
                    <Truck size={13} className="text-[#4edea3]" />
                    <span>Free Shipping</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Shield size={13} className="text-[#4cd7f6]" />
                    <span>1 Year Warranty</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <RotateCcw size={13} className="text-[#ffb74d]" />
                    <span>7-Day Return</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Order Success View */
            <div className="p-8 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#4edea3]/20 border border-[#4edea3]/40 text-[#4edea3] flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(78,222,163,0.3)]">
                <CheckCircle2 size={36} />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white">Order Confirmed!</h4>
                <p className="text-xs text-[#a3a3a3] mt-2 max-w-md mx-auto">
                  Receipt dispatched for <strong className="text-white">{product.name}</strong> ({selectedColor}). A tracking link has been routed to <span className="text-[#ff2a2a]">{customerEmail}</span> and notified to <span className="text-white">pixelgrove.ai@gmail.com</span>.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#0c0c0c] border border-[#222] text-left text-xs font-mono max-w-md mx-auto space-y-1 text-[#a3a3a3]">
                <p>ORDER_ID: NOTH-IN-{Date.now().toString().slice(-6)}</p>
                <p>ITEM: {product.name} ({selectedColor})</p>
                <p>AMOUNT: {formatPrice()}</p>
                <p className="text-[#4edea3]">STATUS: Priority Warehouse Queue (Gurugram NCR Hub)</p>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-white text-black font-bold text-xs uppercase cursor-pointer"
              >
                Continue Browsing
              </button>
            </div>
          )}

          {/* Full Technical Specifications Accordion Table */}
          {product.specs && (
            <div className="space-y-4 pt-6 border-t border-[#222]">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Full Technical Specifications
              </h4>
              <div className="rounded-2xl border border-[#222] overflow-hidden">
                {Object.entries(product.specs).map(([label, value], i) => (
                  <div
                    key={label}
                    className={`grid grid-cols-1 sm:grid-cols-12 p-3 text-xs ${
                      i % 2 === 0 ? 'bg-[#141414]' : 'bg-[#0f0f0f]'
                    } border-b border-[#1f1f1f] last:border-b-0`}
                  >
                    <span className="sm:col-span-4 text-[#737373] uppercase">{label}</span>
                    <span className="sm:col-span-8 text-white font-medium mt-0.5 sm:mt-0">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
