import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  // server: {
  //   // host: '0.0.0.0', // 打开通过IP地址访问的开关
  //   // port: 3333,
  //   // open: true, // 自动打开浏览器
  //   cors: true, // 打开跨域
  //   hmr: {
  //     overlay: false,
  //   },
  //   // proxy: {
  //   //   '/api': {
  //   //     target: 'http://127.0.0.1:2023',
  //   //     // 开启websocket服务，默认true
  //   //     ws: true,
  //   //     changeOrigin: true,
  //   //     // 用于修改路径配置,把api路径名去掉
  //   //     rewrite: (path) => path.replace(/^\/api/, ''),
  //   //   },
  //   //   // '': {
  //   //   //   target: 'http://127.0.0.1:3000',
  //   //   //   // 开启websocket服务，默认true
  //   //   //   ws: true,
  //   //   //   changeOrigin: true,
  //   //   //   // 用于修改路径配置,把api路径名去掉
  //   //   //   // rewrite: (path) => path.replace(/^\/api/, ''),
  //   //   // },
  //   // },
  // },
});
