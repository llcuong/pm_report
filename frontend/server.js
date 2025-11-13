import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createProxyMiddleware } from "http-proxy-middleware";
import history from "connect-history-api-fallback";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 17501;
const BACKEND_URL = "http://172.18.55.215:17500";

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

// Log nhẹ
app.use((req, res, next) => {
    console.log(`[incoming] ${req.method} ${req.originalUrl}`);
    next();
});

// ================================
// 1) PROXY CHO /api/*
// ================================
app.use(
    "/api",
    createProxyMiddleware({
        target: BACKEND_URL,
        changeOrigin: true,
        secure: false,
        logLevel: "silent",
        xfwd: true,
        pathRewrite: { "^/api": "" }, // FE /api/xxx → backend /xxx
        onProxyRes(proxyRes, req) {
            console.log(`[← backend] ${proxyRes.statusCode} ${req.originalUrl}`);
        },
    })
);

// ================================
// 2) PROXY CHO /users/*
// ================================
app.use(
    "/users",
    createProxyMiddleware({
        target: BACKEND_URL,
        changeOrigin: true,
        secure: false,
        logLevel: "silent",
        xfwd: true,
        pathRewrite: { "^/users": "/users" }, // giữ nguyên /users
        onProxyRes(proxyRes, req) {
            console.log(`[← backend] ${proxyRes.statusCode} ${req.originalUrl}`);
        },
    })
);

// SPA history fallback
app.use(
    history({
        htmlAcceptHeaders: ["text/html", "application/xhtml+xml"],
        disableDotRule: false,
    })
);

// Serve dist
const distPath = path.join(__dirname, "dist");
app.use(
    express.static(distPath, {
        maxAge: "1d",
        etag: true,
        index: "index.html",
    })
);

// Fallback
app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
    console.log("=====================================");
    console.log(`FE listening on:  http://0.0.0.0:${PORT}`);
    console.log(`Proxy backend:    ${BACKEND_URL}`);
    console.log("Proxy allowed:    /api/*  &  /users/*");
    console.log("=====================================");
});
