import React from 'react';
import Link from 'next/link';
import { RotateCcw, ArrowLeft, ShieldCheck, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function RecessoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-slate-300 text-xs sm:text-sm leading-relaxed">
      
      <div className="border-b border-slate-800 pb-6 space-y-2">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-orange-400 hover:underline mb-2">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Torna alla Home</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          Diritto di Recesso & Garanzia Legale di Conformità
        </h1>
        <p className="text-xs text-slate-400">
          Informativa obbligatoria ai sensi degli articoli 49, 52 e seguenti del D.Lgs. 206/2005 (Codice del Consumo).
        </p>
      </div>

      <div className="space-y-6">
        
        {/* Key Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center">
              <RotateCcw className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">14 Giorni di Ripensamento</h3>
            <p className="text-xs text-slate-400">
              Hai 14 giorni di calendario dalla ricezione del ricambio per restituirlo senza alcuna penale.
            </p>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Garanzia di Conformità 24 Mesi</h3>
            <p className="text-xs text-slate-400">
              Tutti i ricambi venduti a privati godono di 24 mesi di garanzia legale contro difetti di fabbricazione.
            </p>
          </div>
        </div>

        {/* 1. Modalità di recesso */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase tracking-wide">
            1. Come Esercitare il Diritto di Recesso
          </h2>
          <p>
            Il consumatore ha il diritto di recedere dal contratto entro <strong>14 giorni</strong> a partire dal giorno in cui il consumatore o un terzo designato acquisisce il possesso fisico dei beni.
          </p>
          <p>
            Per esercitare il recesso, è sufficiente informarci della decisione inviando una comunicazione esplicita tramite:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Email ordinaria all&apos;indirizzo: <strong className="text-orange-400">info@partsit.it</strong></li>
            <li>PEC (Posta Elettronica Certificata): <strong className="text-white">essepiricambi@legalmail.it</strong></li>
            <li>Messaggio WhatsApp al Servizio Clienti: <strong className="text-emerald-400">+39 346 181 1152</strong> con indicazione del numero d&apos;ordine.</li>
          </ul>
        </section>

        {/* 2. Condizioni del ricambio reso */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase tracking-wide">
            2. Condizioni per l&apos;Accettazione del Reso
          </h2>
          <p>
            Trattandosi di ricambi automobilistici di sicurezza e precisione meccanica, per poter procedere al rimborso integrale:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Il ricambio <strong>non deve essere stato montato o utilizzato su strada</strong> (non deve presentare tracce di olio, grasso, graffi di montaggio o manomissioni).</li>
            <li>Il ricambio deve essere restituito nella sua <strong>confezione originale integra</strong>, completa di tutti gli accessori, guarnizioni, viti e manuali ove previsti.</li>
            <li>I ricambi elettrici o centraline non devono presentare segni di cortocircuito o programmazione non autorizzata.</li>
          </ul>
        </section>

        {/* 3. Rimborso */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase tracking-wide">
            3. Tempi e Modalità di Rimborso
          </h2>
          <p>
            In caso di recesso, verranno rimborsati tutti i pagamenti ricevuti dal consumatore, comprensivi dei costi di consegna standard (con esclusione di eventuali costi supplementari derivanti dalla scelta di un tipo di consegna speciale o contrassegno), entro <strong>14 giorni</strong> dal momento in cui siamo informati della decisione di recedere.
          </p>
          <p>
            Il rimborso viene eseguito utilizzando lo stesso mezzo di pagamento impiegato per la transazione iniziale (riaccredito su carta di credito, conto PayPal o bonifico bancario su IBAN indicato). Il rimborso può essere sospeso fino al ricevimento effettivo del ricambio presso il nostro magazzino e alla sua verifica tecnica.
          </p>
        </section>

        {/* 4. Modulo Tipo di Recesso */}
        <section className="space-y-3 pt-4 border-t border-slate-800">
          <h2 className="text-base font-bold text-white uppercase tracking-wide flex items-center gap-2">
            <FileText className="w-4 h-4 text-orange-400" />
            <span>Modulo Tipo di Recesso (Allegato I, parte B del D.Lgs. 206/2005)</span>
          </h2>
          <p>
            Puoi copiare, compilare e inviarci il seguente testo via email a <strong className="text-orange-400">info@partsit.it</strong>:
          </p>
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 font-mono text-xs text-slate-300 space-y-2 select-all">
            <div>Destinatario: ESSEPI RICAMBI S.R.L. - Email: info@partsit.it</div>
            <div>Oggetto: Esercizio del Diritto di Recesso</div>
            <div className="pt-2">Con la presente notifico il recesso dal mio contratto di vendita per i seguenti beni:</div>
            <div>- Numero d&apos;ordine: [inserisci numero, es. ESP-2026-0038]</div>
            <div>- Descrizione ricambio e codice OEM: [inserisci titolo e codice]</div>
            <div>- Ordinato il: [data] / Ricevuto il: [data]</div>
            <div>- Nome e cognome del consumatore: [inserisci nome]</div>
            <div>- Indirizzo del consumatore: [inserisci indirizzo]</div>
            <div>- Eventuale IBAN per rimborso (se pagato con bonifico/contrassegno): [inserisci IBAN]</div>
            <div>- Data e firma (se cartaceo)</div>
          </div>
        </section>

      </div>

    </div>
  );
}
