export function logProxyMessage (proxyReq, req) {
  const host = proxyReq.getHeader('host');
  console.log(`[Gateway] Proxying: ${proxyReq.method} ${req.originalUrl} -> ${proxyReq.protocol}//${host}${proxyReq.path}`)
}
