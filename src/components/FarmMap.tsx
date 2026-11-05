/**
 * Interactive Farm Boundary & Regional Map Component
 */

import React from 'react';
import { MapContainer, TileLayer, Polygon, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface FarmMapProps {
  center?: [number, number];
  zoom?: number;
}

export const FarmMap: React.FC<FarmMapProps> = ({ 
  center = [15.0285, 120.6817], // Default: Central Luzon / Pampanga
  zoom = 11 
}) => {
  // Sample farm polygon coordinates
  const sampleFarmCoords: [number, number][] = [
    [15.0350, 120.6750],
    [15.0350, 120.6900],
    [15.0200, 120.6900],
    [15.0200, 120.6750]
  ];

  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg border border-slate-700">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={false}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors & PAGASA GIS'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polygon positions={sampleFarmCoords} pathOptions={{ color: '#16a34a', fillColor: '#22c55e', fillOpacity: 0.4 }}>
          <Popup>
            <div className="text-sm font-sans">
              <strong>Sample Agricultural Zone</strong><br />
              Soil: San Manuel Loam (Group B)<br />
              Area: 14.5 Hectares
            </div>
          </Popup>
        </Polygon>
      </MapContainer>
    </div>
  );
};
