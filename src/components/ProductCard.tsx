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

  // Determine physical workshop stamp
  const isNos = product.condition.toLowerCase().includes('nos') || product.name.toLowerCase().includes('nos');
  const isOriginalOe = product.condition.toLowerCase().includes('originale') || product.brand.toLowerCase().includes('oem') || product.brand.toLowerCase().includes('original');

  return (
    <div className="bg-[#12151d] rounded-xl border border-[#222838] hover:border-[#ff5500] overflow-hidden flex flex-col group transition-all duration-300 relative shadow-md">
      
      {/* Top Badges & Physical Condition Stamp */}
      <div className="absolute top-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between pointer-events-none">
        {isNos ? (
          <span className="workshop-stamp stamp-nos">
            NOS D'EPOCA
          </span>
        ) : isOriginalOe ? (
          <span className="workshop-stamp stamp-oe">
            ORIGINALE OE
          </span>
        ) : (
          <span className="workshop-stamp stamp-aftermarket">
            {product.condition.toUpperCase()}
          </span>
        )}

        {activeVehicle && (
          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold flex items-center gap-1 backdrop-blur-md shadow-sm ${
            isCompatible 
              ? 'bg-[#0d1f17] text-[#00e5a3] border border-[#165037]' 
              : 'bg-[#261014] text-[#ff6b81] border border-[#521c24]'
          }`}>
            {isCompatible ? (
              <>
                <Check className="w-3 h-3 text-[#00e5a3]" />
                <span>Match {activeVehicle.make}</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-3 h-3 text-[#ff6b81]" />
                <span>Non compatibile</span>
              </>
            )}
          </span>
        )}
      </div>

      {/* Product Photography Container */}
      <Link href={`/prodotti/${product.slug}`} className="block relative aspect-square bg-[#090b10] overflow-hidden border-b border-[#1e2330]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f14] via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity" />
      </Link>

      {/* Product Information Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          
          {/* Brand & Technical OEM Code Badge */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#8a94a6] font-medium">{product.brand}</span>
            <span className="font-mono text-[#ff7830] bg-[#141720] px-2 py-0.5 rounded text-[11px] border border-[#2b3244] font-semibold" title="Codice OEM di riferimento">
              OE {product.oemCode}
            </span>
          </div>

          {/* Title */}
          <Link href={`/prodotti/${product.slug}`} className="block">
            <h3 className="text-sm font-bold text-[#f4efe6] group-hover:text-[#ff5500] transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Vehicle Compatibility Reference */}
          <div className="text-[11px] text-[#8a94a6] line-clamp-1">
            <span className="text-[#555f75]">Compatibile con: </span>
            {product.compatibility.map(c => `${c.make} ${c.model}`).slice(0, 2).join(', ')}
            {product.compatibility.length > 2 && ' ed altre'}
          </div>
        </div>

        {/* Pricing & Order Actions */}
        <div className="pt-3 border-t border-[#1e2330] space-y-3">
          
          {/* Dual Price Layout (Gross + Net for Workshops) */}
          <div className="flex items-baseline justify-between">
            <div>
              <div className="text-lg font-black text-[#f4efe6] font-mono tracking-tight">
                €{product.priceGross.toFixed(2)}
              </div>
              <div className="text-[10px] text-[#64748b] font-mono">
                €{product.priceNet.toFixed(2)} + IVA 22%
              </div>
            </div>

            <div className="text-right">
              {isOutOfStock ? (
                <span className="text-[10px] font-mono font-bold text-[#ff6b81] bg-[#261014] px-2 py-0.5 rounded border border-[#521c24]">
                  Esaurito
                </span>
              ) : (
                <div className="flex items-center gap-1 text-[11px] font-mono text-[#00e5a3]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00e5a3]"></span>
                  <span>Disp. ({product.stock} pz)</span>
                </div>
              )}
              <div className="text-[10px] text-[#64748b] font-mono">
                Sped. €{product.shippingCost.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Buttons: Add to Cart & WhatsApp Pre-Check */}
          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={() => addToCart(product, 1)}
              disabled={isOutOfStock}
              className={`col-span-3 py-2 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm ${
                isOutOfStock
                  ? 'bg-[#1b202c] text-[#555f75] cursor-not-allowed border border-[#262c3a]'
                  : 'bg-[#ff5500] hover:bg-[#e64a19] text-white shadow-[#ff5500]/20 cursor-pointer'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Aggiungi al Carrello</span>
            </button>

            <button
              onClick={handleWhatsApp}
              title="Richiedi verifica compatibilità su WhatsApp"
              className="col-span-1 py-2 rounded-lg bg-[#00e5a3]/10 hover:bg-[#00e5a3]/20 text-[#00e5a3] border border-[#00e5a3]/30 flex items-center justify-center transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
