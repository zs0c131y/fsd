import React from "react";
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";

const MarketSummary = ({ data }) => {
  // Destructure market data
  const { sensex, nifty, banknifty, niftyit } = data;

  const formatValue = (value) => {
    return new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatChange = (change) => {
    const formatted = formatValue(Math.abs(change));
    return change >= 0 ? `+${formatted}` : `-${formatted}`;
  };

  const getChangePercent = (value, change) => {
    const percent = (change / (value - change)) * 100;
    return percent >= 0 ? `+${percent.toFixed(2)}%` : `${percent.toFixed(2)}%`;
  };

  const MarketIndex = ({ name, value, change, icon: Icon }) => {
    const isPositive = change >= 0;
    const changeClass = isPositive
      ? "text-success-600 bg-success-50"
      : "text-danger-600 bg-danger-50";

    const TrendIcon = isPositive ? TrendingUp : TrendingDown;

    return (
      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Icon className="h-5 w-5 text-primary-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          </div>
          <TrendIcon
            className={`h-5 w-5 ${
              isPositive ? "text-success-600" : "text-danger-600"
            }`}
          />
        </div>

        <div className="space-y-2">
          <div className="text-2xl font-bold text-gray-900">
            {formatValue(value)}
          </div>
          <div
            className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${changeClass}`}
          >
            {formatChange(change)} ({getChangePercent(value, change)})
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MarketIndex
        name="BSE Sensex"
        value={sensex.value}
        change={sensex.change}
        icon={BarChart3}
      />
      <MarketIndex
        name="Nifty 50"
        value={nifty.value}
        change={nifty.change}
        icon={TrendingUp}
      />
      <MarketIndex
        name="Bank Nifty"
        value={banknifty.value}
        change={banknifty.change}
        icon={BarChart3}
      />
      <MarketIndex
        name="Nifty IT"
        value={niftyit.value}
        change={niftyit.change}
        icon={TrendingUp}
      />
    </div>
  );
};

export default MarketSummary;
