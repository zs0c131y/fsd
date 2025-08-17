import React, { useState, useEffect } from "react";
import { financeAPI } from "../services/api";
import ServicesSection from "../components/ServicesSection";
import StockCard from "../components/StockCard";
import PortfolioCard from "../components/PortfolioCard";
import NewsCard from "../components/NewsCard";
import MarketSummary from "../components/MarketSummary";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

const Dashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [news, setNews] = useState([]);
  const [marketSummary, setMarketSummary] = useState(null);
  const [loading, setLoading] = useState({
    stocks: true,
    portfolios: true,
    news: true,
    market: true,
  });
  const [errors, setErrors] = useState({
    stocks: null,
    portfolios: null,
    news: null,
    market: null,
  });

  // Generic fetch function with error handling
  const fetchData = async (apiCall, dataType, setter) => {
    try {
      setLoading((prev) => ({ ...prev, [dataType]: true }));
      setErrors((prev) => ({ ...prev, [dataType]: null }));

      const response = await apiCall();
      setter(response.data);
    } catch (error) {
      console.error(`Error fetching ${dataType}:`, error);
      setErrors((prev) => ({
        ...prev,
        [dataType]: `Failed to load ${dataType}. Please try again.`,
      }));
    } finally {
      setLoading((prev) => ({ ...prev, [dataType]: false }));
    }
  };

  // Fetch all data on component mount
  useEffect(() => {
    fetchData(financeAPI.getStocks, "stocks", setStocks);
    fetchData(financeAPI.getPortfolios, "portfolios", setPortfolios);
    fetchData(financeAPI.getNews, "news", setNews);
    fetchData(financeAPI.getMarketSummary, "market", setMarketSummary);
  }, []);

  // Refresh specific data section
  const refreshData = (dataType) => {
    switch (dataType) {
      case "stocks":
        fetchData(financeAPI.getStocks, "stocks", setStocks);
        break;
      case "portfolios":
        fetchData(financeAPI.getPortfolios, "portfolios", setPortfolios);
        break;
      case "news":
        fetchData(financeAPI.getNews, "news", setNews);
        break;
      case "market":
        fetchData(financeAPI.getMarketSummary, "market", setMarketSummary);
        break;
      default:
        break;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Services Section */}
      <ServicesSection />

      {/* Market Summary */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Market Overview</h2>
          <button
            onClick={() => refreshData("market")}
            className="btn-secondary"
            disabled={loading.market}
          >
            {loading.market ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {loading.market ? (
          <LoadingSpinner message="Loading market data..." />
        ) : errors.market ? (
          <ErrorMessage
            message={errors.market}
            onRetry={() => refreshData("market")}
          />
        ) : (
          marketSummary && <MarketSummary data={marketSummary} />
        )}
      </section>

      {/* Recent Stocks */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Top Stocks</h2>
          <button
            onClick={() => refreshData("stocks")}
            className="btn-secondary"
            disabled={loading.stocks}
          >
            {loading.stocks ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {loading.stocks ? (
          <LoadingSpinner message="Loading stock data..." />
        ) : errors.stocks ? (
          <ErrorMessage
            message={errors.stocks}
            onRetry={() => refreshData("stocks")}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stocks.slice(0, 3).map((stock) => (
              <StockCard key={stock.id} stock={stock} />
            ))}
          </div>
        )}
      </section>

      {/* Portfolio Overview */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Portfolio Overview
          </h2>
          <button
            onClick={() => refreshData("portfolios")}
            className="btn-secondary"
            disabled={loading.portfolios}
          >
            {loading.portfolios ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {loading.portfolios ? (
          <LoadingSpinner message="Loading portfolio data..." />
        ) : errors.portfolios ? (
          <ErrorMessage
            message={errors.portfolios}
            onRetry={() => refreshData("portfolios")}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {portfolios.map((portfolio) => (
              <PortfolioCard key={portfolio.id} portfolio={portfolio} />
            ))}
          </div>
        )}
      </section>

      {/* Latest News */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Latest News</h2>
          <button
            onClick={() => refreshData("news")}
            className="btn-secondary"
            disabled={loading.news}
          >
            {loading.news ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {loading.news ? (
          <LoadingSpinner message="Loading news..." />
        ) : errors.news ? (
          <ErrorMessage
            message={errors.news}
            onRetry={() => refreshData("news")}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.slice(0, 3).map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
