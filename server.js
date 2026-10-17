/* Serveur statique minimal pour elaminendiaye.com (hébergement Node.js Hostinger).
   Aucune dépendance. Sert les fichiers du dossier courant, gère la page 404,
   la redirection www -> sans www et les en-têtes de cache. */
"use strict";
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const PORT = process.env.PORT || 3000;
const HOST = "elaminendiaye.com";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".pdf": "application/pdf",
};

const BLOCKED = new Set([".htaccess", "server.js", "package.json", "README-DEPLOIEMENT.md", ".gitignore"]);

function send(res, status, filePath, extraHeaders) {
  const ext = path.extname(filePath).toLowerCase();
  const type = MIME[ext] || "application/octet-stream";
  const cache = ext === ".html" ? "public, max-age=3600" : "public, max-age=2592000";
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(500, { "Content-Type": "text/plain" }); return res.end("Erreur serveur"); }
    res.writeHead(status, Object.assign({
      "Content-Type": type,
      "Cache-Control": cache,
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "SAMEORIGIN",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    }, extraHeaders || {}));
    res.end(data);
  });
}

function notFound(res) {
  const p = path.join(ROOT, "404.html");
  if (fs.existsSync(p)) return send(res, 404, p, { "Cache-Control": "no-cache" });
  res.writeHead(404, { "Content-Type": "text/plain" }); res.end("Not found");
}

http.createServer((req, res) => {
  const host = (req.headers.host || "").split(":")[0];
  const proto = req.headers["x-forwarded-proto"] || "http";

  // www -> sans www (HTTPS)
  if (host === "www." + HOST) {
    res.writeHead(301, { Location: "https://" + HOST + req.url }); return res.end();
  }
  // http -> https derrière le proxy Hostinger
  if (proto === "http" && host === HOST) {
    res.writeHead(301, { Location: "https://" + HOST + req.url }); return res.end();
  }

  let urlPath;
  try { urlPath = decodeURIComponent(req.url.split("?")[0]); } catch (e) { return notFound(res); }
  if (urlPath.includes("..") || urlPath.includes("\0")) return notFound(res);
  if (BLOCKED.has(path.basename(urlPath))) return notFound(res);

  let filePath = path.join(ROOT, urlPath);

  // Dossier sans slash final -> redirection vers /dossier/
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    if (!urlPath.endsWith("/")) { res.writeHead(301, { Location: urlPath + "/" }); return res.end(); }
    filePath = path.join(filePath, "index.html");
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) return send(res, 200, filePath);
  return notFound(res);
}).listen(PORT, () => {
  console.log("elaminendiaye.com en ligne sur le port " + PORT);
});
