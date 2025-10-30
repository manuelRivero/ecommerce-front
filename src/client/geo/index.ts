// lib/georef.ts
const GEOREF_BASE_URL = "https://apis.datos.gob.ar/georef/api";
const PROVINCES_API = "/api/provincias";
const LOCALITIES_API = "/api/localidades";

interface Province {
  id: string;
  nombre: string;
}

interface Locality {
  id: string;
  nombre: string;
}

interface GeorefResponse<T> {
  [key: string]: T[] | number | string | any;
  cantidad: number;
  total: number;
  inicio?: number;
  parametros: any;
}

export async function fetchProvinces(): Promise<Province[]> {
  const url = PROVINCES_API;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Error fetching provinces: ${res.status}`);
  }
  const body: GeorefResponse<Province> = await res.json();
  const provincias = (body.provincias as Province[]) || [];
  return provincias.sort((a: Province, b: Province) => a.nombre.localeCompare(b.nombre));
}

export async function fetchLocalities(provinceId: string): Promise<Locality[]> {
  const url = `${LOCALITIES_API}?provincia=${encodeURIComponent(provinceId)}&campos=id,nombre&max=1000`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Error fetching localities: ${res.status}`);
  }
  const body: GeorefResponse<Locality> = await res.json();
  const localidades = (body.localidades as Locality[]) || [];
  return localidades.sort((a: Locality, b: Locality) => a.nombre.localeCompare(b.nombre));
}

