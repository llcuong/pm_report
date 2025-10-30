import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import {createProxyMiddleware} from 'http-proxy-middleware';
import history from 'connect-history-api-fallback';
import {Buffer} from 'buffer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 17501;
// const BACKEND_URL = process.env.BACKEND_URL || 'http://pm-report-backend:17500';
const BACKEND_URL = 'http://127.0.0.1:17500';

app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
    console.log(`[incoming] ${req.method} ${req.originalUrl}`);
    next();
});

const createMethodProxy = (prefix, stripPrefix) => {
    return createProxyMiddleware({
        target: BACKEND_URL,
        changeOrigin: true,
        logLevel: 'silent',
        secure: false,
        xfwd: true,
        pathRewrite: (path) => {
            const newPath = path.replace(new RegExp(`^${stripPrefix}`), '');
            console.log(`[proxy] ${path} -> ${newPath}`);
            return newPath;
        },
        onProxyReq(proxyReq, req, res) {
            console.log(`[→ backend] ${req.method} ${BACKEND_URL}${proxyReq.path}`);
            if (req.body && Object.keys(req.body).length > 0) {
                const contentType = proxyReq.getHeader('content-type') || req.headers['content-type'] || 'application/json';
                let bodyData;
                if (contentType.includes('application/x-www-form-urlencoded')) {
                    const params = new URLSearchParams();
                    Object.entries(req.body).forEach(([k, v]) => params.append(k, String(v)));
                    bodyData = params.toString();
                    proxyReq.setHeader('content-type', 'application/x-www-form-urlencoded');
                } else {
                    bodyData = JSON.stringify(req.body);
                    proxyReq.setHeader('content-type', 'application/json');
                }
                proxyReq.setHeader('content-length', Buffer.byteLength(bodyData));
                try {
                    proxyReq.write(bodyData);
                } catch (e) {
                    console.error('[proxy write error]', e);
                }
            }
        },
        onProxyRes(proxyRes, req, res) {
            console.log(`[← backend] ${proxyRes.statusCode} ${req.originalUrl}`);
        },
        onError(err, req, res) {
            console.error('[proxy error]', err.message);
            if (!res.headersSent) {
                res.status(502).json({error: 'Bad gateway', detail: err.message});
            }
        },
    });
};

app.use('/get', createMethodProxy('/get', '/get'));
app.use('/post', createMethodProxy('/post', '/post'));
app.use('/put', createMethodProxy('/put', '/put'));
app.use('/delete', createMethodProxy('/delete', '/delete'));
app.use('/update', createMethodProxy('/update', '/update'));

app.use(history({
    htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
    disableDotRule: false,
    verbose: false
}));

const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath, {
    maxAge: '1d',
    etag: true,
    index: 'index.html'
}));

app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log('=====================================');
    console.log(`Listen on: http://0.0.0.0:${PORT}`);
    console.log(`Backend: ${BACKEND_URL}`);
    console.log('=====================================');
});