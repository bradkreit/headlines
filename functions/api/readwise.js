export async function onRequest(context) {
  const { request } = context;
  const CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'x-readwise-token, Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
  };
  if (request.method === 'OPTIONS')
    return new Response(null, { status: 200, headers: CORS });

  const token = request.headers.get('x-readwise-token');
  if (!token)
    return new Response(JSON.stringify({ error: 'Missing token' }), { status: 401, headers: CORS });

  const url = new URL(request.url);
  const endpoint = url.searchParams.get('endpoint');
  if (!endpoint || !['highlights','books'].includes(endpoint))
    return new Response(JSON.stringify({ error: 'Invalid endpoint' }), { status: 400, headers: CORS });

  const page = url.searchParams.get('page') || '1';
  const rwUrl = `https://readwise.io/api/v2/${endpoint}/?page_size=1000&page=${page}`;

  try {
    const resp = await fetch(rwUrl, {
      headers: { 'Authorization': `Token ${token}`, 'Accept': 'application/json' }
    });
    const body = await resp.text();
    return new Response(body, { status: resp.status, headers: CORS });
  } catch(e) {
    return new Response(JSON.stringify({ error: 'Proxy error: ' + e.message }), { status: 502, headers: CORS });
  }
}
