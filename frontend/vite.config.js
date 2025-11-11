import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

// function methodGuard(allowed) {
//   return (proxy) => {
//     proxy.on('proxyReq', (proxyReq, req, res) => {
//       if (req.method !== allowed) {
//         res.statusCode = 405
//         res.end(`Method Not Allowed: expected ${allowed}, got ${req.method}`)
//       }
//     });
//   };
// };

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@configs': path.resolve(__dirname, 'src/configs'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@modules': path.resolve(__dirname, 'src/modules'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
  server: {
    host: true,
    port: 17501,
    // proxy: {
    //   '/get': {
    //     target: 'http://172.18.55.215:17500',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/get/, ''),
    //     configure: methodGuard('GET'),
    //   },
    //   '/post': {
    //     target: 'http://172.18.55.215:17500',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/post/, ''),
    //     configure: methodGuard('POST'),
    //   },
    //   '/put': {
    //     target: 'http://172.18.55.215:17500',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/put/, ''),
    //     configure: methodGuard('PUT'),
    //   },
    //   '/delete': {
    //     target: 'http://172.18.55.215:17500',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/delete/, ''),
    //     configure: methodGuard('DELETE'),
    //   },
    // },
  },
  build: {
    outDir: 'dist'
  },
});