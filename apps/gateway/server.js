import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { logProxyMessage } from './logger.js';

const app = express();
const PORT = process.env.PORT || 8085;

const config = {
  mainApp: process.env.MAIN_APP_URL || 'http://app:8080',
  temperatureService: process.env.TEMPERATURE_API_URL || 'http://temperature-api:8081'
};

app.get('/health', (req, res) => {
  console.log('health', 'health')
  res.json({ status: 'ok', service: 'gateway' });
});

app.use(
  createProxyMiddleware({
    target: config.mainApp,
    changeOrigin: true,
    prependPath: true,
    pathFilter: '/api/v1/sensors',
    on: {
      proxyReq: logProxyMessage
    }
    
  }),
);

app.use(
  createProxyMiddleware({
    target: config.temperatureService,
    changeOrigin: true,
    pathFilter: '/api/v1/temperature',
    pathRewrite: {
      '^/api/v1/temperature': '/temperature'
    },
    on: {
      proxyReq: logProxyMessage
    }
  }),
);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Gateway running on port ${PORT}`);
});