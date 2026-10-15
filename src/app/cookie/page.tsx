import React from 'react';
import Link from 'next/link';
import { Shield, ArrowLeft } from 'lucide-react';

export default function CookiePolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-slate-300 text-xs sm:text-sm leading-relaxed">
      
      <div className="border-b border-slate-800 pb-6 space-y-2">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-orange-400 hover:underline mb-2">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Torna alla Home</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          Cookie Policy & Strumenti di Tracciamento
        </h1>
        <p className="text-xs text-slate-400">
          In conformità alle Linee Guida del Garante per la Protezione dei Dati Personali del 10 giugno 2021.
        </p>
      </div>

      <div className="space-y-6">
        
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase tracking-wide">
            1. Cosa sono i Cookie
          </h2>
          <p>
            I cookie sono stringhe di testo di piccole dimensioni che i siti visitati dall&apos;utente inviano al suo terminale (solitamente al browser), dove vengono memorizzati per essere poi ritrasmessi agli stessi siti alla successiva visita del medesimo utente.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase tracking-wide">
            2. Tipologie di Cookie Utilizzati su Essepi Ricambi
          </h2>
          
          <div className="space-y-4 pt-2">
            
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <div className="font-bold text-white flex items-center justify-between">
                <span>A) Cookie Tecnici di Sessione e Funzionali (Strettamente Necessari)</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold">Sempre Attivi</span>
              </div>
              <p className="text-xs text-slate-400">
                Questi cookie sono indispensabili per il corretto funzionamento del sito. Consentono la gestione del carrello acquisti, la memorizzazione della vettura selezionata nel garage virtuale, la procedura di pagamento sicuro e la registrazione del consenso privacy. Per l&apos;installazione di tali cookie non è richiesto il preventivo consenso dell&apos;utente (art. 122 del Codice Privacy).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <div className="font-bold text-white flex items-center justify-between">
                <span>B) Cookie Analitici e Prestazionali (Anonimizzati)</span>
                <span className="text-[10px] bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded font-bold">Facoltativi</span>
              </div>
              <p className="text-xs text-slate-400">
                Utilizzati per raccogliere informazioni statistiche in forma aggregata e anonima sul numero di visitatori e sulle pagine più consultate del catalogo ricambi. Sono configurati con mascheramento dell&apos;indirizzo IP.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <div className="font-bold text-white flex items-center justify-between">
                <span>C) Cookie di Profilazione e Marketing</span>
                <span className="text-[10px] bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded font-bold">Previo Consenso</span>
              </div>
              <p className="text-xs text-slate-400">
                Volti a creare profili relativi all&apos;utente al fine di inviare comunicazioni o mostrare ricambi in linea con le preferenze manifestate (ad esempio, compatibilità con marche auto preferite). Vengono installati esclusivamente in caso di esplicita accettazione tramite il banner cookie.
              </p>
            </div>

          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase tracking-wide">
            3. Come Modificare le Preferenze o Disabilitare i Cookie
          </h2>
          <p>
            Puoi modificare o revocare il tuo consenso in qualsiasi momento cancellando la cronologia o i cookie del tuo browser, oppure cliccando su &quot;Cookie&quot; nel footer per riaprire il pannello delle preferenze.
          </p>
          <p>
            Puoi inoltre gestire le preferenze direttamente dalle impostazioni del tuo browser (Chrome, Firefox, Safari, Edge). La disattivazione dei cookie tecnici potrebbe compromettere la possibilità di inserire articoli nel carrello ed effettuare acquisti.
          </p>
        </section>

      </div>

    </div>
  );
}
