import React from "react";
import { Clock, ExternalLink } from "lucide-react";

const NewsCard = ({ article }) => {
  // Destructure article props
  const { title, summary, publishedAt, source } = article;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const getSourceColor = (source) => {
    const colors = {
      Reuters: "text-orange-600 bg-orange-50",
      Bloomberg: "text-blue-600 bg-blue-50",
      "Financial Times": "text-pink-600 bg-pink-50",
      "Wall Street Journal": "text-gray-600 bg-gray-50",
    };
    return colors[source] || "text-gray-600 bg-gray-50";
  };

  return (
    <div className="card hover:shadow-lg transition-all duration-200 cursor-pointer group">
      <div className="flex items-start justify-between mb-3">
        <div
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSourceColor(
            source
          )}`}
        >
          {source}
        </div>
        <div className="flex items-center text-xs text-gray-500">
          <Clock className="h-3 w-3 mr-1" />
          {formatDate(publishedAt)}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {title}
        </h3>

        <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
          {summary}
        </p>

        <div className="pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium inline-flex items-center group-hover:underline">
              Read more
              <ExternalLink className="h-3 w-3 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
