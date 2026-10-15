'use client';

import React, { useState } from 'react';
import { Phone, MessageSquare, Mail, X, Headphones, Clock, CheckCircle2 } from 'lucide-react';

export default function FloatingContactWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside aria-label="Assistenza Clienti Essepi Ricambi" className="fixed bottom-5 right-5 z-40">
      {/* Expanded Quick Contact Popover */}
      {isOpen && (
        <div className="mb-3 w-80 rounded-2xl glass-card border border-emerald-500/40 shadow-2xl p-4 space-y-3 bg-slate-950/95 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Supporto Tecnico Essepi
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              title="Chiudi"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-slate-300 leading-relaxed">
            Hai dubbi sulla compatibilità o cerchi un codice OEM non ancora a catalogo? I nostri esperti ricambisti rispondono subito.
          </p>

          <div className="space-y-2 pt-1 text-xs">
            {/* WhatsApp */}
            <a
              href="https://wa.me/393461811152?text=Salve%20Essepi%20Ricambi,%20vorrei%20verificare%20la%20compatibilit%C3%A0%20di%20un%20ricambio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white group-hover:text-emerald-400">WhatsApp Libretto</div>
                  <div className="text-[10px] text-slate-400">Foto libretto / VIN in tempo reale</div>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-400">
                Attivo
              </span>
            </a>

            {/* Direct Phone */}
            <a
              href="tel:+393461811152"
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white group-hover:text-orange-400">+39 346 181 1152</div>
                  <div className="text-[10px] text-slate-400">Chiamata diretta con magazziniere</div>
                </div>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:info@essepiricambi.it"
              className="flex items-center gap-2.5 p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[11px]">info@essepiricambi.it</span>
            </a>
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> Lun - Ven 8:30 - 18:30
            </span>
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-3 h-3" /> Evasione 24h
            </span>
          </div>
        </div>
      )}

      {/* Floating Trigger Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full shadow-2xl transition-all duration-300 font-semibold text-xs border cursor-pointer active:scale-95 ${
          isOpen
            ? 'bg-slate-900 border-slate-700 text-white'
            : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white border-emerald-400/30 shadow-emerald-500/20'
        }`}
        title="Assistenza e Contatti Essepi Ricambi"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
        <MessageSquare className="w-4 h-4" />
        <span className="font-bold tracking-wide">Contatti & Assistenza</span>
      </button>
    </aside>
  );
}
