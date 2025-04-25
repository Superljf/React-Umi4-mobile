import pxToViewport from 'postcss-px-to-viewport';
import { defineConfig } from 'umi';
import routes from './src/routes';

export default defineConfig({
  routes,
  npmClient: 'pnpm',
  plugins: ['@umijs/plugins/dist/model'],
  mfsu: false,
  hash: true,
  history: {
    type: 'browser',
  },
  targets: {
    ios: 9,
    android: '4.4',
    chrome: 49,
  },
  fastRefresh: true,
  extraPostCSSPlugins: [
    pxToViewport({
      viewportWidth: 375,
      viewportHeight: 667,
      unitPrecision: 5,
      viewportUnit: 'vw',
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false,
      exclude: [/node_modules/],
    }),
  ],
  model: {},
  // 开启 model 配置

  // 更新代理配置
  proxy: {
    '/api': {
      target: 'https://op-rls.entstudy.com',
      changeOrigin: true,
      // pathRewrite: { '^/api': '' }, // 移除这个路径重写，保留/api前缀
    },
    // https://op-rls.entstudy.com/api/open/h5/survey/list

    '/m': {
      target: 'https://op-rls.entstudy.com',
      changeOrigin: true,
    },
  },

  // 设置API地址
  define: {
    'process.env.API_URL': process.env.NODE_ENV === 'production'
      ? 'https://op-rls.entstudy.com'  // 生产环境接口地址
      : '',  // 开发环境用代理，所以这里留空
  },
});
