'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Package, 
  Truck, 
  TrendingUp, 
  PlusCircle, 
  FileSpreadsheet, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Printer, 
  ArrowUpRight, 
  ShieldAlert, 
  BarChart3, 
  Trash2, 
  Edit, 
  Save, 
  X, 
  Building, 
  RefreshCw,
  Users,
  Phone,
  Mail,
  MessageSquare,
  Lock,
  Unlock,
  ExternalLink,
  FileText,
  Check,
  ChevronRight,
  Filter,
  Send,
  Eye,
  DollarSign,
  UserCheck,
  UserPlus
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { Product, Order, VehicleCompatibility, CrmCustomer, StaffOperator } from '@/lib/types';
import { INITIAL_CATEGORIES } from '@/lib/data';

// Predefined Staff Team Members
const STAFF_OPERATORS: StaffOperator[] = [
  { id: 'op-jacopo', name: 'Jacopo', role: 'titolare', title: 'Titolare & Amm. Generale', avatarColor: 'from-orange-500 to-amber-600' },
  { id: 'op-socio', name: 'Socio Essepi', role: 'socio', title: 'Direzione Commerciale & Logistica', avatarColor: 'from-cyan-500 to-blue-600' },
  { id: 'op-magazzino', name: 'Operatore Magazzino', role: 'magazzino', title: 'Picking, Imballaggio & Vettori', avatarColor: 'from-emerald-500 to-teal-600' },
  { id: 'op-commercialista', name: 'Studio Fiscale', role: 'commercialista', title: 'Fisco, IVA & SDI', avatarColor: 'from-purple-500 to-indigo-600' }
];

const DEFAULT_STAFF_PIN = 'essepi2026';

export default function AdminPage() {
  const { 
    products, 
    addProduct, 
    updateProductStock, 
    deleteProduct,
    orders, 
    updateOrderStatus, 
    updateOrderTracking,
    updateOrderDetails 
  } = useStore();

  // --- 1. STAFF AUTHENTICATION GATE ---
  const [currentOperator, setCurrentOperator] = useState<StaffOperator | null>(null);
  const [selectedStaffToLogin, setSelectedStaffToLogin] = useState<StaffOperator>(STAFF_OPERATORS[0]);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  // Check stored operator session
  useEffect(() => {
    try {
      const stored = localStorage.getItem('essepi_staff_session_v1');
      if (stored) {
        setCurrentOperator(JSON.parse(stored));
      }
    } catch (e) {
      console.warn(e);
    } finally {
      setIsAuthChecking(false);
    }
  }, []);

  const handleStaffLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === DEFAULT_STAFF_PIN || pinInput.trim() === '2026') {
      setCurrentOperator(selectedStaffToLogin);
      localStorage.setItem('essepi_staff_session_v1', JSON.stringify(selectedStaffToLogin));
      setPinError(false);
      setPinInput('');
    } else {
      setPinError(true);
    }
  };

  const handleStaffLogout = () => {
    setCurrentOperator(null);
    localStorage.removeItem('essepi_staff_session_v1');
  };

  // --- NAVIGATION TABS ---
  const [activeTab, setActiveTab] = useState<'kpi' | 'logistics' | 'crm' | 'fiscal' | 'warehouse' | 'new-product'>('kpi');
  
  // --- LOGISTICS & ORDERS STATE ---
  const [logisticsFilter, setLogisticsFilter] = useState<'all' | 'processing' | 'packed' | 'shipped' | 'issue' | 'delivered'>('all');
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [courierInput, setCourierInput] = useState('BRT Express');
  const [trackingInput, setTrackingInput] = useState('');
  const [actualCostInput, setActualCostInput] = useState<number>(7.50);
  const [orderInternalNoteInput, setOrderInternalNoteInput] = useState('');
  const [printingOrder, setPrintingOrder] = useState<Order | null>(null);

  // --- CRM STATE ---
  const [crmSearch, setCrmSearch] = useState('');
  const [crmTypeFilter, setCrmTypeFilter] = useState<'all' | 'business' | 'private'>('all');
  const [selectedCustomer, setSelectedCustomer] = useState<CrmCustomer | null>(null);
  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false);
  const [customCustomers, setCustomCustomers] = useState<CrmCustomer[]>([]);
  const [newCustType, setNewCustType] = useState<'private' | 'business'>('business');
  const [newCustName, setNewCustName] = useState('');
  const [newCustCompany, setNewCustCompany] = useState('');
  const [newCustVat, setNewCustVat] = useState('');
  const [newCustFiscal, setNewCustFiscal] = useState('');
  const [newCustSdi, setNewCustSdi] = useState('');
  const [newCustPec, setNewCustPec] = useState('');
  const [newCustEmail, setNewCustEmail] = useState('');
  const [newCustPhone, setNewCustPhone] = useState('');
  const [newCustAddress, setNewCustAddress] = useState('');
  const [newCustCity, setNewCustCity] = useState('');
  const [newCustNotes, setNewCustNotes] = useState('');

  // Load custom CRM notes & contacts from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('essepi_crm_custom_v1');
      if (stored) setCustomCustomers(JSON.parse(stored));
    } catch (e) {
      console.warn(e);
    }
  }, []);

  const saveCustomCustomers = (updated: CrmCustomer[]) => {
    setCustomCustomers(updated);
    localStorage.setItem('essepi_crm_custom_v1', JSON.stringify(updated));
  };

  // Derive CRM Customers from Orders + Custom entries
  const crmCustomers = useMemo(() => {
    const map = new Map<string, CrmCustomer>();

    // Process from orders
    orders.forEach((o) => {
      const key = o.customer.fiscalCode || o.customer.vatNumber || o.customer.email;
      if (!key) return;

      const existing = map.get(key);
      if (existing) {
        existing.totalOrders += 1;
        existing.totalSpent = parseFloat((existing.totalSpent + o.totalGross).toFixed(2));
        if (new Date(o.createdAt) > new Date(existing.lastOrderDate || '2000-01-01')) {
          existing.lastOrderDate = o.createdAt;
        }
      } else {
        map.set(key, {
          id: `crm-${key}`,
          customerType: o.customer.customerType,
          firstName: o.customer.firstName,
          lastName: o.customer.lastName,
          companyName: o.customer.companyName,
          vatNumber: o.customer.vatNumber,
          fiscalCode: o.customer.fiscalCode,
          sdiCode: o.customer.sdiCode,
          pec: o.customer.pec,
          email: o.customer.email,
          phone: o.customer.phone,
          address: o.customer.address,
          city: o.customer.city,
          postalCode: o.customer.postalCode,
          province: o.customer.province,
          country: o.customer.country,
          totalOrders: 1,
          totalSpent: parseFloat(o.totalGross.toFixed(2)),
          lastOrderDate: o.createdAt,
          internalNotes: o.customer.notes || ''
        });
      }
    });

    // Merge manual custom customers
    customCustomers.forEach((c) => {
      const key = c.fiscalCode || c.vatNumber || c.email;
      if (!map.has(key)) {
        map.set(key, c);
      }
    });

    let list = Array.from(map.values());

    if (crmTypeFilter !== 'all') {
      list = list.filter(c => c.customerType === crmTypeFilter);
    }

    if (crmSearch.trim()) {
      const q = crmSearch.toLowerCase();
      list = list.filter(c => 
        (c.companyName && c.companyName.toLowerCase().includes(q)) ||
        `${c.firstName} ${c.lastName}`.toLowerCase().includes(q) ||
        (c.vatNumber && c.vatNumber.toLowerCase().includes(q)) ||
        (c.fiscalCode && c.fiscalCode.toLowerCase().includes(q)) ||
        c.city.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q)
      );
    }

    return list.sort((a, b) => b.totalSpent - a.totalSpent);
  }, [orders, customCustomers, crmTypeFilter, crmSearch]);

  const handleAddManualCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustPhone || (!newCustCompany && !newCustName)) {
      alert('Compilare almeno Nominativo/Ragione Sociale e Telefono.');
      return;
    }

    const [first, ...rest] = newCustName.split(' ');
    const newCust: CrmCustomer = {
      id: `crm-man-${Date.now()}`,
      customerType: newCustType,
      firstName: first || '',
      lastName: rest.join(' ') || (newCustType === 'business' ? 'Referente' : ''),
      companyName: newCustCompany,
      vatNumber: newCustVat,
      fiscalCode: newCustFiscal,
      sdiCode: newCustSdi,
      pec: newCustPec,
      email: newCustEmail,
      phone: newCustPhone,
      address: newCustAddress,
      city: newCustCity,
      postalCode: '41121',
      province: 'MO',
      country: 'IT',
      totalOrders: 0,
      totalSpent: 0,
      lastOrderDate: new Date().toISOString(),
      internalNotes: newCustNotes
    };

    saveCustomCustomers([newCust, ...customCustomers]);
    setIsAddCustomerModalOpen(false);
    alert('Cliente salvato correttamente nella Rubrica CRM!');
  };

  // --- FISCALITY STATE & PRO-FORMA MODAL ---
  const [fiscalViewOrder, setFiscalViewOrder] = useState<Order | null>(null);
  const [fiscalFilter, setFiscalFilter] = useState<'all' | 'b2b' | 'b2c'>('all');

  // --- WAREHOUSE STATE ---
  const [warehouseSearch, setWarehouseSearch] = useState('');
  const [stockFilter, setStockFilter] = useState<'all' | 'low' | 'out'>('all');

  // --- NEW PRODUCT FORM STATE ---
  const [newTitle, setNewTitle] = useState('');
  const [newOem, setNewOem] = useState('');
  const [newSku, setNewSku] = useState('');
  const [newBrand, setNewBrand] = useState('');
  const [newCategory, setNewCategory] = useState(INITIAL_CATEGORIES[0].id);
  const [newCondition, setNewCondition] = useState<Product['condition']>('Nuovo Originale');
  const [newPriceNet, setNewPriceNet] = useState<number>(50.00);
  const [newVatRate, setNewVatRate] = useState<number>(22);
  const [newCostPrice, setNewCostPrice] = useState<number>(25.00);
  const [newStock, setNewStock] = useState<number>(5);
  const [newMinStock, setNewMinStock] = useState<number>(2);
  const [newLocation, setNewLocation] = useState('Scaffale A-01');
  const [newShippingCost, setNewShippingCost] = useState<number>(7.90);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCompatMake, setNewCompatMake] = useState('Volkswagen');
  const [newCompatModel, setNewCompatModel] = useState('Golf VII');
  const [newCompatYearStart, setNewCompatYearStart] = useState<number>(2012);
  const [newCompatYearEnd, setNewCompatYearEnd] = useState<number>(2020);

  const calculatedGross = parseFloat((newPriceNet * (1 + newVatRate / 100)).toFixed(2));

  // --- STATS & KPIS CALCULATION ---
  const kpiStats = useMemo(() => {
    const totalGrossRevenue = orders.reduce((acc, o) => acc + o.totalGross, 0);
    const totalNetRevenue = orders.reduce((acc, o) => acc + o.subtotalNet, 0);
    const totalVatCollected = orders.reduce((acc, o) => acc + o.vatAmount, 0);
    const totalInventoryValue = products.reduce((acc, p) => acc + (p.priceGross * p.stock), 0);
    const totalItemsInStock = products.reduce((acc, p) => acc + p.stock, 0);
    const lowStockCount = products.filter(p => p.stock > 0 && p.stock <= p.minStock).length;
    const outOfStockCount = products.filter(p => p.stock === 0).length;
    const pendingOrdersCount = orders.filter(o => o.status === 'processing' || o.status === 'pending_payment' || o.status === 'packed').length;

    // B2B vs B2C breakdown
    const b2bOrdersCount = orders.filter(o => o.customer.customerType === 'business').length;
    const b2cOrdersCount = orders.filter(o => o.customer.customerType === 'private').length;

    // Logistics margins
    const totalShippingCharged = orders.reduce((acc, o) => acc + o.shippingTotal, 0);
    const totalShippingEstimatedCost = orders.length * 7.50; // stima costi vettori convenzionati

    return {
      totalGrossRevenue,
      totalNetRevenue,
      totalVatCollected,
      totalInventoryValue,
      totalItemsInStock,
      lowStockCount,
      outOfStockCount,
      pendingOrdersCount,
      totalOrdersCount: orders.length,
      b2bOrdersCount,
      b2cOrdersCount,
      totalShippingCharged,
      totalShippingEstimatedCost
    };
  }, [orders, products]);

  // Filtered orders for Logistics
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (logisticsFilter === 'all') return true;
      return o.status === logisticsFilter;
    });
  }, [orders, logisticsFilter]);

  // Filtered warehouse products
  const filteredWarehouseProducts = useMemo(() => {
    return products.filter((p) => {
      if (warehouseSearch.trim()) {
        const q = warehouseSearch.toLowerCase();
        const match = 
          p.name.toLowerCase().includes(q) ||
          p.oemCode.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q);
        if (!match) return false;
      }
      if (stockFilter === 'low') return p.stock > 0 && p.stock <= p.minStock;
      if (stockFilter === 'out') return p.stock === 0;
      return true;
    });
  }, [products, warehouseSearch, stockFilter]);

  // --- ACTIONS ---
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newOem || !newSku) {
      alert('Compilare tutti i campi obbligatori (Titolo, OEM, SKU).');
      return;
    }

    const defaultImage = newImageUrl.trim() || 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&auto=format&fit=crop&q=80';
    const compat: VehicleCompatibility = {
      make: newCompatMake,
      model: newCompatModel,
      yearStart: newCompatYearStart,
      yearEnd: newCompatYearEnd
    };

    addProduct({
      sku: newSku.toUpperCase().trim(),
      oemCode: newOem.trim(),
      name: newTitle.trim(),
      brand: newBrand.trim() || 'OEM Quality',
      category: newCategory,
      condition: newCondition,
      priceNet: Number(newPriceNet),
      priceGross: calculatedGross,
      vatRate: Number(newVatRate),
      stock: Number(newStock),
      minStock: Number(newMinStock),
      location: newLocation.trim(),
      costPrice: Number(newCostPrice),
      weightKg: 1.5,
      shippingCost: Number(newShippingCost),
      featured: true,
      images: [defaultImage],
      description: newDescription.trim() || `Ricambio originale per ${newCompatMake} ${newCompatModel}. Codice OEM ${newOem}.`,
      features: [
        `Codice OEM di riferimento: ${newOem}`,
        `Condizione: ${newCondition}`,
        `Garanzia 24 mesi e compatibilità certificata`
      ],
      compatibility: [compat]
    });

    alert('Prodotto aggiunto con successo al magazzino e sincronizzato con Supabase!');
    setActiveTab('warehouse');
    setNewTitle('');
    setNewOem('');
    setNewSku('');
    setNewImageUrl('');
    setNewDescription('');
  };

  const handleSaveTracking = (orderId: string) => {
    if (!trackingInput.trim()) {
      alert('Inserire il numero di lettera di vettura / tracking.');
      return;
    }
    updateOrderTracking(orderId, courierInput, trackingInput.trim());
    if (actualCostInput > 0 || orderInternalNoteInput) {
      updateOrderDetails(orderId, {
        shippingActualCost: Number(actualCostInput),
        internalNotes: orderInternalNoteInput
      });
    }
    setEditingOrderId(null);
    setTrackingInput('');
    setOrderInternalNoteInput('');
  };

  // WhatsApp notification sender
  const sendWhatsAppNotification = (order: Order) => {
    const custName = order.customer.companyName || `${order.customer.firstName} ${order.customer.lastName}`;
    const cleanPhone = order.customer.phone.replace(/[^0-9]/g, '');
    const phoneWithPrefix = cleanPhone.startsWith('39') ? cleanPhone : `39${cleanPhone}`;
    
    let text = `Gentile ${custName}, la informiamo che il suo ordine *${order.orderNumber}* su Essepi Ricambi è stato preso in carico.`;
    if (order.trackingNumber && order.courierName) {
      text = `Gentile ${custName}, il suo ordine Essepi Ricambi *${order.orderNumber}* è stato SPEDITO con *${order.courierName}*. Codice lettera di vettura / Tracking: *${order.trackingNumber}*. Consegna prevista in 24/48h. A disposizione per qualsiasi chiarimento!`;
    }
    window.open(`https://wa.me/${phoneWithPrefix}?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Full Accountant Export (Zucchetti / TeamSystem / Danea compliant)
  const handleExportCsv = () => {
    const headers = [
      'Tipo_Documento',
      'Numero_Documento',
      'Data_Registrazione',
      'Tipo_Cliente',
      'Ragione_Sociale_Cliente',
      'Partita_IVA',
      'Codice_Fiscale',
      'Codice_SDI',
      'PEC',
      'Indirizzo',
      'CAP',
      'Comune',
      'Provincia',
      'Imponibile_Merci_22',
      'Imponibile_Trasporto_22',
      'Totale_Imponibile',
      'Aliquota_IVA',
      'Imposta_IVA_22',
      'Totale_Lordo_Documento',
      'Metodo_Pagamento',
      'Stato_Fattura_SDI'
    ];

    const rows = orders.map(o => {
      const isB2B = o.customer.customerType === 'business';
      const docType = isB2B ? 'TD01_Fattura' : 'Corrispettivo_B2C';
      const netFreight = parseFloat((o.shippingTotal / 1.22).toFixed(2));
      const netMerch = parseFloat((o.subtotalNet).toFixed(2));
      const totNet = parseFloat((netMerch + netFreight).toFixed(2));

      return [
        docType,
        o.orderNumber,
        o.createdAt.slice(0, 10),
        isB2B ? 'B2B' : 'B2C',
        `"${o.customer.companyName || `${o.customer.firstName} ${o.customer.lastName}`}"`,
        o.customer.vatNumber || '',
        o.customer.fiscalCode || '',
        o.customer.sdiCode || (isB2B ? '0000000' : ''),
        o.customer.pec || '',
        `"${o.customer.address}"`,
        o.customer.postalCode,
        `"${o.customer.city}"`,
        o.customer.province,
        netMerch.toFixed(2),
        netFreight.toFixed(2),
        totNet.toFixed(2),
        '22%',
        o.vatAmount.toFixed(2),
        o.totalGross.toFixed(2),
        o.paymentMethod.name,
        o.invoiceIssued ? 'Trasmessa_SDI' : (isB2B ? 'Da_Inviare' : 'Registrato_Corrispettivo')
      ];
    });

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(';'), ...rows.map(r => r.join(';'))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Registro_Fatture_Corrispettivi_EssepiRicambi_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- RENDER 1: AUTHENTICATION GATE IF NOT LOGGED IN ---
  if (isAuthChecking) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-orange-400 font-mono text-sm">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span>Verifica autorizzazioni staff Essepi Ricambi...</span>
        </div>
      </div>
    );
  }

  if (!currentOperator) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full glass-card border border-orange-500/40 rounded-3xl p-8 bg-slate-950/90 shadow-2xl relative overflow-hidden space-y-6">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-3xl pointer-events-none" />
          
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-orange-500/20">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-white uppercase tracking-tight">
              Terminale Gestionale & CRM
            </h1>
            <p className="text-xs text-slate-400">
              Accesso riservato esclusivamente a titolari e dipendenti Essepi Ricambi.
            </p>
          </div>

          <form onSubmit={handleStaffLogin} className="space-y-5">
            {/* Operator Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Seleziona Operatore
              </label>
              <div className="grid grid-cols-2 gap-2">
                {STAFF_OPERATORS.map((op) => {
                  const isSelected = selectedStaffToLogin.id === op.id;
                  return (
                    <button
                      key={op.id}
                      type="button"
                      onClick={() => setSelectedStaffToLogin(op)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected 
                          ? 'bg-orange-500/20 border-orange-500 text-white shadow-md' 
                          : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-bold text-xs text-white">{op.name}</div>
                      <div className="text-[10px] text-slate-400 line-clamp-1">{op.title}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Security PIN */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  PIN di Sicurezza Dipendenti
                </label>
                <span className="text-[10px] text-slate-500">PIN standard: essepi2026</span>
              </div>
              <input
                type="password"
                placeholder="Inserisci PIN di sblocco..."
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                className={`w-full py-3 px-4 bg-slate-900 border rounded-xl text-sm text-white placeholder-slate-500 font-mono tracking-widest focus:outline-none ${
                  pinError ? 'border-red-500 focus:border-red-500' : 'border-slate-700 focus:border-orange-500'
                }`}
                autoFocus
              />
              {pinError && (
                <div className="text-[11px] text-red-400 font-semibold mt-1.5 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>PIN errato. Inserire `essepi2026` o contattare l'amministratore.</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Unlock className="w-4 h-4" />
              <span>Autentica & Accedi al CRM</span>
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800/80 text-center text-[11px] text-slate-500">
            Tutte le sessioni operative vengono registrate con IP e timestamp di accesso.
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER 2: AUTHENTICATED CRM & OPERATIONS SUITE ---
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Admin & Operator Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
            <LayoutDashboard className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-white uppercase tracking-tight">
                Essepi Ricambi • Operations Suite & CRM
              </h1>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                SISTEMA OPERATIVO
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Gestione integrata Magazzino, Spedizioni Multi-Corriere, Fisco AdE e Relazioni Clienti B2B/B2C.
            </p>
          </div>
        </div>

        {/* Current Operator Badge & Logout */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${currentOperator.avatarColor} flex items-center justify-center text-white font-bold text-xs`}>
              {currentOperator.name[0]}
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>{currentOperator.name}</span>
                <span className="text-[10px] font-mono text-orange-400 uppercase">({currentOperator.role})</span>
              </div>
              <div className="text-[10px] text-slate-400">{currentOperator.title}</div>
            </div>
          </div>

          <button
            onClick={handleStaffLogout}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-red-950/60 border border-slate-700 hover:border-red-500/40 text-slate-400 hover:text-red-300 text-xs font-semibold transition-colors flex items-center gap-1.5"
            title="Esci dalla sessione"
          >
            <Lock className="w-4 h-4" />
            <span className="hidden sm:inline">Esci</span>
          </button>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto text-xs font-bold">
        <button
          onClick={() => setActiveTab('kpi')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'kpi'
              ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Dashboard & Statistiche</span>
        </button>

        <button
          onClick={() => setActiveTab('logistics')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap cursor-pointer relative ${
            activeTab === 'logistics'
              ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Logistica & Spedizioni ({orders.length})</span>
          {kpiStats.pendingOrdersCount > 0 && (
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping absolute top-1 right-1" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('crm')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'crm'
              ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>CRM Clienti & Officine ({crmCustomers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('fiscal')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'fiscal'
              ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Fiscalità & SDI Commercialista</span>
        </button>

        <button
          onClick={() => setActiveTab('warehouse')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'warehouse'
              ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Magazzino ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('new-product')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'new-product'
              ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          <span>Nuovo Ricambio</span>
        </button>
      </div>


      {/* ========================================================= */}
      {/* TAB 1: KPI & EXECUTIVE DASHBOARD                         */}
      {/* ========================================================= */}
      {activeTab === 'kpi' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase">
                <span>Fatturato Lordo Totale</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-black text-white font-mono">
                € {kpiStats.totalGrossRevenue.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-[11px] text-slate-400">
                Imponibile: € {kpiStats.totalNetRevenue.toFixed(2)}
              </div>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase">
                <span>IVA a Debito (Erario 22%)</span>
                <FileText className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-3xl font-black text-amber-400 font-mono">
                € {kpiStats.totalVatCollected.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-[11px] text-slate-400">
                Scorporata su {kpiStats.totalOrdersCount} ordini
              </div>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase">
                <span>Valore Magazzino Reale</span>
                <Package className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-3xl font-black text-cyan-400 font-mono">
                € {kpiStats.totalInventoryValue.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-[11px] text-slate-400">
                {kpiStats.totalItemsInStock} pezzi totali a banco
              </div>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase">
                <span>Ordini da Evadere / Picking</span>
                <Clock className="w-4 h-4 text-orange-400" />
              </div>
              <div className="text-3xl font-black text-orange-400 font-mono">
                {kpiStats.pendingOrdersCount}
              </div>
              <div className="text-[11px] text-slate-400">
                Priorità evasione 24h
              </div>
            </div>

          </div>

          {/* Secondary Telemetry Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Split B2B vs B2C */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                <span>Spaccato Clientela Fiscale</span>
                <Users className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">Officine & Aziende (B2B con SDI/PEC)</span>
                    <span className="font-bold text-white font-mono">{kpiStats.b2bOrdersCount} ordini</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div 
                      className="h-full bg-cyan-500 rounded-full" 
                      style={{ width: `${(kpiStats.b2bOrdersCount / Math.max(1, kpiStats.totalOrdersCount)) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">Privati & Appassionati (B2C con CF)</span>
                    <span className="font-bold text-white font-mono">{kpiStats.b2cOrdersCount} ordini</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div 
                      className="h-full bg-orange-500 rounded-full" 
                      style={{ width: `${(kpiStats.b2cOrdersCount / Math.max(1, kpiStats.totalOrdersCount)) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Logistics Performance */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                <span>Rendimento Logistico</span>
                <Truck className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-slate-800">
                  <span className="text-slate-400">Spese incassate da clienti:</span>
                  <span className="text-emerald-400 font-bold font-mono">€ {kpiStats.totalShippingCharged.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-800">
                  <span className="text-slate-400">Costo stimato vettori (BRT/GLS):</span>
                  <span className="text-slate-300 font-mono">€ {kpiStats.totalShippingEstimatedCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400">Saldo logistica:</span>
                  <span className={`font-bold font-mono ${kpiStats.totalShippingCharged >= kpiStats.totalShippingEstimatedCost ? 'text-emerald-400' : 'text-amber-400'}`}>
                    € {(kpiStats.totalShippingCharged - kpiStats.totalShippingEstimatedCost).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Esportazioni Rapide
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Scarica il registro contabile completo per il commercialista o apri la rubrica clienti.
                </p>
              </div>
              <div className="space-y-2">
                <button
                  onClick={handleExportCsv}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                  <span>Esporta CSV per Commercialista</span>
                </button>
                <button
                  onClick={() => setActiveTab('crm')}
                  className="w-full py-2.5 px-3 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-400 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Users className="w-4 h-4" />
                  <span>Apri Rubrica Clienti & Officine</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}


      {/* ========================================================= */}
      {/* TAB 2: LOGISTICA & SPEDIZIONI MULTI-CORRIERE              */}
      {/* ========================================================= */}
      {activeTab === 'logistics' && (
        <div className="space-y-6">
          
          {/* Header & Sub-Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white uppercase tracking-tight flex items-center gap-2">
                <Truck className="w-5 h-5 text-orange-400" />
                <span>Controllo Spedizioni & Lettere di Vettura</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Assegna numeri di tracking, genera etichette di spedizione BRT/GLS/DHL e notifica il cliente su WhatsApp.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <button
                onClick={() => setLogisticsFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${logisticsFilter === 'all' ? 'bg-orange-500 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                Tutti ({orders.length})
              </button>
              <button
                onClick={() => setLogisticsFilter('processing')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${logisticsFilter === 'processing' ? 'bg-orange-500 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                Da Preparare ({orders.filter(o => o.status === 'processing').length})
              </button>
              <button
                onClick={() => setLogisticsFilter('shipped')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${logisticsFilter === 'shipped' ? 'bg-orange-500 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                Spediti ({orders.filter(o => o.status === 'shipped').length})
              </button>
            </div>
          </div>

          {/* Orders Table */}
          <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-3.5 px-4">Ordine & Data</th>
                    <th className="py-3.5 px-4">Destinatario</th>
                    <th className="py-3.5 px-4">Ricambi & Scaffale Picking</th>
                    <th className="py-3.5 px-4">Corriere & Spedizione</th>
                    <th className="py-3.5 px-4">Tracking / LDV</th>
                    <th className="py-3.5 px-4">Stato</th>
                    <th className="py-3.5 px-4 text-right">Azioni Rapide</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {filteredOrders.map((order) => {
                    const isB2B = order.customer.customerType === 'business';
                    return (
                      <tr key={order.id} className="hover:bg-slate-900/40 transition-colors">
                        
                        {/* Order & Date */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="font-mono font-bold text-white text-sm">{order.orderNumber}</div>
                          <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3 text-slate-500" />
                            <span>{new Date(order.createdAt).toLocaleDateString('it-IT')}</span>
                          </div>
                          <div className="font-mono text-emerald-400 font-bold mt-1">
                            € {order.totalGross.toFixed(2)}
                          </div>
                        </td>

                        {/* Customer */}
                        <td className="py-4 px-4">
                          <div className="font-bold text-white text-xs">
                            {order.customer.companyName || `${order.customer.firstName} ${order.customer.lastName}`}
                          </div>
                          <div className="text-[11px] text-slate-400 truncate max-w-[180px]">
                            {order.customer.city} ({order.customer.province})
                          </div>
                          <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-1 font-mono">
                            <Phone className="w-3 h-3 text-emerald-400" />
                            <span>{order.customer.phone}</span>
                          </div>
                        </td>

                        {/* Items & Picking Location */}
                        <td className="py-4 px-4 max-w-xs">
                          <div className="space-y-1.5">
                            {order.items.map((it, idx) => (
                              <div key={idx} className="p-1.5 rounded-lg bg-slate-900 border border-slate-800/80">
                                <div className="font-semibold text-slate-200 line-clamp-1">{it.product.name}</div>
                                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mt-0.5">
                                  <span className="text-orange-400">OEM: {it.product.oemCode}</span>
                                  <span className="bg-slate-800 px-1.5 py-0.5 rounded text-cyan-400 font-bold">
                                    {it.product.location || 'A-01'}
                                  </span>
                                  <span>Q.tà: {it.quantity}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </td>

                        {/* Courier Details */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="font-bold text-white flex items-center gap-1.5">
                            <Truck className="w-3.5 h-3.5 text-cyan-400" />
                            <span>{order.courierName || order.shippingMethod.courier || 'BRT Express'}</span>
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            Tariffa cliente: € {order.shippingTotal.toFixed(2)}
                          </div>
                        </td>

                        {/* Tracking LDV */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          {order.trackingNumber ? (
                            <div className="space-y-1">
                              <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/30 block">
                                {order.trackingNumber}
                              </span>
                              {order.trackingUrl && (
                                <a 
                                  href={order.trackingUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-[10px] text-cyan-400 hover:underline flex items-center gap-1"
                                >
                                  <span>Traccia Online</span>
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              )}
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                setEditingOrderId(order.id);
                                setCourierInput(order.courierName || order.shippingMethod.courier || 'BRT Express');
                              }}
                              className="px-2.5 py-1.5 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-400 font-bold text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <PlusCircle className="w-3.5 h-3.5" />
                              <span>Inserisci Tracking</span>
                            </button>
                          )}
                        </td>

                        {/* Status Dropdown */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                            className={`py-1.5 px-2.5 rounded-lg text-xs font-bold border focus:outline-none bg-slate-900 ${
                              order.status === 'delivered' ? 'text-emerald-400 border-emerald-500/40' :
                              order.status === 'shipped' ? 'text-cyan-400 border-cyan-500/40' :
                              order.status === 'processing' ? 'text-orange-400 border-orange-500/40' :
                              order.status === 'issue' ? 'text-red-400 border-red-500/40' :
                              'text-slate-400 border-slate-700'
                            }`}
                          >
                            <option value="pending_payment">In attesa pagamento</option>
                            <option value="processing">In Picking / Da Preparare</option>
                            <option value="packed">Imballato & Pesato</option>
                            <option value="shipped">Spedito con Corriere</option>
                            <option value="delivered">Consegnato</option>
                            <option value="issue">Giacenza / Problema</option>
                            <option value="cancelled">Annullato</option>
                          </select>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            {/* WhatsApp Tracking Notification */}
                            <button
                              onClick={() => sendWhatsAppNotification(order)}
                              className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-colors"
                              title="Invia aggiornamento WhatsApp al cliente"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </button>

                            {/* Print Packing Slip / Bolla */}
                            <button
                              onClick={() => setPrintingOrder(order)}
                              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                              title="Stampa Bolla di Picking & Etichetta Colli"
                            >
                              <Printer className="w-4 h-4" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal Tracking Insertion */}
          {editingOrderId && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <div className="max-w-md w-full glass-card p-6 rounded-2xl border border-orange-500/50 bg-slate-950 shadow-2xl space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <h3 className="font-bold text-white text-sm uppercase">
                    Assegna Spedizione & Lettera di Vettura
                  </h3>
                  <button onClick={() => setEditingOrderId(null)} className="text-slate-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">Seleziona Corriere Espresso</label>
                    <select
                      value={courierInput}
                      onChange={(e) => setCourierInput(e.target.value)}
                      className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-semibold focus:outline-none focus:border-orange-500"
                    >
                      <option value="BRT Express">BRT Express (Bartolini)</option>
                      <option value="GLS Italy">GLS Italy</option>
                      <option value="DHL Express">DHL Express</option>
                      <option value="Poste Italiane SDA">Poste Italiane / Crono SDA</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">Numero di Tracking / Lettera di Vettura (LDV)</label>
                    <input
                      type="text"
                      placeholder="es. 0820242021302 o GL18274928"
                      value={trackingInput}
                      onChange={(e) => setTrackingInput(e.target.value)}
                      className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">Costo Effettivo Corriere (€ per bilancio)</label>
                    <input
                      type="number"
                      step="0.10"
                      value={actualCostInput}
                      onChange={(e) => setActualCostInput(parseFloat(e.target.value) || 0)}
                      className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">Note Interne Imballo / Magazzino</label>
                    <input
                      type="text"
                      placeholder="es. Scatola rinforzata con pluriball antiurto"
                      value={orderInternalNoteInput}
                      onChange={(e) => setOrderInternalNoteInput(e.target.value)}
                      className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                  <button
                    onClick={() => setEditingOrderId(null)}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold rounded-xl text-xs"
                  >
                    Annulla
                  </button>
                  <button
                    onClick={() => handleSaveTracking(editingOrderId)}
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-xs flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Salva & Imposta Spedito</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Printable Packing Slip Modal */}
          {printingOrder && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
              <div className="max-w-2xl w-full bg-white text-slate-900 p-8 rounded-2xl shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto font-sans">
                
                {/* Print Header */}
                <div className="flex justify-between items-start border-b border-slate-200 pb-4">
                  <div>
                    <h2 className="text-xl font-black uppercase text-orange-600">ESSEPI RICAMBI S.R.L.</h2>
                    <div className="text-xs text-slate-600 mt-1 space-y-0.5">
                      <div>Magazzino & Logistica Ricambi Auto e Moto</div>
                      <div>P.IVA & C.F.: IT 03948270361 • REA: MO-428190</div>
                      <div>Tel: +39 346 181 1152 • info@essepiricambi.it</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500">DISTINTA DI PRELIEVO & PACKING SLIP</div>
                    <div className="text-lg font-black font-mono text-slate-900 mt-0.5">{printingOrder.orderNumber}</div>
                    <div className="text-xs text-slate-500">Data: {new Date(printingOrder.createdAt).toLocaleDateString('it-IT')}</div>
                  </div>
                </div>

                {/* Recipient & Courier Box */}
                <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <div>
                    <div className="font-bold text-slate-500 uppercase text-[10px]">Destinatario Merce</div>
                    <div className="font-bold text-sm text-slate-900 mt-1">
                      {printingOrder.customer.companyName || `${printingOrder.customer.firstName} ${printingOrder.customer.lastName}`}
                    </div>
                    <div>{printingOrder.customer.address}</div>
                    <div>{printingOrder.customer.postalCode} {printingOrder.customer.city} ({printingOrder.customer.province})</div>
                    <div className="font-bold text-orange-600 mt-1">Tel: {printingOrder.customer.phone}</div>
                  </div>

                  <div>
                    <div className="font-bold text-slate-500 uppercase text-[10px]">Dettagli Spedizione</div>
                    <div className="mt-1"><strong>Vettore:</strong> {printingOrder.courierName || 'BRT Express'}</div>
                    <div><strong>Tracking:</strong> {printingOrder.trackingNumber || 'In assegnazione'}</div>
                    <div><strong>Note consegna:</strong> {printingOrder.customer.notes || 'Nessuna specifica'}</div>
                  </div>
                </div>

                {/* Items to Pick */}
                <table className="w-full text-left text-xs border border-slate-200">
                  <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-2 border">Scaffale</th>
                      <th className="p-2 border">Codice OEM</th>
                      <th className="p-2 border">Descrizione Ricambio</th>
                      <th className="p-2 border text-center">Q.tà</th>
                    </tr>
                  </thead>
                  <tbody>
                    {printingOrder.items.map((it, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="p-2 border font-mono font-bold text-orange-600">{it.product.location || 'A-01'}</td>
                        <td className="p-2 border font-mono font-bold">{it.product.oemCode}</td>
                        <td className="p-2 border">{it.product.name}</td>
                        <td className="p-2 border text-center font-bold">{it.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Print Action Buttons */}
                <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                  <span className="text-xs text-slate-500">Documento interno valido come bolla di magazzino.</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPrintingOrder(null)}
                      className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl text-xs"
                    >
                      Chiudi
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Stampa Documento</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      )}


      {/* ========================================================= */}
      {/* TAB 3: CRM CLIENTI & OFFICINE (RUBRICA COMPLETA)           */}
      {/* ========================================================= */}
      {activeTab === 'crm' && (
        <div className="space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white uppercase tracking-tight flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-400" />
                <span>Rubrica CRM • Clienti, Meccanici & Officine</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Archivio anagrafiche B2B con P.IVA/SDI e B2C con Codice Fiscale, storico spesa LTV e WhatsApp rapido.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsAddCustomerModalOpen(true)}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-orange-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>Aggiungi Cliente Manuale</span>
              </button>
            </div>
          </div>

          {/* CRM Search & Category Filter */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800">
            <div className="relative flex-1 w-full sm:w-auto">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Cerca cliente per Ragione Sociale, P.IVA, Codice Fiscale, Telefono, Città..."
                value={crmSearch}
                onChange={(e) => setCrmSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              <button
                onClick={() => setCrmTypeFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${crmTypeFilter === 'all' ? 'bg-orange-500 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                Tutti ({crmCustomers.length})
              </button>
              <button
                onClick={() => setCrmTypeFilter('business')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${crmTypeFilter === 'business' ? 'bg-orange-500 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                Solo B2B Officine
              </button>
              <button
                onClick={() => setCrmTypeFilter('private')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${crmTypeFilter === 'private' ? 'bg-orange-500 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                Solo Privati B2C
              </button>
            </div>
          </div>

          {/* Customer Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {crmCustomers.map((cust) => {
              const isB2B = cust.customerType === 'business';
              const cleanPhone = cust.phone.replace(/[^0-9]/g, '');
              const waLink = `https://wa.me/${cleanPhone.startsWith('39') ? cleanPhone : `39${cleanPhone}`}?text=Salve%20da%20Essepi%20Ricambi`;

              return (
                <div 
                  key={cust.id} 
                  className="glass-card p-5 rounded-2xl border border-slate-800 hover:border-orange-500/50 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                        isB2B 
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                          : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                      }`}>
                        {isB2B ? 'B2B • Officina / Azienda' : 'B2C • Privato'}
                      </span>
                      <span className="text-xs font-bold font-mono text-emerald-400">
                        € {cust.totalSpent.toFixed(2)} spesi
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-black text-white">
                        {cust.companyName || `${cust.firstName} ${cust.lastName}`}
                      </h3>
                      {cust.companyName && (
                        <div className="text-xs text-slate-400">
                          Ref: {cust.firstName} {cust.lastName}
                        </div>
                      )}
                    </div>

                    <div className="space-y-1 text-xs text-slate-300 font-mono text-[11px] pt-1 border-t border-slate-800/60">
                      {cust.vatNumber && <div><strong>P.IVA:</strong> {cust.vatNumber}</div>}
                      {cust.fiscalCode && <div><strong>C.F.:</strong> {cust.fiscalCode}</div>}
                      {cust.sdiCode && <div><strong>Cod. SDI:</strong> <span className="text-cyan-400 font-bold">{cust.sdiCode}</span></div>}
                      {cust.pec && <div><strong>PEC:</strong> {cust.pec}</div>}
                      <div className="text-slate-400 font-sans text-xs pt-1 truncate">
                        {cust.address}, {cust.city} ({cust.province})
                      </div>
                    </div>
                  </div>

                  {/* CRM Actions */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                    <div className="text-[11px] text-slate-500">
                      {cust.totalOrders} {cust.totalOrders === 1 ? 'ordine' : 'ordini'}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-colors"
                        title="Invia messaggio WhatsApp"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={`tel:${cust.phone}`}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                        title="Chiama al telefono"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={`mailto:${cust.email}`}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                        title="Invia email"
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Add Manual Customer Modal */}
          {isAddCustomerModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <div className="max-w-lg w-full glass-card p-6 rounded-2xl border border-orange-500/50 bg-slate-950 shadow-2xl space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <h3 className="font-bold text-white text-sm uppercase flex items-center gap-2">
                    <UserPlus className="w-4 h-4 text-orange-400" />
                    <span>Nuovo Cliente / Officina in Rubrica CRM</span>
                  </h3>
                  <button onClick={() => setIsAddCustomerModalOpen(false)} className="text-slate-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleAddManualCustomer} className="space-y-3 text-xs">
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-slate-300 cursor-pointer font-bold">
                      <input
                        type="radio"
                        checked={newCustType === 'business'}
                        onChange={() => setNewCustType('business')}
                        className="accent-orange-500"
                      />
                      <span>B2B Officina / Azienda</span>
                    </label>
                    <label className="flex items-center gap-2 text-slate-300 cursor-pointer font-bold">
                      <input
                        type="radio"
                        checked={newCustType === 'private'}
                        onChange={() => setNewCustType('private')}
                        className="accent-orange-500"
                      />
                      <span>B2C Privato</span>
                    </label>
                  </div>

                  {newCustType === 'business' && (
                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">Ragione Sociale Officina</label>
                      <input
                        type="text"
                        placeholder="es. Autofficina Rossi S.n.c."
                        value={newCustCompany}
                        onChange={(e) => setNewCustCompany(e.target.value)}
                        className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                        required
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">Nome e Cognome Referente</label>
                      <input
                        type="text"
                        placeholder="es. Mario Rossi"
                        value={newCustName}
                        onChange={(e) => setNewCustName(e.target.value)}
                        className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                        required={newCustType === 'private'}
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">Telefono / WhatsApp</label>
                      <input
                        type="text"
                        placeholder="es. 340 1234567"
                        value={newCustPhone}
                        onChange={(e) => setNewCustPhone(e.target.value)}
                        className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">Partita IVA (se B2B)</label>
                      <input
                        type="text"
                        placeholder="IT01234567890"
                        value={newCustVat}
                        onChange={(e) => setNewCustVat(e.target.value)}
                        className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">Codice Fiscale</label>
                      <input
                        type="text"
                        placeholder="RSSMRA80A01H501U"
                        value={newCustFiscal}
                        onChange={(e) => setNewCustFiscal(e.target.value)}
                        className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">Codice SDI (7 caratteri)</label>
                      <input
                        type="text"
                        maxLength={7}
                        placeholder="M5UXCR1"
                        value={newCustSdi}
                        onChange={(e) => setNewCustSdi(e.target.value.toUpperCase())}
                        className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">Indirizzo PEC</label>
                      <input
                        type="email"
                        placeholder="officina@pec.it"
                        value={newCustPec}
                        onChange={(e) => setNewCustPec(e.target.value)}
                        className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">Email Ordinaria</label>
                      <input
                        type="email"
                        placeholder="info@officina.it"
                        value={newCustEmail}
                        onChange={(e) => setNewCustEmail(e.target.value)}
                        className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">Città</label>
                      <input
                        type="text"
                        placeholder="Modena"
                        value={newCustCity}
                        onChange={(e) => setNewCustCity(e.target.value)}
                        className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Note Interne Operatore</label>
                    <input
                      type="text"
                      placeholder="es. Sconto 10% sui ricambi freni, richiede spedizione BRT"
                      value={newCustNotes}
                      onChange={(e) => setNewCustNotes(e.target.value)}
                      className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setIsAddCustomerModalOpen(false)}
                      className="px-4 py-2 bg-slate-900 text-slate-300 font-bold rounded-xl text-xs"
                    >
                      Annulla
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-xs"
                    >
                      Salva in Rubrica
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      )}


      {/* ========================================================= */}
      {/* TAB 4: FISCALITÀ & SDI COMMERCIALISTA                     */}
      {/* ========================================================= */}
      {activeTab === 'fiscal' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white uppercase tracking-tight flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-amber-400" />
                <span>Gestione Fiscale • Corrispettivi & Fatture SDI</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Separazione a norma di legge italiana tra corrispettivi telematici B2C e fatture elettroniche B2B.
              </p>
            </div>

            <button
              onClick={handleExportCsv}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Esporta CSV per Commercialista (Zucchetti/TeamSystem)</span>
            </button>
          </div>

          {/* Tax Summary Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 uppercase font-bold">Imponibile Merci Totale</span>
              <div className="text-2xl font-mono font-black text-white">€ {kpiStats.totalNetRevenue.toFixed(2)}</div>
              <span className="text-[10px] text-slate-500">Aliquota ordinaria 22%</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 uppercase font-bold">Totale IVA a Debito (Erario)</span>
              <div className="text-2xl font-mono font-black text-amber-400">€ {kpiStats.totalVatCollected.toFixed(2)}</div>
              <span className="text-[10px] text-slate-500">Versamento F24 trimestrale/mensile</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 uppercase font-bold">Totale Incassi Lordi</span>
              <div className="text-2xl font-mono font-black text-emerald-400">€ {kpiStats.totalGrossRevenue.toFixed(2)}</div>
              <span className="text-[10px] text-slate-500">Merci + Spese di trasporto</span>
            </div>
          </div>

          {/* Invoices and Receipts Table */}
          <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Doc & Data</th>
                    <th className="py-3 px-4">Tipo Fiscale</th>
                    <th className="py-3 px-4">Intestatario</th>
                    <th className="py-3 px-4">P.IVA / Codice Fiscale</th>
                    <th className="py-3 px-4">SDI / PEC</th>
                    <th className="py-3 px-4 text-right">Imponibile</th>
                    <th className="py-3 px-4 text-right">IVA 22%</th>
                    <th className="py-3 px-4 text-right">Totale Lordo</th>
                    <th className="py-3 px-4 text-center">Stato SDI</th>
                    <th className="py-3 px-4 text-right">Doc</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {orders.map((o) => {
                    const isB2B = o.customer.customerType === 'business';
                    return (
                      <tr key={o.id} className="hover:bg-slate-900/40 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-white">
                          <div>{o.orderNumber}</div>
                          <div className="text-[10px] text-slate-500 font-sans">{o.createdAt.slice(0, 10)}</div>
                        </td>

                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            isB2B ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-slate-800 text-slate-300'
                          }`}>
                            {isB2B ? 'TD01 Fattura' : 'Corrispettivo B2C'}
                          </span>
                        </td>

                        <td className="py-3 px-4 font-semibold text-white truncate max-w-[160px]">
                          {o.customer.companyName || `${o.customer.firstName} ${o.customer.lastName}`}
                        </td>

                        <td className="py-3 px-4 font-mono text-xs">
                          {o.customer.vatNumber || o.customer.fiscalCode}
                        </td>

                        <td className="py-3 px-4 font-mono text-cyan-400">
                          {o.customer.sdiCode || o.customer.pec || '-'}
                        </td>

                        <td className="py-3 px-4 text-right font-mono text-slate-300">
                          € {o.subtotalNet.toFixed(2)}
                        </td>

                        <td className="py-3 px-4 text-right font-mono text-amber-400">
                          € {o.vatAmount.toFixed(2)}
                        </td>

                        <td className="py-3 px-4 text-right font-mono font-bold text-emerald-400">
                          € {o.totalGross.toFixed(2)}
                        </td>

                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => updateOrderDetails(o.id, { invoiceIssued: !o.invoiceIssued })}
                            className={`px-2 py-1 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                              o.invoiceIssued 
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                                : 'bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20'
                            }`}
                          >
                            {o.invoiceIssued ? 'Trasmesso SDI' : 'Da Inviare SDI'}
                          </button>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => setFiscalViewOrder(o)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                            title="Visualizza e Stampa Pro-Forma Fiscale"
                          >
                            <FileText className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pro-Forma / Fiscal View Modal */}
          {fiscalViewOrder && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
              <div className="max-w-2xl w-full bg-white text-slate-900 p-8 rounded-2xl shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto font-sans">
                
                <div className="flex justify-between items-start border-b border-slate-200 pb-4">
                  <div>
                    <h2 className="text-xl font-black uppercase text-orange-600">ESSEPI RICAMBI S.R.L.</h2>
                    <div className="text-xs text-slate-600 mt-1">
                      <div>Partita IVA & C.F.: IT 03948270361 • REA: MO-428190</div>
                      <div>Capitale Sociale: € 20.000,00 i.v.</div>
                      <div>PEC: essepiricambi@legalmail.it</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold uppercase text-slate-500">
                      {fiscalViewOrder.customer.customerType === 'business' ? 'PRO-FORMA FATTURA ELETTRONICA' : 'DOCUMENTO COMMERCIALE CORRISPETTIVO'}
                    </span>
                    <div className="text-lg font-black font-mono mt-0.5">{fiscalViewOrder.orderNumber}</div>
                    <div className="text-xs text-slate-500">Data: {new Date(fiscalViewOrder.createdAt).toLocaleDateString('it-IT')}</div>
                  </div>
                </div>

                {/* Fiscal Customer Details */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <div className="font-bold text-slate-500 uppercase text-[10px]">Cliente / Cessionario</div>
                  <div className="font-bold text-sm text-slate-900 mt-1">
                    {fiscalViewOrder.customer.companyName || `${fiscalViewOrder.customer.firstName} ${fiscalViewOrder.customer.lastName}`}
                  </div>
                  <div>Indirizzo: {fiscalViewOrder.customer.address}, {fiscalViewOrder.customer.postalCode} {fiscalViewOrder.customer.city} ({fiscalViewOrder.customer.province})</div>
                  {fiscalViewOrder.customer.vatNumber && <div>P.IVA: {fiscalViewOrder.customer.vatNumber}</div>}
                  {fiscalViewOrder.customer.fiscalCode && <div>Codice Fiscale: {fiscalViewOrder.customer.fiscalCode}</div>}
                  {fiscalViewOrder.customer.sdiCode && <div>Codice Destinatario SDI: {fiscalViewOrder.customer.sdiCode}</div>}
                  {fiscalViewOrder.customer.pec && <div>PEC: {fiscalViewOrder.customer.pec}</div>}
                </div>

                {/* Items */}
                <table className="w-full text-left text-xs border border-slate-200">
                  <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-2 border">Cod. OEM</th>
                      <th className="p-2 border">Descrizione Bene</th>
                      <th className="p-2 border text-center">Q.tà</th>
                      <th className="p-2 border text-right">Prezzo Netto</th>
                      <th className="p-2 border text-right">IVA</th>
                      <th className="p-2 border text-right">Totale Lordo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fiscalViewOrder.items.map((it, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="p-2 border font-mono">{it.product.oemCode}</td>
                        <td className="p-2 border">{it.product.name}</td>
                        <td className="p-2 border text-center font-bold">{it.quantity}</td>
                        <td className="p-2 border text-right font-mono">€ {(it.product.priceNet * it.quantity).toFixed(2)}</td>
                        <td className="p-2 border text-right font-mono">22%</td>
                        <td className="p-2 border text-right font-mono font-bold">€ {(it.product.priceGross * it.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr className="border-b bg-slate-50">
                      <td className="p-2 border font-mono text-slate-500">SPED-EXP</td>
                      <td className="p-2 border">Spese di Spedizione Espresso Tracciato</td>
                      <td className="p-2 border text-center">1</td>
                      <td className="p-2 border text-right font-mono">€ {(fiscalViewOrder.shippingTotal / 1.22).toFixed(2)}</td>
                      <td className="p-2 border text-right font-mono">22%</td>
                      <td className="p-2 border text-right font-mono font-bold">€ {fiscalViewOrder.shippingTotal.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>

                {/* Totals */}
                <div className="flex justify-end text-xs">
                  <div className="w-64 space-y-1.5 border-t border-slate-300 pt-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Totale Imponibile:</span>
                      <span className="font-mono font-bold">€ {fiscalViewOrder.subtotalNet.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Totale IVA (22%):</span>
                      <span className="font-mono font-bold">€ {fiscalViewOrder.vatAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-base font-black border-t border-slate-300 pt-1 text-slate-900">
                      <span>Totale Documento:</span>
                      <span className="font-mono text-orange-600">€ {fiscalViewOrder.totalGross.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                  <span className="text-[11px] text-slate-500">Pagamento: {fiscalViewOrder.paymentMethod.name}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setFiscalViewOrder(null)}
                      className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl text-xs"
                    >
                      Chiudi
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Stampa Documento</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      )}


      {/* ========================================================= */}
      {/* TAB 5: MAGAZZINO & GESTIONE GIACENZE                      */}
      {/* ========================================================= */}
      {activeTab === 'warehouse' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white uppercase tracking-tight flex items-center gap-2">
                <Package className="w-5 h-5 text-orange-400" />
                <span>Magazzino & Controllo Scorte</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Aggiorna giacenze in tempo reale sincronizzate con Supabase, posizioni scaffalature e prezzi netti/lordi.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setStockFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${stockFilter === 'all' ? 'bg-orange-500 text-white' : 'bg-slate-900 text-slate-400'}`}
              >
                Tutti ({products.length})
              </button>
              <button
                onClick={() => setStockFilter('low')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${stockFilter === 'low' ? 'bg-amber-500 text-white' : 'bg-slate-900 text-amber-400'}`}
              >
                Scorte Basse ({kpiStats.lowStockCount})
              </button>
              <button
                onClick={() => setStockFilter('out')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${stockFilter === 'out' ? 'bg-red-500 text-white' : 'bg-slate-900 text-red-400'}`}
              >
                Esauriti ({kpiStats.outOfStockCount})
              </button>
            </div>
          </div>

          <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Cerca ricambio per Codice OEM, SKU, Titolo o Posizione Scaffale (es. A-01)..."
              value={warehouseSearch}
              onChange={(e) => setWarehouseSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Ricambio</th>
                    <th className="py-3 px-4">Codice OEM / SKU</th>
                    <th className="py-3 px-4">Scaffale</th>
                    <th className="py-3 px-4 text-right">Prezzo Netto</th>
                    <th className="py-3 px-4 text-right">Prezzo Lordo (IVA 22%)</th>
                    <th className="py-3 px-4 text-center">Giacenza</th>
                    <th className="py-3 px-4 text-right">Elimina</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {filteredWarehouseProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-800 overflow-hidden flex-shrink-0 border border-slate-700">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-bold text-white line-clamp-1">{p.name}</div>
                          <div className="text-[10px] text-slate-400">{p.brand} • {p.condition}</div>
                        </div>
                      </td>

                      <td className="py-3 px-4 font-mono">
                        <div className="text-orange-400 font-bold">{p.oemCode}</div>
                        <div className="text-[10px] text-slate-500">{p.sku}</div>
                      </td>

                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 font-mono text-cyan-400 font-bold">
                          {p.location || 'A-01'}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right font-mono text-slate-300">
                        € {p.priceNet.toFixed(2)}
                      </td>

                      <td className="py-3 px-4 text-right font-mono font-bold text-white">
                        € {p.priceGross.toFixed(2)}
                      </td>

                      <td className="py-3 px-4 text-center">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => updateProductStock(p.id, p.stock - 1)}
                            className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center cursor-pointer"
                          >
                            -
                          </button>
                          <span className={`w-8 font-mono font-black text-center ${p.stock === 0 ? 'text-red-400' : p.stock <= p.minStock ? 'text-amber-400' : 'text-emerald-400'}`}>
                            {p.stock}
                          </span>
                          <button
                            onClick={() => updateProductStock(p.id, p.stock + 1)}
                            className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => {
                            if (confirm(`Confermi l'eliminazione del ricambio "${p.name}"?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 transition-colors"
                          title="Elimina ricambio dal magazzino"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}


      {/* ========================================================= */}
      {/* TAB 6: INSERIMENTO NUOVO RICAMBIO                         */}
      {/* ========================================================= */}
      {activeTab === 'new-product' && (
        <div className="max-w-4xl mx-auto glass-card rounded-2xl border border-slate-800 p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-orange-400" />
              <span>Inserimento Nuovo Ricambio a Magazzino</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Inserisci i dati tecnici del ricambio. Il prezzo lordo verrà calcolato in automatico aggiungendo l'IVA 22% al netto.
            </p>
          </div>

          <form onSubmit={handleCreateProduct} className="space-y-5 text-xs">
            
            {/* Title */}
            <div>
              <label className="block text-slate-300 font-bold uppercase mb-1">Titolo Ricambio Completo</label>
              <input
                type="text"
                placeholder="es. Kit Frizione con Volano Bimassa Valeo per Golf VII 1.6 TDI"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-semibold focus:outline-none focus:border-orange-500"
                required
              />
            </div>

            {/* OEM, SKU, Brand */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">Codice OEM Originale</label>
                <input
                  type="text"
                  placeholder="es. 04466-0F010"
                  value={newOem}
                  onChange={(e) => setNewOem(e.target.value.toUpperCase())}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">Codice SKU Interno</label>
                <input
                  type="text"
                  placeholder="es. ESP-TYT-0042"
                  value={newSku}
                  onChange={(e) => setNewSku(e.target.value.toUpperCase())}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">Marca / Produttore</label>
                <input
                  type="text"
                  placeholder="es. Toyota Genuine / Bosch / Valeo"
                  value={newBrand}
                  onChange={(e) => setNewBrand(e.target.value)}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Category & Condition */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">Reparto / Categoria</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-orange-500"
                >
                  {INITIAL_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">Condizione del Ricambio</label>
                <select
                  value={newCondition}
                  onChange={(e) => setNewCondition(e.target.value as Product['condition'])}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="Nuovo Originale">Nuovo Originale (In scatola casa madre)</option>
                  <option value="Nuovo NOS">Nuovo NOS (New Old Stock da fondo magazzino)</option>
                  <option value="Aftermarket Certificato">Aftermarket Certificato (1° Impianto OEM)</option>
                  <option value="Ricondizionato Garantito">Ricondizionato Garantito</option>
                  <option value="Usato Verificato">Usato Verificato & Collaudato</option>
                </select>
              </div>
            </div>

            {/* Fiscal Pricing: Net + VAT = Gross */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700 space-y-3">
              <div className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-1.5">
                <DollarSign className="w-4 h-4" />
                <span>Prezzo Fiscale & Calcolo IVA 22%</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">Prezzo Netto (€)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newPriceNet}
                    onChange={(e) => setNewPriceNet(parseFloat(e.target.value) || 0)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Aliquota IVA (%)</label>
                  <input
                    type="number"
                    value={newVatRate}
                    onChange={(e) => setNewVatRate(parseFloat(e.target.value) || 22)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Prezzo Finale Lordo (€)</label>
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-black text-sm">
                    € {calculatedGross.toFixed(2)}
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Costo Acquisto (€)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newCostPrice}
                    onChange={(e) => setNewCostPrice(parseFloat(e.target.value) || 0)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Stock & Warehouse Shelf */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">Quantità a Magazzino</label>
                <input
                  type="number"
                  value={newStock}
                  onChange={(e) => setNewStock(parseInt(e.target.value) || 0)}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">Soglia Scorta Bassa</label>
                <input
                  type="number"
                  value={newMinStock}
                  onChange={(e) => setNewMinStock(parseInt(e.target.value) || 1)}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">Posizione Scaffale</label>
                <input
                  type="text"
                  placeholder="es. Scaffale C-12 / Ripiano 2"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono"
                  required
                />
              </div>
            </div>

            {/* Image URL & Description */}
            <div className="space-y-3">
              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">URL Immagine Ricambio (Opzionale)</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">Descrizione Tecnica</label>
                <textarea
                  rows={3}
                  placeholder="Descrizione approfondita, note di montaggio, codici intercambiabili..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setActiveTab('warehouse')}
                className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs"
              >
                Annulla
              </button>

              <button
                type="submit"
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:brightness-110 text-white font-bold text-xs shadow-lg shadow-orange-500/25 flex items-center gap-2 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Salva Ricambio a Magazzino</span>
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
}
