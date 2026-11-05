import React, { useState } from 'react';
import { Droplets, Activity, AlertTriangle, CheckCircle2, RefreshCw, Sliders, Waves, Zap } from 'lucide-react';

interface CanalZone {
  id: string;
  name: string;
  status: 'Optimal' | 'Warning' | 'Critical';
  flowRate: number; // m³/s
  waterLevel: number; // meters
  gateStatus: 'Open (100%)' | 'Partial (60%)' | 'Closed';
}

export const IrrigationModule: React.FC = () => {
  const [zones, setZones] = useState<CanalZone[]>([
    { id: 'Z-01', name: 'Upper Pampanga River Main Canal', status: 'Optimal', flowRate: 45.2, waterLevel: 3.4, gateStatus: 'Open (100%)' },
    { id: 'Z-02', name: 'Angat-Maasim Laterals Sector B', status: 'Optimal', flowRate: 28.5, waterLevel: 2.8, gateStatus: 'Open (100%)' },
    { id: 'Z-03', name: 'Upper Agno Irrigation System', status: 'Warning', flowRate: 12.1, waterLevel: 1.5, gateStatus: 'Partial (60%)' },
    { id: 'Z-04', name: 'Magat High Level Canal', status: 'Optimal', flowRate: 52.0, waterLevel: 4.1, gateStatus: 'Open (100%)' },
    { id: 'Z-05', name: 'Bicol River Basin Sub-System', status: 'Critical', flowRate: 4.2, waterLevel: 0.9, gateStatus: 'Closed' },
  ]);

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 800);
  };

  return (
    <div className="p-6 bg-[#071310] text-slate-100 min-h-screen rounded-2xl border border-[#1b3d33]">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b border-[#1b3d33] gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Droplets className="w-6 h-6 text-[#10b981]" />
            <h1 className="text-xl font-bold tracking-wide text-white">National Irrigation & Water Resource Grid</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time telemetry monitoring for main canals, reservoir release gates, and district distribution networks.
          </p>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-4 py-2 bg-[#0b1d19] hover:bg-[#102d26] border border-[#1b3d33] text-emerald-400 text-xs font-semibold rounded-xl transition-all shadow-sm"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
          Sync Telemetry
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-[#0b1d19] border border-[#1b3d33] rounded-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Active Flow Rate</span>
            <Waves className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white">142.0 <span className="text-xs font-normal text-slate-400">m³/s</span></div>
          <span className="text-[10px] text-emerald-400 font-medium bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-800/40">
            +4.2% vs 24h avg
          </span>
        </div>

        <div className="p-4 bg-[#0b1d19] border border-[#1b3d33] rounded-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Reservoir Capacity</span>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white">78.4%</div>
          <span className="text-[10px] text-cyan-400 font-medium bg-cyan-950/50 px-2 py-0.5 rounded-full border border-cyan-800/40">
            Normal Operating Range
          </span>
        </div>

        <div className="p-4 bg-[#0b1d19] border border-[#1b3d33] rounded-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Monitored Canals</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white">38 Systems</div>
          <span className="text-[10px] text-amber-400 font-medium bg-amber-950/50 px-2 py-0.5 rounded-full border border-amber-800/40">
            3 Requiring Attention
          </span>
        </div>

        <div className="p-4 bg-[#0b1d19] border border-[#1b3d33] rounded-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">ENSO Drought Alert</span>
            <AlertTriangle className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-2xl font-bold text-white">Stage 2</div>
          <span className="text-[10px] text-red-400 font-medium bg-red-950/50 px-2 py-0.5 rounded-full border border-red-800/40">
            Eastern Pacific Advisory Active
          </span>
        </div>
      </div>

      {/* Main Table / Grid */}
      <div className="bg-[#0b1d19] border border-[#1b3d33] rounded-xl overflow-hidden shadow-sm">
        <div className="px-5 py-3 border-b border-[#1b3d33] flex justify-between items-center">
          <h2 className="text-sm font-semibold text-white tracking-wide">Primary Distribution Canals Status</h2>
          <span className="text-xs text-slate-400 font-mono">Live Telemetry Feed</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#1b3d33] bg-[#071310]/50 text-slate-400 text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4 font-semibold">System / Canal Name</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Flow Rate (m³/s)</th>
                <th className="py-3 px-4 font-semibold">Water Level (m)</th>
                <th className="py-3 px-4 font-semibold">Gate Position</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b3d33]/50 text-xs">
              {zones.map((zone) => (
                <tr key={zone.id} className="hover:bg-[#102d26]/40 transition-colors">
                  <td className="py-3 px-4 font-medium text-white flex items-center gap-2">
                    <span className="font-mono text-[10px] bg-[#1b3d33] text-emerald-300 px-1.5 py-0.5 rounded">{zone.id}</span>
                    {zone.name}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      zone.status === 'Optimal' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/50' :
                      zone.status === 'Warning' ? 'bg-amber-950 text-amber-400 border border-amber-800/50' :
                      'bg-red-950 text-red-400 border border-red-800/50'
                    }`}>
                      {zone.status === 'Optimal' && <CheckCircle2 className="w-3 h-3" />}
                      {zone.status === 'Warning' && <AlertTriangle className="w-3 h-3" />}
                      {zone.status === 'Critical' && <AlertTriangle className="w-3 h-3" />}
                      {zone.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-200">{zone.flowRate.toFixed(1)} m³/s</td>
                  <td className="py-3 px-4 font-mono text-slate-200">{zone.waterLevel.toFixed(1)} m</td>
                  <td className="py-3 px-4 text-slate-300">{zone.gateStatus}</td>
                  <td className="py-3 px-4 text-right">
                    <button className="px-3 py-1 bg-[#1b3d33] hover:bg-[#234e42] text-emerald-300 font-medium text-[11px] rounded-lg transition-colors border border-emerald-900/40">
                      Configure
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IrrigationModule;
