// lib/georef.ts
const BASE_URL = "https://apis.datos.gob.ar/georef/api";

interface Province {
  id: string;
  nombre: string;
}

interface Locality {
  id: string;
  nombre: string;
}

interface GeorefResponse<T> {
  [key: string]: T[] | string | any;
  cantidad: string;
  total: string;
  parametros: any;
}

export async function fetchProvinces(): Promise<Province[]> {
  const url = `${BASE_URL}/provincias?campos=id,nombre`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Error fetching provinces: ${res.status}`);
  }
  const body: GeorefResponse<Province> = await res.json();
  return body.provincias.sort((a, b) => a.nombre.localeCompare(b.nombre));
}

export async function fetchLocalities(provinceId: string): Promise<Locality[]> {
  const url = `${BASE_URL}/localidades?provincia=${provinceId}&campos=id,nombre&max=1000`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Error fetching localities: ${res.status}`);
  }
  const body: GeorefResponse<Locality> = await res.json();
  return body.localidades.sort((a, b) => a.nombre.localeCompare(b.nombre));
}

