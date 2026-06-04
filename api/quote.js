const https = require('https');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { symbols } = req.query;
  if (!symbols) return res.status(400).json({ error: 'symbols required' });

  const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols}&fields=regularMarketPrice,regularMarketChange,regularMarketChangePercent,regularMarketVolume,regularMarketOpen,regularMarketDayHigh,regularMarketDayLow,fiftyTwoWeekHigh,fiftyTwoWeekLow,marketCap,trailingPE,epsTrailingTwelveMonths,shortName,longName,regularMarketPreviousClose`;

  try {
    const data = await new Promise((resolve, reject) => {
      const req2 = https.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'application/json',
          'Accept-Language': 'zh-TW,zh;q=0.9'
        }
      }, (r) => {
        let body = '';
        r.on('data', chunk => body += chunk);
        r.on('end', () => {
          try { resolve(JSON.parse(body)); }
          catch(e) { reject(new Error('parse error')); }
        });
      });
      req2.on('error', reject);
      req2.setTimeout(8000, () => reject(new Error('timeout')));
    });
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
