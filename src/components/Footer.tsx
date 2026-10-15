'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Wrench, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  CreditCard, 
  Phone, 
  Mail, 
  MessageSquare,
  Lock,
  ExternalLink
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs mt-20">
      
      {/* Trust Badges Strip */}
      <div className="border-b border-slate-800/80 bg-slate-900/40 py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center flex-shrink-0 border border-orange-500/20">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">Spedizioni 24/48h</div>
              <div className="text-slate-400 text-[11px]">Consegne rapide e tracciate con corrieri BRT, GLS e DHL in tutta Italia.</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center flex-shrink-0 border border-cyan-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">Ricambi Verificati al 100%</div>
              <div className="text-slate-400 text-[11px]">Ricambi OEM originali, New Old Stock e aftermarket certificati di primo impianto.</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0 border border-emerald-500/20">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">Diritto di Recesso 14 Giorni</div>
              <div className="text-slate-400 text-[11px]">Garanzia legale di 24 mesi e procedura di reso rapida a norma di legge.</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0 border border-amber-500/20">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">Pagamenti Protetti SSL</div>
              <div className="text-slate-400 text-[11px]">Carta di credito, PayPal (anche in 3 rate), bonifico o contrassegno al corriere.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Navigation & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand & Corporate Summary */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white">
                <Wrench className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white tracking-tight uppercase">
                ESSEPI<span className="text-orange-500">RICAMBI</span>
              </span>
            </div>

            <p className="text-slate-300 leading-relaxed max-w-sm">
              Lavoriamo ogni giorno per fornire ricambi originali e aftermarket delle migliori marche al miglior prezzo online. Specializzati in ricambi nuovi da stock d&apos;epoca (NOS), componenti meccanici, fanaleria e carrozzeria per auto e moto.
            </p>

            <div className="space-y-1.5 pt-2 text-slate-400 font-mono text-[11px]">
              <div><strong>Ragione Sociale:</strong> ESSEPI RICAMBI S.R.L.</div>
              <div><strong>Partita IVA & C.F.:</strong> IT 03948270361</div>
              <div><strong>Numero REA:</strong> MO-428190 | Cap. Soc. € 20.000,00 i.v.</div>
              <div><strong>Sede Operativa & Logistica:</strong> Via Emilia / Distretto Automotive - Italia</div>
              <div><strong>PEC:</strong> essepiricambi@legalmail.it</div>
            </div>

            {/* eBay Store link */}
            <div className="pt-2">
              <a
                href="https://www.ebay.it/str/essepiricambi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-white transition-colors"
              >
                <span>Visita il nostro Negozio Storico su eBay (3.600+ vendite)</span>
                <ExternalLink className="w-3 h-3 text-orange-400" />
              </a>
            </div>
          </div>

          {/* Quick Catalog Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Catalogo Ricambi
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/catalogo?categoria=freni" className="hover:text-orange-400 transition-colors">
                  Impianto Frenante & Pastiglie
                </Link>
              </li>
              <li>
                <Link href="/catalogo?categoria=distribuzione" className="hover:text-orange-400 transition-colors">
                  Kit Cinghie & Distribuzione
                </Link>
              </li>
              <li>
                <Link href="/catalogo?categoria=illuminazione" className="hover:text-orange-400 transition-colors">
                  Fanali Anteriori & Posteriori
                </Link>
              </li>
              <li>
                <Link href="/catalogo?categoria=sospensioni" className="hover:text-orange-400 transition-colors">
                  Sospensioni & Cuscinetti Mozzo
                </Link>
              </li>
              <li>
                <Link href="/catalogo?categoria=motore" className="hover:text-orange-400 transition-colors">
                  Guarnizioni & Testate Motore
                </Link>
              </li>
              <li>
                <Link href="/catalogo?categoria=carrozzeria" className="hover:text-orange-400 transition-colors">
                  Alzacristalli & Cristalli
                </Link>
              </li>
              <li>
                <Link href="/catalogo?categoria=accessori" className="hover:text-orange-400 transition-colors">
                  Accessori Interni & Parasole
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service & Information */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Assistenza & Spedizioni
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/spedizioni" className="hover:text-orange-400 transition-colors">
                  Tariffe e Tempi di Spedizione
                </Link>
              </li>
              <li>
                <Link href="/recesso" className="hover:text-orange-400 transition-colors">
                  Diritto di Recesso e Garanzia 24M
                </Link>
              </li>
              <li>
                <Link href="/contatti" className="hover:text-orange-400 transition-colors">
                  Richiesta Preventivo & Ricerca Codice
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
                  Pannello Gestione (Magazzino / Soci)
                </Link>
              </li>
            </ul>

            <div className="pt-3">
              <div className="text-[11px] font-bold text-white mb-1">Preventivi & Compatibilità</div>
              <p className="text-[11px] text-slate-400 leading-normal">
                Non trovi il codice? Inviaci la foto del libretto o il numero di telaio (VIN) su WhatsApp.
              </p>
            </div>
          </div>

          {/* Legal Compliance Links (Italy / EU) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Note Legali & Fisco
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="hover:text-orange-400 transition-colors">
                  Informativa Privacy (GDPR)
                </Link>
              </li>
              <li>
                <Link href="/termini" className="hover:text-orange-400 transition-colors">
                  Termini e Condizioni di Vendita
                </Link>
              </li>
              <li>
                <Link href="/cookie" className="hover:text-orange-400 transition-colors">
                  Cookie Policy & Preferenze
                </Link>
              </li>
              <li>
                <Link href="/recesso" className="hover:text-orange-400 transition-colors">
                  Istruzioni sul Diritto di Recesso
                </Link>
              </li>
            </ul>

            {/* Direct Contact info */}
            <div className="pt-2 space-y-1.5">
              <a 
                href="mailto:info@partsit.it" 
                className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-orange-400" />
                <span>info@partsit.it</span>
              </a>
              <a 
                href="https://wa.me/393461811152" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp: +39 346 181 1152</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-300">
          <div>
            © 2026 ESSEPI RICAMBI S.R.L. Tutti i diritti riservati. I marchi automobilistici e i codici OEM citati appartengono ai rispettivi proprietari e sono utilizzati unicamente a scopo identificativo della compatibilità dei ricambi.
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <span>Fatturazione Elettronica B2B/B2C</span>
            <span>•</span>
            <span>IVA 22% Esposta</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
