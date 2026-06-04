const https = require('https');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
  if (!ANTHROPIC_KEY) return res.status(500).json({ error: 'ANTHROPIC_API_KEY not set in environment variables' });

  const body = JSON.stringify(req.body);

  try {
    await new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.anthropic.com',
        path: '/v1/messages',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body),
          'x-api-key': ANTHROPIC_KEY,
          'anthropic-version': '2023-06-01'
        }
      };
      const proxyReq = https.request(options, (proxyRes) => {
        res.setHeader('Content-Type', proxyRes.headers['content-type'] || 'text/event-stream');
        res.status(proxyRes.statusCode);
        proxyRes.pipe(res);
        proxyRes.on('end', resolve);
      });
      proxyReq.on('error', reject);
      proxyReq.write(body);
      proxyReq.end();
    });
  } catch (e) {
    if (!res.headersSent) res.status(500).json({ error: e.message });
  }
};
