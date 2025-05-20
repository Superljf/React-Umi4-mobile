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
  title: '快乐学习天天向上',
  targets: {
    chrome: 80,
    ios: 12,
    android: 8,
  },
  favicons: ['/favicon.ico'],
  fastRefresh: true,
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
  // define: {
  //   'process.env.API_URL': process.env.NODE_ENV === 'production'
  //     ? 'https://op-rls.entstudy.com'  // 生产环境接口地址
  //     : '',  // 开发环境用代理，所以这里留空
  // },

  headScripts: [
    ` (function(root) {
    window.zhad = [];
    var tag = document.createElement('script'); tag.type ='text/javascript'; tag.async = true;
    tag.src = '//unpkg.zhimg.com/@efe/zhad-tracker@1.4.1';
    tag.onerror = function () {
      var img = new Image();
      img.src = '//sugar.zhihu.com/log_fe?js_url=' + window.encodeURIComponent(tag.src) + '&t=' + (+ new Date());
    }
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(tag, s);
    })(window);`
  ],
  publicPath: '/',
  //静态资源
  // scripts: [``],
  // styles: [`body { color: red; }`, `https://a.com/b.css`],

  // https: {
  //   key: './server.key',
  //   cert: './server.crt',
  // },
});
// ip访问地址
// http://10.10.9.101:8002
