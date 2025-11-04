import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

function methodGuard(allowed) {
    return (proxy) => {
        proxy.on('proxyReq', (proxyReq, req, res) => {
            if (req.method !== allowed) {
                res.statusCode = 405
                res.end(`Method Not Allowed: expected ${allowed}, got ${req.method}`)
            }
        })
    }
}


export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '@assets': fileURLToPath(new URL('./assets', import.meta.url)),
            '@apps': fileURLToPath(new URL('./src/apps', import.meta.url)),
            '@bases': fileURLToPath(new URL('./src/bases', import.meta.url)),
        },
    },
    server: {
        host: true,
        port: 17501,
        proxy: {
            '/get': {
                target: 'http://172.18.55.215:17500',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/get/, ''),
                configure: methodGuard('GET'),
            },
            '/post': {
                target: 'http://172.18.55.215:17500',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/post/, ''),
                configure: methodGuard('POST'),
            },
            '/put': {
                target: 'http://172.18.55.215:17500',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/put/, ''),
                configure: methodGuard('PUT'),
            },
            '/delete': {
                target: 'http://172.18.55.215:17500',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/delete/, ''),
                configure: methodGuard('DELETE'),
            },
        },
    },
    build: {
        outDir: 'dist'
    },
})
