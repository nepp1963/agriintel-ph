/**
 * AgriIntel-PH Regional Simulation CLI Test Script
 */

import { PAGASA_CLIMATE_PRESETS } from './presets/pagasaClimate';
import { PH_SOIL_PRESETS } from './presets/phSoils';

// Import core calculation logic (assuming agriintel-core is linked or imported)
// For standalone testing within agriintel-ph, we reproduce/import the formulas:
function calculateETo(data: { tempMin: number; tempMax: number; humidity: number; windSpeed: number; solarRad: number; elevation: number }) {
  const { tempMin, tempMax, humidity, windSpeed, solarRad, elevation } = data;
  const T = (tempMax + tempMin) / 2;
  const P = 101.3 * Math.pow((293 - 0.0065 * elevation) / 293, 5.26);
  const gamma = 0.665 * Math.pow(10, -3) * P;
  const esMin = 0.6108 * Math.exp((17.27 * tempMin) / (tempMin + 237.3));
  const esMax = 0.6108 * Math.exp((17.27 * tempMax) / (tempMax + 237.3));
  const es = (esMax + esMin) / 2;
  const ea = es * (humidity / 100);
  const vpd = es - ea;
  const delta = (4098 * (0.6108 * Math.exp((17.27 * T) / (T + 237.3)))) / Math.pow(T + 237.3, 2);
  const term1 = 0.408 * delta * solarRad;
  const term2 = gamma * (900 / (T + 273)) * windSpeed * vpd;
  const denominator = delta + gamma * (1 + 0.34 * windSpeed);
  return Math.max(0, (term1 + term2) / denominator);
}

function calculateRunoff(rainfallMm: number, curveNumber: number): number {
  const S = (25400 / curveNumber) - 254;
  const initialAbstraction = 0.2 * S;
  if (rainfallMm <= initialAbstraction) return 0;
  const numerator = Math.pow(rainfallMm - initialAbstraction, 2);
  const denominator = rainfallMm - initialAbstraction + S;
  return numerator / denominator;
}

console.log('====================================================');
console.log('    AGRIINTEL-PH REGIONAL COMPUTATIONAL SIMULATION   ');
console.log('====================================================\n');

// 1. Simulate ETo across PAGASA Climate Presets
console.log('[1] Evaluating PAGASA Climate Presets (Reference ETo):');
Object.entries(PAGASA_CLIMATE_PRESETS).forEach(([key, preset]) => {
  const eTo = calculateETo({
    tempMin: preset.tempMin,
    tempMax: preset.tempMax,
    humidity: preset.humidity,
    windSpeed: preset.windSpeed,
    solarRad: preset.solarRad,
    elevation: preset.elevation
  });
  console.log(`    - ${preset.regionName} (${preset.climateType}):`);
    console.log(`      Elevation: ${preset.elevation}m | Mean Temp: ${((preset.tempMax + preset.tempMin)/2).toFixed(1)}°C`);
    console.log(`      Calculated Reference ETo: ${eTo.toFixed(2)} mm/day\n`);
});

// 2. Simulate Runoff across Philippine Soil Series (e.g., Heavy Storm Event: 120mm)
const stormRainfallMm = 120.0;
console.log(`[2] Evaluating NRCS Runoff for a Heavy Storm Event (${stormRainfallMm} mm rainfall):`);
Object.entries(PH_SOIL_PRESETS).forEach(([key, soil]) => {
  const cnRowCrops = soil.defaultCurveNumbers.rowCropsStraight;
  const runoffRowCrops = calculateRunoff(stormRainfallMm, cnRowCrops);

  const cnPaddy = soil.defaultCurveNumbers.paddyRiceBunded;
  const runoffPaddy = calculateRunoff(stormRainfallMm, cnPaddy);

  console.log(`    - ${soil.soilSeries} (Group ${soil.hydrologicGroup} - ${soil.dominantTexture}):`);
    console.log(`      Row Crops (CN: ${cnRowCrops}) -> Direct Runoff: ${runoffRowCrops.toFixed(2)} mm`);
    console.log(`      Bunded Paddy Rice (CN: ${cnPaddy}) -> Direct Runoff: ${runoffPaddy.toFixed(2)} mm\n`);
});

console.log('====================================================');
console.log('       AGRIINTEL-PH SIMULATION COMPLETED OK        ');
console.log('====================================================');
