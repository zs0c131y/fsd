import React, { useState, useEffect } from "react";
import { financeAPI } from "../services/api";
import NewsCard from "../components/NewsCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { Search, Filter, Newspaper, Clock } from "lucide-react";

const News = () => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSource, setSelectedSource] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await financeAPI.getNews();
      setNews(response.data);
      setFilteredNews(response.data);
    } catch (error) {
      console.error("Error fetching news:", error);
      setError("Failed to load financial news. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Filter news based on search term and source
  useEffect(() => {
    let filtered = news;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.summary.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by source
    if (selectedSource !== "all") {
      filtered = filtered.filter(
        (article) => article.source === selectedSource
      );
    }

    setFilteredNews(filtered);
  }, [news, searchTerm, selectedSource]);

  const sources = ["all", ...new Set(news.map((article) => article.source))];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getRecentNews = () => {
    return filteredNews
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .slice(0, 3);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Financial News
        </h1>
        <p className="text-gray-600">
          Stay updated with the latest financial market news and analysis
        </p>
      </div>

      {loading ? (
        <LoadingSpinner message="Loading financial news..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={fetchNews} />
      ) : (
        <>
          {/* News Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card text-center">
              <Newspaper className="h-8 w-8 text-primary-600 mx-auto mb-2" />
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                Total Articles
              </h3>
              <p className="text-2xl font-bold text-gray-900">
                {filteredNews.length}
              </p>
            </div>

            <div className="card text-center">
              <Filter className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                Sources
              </h3>
              <p className="text-2xl font-bold text-gray-900">
                {sources.length - 1}
              </p>
            </div>

            <div className="card text-center">
              <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                Latest Update
              </h3>
              <p className="text-sm font-bold text-gray-900">
                {news.length > 0 &&
                  formatDate(
                    Math.max(
                      ...news.map((article) => new Date(article.publishedAt))
                    )
                  )}
              </p>
            </div>
          </div>

          {/* Breaking News Section */}
          {getRecentNews().length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Breaking News
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {getRecentNews().map((article) => (
                  <div key={article.id} className="relative">
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        BREAKING
                      </span>
                    </div>
                    <NewsCard article={article} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search news articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {sources.map((source) => (
                  <option key={source} value={source}>
                    {source === "all" ? "All Sources" : source}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={fetchNews}
              className="btn-secondary"
              disabled={loading}
            >
              {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          {/* All News Articles */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                All News
                {(searchTerm || selectedSource !== "all") && (
                  <span className="text-lg font-normal text-gray-600 ml-2">
                    ({filteredNews.length} articles)
                  </span>
                )}
              </h2>
            </div>

            {filteredNews.length === 0 ? (
              <div className="text-center py-12">
                <Newspaper className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No articles found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search criteria or filters
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNews.map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </div>
            )}
          </section>

          {/* Market Analysis Section */}
          <section className="mt-12">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Market Analysis
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Key Trends</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>
                      • Tech stocks showing resilience amid market volatility
                    </li>
                    <li>
                      • Energy sector benefiting from geopolitical developments
                    </li>
                    <li>
                      • Federal Reserve policy decisions impacting bond markets
                    </li>
                    <li>• Cryptocurrency market showing mixed signals</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Upcoming Events
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• FOMC Meeting - Next Week</li>
                    <li>• Quarterly Earnings Season - Ongoing</li>
                    <li>• Consumer Price Index Release - Friday</li>
                    <li>• Employment Data - Next Friday</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default News;
