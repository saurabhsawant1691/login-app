const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080',  // Change this to your API server URL
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',  // Remove the '/api' prefix when forwarding requests
      },
    })
  );
};
