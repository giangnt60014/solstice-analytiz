// Proxy: app.solstice.finance/api/flares/analytics (no CORS headers upstream)
const TARGET = 'https://app.solstice.finance/api/flares/analytics';
module.exports = async (req, res) => {
  try {
    const r = await fetch(TARGET, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-store');
    res.status(r.status).end(await r.text());
  } catch (e) {
    res.status(502).json({ error: e.message });
  }
};
