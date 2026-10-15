'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, 
  Truck, 
  Wrench, 
  ArrowRight, 
  MessageSquare, 
  Sparkles, 
  Flame, 
  Check, 
  Star,
  Zap,
  ChevronRight,
  Disc,
  Cog,
  Lightbulb,
  Gauge,
  Layers,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  FileText
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { INITIAL_CATEGORIES } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import CinematicHero from '@/components/CinematicHero';

const CATEGORY_TAGS: Record<string, string[]> = {
  freni: ['Dischi Ventilati', 'Pastiglie Mescola OEM', 'Pinze Freno'],
  distribuzione: ['Kit Cinghie Dentate', 'Catene Distribuzione', 'Pompe Acqua'],
  filtri: ['Abitacolo Carboni Attivi', 'Filtri Carburante', 'Filtri Olio'],
  illuminazione: ['Proiettori Bi-Xenon / LED', 'Fanali Posteriori', 'Frecce Specchio'],
  sospensioni: ['Ammortizzatori a Gas', 'Mozzi Cuscinetto ABS', 'Bracci Oscillanti'],
  motore: ['Guarnizioni Testata', 'Punterie Meccaniche', 'Termostati'],
  carrozzeria: ['Alzacristalli Elettrici', 'Specchietti Retrovisori', 'Maniglie'],
  accessori: ['Alette Parasole OEM', 'Tappeti Sagomati', 'Pomelli & Cuffie']
};

export default function HomePage() {
  const router = useRouter();
  const { products, activeVehicle } = useStore();

  const featuredProducts = products.filter(p => p.featured).slice(0, 8);

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. CINEMATIC ENTRANCE HERO (COCKPIT + 3D CHASSIS BLUEPRINT + TELEMETRIC IGNITION) */}
      <CinematicHero />

      {/* 2. REPARTI TECNICI & COMPONENTISTICA MECCANICA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-orange-500/5 blur-3xl pointer-events-none -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-500/5 blur-3xl pointer-events-none -translate-y-1/2" />

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-widest mb-3">
              <Flame className="w-3.5 h-3.5" />
              <span>Magazzino & Reparti Specializzati</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
              Esplora i Reparti Meccanici
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              Ogni componente viene ispezionato, sigillato e archiviato con codice OEM originale di primo impianto per garantire il montaggio perfetto.
            </p>
          </div>

          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-xs font-bold text-slate-200 hover:text-white transition-all group self-start md:self-auto shadow-lg"
          >
            <span>Tutto il Catalogo Completo</span>
            <ChevronRight className="w-4 h-4 text-orange-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Cinematic Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INITIAL_CATEGORIES.map((cat, idx) => {
            const tags = CATEGORY_TAGS[cat.slug] || ['Ricambi Certificati', 'Primo Impianto'];
            return (
              <Link
                key={cat.id}
                href={`/catalogo?categoria=${cat.slug}`}
                className="group relative h-80 rounded-2xl overflow-hidden border border-slate-800/90 hover:border-orange-500/60 transition-all duration-500 flex flex-col justify-between p-5 bg-slate-950 shadow-xl"
              >
                {/* Background Image with Cinematic Zoom */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-55"
                  style={{ backgroundImage: `url(${cat.image})` }}
                />

                {/* Dark Vignette & Carbon overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/40" />
                <div className="absolute inset-0 carbon-pattern opacity-25 group-hover:opacity-10 transition-opacity" />

                {/* Laser scanline on hover */}
                <div className="laser-scanner opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* HUD Corner Brackets */}
                <div className="hud-corner hud-tl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="hud-corner hud-br opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Card Top: Item count & Dept index */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase bg-slate-900/90 text-orange-400 border border-orange-500/30 backdrop-blur-md">
                    {cat.itemCount}+ Articoli
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 group-hover:text-slate-300 transition-colors">
                    REP.{String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Card Bottom: Content & Tags */}
                <div className="relative z-10 space-y-3">
                  <div>
                    <h3 className="text-lg font-black text-white group-hover:text-orange-400 transition-colors uppercase tracking-tight flex items-center justify-between">
                      <span>{cat.name}</span>
                      <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-orange-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  {/* Micro Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
                    {tags.map((tag, tIdx) => (
                      <span 
                        key={tIdx}
                        className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-900/80 text-slate-300 border border-slate-700/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </Link>
            );
          })}
        </div>
      </section>


      {/* 3. FEATURED PRODUCTS (Real items from Essepi Ricambi Magazzino) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>In Pronta Spedizione 24H</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
              I Ricambi Più Richiesti
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Componenti certificati con codice OEM e compatibilità verificata al 100%.
            </p>
          </div>

          <Link
            href="/catalogo"
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-white transition-all shadow-md self-start sm:self-auto"
          >
            Vedi tutti i {products.length} ricambi
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>


      {/* 4. CONFRONTO TELEMETRICO & VANTAGGI DIRETTI (ESSEPI vs MARKETPLACE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-12 border border-slate-800/90 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 shadow-2xl">
          {/* Carbon texture and ambient lights */}
          <div className="absolute inset-0 carbon-pattern opacity-15 pointer-events-none" />
          <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Why Direct */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero Commissioni Marketplace • Filiera Diretta</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-tight">
                PERCHÉ CONVIENE ACQUISTARE SULLA VETRINA UFFICIALE?
              </h2>

              <p className="text-slate-300 text-sm leading-relaxed">
                Sul nostro negozio eBay abbiamo servito oltre <span className="text-white font-bold">3.600 clienti</span> mantenendo il <span className="text-emerald-400 font-bold">100% di feedback positivi</span>. Con la nostra piattaforma proprietaria abbattiamo i costi di intermediazione per offrirti vantaggi esclusivi:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Risparmio Diretto 10-15%</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    Nessun sovrapprezzo per commissioni terze parti: il prezzo esposto è il più basso del web.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold">
                    <Clock className="w-4 h-4" />
                    <span>Priorità Evasione 24H</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    Gli ordini dal sito ufficiale vengono imballati per primi e affidati a BRT/GLS/DHL la mattina stessa.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-amber-400 font-bold">
                    <FileText className="w-4 h-4" />
                    <span>Fatturazione SDI Automatica</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    Fattura elettronica immediata con IVA 22% separata per officine, meccanici e privati con Codice Fiscale.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-orange-400 font-bold">
                    <Wrench className="w-4 h-4" />
                    <span>Verifica Libretto WhatsApp</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    Invia la foto della carta di circolazione prima dell'ordine: un nostro ricambista verifica i codici OEM.
                  </p>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap gap-4 items-center">
                <a
                  href="https://wa.me/393461811152"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Consulenza Tecnica WhatsApp</span>
                </a>
                <Link
                  href="/catalogo"
                  className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-xs flex items-center gap-2 transition-colors"
                >
                  <span>Sfoglia il Magazzino</span>
                  <ArrowRight className="w-4 h-4 text-orange-400" />
                </Link>
              </div>
            </div>

            {/* Right Column: High-Tech Telemetric Cockpit Comparison */}
            <div className="lg:col-span-5 bg-slate-950/90 rounded-2xl border border-slate-800/90 p-6 space-y-5 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Telemetria di Confronto</span>
                </div>
                <span className="text-[10px] font-mono text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                  BENCHMARK DI SERVIZIO
                </span>
              </div>

              <div className="space-y-3 divide-y divide-slate-800/60 text-xs">
                
                {/* Metric 1 */}
                <div className="pt-3 flex justify-between items-center">
                  <div>
                    <span className="text-white font-semibold block">Prezzo Finale al Cliente</span>
                    <span className="text-[11px] text-slate-500">Listino al pubblico</span>
                  </div>
                  <div className="text-right">
                    <span className="text-emerald-400 font-bold font-mono text-sm block">-15% Diretto</span>
                    <span className="text-slate-500 text-[10px]">eBay: +12% di tariffe</span>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="pt-3 flex justify-between items-center">
                  <div>
                    <span className="text-white font-semibold block">Spedizione & Imballo</span>
                    <span className="text-[11px] text-slate-500">Tracciabilità in tempo reale</span>
                  </div>
                  <div className="text-right">
                    <span className="text-cyan-400 font-bold font-mono text-sm block">BRT / GLS / DHL 24H</span>
                    <span className="text-slate-500 text-[10px]">Scatola rinforzata antiurto</span>
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="pt-3 flex justify-between items-center">
                  <div>
                    <span className="text-white font-semibold block">Assistenza Pre & Post Vendita</span>
                    <span className="text-[11px] text-slate-500">Supporto su codice telaio (VIN)</span>
                  </div>
                  <div className="text-right">
                    <span className="text-emerald-400 font-bold font-mono text-sm block">WhatsApp Diretto</span>
                    <span className="text-slate-500 text-[10px]">Risposta in 5 minuti</span>
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="pt-3 flex justify-between items-center">
                  <div>
                    <span className="text-white font-semibold block">Garanzia di Legge & Recesso</span>
                    <span className="text-[11px] text-slate-500">Conformità Codice del Consumo</span>
                  </div>
                  <div className="text-right">
                    <span className="text-amber-400 font-bold font-mono text-sm block">24 Mesi & 14gg</span>
                    <span className="text-slate-500 text-[10px]">Fattura con IVA 22% esposta</span>
                  </div>
                </div>

              </div>

              {/* Rating Footer */}
              <div className="pt-4 border-t border-slate-800/80 bg-slate-900/40 -mx-6 -mb-6 p-5 rounded-b-2xl text-center space-y-1">
                <div className="inline-flex items-center gap-1 text-amber-400 font-bold text-xs">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="text-white ml-1.5 font-sans font-bold">100% Feedback Positivi</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Oltre 3.600 transazioni verificate sul nostro store storico Essepi Ricambi.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 5. WHATSAPP DIRECT ASSISTANCE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-950/70 via-slate-900 to-slate-950 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-5 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 border border-emerald-500/40 shadow-lg">
              <MessageSquare className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                Non trovi il ricambio o vuoi confermare la compatibilità?
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
                I nostri tecnici ricambisti sono operativi in tempo reale. Inviaci il numero di telaio (VIN), la foto del libretto o la foto del pezzo smontato: verificheremo compatibilità e disponibilità in magazzino.
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/393461811152?text=Salve%20Essepi%20Ricambi,%20vorrei%20un%20preventivo%20e%20verifica%20compatibilit%C3%A0%20per%20la%20mia%20auto"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/30 whitespace-nowrap transition-all relative z-10 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Scrivi su WhatsApp: +39 346 181 1152</span>
          </a>
        </div>
      </section>

    </div>
  );
}
