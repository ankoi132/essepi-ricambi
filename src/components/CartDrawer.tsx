'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useStore } from '@/lib/store';

export default function CartDrawer() {
  const router = useRouter();
  const { 
    isCartDrawerOpen, 
    setIsCartDrawerOpen, 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    cartCount,
    cartSubtotalNet,
    cartVat,
    cartTotalGross 
  } = useStore();

  if (!isCartDrawerOpen) return null;

  const freeShippingThreshold = 149.00;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartTotalGross);
  const freeShippingProgress = Math.min(100, (cartTotalGross / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-950 border-l border-slate-800 shadow-2xl flex flex-col text-white">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold">Il Tuo Carrello ({cartCount})</h2>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-slate-900 px-5 py-3 border-b border-slate-800 text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="flex items-center gap-1.5 font-medium text-slate-300">
                <Truck className="w-3.5 h-3.5 text-cyan-400" />
                {remainingForFreeShipping > 0
                  ? <span>Mancano <strong className="text-orange-400">€{remainingForFreeShipping.toFixed(2)}</strong> per la spedizione gratuita!</span>
                  : <span className="text-emerald-400 font-bold">Hai diritto alla Spedizione Gratuita! 🎉</span>}
              </span>
              <span className="text-[11px] text-slate-400 font-mono">{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-orange-500 to-emerald-400 h-full transition-all duration-300 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-slate-800/60">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-slate-400 space-y-3">
                <ShoppingBag className="w-12 h-12 text-slate-600 stroke-1" />
                <p className="text-sm font-medium">Il tuo carrello è attualmente vuoto.</p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    router.push('/catalogo');
                  }}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-colors shadow-md"
                >
                  Sfoglia il Catalogo Ricambi
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.product.id} className="pt-4 first:pt-0 flex gap-3 group">
                  <div className="w-16 h-16 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/prodotti/${item.product.slug}`}
                      onClick={() => setIsCartDrawerOpen(false)}
                      className="text-xs font-semibold text-slate-200 hover:text-orange-400 line-clamp-2 transition-colors"
                    >
                      {item.product.name}
                    </Link>
                    <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                      OEM: {item.product.oemCode}
                    </div>

                    <div className="flex items-center justify-between mt-2.5">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-slate-700 rounded-lg overflow-hidden bg-slate-900 text-xs">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-slate-400 hover:text-white hover:bg-slate-800"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 font-mono font-bold text-white text-xs">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="px-2 py-0.5 text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-40"
                        >
                          +
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <div className="text-xs font-bold text-emerald-400 font-mono">
                          €{(item.product.priceGross * item.quantity).toFixed(2)}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          (IVA 22% incl.)
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-slate-500 hover:text-red-400 p-1 transition-colors"
                        title="Rimuovi dal carrello"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Italian Fiscality Breakdown */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-800 bg-slate-900/60 space-y-3">
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Totale Imponibile (Netto):</span>
                  <span className="font-mono">€{cartSubtotalNet.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>IVA di Legge (22%):</span>
                  <span className="font-mono">€{cartVat.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Spedizione prevista:</span>
                  <span className="font-mono text-emerald-400">
                    {remainingForFreeShipping === 0 ? 'GRATUITA' : 'da €7,90'}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-bold text-white">
                  <span>Totale da Pagare:</span>
                  <span className="text-base text-orange-400 font-mono">
                    €{cartTotalGross.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Guarantees note */}
              <div className="flex items-center gap-2 text-[11px] text-slate-400 bg-slate-950/80 p-2 rounded-lg border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Garanzia 24 Mesi • Diritto di recesso 14gg • Fattura immediata</span>
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    router.push('/carrello');
                  }}
                  className="py-2.5 px-3 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-850 text-xs font-semibold text-slate-300 text-center transition-colors"
                >
                  Vedi Carrello
                </button>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    router.push('/checkout');
                  }}
                  className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:brightness-110 text-xs font-bold text-white flex items-center justify-center gap-1.5 shadow-lg shadow-orange-500/20 transition-all"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
