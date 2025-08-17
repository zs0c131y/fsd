const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

// Import routes
const marketRoutes = require("../routes/market");
const newsRoutes = require("../routes/news");
const portfolioRoutes = require("../routes/portfolio");

const app = express();

// Middleware (Helmet without CSP so external Tailwind CDN script works)
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cors());
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, "../public")));

// API Routes - mounted under /api prefix
app.use("/api/market", marketRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/portfolio", portfolioRoutes);

// Root route - serve main HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "FinanceHub API is running",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

// API health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "FinanceHub API is running",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

// 404 handler for API routes
app.use("/api/*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    message: "The requested API endpoint does not exist",
    availableEndpoints: [
      "/api/market",
      "/api/news",
      "/api/portfolio",
      "/api/health",
    ],
  });
});

// Catch-all handler for frontend routes - serve index.html
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message: "Something went wrong on our end",
  });
});

// Export the Express app for Vercel
module.exports = app;

// Start server for local development
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 FinanceHub server is running on port ${PORT}`);
    console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
    console.log(`🌐 Web interface available at http://localhost:${PORT}`);
  });
}
