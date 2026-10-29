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
    <header className="sticky top-0 z-40 w-full bg-[#0d0f14]">
      {/* Top Heritage Notice Bar */}
      <div className="bg-[#090b10] border-b border-[#1e2330] py-1.5 px-4 text-xs font-mono">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-[#8a94a6]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[#ff5500] font-bold tracking-wide text-[11px]">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00e5a3]"></span>
              ESSEPI RICAMBI • MODENA // MOTOR VALLEY
            </span>
            <span className="hidden sm:inline text-[#2d3548]">|</span>
            <span className="hidden sm:inline text-[#9aa4bc]">Fondi di magazzino New Old Stock & Ricambi OE certificati</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <Link 
              href="https://www.ebay.it/str/essepiricambi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#8a94a6] hover:text-[#f4efe6] transition-colors flex items-center gap-1 text-[11px]"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#00b4d8]" />
              <span>3.600+ Recensioni (100% Feedback)</span>
            </Link>
            <a 
              href="https://wa.me/393461811152" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#00e5a3] hover:text-[#00c98f] transition-colors flex items-center gap-1 font-semibold text-[11px]"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>WhatsApp: +39 346 181 1152</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-[#0d0f14]/95 backdrop-blur-md border-b border-[#1e2330]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#141720] border border-[#2b3244] flex items-center justify-center group-hover:border-[#ff5500] transition-colors">
              <Wrench className="w-5 h-5 text-[#ff5500]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-[#f4efe6] uppercase font-sans">
                  ESSEPI<span className="text-[#ff5500]">RICAMBI</span>
                </span>
                <span className="text-[9px] uppercase font-mono font-bold tracking-widest px-1.5 py-0.2 rounded bg-[#1e2330] text-[#e5a93b] border border-[#2d3548]">
                  OFFICINA
                </span>
              </div>
              <p className="text-[10px] text-[#8a94a6] font-mono tracking-wide">
                Archivio Ricambi Originali & NOS
              </p>
            </div>
          </Link>

          {/* Search Bar with Live Suggestions */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4 relative">
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <input
                type="text"
                placeholder="Cerca per codice OE (es. 04466-0F010), ricambio o modello auto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 250)}
                className="w-full pl-10 pr-24 py-2.5 bg-[#12151d] text-xs text-[#f4efe6] placeholder-[#555f75] rounded-xl border border-[#222838] focus:border-[#ff5500] focus:outline-none transition-all font-medium"
              />
              <Search className="w-4 h-4 text-[#555f75] absolute left-3.5 top-3" />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-3.5 bg-[#ff5500] hover:bg-[#e64a19] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                Cerca
              </button>
            </form>

            {/* Live Search Suggestions Dropdown */}
            {isSearchFocused && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#12151d] border border-[#2b3244] rounded-xl shadow-2xl p-2 z-50">
                <div className="text-[10px] font-mono font-bold text-[#8a94a6] px-3 py-1 uppercase tracking-wider">
                  Corrispondenze a Magazzino
                </div>
                {searchSuggestions.map((item) => (
                  <Link
                    key={item.id}
                    href={`/prodotti/${item.slug}`}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1b202c] transition-colors"
                  >
                    <div className="w-9 h-9 rounded bg-[#090b10] flex-shrink-0 overflow-hidden border border-[#222838]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-[#f4efe6] truncate">{item.name}</div>
                      <div className="text-[10px] font-mono text-[#8a94a6] flex items-center gap-2">
                        <span className="text-[#ff7830]">OE: {item.oemCode}</span>
                        <span>•</span>
                        <span>{item.brand}</span>
                      </div>
                    </div>
                    <div className="text-xs font-mono font-bold text-[#f4efe6]">
                      €{item.priceGross.toFixed(2)}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            
            {/* Interactive Vehicle Selector Button */}
            <button
              onClick={() => setIsVehicleModalOpen(true)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                activeVehicle
                  ? 'bg-[#1e2330] border-[#ff5500] text-[#ff7830]'
                  : 'bg-[#12151d] border-[#222838] text-[#cbd5e1] hover:border-[#3b445a]'
              }`}
              title="Filtra per la tua auto"
            >
              <Car className="w-4 h-4 text-[#ff5500]" />
              <div className="text-left hidden lg:block">
                <div className="text-[9px] font-mono text-[#8a94a6] uppercase leading-none font-bold">Vettura Selezionata</div>
                <div className="truncate max-w-[130px] font-bold text-xs text-[#f4efe6]">
                  {activeVehicle ? `${activeVehicle.make} ${activeVehicle.model || ''}` : 'Seleziona auto'}
                </div>
              </div>
              {activeVehicle && (
                <span 
                  onClick={(e) => { e.stopPropagation(); clearActiveVehicle(); }} 
                  className="ml-1 p-0.5 hover:text-white rounded text-[#8a94a6]"
                  title="Rimuovi filtro auto"
                >
                  <X className="w-3.5 h-3.5" />
                </span>
              )}
            </button>

            {/* Always-visible non-intrusive Contacts link */}
            <Link
              href="/contatti"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#12151d] hover:bg-[#1b202c] border border-[#222838] text-xs font-semibold text-[#cbd5e1] hover:text-white transition-all shadow-sm"
              title="Assistenza e Contatti Essepi Ricambi"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#00e5a3]" />
              <span className="hidden xs:inline sm:inline">Assistenza</span>
            </Link>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#ff5500] hover:bg-[#e64a19] text-white font-bold text-xs transition-all shadow-sm cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Carrello</span>
              {cartCount > 0 && (
                <span className="px-1.5 py-0.5 bg-[#090b10] text-[#00e5a3] rounded-full text-[10px] font-mono font-bold leading-none border border-[#00e5a3]/40">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-[#12151d] border border-[#222838] text-[#cbd5e1]"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="hidden md:block border-t border-[#1e2330] bg-[#090b10] px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-medium text-[#8a94a6] py-2 overflow-x-auto">
            <div className="flex items-center gap-5">
              <Link href="/catalogo" className="hover:text-[#ff5500] transition-colors font-mono font-bold text-[#f4efe6] flex items-center gap-1">
                <span>// TUTTO IL CATALOGO</span>
              </Link>
              {INITIAL_CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/catalogo?categoria=${cat.slug}`}
                  className="hover:text-[#f4efe6] transition-colors whitespace-nowrap text-xs"
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4 text-[#64748b] text-[11px] font-mono">
              <Link href="/spedizioni" className="hover:text-[#f4efe6] transition-colors">
                Spedizioni 24/48h
              </Link>
              <Link href="/recesso" className="hover:text-[#f4efe6] transition-colors">
                Garanzia & Resi
              </Link>
              <Link href="/contatti" className="hover:text-[#f4efe6] transition-colors">
                Officina & Contatti
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0d0f14] border-b border-[#222838] p-4 space-y-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Cerca ricambio, OE o vettura..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#12151d] text-xs text-[#f4efe6] rounded-lg border border-[#222838]"
            />
            <Search className="w-4 h-4 text-[#555f75] absolute left-3 top-2.5" />
          </form>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1e2330] text-xs font-mono">
            <Link 
              href="/catalogo" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 rounded bg-[#12151d] text-[#ff5500] font-bold border border-[#222838] text-center"
            >
              Catalogo Completo
            </Link>
            <Link 
              href="/contatti" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 rounded bg-[#12151d] text-[#00e5a3] font-bold border border-[#222838] text-center"
            >
              Contatti WhatsApp
            </Link>
          </div>

          <div className="space-y-1 pt-2 border-t border-[#1e2330]">
            <div className="text-[10px] font-mono font-bold text-[#64748b] uppercase px-2 mb-1">Reparti del Magazzino</div>
            {INITIAL_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/catalogo?categoria=${cat.slug}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded text-xs text-[#9aa4bc] hover:bg-[#12151d] hover:text-[#f4efe6]"
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
