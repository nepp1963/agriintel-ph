/**
 * Philippine Agricultural Soil Series & NRCS Curve Number Presets
 */

export interface SoilPreset {
  soilSeries: string;
  dominantTexture: string;
  hydrologicGroup: 'A' | 'B' | 'C' | 'D';
  description: string;
  defaultCurveNumbers: {
    rowCropsStraight: number;
    paddyRiceBunded: number;
    orchardsOrForest: number;
    openPasture: number;
  };
}

export const PH_SOIL_PRESETS: Record<string, SoilPreset> = {
  SAN_MANUEL: {
    soilSeries: "San Manuel Series",
    dominantTexture: "Sandy Loam / Loam",
    hydrologicGroup: "B",
    description: "Deep, well-drained alluvial soils common in Central Luzon river floodplains.",
    defaultCurveNumbers: {
      rowCropsStraight: 75,
      paddyRiceBunded: 82,
      orchardsOrForest: 60,
      openPasture: 69
    }
  },
  BUKIDNON: {
    soilSeries: "Bukidnon Clay Loam",
    dominantTexture: "Clay Loam",
    hydrologicGroup: "C",
    description: "Upland volcanic soils widely distributed across plateau and valley regions in Mindanao.",
    defaultCurveNumbers: {
      rowCropsStraight: 83,
      paddyRiceBunded: 88,
      orchardsOrForest: 70,
      openPasture: 79
    }
  },
  GUIMBAL: {
    soilSeries: "Guimbal Clay",
    dominantTexture: "Clay",
    hydrologicGroup: "D",
    description: "Heavy textured lowland soils with slow infiltration rates, typical of Western Visayas plains.",
    defaultCurveNumbers: {
      rowCropsStraight: 88,
      paddyRiceBunded: 92,
      orchardsOrForest: 77,
      openPasture: 84
    }
  }
};
