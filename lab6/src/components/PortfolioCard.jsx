import React from "react";
import { TrendingUp, TrendingDown, PieChart } from "lucide-react";

const PortfolioCard = ({ portfolio }) => {
  // Destructure portfolio props
  const { name, value, change, changePercent, allocation } = portfolio;

  const isPositive = parseFloat(change) >= 0;
  const changeClass = isPositive
    ? "text-success-600 bg-success-50"
    : "text-danger-600 bg-danger-50";

  const IconComponent = isPositive ? TrendingUp : TrendingDown;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getColorForType = (type) => {
    const colors = {
      Equity: "bg-blue-500",
      Debt: "bg-green-500",
      Cash: "bg-yellow-500",
    };
    return colors[type] || "bg-gray-500";
  };

  return (
    <div className="card hover:shadow-lg transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <div className="flex items-center mt-1">
            <PieChart className="h-4 w-4 text-gray-500 mr-1" />
            <span className="text-sm text-gray-600">Portfolio</span>
          </div>
        </div>
        <IconComponent
          className={`h-5 w-5 ${
            isPositive ? "text-success-600" : "text-danger-600"
          }`}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-bold text-gray-900">
            {formatCurrency(value)}
          </span>
          <div
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${changeClass}`}
          >
            {isPositive ? "+" : ""}
            {formatCurrency(change)} ({isPositive ? "+" : ""}
            {changePercent}%)
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Asset Allocation
          </h4>

          {/* Allocation Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
            <div className="flex h-2 rounded-full overflow-hidden">
              {allocation.map((asset, index) => (
                <div
                  key={asset.type}
                  className={`${getColorForType(asset.type)} ${
                    index === 0 ? "rounded-l-full" : ""
                  } ${index === allocation.length - 1 ? "rounded-r-full" : ""}`}
                  style={{ width: `${asset.percentage}%` }}
                />
              ))}
            </div>
          </div>

          {/* Allocation Details */}
          <div className="space-y-2">
            {allocation.map((asset) => (
              <div
                key={asset.type}
                className="flex justify-between items-center text-sm"
              >
                <div className="flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full ${getColorForType(
                      asset.type
                    )} mr-2`}
                  />
                  <span className="text-gray-600">{asset.type}</span>
                </div>
                <div className="text-right">
                  <span className="font-medium text-gray-900">
                    {asset.percentage}%
                  </span>
                  <span className="text-gray-500 ml-2">
                    {formatCurrency(asset.value)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
