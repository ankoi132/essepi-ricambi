'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Check, ShieldCheck, Wrench, MessageSquare, AlertCircle } from 'lucide-react';
import { Product } from '@/lib/types';
import { useStore } from '@/lib/store';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, activeVehicle, isVehicleCompatible } = useStore();

  const isCompatible = activeVehicle ? isVehicleCompatible(product, activeVehicle) : null;
  const isOutOfStock = product.stock <= 0;

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const msg = encodeURIComponent(
      `Salve Essepi Ricambi, vorrei informazioni sulla disponibilità e compatibilità del ricambio: "${product.name}" (Codice OEM: ${product.oemCode}).`
    );
    window.open(`https://wa.me/393461811152?text=${msg}`, '_blank');
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col group transition-all duration-300 hover:border-orange-500/40 relative">
      
      {/* Top badges */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <span className="px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-900/90 text-orange-400 border border-orange-500/30 backdrop-blur-md shadow-sm">
          {product.condition}
        </span>

        {activeVehicle && (
          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1 backdrop-blur-md shadow-sm ${
            isCompatible 
              ? 'bg-emerald-950/90 text-emerald-400 border border-emerald-500/40' 
              : 'bg-red-950/90 text-red-300 border border-red-500/30'
          }`}>
            {isCompatible ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span>Compatibile {activeVehicle.make}</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-3 h-3 text-red-400" />
                <span>Non compatibile</span>
              </>
            )}
          </span>
        )}
      </div>

      {/* Image Container with Zoom */}
      <Link href={`/prodotti/${product.slug}`} className="block relative aspect-square bg-slate-900/80 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
      </Link>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          
          {/* Brand & OEM Code */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">{product.brand}</span>
            <span className="font-mono text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded text-[11px] border border-orange-500/20 font-semibold" title="Codice OEM di riferimento">
              OEM: {product.oemCode}
            </span>
          </div>

          {/* Title */}
          <Link href={`/prodotti/${product.slug}`} className="block">
            <h3 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Compatibility Hint */}
          <div className="text-[11px] text-slate-400 line-clamp-1">
            <span className="text-slate-500">Per: </span>
            {product.compatibility.map(c => `${c.make} ${c.model}`).slice(0, 2).join(', ')}
            {product.compatibility.length > 2 && ' ed altre'}
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-4 mt-3 border-t border-slate-800/80 space-y-3">
          
          {/* Prices & Stock */}
          <div className="flex items-baseline justify-between">
            <div>
              <div className="text-lg font-black text-white font-mono tracking-tight">
                €{product.priceGross.toFixed(2)}
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                €{product.priceNet.toFixed(2)} + IVA 22%
              </div>
            </div>

            <div className="text-right">
              {isOutOfStock ? (
                <span className="text-[11px] font-bold text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-800/50">
                  Esaurito
                </span>
              ) : (
                <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Disp. ({product.stock} pz)</span>
                </div>
              )}
              <div className="text-[10px] text-slate-400">
                Sped. €{product.shippingCost.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Buttons: Add to cart & WhatsApp */}
          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={() => addToCart(product, 1)}
              disabled={isOutOfStock}
              className={`col-span-3 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/20 active:scale-95'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Aggiungi al Carrello</span>
            </button>

            <button
              onClick={handleWhatsApp}
              title="Richiedi compatibilità o foto su WhatsApp"
              className="col-span-1 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 flex items-center justify-center transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
