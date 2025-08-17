const express = require("express");
const router = express.Router();
const newsData = require("../data/newsData");

// Get all news
router.get("/", (req, res) => {
  const { category, limit, author } = req.query;
  let news = [...newsData];

  // Filter by category if provided
  if (category) {
    news = news.filter((item) =>
      item.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  // Filter by author if provided
  if (author) {
    news = news.filter((item) =>
      item.author.toLowerCase().includes(author.toLowerCase())
    );
  }

  // Sort by publication date (newest first)
  news.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  // Limit results if specified
  if (limit) {
    news = news.slice(0, parseInt(limit));
  }

  res.json({
    success: true,
    data: news,
    count: news.length,
    timestamp: new Date().toISOString(),
  });
});

// Get specific news article by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const article = newsData.find((item) => item.id === parseInt(id));

  if (!article) {
    return res.status(404).json({
      success: false,
      error: "Article not found",
      message: `No article found with id: ${id}`,
    });
  }

  res.json({
    success: true,
    data: article,
    timestamp: new Date().toISOString(),
  });
});

// Get news categories
router.get("/meta/categories", (req, res) => {
  const categories = [...new Set(newsData.map((item) => item.category))];

  res.json({
    success: true,
    data: categories,
    count: categories.length,
    timestamp: new Date().toISOString(),
  });
});

// Get news by category
router.get("/category/:category", (req, res) => {
  const { category } = req.params;
  const { limit } = req.query;

  let news = newsData.filter(
    (item) => item.category.toLowerCase() === category.toLowerCase()
  );

  // Sort by publication date (newest first)
  news.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  // Limit results if specified
  if (limit) {
    news = news.slice(0, parseInt(limit));
  }

  if (news.length === 0) {
    return res.status(404).json({
      success: false,
      error: "Category not found",
      message: `No articles found for category: ${category}`,
    });
  }

  res.json({
    success: true,
    data: news,
    category: category,
    count: news.length,
    timestamp: new Date().toISOString(),
  });
});

// Search news
router.get("/search/:query", (req, res) => {
  const { query } = req.params;
  const { limit } = req.query;

  const searchTerm = query.toLowerCase();
  let results = newsData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm) ||
      item.summary.toLowerCase().includes(searchTerm) ||
      item.content.toLowerCase().includes(searchTerm) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
  );

  // Sort by publication date (newest first)
  results.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  // Limit results if specified
  if (limit) {
    results = results.slice(0, parseInt(limit));
  }

  res.json({
    success: true,
    data: results,
    query: query,
    count: results.length,
    timestamp: new Date().toISOString(),
  });
});

// Get latest news (top 5)
router.get("/feed/latest", (req, res) => {
  const latest = newsData
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, 5);

  res.json({
    success: true,
    data: latest,
    count: latest.length,
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
