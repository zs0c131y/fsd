const express = require("express");
const router = express.Router();
const portfolioData = require("../data/portfolioData");

// Get complete portfolio data
router.get("/", (req, res) => {
  res.json({
    success: true,
    data: portfolioData,
    timestamp: new Date().toISOString(),
  });
});

// Get portfolio summary
router.get("/summary", (req, res) => {
  const summary = {
    user: portfolioData.user,
    portfolioSummary: portfolioData.portfolioSummary,
    lastUpdated: new Date().toISOString(),
  };

  res.json({
    success: true,
    data: summary,
    timestamp: new Date().toISOString(),
  });
});

// Get all holdings
router.get("/holdings", (req, res) => {
  const { sortBy, order, limit } = req.query;
  let holdings = [...portfolioData.holdings];

  // Sort holdings
  if (sortBy) {
    holdings.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];

      if (typeof aVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (order === "desc") {
        return bVal > aVal ? 1 : -1;
      } else {
        return aVal > bVal ? 1 : -1;
      }
    });
  }

  // Limit results if specified
  if (limit) {
    holdings = holdings.slice(0, parseInt(limit));
  }

  res.json({
    success: true,
    data: holdings,
    count: holdings.length,
    timestamp: new Date().toISOString(),
  });
});

// Get specific holding by symbol
router.get("/holdings/:symbol", (req, res) => {
  const { symbol } = req.params;
  const holding = portfolioData.holdings.find(
    (h) => h.symbol.toLowerCase() === symbol.toLowerCase()
  );

  if (!holding) {
    return res.status(404).json({
      success: false,
      error: "Holding not found",
      message: `No holding found with symbol: ${symbol}`,
    });
  }

  res.json({
    success: true,
    data: holding,
    timestamp: new Date().toISOString(),
  });
});

// Get sector allocation
router.get("/allocation/sectors", (req, res) => {
  res.json({
    success: true,
    data: portfolioData.sectorAllocation,
    timestamp: new Date().toISOString(),
  });
});

// Get recent transactions
router.get("/transactions", (req, res) => {
  const { type, limit } = req.query;
  let transactions = [...portfolioData.recentTransactions];

  // Filter by transaction type if provided
  if (type) {
    transactions = transactions.filter(
      (t) => t.type.toLowerCase() === type.toLowerCase()
    );
  }

  // Sort by date (newest first)
  transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Limit results if specified
  if (limit) {
    transactions = transactions.slice(0, parseInt(limit));
  }

  res.json({
    success: true,
    data: transactions,
    count: transactions.length,
    timestamp: new Date().toISOString(),
  });
});

// Get performance history
router.get("/performance", (req, res) => {
  const { days } = req.query;
  let performance = [...portfolioData.performanceHistory];

  // Limit to recent days if specified
  if (days) {
    const dayCount = parseInt(days);
    performance = performance.slice(-dayCount);
  }

  res.json({
    success: true,
    data: performance,
    count: performance.length,
    timestamp: new Date().toISOString(),
  });
});

// Get portfolio analytics
router.get("/analytics", (req, res) => {
  const holdings = portfolioData.holdings;
  const analytics = {
    totalHoldings: holdings.length,
    topPerformer: holdings.reduce((prev, curr) =>
      prev.returnsPercent > curr.returnsPercent ? prev : curr
    ),
    worstPerformer: holdings.reduce((prev, curr) =>
      prev.returnsPercent < curr.returnsPercent ? prev : curr
    ),
    averageReturns:
      holdings.reduce((sum, h) => sum + h.returnsPercent, 0) / holdings.length,
    totalInvested: holdings.reduce((sum, h) => sum + h.investedValue, 0),
    totalCurrentValue: holdings.reduce((sum, h) => sum + h.currentValue, 0),
    totalReturns: holdings.reduce((sum, h) => sum + h.returns, 0),
    diversificationScore: portfolioData.sectorAllocation.length,
    riskProfile: portfolioData.user.riskProfile,
    lastUpdated: new Date().toISOString(),
  };

  res.json({
    success: true,
    data: analytics,
    timestamp: new Date().toISOString(),
  });
});

// Add new transaction (POST)
router.post("/transactions", (req, res) => {
  const { type, symbol, quantity, price } = req.body;

  if (!type || !symbol || !quantity || !price) {
    return res.status(400).json({
      success: false,
      error: "Missing required fields",
      message: "Type, symbol, quantity, and price are required",
    });
  }

  const newTransaction = {
    id: portfolioData.recentTransactions.length + 1,
    type: type.toUpperCase(),
    symbol: symbol.toUpperCase(),
    quantity: parseInt(quantity),
    price: parseFloat(price),
    amount: parseInt(quantity) * parseFloat(price),
    date: new Date().toISOString(),
    status: "Pending",
  };

  portfolioData.recentTransactions.unshift(newTransaction);

  res.status(201).json({
    success: true,
    data: newTransaction,
    message: "Transaction added successfully",
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
