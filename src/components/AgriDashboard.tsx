/**
 * AgriIntel-PH Real-Time Calculation & Control Dashboard
 */

import React, { useState } from 'react';
import { PAGASA_CLIMATE_PRESETS } from '../presets/pagasaClimate';
import { PH_SOIL_PRESETS } from '../presets/phSoils';
import { FarmMap } from './FarmMap';

export const AgriDashboard: React.FC = () => {
  // Selected Presets state
  const [selectedClimateKey, setSelectedClimateKey] = useState<string>('CENTRAL_LUZON_TYPE_I');
  const [selectedSoilKey, setSelectedSoilKey] = useState<string>('SAN_MANUEL');
  
  // Interactive adjustment state
  const [rainfall, setRainfall] = useState<number>(85.0);
  const [cropKc, setCropKc] = useState<number>(1.15);

  const climate = PAGASA_CLIMATE_PRESETS[selectedClimateKey];
  const soil = PH_SOIL_PRESETS[selectedSoilKey];

  // Calculation logic inline for reactive UI
  const calculateETo = () => {
    const T = (climate.tempMax + climate.tempMin) / 2;
    const P = 101.3 * Math.pow((293 - 0.0065 * climate.elevation) / 293, 5.26);
    const gamma = 0.665 * Math.pow(10, -3) * P;
    const esMin = 0.6108 * Math.exp((17.27 * climate.tempMin) / (climate.tempMin + 237.3));
    const esMax = 0.6108 * Math.exp((17.27 * climate.tempMax) / (climate.tempMax + 237.3));
    const es = (esMax + esMin) / 2;
    const ea = es * (climate.humidity / 100);
    const vpd = es - ea;
    const delta = (4098 * (0.6108 * Math.exp((17.27 * T) / (T + 237.3)))) / Math.pow(T + 237.3, 2);
    const term1 = 0.408 * delta * climate.solarRad;
    const term2 = gamma * (900 / (T + 273)) * climate.windSpeed * vpd;
    const denominator = delta + gamma * (1 + 0.34 * climate.windSpeed);
    return Math.max(0, (term1 + term2) / denominator);
  };

  const calculateRunoff = (cn: number) => {
    const S = (25400 / cn) - 254;
    const initialAbstraction = 0.2 * S;
    if (rainfall <= initialAbstraction) return 0;
    const numerator = Math.pow(rainfall - initialAbstraction, 2);
    const denominator = rainfall - initialAbstraction + S;
    return numerator / denominator;
  };

  const eTo = calculateETo();
  const eTc = eTo * cropKc;
  const cnValue = soil.defaultCurveNumbers.rowCropsStraight;
  const runoffQ = calculateRunoff(cnValue);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 font-sans">
      <header className="max-w-6xl mx-auto mb-8 pb-4 border-b border-slate-800">
        <h1 className="text-3xl font-extrabold tracking-tight text-emerald-400">AgriIntel-PH Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">Spatial Agricultural Intelligence & Computational Engine for the Philippines</p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-1 space-y-6 bg-slate-800/60 p-6 rounded-2xl border border-slate-700 shadow-xl">
          <h2 className="text-lg font-semibold text-emerald-300">Environmental Parameters</h2>

          {/* Climate Preset Dropdown */}
          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">PAGASA Climate Preset</label>
            <select 
              value={selectedClimateKey} 
              onChange={(e) => setSelectedClimateKey(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              {Object.entries(PAGASA_CLIMATE_PRESETS).map(([key, val]) => (
                <option key={key} value={key}>{val.regionName} ({val.climateType})</option>
              ))}
            </select>
          </div>

          {/* Soil Series Dropdown */}
          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Philippine Soil Series</label>
            <select 
              value={selectedSoilKey} 
              onChange={(e) => setSelectedSoilKey(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              {Object.entries(PH_SOIL_PRESETS).map(([key, val]) => (
                <option key={key} value={key}>{val.soilSeries} (Group {val.hydrologicGroup})</option>
              ))}
            </select>
          </div>

          {/* Rainfall Slider */}
          <div>
            <div className="flex justify-between text-xs font-medium text-slate-400 mb-2">
              <span>Storm Rainfall Depth</span>
              <span className="text-emerald-400 font-bold">{rainfall} mm</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="200" 
              step="5"
              value={rainfall} 
              onChange={(e) => setRainfall(parseFloat(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          {/* Crop Kc Slider */}
          <div>
            <div className="flex justify-between text-xs font-medium text-slate-400 mb-2">
              <span>Crop Coefficient ($K_c$)</span>
              <span className="text-emerald-400 font-bold">{cropKc}</span>
            </div>
            <input 
              type="range" 
              min="0.3" 
              max="1.3" 
              step="0.05"
              value={cropKc} 
              onChange={(e) => setCropKc(parseFloat(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Display & Map Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Real-Time Calculation Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700 shadow-lg">
              <div className="text-xs font-medium text-slate-400 uppercase">Reference $ET_o$</div>
              <div className="text-2xl font-bold text-emerald-400 mt-2">{eTo.toFixed(2)} <span className="text-sm font-normal text-slate-400">mm/day</span></div>
            </div>
            <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700 shadow-lg">
              <div className="text-xs font-medium text-slate-400 uppercase">Crop Water ($ET_c$)</div>
              <div className="text-2xl font-bold text-emerald-400 mt-2">{eTc.toFixed(2)} <span className="text-sm font-normal text-slate-400">mm/day</span></div>
            </div>
            <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700 shadow-lg">
              <div className="text-xs font-medium text-slate-400 uppercase">Direct Runoff ($Q$)</div>
              <div className="text-2xl font-bold text-emerald-400 mt-2">{runoffQ.toFixed(2)} <span className="text-sm font-normal text-slate-400">mm</span></div>
            </div>
          </div>

          {/* Interactive Map View */}
          <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700 shadow-xl">
            <h3 className="text-sm font-semibold text-slate-300 mb-3">Spatial Farm Boundary & GIS Layer</h3>
            <FarmMap center={[climate.latitude, 120.6817]} />
          </div>
        </div>
      </main>
    </div>
  );
};
