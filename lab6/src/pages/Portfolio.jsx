import React, { useState, useEffect } from "react";
import { financeAPI } from "../services/api";
import PortfolioCard from "../components/PortfolioCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { PieChart, TrendingUp, IndianRupee, Target } from "lucide-react";

const Portfolio = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await financeAPI.getPortfolios();
      setPortfolios(response.data);
    } catch (error) {
      console.error("Error fetching portfolios:", error);
      setError("Failed to load portfolio data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const totalValue = portfolios.reduce(
    (sum, portfolio) => sum + portfolio.value,
    0
  );
  const totalChange = portfolios.reduce(
    (sum, portfolio) => sum + portfolio.change,
    0
  );
  const totalChangePercent =
    totalValue > 0 ? (totalChange / (totalValue - totalChange)) * 100 : 0;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Portfolio</h1>
        <p className="text-gray-600">
          Track your investment performance and asset allocation
        </p>
      </div>

      {loading ? (
        <LoadingSpinner message="Loading portfolio data..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={fetchPortfolios} />
      ) : (
        <>
          {/* Portfolio Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card text-center">
              <IndianRupee className="h-8 w-8 text-primary-600 mx-auto mb-2" />
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                Total Value
              </h3>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(totalValue)}
              </p>
            </div>

            <div className="card text-center">
              <TrendingUp className="h-8 w-8 text-success-600 mx-auto mb-2" />
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                Total Gain/Loss
              </h3>
              <p
                className={`text-2xl font-bold ${
                  totalChange >= 0 ? "text-success-600" : "text-danger-600"
                }`}
              >
                {totalChange >= 0 ? "+" : ""}
                {formatCurrency(totalChange)}
              </p>
            </div>

            <div className="card text-center">
              <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                Return %
              </h3>
              <p
                className={`text-2xl font-bold ${
                  totalChangePercent >= 0
                    ? "text-success-600"
                    : "text-danger-600"
                }`}
              >
                {totalChangePercent >= 0 ? "+" : ""}
                {totalChangePercent.toFixed(2)}%
              </p>
            </div>

            <div className="card text-center">
              <PieChart className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                Portfolios
              </h3>
              <p className="text-2xl font-bold text-gray-900">
                {portfolios.length}
              </p>
            </div>
          </div>

          {/* Portfolio Details */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Your Portfolios
              </h2>
              <button
                onClick={fetchPortfolios}
                className="btn-secondary"
                disabled={loading}
              >
                {loading ? "Refreshing..." : "Refresh"}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {portfolios.map((portfolio) => (
                <PortfolioCard key={portfolio.id} portfolio={portfolio} />
              ))}
            </div>
          </div>

          {/* Investment Tips */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Investment Insights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <h4 className="font-medium text-gray-900 mb-1">
                  Diversification
                </h4>
                <p className="text-sm text-gray-600">
                  Spread your investments across different asset classes
                </p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Target className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <h4 className="font-medium text-gray-900 mb-1">
                  Long-term Focus
                </h4>
                <p className="text-sm text-gray-600">
                  Stay committed to your investment strategy
                </p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <PieChart className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <h4 className="font-medium text-gray-900 mb-1">
                  Regular Review
                </h4>
                <p className="text-sm text-gray-600">
                  Monitor and rebalance your portfolio periodically
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Portfolio;
