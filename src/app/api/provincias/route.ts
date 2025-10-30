export async function GET() {
  const url = "https://apis.datos.gob.ar/georef/api/v2.0/provincias?campos=id,nombre&formato=json";
  const res = await fetch(url, { next: { revalidate: 60 * 60 } });
  if (!res.ok) {
    return new Response(JSON.stringify({ error: `Failed to fetch provincias: ${res.status}` }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
  const data = await res.json();
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}


