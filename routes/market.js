const express = require("express");
const router = express.Router();
const marketData = require("../data/marketData");

// Helper function to simulate market fluctuations
const simulateMarketFluctuation = (data) => {
  const fluctuatedData = JSON.parse(JSON.stringify(data)); // Deep clone

  // Update stocks with random fluctuations
  fluctuatedData.stocks = fluctuatedData.stocks.map((stock) => ({
    ...stock,
    price: +(stock.price * (1 + (Math.random() - 0.5) * 0.02)).toFixed(2), // ±1% fluctuation
    change: +((Math.random() - 0.5) * 6).toFixed(2), // -3% to +3% change
    changeAmount: +((Math.random() - 0.5) * 100).toFixed(2),
    volume: Math.floor(stock.volume * (0.8 + Math.random() * 0.4)), // ±20% volume change
  }));

  // Update indices with random fluctuations
  fluctuatedData.indices = fluctuatedData.indices.map((index) => ({
    ...index,
    value: +(index.value * (1 + (Math.random() - 0.5) * 0.015)).toFixed(2), // ±0.75% fluctuation
    change: +((Math.random() - 0.5) * 4).toFixed(2), // -2% to +2% change
    changeAmount: +((Math.random() - 0.5) * 300).toFixed(2),
  }));

  // Update commodities
  fluctuatedData.commodities = fluctuatedData.commodities.map((commodity) => ({
    ...commodity,
    price: +(commodity.price * (1 + (Math.random() - 0.5) * 0.03)).toFixed(2),
    change: +((Math.random() - 0.5) * 8).toFixed(2),
  }));

  // Update currencies
  fluctuatedData.currencies = fluctuatedData.currencies.map((currency) => ({
    ...currency,
    rate: +(currency.rate * (1 + (Math.random() - 0.5) * 0.01)).toFixed(2),
    change: +((Math.random() - 0.5) * 2).toFixed(2),
  }));

  return fluctuatedData;
};

// Get all market data
router.get("/", (req, res) => {
  const data = simulateMarketFluctuation(marketData);
  res.json({
    success: true,
    data: data,
    timestamp: new Date().toISOString(),
  });
});

// Get stocks data
router.get("/stocks", (req, res) => {
  const { symbol, limit } = req.query;
  const data = simulateMarketFluctuation(marketData);
  let stocks = data.stocks;

  // Filter by symbol if provided
  if (symbol) {
    stocks = stocks.filter((stock) =>
      stock.symbol.toLowerCase().includes(symbol.toLowerCase())
    );
  }

  // Limit results if specified
  if (limit) {
    stocks = stocks.slice(0, parseInt(limit));
  }

  res.json({
    success: true,
    data: stocks,
    count: stocks.length,
    timestamp: new Date().toISOString(),
  });
});

// Get specific stock by symbol
router.get("/stocks/:symbol", (req, res) => {
  const { symbol } = req.params;
  const data = simulateMarketFluctuation(marketData);
  const stock = data.stocks.find(
    (s) => s.symbol.toLowerCase() === symbol.toLowerCase()
  );

  if (!stock) {
    return res.status(404).json({
      success: false,
      error: "Stock not found",
      message: `No stock found with symbol: ${symbol}`,
    });
  }

  res.json({
    success: true,
    data: stock,
    timestamp: new Date().toISOString(),
  });
});

// Get indices data
router.get("/indices", (req, res) => {
  const data = simulateMarketFluctuation(marketData);
  res.json({
    success: true,
    data: data.indices,
    timestamp: new Date().toISOString(),
  });
});

// Get commodities data
router.get("/commodities", (req, res) => {
  const data = simulateMarketFluctuation(marketData);
  res.json({
    success: true,
    data: data.commodities,
    timestamp: new Date().toISOString(),
  });
});

// Get currencies data
router.get("/currencies", (req, res) => {
  const data = simulateMarketFluctuation(marketData);
  res.json({
    success: true,
    data: data.currencies,
    timestamp: new Date().toISOString(),
  });
});

// Get market summary
router.get("/summary", (req, res) => {
  const data = simulateMarketFluctuation(marketData);
  const summary = {
    totalStocks: data.stocks.length,
    gainers: data.stocks.filter((s) => s.change > 0).length,
    losers: data.stocks.filter((s) => s.change < 0).length,
    unchanged: data.stocks.filter((s) => s.change === 0).length,
    topGainer: data.stocks.reduce((prev, curr) =>
      prev.change > curr.change ? prev : curr
    ),
    topLoser: data.stocks.reduce((prev, curr) =>
      prev.change < curr.change ? prev : curr
    ),
    indices: data.indices,
    lastUpdated: new Date().toISOString(),
  };

  res.json({
    success: true,
    data: summary,
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
