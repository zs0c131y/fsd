// FinanceHub REST API using Node's built-in http module
// Endpoints: /api, /api/services with query params

const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

const PORT = 4000;

// Load sample data from file
const services = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data.json"), "utf8")
);

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function sendJSON(res, statusCode, data) {
  const json = JSON.stringify(data);
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(json, "utf8"),
  });
  res.end(json);
}

const server = http.createServer((req, res) => {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname;
  const query = parsed.query;

  if (pathname === "/" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    return res.end("FinanceHub REST API running");
  }

  if (
    (pathname === "/api" || pathname === "/api/services") &&
    req.method === "GET"
  ) {
    let results = services.slice();

    // Filter by title, category, or minRating
    if (query.service) {
      const q = query.service.toLowerCase();
      results = results.filter(
        (s) =>
          s.title.toLowerCase().includes(q) || s.category.toLowerCase() === q
      );
    }

    if (query.category) {
      const q = query.category.toLowerCase();
      results = results.filter((s) => s.category.toLowerCase() === q);
    }

    if (query.minRating) {
      const min = Number(query.minRating);
      if (!Number.isNaN(min)) results = results.filter((s) => s.rating >= min);
    }

    // Pagination
    const page = Math.max(1, Number(query.page) || 1);
    const perPage = Math.max(1, Number(query.perPage) || 20);
    const start = (page - 1) * perPage;
    const paged = results.slice(start, start + perPage);

    const response = {
      total: results.length,
      page,
      perPage,
      data: paged,
    };

    return sendJSON(res, 200, response);
  }

  if (pathname === "/data.json" && req.method === "GET") {
    const p = path.join(__dirname, "data.json");
    if (fs.existsSync(p)) {
      const raw = fs.readFileSync(p, "utf8");
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(raw);
    }
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(PORT, () => {
  console.log(`FinanceHub API listening on http://localhost:${PORT}`);
});
