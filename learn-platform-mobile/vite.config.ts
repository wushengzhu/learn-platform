import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import eslint from 'vite-plugin-eslint';
import WindiCSS from 'vite-plugin-windicss';
import path from 'path';
import postCssPxToViewport from 'postcss-px-to-viewport';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), , WindiCSS()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve('./src'),
      },
    ],
  },
  server: {
    host: '0.0.0.0', // 打开通过IP地址访问的开关
    port: 1398,
    https: false,
    open: true, // 自动打开浏览器
    cors: true, // 允许跨域
    hmr: true,
  },
  css: {
    postcss: {
      plugins: [
        postCssPxToViewport({
          unitToConvert: 'px', // 要转化的单位
          viewportWidth: 390, // UI设计稿的宽度
          unitPrecision: 3, // 转换后的精度，即小数点位数
          propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
          viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
          fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
          selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
          minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
          mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
          replace: true, // 是否转换后直接更换属性值
          // exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
          exclude: [],
          landscape: false, // 是否处理横屏情况
        }),
      ],
    },
  },
});
