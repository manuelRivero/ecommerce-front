export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const provincia = searchParams.get("provincia");
  if (!provincia) {
    return new Response(
      JSON.stringify({ error: "Missing required 'provincia' query param" }),
      { status: 400, headers: { "content-type": "application/json" } }
    );
  }

  const campos = searchParams.get("campos") ?? "id,nombre";
  const max = searchParams.get("max") ?? "1000";

  const url = `https://apis.datos.gob.ar/georef/api/v2.0/localidades?provincia=${encodeURIComponent(
    provincia
  )}&campos=${encodeURIComponent(campos)}&max=${encodeURIComponent(max)}&formato=json`;

  const res = await fetch(url, { next: { revalidate: 60 * 60 } });
  if (!res.ok) {
    return new Response(
      JSON.stringify({ error: `Failed to fetch localidades: ${res.status}` }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
  const data = await res.json();
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}


