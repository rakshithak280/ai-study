import React, { useState } from 'react';
import { ENGINEERING_CONSTANTS } from '../data/engineeringData';
import { Calculator, ArrowRightLeft, BookMarked, Scale } from 'lucide-react';

export const ToolboxView: React.FC = () => {
  const [conversionType, setConversionType] = useState<'pressure' | 'power' | 'torque' | 'energy'>('pressure');
  const [inputValue, setInputValue] = useState<number>(100);
  const [inputUnit, setInputUnit] = useState<string>('kPa');

  // Conversions database
  const getConversions = () => {
    if (conversionType === 'pressure') {
      // Base: Pascals (Pa)
      let basePa = inputValue;
      if (inputUnit === 'kPa') basePa = inputValue * 1e3;
      else if (inputUnit === 'MPa') basePa = inputValue * 1e6;
      else if (inputUnit === 'bar') basePa = inputValue * 1e5;
      else if (inputUnit === 'psi') basePa = inputValue * 6894.76;
      else if (inputUnit === 'atm') basePa = inputValue * 101325;

      return [
        { label: 'Pascals (Pa)', val: basePa, formula: 'SI Base' },
        { label: 'Kilopascals (kPa)', val: basePa / 1e3, formula: 'Pa / 1000' },
        { label: 'Megapascals (MPa)', val: basePa / 1e6, formula: 'Pa / 10⁶ (N/mm²)' },
        { label: 'Bar', val: basePa / 1e5, formula: '10⁵ Pa' },
        { label: 'Pounds / sq inch (PSI)', val: basePa / 6894.76, formula: 'Imperial' },
        { label: 'Standard Atmospheres (atm)', val: basePa / 101325, formula: '101.325 kPa' }
      ];
    } else if (conversionType === 'power') {
      // Base: Watts (W)
      let baseW = inputValue;
      if (inputUnit === 'kW') baseW = inputValue * 1e3;
      else if (inputUnit === 'MW') baseW = inputValue * 1e6;
      else if (inputUnit === 'hp') baseW = inputValue * 745.7; // Mechanical horsepower
      else if (inputUnit === 'btu_hr') baseW = inputValue * 0.293071;

      return [
        { label: 'Watts (W)', val: baseW, formula: 'J/s' },
        { label: 'Kilowatts (kW)', val: baseW / 1e3, formula: 'W / 1000' },
        { label: 'Horsepower (Mechanical hp)', val: baseW / 745.7, formula: '1 hp = 745.7 W' },
        { label: 'BTU / hour', val: baseW / 0.293071, formula: 'HVAC Thermal' },
        { label: 'Foot-pounds / second', val: baseW * 0.737562, formula: 'Imperial rate' }
      ];
    } else if (conversionType === 'torque') {
      // Base: Newton-meters (Nm)
      let baseNm = inputValue;
      if (inputUnit === 'ft_lb') baseNm = inputValue * 1.35582;
      else if (inputUnit === 'in_lb') baseNm = inputValue * 0.112985;
      else if (inputUnit === 'kgf_m') baseNm = inputValue * 9.80665;

      return [
        { label: 'Newton-meters (N·m)', val: baseNm, formula: 'SI Base' },
        { label: 'Foot-pounds (ft·lb)', val: baseNm / 1.35582, formula: 'Imperial Torque' },
        { label: 'Inch-pounds (in·lb)', val: baseNm / 0.112985, formula: 'Fastener Spec' },
        { label: 'Kilogram-force meters (kgf·m)', val: baseNm / 9.80665, formula: 'Gravimetric' }
      ];
    } else {
      // Energy: Base Joules (J)
      let baseJ = inputValue;
      if (inputUnit === 'kJ') baseJ = inputValue * 1e3;
      else if (inputUnit === 'kWh') baseJ = inputValue * 3.6e6;
      else if (inputUnit === 'btu') baseJ = inputValue * 1055.06;
      else if (inputUnit === 'cal') baseJ = inputValue * 4.184;
      else if (inputUnit === 'eV') baseJ = inputValue * 1.602e-19;

      return [
        { label: 'Joules (J)', val: baseJ, formula: 'N·m (SI Base)' },
        { label: 'Kilojoules (kJ)', val: baseJ / 1e3, formula: 'J / 1000' },
        { label: 'Kilowatt-hours (kWh)', val: baseJ / 3.6e6, formula: 'Battery / Grid' },
        { label: 'British Thermal Units (BTU)', val: baseJ / 1055.06, formula: 'HVAC standard' },
        { label: 'Calories (cal)', val: baseJ / 4.184, formula: 'Thermochemical' },
        { label: 'Electron-volts (eV)', val: baseJ / 1.60218e-19, formula: 'Semiconductor bandgap' }
      ];
    }
  };

  const results = getConversions();

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs text-cyan-400 mb-2 font-mono">
            <span>Universal Engineering Toolkit</span>
            <span aria-hidden="true">·</span>
            <span>Cross-Discipline Units & Constants</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif-title font-semibold text-slate-100">
            Constants, Dimensional Invariants & Unit Conversion
          </h2>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Eliminate cross-branch conversion mistakes (the Mars Climate Orbiter metric mismatch catastrophe!). Accurate unit tracking and SI dimensional analysis are non-negotiable across every discipline.
          </p>
        </div>
      </div>

      {/* Unit Converter Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h3 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5 text-cyan-400" />
            <span>Multi-Domain Engineering Unit Converter</span>
          </h3>

          {/* Type Selector */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-lg text-xs">
            {(['pressure', 'power', 'torque', 'energy'] as const).map((type) => (
              <button
                key={type}
                onClick={() => {
                  setConversionType(type);
                  setInputUnit(type === 'pressure' ? 'kPa' : type === 'power' ? 'kW' : type === 'torque' ? 'Nm' : 'kWh');
                }}
                className={`px-3 py-1.5 rounded font-medium capitalize transition-colors ${
                  conversionType === type
                    ? 'bg-cyan-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Input Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Magnitude Value
            </label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Input Unit
            </label>
            <select
              value={inputUnit}
              onChange={(e) => setInputUnit(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              {conversionType === 'pressure' && (
                <>
                  <option value="Pa">Pascals (Pa)</option>
                  <option value="kPa">Kilopascals (kPa)</option>
                  <option value="MPa">Megapascals (MPa)</option>
                  <option value="bar">Bar</option>
                  <option value="psi">PSI (lb/in²)</option>
                  <option value="atm">Atmospheres (atm)</option>
                </>
              )}
              {conversionType === 'power' && (
                <>
                  <option value="W">Watts (W)</option>
                  <option value="kW">Kilowatts (kW)</option>
                  <option value="hp">Horsepower (hp)</option>
                  <option value="btu_hr">BTU / hour</option>
                </>
              )}
              {conversionType === 'torque' && (
                <>
                  <option value="Nm">Newton-meters (N·m)</option>
                  <option value="ft_lb">Foot-pounds (ft·lb)</option>
                  <option value="in_lb">Inch-pounds (in·lb)</option>
                  <option value="kgf_m">kgf·m</option>
                </>
              )}
              {conversionType === 'energy' && (
                <>
                  <option value="J">Joules (J)</option>
                  <option value="kJ">Kilojoules (kJ)</option>
                  <option value="kWh">Kilowatt-hours (kWh)</option>
                  <option value="btu">BTU</option>
                  <option value="cal">Calories (cal)</option>
                  <option value="eV">Electron-volts (eV)</option>
                </>
              )}
            </select>
          </div>
        </div>

        {/* Live Converted Equivalents Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {results.map((res, i) => (
            <div
              key={i}
              className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl flex flex-col justify-between"
            >
              <div>
                <span className="text-xs text-slate-400 block">{res.label}</span>
                <span className="text-lg font-mono font-bold text-slate-100 tabular-nums mt-1 block">
                  {Math.abs(res.val) < 0.0001 || Math.abs(res.val) > 1e7
                    ? res.val.toExponential(4)
                    : res.val.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                </span>
              </div>
              <span className="text-[11px] font-mono text-cyan-500/80 mt-2 block">
                {res.formula}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Engineering Constants Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
          <BookMarked className="w-5 h-5 text-cyan-400" />
          <span>Universal Physical & Mathematical Constants</span>
        </h3>

        <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950/50">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-semibold">
                <th className="py-3 px-4">Symbol</th>
                <th className="py-3 px-4">Constant Name</th>
                <th className="py-3 px-4">Standard Value</th>
                <th className="py-3 px-4">SI Units</th>
                <th className="py-3 px-4">Domain Significance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {ENGINEERING_CONSTANTS.map((c, i) => (
                <tr key={i} className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-cyan-300">{c.symbol}</td>
                  <td className="py-3 px-4 font-sans font-medium text-slate-200">{c.name}</td>
                  <td className="py-3 px-4 font-bold text-amber-300 tabular-nums">{c.value}</td>
                  <td className="py-3 px-4 text-slate-400">{c.unit}</td>
                  <td className="py-3 px-4 font-sans text-slate-300">{c.significance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
