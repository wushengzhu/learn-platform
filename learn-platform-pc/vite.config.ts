import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'
import WindiCSS from 'vite-plugin-windicss';
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),eslint(),WindiCSS()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve('./src')
      }
    ]
  }
})