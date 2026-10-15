import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Mail, Building, ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-slate-300 text-xs sm:text-sm leading-relaxed">
      
      <div className="border-b border-slate-800 pb-6 space-y-2">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-orange-400 hover:underline mb-2">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Torna alla Home</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          Informativa sul Trattamento dei Dati Personali (Privacy Policy)
        </h1>
        <p className="text-xs text-slate-400">
          Ai sensi dell&apos;art. 13 del Regolamento UE 2016/679 (GDPR) e della normativa italiana vigente. Ultimo aggiornamento: Ottobre 2026.
        </p>
      </div>

      <div className="space-y-6">
        
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase tracking-wide flex items-center gap-2">
            <Building className="w-4 h-4 text-orange-400" />
            <span>1. Titolare del Trattamento</span>
          </h2>
          <p>
            Il Titolare del trattamento dei dati raccolti tramite questo sito web è:
          </p>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-slate-200 space-y-1">
            <div><strong>Ragione Sociale:</strong> ESSEPI RICAMBI S.R.L.</div>
            <div><strong>Sede Operativa:</strong> Italia</div>
            <div><strong>Partita IVA / Codice Fiscale:</strong> IT 03948270361</div>
            <div><strong>Numero REA:</strong> MO-428190</div>
            <div><strong>Email di Contatto Privacy:</strong> info@partsit.it</div>
            <div><strong>PEC:</strong> essepiricambi@legalmail.it</div>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase tracking-wide">
            2. Tipologia di Dati Trattati
          </h2>
          <p>
            Nel corso dell&apos;utilizzo del sito e dell&apos;acquisto di ricambi auto, trattiamo le seguenti categorie di dati:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Dati anagrafici e di contatto:</strong> Nome, cognome, indirizzo di residenza o sede legale, numero di telefono, indirizzo email.</li>
            <li><strong>Dati fiscali obbligatori:</strong> Codice Fiscale per persone fisiche/privati, Partita IVA, Codice Destinatario SDI e PEC per aziende e officine.</li>
            <li><strong>Dati relativi al veicolo:</strong> Marca, modello, anno e numero di telaio (VIN) forniti spontaneamente per la verifica tecnica di compatibilità del ricambio.</li>
            <li><strong>Dati di navigazione e tecnici:</strong> Indirizzo IP anonimizzato, log di sistema e cookie tecnici necessari al carrello.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase tracking-wide">
            3. Finalità e Base Giuridica del Trattamento
          </h2>
          <p>I dati personali sono trattati esclusivamente per:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Esecuzione del contratto di compravendita:</strong> Gestione dell&apos;ordine, evasione del ricambio, imballaggio e consegna a domicilio tramite corriere espresso (art. 6, par. 1, lett. b, GDPR).</li>
            <li><strong>Adempimento di obblighi di legge:</strong> Emissione della fattura elettronica B2B/B2C, tenuta delle scritture contabili, adempimenti tributari e antiriciclaggio (art. 6, par. 1, lett. c, GDPR).</li>
            <li><strong>Assistenza tecnica pre e post-vendita:</strong> Risposta a richieste di compatibilità dei codici OEM anche via WhatsApp su richiesta diretta dell&apos;utente.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase tracking-wide">
            4. Destinatari dei Dati e Logistica
          </h2>
          <p>
            I dati possono essere comunicati esclusivamente a soggetti terzi strettamente necessari all&apos;evasione dell&apos;ordine, nominati se necessario Responsabili del Trattamento:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Corrieri espressi incaricati del trasporto:</strong> BRT S.p.A., GLS Italy, DHL Express per la consegna fisica dei ricambi e la gestione del tracking.</li>
            <li><strong>Istituti bancari e gateway di pagamento:</strong> Sistemi conformi PCI-DSS con crittografia SSL per l&apos;elaborazione sicura di carte di credito e PayPal.</li>
            <li><strong>Consulenti fiscali e Commercialista:</strong> Per la tenuta della contabilità ordinaria e la trasmissione telematica dei corrispettivi all&apos;Agenzia delle Entrate.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase tracking-wide">
            5. Periodo di Conservazione dei Dati
          </h2>
          <p>
            I dati fiscali e contrattuali sono conservati per 10 anni in conformità all&apos;art. 2220 del Codice Civile. I dati raccolti per finalità di assistenza tecnica o preventivo vengono cancellati entro 12 mesi dalla conclusione della richiesta.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase tracking-wide">
            6. Diritti dell&apos;Interessato (Artt. 15-22 GDPR)
          </h2>
          <p>
            In qualità di interessato, hai il diritto di richiedere l&apos;accesso ai tuoi dati personali, la rettifica, la cancellazione (diritto all&apos;oblio nei limiti di legge fiscale), la limitazione del trattamento o la portabilità dei dati. Per esercitare tali diritti, è sufficiente inviare un&apos;email a <strong className="text-orange-400">info@partsit.it</strong>.
          </p>
        </section>

      </div>

    </div>
  );
}
