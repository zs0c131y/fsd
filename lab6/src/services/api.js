import axios from "axios";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com", // Mock API endpoint
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for loading states
api.interceptors.request.use(
  (config) => {
    console.log("Making request to:", config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Error:", error.message);
    return Promise.reject(error);
  }
);

// Mock financial data generators
const generateRandomPrice = (base, volatility = 0.1) => {
  const change = (Math.random() - 0.5) * 2 * volatility;
  return base * (1 + change);
};

const generateStockData = () => {
  const stocks = [
    { symbol: "RELIANCE", name: "Reliance Industries Ltd.", basePrice: 2450 },
    { symbol: "TCS", name: "Tata Consultancy Services", basePrice: 3680 },
    { symbol: "INFY", name: "Infosys Limited", basePrice: 1580 },
    { symbol: "HDFC", name: "HDFC Bank Ltd.", basePrice: 1650 },
    { symbol: "ICICIBANK", name: "ICICI Bank Ltd.", basePrice: 950 },
    { symbol: "BHARTIARTL", name: "Bharti Airtel Ltd.", basePrice: 850 },
    { symbol: "ITC", name: "ITC Ltd.", basePrice: 420 },
    { symbol: "SBIN", name: "State Bank of India", basePrice: 580 },
    { symbol: "LT", name: "Larsen & Toubro Ltd.", basePrice: 2890 },
    { symbol: "HCLTECH", name: "HCL Technologies Ltd.", basePrice: 1350 },
  ];

  return stocks.map((stock) => {
    const currentPrice = generateRandomPrice(stock.basePrice);
    const previousPrice = generateRandomPrice(stock.basePrice, 0.05);
    const change = currentPrice - previousPrice;
    const changePercent = (change / previousPrice) * 100;

    return {
      id: stock.symbol,
      symbol: stock.symbol,
      name: stock.name,
      price: currentPrice.toFixed(2),
      change: change.toFixed(2),
      changePercent: changePercent.toFixed(2),
      volume: Math.floor(Math.random() * 10000000),
    };
  });
};

const generatePortfolioData = () => {
  return [
    {
      id: 1,
      name: "Growth Portfolio",
      value: 1250000, // ₹12.5 Lakhs
      change: 85000, // ₹85,000
      changePercent: 7.29,
      allocation: [
        { type: "Equity", percentage: 70, value: 875000 },
        { type: "Debt", percentage: 20, value: 250000 },
        { type: "Cash", percentage: 10, value: 125000 },
      ],
    },
    {
      id: 2,
      name: "Conservative Portfolio",
      value: 750000, // ₹7.5 Lakhs
      change: 12000, // ₹12,000
      changePercent: 1.63,
      allocation: [
        { type: "Equity", percentage: 40, value: 300000 },
        { type: "Debt", percentage: 50, value: 375000 },
        { type: "Cash", percentage: 10, value: 75000 },
      ],
    },
    {
      id: 3,
      name: "SIP Portfolio",
      value: 450000, // ₹4.5 Lakhs
      change: 22000, // ₹22,000
      changePercent: 5.14,
      allocation: [
        { type: "Equity", percentage: 80, value: 360000 },
        { type: "Debt", percentage: 15, value: 67500 },
        { type: "Cash", percentage: 5, value: 22500 },
      ],
    },
  ];
};

const generateNewsData = () => {
  const headlines = [
    "RBI Announces New Monetary Policy Rates",
    "Sensex Rallies After Strong Q4 Results from IT Giants",
    "Nifty 50 Crosses 20,000 Mark Amid FII Inflows",
    "Indian Rupee Strengthens Against Dollar",
    "Reliance Industries Reports Record Quarterly Profits",
    "Banking Stocks Surge on Credit Growth Expectations",
    "Government Announces New Infrastructure Investment Plans",
    "Tata Group Stocks Rally After Electric Vehicle Announcement",
    "Digital India Initiative Boosts Tech Stock Performance",
    "Monsoon Forecast Positive for Agricultural Sector",
  ];

  return headlines.map((headline, index) => ({
    id: index + 1,
    title: headline,
    summary:
      "Latest developments in Indian financial markets with detailed analysis of market trends and economic indicators affecting the Indian economy.",
    publishedAt: new Date(
      Date.now() - Math.random() * 24 * 60 * 60 * 1000
    ).toISOString(),
    source: [
      "Economic Times",
      "Business Standard",
      "Moneycontrol",
      "LiveMint",
      "Financial Express",
    ][Math.floor(Math.random() * 5)],
  }));
};

// API service functions
export const financeAPI = {
  // Simulate API delay
  delay: (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms)),

  // Mock stock data
  getStocks: async () => {
    await financeAPI.delay(800);
    return {
      data: generateStockData(),
    };
  },

  // Mock portfolio data
  getPortfolios: async () => {
    await financeAPI.delay(600);
    return {
      data: generatePortfolioData(),
    };
  },

  // Mock news data using JSONPlaceholder for posts structure
  getNews: async () => {
    try {
      await financeAPI.delay(400);
      // We'll generate mock financial news instead of using placeholder posts
      return {
        data: generateNewsData(),
      };
    } catch (error) {
      throw new Error("Failed to fetch financial news");
    }
  },

  // Mock market summary
  getMarketSummary: async () => {
    await financeAPI.delay(500);
    return {
      data: {
        sensex: {
          name: "BSE Sensex",
          value: 65000 + Math.random() * 2000,
          change: (Math.random() - 0.5) * 500,
        },
        nifty: {
          name: "Nifty 50",
          value: 19500 + Math.random() * 800,
          change: (Math.random() - 0.5) * 150,
        },
        banknifty: {
          name: "Bank Nifty",
          value: 45000 + Math.random() * 1500,
          change: (Math.random() - 0.5) * 300,
        },
        niftyit: {
          name: "Nifty IT",
          value: 32000 + Math.random() * 1000,
          change: (Math.random() - 0.5) * 200,
        },
      },
    };
  },
};

export default api;
