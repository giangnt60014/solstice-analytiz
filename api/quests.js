// Proxy: app.solstice.finance/api/flares/quests (no CORS headers upstream)
const TARGET = 'https://app.solstice.finance/api/flares/quests';
module.exports = async (req, res) => {
  try {
    const r = await fetch(TARGET, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    res.status(r.status).end(await r.text());
  } catch (e) {
    res.status(502).json({ error: e.message });
  }
};
