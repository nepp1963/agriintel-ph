/**
 * Philippine Provincial Boundary Index & GeoJSON Data Feed
 */

export interface ProvinceBoundaryMeta {
  code: string;
  name: string;
  region: string;
  islandGroup: 'Luzon' | 'Visayas' | 'Mindanao';
  geoJsonPath: string;
}

export const PHILIPPINES_PROVINCES: ProvinceBoundaryMeta[] = [
  { code: "PH-PAG", name: "Pampanga", region: "Region III", islandGroup: "Luzon", geoJsonPath: "/geo/pampanga.geojson" },
  { code: "PH-BUL", name: "Bulacan", region: "Region III", islandGroup: "Luzon", geoJsonPath: "/geo/bulacan.geojson" },
  { code: "PH-ALB", name: "Albay", region: "Region V", islandGroup: "Luzon", geoJsonPath: "/geo/albay.geojson" },
  { code: "PH-ILO", name: "Iloilo", region: "Region VI", islandGroup: "Visayas", geoJsonPath: "/geo/iloilo.geojson" },
  { code: "PH-DAV", name: "Davao del Sur", region: "Region XI", islandGroup: "Mindanao", geoJsonPath: "/geo/davao_del_sur.geojson" }
];
