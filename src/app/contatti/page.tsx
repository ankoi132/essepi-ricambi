'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Phone, 
  Mail, 
  MessageSquare, 
  Clock, 
  Building, 
  Send, 
  CheckCircle2, 
  ArrowLeft,
  Wrench,
  HelpCircle
} from 'lucide-react';

export default function ContattiPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [carInfo, setCarInfo] = useState('');
  const [vinCode, setVinCode] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-slate-300 text-xs sm:text-sm">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 space-y-2">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-orange-400 hover:underline mb-2">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Torna alla Home</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          Assistenza Clienti & Richiesta Preventivi
        </h1>
        <p className="text-xs text-slate-400">
          Hai bisogno di confermare la compatibilità di un ricambio o cerchi un codice non ancora a catalogo? Contattaci subito.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Contact info cards */}
        <div className="space-y-4">
          
          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-sm">
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Rapido</span>
            </div>
            <p className="text-xs text-slate-300">
              Il canale più veloce: inviaci una foto del libretto o del pezzo vecchio per una risposta immediata.
            </p>
            <a
              href="https://wa.me/393461811152"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 font-mono font-bold text-emerald-400 hover:underline text-sm"
            >
              +39 346 181 1152
            </a>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2.5 text-orange-400 font-bold text-sm">
              <Mail className="w-4 h-4" />
              <span>Email Ordinaria</span>
            </div>
            <p className="text-xs text-slate-300">
              Per preventivi complessi, ordini multipli o richieste B2B per officine.
            </p>
            <a
              href="mailto:info@partsit.it"
              className="inline-block mt-2 font-mono text-white hover:underline text-sm"
            >
              info@partsit.it
            </a>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2.5 text-cyan-400 font-bold text-sm">
              <Clock className="w-4 h-4" />
              <span>Orari Magazzino</span>
            </div>
            <div className="text-xs space-y-1 text-slate-400">
              <div><strong>Lunedì - Venerdì:</strong> 08:30 - 13:00 / 14:30 - 18:30</div>
              <div><strong>Sabato:</strong> 09:00 - 12:30</div>
              <div><strong>Domenica:</strong> Chiuso</div>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2.5 text-white font-bold text-sm">
              <Building className="w-4 h-4 text-orange-400" />
              <span>Dati Aziendali</span>
            </div>
            <div className="text-[11px] font-mono text-slate-400 space-y-1">
              <div>ESSEPI RICAMBI S.R.L.</div>
              <div>P.IVA / C.F.: IT 03948270361</div>
              <div>PEC: essepiricambi@legalmail.it</div>
              <div>Sede Operativa: Italia</div>
            </div>
          </div>

        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
            
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Messaggio Inviato con Successo!</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Grazie per averci contattato. Un nostro esperto analizzerà i dati del veicolo e ti ricontatterà entro poche ore con il preventivo dettagliato.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700"
                >
                  Invia un altro messaggio
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <h3 className="text-base font-bold text-white uppercase tracking-wider">
                    Modulo di Richiesta Preventivo o Ricambio
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Compila i campi sottostanti per verificare il codice OEM o la disponibilità a magazzino.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                      Il Tuo Nome *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Mario Rossi"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                      Indirizzo Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="mario.rossi@email.it"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                      Recapito Telefonico *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+39 333 1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                      Vettura (Marca, Modello, Anno)
                    </label>
                    <input
                      type="text"
                      placeholder="es. VW Golf 4 1.9 TDI 2002"
                      value={carInfo}
                      onChange={(e) => setCarInfo(e.target.value)}
                      className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                    Numero di Telaio VIN o Codice Ricambio (Se disponibile)
                  </label>
                  <input
                    type="text"
                    placeholder="17 caratteri presenti sul libretto al punto (E) o codice OEM stampato sul pezzo"
                    value={vinCode}
                    onChange={(e) => setVinCode(e.target.value)}
                    className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono uppercase focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                    Descrizione del Pezzo Cercato o Messaggio *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Descrivi il pezzo che stai cercando, la posizione (destra/sinistra, anteriore/posteriore) o qualsiasi dettaglio utile..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:brightness-110 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Invia Richiesta Preventivo</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
