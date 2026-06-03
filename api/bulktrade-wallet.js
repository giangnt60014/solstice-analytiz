// Edge runtime proxy for early.bulk.trade (no CORS headers upstream)
export const config = { runtime: 'edge' };

export default async function handler(req) {
  const url = new URL(req.url);
  const address = url.searchParams.get('address') || '';

  if (!address || !/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address)) {
    return new Response(JSON.stringify({ error: 'Invalid address' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }

  try {
    const upstream = await fetch(
      `https://early.bulk.trade/api/aura/v1/aura/wallet/${address}`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );
    const body = await upstream.text();
    return new Response(body, {
      status: upstream.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-store',
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 502,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
}
