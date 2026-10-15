'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, Settings, Check, X } from 'lucide-react';
import { useStore } from '@/lib/store';

export default function CookieBanner() {
  const { cookieConsent, saveCookieConsent } = useStore();
  const [showPreferences, setShowPreferences] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || cookieConsent) {
    return null;
  }

  const handleAcceptAll = () => {
    saveCookieConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    });
  };

  const handleRejectNonEssential = () => {
    saveCookieConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    });
  };

  const handleSaveCustom = () => {
    saveCookieConsent({
      necessary: true,
      analytics: analyticsEnabled,
      marketing: marketingEnabled,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800 shadow-2xl text-white animate-in slide-in-from-bottom duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        {/* Information text */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
              <Shield className="w-3.5 h-3.5" />
            </div>
            <h4 className="text-sm font-bold text-white tracking-wide">
              Informativa Cookie & Protezione della Privacy (GDPR UE 2016/679)
            </h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
            Su <strong className="text-white">Essepi Ricambi</strong> utilizziamo cookie tecnici essenziali per garantire il funzionamento del carrello, la selezione dei veicoli e la sicurezza delle transazioni. Con il tuo consenso, utilizziamo inoltre cookie analitici e di profilazione per migliorare l&apos;esperienza d&apos;acquisto e offrirti ricambi pertinenti. Puoi accettare tutti i cookie, rifiutare quelli facoltativi o personalizzare le tue preferenze in qualsiasi momento. Consulta la nostra{' '}
            <Link href="/cookie" className="text-orange-400 underline hover:text-orange-300">
              Cookie Policy
            </Link>{' '}
            e l&apos;{' '}
            <Link href="/privacy" className="text-orange-400 underline hover:text-orange-300">
              Informativa Privacy
            </Link>.
          </p>

          {/* Granular modal/dropdown if requested */}
          {showPreferences && (
            <div className="pt-3 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center justify-between font-bold text-slate-200">
                  <span>Cookie Tecnici</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Obbligatori</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Necessari per la gestione della sessione, del carrello e della cassa.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center justify-between font-bold text-slate-200">
                  <span>Cookie Analitici</span>
                  <input
                    type="checkbox"
                    checked={analyticsEnabled}
                    onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                    className="accent-orange-500 rounded"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Dati statistici aggregati e anonimizzati per migliorare le prestazioni del catalogo.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center justify-between font-bold text-slate-200">
                  <span>Cookie Marketing</span>
                  <input
                    type="checkbox"
                    checked={marketingEnabled}
                    onChange={(e) => setMarketingEnabled(e.target.checked)}
                    className="accent-orange-500 rounded"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Suggerimenti personalizzati e offerte sui ricambi compatibili con la tua vettura.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto flex-shrink-0">
          <button
            type="button"
            onClick={() => setShowPreferences(!showPreferences)}
            className="px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Settings className="w-3.5 h-3.5 text-slate-400" />
            <span>{showPreferences ? 'Nascondi Preferenze' : 'Personalizza'}</span>
          </button>

          <button
            type="button"
            onClick={handleRejectNonEssential}
            className="px-4 py-2 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            Solo Necessari
          </button>

          {showPreferences ? (
            <button
              type="button"
              onClick={handleSaveCustom}
              className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-xs font-bold text-slate-950 transition-colors shadow-md"
            >
              Salva Scelte
            </button>
          ) : (
            <button
              type="button"
              onClick={handleAcceptAll}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:brightness-110 text-xs font-bold text-white transition-all shadow-md shadow-orange-500/20"
            >
              Accetta Tutti
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
