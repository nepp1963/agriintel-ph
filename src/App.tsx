import React, { useState } from 'react';
import IrrigationDashboard from './1-irrigation/components/IrrigationDashboard';
import { Layers, Droplets, CloudSun, Map, Cpu, Bell, Search } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'irrigation' | 'gis' | 'weather' | 'overview'>('irrigation');

  return (
    <div className="min-h-screen bg-[#071310] text-slate-100 flex flex-col font-sans">
      {/* Top Application Header */}
      <header className="flex flex-col md:flex-row justify-between items-center px-6 py-3 bg-[#0b1d19] border-b border-[#1b3d33] gap-4">
        {/* Branding & Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-[#071310] flex-shrink-0 shadow-sm border border-[#1b3d33]">
            <img 
              src="/AgriIntelPH_4.png" 
              alt="AgriIntelPH Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-[#34d399] font-bold text-base leading-tight tracking-wide">
              AgriIntelPH
            </h1>
            <p className="text-[11px] text-slate-400 font-medium">
              AI-Driven Digital Agriculture & Natural Resource Intelligence
            </p>
          </div>
        </div>

        {/* Global Search & System Status */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-end">
          <div className="relative hidden lg:block">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input 
              type="text" 
              placeholder="Search telemetry, canals, sensors..." 
              className="bg-[#071310] border border-[#1b3d33] rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 w-64"
            />
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#071310] border border-[#1b3d33] rounded-xl text-xs text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>ENSO Grid Online</span>
          </div>
        </div>
      </header>

      {/* Navigation Tabs Bar */}
      <nav className="bg-[#0b1d19]/80 backdrop-blur border-b border-[#1b3d33] px-6 flex gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'overview'
              ? 'border-emerald-500 text-emerald-400 bg-[#102d26]/40'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-[#102d26]/20'
          }`}
        >
          <Cpu className="w-4 h-4" />
          Core Overview
        </button>

        <button
          onClick={() => setActiveTab('irrigation')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'irrigation'
              ? 'border-emerald-500 text-emerald-400 bg-[#102d26]/40'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-[#102d26]/20'
          }`}
        >
          <Droplets className="w-4 h-4" />
          Irrigation Grid (SPIS)
        </button>

        <button
          onClick={() => setActiveTab('gis')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'gis'
              ? 'border-emerald-500 text-emerald-400 bg-[#102d26]/40'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-[#102d26]/20'
          }`}
        >
          GIS & Satellite Mapping
        </button>

        <button
          onClick={() => setActiveTab('weather')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'weather'
              ? 'border-emerald-500 text-emerald-400 bg-[#102d26]/40'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-[#102d26]/20'
          }`}
        >
          <CloudSun className="w-4 h-4" />
          Weather & PAGASA/PHIVOLCS
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-6">
        {activeTab === 'irrigation' && <IrrigationDashboard />}

        {activeTab === 'overview' && (
          <div className="p-8 bg-[#0b1d19] border border-[#1b3d33] rounded-2xl">
            <h2 className="text-lg font-bold text-white mb-2">AgriIntelPH Core Engine Dashboard</h2>
            <p className="text-xs text-slate-300 mb-4">Welcome back, Administrator. All monitoring arrays, AI telemetry pipelines, and regional nodes are online.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 bg-[#071310] border border-[#1b3d33] rounded-xl">
                <h3 className="text-xs font-bold text-emerald-400 uppercase">Active Modules</h3>
                <p className="text-2xl font-bold text-white mt-1">12 Systems</p>
              </div>
              <div className="p-4 bg-[#071310] border border-[#1b3d33] rounded-xl">
                <h3 className="text-xs font-bold text-cyan-400 uppercase">ENSO Mitigation Status</h3>
                <p className="text-2xl font-bold text-white mt-1">Stage 2 Active</p>
              </div>
              <div className="p-4 bg-[#071310] border border-[#1b3d33] rounded-xl">
                <h3 className="text-xs font-bold text-amber-400 uppercase">Data Sync Frequency</h3>
                <p className="text-2xl font-bold text-white mt-1">Real-time (WebSocket)</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'gis' && (
          <div className="p-8 bg-[#0b1d19] border border-[#1b3d33] rounded-2xl text-center py-16">
            <h2 className="text-lg font-bold text-white">GIS & Satellite Mapping Module</h2>
            <p className="text-xs text-slate-400 mt-1">Interactive full-width satellite layers and spatial intelligence are loading...</p>
          </div>
        )}

        {activeTab === 'weather' && (
          <div className="p-8 bg-[#0b1d19] border border-[#1b3d33] rounded-2xl text-center py-16">
            <CloudSun className="w-12 h-12 text-cyan-400 mx-auto mb-3 opacity-80" />
            <h2 className="text-lg font-bold text-white">Weather & Meteorological Feed</h2>
            <p className="text-xs text-slate-400 mt-1">PAGASA telemetry and El Niño advisory streams are active...</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
