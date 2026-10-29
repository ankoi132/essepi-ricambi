'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, 
  Truck, 
  Wrench, 
  ArrowRight, 
  MessageSquare, 
  Check, 
  Star,
  ChevronRight,
  Disc,
  Cog,
  Lightbulb,
  Gauge,
  Layers,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  FileText,
  Car,
  Package,
  Sparkles,
  HelpCircle,
  Cpu
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { INITIAL_CATEGORIES } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import CinematicHero from '@/components/CinematicHero';

export default function HomePage() {
  const router = useRouter();
  const { products } = useStore();

  const featuredProducts = products.filter(p => p.featured).slice(0, 8);

  return (
    <div className="space-y-24 pb-20 bg-[#0d0f14] text-[#f4efe6]">
      
      {/* 1. CINEMATIC WORKSHOP & ARCHIVE HERO */}
      <CinematicHero />

      {/* 2. ASYMMETRIC WAREHOUSE BAYS & ARCHIVE DEPARTMENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b border-[#1e2330] pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#141720] border border-[#2b3244] text-[#ff5500] text-xs font-mono font-bold rounded">
              <span>MAPPATURA CORSIE & SCAFFALATURE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#f4efe6] tracking-tight font-sans">
              I Reparti del Magazzino di Modena
            </h2>
            <p className="text-sm text-[#9aa4bc] max-w-2xl leading-relaxed">
              Oltre 4.400 ricambi catalogati per codice costruttore originale, spaccato meccanico e compatibilità di primo impianto.
            </p>
          </div>

          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#141720] hover:bg-[#1b202c] border border-[#2b3244] text-xs font-bold text-[#f4efe6] transition-all group self-start md:self-auto shadow-sm"
          >
            <span>Consulta l'Intero Catalogo</span>
            <ChevronRight className="w-4 h-4 text-[#ff5500] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Asymmetric Warehouse Grid: 2 Large Bays + 6 Modular Drawers */}
        <div className="space-y-6">
          
          {/* Top Row: Two Primary Heavy-Duty Bays */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Bay 1: Impianto Frenante & Idraulica */}
            <Link
              href="/catalogo?categoria=freni"
              className="lg:col-span-7 group relative rounded-2xl overflow-hidden border border-[#222838] hover:border-[#ff5500] bg-[#12151d] p-7 transition-all duration-300 flex flex-col justify-between min-h-[340px] shadow-xl"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700 filter grayscale"
                style={{ backgroundImage: `url(https://images.unsplash.com/photo-1600790142055-619df03207e6?w=1000&auto=format&fit=crop&q=80)` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f14] via-[#0d0f14]/85 to-[#0d0f14]/40" />
              <div className="absolute inset-0 blueprint-grid opacity-40 pointer-events-none" />

              {/* Bay Tagging */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-[#1e2330] text-[#ff7830] font-mono text-[11px] font-bold border border-[#2d3548]">
                    CORSIA A // REPARTO 01
                  </span>
                  <span className="text-[11px] font-mono text-[#00e5a3]">740+ Pezzi a Scaffale</span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-[#64748b] group-hover:text-[#ff5500] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>

              {/* Bay Specs & Highlights */}
              <div className="relative z-10 space-y-3 mt-12">
                <div className="flex items-center gap-2 text-xs font-mono text-[#8a94a6]">
                  <Disc className="w-4 h-4 text-[#ff5500]" />
                  <span>DISCHI AUTOVENTILANTI • PINZE • PASTIGLIE OEM</span>
                </div>
                <h3 className="text-2xl font-black text-[#f4efe6] group-hover:text-[#ff5500] transition-colors">
                  Impianto Frenante & Idraulica
                </h3>
                <p className="text-xs text-[#9aa4bc] max-w-xl leading-relaxed">
                  Dischi ad alto tenore di carbonio rettificati a tolleranza millesimale e pastiglie con mescola anti-fischio e guarnizioni freno conformi alle normative ECE R90.
                </p>

                <div className="pt-3 border-t border-[#1e2330] flex flex-wrap gap-2 text-[10px] font-mono text-[#cbd5e1]">
                  <span className="px-2 py-0.5 rounded bg-[#141720] border border-[#262c3a]">Brembo OE</span>
                  <span className="px-2 py-0.5 rounded bg-[#141720] border border-[#262c3a]">Toyota Genuine</span>
                  <span className="px-2 py-0.5 rounded bg-[#141720] border border-[#262c3a]">ATE High-Carbon</span>
                  <span className="px-2 py-0.5 rounded bg-[#141720] border border-[#262c3a]">Sensori Usura Inclusi</span>
                </div>
              </div>
            </Link>

            {/* Bay 2: Distribuzione & Gruppo Cinghie */}
            <Link
              href="/catalogo?categoria=distribuzione"
              className="lg:col-span-5 group relative rounded-2xl overflow-hidden border border-[#222838] hover:border-[#00b4d8] bg-[#12151d] p-7 transition-all duration-300 flex flex-col justify-between min-h-[340px] shadow-xl"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700 filter grayscale"
                style={{ backgroundImage: `url(https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=1000&auto=format&fit=crop&q=80)` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f14] via-[#0d0f14]/85 to-[#0d0f14]/40" />
              <div className="absolute inset-0 blueprint-grid opacity-40 pointer-events-none" />

              {/* Bay Tagging */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-[#1e2330] text-[#00b4d8] font-mono text-[11px] font-bold border border-[#2d3548]">
                    CORSIA B // REPARTO 02
                  </span>
                  <span className="text-[11px] font-mono text-[#00e5a3]">480+ Kit Pronti</span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-[#64748b] group-hover:text-[#00b4d8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>

              {/* Bay Specs & Highlights */}
              <div className="relative z-10 space-y-3 mt-12">
                <div className="flex items-center gap-2 text-xs font-mono text-[#8a94a6]">
                  <Cog className="w-4 h-4 text-[#00b4d8]" />
                  <span>CATENE MORSE • CINGHIE HTD • TENDITORI</span>
                </div>
                <h3 className="text-2xl font-black text-[#f4efe6] group-hover:text-[#00b4d8] transition-colors">
                  Distribuzione & Cinghie
                </h3>
                <p className="text-xs text-[#9aa4bc] leading-relaxed">
                  Kit completi di catene a rulli calibrati, cinghie dentate rinforzate in fibra aramidica, tenditori idraulici e pompe acqua con girante in ottone.
                </p>

                <div className="pt-3 border-t border-[#1e2330] flex flex-wrap gap-2 text-[10px] font-mono text-[#cbd5e1]">
                  <span className="px-2 py-0.5 rounded bg-[#141720] border border-[#262c3a]">Ford Transit Kit</span>
                  <span className="px-2 py-0.5 rounded bg-[#141720] border border-[#262c3a]">INA Schaeffler</span>
                  <span className="px-2 py-0.5 rounded bg-[#141720] border border-[#262c3a]">Dayco HT</span>
                </div>
              </div>
            </Link>

          </div>

          {/* Bottom Row: 6 Modular Warehouse Drawers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Drawer 1: Fanaleria NOS */}
            <Link
              href="/catalogo?categoria=illuminazione"
              className="group p-5 rounded-xl border border-[#222838] hover:border-[#e5a93b] bg-[#12151d] transition-all flex flex-col justify-between space-y-4 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#1e2330] text-[#e5a93b] border border-[#2d3548]">
                  REP. 03 • NOS VINTAGE
                </span>
                <span className="text-[11px] font-mono text-[#8a94a6]">320+ Proiettori</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-[#e5a93b]" />
                  <h4 className="text-base font-bold text-[#f4efe6] group-hover:text-[#e5a93b] transition-colors">
                    Fanaleria New Old Stock
                  </h4>
                </div>
                <p className="text-xs text-[#8a94a6] leading-relaxed">
                  Proiettori e fanali posteriori originali conservati negli imballi originali d'epoca senza opacizzazioni.
                </p>
              </div>
              <div className="text-[10px] font-mono text-[#64748b] pt-2 border-t border-[#1e2330]">
                Esempi: Golf IV Hella OE, Fiat Punto 188 Carello
              </div>
            </Link>

            {/* Drawer 2: Motore & Testata */}
            <Link
              href="/catalogo?categoria=motore"
              className="group p-5 rounded-xl border border-[#222838] hover:border-[#ff5500] bg-[#12151d] transition-all flex flex-col justify-between space-y-4 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#1e2330] text-[#ff7830] border border-[#2d3548]">
                  REP. 04 • GRUPPO TERMICO
                </span>
                <span className="text-[11px] font-mono text-[#8a94a6]">580+ Articoli</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-[#ff5500]" />
                  <h4 className="text-base font-bold text-[#f4efe6] group-hover:text-[#ff5500] transition-colors">
                    Gruppo Motore & Testata
                  </h4>
                </div>
                <p className="text-xs text-[#8a94a6] leading-relaxed">
                  Guarnizioni testata multistrato MLS, valvole d'aspirazione bimetalliche, punterie e termostati calibrati.
                </p>
              </div>
              <div className="text-[10px] font-mono text-[#64748b] pt-2 border-t border-[#1e2330]">
                Esempi: Fiat 1.3/1.9 Multijet OE, Ford TDCi
              </div>
            </Link>

            {/* Drawer 3: Sospensioni & Mozzi ABS */}
            <Link
              href="/catalogo?categoria=sospensioni"
              className="group p-5 rounded-xl border border-[#222838] hover:border-[#00e5a3] bg-[#12151d] transition-all flex flex-col justify-between space-y-4 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#1e2330] text-[#00e5a3] border border-[#2d3548]">
                  REP. 05 • ASSETTO & RUOTE
                </span>
                <span className="text-[11px] font-mono text-[#8a94a6]">410+ Mozzi</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#00e5a3]" />
                  <h4 className="text-base font-bold text-[#f4efe6] group-hover:text-[#00e5a3] transition-colors">
                    Sospensioni & Mozzi con ABS
                  </h4>
                </div>
                <p className="text-xs text-[#8a94a6] leading-relaxed">
                  Cuscinetti ruota di 3ª generazione sigillati con ruota fonica magnetica integrata per sistema frenante ABS.
                </p>
              </div>
              <div className="text-[10px] font-mono text-[#64748b] pt-2 border-t border-[#1e2330]">
                Esempi: Toyota C-HR/Auris OE, VAG Hub
              </div>
            </Link>

            {/* Drawer 4: Filtrazione Professionale */}
            <Link
              href="/catalogo?categoria=filtri"
              className="group p-5 rounded-xl border border-[#222838] hover:border-[#00b4d8] bg-[#12151d] transition-all flex flex-col justify-between space-y-4 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#1e2330] text-[#00b4d8] border border-[#2d3548]">
                  REP. 06 • FILTRI
                </span>
                <span className="text-[11px] font-mono text-[#8a94a6]">620+ Ricambi</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#00b4d8]" />
                  <h4 className="text-base font-bold text-[#f4efe6] group-hover:text-[#00b4d8] transition-colors">
                    Filtrazione Primo Impianto
                  </h4>
                </div>
                <p className="text-xs text-[#8a94a6] leading-relaxed">
                  Filtri abitacolo multistrato a carboni attivi, filtri gasolio con riscaldatore e cartucce olio alta ritenzione.
                </p>
              </div>
              <div className="text-[10px] font-mono text-[#64748b] pt-2 border-t border-[#1e2330]">
                Esempi: Mann-Filter, UFI Filters, Mahle
              </div>
            </Link>

            {/* Drawer 5: Carrozzeria & Alzacristalli */}
            <Link
              href="/catalogo?categoria=carrozzeria"
              className="group p-5 rounded-xl border border-[#222838] hover:border-[#cbd5e1] bg-[#12151d] transition-all flex flex-col justify-between space-y-4 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#1e2330] text-[#cbd5e1] border border-[#2d3548]">
                  REP. 07 • CARROZZERIA
                </span>
                <span className="text-[11px] font-mono text-[#8a94a6]">390+ Componenti</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-[#cbd5e1]" />
                  <h4 className="text-base font-bold text-[#f4efe6] group-hover:text-[#cbd5e1] transition-colors">
                    Carrozzeria & Meccanismi
                  </h4>
                </div>
                <p className="text-xs text-[#8a94a6] leading-relaxed">
                  Alzacristalli elettrici completi di motorino Comfort, serrature portiera, specchi retrovisori e maniglie.
                </p>
              </div>
              <div className="text-[10px] font-mono text-[#64748b] pt-2 border-t border-[#1e2330]">
                Esempi: Meccanismi porta Fiat, serrature VAG
              </div>
            </Link>

            {/* Drawer 6: Accessori & Componenti d'Epoca */}
            <Link
              href="/catalogo?categoria=accessori"
              className="group p-5 rounded-xl border border-[#222838] hover:border-[#ff5500] bg-[#12151d] transition-all flex flex-col justify-between space-y-4 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#1e2330] text-[#ff7830] border border-[#2d3548]">
                  REP. 08 • ACCESSORI & NOS
                </span>
                <span className="text-[11px] font-mono text-[#8a94a6]">270+ Pezzi Rari</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-[#ff5500]" />
                  <h4 className="text-base font-bold text-[#f4efe6] group-hover:text-[#ff5500] transition-colors">
                    Accessori Originali & Interni
                  </h4>
                </div>
                <p className="text-xs text-[#8a94a6] leading-relaxed">
                  Alette parasole con specchio di cortesia, tappeti sagomati, pomelli del cambio e comandi plancia originali.
                </p>
              </div>
              <div className="text-[10px] font-mono text-[#64748b] pt-2 border-t border-[#1e2330]">
                Esempi: Alette parasole Toyota Verso OE, plastiche d'epoca
              </div>
            </Link>

          </div>

        </div>

      </section>


      {/* 3. FEATURED PRODUCTS (Photographed live on the inspection workbench) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-[#1e2330] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#141720] border border-[#2b3244] text-[#00e5a3] text-xs font-mono font-bold rounded mb-2">
              <span>DAL BANCO DI COLLAUDO • PRONTA CONSEGNA</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#f4efe6] tracking-tight font-sans">
              Ricambi Ispezionati a Scaffale
            </h2>
            <p className="text-sm text-[#9aa4bc] mt-1">
              Pezzi unici a magazzino, fotografati dal vivo con codice OE e sigla costruttore incisa.
            </p>
          </div>

          <Link
            href="/catalogo"
            className="px-4 py-2.5 rounded-xl bg-[#141720] hover:bg-[#1b202c] border border-[#2b3244] text-xs font-bold text-[#f4efe6] transition-all shadow-sm self-start sm:self-auto flex items-center gap-1.5"
          >
            <span>Tutti i {products.length} ricambi fisici</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#ff5500]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>


      {/* 4. VERBALE DI CONFRONTO // FILIERA DIRETTA vs MARKETPLACE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl p-7 sm:p-10 border border-[#222838] bg-[#12151d] shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Why Buying Directly Matters */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#141720] border border-[#2b3244] text-[#ff7830] text-xs font-mono font-bold rounded">
                <span>VERBALE TECNICO DI CONFORMITÀ</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-[#f4efe6] tracking-tight leading-tight">
                Perché acquistare direttamente dalla nostra officina online
              </h2>

              <p className="text-[#9aa4bc] text-sm leading-relaxed">
                Su eBay abbiamo gestito oltre <strong className="text-[#f4efe6]">3.600 spedizioni</strong> mantenendo il <strong className="text-[#00e5a3]">100% di feedback positivi</strong>. Acquistando sulla piattaforma ufficiale Essepi elimini le commissioni dei marketplace ed entri in filo diretto con il ricambista che prepara il tuo collo.
              </p>

              {/* 4 Technical Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs pt-1">
                <div className="p-3.5 rounded-xl bg-[#0d0f14] border border-[#1e2330] space-y-1">
                  <div className="flex items-center gap-2 text-[#00e5a3] font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Risparmio Diretto 10-15%</span>
                  </div>
                  <p className="text-[#8a94a6] leading-relaxed text-[11px]">
                    Nessuna commissione per terze parti: il prezzo esposto è il più conveniente sul mercato per il ricambio originale.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0d0f14] border border-[#1e2330] space-y-1">
                  <div className="flex items-center gap-2 text-[#00b4d8] font-bold">
                    <Clock className="w-4 h-4" />
                    <span>Priorità di Spedizione 24H</span>
                  </div>
                  <p className="text-[#8a94a6] leading-relaxed text-[11px]">
                    Gli ordini dal sito ufficiale hanno corsia preferenziale: imballo al mattino e consegna a BRT/GLS/DHL alle ore 15:00.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0d0f14] border border-[#1e2330] space-y-1">
                  <div className="flex items-center gap-2 text-[#e5a93b] font-bold">
                    <FileText className="w-4 h-4" />
                    <span>Fatturazione SDI Automatica</span>
                  </div>
                  <p className="text-[#8a94a6] leading-relaxed text-[11px]">
                    Fattura elettronica immediata con IVA 22% esposta sia per officine e P.IVA che per clienti privati con codice fiscale.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0d0f14] border border-[#1e2330] space-y-1">
                  <div className="flex items-center gap-2 text-[#ff5500] font-bold">
                    <Wrench className="w-4 h-4" />
                    <span>Controllo Sigla Motore P.5</span>
                  </div>
                  <p className="text-[#8a94a6] leading-relaxed text-[11px]">
                    Non spediamo alla cieca. Se hai dubbi sulla compatibilità verifichiamo la sigla motore e il telaio in 5 minuti.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3 items-center">
                <a
                  href="https://wa.me/393461811152"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-[#00e5a3] hover:bg-[#00c98f] text-[#090b10] font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chiedi a un Ricambista su WhatsApp</span>
                </a>
                <Link
                  href="/catalogo"
                  className="px-5 py-2.5 rounded-xl bg-[#1b202c] hover:bg-[#252c3d] border border-[#2d3548] text-[#f4efe6] font-bold text-xs flex items-center gap-2 transition-colors"
                >
                  <span>Esplora Magazzino</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#ff5500]" />
                </Link>
              </div>
            </div>

            {/* Right: Technical Service Benchmark Card */}
            <div className="lg:col-span-5 bg-[#0d0f14] rounded-xl border border-[#1e2330] p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-[#1e2330] pb-3">
                <div className="text-xs font-mono font-bold text-[#f4efe6] uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00e5a3]" />
                  <span>Tabella Comparativa di Garanzia</span>
                </div>
                <span className="text-[10px] font-mono text-[#ff5500] bg-[#141720] px-2 py-0.5 rounded border border-[#2b3244]">
                  STANDARD ESSEPI
                </span>
              </div>

              <div className="space-y-3 divide-y divide-[#1e2330] text-xs">
                
                <div className="pt-2 flex justify-between items-center">
                  <div>
                    <span className="text-[#f4efe6] font-semibold block">Prezzo Finale Esposto</span>
                    <span className="text-[11px] text-[#64748b]">Nessun ricarico di intermediazione</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[#00e5a3] font-bold font-mono text-sm block">-15% Diretto</span>
                    <span className="text-[#64748b] text-[10px]">Marketplace: +12-15% tariffe</span>
                  </div>
                </div>

                <div className="pt-3 flex justify-between items-center">
                  <div>
                    <span className="text-[#f4efe6] font-semibold block">Spedizione & Imballo Speciale</span>
                    <span className="text-[11px] text-[#64748b]">Corriere espresso tracciato</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[#00b4d8] font-bold font-mono text-sm block">BRT / GLS 24-48H</span>
                    <span className="text-[#64748b] text-[10px]">Scatola rinforzata anti-schiacciamento</span>
                  </div>
                </div>

                <div className="pt-3 flex justify-between items-center">
                  <div>
                    <span className="text-[#f4efe6] font-semibold block">Consulenza Pre-Acquisto</span>
                    <span className="text-[11px] text-[#64748b]">Verifica da libretto di circolazione</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[#00e5a3] font-bold font-mono text-sm block">WhatsApp Tecnico</span>
                    <span className="text-[#64748b] text-[10px]">Risposta con ricambista qualificato</span>
                  </div>
                </div>

                <div className="pt-3 flex justify-between items-center">
                  <div>
                    <span className="text-[#f4efe6] font-semibold block">Garanzia di Conformità Legale</span>
                    <span className="text-[11px] text-[#64748b]">Codice del Consumo & Diritto di Recesso</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[#e5a93b] font-bold font-mono text-sm block">24 Mesi / 14gg Recesso</span>
                    <span className="text-[#64748b] text-[10px]">Fattura elettronica SDI allegata</span>
                  </div>
                </div>

              </div>

              {/* Rating Footer */}
              <div className="pt-3 border-t border-[#1e2330] bg-[#141720]/60 -mx-5 -mb-5 p-4 rounded-b-xl text-center space-y-1">
                <div className="inline-flex items-center gap-1 text-[#e5a93b] font-bold text-xs">
                  <Star className="w-3.5 h-3.5 fill-[#e5a93b]" />
                  <Star className="w-3.5 h-3.5 fill-[#e5a93b]" />
                  <Star className="w-3.5 h-3.5 fill-[#e5a93b]" />
                  <Star className="w-3.5 h-3.5 fill-[#e5a93b]" />
                  <Star className="w-3.5 h-3.5 fill-[#e5a93b]" />
                  <span className="text-[#f4efe6] ml-1.5 font-bold">100% Feedback Positivi</span>
                </div>
                <p className="text-[11px] text-[#8a94a6]">
                  Storico certificato su oltre 3.600 transazioni registrate dal nostro deposito di Modena.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 5. GUIDA ALLA LETTURA DEL LIBRETTO DI CIRCOLAZIONE (ZERO ERRORI) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#12151d] border border-[#222838] rounded-2xl p-7 sm:p-9 shadow-xl space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1e2330] pb-5">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#141720] border border-[#2b3244] text-[#00b4d8] text-xs font-mono font-bold rounded mb-2">
                <span>GUIDA PRATICA OFFICINA // COMPATIBILITÀ GARANTITA</span>
              </div>
              <h3 className="text-2xl font-black text-[#f4efe6] tracking-tight">
                Come leggere il libretto per trovare il ricambio esatto
              </h3>
              <p className="text-xs text-[#9aa4bc] mt-1">
                Due soli campi della Carta di Circolazione bastano per azzerare al 100% i resi e gli errori d'acquisto.
              </p>
            </div>

            <a
              href="https://wa.me/393461811152?text=Salve%20Essepi%20Ricambi,%20vorrei%20inviarvi%20la%20foto%20del%20libretto%20per%20un%20controllo."
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#00e5a3] hover:bg-[#00c98f] text-[#090b10] font-bold text-xs flex items-center gap-2 whitespace-nowrap shadow-sm transition-all self-start sm:self-auto cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Invia Foto Libretto (+39 346 181 1152)</span>
            </a>
          </div>

          {/* Registration Certificate Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="p-4 rounded-xl bg-[#0d0f14] border border-[#1e2330] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-black text-[#ff5500] px-2 py-0.5 rounded bg-[#1e2330] border border-[#2d3548]">
                  CAMPO (P.5)
                </span>
                <span className="text-[10px] font-mono text-[#00e5a3]">FONDAMENTALE</span>
              </div>
              <h4 className="text-sm font-bold text-[#f4efe6]">Sigla / Tipo del Motore</h4>
              <p className="text-xs text-[#8a94a6] leading-relaxed">
                Indica il codice costruttore esatto del blocco termico (es. <em>199A2000</em>, <em>K9K</em>, <em>1NZ-FE</em>). È il riferimento obbligatorio per cinghie, filtri, cuscinetti e pompe acqua.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0d0f14] border border-[#1e2330] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-black text-[#00b4d8] px-2 py-0.5 rounded bg-[#1e2330] border border-[#2d3548]">
                  CAMPO (E)
                </span>
                <span className="text-[10px] font-mono text-[#00b4d8]">17 CARATTERI</span>
              </div>
              <h4 className="text-sm font-bold text-[#f4efe6]">Numero di Telaio (VIN)</h4>
              <p className="text-xs text-[#8a94a6] leading-relaxed">
                Il numero d'identificazione univoco del veicolo. Consente ai nostri ricambisti di interrogare i cataloghi elettronici ufficiali del costruttore e risalire all'esploso del tuo telaio.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0d0f14] border border-[#1e2330] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-black text-[#e5a93b] px-2 py-0.5 rounded bg-[#1e2330] border border-[#2d3548]">
                  CAMPI (B) & (P.2)
                </span>
                <span className="text-[10px] font-mono text-[#8a94a6]">ANNO & KW</span>
              </div>
              <h4 className="text-sm font-bold text-[#f4efe6]">Data Immatricolazione & Potenza</h4>
              <p className="text-xs text-[#8a94a6] leading-relaxed">
                La data di prima immatricolazione (B) e la potenza espressa in kW (P.2) evitano confusioni tra versioni pre-restyling e post-restyling o varianti di taratura impianto frenante.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 6. WHATSAPP DIRECT ASSISTANCE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-7 sm:p-8 rounded-2xl bg-[#12151d] border border-[#222838] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 rounded-xl bg-[#00e5a3]/15 text-[#00e5a3] flex items-center justify-center flex-shrink-0 border border-[#00e5a3]/30 shadow-sm">
              <MessageSquare className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#f4efe6] tracking-tight">
                Non trovi il codice o preferisci un controllo manuale con un ricambista?
              </h3>
              <p className="text-xs text-[#9aa4bc] mt-0.5 max-w-xl leading-relaxed">
                Il magazzino è gestito da ricambisti esperti a Modena. Inviaci la foto del pezzo smontato o del libretto: ti rispondiamo con disponibilità e preventivo chiaro senza impegno.
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/393461811152?text=Salve%20Essepi%20Ricambi,%20vorrei%20un%20preventivo%20e%20verifica%20compatibilit%C3%A0%20per%20la%20mia%20auto"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-[#00e5a3] hover:bg-[#00c98f] text-[#090b10] font-black text-xs flex items-center gap-2 shadow-md shadow-[#00e5a3]/15 whitespace-nowrap transition-all relative z-10 cursor-pointer flex-shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Scrivi al Magazzino: +39 346 181 1152</span>
          </a>
        </div>
      </section>

    </div>
  );
}
