module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375, // 设计稿宽度
      viewportHeight: 667, // 设计稿高度
      unitPrecision: 5, // 转换后的精度
      viewportUnit: 'vw', // 转换成的视窗单位
      selectorBlackList: [], // 不转换的类名
      minPixelValue: 1, // 小于或等于1px不转换为视窗单位
      mediaQuery: false, // 是否在媒体查询中转换px
      exclude: [/node_modules/] // 忽略某些文件夹下的文件
    }
  }
}