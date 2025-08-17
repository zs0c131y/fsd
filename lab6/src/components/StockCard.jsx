import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const StockCard = ({ stock }) => {
  // Destructure stock props
  const { symbol, name, price, change, changePercent, volume } = stock;

  const isPositive = parseFloat(change) >= 0;
  const changeClass = isPositive
    ? "text-success-600 bg-success-50"
    : "text-danger-600 bg-danger-50";

  const IconComponent = isPositive ? TrendingUp : TrendingDown;

  const formatVolume = (vol) => {
    if (vol >= 1000000) {
      return `${(vol / 1000000).toFixed(1)}M`;
    } else if (vol >= 1000) {
      return `${(vol / 1000).toFixed(1)}K`;
    }
    return vol.toString();
  };

  return (
    <div className="card hover:shadow-lg transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{symbol}</h3>
          <p className="text-sm text-gray-600 truncate">{name}</p>
        </div>
        <IconComponent
          className={`h-5 w-5 ${
            isPositive ? "text-success-600" : "text-danger-600"
          }`}
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-bold text-gray-900">₹{price}</span>
          <div
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${changeClass}`}
          >
            {isPositive ? "+" : ""}₹{change} ({isPositive ? "+" : ""}
            {changePercent}%)
          </div>
        </div>

        <div className="pt-3 border-t border-gray-100">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Volume</span>
            <span className="font-medium text-gray-900">
              {formatVolume(volume)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockCard;
