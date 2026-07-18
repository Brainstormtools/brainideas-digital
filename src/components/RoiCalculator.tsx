import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calculator, TrendingUp, Users, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface IndustryPreset {
  name: string;
  defaultTraffic: number;
  defaultValuePkr: number;
  defaultValueUsd: number;
}

const INDUSTRY_PRESETS: IndustryPreset[] = [
  { name: 'Beauty Salon', defaultTraffic: 800, defaultValuePkr: 4000, defaultValueUsd: 20 },
  { name: 'Aesthetic Clinic', defaultTraffic: 600, defaultValuePkr: 15000, defaultValueUsd: 75 },
  { name: 'Dental Clinic', defaultTraffic: 500, defaultValuePkr: 12000, defaultValueUsd: 60 },
  { name: 'Restaurant/Cafe', defaultTraffic: 1500, defaultValuePkr: 2500, defaultValueUsd: 12 },
  { name: 'Home Repair/AC', defaultTraffic: 400, defaultValuePkr: 8000, defaultValueUsd: 40 },
  { name: 'Coaching Institute', defaultTraffic: 500, defaultValuePkr: 6000, defaultValueUsd: 30 }
];

interface RoiCalculatorProps {
  handleNavigation: (sectionId: string) => void;
}

export default function RoiCalculator({ handleNavigation }: RoiCalculatorProps) {
  const [currency, setCurrency] = useState<'PKR' | 'USD'>('PKR');
  const [traffic, setTraffic] = useState<number>(800);
  const [clientValue, setClientValue] = useState<number>(4000);
  const [selectedPreset, setSelectedPreset] = useState<string>('Beauty Salon');

  // Sync preset values when currency changes
  useEffect(() => {
    const preset = INDUSTRY_PRESETS.find(p => p.name === selectedPreset);
    if (preset) {
      setClientValue(currency === 'PKR' ? preset.defaultValuePkr : preset.defaultValueUsd);
    }
  }, [currency]);

  const selectPreset = (preset: IndustryPreset) => {
    setSelectedPreset(preset.name);
    setTraffic(preset.defaultTraffic);
    setClientValue(currency === 'PKR' ? preset.defaultValuePkr : preset.defaultValueUsd);
  };

  // Rates
  const oldConversionRate = 1.2; // 1.2% conversion for slow/standard template websites
  const newConversionRate = 4.8; // 4.8% conversion for fast custom conversion-focused sites
  const conversionIncrease = Number((newConversionRate - oldConversionRate).toFixed(1));

  // Calculations
  const oldLeads = Math.round((traffic * oldConversionRate) / 100);
  const newLeads = Math.round((traffic * newConversionRate) / 100);
  const extraLeads = Math.max(0, newLeads - oldLeads);
  const extraRevenue = extraLeads * clientValue;

  // Approximate package cost for break-even (Starter PKR 25k / USD 120, Business PKR 45k / USD 220)
  const averageSetupCost = currency === 'PKR' ? 45000 : 220;
  const breakEvenMonths = extraRevenue > 0 ? Number((averageSetupCost / extraRevenue).toFixed(1)) : 0;

  const formatCurrency = (val: number) => {
    if (currency === 'PKR') {
      return `Rs. ${val.toLocaleString()}`;
    }
    return `$${val.toLocaleString()}`;
  };

  return (
    <div className="mt-16 bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-10 max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute left-0 bottom-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800/80">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-indigo-400 font-mono flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-indigo-400" /> Lead & ROI Calculator
            </span>
            <h3 className="text-xl md:text-2xl font-bold font-display text-white mt-1">
              Calculate Your Revenue Growth
            </h3>
            <p className="text-xs md:text-sm text-slate-400 mt-1">
              See how a fast, conversion-focused website directly translates to more local bookings and inquiries.
            </p>
          </div>

          {/* Currency Toggle */}
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center self-start md:self-auto shadow-inner">
            <button
              onClick={() => setCurrency('PKR')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                currency === 'PKR'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              PKR (Rs.)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                currency === 'USD'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              USD ($)
            </button>
          </div>
        </div>

        {/* Industry Presets */}
        <div className="mb-8">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block mb-3 font-mono">
            Select Your Business Industry Preset
          </span>
          <div className="flex flex-wrap gap-2">
            {INDUSTRY_PRESETS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => selectPreset(preset)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-tight border transition-all cursor-pointer ${
                  selectedPreset === preset.name
                    ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/50'
                    : 'bg-slate-950 text-slate-400 border-slate-800/80 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          
          {/* Traffic Slider */}
          <div className="bg-slate-950/40 border border-slate-800/60 p-5 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-300 font-sans flex items-center gap-1.5">
                <Users className="w-4 h-4 text-slate-400" /> Monthly Website Visitors
              </span>
              <span className="text-base font-bold text-white font-mono bg-indigo-950/50 border border-indigo-900/30 px-2.5 py-1 rounded-lg">
                {traffic.toLocaleString()} <span className="text-xs font-medium text-slate-400 font-sans">/mo</span>
              </span>
            </div>
            <input
              type="range"
              min="100"
              max="5000"
              step="50"
              value={traffic}
              onChange={(e) => {
                setTraffic(Number(e.target.value));
                setSelectedPreset('Custom');
              }}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              aria-label="Monthly Website Visitors"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-2">
              <span>100 visitors</span>
              <span>2,500</span>
              <span>5,000 visitors</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-3 leading-relaxed">
              Typical monthly visitors from local search, Maps, and G-Business Profile clicks.
            </p>
          </div>

          {/* Average Client Value Slider */}
          <div className="bg-slate-950/40 border border-slate-800/60 p-5 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-300 font-sans flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-slate-400" /> Avg. Value Per Customer
              </span>
              <span className="text-base font-bold text-amber-400 font-mono bg-amber-950/30 border border-amber-900/30 px-2.5 py-1 rounded-lg">
                {formatCurrency(clientValue)}
              </span>
            </div>
            <input
              type="range"
              min={currency === 'PKR' ? '1000' : '5'}
              max={currency === 'PKR' ? '50000' : '250'}
              step={currency === 'PKR' ? '500' : '5'}
              value={clientValue}
              onChange={(e) => {
                setClientValue(Number(e.target.value));
                setSelectedPreset('Custom');
              }}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              aria-label="Average Value Per Customer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-2">
              <span>{formatCurrency(currency === 'PKR' ? 1000 : 5)}</span>
              <span>{formatCurrency(currency === 'PKR' ? 25000 : 125)}</span>
              <span>{formatCurrency(currency === 'PKR' ? 50000 : 250)}</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-3 leading-relaxed">
              Average ticket value or lifetime revenue generated by a single localized client booking.
            </p>
          </div>

        </div>

        {/* Results Showcase Grid */}
        <div className="grid sm:grid-cols-3 gap-6 bg-slate-950/80 border border-slate-800/80 rounded-2xl p-6 mb-8 text-center sm:text-left items-center">
          
          <div className="sm:border-r border-slate-800/80 sm:pr-6 pb-4 sm:pb-0">
            <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400 font-mono">Conversion Boost</span>
            <div className="flex items-baseline justify-center sm:justify-start gap-1.5 mt-1.5">
              <span className="text-3xl font-extrabold text-white font-display">+{conversionIncrease}%</span>
              <span className="text-xs text-indigo-300 font-semibold">More Leads</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1.5 leading-normal">
              From an average of {oldConversionRate}% to our optimized {newConversionRate}% conversion benchmark.
            </p>
          </div>

          <div className="sm:border-r border-slate-800/80 sm:px-6 py-4 sm:py-0">
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 font-mono">Extra Monthly Leads</span>
            <div className="flex items-baseline justify-center sm:justify-start gap-1.5 mt-1.5">
              <span className="text-3xl font-extrabold text-white font-display">+{extraLeads}</span>
              <span className="text-xs text-emerald-300 font-semibold">Inquiries / mo</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1.5 leading-normal">
              Generating a total of {newLeads} leads instead of only {oldLeads} leads from the same traffic.
            </p>
          </div>

          <div className="sm:pl-6 pt-4 sm:pt-0">
            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 font-mono">Estimated Extra Revenue</span>
            <div className="flex items-baseline justify-center sm:justify-start gap-1.5 mt-1.5">
              <span className="text-3xl font-extrabold text-amber-400 font-display">{formatCurrency(extraRevenue)}</span>
              <span className="text-xs text-slate-300 font-medium font-sans">/mo</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1.5 leading-normal">
              {breakEvenMonths <= 0.3 ? (
                <span className="text-amber-300 font-semibold flex items-center gap-1 justify-center sm:justify-start"><Sparkles className="w-3.5 h-3.5 animate-pulse" /> Immediate Payback!</span>
              ) : (
                <span>Covers a {formatCurrency(averageSetupCost)} build in <span className="text-amber-300 font-semibold">{breakEvenMonths} mo</span>.</span>
              )}
            </p>
          </div>

        </div>

        {/* Dynamic call to action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-indigo-950/20 border border-indigo-900/40 rounded-2xl">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-indigo-900/40 text-indigo-400 rounded-xl mt-0.5 shrink-0 border border-indigo-800/30">
              <CheckCircle2 className="w-4 h-4 text-indigo-400" aria-hidden="true" />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-bold text-white tracking-tight">Conversion-First Optimization Ready</h4>
              <p className="text-[11px] text-slate-300 mt-0.5 max-w-lg leading-relaxed">
                By upgrading your slow, static, or missing local website, you unlock hidden traffic and turn existing visual profile impressions into high-intent enquiries.
              </p>
            </div>
          </div>
          
          <button
            onClick={() => handleNavigation('contact')}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-bold py-3 px-5 rounded-xl transition-all inline-flex items-center justify-center gap-1.5 shrink-0 shadow-md cursor-pointer group focus:outline-none"
          >
            <span>Claim Your Conversion Strategy</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
}
