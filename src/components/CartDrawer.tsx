import React from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { NothingProduct } from '../data/nothingStoreData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: { product: NothingProduct; quantity: number }[];
  currency: 'INR' | 'USD';
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onRemoveItem,
  onClearCart
}) => {
  if (!isOpen) return null;

  const calculateTotal = () => {
    return items.reduce((acc, item) => {
      const price =
        currency === 'INR'
          ? item.product.priceINR || 0
          : item.product.priceUSD || 0;
      return acc + price * item.quantity;
    }, 0);
  };

  const total = calculateTotal();

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-md h-full bg-[#121212] border-l border-[#262626] shadow-2xl flex flex-col font-mono text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#222]">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-[#ff2a2a]" />
            <span className="font-bold text-sm uppercase tracking-wider">
              Shopping Bag ({items.length})
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#737373] hover:text-white cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Bag Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#1c1c1c] flex items-center justify-center text-[#737373]">
                <ShoppingBag size={22} />
              </div>
              <p className="text-xs text-[#737373]">Your shopping bag is empty.</p>
            </div>
          ) : (
            items.map(({ product, quantity }) => {
              const itemPrice =
                currency === 'INR'
                  ? `₹${(product.priceINR || 0).toLocaleString('en-IN')}`
                  : `$${(product.priceUSD || 0).toLocaleString('en-US')}`;

              return (
                <div
                  key={product.id}
                  className="p-4 rounded-2xl bg-[#0c0c0c] border border-[#222] flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    {product.productImage ? (
                      <img
                        src={product.productImage}
                        alt={product.name}
                        className="w-12 h-12 object-contain"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-[#1c1c1c] flex items-center justify-center text-[10px] text-[#ff2a2a] font-bold">
                        OS
                      </div>
                    )}
                    <div>
                      <span className="font-bold text-xs uppercase block text-white">
                        {product.name}
                      </span>
                      <span className="text-[11px] text-[#737373]">
                        Qty: {quantity} • {itemPrice}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(product.id)}
                    className="p-2 text-[#737373] hover:text-[#ff2a2a] transition-colors cursor-pointer"
                    title="Remove Item"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Checkout Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-[#222] bg-[#141414] space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#737373] uppercase">Estimated Total</span>
              <span className="text-xl font-bold text-white">
                {currency === 'INR'
                  ? `₹${total.toLocaleString('en-IN')}`
                  : `$${total.toLocaleString('en-US')}`}
              </span>
            </div>

            <button
              onClick={() => {
                alert(`Order placed! Confirmation and dispatch notice sent to pixelgrove.ai@gmail.com.`);
                onClearCart();
                onClose();
              }}
              className="w-full py-3.5 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-[#e0e0e0] flex items-center justify-center gap-2 cursor-pointer transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={15} />
            </button>

            <div className="flex items-center justify-between text-[10px] text-[#737373]">
              <span>Taxes included</span>
              <span>Express courier from Gurugram</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
