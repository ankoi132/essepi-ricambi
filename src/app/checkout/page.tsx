'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Building2, 
  User, 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  FileText,
  AlertCircle,
  ShoppingBag,
  Printer,
  MessageSquare
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { SHIPPING_METHODS, PAYMENT_METHODS } from '@/lib/data';
import { CustomerData, ShippingMethod, PaymentMethod, Order } from '@/lib/types';

export default function CheckoutPage() {
  const router = useRouter();
  const { 
    cart, 
    createOrder, 
    cartSubtotalNet, 
    cartVat, 
    cartTotalGross 
  } = useStore();

  // Customer Form State
  const [customerType, setCustomerType] = useState<'private' | 'business'>('private');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [vatNumber, setVatNumber] = useState('');
  const [fiscalCode, setFiscalCode] = useState('');
  const [sdiCode, setSdiCode] = useState('0000000');
  const [pec, setPec] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [province, setProvince] = useState('');
  const [notes, setNotes] = useState('');

  // Shipping & Payment selection
  const [selectedShipping, setSelectedShipping] = useState<ShippingMethod>(SHIPPING_METHODS[0]);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(PAYMENT_METHODS[0]);

  // Legal Consents
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);

  // Completed Order State
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculations
  const isFreeShipping = selectedShipping.id === 'express_standard' && cartTotalGross >= 149.00;
  const shippingCost = isFreeShipping ? 0 : selectedShipping.price;
  const paymentFee = selectedPayment.extraFee;
  const grandTotal = parseFloat((cartTotalGross + shippingCost + paymentFee).toFixed(2));

  if (cart.length === 0 && !completedOrder) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold text-white">Carrello vuoto</h1>
        <p className="text-slate-400 text-xs">Non ci sono prodotti da acquistare al momento.</p>
        <Link href="/catalogo" className="inline-block px-5 py-2.5 bg-orange-500 text-white rounded-xl text-xs font-bold">
          Vai al Catalogo
        </Link>
      </div>
    );
  }

  // Handle Order Placement
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptTerms || !acceptPrivacy) {
      alert('Per procedere a norma di legge è necessario accettare i Termini di Vendita e l\'Informativa Privacy.');
      return;
    }

    if (customerType === 'business' && (!vatNumber || !companyName)) {
      alert('Per gli acquisti con fattura aziendale B2B è necessario compilare Ragione Sociale e Partita IVA.');
      return;
    }

    if (!fiscalCode) {
      alert('Il Codice Fiscale è obbligatorio per l\'emissione del documento fiscale in Italia.');
      return;
    }

    setIsSubmitting(true);

    const customer: CustomerData = {
      customerType,
      firstName,
      lastName,
      companyName: customerType === 'business' ? companyName : undefined,
      vatNumber: customerType === 'business' ? vatNumber : undefined,
      fiscalCode: fiscalCode.toUpperCase().trim(),
      sdiCode: customerType === 'business' ? sdiCode : undefined,
      pec: customerType === 'business' ? pec : undefined,
      email,
      phone,
      address,
      city,
      postalCode,
      province: province.toUpperCase(),
      country: 'Italia',
      notes
    };

    const newOrder = createOrder({
      customer,
      items: cart,
      shippingMethod: selectedShipping,
      paymentMethod: selectedPayment,
      subtotalNet: cartSubtotalNet,
      vatAmount: cartVat,
      shippingTotal: shippingCost,
      paymentExtraFee: paymentFee,
      totalGross: grandTotal,
      status: selectedPayment.id === 'bank_transfer' ? 'pending_payment' : 'processing',
      invoiceIssued: false
    });

    setCompletedOrder(newOrder);
    setIsSubmitting(false);
  };

  // SUCCESS CONFIRMATION VIEW
  if (completedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 space-y-8 animate-in fade-in duration-300">
        
        <div className="glass-card p-8 rounded-3xl border border-emerald-500/40 text-center space-y-4 bg-gradient-to-b from-emerald-950/20 to-slate-950">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40 shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Ordine Confermato con Successo!
          </h1>

          <div className="inline-block px-4 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-orange-400 font-mono text-sm font-bold">
            Numero Ordine: {completedOrder.orderNumber}
          </div>

          <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
            Grazie per aver scelto <strong>Essepi Ricambi</strong>. Abbiamo preso in carico il tuo ordine e inviato la conferma via email a <strong className="text-white">{completedOrder.customer.email}</strong>.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-semibold text-slate-200 flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Stampa Ricevuta</span>
            </button>
            <a
              href={`https://wa.me/393461811152?text=Salve%20Essepi%20Ricambi,%20ho%20appena%20concluso%20l'ordine%20${completedOrder.orderNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Avvisa su WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Order Details Summary Box */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4 text-xs">
          <h3 className="font-bold text-white text-sm border-b border-slate-800 pb-2">
            Dettagli della Spedizione e Fatturazione
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-300">
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase">Destinatario & Indirizzo:</div>
              <div className="font-semibold text-white mt-1">
                {completedOrder.customer.companyName || `${completedOrder.customer.firstName} ${completedOrder.customer.lastName}`}
              </div>
              <div>{completedOrder.customer.address}</div>
              <div>{completedOrder.customer.postalCode} {completedOrder.customer.city} ({completedOrder.customer.province})</div>
              <div className="text-slate-400 mt-1">Tel: {completedOrder.customer.phone}</div>
            </div>

            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase">Fisco & Fattura Italiana:</div>
              <div className="mt-1 font-mono text-slate-200">
                {completedOrder.customer.customerType === 'business' ? (
                  <>
                    <div>P.IVA: {completedOrder.customer.vatNumber}</div>
                    <div>Codice SDI: {completedOrder.customer.sdiCode}</div>
                    <div>PEC: {completedOrder.customer.pec || 'Non specificata'}</div>
                  </>
                ) : (
                  <div>C.F.: {completedOrder.customer.fiscalCode}</div>
                )}
              </div>
              <div className="text-slate-400 mt-2">
                Metodo di pagamento: <strong className="text-white">{completedOrder.paymentMethod.name}</strong>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-sm font-bold text-white">
            <span>Totale Pagato (IVA 22% inclusa):</span>
            <span className="text-orange-400 font-mono text-base">€{completedOrder.totalGross.toFixed(2)}</span>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-lg"
          >
            <span>Continua lo Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="pb-6 border-b border-slate-800">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
          Procedimento di Pagamento & Spedizione
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Transazione protetta con crittografia SSL 256-bit • Fatturazione italiana conforme al Codice del Consumo
        </p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left 2 Cols: Form Inputs */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. Customer Type Selector */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-orange-400" />
                <span>1. Tipologia Acquirente & Dati Fiscali</span>
              </h2>
              <div className="flex rounded-lg bg-slate-900 p-1 border border-slate-700 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setCustomerType('private')}
                  className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                    customerType === 'private' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Privato</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCustomerType('business')}
                  className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                    customerType === 'business' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Azienda / Officina</span>
                </button>
              </div>
            </div>

            {/* Inputs based on type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {customerType === 'business' && (
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                    Ragione Sociale Azienda / Ditta *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="es. Autofficina Rossi S.r.l."
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                  Nome Referente *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Mario"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                  Cognome *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Rossi"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              {customerType === 'business' ? (
                <>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                      Partita IVA *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="11 cifre (es. 01234567890)"
                      value={vatNumber}
                      onChange={(e) => setVatNumber(e.target.value)}
                      className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                      Codice Fiscale Aziendale *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Codice Fiscale / P.IVA"
                      value={fiscalCode}
                      onChange={(e) => setFiscalCode(e.target.value)}
                      className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono uppercase focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                      Codice Destinatario SDI (7 caratteri)
                    </label>
                    <input
                      type="text"
                      placeholder="0000000 se non posseduto"
                      value={sdiCode}
                      onChange={(e) => setSdiCode(e.target.value)}
                      className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono uppercase focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                      Indirizzo PEC (Posta Certificata)
                    </label>
                    <input
                      type="email"
                      placeholder="azienda@pec.it"
                      value={pec}
                      onChange={(e) => setPec(e.target.value)}
                      className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </>
              ) : (
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                    Codice Fiscale Privato * (obbligatorio per ricevuta/scontrino fiscale)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="16 caratteri (es. RSSMRA80A01H501U)"
                    value={fiscalCode}
                    onChange={(e) => setFiscalCode(e.target.value)}
                    className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono uppercase focus:outline-none focus:border-orange-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                  Email (per conferma e tracking) *
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

              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                  Telefono (per preavviso corriere) *
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
            </div>
          </div>

          {/* 2. Shipping Address */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Truck className="w-4 h-4 text-cyan-400" />
              <span>2. Indirizzo di Consegna in Italia</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="sm:col-span-3">
                <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                  Via / Piazza e Numero Civico *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Via Roma 10"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                  Città *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Milano, Roma, Bologna..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                  CAP (Codice Postale) *
                </label>
                <input
                  type="text"
                  required
                  maxLength={5}
                  placeholder="40121"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                  Provincia *
                </label>
                <input
                  type="text"
                  required
                  maxLength={2}
                  placeholder="BO, MI, RM..."
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono uppercase focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                  Note per la Consegna (Opzionale)
                </label>
                <input
                  type="text"
                  placeholder="es. Scala B, interno 4, suonare Rossi o lasciare al portiere"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          </div>

          {/* 3. Payment Method */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-400" />
              <span>3. Modalità di Pagamento</span>
            </h2>

            <div className="space-y-2.5 text-xs">
              {PAYMENT_METHODS.map((pm) => {
                const isSelected = selectedPayment.id === pm.id;
                return (
                  <label
                    key={pm.id}
                    onClick={() => setSelectedPayment(pm)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-orange-500/10 border-orange-500 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={isSelected}
                        onChange={() => setSelectedPayment(pm)}
                        className="accent-orange-500 w-4 h-4"
                      />
                      <div>
                        <div className="font-bold text-white flex items-center gap-2">
                          <span>{pm.name}</span>
                          {pm.badge && (
                            <span className="text-[10px] bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded font-bold">
                              {pm.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{pm.description}</div>
                      </div>
                    </div>

                    {pm.extraFee > 0 && (
                      <span className="text-xs font-mono font-bold text-amber-400">
                        +€{pm.extraFee.toFixed(2)}
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          </div>

          {/* 4. Mandatory Legal Checkboxes (EU GDPR & Italian Consumer Code) */}
          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3 text-xs bg-slate-900/50">
            <h3 className="font-bold text-white uppercase text-[11px] tracking-wider">
              Consensi Legali e Termini Contrattuali
            </h3>

            <label className="flex items-start gap-2.5 cursor-pointer text-slate-300">
              <input
                type="checkbox"
                required
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="accent-orange-500 rounded mt-0.5 w-4 h-4"
              />
              <span className="leading-relaxed">
                Ho letto e accetto integralmente i{' '}
                <Link href="/termini" target="_blank" className="text-orange-400 underline hover:text-orange-300">
                  Termini e Condizioni Generali di Vendita
                </Link>
                {' '}e le modalità del{' '}
                <Link href="/recesso" target="_blank" className="text-orange-400 underline hover:text-orange-300">
                  Diritto di Recesso a 14 Giorni
                </Link>
                {' '}(D.Lgs. 206/2005 Codice del Consumo). *
              </span>
            </label>

            <label className="flex items-start gap-2.5 cursor-pointer text-slate-300">
              <input
                type="checkbox"
                required
                checked={acceptPrivacy}
                onChange={(e) => setAcceptPrivacy(e.target.checked)}
                className="accent-orange-500 rounded mt-0.5 w-4 h-4"
              />
              <span className="leading-relaxed">
                Dichiaro di aver preso visione dell&apos;{' '}
                <Link href="/privacy" target="_blank" className="text-orange-400 underline hover:text-orange-300">
                  Informativa Privacy
                </Link>
                {' '}ai sensi del Regolamento UE 2016/679 (GDPR) e autorizzo il trattamento dei dati per la gestione dell&apos;ordine e l&apos;emissione del documento fiscale. *
              </span>
            </label>
          </div>

        </div>

        {/* Right 1 Col: Summary & Place Order Button */}
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-5 sticky top-28">
            
            <h3 className="font-bold text-white text-base border-b border-slate-800 pb-3 flex items-center justify-between">
              <span>Riepilogo Ordine</span>
              <span className="text-xs text-slate-400 font-normal">{cart.length} articoli</span>
            </h3>

            {/* Items preview */}
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1 text-xs divide-y divide-slate-800/60">
              {cart.map(item => (
                <div key={item.product.id} className="pt-2 first:pt-0 flex items-center justify-between gap-2">
                  <div className="truncate flex-1">
                    <div className="text-white font-medium truncate">{item.product.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {item.quantity}x €{item.product.priceGross.toFixed(2)} • OEM: {item.product.oemCode}
                    </div>
                  </div>
                  <div className="font-mono font-bold text-white text-xs">
                    €{(item.product.priceGross * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Fiscal summary */}
            <div className="pt-3 border-t border-slate-800 space-y-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Imponibile Netto:</span>
                <span className="font-mono text-white">€{cartSubtotalNet.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>IVA 22% (Scorporata):</span>
                <span className="font-mono">€{cartVat.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Spedizione ({selectedShipping.courier}):</span>
                <span className="font-mono text-white">
                  {shippingCost === 0 ? <strong className="text-emerald-400">GRATIS</strong> : `€${shippingCost.toFixed(2)}`}
                </span>
              </div>
              {paymentFee > 0 && (
                <div className="flex justify-between text-amber-400">
                  <span>Supplemento contrassegno:</span>
                  <span className="font-mono">+€{paymentFee.toFixed(2)}</span>
                </div>
              )}

              <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline text-white">
                <span className="font-bold">Totale Finale da Pagare:</span>
                <span className="text-2xl font-black text-orange-400 font-mono">
                  €{grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 hover:brightness-110 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-orange-500/30 transition-all cursor-pointer disabled:opacity-50"
            >
              <Lock className="w-4 h-4" />
              <span>{isSubmitting ? 'Elaborazione in corso...' : 'Conferma e Paga Ordine'}</span>
            </button>

            <div className="text-[11px] text-slate-400 text-center leading-relaxed">
              Cliccando su Conferma e Paga dichiari che l&apos;ordine comporta l&apos;obbligo di pagare ai sensi dell&apos;art. 51 comma 2 del Codice del Consumo.
            </div>

          </div>
        </div>

      </form>

    </div>
  );
}
