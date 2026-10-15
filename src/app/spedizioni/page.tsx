import React from 'react';
import Link from 'next/link';
import { Truck, ShieldCheck, Clock, Check, ArrowLeft, PackageCheck, AlertCircle, AlertTriangle } from 'lucide-react';

export default function SpedizioniPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-slate-300 text-xs sm:text-sm leading-relaxed">
      
      <div className="border-b border-slate-800 pb-6 space-y-2">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-orange-400 hover:underline mb-2">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Torna alla Home</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          Politica di Spedizione, Tempi & Tariffe di Consegna
        </h1>
        <p className="text-xs text-slate-400">
          Spedizioni espresse in tutta Italia con corrieri tracciati BRT, GLS e DHL Express.
        </p>
      </div>

      <div className="space-y-6">
        
        {/* Highlight Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-orange-500/10 via-slate-900 to-slate-950 border border-orange-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-bold text-orange-400 uppercase tracking-widest">
              Spedizione Gratuita
            </div>
            <div className="text-lg font-bold text-white">
              Consegna Standard Omaggio per ordini superiori a € 149,00
            </div>
            <div className="text-xs text-slate-400">
              Applicata automaticamente al carrello per tutte le destinazioni in Italia.
            </div>
          </div>
          <Link
            href="/catalogo"
            className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs whitespace-nowrap shadow-md shadow-orange-500/20 transition-colors"
          >
            Vai al Catalogo
          </Link>
        </div>

        {/* Tariffe Table */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-white uppercase tracking-wide">
            1. Tariffe di Spedizione in Italia
          </h2>
          <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase bg-slate-950/60">
                  <th className="p-3.5">Metodo di Spedizione</th>
                  <th className="p-3.5">Corriere Utilizzato</th>
                  <th className="p-3.5">Tempi di Transito</th>
                  <th className="p-3.5 text-right">Costo IVA Inclusa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                <tr>
                  <td className="p-3.5 font-bold text-white">Corriere Espresso Standard</td>
                  <td className="p-3.5 text-slate-300">BRT / GLS Italy</td>
                  <td className="p-3.5 font-mono text-cyan-400">24/48 ore lavorative</td>
                  <td className="p-3.5 font-mono font-bold text-emerald-400 text-right">€7,90 (Gratis sopra €149)</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-white">Spedizione Protetta & Assicurata</td>
                  <td className="p-3.5 text-slate-300">DHL Express / BRT All-Risk</td>
                  <td className="p-3.5 font-mono text-cyan-400">24 ore garantite</td>
                  <td className="p-3.5 font-mono font-bold text-white text-right">€13,90</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-white">Ritiro a Mano in Magazzino</td>
                  <td className="p-3.5 text-slate-300">Sede Logistica Essepi Ricambi</td>
                  <td className="p-3.5 font-mono text-cyan-400">Pronto in 2 ore</td>
                  <td className="p-3.5 font-mono font-bold text-emerald-400 text-right">GRATUITO (€0,00)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Tempi di evasione */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase tracking-wide flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>2. Orari di Evasione e Partenza Merci</span>
          </h2>
          <p>
            Tutti gli ordini regolarmente confermati e pagati entro le <strong>ore 12:00</strong> dei giorni lavorativi (dal lunedì al venerdì) vengono affidati al corriere espresso nel primo pomeriggio del medesimo giorno.
          </p>
          <p>
            Gli ordini inseriti dopo le ore 12:00 o durante il weekend vengono evasi il primo giorno lavorativo successivo.
          </p>
        </section>

        {/* Tracciamento */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase tracking-wide flex items-center gap-2">
            <PackageCheck className="w-4 h-4 text-emerald-400" />
            <span>3. Tracciamento del Pacco (Tracking Online)</span>
          </h2>
          <p>
            Al momento dell&apos;affidamento del pacco al corriere, il cliente riceve un&apos;email automatica e un messaggio contenente il link di tracciamento e il <strong>numero di lettera di vettura (LDV)</strong>. È possibile seguire lo stato della consegna in tempo reale.
          </p>
        </section>

        {/* Riserva di controllo */}
        <section className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
          <div className="font-bold text-amber-400 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" />
            <span>Istruzioni Importanti alla Consegna (Firma con Riserva)</span>
          </div>
          <p className="text-slate-300">
            Al momento della ricezione, invitiamo il cliente a verificare l&apos;integrità dell&apos;imballo. Nel caso in cui il pacco presenti ammaccature visibili, aperture o nastro adesivo del corriere, è fondamentale firmare la ricevuta del corriere apponendo la dicitura: <strong>&quot;ACCETTATO CON RISERVA DI CONTROLLO SPECIFICA PER PACCO DANNEGGIATO&quot;</strong>.
          </p>
        </section>

      </div>

    </div>
  );
}
