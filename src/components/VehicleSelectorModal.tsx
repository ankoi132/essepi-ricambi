'use client';

import React, { useState, useMemo } from 'react';
import { X, Car, Check, ChevronRight, RotateCcw } from 'lucide-react';
import { useStore } from '@/lib/store';
import { VEHICLE_MAKES } from '@/lib/data';

export default function VehicleSelectorModal() {
  const { 
    isVehicleModalOpen, 
    setIsVehicleModalOpen, 
    activeVehicle, 
    setActiveVehicle, 
    clearActiveVehicle,
    products 
  } = useStore();

  const [selectedMake, setSelectedMake] = useState<string>(activeVehicle?.make || '');
  const [selectedModel, setSelectedModel] = useState<string>(activeVehicle?.model || '');
  const [selectedYear, setSelectedYear] = useState<number | undefined>(activeVehicle?.year);

  // Extract models available in catalog for the selected make
  const availableModels = useMemo(() => {
    if (!selectedMake) return [];
    const modelsSet = new Set<string>();
    products.forEach((p) => {
      p.compatibility.forEach((c) => {
        if (c.make.toLowerCase() === selectedMake.toLowerCase()) {
          modelsSet.add(c.model);
        }
      });
    });
    return Array.from(modelsSet);
  }, [selectedMake, products]);

  // Extract years range for selected model
  const availableYears = useMemo(() => {
    if (!selectedMake || !selectedModel) return [];
    const years = new Set<number>();
    products.forEach((p) => {
      p.compatibility.forEach((c) => {
        if (
          c.make.toLowerCase() === selectedMake.toLowerCase() &&
          c.model.toLowerCase().includes(selectedModel.toLowerCase())
        ) {
          for (let y = c.yearStart; y <= Math.min(c.yearEnd, 2026); y++) {
            years.add(y);
          }
        }
      });
    });
    return Array.from(years).sort((a, b) => b - a);
  }, [selectedMake, selectedModel, products]);

  if (!isVehicleModalOpen) return null;

  const handleApply = () => {
    if (selectedMake) {
      setActiveVehicle({
        make: selectedMake,
        model: selectedModel,
        year: selectedYear
      });
      setIsVehicleModalOpen(false);
    }
  };

  const handleReset = () => {
    setSelectedMake('');
    setSelectedModel('');
    setSelectedYear(undefined);
    clearActiveVehicle();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="glass-card w-full max-w-xl rounded-2xl p-6 border border-slate-700 bg-slate-950 shadow-2xl relative text-white">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Il Tuo Garage Virtuale</h3>
              <p className="text-xs text-slate-400">
                Seleziona la tua auto per visualizzare esclusivamente i ricambi compatibili al 100%.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsVehicleModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selection Steps */}
        <div className="py-6 space-y-5">
          {/* 1. Marca */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              1. Seleziona Marca Auto
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {VEHICLE_MAKES.map((make) => {
                const isSelected = selectedMake.toLowerCase() === make.toLowerCase();
                return (
                  <button
                    key={make}
                    type="button"
                    onClick={() => {
                      setSelectedMake(make);
                      setSelectedModel('');
                      setSelectedYear(undefined);
                    }}
                    className={`py-2 px-3 text-xs font-semibold rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'bg-orange-500 border-orange-400 text-white shadow-md shadow-orange-500/30 scale-102'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-600 hover:bg-slate-850'
                    }`}
                  >
                    {make}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Modello */}
          {selectedMake && (
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                2. Modello Vettura ({selectedMake})
              </label>
              {availableModels.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {availableModels.map((model) => {
                    const isSelected = selectedModel.toLowerCase() === model.toLowerCase();
                    return (
                      <button
                        key={model}
                        type="button"
                        onClick={() => {
                          setSelectedModel(model);
                          setSelectedYear(undefined);
                        }}
                        className={`py-2 px-3 text-xs font-semibold rounded-xl border text-left transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-orange-500 border-orange-400 text-white'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-600'
                        }`}
                      >
                        <span className="truncate">{model}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-xs text-slate-400">
                  Nessun modello specifico pre-registrato per questa marca, ma puoi comunque filtrare per marca o inserire il modello nella ricerca.
                </div>
              )}
            </div>
          )}

          {/* 3. Anno di Costruzione */}
          {selectedModel && availableYears.length > 0 && (
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                3. Anno di Immatricolazione (Opzionale)
              </label>
              <div className="flex flex-wrap gap-2 max-h-28 overflow-y-auto pr-1">
                {availableYears.map((year) => {
                  const isSelected = selectedYear === year;
                  return (
                    <button
                      key={year}
                      type="button"
                      onClick={() => setSelectedYear(isSelected ? undefined : year)}
                      className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg border transition-all ${
                        isSelected
                          ? 'bg-cyan-500 border-cyan-400 text-slate-950 font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      {year}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Action Footer */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 text-xs text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Azzera Filtro
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsVehicleModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white rounded-xl hover:bg-slate-850"
            >
              Annulla
            </button>
            <button
              type="button"
              onClick={handleApply}
              disabled={!selectedMake}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                selectedMake
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:brightness-110 shadow-lg shadow-orange-500/25 cursor-pointer'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <span>Applica e Filtra Prodotti</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
