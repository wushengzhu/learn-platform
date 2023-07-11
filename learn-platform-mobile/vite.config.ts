import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import eslint from 'vite-plugin-eslint';
import WindiCSS from 'vite-plugin-windicss';
import path from 'path';

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
});
