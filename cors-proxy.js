const http = require('http');
const https = require('https');
const url = require('url');

const server = http.createServer((req, res) => {
  const query = url.parse(req.url, true).query;
  const targetUrl = query.url;

  if (!targetUrl) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('No target URL specified');
    return;
  }

  const proxyReq = https.request(targetUrl, (proxyRes) => {
    let body = '';
    proxyRes.on('data', (chunk) => {
      body += chunk;
    });
    proxyRes.on('end', () => {
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      });
      res.end(body);
    });
  });

  proxyReq.on('error', (err) => {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end(err.toString());
  });

  proxyReq.end();
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`CORS Proxy running on port ${PORT}`);
});
