import { defineConfig } from 'umi';
export default defineConfig({
  title: '阅图·记录',
  history: {
    type: 'hash',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  proxy: {
    '/api/v1': {
      target: 'http://localhost:5000',
      changeOrigin: true,
      pathRewrite: { '^/api/v1': '' },
    },
    '/public': {
      target: 'http://localhost:5000',
      changeOrigin: true,
      pathRewrite: { '^/public': '/public' },
    },
  },
});
