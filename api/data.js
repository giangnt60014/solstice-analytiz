// Proxy: s2.solstice.hanyon.app/api/data (no CORS headers upstream)
const TARGET = 'https://s2.solstice.hanyon.app/api/data';
module.exports = async (req, res) => {
  try {
    const r = await fetch(TARGET);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    res.status(r.status).end(await r.text());
  } catch (e) {
    res.status(502).json({ error: e.message });
  }
};
