'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShoppingBag, 
  Trash2, 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  ArrowLeft,
  Tag,
  CreditCard,
  MessageSquare
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { SHIPPING_METHODS } from '@/lib/data';
import { ShippingMethod } from '@/lib/types';

export default function CartPage() {
  const router = useRouter();
  const { 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    clearCart,
    cartSubtotalNet,
    cartVat,
    cartTotalGross 
  } = useStore();

  const [selectedShipping, setSelectedShipping] = useState<ShippingMethod>(SHIPPING_METHODS[0]);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);

  const freeShippingThreshold = 149.00;
  const isFreeShippingEligible = cartTotalGross >= freeShippingThreshold && selectedShipping.id === 'express_standard';
  const shippingCost = isFreeShippingEligible ? 0 : selectedShipping.price;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'BENVENUTO5') {
      const discount = parseFloat((cartTotalGross * 0.05).toFixed(2));
      setCouponDiscount(discount);
      setCouponApplied(true);
    } else {
      alert('Codice promozionale non valido o scaduto.');
    }
  };

  const finalTotal = Math.max(0, cartTotalGross - couponDiscount + shippingCost);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 text-slate-500 flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10 stroke-1" />
        </div>
        <h1 className="text-2xl font-bold text-white">Il tuo carrello è vuoto</h1>
        <p className="text-slate-400 text-xs max-w-sm mx-auto">
          Non hai ancora aggiunto alcun ricambio al tuo ordine. Sfoglia il nostro catalogo con oltre 4.400 pezzi disponibili a magazzino.
        </p>
        <Link
          href="/catalogo"
          className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-orange-500/20"
        >
          <span>Esplora il Catalogo Ricambi</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
            Carrello Acquisti ({cart.length} {cart.length === 1 ? 'articolo' : 'articoli'})
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Verifica gli articoli, seleziona la modalità di spedizione e procedi al pagamento sicuro.
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-slate-400 hover:text-red-400 transition-colors flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Svuota carrello</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left: Cart Items List & Shipping selector */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="glass-card rounded-2xl border border-slate-800 divide-y divide-slate-800/80 overflow-hidden">
            {cart.map((item) => (
              <div key={item.product.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                
                {/* Product Image */}
                <div className="w-20 h-20 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="text-orange-400 font-semibold">{item.product.brand}</span>
                    <span className="text-slate-500">•</span>
                    <span className="font-mono text-slate-400">OEM: {item.product.oemCode}</span>
                  </div>
                  <Link
                    href={`/prodotti/${item.product.slug}`}
                    className="text-sm font-bold text-white hover:text-orange-400 transition-colors line-clamp-2"
                  >
                    {item.product.name}
                  </Link>
                  <div className="text-[11px] text-slate-400">
                    Posizione magazzino: {item.product.location}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center border border-slate-700 rounded-xl overflow-hidden bg-slate-900 text-xs">
                  <button
                    onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                    className="px-3 py-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3.5 py-1.5 font-mono font-bold text-white text-xs">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                    disabled={item.quantity >= item.product.stock}
                    className="px-3 py-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors disabled:opacity-40"
                  >
                    +
                  </button>
                </div>

                {/* Price */}
                <div className="text-right min-w-[100px]">
                  <div className="text-base font-black text-white font-mono">
                    €{(item.product.priceGross * item.quantity).toFixed(2)}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    (IVA 22% inclusa)
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                  title="Elimina articolo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

              </div>
            ))}
          </div>

          {/* Shipping Options Box */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
              <Truck className="w-4 h-4 text-cyan-400" />
              <span>Opzioni di Spedizione in Italia</span>
            </div>

            <div className="space-y-3">
              {SHIPPING_METHODS.map((method) => {
                const isSelected = selectedShipping.id === method.id;
                const isFree = method.id === 'express_standard' && cartTotalGross >= freeShippingThreshold;
                const cost = isFree ? 0 : method.price;

                return (
                  <label
                    key={method.id}
                    onClick={() => setSelectedShipping(method)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-orange-500/10 border-orange-500 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={isSelected}
                        onChange={() => setSelectedShipping(method)}
                        className="accent-orange-500 w-4 h-4"
                      />
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-2">
                          <span>{method.name}</span>
                          {isFree && (
                            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold">
                              OMAGGIO
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {method.description} • <em>{method.estimatedDays}</em>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs font-mono font-bold text-right ml-4">
                      {cost === 0 ? (
                        <span className="text-emerald-400">GRATIS</span>
                      ) : (
                        <span>€{cost.toFixed(2)}</span>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Assistance Note */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Dubbi prima di ordinare? Scrivici subito su WhatsApp</span>
            </span>
            <a
              href="https://wa.me/393461811152"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 font-bold hover:underline"
            >
              +39 346 181 1152
            </a>
          </div>

        </div>

        {/* Right: Order Summary & Italian Fiscality */}
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-5 sticky top-28">
            
            <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              Riepilogo Ordine & Fisco
            </h2>

            {/* Fiscal Breakdown */}
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Totale Imponibile Netto:</span>
                <span className="font-mono text-white">€{cartSubtotalNet.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-slate-400">
                <span>IVA ad aliquota 22%:</span>
                <span className="font-mono">€{cartVat.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-slate-400">
                <span>Spese di Spedizione:</span>
                <span className="font-mono text-white">
                  {shippingCost === 0 ? <strong className="text-emerald-400">GRATUITA</strong> : `€${shippingCost.toFixed(2)}`}
                </span>
              </div>

              {couponApplied && (
                <div className="flex justify-between text-emerald-400">
                  <span>Sconto Coupon (5%):</span>
                  <span className="font-mono">-€{couponDiscount.toFixed(2)}</span>
                </div>
              )}

              <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline text-sm font-bold text-white">
                <span>Totale da Pagare:</span>
                <span className="text-2xl font-black text-orange-400 font-mono">
                  €{finalTotal.toFixed(2)}
                </span>
              </div>
              <div className="text-[10px] text-right text-slate-400 font-mono">
                Tasse e imposte incluse a norma di legge
              </div>
            </div>

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2 pt-2 border-t border-slate-800">
              <input
                type="text"
                placeholder="Codice coupon (es. BENVENUTO5)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 py-2 px-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white uppercase placeholder:normal-case placeholder-slate-500 focus:outline-none focus:border-orange-500 font-mono"
              />
              <button
                type="submit"
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white rounded-xl transition-colors"
              >
                Applica
              </button>
            </form>

            {/* Proceed to Checkout CTA */}
            <button
              onClick={() => router.push('/checkout')}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:brightness-110 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-orange-500/25 transition-all cursor-pointer"
            >
              <span>Procedi al Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Trust points */}
            <div className="space-y-2 pt-2 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Garanzia 24 mesi su tutti i ricambi</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span>Pagamento sicuro con crittografia SSL a 256-bit</span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
