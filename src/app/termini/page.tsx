import React from 'react';
import Link from 'next/link';
import { FileText, ArrowLeft, ShieldCheck, Scale } from 'lucide-react';

export default function TerminiPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-slate-300 text-xs sm:text-sm leading-relaxed">
      
      <div className="border-b border-slate-800 pb-6 space-y-2">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-orange-400 hover:underline mb-2">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Torna alla Home</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          Termini e Condizioni Generali di Vendita
        </h1>
        <p className="text-xs text-slate-400">
          Ai sensi del D.Lgs. 206/2005 (Codice del Consumo) e del D.Lgs. 70/2003 sul Commercio Elettronico.
        </p>
      </div>

      <div className="space-y-6">
        
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase tracking-wide flex items-center gap-2">
            <Scale className="w-4 h-4 text-orange-400" />
            <span>1. Informazioni Generali sul Venditore</span>
          </h2>
          <p>
            Il presente sito di e-commerce è di proprietà ed è gestito da:
          </p>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-slate-200 space-y-1">
            <div><strong>Venditore:</strong> ESSEPI RICAMBI S.R.L.</div>
            <div><strong>P.IVA & C.F.:</strong> IT 03948270361</div>
            <div><strong>Iscrizione REA:</strong> MO-428190</div>
            <div><strong>Email di Contatto:</strong> info@partsit.it</div>
            <div><strong>Assistenza Clienti WhatsApp:</strong> +39 346 181 1152</div>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase tracking-wide">
            2. Oggetto del Servizio e Natura dei Prodotti
          </h2>
          <p>
            Essepi Ricambi commercializza componenti meccanici, carrozzeria, fanaleria, cinghie, guarnizioni e accessori per autovetture e motocicli. I prodotti possono appartenere alle seguenti categorie chiaramente esplicitate nella scheda articolo:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Nuovo Originale:</strong> Ricambio autentico della casa costruttrice (OEM).</li>
            <li><strong>Nuovo NOS (New Old Stock):</strong> Ricambio originale nuovo di fabbrica mai installato, proveniente da giacenze storiche di magazzino.</li>
            <li><strong>Aftermarket Certificato:</strong> Ricambio di primo impianto o equivalente di qualità certificata prodotto da primari costruttori automobilistici.</li>
            <li><strong>Ricondizionato Garantito:</strong> Componente revisionato e testato al banco di prova prima della messa in vendita.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase tracking-wide">
            3. Prezzi di Vendita, Scorporo IVA e Spedizioni
          </h2>
          <p>
            Tutti i prezzi indicati sulle schede prodotto sono espressi in Euro (€) e sono composti da <strong>Prezzo Netto Imponibile + IVA di legge (22%)</strong>, con l&apos;indicazione del prezzo totale lordo da corrispondere.
          </p>
          <p>
            I costi di spedizione e le eventuali opzioni accessorie (es. assicurazione o supplemento contrassegno) sono chiaramente evidenziati nel carrello prima della conclusione dell&apos;ordine. Per ordini con importo pari o superiore a €149,00 la spedizione express standard è <strong>gratuita</strong>.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase tracking-wide">
            4. Conclusione del Contratto ed Emissione Documento Fiscale
          </h2>
          <p>
            Il contratto si intende concluso con l&apos;invio della conferma d&apos;ordine all&apos;indirizzo email indicato dal cliente.
          </p>
          <p>
            Ai sensi della legislazione italiana:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Per i <strong>clienti privati (B2C)</strong> viene emesso documento commerciale/scontrino telematico o ricevuta fiscale con indicazione del Codice Fiscale.</li>
            <li>Per i <strong>clienti con Partita IVA (B2B, officine, rivenditori)</strong> viene emessa regolare <strong>Fattura Elettronica</strong> inviata tramite il Sistema di Interscambio (SDI) dell&apos;Agenzia delle Entrate, previa indicazione del codice destinatario o PEC in fase di checkout.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase tracking-wide">
            5. Garanzia Legale di Conformità (24 Mesi)
          </h2>
          <p>
            In conformità agli articoli 128-135 del Codice del Consumo, tutti i prodotti venduti ai consumatori privati sono coperti dalla garanzia legale di <strong>24 mesi</strong> per difetti di conformità esistenti al momento della consegna. Per gli acquisti effettuati da professionisti e soggetti con Partita IVA, la garanzia è di <strong>12 mesi</strong> ai sensi del Codice Civile.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase tracking-wide">
            6. Diritto di Recesso (14 Giorni)
          </h2>
          <p>
            Il consumatore ha diritto di recedere dal contratto entro <strong>14 giorni di calendario</strong> dalla consegna dei beni senza alcuna penalità e senza dover fornire alcuna motivazione. Per la procedura dettagliata, consultare la pagina{' '}
            <Link href="/recesso" className="text-orange-400 underline hover:text-orange-300">
              Diritto di Recesso e Resi
            </Link>.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase tracking-wide">
            7. Legge Applicabile e Foro Competente
          </h2>
          <p>
            I contratti conclusi tramite il sito sono regolati dalla legge italiana. Per qualsiasi controversia con consumatori privati, la competenza territoriale inderogabile è quella del giudice del luogo di residenza o di domicilio del consumatore, ai sensi del Codice del Consumo.
          </p>
        </section>

      </div>

    </div>
  );
}
