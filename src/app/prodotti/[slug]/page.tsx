'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  Check, 
  Copy, 
  ShoppingCart, 
  MessageSquare, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Car, 
  Wrench, 
  ArrowLeft,
  Share2,
  AlertCircle
} from 'lucide-react';
import { useStore } from '@/lib/store';
import ProductCard from '@/components/ProductCard';

function ProductDetailContent() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;
  const { products, addToCart, activeVehicle, isVehicleCompatible } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [copiedOem, setCopiedOem] = useState(false);
  const [activeTab, setActiveTab] = useState<'desc' | 'compat' | 'shipping' | 'warranty'>('desc');
  const [compatSearch, setCompatSearch] = useState('');

  // Find product by slug or id
  const product = products.find(p => p.slug === slug || p.id === slug);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold text-white">Ricambio non trovato</h1>
        <p className="text-slate-400 text-sm">Il ricambio cercato potrebbe essere stato rimosso o il link non è corretto.</p>
        <Link href="/catalogo" className="inline-block px-5 py-2.5 bg-orange-500 text-white rounded-xl text-xs font-bold">
          Torna al Catalogo
        </Link>
      </div>
    );
  }

  const isCompatibleWithActiveVehicle = activeVehicle ? isVehicleCompatible(product, activeVehicle) : null;
  const isOutOfStock = product.stock <= 0;

  const handleCopyOem = () => {
    navigator.clipboard.writeText(product.oemCode);
    setCopiedOem(true);
    setTimeout(() => setCopiedOem(false), 2000);
  };

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Salve Essepi Ricambi, vorrei verificare la compatibilità e disponibilità per questo articolo:\n` +
      `Ricambio: ${product.name}\n` +
      `Codice OEM: ${product.oemCode}\n` +
      `Prezzo: €${product.priceGross.toFixed(2)}`
    );
    window.open(`https://wa.me/393461811152?text=${text}`, '_blank');
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push('/checkout');
  };

  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, 4);

  // Filter compatibility table
  const filteredCompat = product.compatibility.filter(c => {
    if (!compatSearch.trim()) return true;
    const q = compatSearch.toLowerCase();
    return c.make.toLowerCase().includes(q) || c.model.toLowerCase().includes(q) || (c.engine && c.engine.toLowerCase().includes(q));
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumbs & Back */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/catalogo" className="hover:text-white transition-colors">Catalogo</Link>
          <span>/</span>
          <Link href={`/catalogo?categoria=${product.category}`} className="hover:text-white uppercase transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-slate-200 truncate max-w-xs">{product.name}</span>
        </div>

        <Link href="/catalogo" className="hidden sm:flex items-center gap-1 hover:text-white transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Torna all&apos;elenco</span>
        </Link>
      </div>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        
        {/* Left: High-Res Image Gallery */}
        <div className="space-y-4">
          <div className="glass-card rounded-3xl overflow-hidden border border-slate-700/80 aspect-square relative bg-slate-900/60 p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-contain object-center rounded-2xl"
            />
            
            {/* Condition Badge */}
            <div className="absolute top-6 left-6">
              <span className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-slate-950/90 text-orange-400 border border-orange-500/30 backdrop-blur-md shadow-lg">
                {product.condition}
              </span>
            </div>

            {/* Garage Compatibility Pill */}
            {activeVehicle && (
              <div className="absolute top-6 right-6">
                <span className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 backdrop-blur-md shadow-lg ${
                  isCompatibleWithActiveVehicle
                    ? 'bg-emerald-950/90 text-emerald-400 border border-emerald-500/40'
                    : 'bg-red-950/90 text-red-300 border border-red-500/30'
                }`}>
                  {isCompatibleWithActiveVehicle ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Compatibile {activeVehicle.make} {activeVehicle.model || ''}</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-red-400" />
                      <span>Non verificato per {activeVehicle.make}</span>
                    </>
                  )}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 px-2">
            <span>Foto reale dell&apos;articolo a magazzino</span>
            <span className="font-mono">SKU: {product.sku}</span>
          </div>
        </div>

        {/* Right: Information & Purchase Box */}
        <div className="space-y-6">
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <span className="text-orange-400 uppercase tracking-wider">{product.brand}</span>
              <span>•</span>
              <span className="capitalize">{product.category}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              {product.name}
            </h1>
          </div>

          {/* OEM Code Reference Callout */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-orange-500/30 flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-bold text-orange-400 uppercase tracking-widest">
                Codice Originale OEM di Riferimento
              </div>
              <div className="text-lg font-black font-mono text-white mt-0.5">
                {product.oemCode}
              </div>
            </div>

            <button
              onClick={handleCopyOem}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors"
            >
              {copiedOem ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedOem ? 'Copiato!' : 'Copia'}</span>
            </button>
          </div>

          {/* Price & Italian Fiscality Breakdown */}
          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-baseline justify-between">
              <div>
                <div className="text-3xl font-black text-white font-mono tracking-tight">
                  €{product.priceGross.toFixed(2)}
                </div>
                <div className="text-xs text-slate-400 font-mono mt-0.5">
                  Prezzo netto: €{product.priceNet.toFixed(2)} + IVA 22% (€{(product.priceGross - product.priceNet).toFixed(2)})
                </div>
              </div>

              <div className="text-right">
                {isOutOfStock ? (
                  <span className="px-3 py-1 rounded-lg text-xs font-bold text-red-400 bg-red-950/60 border border-red-800">
                    Attualmente Esaurito
                  </span>
                ) : (
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 justify-end">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>Disponibile ({product.stock} pezzi)</span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      Posizione: {product.location}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Guarantees Strip */}
            <div className="pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[11px] text-slate-300">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Spedito con BRT/GLS in 24/48h</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RotateCcw className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Reso garantito entro 14 giorni</span>
              </div>
            </div>
          </div>

          {/* Purchase Actions */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              {/* Quantity input */}
              <div className="flex items-center border border-slate-700 rounded-xl overflow-hidden bg-slate-900 text-sm">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-2.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2.5 font-mono font-bold text-white text-center min-w-[40px]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                  className="px-3.5 py-2.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors disabled:opacity-40"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                type="button"
                onClick={() => addToCart(product, quantity)}
                disabled={isOutOfStock}
                className={`flex-1 py-3 px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                  isOutOfStock
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/25 active:scale-98 cursor-pointer'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Aggiungi al Carrello</span>
              </button>
            </div>

            {/* Buy Now & WhatsApp */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:brightness-110 font-bold text-xs text-white text-center shadow-md transition-all cursor-pointer"
              >
                Acquista Subito
              </button>

              <button
                type="button"
                onClick={handleWhatsAppInquiry}
                className="py-3 px-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Richiedi Info su WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Quick Notice */}
          <div className="text-xs text-slate-400 p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>
              Fatturazione italiana a norma di legge: puoi richiedere fattura aziendale con P.IVA e codice SDI o scontrino fiscale/ricevuta con Codice Fiscale.
            </span>
          </div>

        </div>

      </div>

      {/* Tabs Section: Descrizione, Compatibilità, Spedizioni, Garanzia */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
        
        {/* Tab Headers */}
        <div className="flex border-b border-slate-800 overflow-x-auto gap-4 text-xs font-bold uppercase tracking-wider pb-1">
          <button
            onClick={() => setActiveTab('desc')}
            className={`pb-3 px-2 transition-all relative ${
              activeTab === 'desc'
                ? 'text-orange-400 border-b-2 border-orange-500'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Descrizione & Caratteristiche
          </button>

          <button
            onClick={() => setActiveTab('compat')}
            className={`pb-3 px-2 transition-all relative ${
              activeTab === 'compat'
                ? 'text-orange-400 border-b-2 border-orange-500'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Veicoli Compatibili ({product.compatibility.length})
          </button>

          <button
            onClick={() => setActiveTab('shipping')}
            className={`pb-3 px-2 transition-all relative ${
              activeTab === 'shipping'
                ? 'text-orange-400 border-b-2 border-orange-500'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Spedizione & Consegna 24/48h
          </button>

          <button
            onClick={() => setActiveTab('warranty')}
            className={`pb-3 px-2 transition-all relative ${
              activeTab === 'warranty'
                ? 'text-orange-400 border-b-2 border-orange-500'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Garanzia & Diritto di Recesso
          </button>
        </div>

        {/* Tab 1: Description */}
        {activeTab === 'desc' && (
          <div className="space-y-6 text-sm text-slate-300">
            <p className="leading-relaxed text-slate-200">
              {product.description}
            </p>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Dettagli e Specifiche Tecniche
              </h4>
              <ul className="space-y-2">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <Check className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: Vehicle Compatibility Table */}
        {activeTab === 'compat' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Tabella Applicazioni Vetture
                </h4>
                <p className="text-xs text-slate-400">
                  Verifica marca, modello, anno e motorizzazione compatibili con questo pezzo.
                </p>
              </div>

              <input
                type="text"
                placeholder="Filtra marca o modello..."
                value={compatSearch}
                onChange={(e) => setCompatSearch(e.target.value)}
                className="py-1.5 px-3 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white max-w-xs"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="py-2.5 px-3">Marca</th>
                    <th className="py-2.5 px-3">Modello</th>
                    <th className="py-2.5 px-3">Anni di Produzione</th>
                    <th className="py-2.5 px-3">Motorizzazione</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {filteredCompat.map((c, i) => (
                    <tr key={i} className="hover:bg-slate-900/50 transition-colors">
                      <td className="py-3 px-3 text-orange-400 font-bold">{c.make}</td>
                      <td className="py-3 px-3 text-white font-semibold">{c.model}</td>
                      <td className="py-3 px-3 font-mono text-slate-300">{c.yearStart} - {c.yearEnd}</td>
                      <td className="py-3 px-3 text-slate-400">{c.engine || 'Tutte le motorizzazioni'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center justify-between text-xs text-slate-300">
              <span>La tua vettura non compare in elenco?</span>
              <button
                onClick={handleWhatsAppInquiry}
                className="text-emerald-400 hover:underline font-bold"
              >
                Chiedi conferma via WhatsApp
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Shipping */}
        {activeTab === 'shipping' && (
          <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Modalità e Tariffe di Spedizione in Italia
            </h4>
            <p>
              Ogni ordine effettuato su Essepi Ricambi entro le ore 12:00 viene imballato e affidato al corriere espresso lo stesso giorno lavorativo.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <div className="font-bold text-white">Corriere Espresso Standard</div>
                <div className="text-orange-400 font-bold">€7,90 (Gratis sopra €149)</div>
                <div className="text-slate-400 text-[11px]">Consegna in 24/48h con BRT o GLS tracciabile online.</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <div className="font-bold text-white">Spedizione Protetta All-Risk</div>
                <div className="text-cyan-400 font-bold">€13,90</div>
                <div className="text-slate-400 text-[11px]">Consegna prioritaria con DHL Express e assicurazione totale sul valore.</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <div className="font-bold text-white">Ritiro a Mano in Magazzino</div>
                <div className="text-emerald-400 font-bold">Gratuito €0,00</div>
                <div className="text-slate-400 text-[11px]">Disponibile in giornata previo appuntamento telefonico.</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Warranty & Returns */}
        {activeTab === 'warranty' && (
          <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Garanzia Legale di Conformità & Diritto di Recesso
            </h4>
            <p>
              Tutti i prodotti venduti sul sito godono della garanzia legale di conformità di <strong>24 mesi</strong> per i consumatori privati ai sensi degli artt. 128-135 del Codice del Consumo (D.Lgs. 206/2005) e di 12 mesi per gli acquisti con Partita IVA.
            </p>
            <p>
              <strong>Diritto di Recesso a 14 Giorni:</strong> Se per qualsiasi motivo l&apos;articolo acquistato non dovesse essere compatibile o di tuo gradimento, puoi esercitare il recesso entro 14 giorni dalla ricezione del pacco per ottenere il rimborso integrale.
            </p>
          </div>
        )}

      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">Altri Ricambi Correlati</h3>
            <Link href="/catalogo" className="text-xs text-orange-400 hover:underline font-semibold">
              Vedi altri
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-400 text-sm">
        Caricamento dettagli ricambio in corso...
      </div>
    }>
      <ProductDetailContent />
    </Suspense>
  );
}
