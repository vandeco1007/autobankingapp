const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = function(app) {
  app.use('/retail-web-internetbankingms/getCaptchaImage', createProxyMiddleware({ target: 'https://online.mbbank.com.vn/', changeOrigin: true }));
};