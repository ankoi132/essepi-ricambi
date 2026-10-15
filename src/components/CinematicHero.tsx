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
  Zap, 
  Sparkles, 
  SlidersHorizontal, 
  Activity, 
  Radio, 
  Disc, 
  Cog, 
  Lightbulb, 
  Gauge, 
  CheckCircle2, 
  ArrowRight,
  Flame,
  ChevronRight
} from 'lucide-react';
import { VEHICLE_MAKES } from '@/lib/data';
import { useStore } from '@/lib/store';

interface Hotspot {
  id: string;
  name: string;
  categorySlug: string;
  oemSample: string;
  top: string;
  left: string;
  icon: any;
  color: string;
  desc: string;
}

const VEHICLE_HOTSPOTS: Hotspot[] = [
  {
    id: 'freni',
    name: 'Impianto Frenante',
    categorySlug: 'freni',
    oemSample: '04466-0F010',
    top: '68%',
    left: '22%',
    icon: Disc,
    color: '#ff5e00',
    desc: 'Dischi ventilati e pastiglie freno con mescola originale OEM anti-fischio.'
  },
  {
    id: 'distribuzione',
    name: 'Distribuzione & Cinghie',
    categorySlug: 'distribuzione',
    oemSample: '1372438-KIT',
    top: '38%',
    left: '32%',
    icon: Cog,
    color: '#06b6d4',
    desc: 'Kit catene e cinghie dentate con tenditori idraulici e pompe acqua.'
  },
  {
    id: 'motore',
    name: 'Gruppo Termico & Testata',
    categorySlug: 'motore',
    oemSample: '71740678',
    top: '42%',
    left: '48%',
    icon: Gauge,
    color: '#f59e0b',
    desc: 'Guarnizioni testata rinforzate, punterie in elastomero FPM e sensori.'
  },
  {
    id: 'illuminazione',
    name: 'Fanaleria & Proiettori',
    categorySlug: 'illuminazione',
    oemSample: '1J6945095Q',
    top: '32%',
    left: '78%',
    icon: Lightbulb,
    color: '#3b82f6',
    desc: 'Gruppi ottici anteriori e fanali posteriori originali New Old Stock.'
  },
  {
    id: 'sospensioni',
    name: 'Sospensioni & Mozzi',
    categorySlug: 'sospensioni',
    oemSample: '42410-F4010',
    top: '72%',
    left: '74%',
    icon: ShieldCheck,
    color: '#10b981',
    desc: 'Cuscinetti ruota sigillati con sensore ABS magnetico integrato.'
  }
];

const DISPATCH_FEED = [
  { item: 'Set Pastiglie Toyota Verso (04466-0F010)', dest: 'Bologna (BO)', courier: 'BRT Express', time: '2 min fa' },
  { item: 'Kit Catena Ford Transit 2.4 (1372438)', dest: 'Modena (MO)', courier: 'GLS Italy', time: '8 min fa' },
  { item: 'Fanale Posteriore Golf IV (1J6945095Q)', dest: 'Milano (MI)', courier: 'DHL Express', time: '14 min fa' },
  { item: 'Cuscinetto Mozzo Toyota C-HR (42410-F4010)', dest: 'Roma (RM)', courier: 'BRT Express', time: '21 min fa' }
];

export default function CinematicHero() {
  const router = useRouter();
  const { setActiveVehicle, setIsVehicleModalOpen } = useStore();

  const [activeHotspot, setActiveHotspot] = useState<Hotspot>(VEHICLE_HOTSPOTS[0]);
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [oemInput, setOemInput] = useState('');
  const [engineStarted, setEngineStarted] = useState(false);
  const [dispatchIndex, setDispatchIndex] = useState(0);

  // Auto-cycle through dispatch notifications
  useEffect(() => {
    const timer = setInterval(() => {
      setDispatchIndex(prev => (prev + 1) % DISPATCH_FEED.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleStartEngine = () => {
    setEngineStarted(true);
    setTimeout(() => setEngineStarted(false), 2400);
  };

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
    <div className="relative overflow-hidden pt-8 pb-20 border-b border-slate-800/80">
      
      {/* 1. CINEMATIC HEADLIGHT BEAMS */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[600px] h-[550px] headlight-cone pointer-events-none opacity-40 animate-pulse-slow" />
      <div className="absolute top-0 right-1/4 translate-x-1/2 w-[600px] h-[550px] headlight-cone pointer-events-none opacity-40 animate-pulse-slow" style={{ animationDelay: '1.5s' }} />

      {/* Subtle Carbon Grid Matrix */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Top Telemetry & Live Dispatch Stream */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-white/5 pb-4 text-xs font-mono">
          
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 font-bold text-[11px]">
              <Radio className="w-3.5 h-3.5 animate-pulse text-orange-400" />
              <span>RADAR LOGISTICA ATTIVO</span>
            </span>
            <span className="text-slate-400 hidden sm:inline">|</span>
            <div className="overflow-hidden h-5 text-slate-300">
              <AnimatePresence mode="wait">
                <motion.div
                  key={dispatchIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2 truncate text-[11px]"
                >
                  <span className="text-emerald-400">⚡ In consegna:</span>
                  <span className="text-white font-semibold">{DISPATCH_FEED[dispatchIndex].item}</span>
                  <span className="text-slate-400">→ {DISPATCH_FEED[dispatchIndex].dest}</span>
                  <span className="text-orange-400">({DISPATCH_FEED[dispatchIndex].time})</span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              4.489 Ricambi a Banco
            </span>
            <span>•</span>
            <span className="text-slate-300">Qualità Certificata 1° Impianto</span>
          </div>

        </div>

        {/* HERO TITLE & ENGINE REV BUTTON */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-orange-500/40 text-orange-400 text-xs font-bold shadow-xl shadow-orange-500/10"
          >
            <Flame className="w-4 h-4 text-orange-500" />
            <span>OLTRE IL COMMERCIO SU EBAY: VETRINA UFFICIALE AD ALTA PRECISIONE</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase leading-none font-sans"
          >
            LA CENTRALE DEI <br />
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(255,94,0,0.4)]">
              RICAMBI ORIGINALI
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Ricambi originali di primo impianto e New Old Stock (NOS) introvabili altrove. Verifica rapida del codice telaio, assistenza tecnica diretta e spedizione in 24/48h con corriere espresso tracciato.
          </motion.p>

          {/* Engine Ignition Action Button */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={handleStartEngine}
              className={`px-5 py-2.5 rounded-xl text-xs font-black tracking-wider uppercase flex items-center gap-2 transition-all duration-300 ${
                engineStarted
                  ? 'bg-orange-500 text-white shadow-[0_0_35px_rgba(255,94,0,0.8)] scale-105'
                  : 'bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-orange-500/50'
              }`}
            >
              <Zap className={`w-4 h-4 ${engineStarted ? 'text-white animate-spin' : 'text-orange-400'}`} />
              <span>{engineStarted ? 'TELEMETRIA INNESTATA // 100% READY' : 'ACCENDI SCANNER VEICOLO'}</span>
            </button>
          </div>

        </div>

        {/* 2. THE CINEMATIC INTERACTIVE BLUEPRINT SCANNER (CENTER STAGE) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Cockpit: Automotive Car & OEM Search Terminal */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-card rounded-3xl p-6 sm:p-7 border border-slate-700/80 shadow-2xl relative">
              <div className="laser-scanner" />
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                      Terminale Selezione Vettura
                    </h3>
                    <p className="text-[11px] text-slate-400">Match compatibilità 100% garantito</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsVehicleModalOpen(true)}
                  className="text-[11px] text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1"
                >
                  <SlidersHorizontal className="w-3 h-3" />
                  <span>Garage Completo</span>
                </button>
              </div>

              {/* Vehicle selectors */}
              <form onSubmit={handleVehicleSearch} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                    1. Marca Costruttrice
                  </label>
                  <select
                    value={selectedMake}
                    onChange={(e) => setSelectedMake(e.target.value)}
                    className="w-full py-2.5 px-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500 font-semibold"
                  >
                    <option value="">Seleziona Marca Automobilistica...</option>
                    {VEHICLE_MAKES.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                    2. Modello o Serie
                  </label>
                  <input
                    type="text"
                    placeholder="es. Golf IV, C-HR, Transit, Punto, Touran..."
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full py-2.5 px-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!selectedMake}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    selectedMake
                      ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 text-white shadow-xl shadow-orange-500/25 cursor-pointer hover:brightness-110'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <Search className="w-4 h-4" />
                  <span>Scansiona Ricambi per Questo Modello</span>
                </button>
              </form>

              {/* Direct OEM Code Search */}
              <div className="mt-5 pt-4 border-t border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-slate-400 uppercase">Hai il Codice OEM?</span>
                  <span className="text-cyan-400 font-mono">Verifica Diretta</span>
                </div>
                <form onSubmit={handleOemSearch} className="relative">
                  <input
                    type="text"
                    placeholder="Incolla codice OEM (es. 04466-0F010)"
                    value={oemInput}
                    onChange={(e) => setOemInput(e.target.value)}
                    className="w-full pl-9 pr-20 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-mono placeholder:font-sans placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                  <Wrench className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs rounded-lg transition-colors"
                  >
                    Trova OEM
                  </button>
                </form>
              </div>

            </div>
          </div>

          {/* Right Blueprint: Interactive Exploded Chassis / Component Scanner */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-700/80 relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
              
              {/* Technical Blueprint Grid Accents */}
              <div className="absolute top-4 right-4 flex items-center gap-2 font-mono text-[10px] text-cyan-400/80">
                <Activity className="w-3.5 h-3.5 animate-pulse" />
                <span>CHASSIS TELEMETRY // ESSEPI-RICAMBI-HUD</span>
              </div>

              {/* Interactive Vehicle Diagram Stage */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-950/90 border border-slate-800/80 flex items-center justify-center p-4">
                
                {/* Visual Blueprint Background Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1200&auto=format&fit=crop&q=80"
                  alt="Automotive Blueprint Telemetry"
                  className="absolute inset-0 w-full h-full object-cover opacity-25 filter contrast-125"
                />
                
                {/* Futuristic Laser Matrix Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/80 pointer-events-none" />

                {/* Hotspots over the diagram */}
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
                        {/* Ripple animation on active */}
                        <div
                          className="w-10 h-10 rounded-full absolute animate-ping opacity-40"
                          style={{ backgroundColor: spot.color }}
                        />
                        <button
                          className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 shadow-xl ${
                            isActive
                              ? 'scale-125 border-white text-white'
                              : 'bg-slate-900/90 border-slate-600 text-slate-300 group-hover:scale-110'
                          }`}
                          style={{
                            backgroundColor: isActive ? spot.color : undefined,
                            boxShadow: isActive ? `0 0 25px ${spot.color}` : undefined
                          }}
                        >
                          <Icon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* Live Hotspot Telemetry Card at Bottom of Diagram */}
                <div className="absolute bottom-4 left-4 right-4 z-30">
                  <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-950/90">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-lg"
                        style={{ backgroundColor: activeHotspot.color }}
                      >
                        <activeHotspot.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">{activeHotspot.name}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-orange-400 border border-slate-700">
                            Esempio OEM: {activeHotspot.oemSample}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5 max-w-md">
                          {activeHotspot.desc}
                        </p>
                      </div>
                    </div>

                    <Link
                      href={`/catalogo?categoria=${activeHotspot.categorySlug}`}
                      className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-1.5 whitespace-nowrap shadow-md shadow-orange-500/20 transition-all flex-shrink-0"
                    >
                      <span>Vedi Ricambi</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
