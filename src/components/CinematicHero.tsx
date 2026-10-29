'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Car, 
  Wrench, 
  ShieldCheck, 
  Disc, 
  Cog, 
  Lightbulb, 
  Gauge, 
  ChevronRight,
  ArrowRight,
  SlidersHorizontal,
  CheckCircle2,
  FileText,
  MessageSquare,
  Sparkles,
  Layers,
  HelpCircle,
  Hash
} from 'lucide-react';
import { VEHICLE_MAKES } from '@/lib/data';
import { useStore } from '@/lib/store';

interface Hotspot {
  id: string;
  name: string;
  categorySlug: string;
  oemSample: string;
  spec: string;
  top: string;
  left: string;
  icon: any;
  desc: string;
  inspectionTag: string;
}

const VEHICLE_HOTSPOTS: Hotspot[] = [
  {
    id: 'freni',
    name: 'Dischi & Pastiglie OEM',
    categorySlug: 'freni',
    oemSample: '04466-0F010',
    spec: 'Acciaio ad alto tenore di carbonio • Mescola GG',
    top: '64%',
    left: '23%',
    icon: Disc,
    desc: 'Dischi autoventilanti rettificati e pastiglie freno con mescola originale OEM anti-fischio.',
    inspectionTag: 'COLLAUDO TOLL. 0.015mm'
  },
  {
    id: 'distribuzione',
    name: 'Distribuzione & Cinghie',
    categorySlug: 'distribuzione',
    oemSample: '1372438-KIT',
    spec: 'Profilo dente HTD • Cuscinetti stagni NTN',
    top: '36%',
    left: '34%',
    icon: Cog,
    desc: 'Kit catene e cinghie dentate con tenditori idraulici a pressione calibrata e pompe acqua.',
    inspectionTag: 'KIT COMPLETO CON TENDITORE'
  },
  {
    id: 'motore',
    name: 'Testata & Termico',
    categorySlug: 'motore',
    oemSample: '71740678',
    spec: 'Guarnizioni multistrato MLS • Acciaio per molle',
    top: '40%',
    left: '50%',
    icon: Gauge,
    desc: 'Guarnizioni testata rinforzate multistrato, punterie in elastomero FPM e sensori di pressione.',
    inspectionTag: 'TENUTA 180 BAR CERTIFICATA'
  },
  {
    id: 'illuminazione',
    name: 'Fanaleria New Old Stock',
    categorySlug: 'illuminazione',
    oemSample: '1J6945095Q',
    spec: 'Policarbonato anti-ingiallimento UV • Imballo d\'epoca',
    top: '30%',
    left: '79%',
    icon: Lightbulb,
    desc: 'Gruppi ottici anteriori e fanali posteriori originali New Old Stock preservati in scatole d\'epoca.',
    inspectionTag: 'NOS ORIGINALE D\'EPOCA'
  },
  {
    id: 'sospensioni',
    name: 'Mozzi Ruota & Sospensioni',
    categorySlug: 'sospensioni',
    oemSample: '42410-F4010',
    spec: 'Acciaio temprato ad induzione • Magnete ABS 96 poli',
    top: '68%',
    left: '74%',
    icon: ShieldCheck,
    desc: 'Cuscinetti ruota sigillati di 3ª generazione con ruota fonica e sensore ABS magnetico integrato.',
    inspectionTag: 'RALLA SIGILLATA ESENTE MANUTENZIONE'
  }
];

const DISPATCH_FEED = [
  { item: 'Set Pastiglie Toyota Verso (OE 04466-0F010)', dest: 'Bologna (BO)', courier: 'BRT Express 24h', time: '12 min fa' },
  { item: 'Kit Catena Morse Ford Transit 2.4 (OE 1372438)', dest: 'Vicenza (VI)', courier: 'GLS Italy', time: '28 min fa' },
  { item: 'Fanale Posteriore NOS Golf IV (OE 1J6945095Q)', dest: 'Milano (MI)', courier: 'DHL Express', time: '41 min fa' },
  { item: 'Mozzo Ruota ABS Toyota C-HR (OE 42410-F4010)', dest: 'Firenze (FI)', courier: 'BRT Express 24h', time: '1 ora fa' }
];

export default function CinematicHero() {
  const router = useRouter();
  const { setActiveVehicle, setIsVehicleModalOpen } = useStore();

  const [searchTab, setSearchTab] = useState<'vehicle' | 'oem' | 'libretto'>('vehicle');
  const [activeHotspot, setActiveHotspot] = useState<Hotspot>(VEHICLE_HOTSPOTS[0]);
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [oemInput, setOemInput] = useState('');
  const [dispatchIndex, setDispatchIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDispatchIndex(prev => (prev + 1) % DISPATCH_FEED.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleVehicleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMake) {
      setActiveVehicle({ make: selectedMake, model: selectedModel });
      router.push(`/catalogo?make=${encodeURIComponent(selectedMake)}${selectedModel ? `&model=${encodeURIComponent(selectedModel)}` : ''}`);
    }
  };

  const handleOemSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (oemInput.trim()) {
      router.push(`/catalogo?search=${encodeURIComponent(oemInput.trim())}`);
    }
  };

  return (
    <div className="relative pt-6 pb-20 border-b border-[#262c3a] bg-[#0d0f14] overflow-hidden">
      
      {/* Background blueprint drafting grid texture */}
      <div className="absolute inset-0 blueprint-grid pointer-events-none opacity-60" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Warehouse Registry & Live Dispatch Strip */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 border-b border-[#1e2330] pb-4 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#141720] border border-[#2b3244] text-[#ff5500] font-bold text-[11px] rounded">
              <span className="w-2 h-2 rounded-full bg-[#ff5500] animate-pulse" />
              <span>MODENA // ARCHIVIO RICAMBI</span>
            </span>
            <span className="text-[#3b445a] hidden sm:inline">|</span>
            <div className="overflow-hidden h-5 text-[#9aa4bc]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={dispatchIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-2 truncate text-[11px]"
                >
                  <span className="text-[#00e5a3]">Partito oggi:</span>
                  <span className="text-[#f4efe6] font-medium">{DISPATCH_FEED[dispatchIndex].item}</span>
                  <span className="text-[#64748b]">→ {DISPATCH_FEED[dispatchIndex].dest}</span>
                  <span className="text-[#ff7830] font-mono text-[10px]">({DISPATCH_FEED[dispatchIndex].courier})</span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[#8a94a6] text-[11px]">
            <span className="text-[#f4efe6] font-medium">4.489 Ricambi Fisici a Scaffale</span>
            <span className="text-[#3b445a]">•</span>
            <span className="text-[#00e5a3] font-medium">100% Feedback su 3.600+ Ordini</span>
          </div>
        </div>

        {/* Hero Editorial Header */}
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1a1d26] border border-[#2d3345] text-[#e5a93b] text-xs font-mono font-medium rounded">
            <span>FONDI DI MAGAZZINO D'EPOCA & RICAMBI ORIGINALI OEM</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-[#f4efe6] tracking-tight leading-[1.08] font-sans">
            I ricambi originali che non trovi più altrove.
          </h1>

          <p className="text-base sm:text-lg text-[#9aa4bc] max-w-2xl leading-relaxed">
            Pezzi originali di primo impianto e New Old Stock (NOS) preservati in imballo d'epoca. Nessun algoritmo generico: verifichiamo la sigla motore e il telaio sul tuo libretto prima di spedire da Modena.
          </p>
        </div>

        {/* Main Terminal & Exploded Assembly Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Physical Parts Finder Terminal */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#12151d] border border-[#222838] rounded-2xl p-5 sm:p-6 shadow-2xl relative">
              
              {/* Terminal Header Tabs */}
              <div className="flex items-center gap-1.5 p-1 bg-[#090b10] rounded-xl border border-[#1b202c] mb-5">
                <button
                  type="button"
                  onClick={() => setSearchTab('vehicle')}
                  className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    searchTab === 'vehicle'
                      ? 'bg-[#1b202c] text-[#f4efe6] border border-[#2d3548] shadow-sm'
                      : 'text-[#8a94a6] hover:text-[#f4efe6]'
                  }`}
                >
                  <Car className="w-3.5 h-3.5 text-[#ff5500]" />
                  <span>Per Vettura</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSearchTab('oem')}
                  className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    searchTab === 'oem'
                      ? 'bg-[#1b202c] text-[#f4efe6] border border-[#2d3548] shadow-sm'
                      : 'text-[#8a94a6] hover:text-[#f4efe6]'
                  }`}
                >
                  <Hash className="w-3.5 h-3.5 text-[#00b4d8]" />
                  <span>Codice OE</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSearchTab('libretto')}
                  className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    searchTab === 'libretto'
                      ? 'bg-[#1b202c] text-[#f4efe6] border border-[#2d3548] shadow-sm'
                      : 'text-[#8a94a6] hover:text-[#f4efe6]'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-[#00e5a3]" />
                  <span>Libretto</span>
                </button>
              </div>

              {/* Tab 1: Search by Vehicle */}
              {searchTab === 'vehicle' && (
                <form onSubmit={handleVehicleSearch} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-mono font-semibold text-[#8a94a6] uppercase tracking-wider mb-1.5">
                      1. Costruttore Automobilistico
                    </label>
                    <select
                      value={selectedMake}
                      onChange={(e) => setSelectedMake(e.target.value)}
                      className="w-full py-2.5 px-3 bg-[#090b10] border border-[#262c3a] rounded-xl text-xs text-[#f4efe6] focus:outline-none focus:border-[#ff5500] font-medium"
                    >
                      <option value="">Seleziona Costruttore (es. Toyota, Ford, Fiat...)</option>
                      {VEHICLE_MAKES.map(m => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-[11px] font-mono font-semibold text-[#8a94a6] uppercase tracking-wider">
                        2. Modello o Serie
                      </label>
                      <button
                        type="button"
                        onClick={() => setIsVehicleModalOpen(true)}
                        className="text-[11px] text-[#ff7830] hover:underline flex items-center gap-1"
                      >
                        <SlidersHorizontal className="w-3 h-3" />
                        <span>Filtro Completo</span>
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="es. Golf IV, C-HR, Transit 2.4, Punto 188..."
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="w-full py-2.5 px-3 bg-[#090b10] border border-[#262c3a] rounded-xl text-xs text-[#f4efe6] placeholder-[#555f75] focus:outline-none focus:border-[#ff5500]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!selectedMake}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                      selectedMake
                        ? 'bg-[#ff5500] hover:bg-[#e64a19] text-white shadow-lg shadow-[#ff5500]/20 cursor-pointer'
                        : 'bg-[#1b202c] text-[#555f75] cursor-not-allowed border border-[#262c3a]'
                    }`}
                  >
                    <Search className="w-4 h-4" />
                    <span>Consulta Ricambi Compatibili</span>
                  </button>

                  <div className="pt-2 flex items-center justify-between text-[11px] text-[#64748b] font-mono border-t border-[#1e2330]">
                    <span>Catalogati per telaio & motore</span>
                    <span className="text-[#00e5a3]">Verifica rapida</span>
                  </div>
                </form>
              )}

              {/* Tab 2: Direct OEM Code Search */}
              {searchTab === 'oem' && (
                <form onSubmit={handleOemSearch} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-mono font-semibold text-[#8a94a6] uppercase tracking-wider mb-1.5">
                      Codice Ricambio OE / OES / Casting
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Incolla codice (es. 04466-0F010, 1J6945095Q...)"
                        value={oemInput}
                        onChange={(e) => setOemInput(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 bg-[#090b10] border border-[#262c3a] rounded-xl text-xs text-[#f4efe6] font-mono placeholder:font-sans placeholder-[#555f75] focus:outline-none focus:border-[#00b4d8]"
                      />
                      <Wrench className="w-3.5 h-3.5 text-[#555f75] absolute left-3 top-3" />
                    </div>
                    <p className="text-[11px] text-[#64748b] mt-1.5 leading-relaxed">
                      Cerca per codice costruttore originale, codice stampato sul pezzo o cross-reference aftermarket.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={!oemInput.trim()}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                      oemInput.trim()
                        ? 'bg-[#00b4d8] hover:bg-[#0096c7] text-[#090b10] font-black shadow-lg shadow-[#00b4d8]/20 cursor-pointer'
                        : 'bg-[#1b202c] text-[#555f75] cursor-not-allowed border border-[#262c3a]'
                    }`}
                  >
                    <Search className="w-4 h-4" />
                    <span>Verifica Codice a Magazzino</span>
                  </button>

                  <div className="pt-2 flex items-center justify-between text-[11px] text-[#64748b] font-mono border-t border-[#1e2330]">
                    <span>Corrispondenza esatta 1° impianto</span>
                    <span className="text-[#00b4d8]">Cross-matching attivo</span>
                  </div>
                </form>
              )}

              {/* Tab 3: Libretto Check via WhatsApp */}
              {searchTab === 'libretto' && (
                <div className="space-y-4">
                  <div className="p-3.5 bg-[#0d1512] border border-[#16382a] rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-[#00e5a3] text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Verifica Immediata da Libretto</span>
                    </div>
                    <p className="text-xs text-[#9aa4bc] leading-relaxed">
                      Non rischiare di ordinare il ricambio sbagliato. Inviaci una foto della pagina 2 del libretto di circolazione: verifichiamo la sigla motore <strong>(P.5)</strong> e il telaio <strong>(E)</strong> sui cataloghi ufficiali.
                    </p>
                  </div>

                  <a
                    href="https://wa.me/393461811152?text=Salve%20Essepi%20Ricambi,%20allego%20foto%20del%20libretto%20per%20la%20verifica%20di%20un%20ricambio."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-[#00e5a3] hover:bg-[#00c98f] text-[#090b10] font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#00e5a3]/20 transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Invia Foto Libretto su WhatsApp (+39 346 181 1152)</span>
                  </a>

                  <div className="pt-2 flex items-center justify-between text-[11px] text-[#64748b] font-mono border-t border-[#1e2330]">
                    <span>Tempo medio di risposta: 5 minuti</span>
                    <span className="text-[#00e5a3]">Ricambista in linea</span>
                  </div>
                </div>
              )}

            </div>

            {/* Direct Assurance Footnote */}
            <div className="p-3.5 bg-[#12151d] border border-[#1e2330] rounded-xl flex items-center gap-3 text-xs text-[#9aa4bc]">
              <div className="w-7 h-7 rounded-lg bg-[#ff5500]/10 border border-[#ff5500]/25 text-[#ff5500] flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <p className="leading-snug">
                <strong>Spedizioni assicurate in 24/48h:</strong> Imballo rinforzato a doppio strato e fattura con IVA esposta per detrazione officine.
              </p>
            </div>
          </div>

          {/* Right: Technical Exploded Assembly & Inspection Schematic */}
          <div className="lg:col-span-7">
            <div className="bg-[#12151d] border border-[#222838] rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
              
              {/* Drafting Header Bar */}
              <div className="flex items-center justify-between border-b border-[#1e2330] pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold text-[#f4efe6] tracking-wider uppercase">
                    SPACCATO TECNICO D'OFFICINA // ESSEPI CATALOG 2026
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-[#8a94a6]">
                  <span>SCALE: 1:1</span>
                  <span>•</span>
                  <span className="text-[#00b4d8]">ISO 9001 TOL.</span>
                </div>
              </div>

              {/* Exploded Canvas Stage */}
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#090b10] border border-[#1b202c] p-4 flex items-center justify-center">
                
                {/* Millimeter drafting grid background */}
                <div className="absolute inset-0 blueprint-grid opacity-80 pointer-events-none" />

                {/* Technical crosshairs and coordinate marks */}
                <div className="absolute top-3 left-3 font-mono text-[9px] text-[#4a5568]">SEC-A // 001</div>
                <div className="absolute bottom-3 right-3 font-mono text-[9px] text-[#4a5568]">REF: ISO-2768-m</div>
                <div className="absolute top-3 right-3 font-mono text-[9px] text-[#4a5568]">+</div>
                <div className="absolute bottom-3 left-3 font-mono text-[9px] text-[#4a5568]">+</div>

                {/* Exploded Automotive Graphic Illustration */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1200&auto=format&fit=crop&q=80"
                  alt="Esploso Meccanico Essepi Ricambi"
                  className="absolute inset-0 w-full h-full object-cover opacity-20 filter contrast-125 grayscale"
                />

                {/* Interactive Inspection Callouts */}
                {VEHICLE_HOTSPOTS.map((spot) => {
                  const isActive = activeHotspot.id === spot.id;
                  const Icon = spot.icon;
                  return (
                    <div
                      key={spot.id}
                      style={{ top: spot.top, left: spot.left }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
                      onClick={() => setActiveHotspot(spot)}
                      onMouseEnter={() => setActiveHotspot(spot)}
                    >
                      <div className="relative flex items-center justify-center group">
                        {/* Callout Indicator Pin */}
                        <button
                          type="button"
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-200 border ${
                            isActive
                              ? 'bg-[#ff5500] text-white border-white scale-110 shadow-lg shadow-[#ff5500]/40'
                              : 'bg-[#141720] text-[#cbd5e1] border-[#3b445a] hover:border-[#ff5500] hover:text-[#f4efe6]'
                          }`}
                          title={spot.name}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* Active Component Inspection Dossier */}
                <div className="absolute bottom-3 left-3 right-3 z-30">
                  <div className="bg-[#12151d]/95 backdrop-blur-md p-3.5 rounded-xl border border-[#2b3244] shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#ff5500]/15 border border-[#ff5500]/30 text-[#ff5500] flex items-center justify-center flex-shrink-0">
                        <activeHotspot.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#f4efe6]">{activeHotspot.name}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#1e2330] text-[#ff7830] border border-[#2d3548]">
                            OE {activeHotspot.oemSample}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#8a94a6] mt-0.5 max-w-md">
                          {activeHotspot.desc}
                        </p>
                      </div>
                    </div>

                    <Link
                      href={`/catalogo?categoria=${activeHotspot.categorySlug}`}
                      className="px-3 py-1.5 rounded-lg bg-[#ff5500] hover:bg-[#e64a19] text-white font-bold text-xs flex items-center gap-1 whitespace-nowrap shadow-sm transition-all flex-shrink-0"
                    >
                      <span>Vedi Reparto</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

              </div>

              {/* Exploded Part Legend & Inspection Specs */}
              <div className="mt-4 pt-3 border-t border-[#1e2330] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-[#8a94a6]">
                <div className="flex items-center gap-2">
                  <span className="text-[#e5a93b]">SCHEDA ISPEZIONE:</span>
                  <span className="text-[#f4efe6]">{activeHotspot.spec}</span>
                </div>
                <span className="text-[#00e5a3] font-semibold">{activeHotspot.inspectionTag}</span>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
