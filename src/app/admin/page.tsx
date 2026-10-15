'use client';

import React, { useState, useMemo } from 'react';
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
  RefreshCw
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { Product, Order, VehicleCompatibility } from '@/lib/types';
import { INITIAL_CATEGORIES } from '@/lib/data';

export default function AdminPage() {
  const { 
    products, 
    addProduct, 
    updateProductStock, 
    deleteProduct,
    orders, 
    updateOrderStatus, 
    updateOrderTracking 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'kpi' | 'warehouse' | 'orders' | 'fiscal' | 'new-product'>('kpi');
  
  // Warehouse filters
  const [warehouseSearch, setWarehouseSearch] = useState('');
  const [stockFilter, setStockFilter] = useState<'all' | 'low' | 'out'>('all');

  // Tracking modal / inputs
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [courierInput, setCourierInput] = useState('GLS Express');
  const [trackingInput, setTrackingInput] = useState('');

  // New Product Form State
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

  // Auto-calculated gross price (Net + 22% VAT)
  const calculatedGross = parseFloat((newPriceNet * (1 + newVatRate / 100)).toFixed(2));

  // --- STATS & KPIS CALCULATION ---
  const kpiStats = useMemo(() => {
    // Total revenue from all orders
    const totalGrossRevenue = orders.reduce((acc, o) => acc + o.totalGross, 0);
    const totalNetRevenue = orders.reduce((acc, o) => acc + o.subtotalNet, 0);
    const totalVatCollected = orders.reduce((acc, o) => acc + o.vatAmount, 0);

    // Total warehouse inventory value
    const totalInventoryValue = products.reduce((acc, p) => acc + (p.priceGross * p.stock), 0);
    const totalItemsInStock = products.reduce((acc, p) => acc + p.stock, 0);
    const lowStockCount = products.filter(p => p.stock > 0 && p.stock <= p.minStock).length;
    const outOfStockCount = products.filter(p => p.stock === 0).length;

    const pendingOrdersCount = orders.filter(o => o.status === 'processing' || o.status === 'pending_payment').length;

    return {
      totalGrossRevenue,
      totalNetRevenue,
      totalVatCollected,
      totalInventoryValue,
      totalItemsInStock,
      lowStockCount,
      outOfStockCount,
      pendingOrdersCount,
      totalOrdersCount: orders.length
    };
  }, [orders, products]);

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

  // Handle Add Product Submit
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

    alert('Prodotto aggiunto con successo al magazzino e messo in vendita online!');
    setActiveTab('warehouse');

    // Reset form
    setNewTitle('');
    setNewOem('');
    setNewSku('');
    setNewImageUrl('');
    setNewDescription('');
  };

  // Export Orders as CSV for the Accountant (Commercialista)
  const handleExportCsv = () => {
    const headers = [
      'Numero Ordine',
      'Data',
      'Tipo Cliente',
      'Nome / Ragione Sociale',
      'P.IVA',
      'Codice Fiscale',
      'Codice SDI',
      'PEC',
      'Imponibile Netto (€)',
      'IVA 22% (€)',
      'Spedizione (€)',
      'Totale Lordo (€)',
      'Stato Ordine',
      'Fattura Emessa'
    ];

    const rows = orders.map(o => [
      o.orderNumber,
      o.createdAt.slice(0, 10),
      o.customer.customerType === 'business' ? 'B2B (Azienda)' : 'B2C (Privato)',
      `"${o.customer.companyName || `${o.customer.firstName} ${o.customer.lastName}`}"`,
      o.customer.vatNumber || '',
      o.customer.fiscalCode,
      o.customer.sdiCode || '',
      o.customer.pec || '',
      o.subtotalNet.toFixed(2),
      o.vatAmount.toFixed(2),
      o.shippingTotal.toFixed(2),
      o.totalGross.toFixed(2),
      o.status,
      o.invoiceIssued ? 'SI' : 'NO'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Registro_Corrispettivi_EssepiRicambi_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveTracking = (orderId: string) => {
    if (!trackingInput.trim()) {
      alert('Inserire il numero di tracciamento.');
      return;
    }
    updateOrderTracking(orderId, courierInput, trackingInput.trim());
    setEditingOrderId(null);
    setTrackingInput('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Admin Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
            <LayoutDashboard className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-white uppercase tracking-tight">
                Pannello Direzione Essepi Ricambi
              </h1>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                SOCI / ADMIN ATTIVO
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Gestione centralizzata di magazzino, logistica spedizioni e fiscalità italiana (IVA & Corrispettivi).
            </p>
          </div>
        </div>

        {/* Quick Nav Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('kpi')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'kpi'
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-700'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Panoramica</span>
          </button>

          <button
            onClick={() => setActiveTab('warehouse')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'warehouse'
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-700'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Magazzino ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'orders'
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-700'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Spedizioni ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('fiscal')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'fiscal'
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-700'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Fiscalità</span>
          </button>

          <button
            onClick={() => setActiveTab('new-product')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'new-product'
                ? 'bg-cyan-500 text-slate-950 font-black shadow-md'
                : 'bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/30'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>+ Inserisci Ricambio</span>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* TAB 1: PANORAMICA KPI & STATISTICHE                         */}
      {/* ============================================================ */}
      {activeTab === 'kpi' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                <span>Fatturato Lordo</span>
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-white font-mono">
                €{kpiStats.totalGrossRevenue.toFixed(2)}
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                Imponibile: €{kpiStats.totalNetRevenue.toFixed(2)}
              </div>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                <span>IVA Raccolta (22%)</span>
                <Building className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-black text-cyan-400 font-mono">
                €{kpiStats.totalVatCollected.toFixed(2)}
              </div>
              <div className="text-[11px] text-slate-500">
                Debito IVA verso Erario
              </div>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                <span>Valore Merce a Magazzino</span>
                <Package className="w-4 h-4 text-orange-400" />
              </div>
              <div className="text-2xl font-black text-orange-400 font-mono">
                €{kpiStats.totalInventoryValue.toFixed(2)}
              </div>
              <div className="text-[11px] text-slate-500">
                {kpiStats.totalItemsInStock} pezzi totali presenti
              </div>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                <span>Ordini da Evadere</span>
                <Clock className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-amber-400 font-mono">
                {kpiStats.pendingOrdersCount}
              </div>
              <div className="text-[11px] text-slate-500">
                Pronti per confezionamento e spedizione
              </div>
            </div>

          </div>

          {/* Quick Alerts Strip */}
          {(kpiStats.lowStockCount > 0 || kpiStats.outOfStockCount > 0) && (
            <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span className="text-amber-200">
                  Attenzione Magazzino: Hai <strong>{kpiStats.lowStockCount}</strong> prodotti sotto scorta minima e <strong>{kpiStats.outOfStockCount}</strong> prodotti esauriti.
                </span>
              </div>
              <button
                onClick={() => {
                  setStockFilter('low');
                  setActiveTab('warehouse');
                }}
                className="px-3 py-1.5 bg-amber-500 text-slate-950 rounded-lg font-bold text-xs hover:bg-amber-400 transition-colors"
              >
                Vedi Prodotti Sotto Scorta
              </button>
            </div>
          )}

          {/* Recent Orders Preview */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Ultimi Ordini Ricevuti
              </h2>
              <button
                onClick={() => setActiveTab('orders')}
                className="text-xs text-orange-400 hover:underline font-semibold"
              >
                Vedi Tutti ({orders.length})
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase">
                    <th className="py-2.5 px-3">Numero Ordine</th>
                    <th className="py-2.5 px-3">Data</th>
                    <th className="py-2.5 px-3">Cliente</th>
                    <th className="py-2.5 px-3">Totale Lordo</th>
                    <th className="py-2.5 px-3">Stato</th>
                    <th className="py-2.5 px-3">Corriere / Tracking</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {orders.slice(0, 5).map(o => (
                    <tr key={o.id} className="hover:bg-slate-900/50">
                      <td className="py-3 px-3 font-mono font-bold text-white">{o.orderNumber}</td>
                      <td className="py-3 px-3 text-slate-400">{o.createdAt.slice(0, 10)}</td>
                      <td className="py-3 px-3 text-slate-200">
                        {o.customer.companyName || `${o.customer.firstName} ${o.customer.lastName}`}
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-emerald-400">€{o.totalGross.toFixed(2)}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          o.status === 'shipped' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                          o.status === 'processing' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                          'bg-slate-800 text-slate-300'
                        }`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-400">
                        {o.trackingNumber || 'In attesa'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: GESTIONE MAGAZZINO & INVENTARIO                      */}
      {/* ============================================================ */}
      {activeTab === 'warehouse' && (
        <div className="space-y-6">
          
          {/* Warehouse Filters Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-xs">
            <div className="flex-1 max-w-md relative">
              <input
                type="text"
                placeholder="Cerca ricambio, SKU, codice OEM o posizione scaffale..."
                value={warehouseSearch}
                onChange={(e) => setWarehouseSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-orange-500 font-medium"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setStockFilter('all')}
                className={`px-3 py-1.5 rounded-lg font-semibold ${
                  stockFilter === 'all' ? 'bg-orange-500 text-white' : 'bg-slate-800 text-slate-300'
                }`}
              >
                Tutti ({products.length})
              </button>
              <button
                onClick={() => setStockFilter('low')}
                className={`px-3 py-1.5 rounded-lg font-semibold ${
                  stockFilter === 'low' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                }`}
              >
                Sotto Scorta
              </button>
              <button
                onClick={() => setStockFilter('out')}
                className={`px-3 py-1.5 rounded-lg font-semibold ${
                  stockFilter === 'out' ? 'bg-red-500 text-white' : 'bg-slate-800 text-slate-300'
                }`}
              >
                Esauriti
              </button>
            </div>
          </div>

          {/* Products Inventory Table */}
          <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider bg-slate-950/60">
                    <th className="py-3 px-4">Articolo & OEM</th>
                    <th className="py-3 px-4">Posizione Magazzino</th>
                    <th className="py-3 px-4">Prezzo Netto</th>
                    <th className="py-3 px-4">Prezzo Vendita (IVA 22%)</th>
                    <th className="py-3 px-4 text-center">Giacenza Reale</th>
                    <th className="py-3 px-4 text-right">Azioni</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {filteredWarehouseProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-900/40 transition-colors">
                      
                      {/* Product Name & OEM */}
                      <td className="py-3.5 px-4 max-w-sm">
                        <div className="font-bold text-white line-clamp-1">{p.name}</div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5 font-mono">
                          <span className="text-orange-400 font-semibold">OEM: {p.oemCode}</span>
                          <span>•</span>
                          <span>SKU: {p.sku}</span>
                          <span>•</span>
                          <span className="text-slate-300">{p.condition}</span>
                        </div>
                      </td>

                      {/* Warehouse Shelf */}
                      <td className="py-3.5 px-4">
                        <span className="font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/50">
                          {p.location}
                        </span>
                      </td>

                      {/* Net Price */}
                      <td className="py-3.5 px-4 font-mono text-slate-300">
                        €{p.priceNet.toFixed(2)}
                      </td>

                      {/* Gross Price */}
                      <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">
                        €{p.priceGross.toFixed(2)}
                      </td>

                      {/* Stock Level with +/- Quick Update */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="inline-flex items-center border border-slate-700 rounded-lg bg-slate-950">
                          <button
                            onClick={() => updateProductStock(p.id, p.stock - 1)}
                            className="px-2 py-1 text-slate-400 hover:text-white hover:bg-slate-800"
                            title="Scala 1 pezzo"
                          >
                            -
                          </button>
                          <span className={`px-3 py-1 font-mono font-bold ${
                            p.stock === 0 ? 'text-red-400' :
                            p.stock <= p.minStock ? 'text-amber-400' : 'text-white'
                          }`}>
                            {p.stock}
                          </span>
                          <button
                            onClick={() => updateProductStock(p.id, p.stock + 1)}
                            className="px-2 py-1 text-slate-400 hover:text-white hover:bg-slate-800"
                            title="Carica 1 pezzo"
                          >
                            +
                          </button>
                        </div>
                        {p.stock <= p.minStock && p.stock > 0 && (
                          <div className="text-[10px] text-amber-400 mt-1 font-semibold">Sotto Scorta!</div>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => {
                            if (confirm(`Sei sicuro di voler eliminare dal magazzino il ricambio "${p.name}"?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-950/30 rounded-lg transition-colors"
                          title="Elimina articolo"
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

      {/* ============================================================ */}
      {/* TAB 3: LOGISTICA & SPEDIZIONI                              */}
      {/* ============================================================ */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                Ordini Clienti & Lettere di Vettura
              </h2>
              <p className="text-xs text-slate-400">
                Gestisci lo stato della spedizione, assegna il corriere (BRT, GLS, DHL) e invia il tracking al cliente.
              </p>
            </div>
            <button
              onClick={handleExportCsv}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>Esporta Elenco Spedizioni</span>
            </button>
          </div>

          <div className="space-y-4">
            {orders.map((ord) => (
              <div key={ord.id} className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
                
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-black text-white text-sm bg-slate-900 px-3 py-1 rounded-lg border border-slate-700">
                      {ord.orderNumber}
                    </span>
                    <span className="text-xs text-slate-400">del {ord.createdAt.slice(0, 10)} ore {ord.createdAt.slice(11, 16)}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Stato:</span>
                    <select
                      value={ord.status}
                      onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                      className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs font-bold text-white focus:outline-none focus:border-orange-500"
                    >
                      <option value="pending_payment">In attesa pagamento</option>
                      <option value="processing">Da Imballare / Elaborare</option>
                      <option value="shipped">Spedito con Corriere</option>
                      <option value="delivered">Consegnato</option>
                      <option value="cancelled">Annullato</option>
                    </select>
                  </div>
                </div>

                {/* Body: Destination & Items */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  
                  {/* Destinatario */}
                  <div className="space-y-1 text-slate-300">
                    <div className="text-[11px] font-bold text-slate-400 uppercase">Destinatario:</div>
                    <div className="font-bold text-white">
                      {ord.customer.companyName || `${ord.customer.firstName} ${ord.customer.lastName}`}
                    </div>
                    <div>{ord.customer.address}</div>
                    <div>{ord.customer.postalCode} {ord.customer.city} ({ord.customer.province})</div>
                    <div className="text-slate-400">Tel: {ord.customer.phone}</div>
                    {ord.customer.notes && (
                      <div className="text-amber-400 italic mt-1">Note: &quot;{ord.customer.notes}&quot;</div>
                    )}
                  </div>

                  {/* Articoli ordinati */}
                  <div className="space-y-1">
                    <div className="text-[11px] font-bold text-slate-400 uppercase">Articoli nel collo:</div>
                    <ul className="space-y-1.5 text-slate-200">
                      {ord.items.map((it, idx) => (
                        <li key={idx} className="flex justify-between">
                          <span className="truncate pr-2 font-medium">
                            {it.quantity}x {it.product.name}
                          </span>
                          <span className="font-mono text-slate-400 flex-shrink-0">
                            Scaffale: {it.product.location}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tracking & Document */}
                  <div className="space-y-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div className="text-[11px] font-bold text-slate-400 uppercase">Tracking Spedizione:</div>
                    {editingOrderId === ord.id ? (
                      <div className="space-y-2">
                        <select
                          value={courierInput}
                          onChange={(e) => setCourierInput(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-xs text-white"
                        >
                          <option value="GLS Express">GLS Express</option>
                          <option value="BRT Corriere Espresso">BRT Corriere Espresso</option>
                          <option value="DHL Express">DHL Express</option>
                          <option value="Poste Italiane / SDA">Poste Italiane / SDA</option>
                        </select>
                        <input
                          type="text"
                          placeholder="Numero Lettera di Vettura (LDV)"
                          value={trackingInput}
                          onChange={(e) => setTrackingInput(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-xs text-white font-mono"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSaveTracking(ord.id)}
                            className="px-2.5 py-1 bg-emerald-500 text-slate-950 font-bold rounded-lg text-xs"
                          >
                            Salva & Invia
                          </button>
                          <button
                            onClick={() => setEditingOrderId(null)}
                            className="px-2.5 py-1 bg-slate-800 text-slate-400 rounded-lg text-xs"
                          >
                            Annulla
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-white">{ord.courierName || ord.shippingMethod.courier}</div>
                          <div className="font-mono text-cyan-400">{ord.trackingNumber || 'Nessun tracking assegnato'}</div>
                        </div>
                        <button
                          onClick={() => {
                            setEditingOrderId(ord.id);
                            setTrackingInput(ord.trackingNumber || '');
                            setCourierInput(ord.courierName || 'GLS Express');
                          }}
                          className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
                          title="Modifica Tracking"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                </div>

                {/* Footer of order card */}
                <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-4 text-slate-400">
                    <span>Imponibile: €{ord.subtotalNet.toFixed(2)}</span>
                    <span>IVA 22%: €{ord.vatAmount.toFixed(2)}</span>
                    <span>Spedizione: €{ord.shippingTotal.toFixed(2)}</span>
                    <span className="font-bold text-white text-sm">Totale: €{ord.totalGross.toFixed(2)}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => window.print()}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:text-white flex items-center gap-1.5"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Stampa Packing Slip / DDT</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 4: FISCALITÀ & COMMERCIALISTA                            */}
      {/* ============================================================ */}
      {activeTab === 'fiscal' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                Gestione Fiscale & Fatturazione Elettronica
              </h2>
              <p className="text-xs text-slate-400">
                Riepilogo IVA a debito, registro corrispettivi telematici e suddivisione B2B / B2C.
              </p>
            </div>

            <button
              onClick={handleExportCsv}
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Scarica File CSV per il Commercialista</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Riepilogo Liquidazione IVA
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Totale Imponibile Vendite:</span>
                  <span className="font-mono font-bold text-white">€{kpiStats.totalNetRevenue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Aliquota Ordinaria:</span>
                  <span className="font-mono">22%</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
                  <span className="font-bold text-white">Totale IVA a Debito:</span>
                  <span className="text-xl font-black text-cyan-400 font-mono">€{kpiStats.totalVatCollected.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Ripartizione Vendite B2B vs B2C
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Privati (Scontrino/Corrispettivo C.F.):</span>
                  <span className="font-mono font-bold text-white">
                    {orders.filter(o => o.customer.customerType === 'private').length} ordini
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Aziende & Meccanici (Fattura SDI):</span>
                  <span className="font-mono font-bold text-white">
                    {orders.filter(o => o.customer.customerType === 'business').length} ordini
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                  Tutti gli ordini B2B includono Codice Univoco SDI a 7 caratteri e Partita IVA verificata.
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Margine Operativo Stimato
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Fatturato al netto di IVA:</span>
                  <span className="font-mono font-bold text-white">€{kpiStats.totalNetRevenue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Costo medio merce venduta:</span>
                  <span className="font-mono text-slate-400">~ 55%</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline font-bold text-emerald-400">
                  <span>Margine Lordo:</span>
                  <span className="text-lg font-mono">~ 45%</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 5: INSERIMENTO NUOVO PRODOTTO                          */}
      {/* ============================================================ */}
      {activeTab === 'new-product' && (
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-black text-white uppercase tracking-tight">
              Inserimento Nuovo Ricambio in Vendita
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Inserisci i dati tecnici del ricambio, il prezzo imponibile (il sistema calcola automaticamente l&apos;IVA 22% e la spedizione per il carrello) e la posizione a magazzino.
            </p>
          </div>

          <form onSubmit={handleCreateProduct} className="space-y-6 text-xs">
            
            {/* Title & Brand */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                  Titolo Ricambio *
                </label>
                <input
                  type="text"
                  required
                  placeholder="es. Kit Dischi Freno Anteriori Autoventilanti..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-orange-500 font-semibold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                  Marca / Produttore *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Brembo, Bosch, Toyota Genuine..."
                  value={newBrand}
                  onChange={(e) => setNewBrand(e.target.value)}
                  className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Codes: OEM & SKU */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                  Codice Originale OEM *
                </label>
                <input
                  type="text"
                  required
                  placeholder="es. 04466-0F010"
                  value={newOem}
                  onChange={(e) => setNewOem(e.target.value)}
                  className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                  Codice Interno SKU *
                </label>
                <input
                  type="text"
                  required
                  placeholder="es. BRM-09A82011"
                  value={newSku}
                  onChange={(e) => setNewSku(e.target.value)}
                  className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono uppercase focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                  Categoria di Appartenenza
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-orange-500"
                >
                  {INITIAL_CATEGORIES.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Condition, Location, Stock */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                  Condizione Ricambio
                </label>
                <select
                  value={newCondition}
                  onChange={(e) => setNewCondition(e.target.value as any)}
                  className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="Nuovo Originale">Nuovo Originale</option>
                  <option value="Nuovo NOS">Nuovo NOS (New Old Stock)</option>
                  <option value="Aftermarket Certificato">Aftermarket Certificato</option>
                  <option value="Ricondizionato Garantito">Ricondizionato Garantito</option>
                  <option value="Usato Verificato">Usato Verificato</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                  Posizione Magazzino / Scaffale *
                </label>
                <input
                  type="text"
                  required
                  placeholder="es. Scaffale B-14 / C2"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-orange-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                  Quantità Iniziale a Stock *
                </label>
                <input
                  type="number"
                  min={0}
                  required
                  value={newStock}
                  onChange={(e) => setNewStock(Number(e.target.value))}
                  className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                  Soglia Minima Riordino
                </label>
                <input
                  type="number"
                  min={1}
                  value={newMinStock}
                  onChange={(e) => setNewMinStock(Number(e.target.value))}
                  className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Pricing & Italian Tax Calculation Box */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-orange-500/30 space-y-3">
              <div className="font-bold text-orange-400 text-xs uppercase tracking-wider">
                Calcolo Prezzo di Vendita e Fiscalità (IVA 22%)
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                    Prezzo Imponibile Netto (€) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={newPriceNet}
                    onChange={(e) => setNewPriceNet(Number(e.target.value))}
                    className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono font-bold focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                    Aliquota IVA (%)
                  </label>
                  <input
                    type="number"
                    value={newVatRate}
                    onChange={(e) => setNewVatRate(Number(e.target.value))}
                    className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                    Prezzo Finale con IVA (€)
                  </label>
                  <div className="py-2.5 px-3 bg-slate-900/60 border border-slate-700 rounded-xl text-emerald-400 font-mono font-bold text-sm">
                    €{calculatedGross.toFixed(2)}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                    Spese di Spedizione Forfettarie (€)
                  </label>
                  <input
                    type="number"
                    step="0.10"
                    value={newShippingCost}
                    onChange={(e) => setNewShippingCost(Number(e.target.value))}
                    className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            </div>

            {/* Vehicle Compatibility */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="font-bold text-white text-xs uppercase tracking-wider">
                Compatibilità Vettura Primaria
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Marca</label>
                  <input
                    type="text"
                    value={newCompatMake}
                    onChange={(e) => setNewCompatMake(e.target.value)}
                    className="w-full py-2 px-3 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Modello</label>
                  <input
                    type="text"
                    value={newCompatModel}
                    onChange={(e) => setNewCompatModel(e.target.value)}
                    className="w-full py-2 px-3 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Da Anno</label>
                  <input
                    type="number"
                    value={newCompatYearStart}
                    onChange={(e) => setNewCompatYearStart(Number(e.target.value))}
                    className="w-full py-2 px-3 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">A Anno</label>
                  <input
                    type="number"
                    value={newCompatYearEnd}
                    onChange={(e) => setNewCompatYearEnd(Number(e.target.value))}
                    className="w-full py-2 px-3 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Image URL & Description */}
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                  URL Immagine Prodotto (o link foto eBay)
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-orange-500 font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                  Descrizione Tecnica & Note per il Cliente
                </label>
                <textarea
                  rows={3}
                  placeholder="Descrivi lo stato del pezzo, caratteristiche tecniche, dotazioni incluse..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveTab('warehouse')}
                className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white"
              >
                Annulla
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:brightness-110 text-white font-bold shadow-lg shadow-orange-500/20"
              >
                Pubblica Ricambio in Vendita
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
}
