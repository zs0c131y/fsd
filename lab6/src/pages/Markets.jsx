import React, { useState, useEffect } from "react";
import { financeAPI } from "../services/api";
import StockCard from "../components/StockCard";
import MarketSummary from "../components/MarketSummary";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { Search, Filter, TrendingUp } from "lucide-react";

const Markets = () => {
  const [stocks, setStocks] = useState([]);
  const [marketSummary, setMarketSummary] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("symbol");
  const [loading, setLoading] = useState({
    stocks: true,
    market: true,
  });
  const [errors, setErrors] = useState({
    stocks: null,
    market: null,
  });

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

  useEffect(() => {
    fetchData(financeAPI.getStocks, "stocks", setStocks);
    fetchData(financeAPI.getMarketSummary, "market", setMarketSummary);
  }, []);

  const refreshData = (dataType) => {
    switch (dataType) {
      case "stocks":
        fetchData(financeAPI.getStocks, "stocks", setStocks);
        break;
      case "market":
        fetchData(financeAPI.getMarketSummary, "market", setMarketSummary);
        break;
      default:
        break;
    }
  };

  // Filter and sort stocks
  const filteredStocks = stocks
    .filter(
      (stock) =>
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "symbol":
          return a.symbol.localeCompare(b.symbol);
        case "price":
          return parseFloat(b.price) - parseFloat(a.price);
        case "change":
          return parseFloat(b.changePercent) - parseFloat(a.changePercent);
        case "volume":
          return b.volume - a.volume;
        default:
          return 0;
      }
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Markets</h1>
        <p className="text-gray-600">Real-time market data and stock prices</p>
      </div>

      {/* Market Summary */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Market Indices</h2>
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

      {/* Stock Filters and Search */}
      <section className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search stocks by symbol or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="symbol">Sort by Symbol</option>
              <option value="price">Sort by Price</option>
              <option value="change">Sort by Change %</option>
              <option value="volume">Sort by Volume</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Stock Prices
            {searchTerm && (
              <span className="text-lg font-normal text-gray-600 ml-2">
                ({filteredStocks.length} results for "{searchTerm}")
              </span>
            )}
          </h2>
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
          <>
            {filteredStocks.length === 0 ? (
              <div className="text-center py-12">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No stocks found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search criteria
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStocks.map((stock) => (
                  <StockCard key={stock.id} stock={stock} />
                ))}
              </div>
            )}
          </>
        )}
      </section>

      {/* Market Insights */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Market Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Market Hours</h4>
            <p className="text-sm text-gray-600 mb-4">
              Indian Markets: 9:15 AM - 3:30 PM IST (Monday - Friday)
            </p>

            <h4 className="font-medium text-gray-900 mb-2">
              Key Economic Indicators
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Repo Rate: 6.50%</li>
              <li>• CPI Inflation: 5.8%</li>
              <li>• Unemployment Rate: 7.2%</li>
              <li>• GDP Growth: 7.6%</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Trading Tips</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Research companies thoroughly before investing</li>
              <li>
                • Consider rupee-cost averaging for long-term SIP investments
              </li>
              <li>• Stay informed about Indian market news and RBI policies</li>
              <li>• Don't invest more than you can afford to lose</li>
              <li>• Diversify your portfolio across sectors and market caps</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Markets;
