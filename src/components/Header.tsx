'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  ShoppingCart, 
  Car, 
  Wrench, 
  ShieldCheck, 
  PhoneCall, 
  LayoutDashboard, 
  Menu, 
  X,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { INITIAL_CATEGORIES } from '@/lib/data';

export default function Header() {
  const router = useRouter();
  const { 
    cartCount, 
    cartTotalGross, 
    setIsCartDrawerOpen, 
    activeVehicle, 
    setIsVehicleModalOpen, 
    clearActiveVehicle,
    products
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Live auto-complete suggestions
  const searchSuggestions = searchQuery.trim().length > 1
    ? products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.oemCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/catalogo?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchFocused(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top Notice Bar */}
      <div className="bg-gradient-to-r from-slate-950 via-zinc-900 to-slate-950 border-b border-white/5 py-1.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-slate-300">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-orange-400 font-semibold tracking-wide">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              MAGAZZINO ATTIVO
            </span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="hidden sm:inline">Oltre 4.400 ricambi disponibili • Evasione in 24 ore con corriere espresso</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <Link 
              href="https://www.ebay.it/str/essepiricambi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              100% Feedback su eBay
            </Link>
            <a 
              href="https://wa.me/393461811152" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              Assistenza WhatsApp: +39 346 181 1152
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="glass-panel backdrop-blur-xl border-b border-white/10 bg-slate-950/85">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 via-amber-600 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-all duration-300">
              <Wrench className="w-6 h-6 text-white transform -rotate-12 group-hover:rotate-0 transition-transform" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-white uppercase font-sans">
                  ESSEPI<span className="text-orange-500">RICAMBI</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-wide">
                Ricambi Originali & Aftermarket Certificati
              </p>
            </div>
          </Link>

          {/* Search Bar with Live Suggestions */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4 relative">
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <input
                type="text"
                placeholder="Cerca per codice OEM (es. 04466-0F010), ricambio o vettura..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 250)}
                className="w-full pl-11 pr-24 py-2.5 bg-slate-900/90 text-sm text-white placeholder-slate-400 rounded-xl border border-slate-700/60 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
              >
                Cerca
              </button>
            </form>

            {/* Live Search Suggestions Dropdown */}
            {isSearchFocused && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-50">
                <div className="text-[11px] font-semibold text-slate-400 px-3 py-1 uppercase tracking-wider">
                  Suggerimenti Ricambi
                </div>
                {searchSuggestions.map((item) => (
                  <Link
                    key={item.id}
                    href={`/prodotti/${item.slug}`}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    <div className="w-10 h-10 rounded bg-slate-800 flex-shrink-0 overflow-hidden border border-slate-700">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-white truncate">{item.name}</div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2">
                        <span className="text-orange-400 font-mono">OEM: {item.oemCode}</span>
                        <span>•</span>
                        <span>{item.brand}</span>
                      </div>
                    </div>
                    <div className="text-xs font-bold text-emerald-400">
                      €{item.priceGross.toFixed(2)}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            
            {/* Interactive Vehicle Selector Button */}
            <button
              onClick={() => setIsVehicleModalOpen(true)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                activeVehicle
                  ? 'bg-orange-500/10 border-orange-500 text-orange-400'
                  : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:border-slate-500'
              }`}
              title="Filtra per la tua auto"
            >
              <Car className="w-4 h-4 text-orange-400" />
              <div className="text-left hidden lg:block">
                <div className="text-[10px] text-slate-400 uppercase leading-none font-bold">La tua auto</div>
                <div className="truncate max-w-[130px] font-semibold">
                  {activeVehicle ? `${activeVehicle.make} ${activeVehicle.model || ''}` : 'Seleziona auto'}
                </div>
              </div>
              {activeVehicle && (
                <span 
                  onClick={(e) => { e.stopPropagation(); clearActiveVehicle(); }} 
                  className="ml-1 p-0.5 hover:text-white rounded text-slate-400"
                  title="Rimuovi filtro auto"
                >
                  <X className="w-3.5 h-3.5" />
                </span>
              )}
            </button>

            {/* Always-visible non-intrusive Contacts link */}
            <Link
              href="/contatti"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-xs font-semibold text-slate-200 hover:text-white transition-all shadow-sm"
              title="Assistenza e Contatti Essepi Ricambi"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span className="hidden xs:inline sm:inline">Contatti</span>
            </Link>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs transition-all shadow-md shadow-orange-500/20 active:scale-95"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Carrello</span>
              {cartCount > 0 && (
                <span className="px-1.5 py-0.5 bg-white text-orange-600 rounded-full text-[11px] font-black leading-none shadow">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="hidden md:block border-t border-white/5 bg-slate-950/60 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-medium text-slate-300 py-2.5 overflow-x-auto">
            <div className="flex items-center gap-6">
              <Link href="/catalogo" className="hover:text-orange-400 transition-colors font-bold text-white flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                TUTTO IL CATALOGO
              </Link>
              {INITIAL_CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/catalogo?categoria=${cat.slug}`}
                  className="hover:text-orange-400 transition-colors whitespace-nowrap"
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4 text-slate-400">
              <Link href="/spedizioni" className="hover:text-white transition-colors">
                Spedizioni 24/48h
              </Link>
              <Link href="/recesso" className="hover:text-white transition-colors">
                Garanzia & Resi
              </Link>
              <Link href="/contatti" className="hover:text-white transition-colors">
                Contatti
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 p-4 space-y-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Cerca ricambio, OEM o vettura..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 text-sm text-white rounded-lg border border-slate-700"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </form>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-xs">
            <Link 
              href="/catalogo" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 rounded bg-slate-900 text-orange-400 font-bold"
            >
              Catalogo Completo
            </Link>
            <Link 
              href="/contatti" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 rounded bg-slate-900 text-emerald-400 font-bold"
            >
              Contatti & WhatsApp
            </Link>
          </div>

          <div className="space-y-1 pt-2 border-t border-slate-800">
            <div className="text-[11px] font-bold text-slate-500 uppercase px-2 mb-1">Categorie Principali</div>
            {INITIAL_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/catalogo?categoria=${cat.slug}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded text-xs text-slate-300 hover:bg-slate-900"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
