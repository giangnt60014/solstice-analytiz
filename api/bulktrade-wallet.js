// Proxy: early.bulk.trade/api/aura/v1/aura/wallet/{address}
module.exports = async (req, res) => {
  const addr = req.query.address || '';
  if (!addr || !/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(addr)) {
    return res.status(400).json({ error: 'Invalid address' });
  }
  try {
    const upstream = await fetch(
      `https://early.bulk.trade/api/aura/v1/aura/wallet/${addr}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
          'Accept': 'application/json, text/plain, */*',
          'Accept-Language': 'en-US,en;q=0.9',
          'Referer': 'https://early.bulk.trade/',
          'Origin': 'https://early.bulk.trade',
        },
      }
    );
    const body = await upstream.text();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-store');
    res.status(upstream.status).end(body);
  } catch (e) {
    res.status(502).json({ error: e.message });
  }
};
