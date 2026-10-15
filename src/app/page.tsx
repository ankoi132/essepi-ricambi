'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  Car, 
  ShieldCheck, 
  Truck, 
  Wrench, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare, 
  Sparkles, 
  Flame, 
  Check, 
  Star,
  Zap,
  RotateCcw,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { INITIAL_CATEGORIES, VEHICLE_MAKES } from '@/lib/data';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
  const router = useRouter();
  const { products, activeVehicle, setIsVehicleModalOpen, setActiveVehicle } = useStore();

  const [heroSearch, setHeroSearch] = useState('');
  const [heroMake, setHeroMake] = useState('');
  const [heroModel, setHeroModel] = useState('');

  const featuredProducts = products.filter(p => p.featured).slice(0, 8);

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      router.push(`/catalogo?search=${encodeURIComponent(heroSearch.trim())}`);
    }
  };

  const handleVehicleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroMake) {
      setActiveVehicle({ make: heroMake, model: heroModel });
      router.push(`/catalogo?make=${encodeURIComponent(heroMake)}${heroModel ? `&model=${encodeURIComponent(heroModel)}` : ''}`);
    }
  };

  return (
    <div className="space-y-20 pb-16">
      
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative pt-12 pb-24 overflow-hidden border-b border-slate-800/80">
        {/* Glow & Atmosphere Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-orange-500/10 via-cyan-500/5 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 right-10 w-72 h-72 rounded-full bg-orange-600/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-cyan-600/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-orange-500/30 text-orange-400 text-xs font-semibold shadow-lg">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Vetrina Ufficiale Essepi Ricambi • Oltre 4.400 Ricambi Nuovi & NOS</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-none font-sans">
              RICAMBI AUTO <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">ORIGINALI</span> AL MIGLIOR PREZZO
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
              Dalla nostra pluriennale esperienza con 100% di feedback positivi su eBay, nasce la vetrina premium indipendente: senza sovrapprezzi intermediari, con spedizione espressa in 24/48h e assistenza tecnica dedicata.
            </p>
          </div>

          {/* Interactive Fast Vehicle & OEM Search Box */}
          <div className="mt-10 max-w-4xl mx-auto">
            <div className="glass-card rounded-2xl p-4 sm:p-6 border border-slate-700/80 shadow-2xl space-y-4">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-200 uppercase tracking-wider">
                  <Car className="w-4 h-4 text-orange-400" />
                  <span>Trova il Ricambio Esatto per la Tua Auto</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsVehicleModalOpen(true)}
                  className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1 font-semibold"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Apri Garage Completo</span>
                </button>
              </div>

              {/* Vehicle Selection Inputs */}
              <form onSubmit={handleVehicleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Marca Vettura</label>
                  <select
                    value={heroMake}
                    onChange={(e) => {
                      setHeroMake(e.target.value);
                      setHeroModel('');
                    }}
                    className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
                  >
                    <option value="">Seleziona Marca...</option>
                    {VEHICLE_MAKES.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Modello / Serie</label>
                  <input
                    type="text"
                    placeholder="es. Golf IV, C-HR, Transit, Punto..."
                    value={heroModel}
                    onChange={(e) => setHeroModel(e.target.value)}
                    className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:brightness-110 text-white font-bold text-xs rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Search className="w-4 h-4" />
                    <span>Filtra Prodotti</span>
                  </button>
                </div>
              </form>

              {/* Fast Direct OEM Search */}
              <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <span className="text-slate-400 text-xs">Hai già il codice del ricambio?</span>
                <form onSubmit={handleHeroSearchSubmit} className="flex-1 max-w-md w-full relative">
                  <input
                    type="text"
                    placeholder="Incolla codice OEM originale (es. 04466-0F010)"
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                    className="w-full pl-9 pr-20 py-2 bg-slate-950/80 border border-slate-700/80 rounded-xl text-xs text-white font-mono placeholder:font-sans placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                  <Wrench className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors"
                  >
                    Cerca OEM
                  </button>
                </form>
              </div>

            </div>
          </div>

          {/* Key Figures / Trust Statistics */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="glass-panel p-4 rounded-xl text-center border border-white/5">
              <div className="text-2xl sm:text-3xl font-black text-orange-400 font-mono">4.400+</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Ricambi a Magazzino</div>
            </div>
            <div className="glass-panel p-4 rounded-xl text-center border border-white/5">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">100%</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Feedback Positivi</div>
            </div>
            <div className="glass-panel p-4 rounded-xl text-center border border-white/5">
              <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono">24/48h</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Evasione & Consegna</div>
            </div>
            <div className="glass-panel p-4 rounded-xl text-center border border-white/5">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">24 Mesi</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Garanzia di Legge</div>
            </div>
          </div>

        </div>
      </section>


      {/* 2. CATEGORIES BROWSER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs font-bold text-orange-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
              <Flame className="w-3.5 h-3.5" />
              <span>Esplora il Catalogo</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Categorie Principali
            </h2>
          </div>
          <Link
            href="/catalogo"
            className="text-xs font-semibold text-slate-300 hover:text-orange-400 flex items-center gap-1 transition-colors"
          >
            <span>Tutto il Catalogo</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {INITIAL_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/catalogo?categoria=${cat.slug}`}
              className="glass-card group p-5 rounded-2xl flex flex-col justify-between hover:border-orange-500/50 transition-all duration-300"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center text-orange-400 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all shadow-md">
                  <Wrench className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-white mt-4 group-hover:text-orange-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                <span>Oltre {cat.itemCount} articoli</span>
                <ChevronRight className="w-3.5 h-3.5 text-orange-400 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>


      {/* 3. FEATURED PRODUCTS (Real items from their eBay store) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
              <Zap className="w-3.5 h-3.5" />
              <span>In Pronta Consegna</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              I Ricambi Più Richiesti
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Verificati nei minimi dettagli con codice OEM e compatibilità certificata.
            </p>
          </div>
          <Link
            href="/catalogo"
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-white transition-colors"
          >
            Vedi tutti ({products.length})
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>


      {/* 4. WHY CHOOSE ESSEPI RICAMBI OVER EBAY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-700/80 relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>La Nostra Garanzia Diretta</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                PERCHÉ ACQUISTARE SULLA NOSTRA VETRINA UFFICIALE?
              </h2>

              <p className="text-slate-300 text-sm leading-relaxed">
                Su eBay abbiamo raggiunto oltre 3.600 clienti soddisfatti con il 100% di recensioni positive. Acquistando direttamente sulla nostra piattaforma ufficiale hai vantaggi esclusivi impossibili da trovare sui marketplace:
              </p>

              <div className="space-y-3.5 text-xs text-slate-200">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <div>
                    <strong className="text-white">Prezzo più basso del 10-15%:</strong> Nessuna commissione di vendita applicata da terzi, risparmio trasferito interamente a te.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <div>
                    <strong className="text-white">Verifica Vettura via WhatsApp:</strong> Non sei sicuro della compatibilità? Ci invii il codice telaio o foto libretto e un nostro tecnico risponde in pochi minuti.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <div>
                    <strong className="text-white">Fattura Elettronica Immediata:</strong> Dedicata sia a privati con Codice Fiscale, sia a meccanici e officine con P.IVA, SDI e PEC.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <div>
                    <strong className="text-white">Imballaggio Professionale Rinforzato:</strong> Ogni pezzo meccanico o fanale viene protetto con schiuma anti-urto su misura.
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <a
                  href="https://wa.me/393461811152"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Contatta Tecnico su WhatsApp</span>
                </a>
                <Link
                  href="/catalogo"
                  className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-xs flex items-center gap-2 transition-colors"
                >
                  <span>Sfoglia il Magazzino</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Comparison Box */}
            <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-6 space-y-4">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Confronto Diretto
              </div>

              <div className="space-y-3 divide-y divide-slate-800/80 text-xs">
                <div className="pt-2 flex justify-between items-center">
                  <span className="text-slate-300">Prezzo al pubblico</span>
                  <div className="text-right">
                    <span className="text-emerald-400 font-bold">Miglior Prezzo Diretto</span>
                    <span className="text-slate-500 text-[11px] block">vs Maggiorato su eBay</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center">
                  <span className="text-slate-300">Assistenza Tecnica</span>
                  <div className="text-right">
                    <span className="text-emerald-400 font-bold">Diretta WhatsApp & Tel</span>
                    <span className="text-slate-500 text-[11px] block">vs Chat limitata eBay</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center">
                  <span className="text-slate-300">Spedizione Gratuita</span>
                  <div className="text-right">
                    <span className="text-emerald-400 font-bold">Disponibile sopra €149</span>
                    <span className="text-slate-500 text-[11px] block">Spesso a pagamento</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center">
                  <span className="text-slate-300">Fattura Elettronica SDI</span>
                  <div className="text-right">
                    <span className="text-emerald-400 font-bold">Automatica con SDI/PEC</span>
                    <span className="text-slate-500 text-[11px] block">Spesso complessa da avere</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 text-center">
                <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="text-white ml-1">100% Soddisfatti</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Oltre 3.600 transazioni completate con successo.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. WHATSAPP DIRECT ASSISTANCE CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-950 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 border border-emerald-500/30">
              <MessageSquare className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Non trovi il ricambio o vuoi confermare la compatibilità?
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                I nostri ricambisti sono a disposizione. Mandaci il numero di telaio (VIN), la foto del libretto o il vecchio pezzo: risponderemo con disponibilità e preventivo.
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/393461811152?text=Salve%20Essepi%20Ricambi,%20vorrei%20un%20preventivo%20per%20un%20ricambio"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/25 whitespace-nowrap transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Scrivi su WhatsApp: +39 346 181 1152</span>
          </a>
        </div>
      </section>

    </div>
  );
}
