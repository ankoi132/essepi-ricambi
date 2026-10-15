'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  BarChart2, 
  PieChart as PieIcon, 
  Calendar, 
  DollarSign, 
  Package, 
  Truck, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight,
  Sparkles,
  Layers,
  ChevronDown
} from 'lucide-react';
import { Order, Product } from '@/lib/types';

// ==========================================
// 1. INTERACTIVE CURVED AREA / LINE CHART
// ==========================================
export interface LineDataPoint {
  date: string;
  label: string;
  revenue: number;
  netRevenue: number;
  ordersCount: number;
}

interface AreaSplineChartProps {
  data: LineDataPoint[];
  title: string;
  subtitle?: string;
  height?: number;
}

export function AreaSplineChart({ data, title, subtitle, height = 260 }: AreaSplineChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!data || data.length === 0) return null;

  const maxRevenue = Math.max(...data.map(d => d.revenue), 100);
  const paddingX = 40;
  const paddingY = 30;
  const chartWidth = 700;
  const chartHeight = height;

  const points = data.map((d, i) => {
    const x = paddingX + (i / (data.length - 1)) * (chartWidth - paddingX * 2);
    const y = chartHeight - paddingY - (d.revenue / maxRevenue) * (chartHeight - paddingY * 2);
    return { x, y, data: d };
  });

  const netPoints = data.map((d, i) => {
    const x = paddingX + (i / (data.length - 1)) * (chartWidth - paddingX * 2);
    const y = chartHeight - paddingY - (d.netRevenue / maxRevenue) * (chartHeight - paddingY * 2);
    return { x, y, data: d };
  });

  // Calculate smooth SVG cubic bezier path
  const createSmoothPath = (pts: { x: number; y: number }[]) => {
    if (pts.length < 2) return '';
    let path = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? 0 : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2 < pts.length ? i + 2 : i + 1];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return path;
  };

  const linePath = createSmoothPath(points);
  const netLinePath = createSmoothPath(netPoints);
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${chartHeight - paddingY} L ${points[0].x} ${chartHeight - paddingY} Z`;

  const hoveredPoint = hoveredIndex !== null ? points[hoveredIndex] : null;

  return (
    <div className="glass-card p-5 rounded-2xl border border-slate-800 bg-slate-950/70 space-y-4 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div>
          <h3 className="text-sm font-black text-white uppercase tracking-tight flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-orange-400" />
            <span>{title}</span>
          </h3>
          {subtitle && <p className="text-[11px] text-slate-400 mt-0.5">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-sm shadow-orange-500/50" />
            <span className="text-slate-300">Lordo (IVA inc.)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400/50" />
            <span className="text-slate-400">Netto Imponibile</span>
          </div>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <svg 
          viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
          className="w-full h-auto overflow-visible select-none"
        >
          <defs>
            <linearGradient id="revenueAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff5e00" stopOpacity="0.35" />
              <stop offset="70%" stopColor="#ff5e00" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#ff5e00" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="orangeStrokeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#ff5e00" />
              <stop offset="100%" stopColor="#ff2a00" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
            const y = chartHeight - paddingY - ratio * (chartHeight - paddingY * 2);
            const val = (ratio * maxRevenue).toFixed(0);
            return (
              <g key={i}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={chartWidth - paddingX}
                  y2={y}
                  stroke="rgba(255,255,255,0.06)"
                  strokeDasharray="4 4"
                />
                <text
                  x={paddingX - 8}
                  y={y + 3}
                  textAnchor="end"
                  fill="rgba(148,163,184,0.6)"
                  fontSize="9"
                  fontFamily="monospace"
                >
                  €{val}
                </text>
              </g>
            );
          })}

          {/* Area Fill */}
          <path d={areaPath} fill="url(#revenueAreaGrad)" />

          {/* Net Line (Cyan) */}
          <path
            d={netLinePath}
            fill="none"
            stroke="#06b6d4"
            strokeWidth="2"
            strokeDasharray="3 3"
            opacity="0.7"
          />

          {/* Gross Line (Orange Gradient) */}
          <path
            d={linePath}
            fill="none"
            stroke="url(#orangeStrokeGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Points & Interactive Hover Columns */}
          {points.map((pt, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <g key={i} className="cursor-pointer">
                {/* Invisible hover capture rect */}
                <rect
                  x={pt.x - 20}
                  y={0}
                  width={40}
                  height={chartHeight}
                  fill="transparent"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />

                {/* Point dot */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 6 : 3.5}
                  fill={isHovered ? '#ff5e00' : '#0b0f19'}
                  stroke="#ff5e00"
                  strokeWidth={isHovered ? 3 : 2}
                  className="transition-all duration-150"
                />

                {/* X axis labels */}
                <text
                  x={pt.x}
                  y={chartHeight - 8}
                  textAnchor="middle"
                  fill={isHovered ? '#ffffff' : 'rgba(148,163,184,0.7)'}
                  fontSize="10"
                  fontWeight={isHovered ? 'bold' : 'normal'}
                >
                  {pt.data.label}
                </text>
              </g>
            );
          })}

          {/* Vertical cursor guide line when hovering */}
          {hoveredPoint && (
            <line
              x1={hoveredPoint.x}
              y1={paddingY}
              x2={hoveredPoint.x}
              y2={chartHeight - paddingY}
              stroke="#ff5e00"
              strokeWidth="1.5"
              strokeDasharray="2 2"
              opacity="0.8"
            />
          )}
        </svg>

        {/* Floating Tooltip Box */}
        {hoveredPoint && (
          <div
            className="absolute z-20 pointer-events-none p-3 rounded-xl bg-slate-900/95 border border-orange-500/50 shadow-2xl backdrop-blur-md text-xs space-y-1 transform -translate-x-1/2 -translate-y-full transition-all"
            style={{
              left: `${(hoveredPoint.x / chartWidth) * 100}%`,
              top: `${Math.max(10, (hoveredPoint.y / chartHeight) * 100 - 15)}%`
            }}
          >
            <div className="font-bold text-white border-b border-slate-800 pb-1 flex justify-between gap-3">
              <span>{hoveredPoint.data.date}</span>
              <span className="text-orange-400 font-mono">{hoveredPoint.data.ordersCount} Ordini</span>
            </div>
            <div className="flex justify-between gap-4 text-[11px]">
              <span className="text-slate-400">Lordo:</span>
              <span className="font-mono font-bold text-white">€ {hoveredPoint.data.revenue.toFixed(2)}</span>
            </div>
            <div className="flex justify-between gap-4 text-[11px]">
              <span className="text-slate-400">Netto (IVA 22%):</span>
              <span className="font-mono font-bold text-cyan-400">€ {hoveredPoint.data.netRevenue.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


// ==========================================
// 2. INTERACTIVE BAR / HISTOGRAM CHART
// ==========================================
export interface BarDataPoint {
  label: string;
  value: number;
  formattedValue?: string;
  secondaryValue?: number;
  category?: string;
  color?: string;
}

interface BarHistogramChartProps {
  data: BarDataPoint[];
  title: string;
  subtitle?: string;
  valuePrefix?: string;
  height?: number;
}

export function BarHistogramChart({
  data,
  title,
  subtitle,
  valuePrefix = '€ ',
  height = 240
}: BarHistogramChartProps) {
  const [activeBar, setActiveBar] = useState<BarDataPoint | null>(null);

  if (!data || data.length === 0) return null;

  const maxValue = Math.max(...data.map(d => d.value), 1);

  return (
    <div className="glass-card p-5 rounded-2xl border border-slate-800 bg-slate-950/70 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div>
          <h3 className="text-sm font-black text-white uppercase tracking-tight flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-cyan-400" />
            <span>{title}</span>
          </h3>
          {subtitle && <p className="text-[11px] text-slate-400 mt-0.5">{subtitle}</p>}
        </div>

        {activeBar && (
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block uppercase font-mono">{activeBar.label}</span>
            <span className="text-sm font-mono font-bold text-cyan-400">
              {valuePrefix}{activeBar.value.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
            </span>
          </div>
        )}
      </div>

      <div 
        className="flex items-end gap-2 sm:gap-3 justify-between pt-6 px-2"
        style={{ height }}
      >
        {data.map((item, idx) => {
          const heightPct = Math.max(8, (item.value / maxValue) * 100);
          const barColor = item.color || '#06b6d4';
          const isSelected = activeBar?.label === item.label;

          return (
            <div
              key={idx}
              onMouseEnter={() => setActiveBar(item)}
              onMouseLeave={() => setActiveBar(null)}
              className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
            >
              {/* Value on hover */}
              <div className={`text-[10px] font-mono font-bold text-white mb-1 transition-opacity ${
                isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}>
                {valuePrefix}{item.value >= 1000 ? `${(item.value / 1000).toFixed(1)}k` : item.value.toFixed(0)}
              </div>

              {/* Bar pillar */}
              <div className="w-full max-w-[48px] bg-slate-900 rounded-t-xl overflow-hidden relative border border-slate-800 group-hover:border-cyan-500/50 transition-all flex items-end">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPct}%` }}
                  transition={{ duration: 0.6, delay: idx * 0.05 }}
                  className="w-full rounded-t-lg transition-all"
                  style={{
                    backgroundColor: barColor,
                    boxShadow: isSelected ? `0 0 15px ${barColor}80` : 'none'
                  }}
                />
              </div>

              {/* Label */}
              <div className="text-[10px] text-slate-400 group-hover:text-white font-medium mt-2 text-center truncate w-full">
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


// ==========================================
// 3. INTERACTIVE PIE / DONUT CHART
// ==========================================
export interface PieSlice {
  label: string;
  value: number;
  color: string;
  subtext?: string;
}

interface DonutPieChartProps {
  data: PieSlice[];
  title: string;
  subtitle?: string;
  centerTotalLabel?: string;
}

export function DonutPieChart({ data, title, subtitle, centerTotalLabel = 'Totale' }: DonutPieChartProps) {
  const [hoveredSlice, setHoveredSlice] = useState<PieSlice | null>(null);

  const total = data.reduce((acc, d) => acc + d.value, 0);

  // SVG Geometry for Donut
  const size = 200;
  const strokeWidth = 32;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercent = 0;

  return (
    <div className="glass-card p-5 rounded-2xl border border-slate-800 bg-slate-950/70 space-y-4">
      <div className="border-b border-slate-800/80 pb-3">
        <h3 className="text-sm font-black text-white uppercase tracking-tight flex items-center gap-2">
          <PieIcon className="w-4 h-4 text-emerald-400" />
          <span>{title}</span>
        </h3>
        {subtitle && <p className="text-[11px] text-slate-400 mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
        
        {/* SVG Donut Circle */}
        <div className="relative w-44 h-44 flex-shrink-0 flex items-center justify-center">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
            {/* Background ring */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth={strokeWidth}
              fill="none"
            />

            {/* Slices */}
            {data.map((slice, i) => {
              const slicePercent = total > 0 ? slice.value / total : 0;
              const strokeDasharray = `${slicePercent * circumference} ${circumference}`;
              const strokeDashoffset = -accumulatedPercent * circumference;
              accumulatedPercent += slicePercent;

              const isHovered = hoveredSlice?.label === slice.label;

              return (
                <circle
                  key={i}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke={slice.color}
                  strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  fill="none"
                  className="transition-all duration-200 cursor-pointer"
                  onMouseEnter={() => setHoveredSlice(slice)}
                  onMouseLeave={() => setHoveredSlice(null)}
                />
              );
            })}
          </svg>

          {/* Center text in Donut */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center p-2">
            <span className="text-[10px] text-slate-400 uppercase font-mono">
              {hoveredSlice ? hoveredSlice.label : centerTotalLabel}
            </span>
            <span className="text-base font-black text-white font-mono mt-0.5">
              {hoveredSlice 
                ? `${((hoveredSlice.value / (total || 1)) * 100).toFixed(0)}%` 
                : total.toLocaleString()}
            </span>
            {hoveredSlice && (
              <span className="text-[10px] font-bold text-emerald-400 font-mono">
                € {hoveredSlice.value.toFixed(0)}
              </span>
            )}
          </div>
        </div>

        {/* Legend list */}
        <div className="flex-1 w-full space-y-2">
          {data.map((slice, idx) => {
            const percent = total > 0 ? ((slice.value / total) * 100).toFixed(1) : 0;
            const isHovered = hoveredSlice?.label === slice.label;

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredSlice(slice)}
                onMouseLeave={() => setHoveredSlice(null)}
                className={`p-2 rounded-xl transition-all flex items-center justify-between cursor-pointer border ${
                  isHovered 
                    ? 'bg-slate-900 border-slate-700 shadow-md scale-102' 
                    : 'bg-slate-950/50 border-slate-800/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span 
                    className="w-3 h-3 rounded-md flex-shrink-0"
                    style={{ backgroundColor: slice.color }}
                  />
                  <div>
                    <div className="text-xs font-bold text-white">{slice.label}</div>
                    {slice.subtext && <div className="text-[10px] text-slate-400">{slice.subtext}</div>}
                  </div>
                </div>

                <div className="text-right font-mono">
                  <div className="text-xs font-bold text-white">{percent}%</div>
                  <div className="text-[10px] text-slate-400">€ {slice.value.toFixed(0)}</div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
