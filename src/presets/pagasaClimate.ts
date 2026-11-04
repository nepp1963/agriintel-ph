/**
 * PAGASA Climate Presets & Regional Classifications
 */

export interface ClimatePreset {
  regionName: string;
  province: string;
  climateType: 'Type I' | 'Type II' | 'Type III' | 'Type IV';
  elevation: number;        // meters
  latitude: number;         // decimal degrees
  tempMin: number;          // °C (Annual mean min)
  tempMax: number;          // °C (Annual mean max)
  humidity: number;         // %
  windSpeed: number;        // m/s
  solarRad: number;         // MJ/m²/day
  peakSunHours: number;     // hours/day
}

export const PAGASA_CLIMATE_PRESETS: Record<string, ClimatePreset> = {
  CENTRAL_LUZON_TYPE_I: {
    regionName: "Region III (Central Luzon)",
    province: "Pampanga / Bulacan",
    climateType: "Type I",
    elevation: 15,
    latitude: 15.0285,
    tempMin: 24.2,
    tempMax: 33.1,
    humidity: 78,
    windSpeed: 2.1,
    solarRad: 18.5,
    peakSunHours: 5.3
  },
  BICOL_TYPE_II: {
    regionName: "Region V (Bicol Region)",
    province: "Albay / Camarines Sur",
    climateType: "Type II",
    elevation: 25,
    latitude: 13.4158,
    tempMin: 23.8,
    tempMax: 31.5,
    humidity: 84,
    windSpeed: 3.2,
    solarRad: 16.8,
    peakSunHours: 4.8
  },
  WESTERN_VISAYAS_TYPE_III: {
    regionName: "Region VI (Western Visayas)",
    province: "Iloilo / Negros Occidental",
    climateType: "Type III",
    elevation: 10,
    latitude: 10.7202,
    tempMin: 24.5,
    tempMax: 32.8,
    humidity: 80,
    windSpeed: 2.3,
    solarRad: 19.0,
    peakSunHours: 5.5
  },
  DAVAO_TYPE_IV: {
    regionName: "Region XI (Davao Region)",
    province: "Davao del Sur",
    climateType: "Type IV",
    elevation: 30,
    latitude: 7.1907,
    tempMin: 24.0,
    tempMax: 32.2,
    humidity: 82,
    windSpeed: 1.8,
    solarRad: 18.1,
    peakSunHours: 5.2
  }
};
