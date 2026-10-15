'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  Filter, 
  Search, 
  SlidersHorizontal, 
  X, 
  Car, 
  RotateCcw, 
  MessageSquare,
  ChevronDown,
  Check
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { INITIAL_CATEGORIES, VEHICLE_MAKES } from '@/lib/data';
import ProductCard from '@/components/ProductCard';

function CatalogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { products, activeVehicle, clearActiveVehicle, setIsVehicleModalOpen, isVehicleCompatible } = useStore();

  // URL state
  const queryParam = searchParams.get('search') || '';
  const categoryParam = searchParams.get('categoria') || '';
  const brandParam = searchParams.get('marca') || '';
  const makeParam = searchParams.get('make') || '';

  // Local filter state
  const [search, setSearch] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedCondition, setSelectedCondition] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'relevance' | 'price_asc' | 'price_desc' | 'newest'>('relevance');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filtered products calculation
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 1. Text Search (name, OEM, SKU, brand, description)
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchText = 
          product.name.toLowerCase().includes(q) ||
          product.oemCode.toLowerCase().includes(q) ||
          product.sku.toLowerCase().includes(q) ||
          product.brand.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q);
        if (!matchText) return false;
      }

      // 2. Category filter
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }

      // 3. Condition filter
      if (selectedCondition && product.condition !== selectedCondition) {
        return false;
      }

      // 4. In Stock only
      if (inStockOnly && product.stock <= 0) {
        return false;
      }

      // 5. Vehicle compatibility
      if (activeVehicle) {
        if (!isVehicleCompatible(product, activeVehicle)) {
          return false;
        }
      } else if (makeParam) {
        const matchMake = product.compatibility.some(c => c.make.toLowerCase() === makeParam.toLowerCase());
        if (!matchMake) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.priceGross - b.priceGross;
      if (sortBy === 'price_desc') return b.priceGross - a.priceGross;
      return 0;
    });
  }, [products, search, selectedCategory, selectedCondition, inStockOnly, sortBy, activeVehicle, makeParam, isVehicleCompatible]);

  const handleResetFilters = () => {
    setSearch('');
    setSelectedCategory('');
    setSelectedCondition('');
    setInStockOnly(false);
    setSortBy('relevance');
    clearActiveVehicle();
    router.push('/catalogo');
  };

  const hasActiveFilters = Boolean(search || selectedCategory || selectedCondition || inStockOnly || activeVehicle || makeParam);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Banner & Vehicle Pill */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
            Catalogo Ricambi Auto
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Visualizzazione di {filteredProducts.length} ricambi con disponibilità a magazzino e codici OEM certificati.
          </p>
        </div>

        {/* Vehicle Garage Status Pill */}
        <div className="flex items-center gap-3">
          {activeVehicle ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500 text-xs text-orange-400 font-semibold">
              <Car className="w-4 h-4" />
              <span>Filtro Auto: {activeVehicle.make} {activeVehicle.model || ''}</span>
              <button
                onClick={clearActiveVehicle}
                className="p-1 hover:text-white rounded-md text-slate-400"
                title="Rimuovi filtro auto"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsVehicleModalOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-500 transition-colors"
            >
              <Car className="w-4 h-4 text-orange-400" />
              <span>Filtra per la tua Vettura</span>
            </button>
          )}

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="lg:hidden flex items-center gap-2 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-semibold text-white"
          >
            <Filter className="w-4 h-4 text-orange-400" />
            <span>Filtri</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* LEFT FILTERS SIDEBAR */}
        <aside className={`lg:block ${isMobileFilterOpen ? 'block' : 'hidden'} glass-card p-6 rounded-2xl border border-slate-800 space-y-6 sticky top-28`}>
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
              <SlidersHorizontal className="w-4 h-4 text-orange-400" />
              <span>Filtra Prodotti</span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-[11px] text-orange-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Azzera</span>
              </button>
            )}
          </div>

          {/* Search Input */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase">Cerca per Codice o Nome</label>
            <div className="relative">
              <input
                type="text"
                placeholder="es. 04466-0F010, pastiglie..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-900 text-xs text-white rounded-xl border border-slate-700 focus:outline-none focus:border-orange-500 font-medium"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Categories Filter */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase">Categoria</label>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedCategory('')}
                className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg transition-colors flex items-center justify-between ${
                  !selectedCategory ? 'bg-orange-500/20 text-orange-400 font-bold' : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <span>Tutte le categorie</span>
                {!selectedCategory && <Check className="w-3.5 h-3.5" />}
              </button>
              {INITIAL_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(selectedCategory === cat.slug ? '' : cat.slug)}
                  className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg transition-colors flex items-center justify-between ${
                    selectedCategory === cat.slug ? 'bg-orange-500/20 text-orange-400 font-bold' : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <span className="truncate">{cat.name}</span>
                  {selectedCategory === cat.slug && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Condition Filter */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase">Condizione Ricambio</label>
            <div className="space-y-1">
              {['Nuovo Originale', 'Nuovo NOS', 'Aftermarket Certificato', 'Ricondizionato Garantito'].map((cond) => (
                <button
                  key={cond}
                  onClick={() => setSelectedCondition(selectedCondition === cond ? '' : cond)}
                  className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg transition-colors flex items-center justify-between ${
                    selectedCondition === cond ? 'bg-orange-500/20 text-orange-400 font-bold' : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <span>{cond}</span>
                  {selectedCondition === cond && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* In Stock Only Checkbox */}
          <div className="pt-2 border-t border-slate-800">
            <label className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-300 font-medium select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="accent-orange-500 rounded w-4 h-4"
              />
              <span>Solo ricambi subito disponibili</span>
            </label>
          </div>

        </aside>

        {/* RIGHT PRODUCT GRID */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Active Chips & Sort Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-slate-400 font-medium">
                Trovati <strong className="text-white">{filteredProducts.length}</strong> prodotti
              </span>

              {/* Active Filter Chips */}
              {selectedCategory && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-400 font-medium">
                  {INITIAL_CATEGORIES.find(c => c.slug === selectedCategory)?.name || selectedCategory}
                  <button onClick={() => setSelectedCategory('')}><X className="w-3 h-3 hover:text-white" /></button>
                </span>
              )}
              {selectedCondition && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-medium">
                  {selectedCondition}
                  <button onClick={() => setSelectedCondition('')}><X className="w-3 h-3 hover:text-white" /></button>
                </span>
              )}
              {search && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 font-medium">
                  &quot;{search}&quot;
                  <button onClick={() => setSearch('')}><X className="w-3 h-3 hover:text-white" /></button>
                </span>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-slate-400">Ordina:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
              >
                <option value="relevance">Più rilevanti</option>
                <option value="price_asc">Prezzo: dal più basso</option>
                <option value="price_desc">Prezzo: dal più alto</option>
              </select>
            </div>
          </div>

          {/* Product Cards Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="glass-card p-12 rounded-3xl border border-slate-800 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-orange-500/10 text-orange-400 flex items-center justify-center mx-auto border border-orange-500/20">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">Nessun ricambio corrisponde ai filtri impostati</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                Abbiamo oltre 4.400 ricambi a magazzino che vengono catalogati progressivamente. Se stai cercando un pezzo specifico, inviaci subito un messaggio WhatsApp con codice OEM o foto del pezzo.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition-colors"
                >
                  Mostra Tutti i Prodotti
                </button>
                <a
                  href="https://wa.me/393461811152?text=Salve%20Essepi%20Ricambi,%20non%20ho%20trovato%20online%20il%20ricambio%20che%20cerco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Richiedi su WhatsApp</span>
                </a>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-400 text-sm">
        Caricamento catalogo ricambi in corso...
      </div>
    }>
      <CatalogContent />
    </Suspense>
  );
}
