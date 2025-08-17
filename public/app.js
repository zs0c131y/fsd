// FinanceHub - Professional Financial Dashboard
// Main JavaScript Application

class FinanceHub {
  constructor() {
    this.baseURL = window.location.origin;
    this.currentSection = "dashboard";
    this.portfolioChart = null;
    this.sectorChart = null;
    this.theme = "amoled";
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.loadDashboard();
    this.setupNavigation();
  }

  setupEventListeners() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    mobileMenuBtn?.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
    });

    // Refresh button
    const refreshBtn = document.getElementById("refreshBtn");
    refreshBtn?.addEventListener("click", () => this.refreshData());

    // Navigation links
    const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const section = link.getAttribute("href").substring(1);
        this.showSection(section);

        // Close mobile menu after click
        if (mobileMenu.classList.contains("active")) {
          mobileMenu.classList.remove("active");
        }
      });
    });
  }

  setupNavigation() {
    // Update active nav links
    const updateActiveNav = (activeSection) => {
      const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");
      navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (href === `#${activeSection}`) {
          link.classList.add("text-blue-400");
          link.classList.remove("text-gray-300");
        } else {
          link.classList.remove("text-blue-400");
          link.classList.add("text-gray-300");
        }
      });
    };

    updateActiveNav(this.currentSection);
  }

  showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll(".section-content");
    sections.forEach((section) => section.classList.add("hidden"));

    // Show target section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
      targetSection.classList.remove("hidden");
      this.currentSection = sectionName;
      this.setupNavigation();

      // Load section-specific data
      switch (sectionName) {
        case "dashboard":
          this.loadDashboard();
          break;
        case "portfolio":
          this.loadPortfolio();
          break;
        case "market":
          this.loadMarketData();
          break;
        case "news":
          this.loadNews();
          break;
      }
    }
  }

  showLoading() {
    document.getElementById("loadingModal").classList.remove("hidden");
  }

  hideLoading() {
    document.getElementById("loadingModal").classList.add("hidden");
  }

  async apiCall(endpoint) {
    try {
      const response = await fetch(`${this.baseURL}/api${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`API call failed for ${endpoint}:`, error);
      this.showError(`Failed to load data from ${endpoint}`);
      return null;
    }
  }

  showError(message) {
    // Create a simple error notification
    const errorDiv = document.createElement("div");
    errorDiv.className =
      "fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg z-50";
    errorDiv.innerHTML = `
            <div class="flex items-center space-x-2">
                <i class="fas fa-exclamation-circle"></i>
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" class="ml-2">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
    document.body.appendChild(errorDiv);

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (errorDiv.parentElement) {
        errorDiv.remove();
      }
    }, 5000);
  }

  async loadDashboard() {
    try {
      // Load portfolio summary for dashboard
      const portfolioData = await this.apiCall("/portfolio/summary");
      const marketData = await this.apiCall("/market/indices");

      if (portfolioData?.success) {
        this.updateDashboardStats(portfolioData.data);
      }

      if (marketData?.success) {
        this.updateMarketIndices(marketData.data);
      }

      // Load portfolio chart
      await this.loadPortfolioChart();
    } catch (error) {
      console.error("Dashboard loading error:", error);
    }
  }

  // Added method (previously missing) to update quick index stat
  updateMarketIndices(indices) {
    try {
      if (!Array.isArray(indices)) return;
      const nifty = indices.find((i) =>
        i.name?.toLowerCase().includes("nifty")
      );
      if (nifty) {
        const el = document.getElementById("niftyValue");
        if (el) el.textContent = this.formatCurrency(nifty.value);
      }
    } catch (e) {
      console.warn("updateMarketIndices failed", e);
    }
  }

  updateDashboardStats(data) {
    const portfolioSummary = data.portfolioSummary;

    // Update portfolio value
    const portfolioValue = document.getElementById("portfolioValue");
    if (portfolioValue && portfolioSummary) {
      portfolioValue.textContent = `₹${this.formatCurrency(
        portfolioSummary.totalValue
      )}`;
    }

    // Update total returns
    const totalReturns = document.getElementById("totalReturns");
    if (totalReturns && portfolioSummary) {
      totalReturns.textContent = `₹${this.formatCurrency(
        portfolioSummary.totalReturns
      )}`;
    }
  }

  async loadPortfolioChart() {
    try {
      const performanceData = await this.apiCall("/portfolio/performance");
      const canvas = document.getElementById("portfolioChart");
      if (!canvas) return;
      const parent = canvas.parentElement;
      parent?.querySelectorAll(".empty-state").forEach((n) => n.remove());
      if (
        !performanceData?.success ||
        !Array.isArray(performanceData.data) ||
        !performanceData.data.length
      ) {
        this.injectEmptyState(parent, "No performance data available");
        return;
      }
      requestAnimationFrame(() =>
        this.createPortfolioChart(performanceData.data)
      );
    } catch (error) {
      console.error("Portfolio chart loading error:", error);
      const canvas = document.getElementById("portfolioChart");
      if (canvas)
        this.injectEmptyState(canvas.parentElement, "Failed to render chart");
    }
  }

  createPortfolioChart(data) {
    const ctx = document.getElementById("portfolioChart");
    if (!ctx) return;

    // Destroy existing chart if it exists
    if (this.portfolioChart) {
      this.portfolioChart.destroy();
    }

    const labels = data.map((item) => new Date(item.date).toLocaleDateString());
    const values = data.map((item) => item.value);

    this.portfolioChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Portfolio Value",
            data: values,
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            borderWidth: 2,
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: "#e5e7eb",
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "#9ca3af",
            },
            grid: {
              color: "#374151",
            },
          },
          y: {
            ticks: {
              color: "#9ca3af",
              callback: function (value) {
                return "₹" + (value / 100000).toFixed(1) + "L";
              },
            },
            grid: {
              color: "#374151",
            },
          },
        },
      },
    });
  }

  async loadPortfolio() {
    this.showLoading();

    try {
      const [holdingsData, sectorData] = await Promise.all([
        this.apiCall("/portfolio/holdings"),
        this.apiCall("/portfolio/allocation/sectors"),
      ]);

      if (holdingsData?.success) {
        this.displayHoldings(holdingsData.data);
      }

      if (sectorData?.success) {
        this.createSectorChart(sectorData.data);
      }
    } catch (error) {
      console.error("Portfolio loading error:", error);
    } finally {
      this.hideLoading();
    }
  }

  displayHoldings(holdings) {
    const tableBody = document.getElementById("holdingsTable");
    if (!tableBody) return;

    tableBody.innerHTML = "";

    holdings.forEach((holding) => {
      const row = document.createElement("tr");
      row.className =
        "border-b border-gray-700 hover:bg-gray-700 transition-colors";

      const returnClass =
        holding.returnsPercent >= 0 ? "text-green-400" : "text-red-400";
      const returnSymbol = holding.returnsPercent >= 0 ? "+" : "";

      row.innerHTML = `
                <td class="py-3 px-4 font-medium text-blue-400">${
                  holding.symbol
                }</td>
                <td class="py-3 px-4 text-gray-300">${holding.name}</td>
                <td class="py-3 px-4 text-right text-gray-300">${
                  holding.quantity
                }</td>
                <td class="py-3 px-4 text-right text-gray-300">₹${this.formatCurrency(
                  holding.currentPrice
                )}</td>
                <td class="py-3 px-4 text-right text-gray-100 font-semibold">₹${this.formatCurrency(
                  holding.currentValue
                )}</td>
                <td class="py-3 px-4 text-right ${returnClass} font-semibold">
                    ${returnSymbol}${holding.returnsPercent.toFixed(2)}%
                    <div class="text-sm">${returnSymbol}₹${this.formatCurrency(
        holding.returns
      )}</div>
                </td>
            `;
      tableBody.appendChild(row);
    });
  }

  createSectorChart(data) {
    const ctx = document.getElementById("sectorChart");
    if (!ctx) return;

    // Destroy existing chart if it exists
    if (this.sectorChart) {
      this.sectorChart.destroy();
    }

    const labels = data.map((item) => item.sector);
    const values = data.map((item) => item.percentage);
    const colors = [
      "#3b82f6",
      "#ef4444",
      "#10b981",
      "#f59e0b",
      "#8b5cf6",
      "#06b6d4",
      "#84cc16",
      "#f97316",
    ];

    this.sectorChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [
          {
            data: values,
            backgroundColor: colors,
            borderColor: "#1f2937",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: "#e5e7eb",
              padding: 20,
            },
          },
        },
      },
    });
  }

  async loadMarketData() {
    this.showLoading();

    try {
      const [
        stocksData,
        indicesData,
        commoditiesData,
        currenciesData,
        summaryData,
      ] = await Promise.all([
        this.apiCall("/market/stocks"),
        this.apiCall("/market/indices"),
        this.apiCall("/market/commodities"),
        this.apiCall("/market/currencies"),
        this.apiCall("/market/summary"),
      ]);

      if (summaryData?.success) {
        this.displayMarketSummary(summaryData.data);
      }

      if (stocksData?.success) {
        this.displayStocks(stocksData.data);
      }

      if (indicesData?.success) {
        this.displayIndices(indicesData.data);
      }

      if (commoditiesData?.success) {
        this.displayCommodities(commoditiesData.data);
      }

      if (currenciesData?.success) {
        this.displayCurrencies(currenciesData.data);
      }
    } catch (error) {
      console.error("Market data loading error:", error);
      this.showError("Failed to load market data");
    } finally {
      this.hideLoading();
    }
  }

  displayMarketSummary(summary) {
    // Update summary stats
    const gainersCount = document.getElementById("gainersCount");
    const losersCount = document.getElementById("losersCount");
    const lastUpdated = document.getElementById("lastUpdated");

    if (gainersCount) gainersCount.textContent = summary.gainers;
    if (losersCount) losersCount.textContent = summary.losers;
    if (lastUpdated) {
      const time = new Date(summary.lastUpdated).toLocaleTimeString();
      lastUpdated.textContent = time;
    }
  }

  displayStocks(stocks) {
    const container = document.getElementById("stocksContainer");
    if (!container) return;

    container.innerHTML = "";

    // Limit to top 6 stocks for better layout
    const topStocks = stocks.slice(0, 6);

    topStocks.forEach((stock) => {
      const changeClass = stock.change >= 0 ? "text-green-400" : "text-red-400";
      const changeSymbol = stock.change >= 0 ? "+" : "";
      const arrowIcon = stock.change >= 0 ? "fa-arrow-up" : "fa-arrow-down";
      const bgClass = stock.change >= 0 ? "bg-green-600/10" : "bg-red-600/10";

      const stockCard = document.createElement("div");
      stockCard.className =
        "surface-alt rounded-xl p-4 card-hover border border-gray-800/60 transition-all duration-300";
      stockCard.innerHTML = `
        <div class="flex justify-between items-start mb-3">
          <div class="flex-1">
            <div class="flex items-center space-x-2 mb-1">
              <h4 class="font-bold accent-text text-sm tracking-wide">${
                stock.symbol
              }</h4>
              <span class="px-2 py-1 text-xs rounded-full ${bgClass} ${changeClass} font-medium">
                <i class="fas ${arrowIcon}"></i>
              </span>
            </div>
            <p class="text-subtle text-xs">${stock.name}</p>
          </div>
        </div>
        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <span class="text-gray-300 text-sm">Price</span>
            <span class="font-bold text-lg text-gray-100">₹${this.formatCurrency(
              stock.price
            )}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-300 text-sm">Change</span>
            <span class="${changeClass} text-sm font-medium">
              ${changeSymbol}${stock.change}% (${changeSymbol}₹${Math.abs(
        stock.changeAmount
      )})
            </span>
          </div>
          <div class="flex justify-between items-center text-xs">
            <span class="text-subtle">Vol: ${this.formatVolume(
              stock.volume
            )}</span>
            <span class="text-subtle">P/E: ${stock.pe}</span>
          </div>
        </div>
      `;
      container.appendChild(stockCard);
    });
  }

  displayIndices(indices) {
    const container = document.getElementById("indicesContainer");
    if (!container) return;

    container.innerHTML = "";

    indices.forEach((index) => {
      const changeClass = index.change >= 0 ? "text-green-400" : "text-red-400";
      const changeSymbol = index.change >= 0 ? "+" : "";
      const bgGradient =
        index.change >= 0
          ? "from-green-600/10 to-emerald-600/5"
          : "from-red-600/10 to-rose-600/5";

      const indexCard = document.createElement("div");
      indexCard.className = `surface-alt rounded-xl p-6 card-hover border border-gray-800/60 bg-gradient-to-br ${bgGradient}`;
      indexCard.innerHTML = `
        <div class="flex items-center justify-between mb-4">
          <h4 class="font-bold text-lg accent-text tracking-wide">${
            index.name
          }</h4>
          <div class="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center">
            <i class="fas fa-chart-line text-blue-400 text-sm"></i>
          </div>
        </div>
        <div class="space-y-2">
          <p class="text-3xl font-bold text-gray-100">${this.formatCurrency(
            index.value
          )}</p>
          <div class="flex items-center space-x-2">
            <span class="${changeClass} text-sm font-semibold">
              ${changeSymbol}${index.changeAmount} (${changeSymbol}${
        index.change
      }%)
            </span>
            <div class="flex-1 bg-gray-700 rounded-full h-1.5">
              <div class="h-1.5 rounded-full ${
                index.change >= 0 ? "bg-green-400" : "bg-red-400"
              }" 
                   style="width: ${Math.min(
                     Math.abs(index.change) * 20,
                     100
                   )}%"></div>
            </div>
          </div>
        </div>
      `;
      container.appendChild(indexCard);
    });
  }

  displayCommodities(commodities) {
    const container = document.getElementById("commoditiesContainer");
    if (!container) return;

    container.innerHTML = "";

    commodities.forEach((commodity) => {
      const changeClass =
        commodity.change >= 0 ? "text-green-400" : "text-red-400";
      const changeSymbol = commodity.change >= 0 ? "+" : "";
      const arrowIcon = commodity.change >= 0 ? "fa-arrow-up" : "fa-arrow-down";

      const commodityDiv = document.createElement("div");
      commodityDiv.className =
        "flex justify-between items-center py-3 px-4 bg-gray-800/30 rounded-lg border border-gray-800/60 mb-3 hover:bg-gray-800/50 transition-colors";
      commodityDiv.innerHTML = `
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 rounded-lg bg-amber-600/20 flex items-center justify-center">
            <i class="fas fa-coins text-amber-400 text-sm"></i>
          </div>
          <div>
            <p class="font-medium text-gray-100 text-sm">${commodity.name}</p>
            <p class="text-gray-400 text-xs">${commodity.unit}</p>
          </div>
        </div>
        <div class="text-right">
          <p class="font-semibold text-gray-100 text-sm">₹${this.formatCurrency(
            commodity.price
          )}</p>
          <p class="${changeClass} text-xs flex items-center">
            <i class="fas ${arrowIcon} mr-1"></i>
            ${changeSymbol}${commodity.change}%
          </p>
        </div>
      `;
      container.appendChild(commodityDiv);
    });
  }

  displayCurrencies(currencies) {
    const container = document.getElementById("currenciesContainer");
    if (!container) return;

    container.innerHTML = "";

    currencies.forEach((currency) => {
      const changeClass =
        currency.change >= 0 ? "text-green-400" : "text-red-400";
      const changeSymbol = currency.change >= 0 ? "+" : "";
      const arrowIcon = currency.change >= 0 ? "fa-arrow-up" : "fa-arrow-down";

      const currencyDiv = document.createElement("div");
      currencyDiv.className =
        "flex justify-between items-center py-3 px-4 bg-gray-800/30 rounded-lg border border-gray-800/60 mb-3 hover:bg-gray-800/50 transition-colors";
      currencyDiv.innerHTML = `
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 rounded-lg bg-emerald-600/20 flex items-center justify-center">
            <i class="fas fa-exchange-alt text-emerald-400 text-sm"></i>
          </div>
          <div>
            <p class="font-medium text-gray-100 text-sm">${currency.pair}</p>
          </div>
        </div>
        <div class="text-right">
          <p class="font-semibold text-gray-100 text-sm">₹${currency.rate.toFixed(
            2
          )}</p>
          <p class="${changeClass} text-xs flex items-center">
            <i class="fas ${arrowIcon} mr-1"></i>
            ${changeSymbol}${currency.change.toFixed(2)}
          </p>
        </div>
      `;
      container.appendChild(currencyDiv);
    });
  }

  async loadNews() {
    this.showLoading();

    try {
      const [newsData, categoriesData] = await Promise.all([
        this.apiCall("/news"),
        this.apiCall("/news/meta/categories"),
      ]);

      if (categoriesData?.success) {
        this.displayNewsCategories(categoriesData.data);
      }

      if (newsData?.success) {
        this.displayNews(newsData.data);
      }
    } catch (error) {
      console.error("News loading error:", error);
    } finally {
      this.hideLoading();
    }
  }

  displayNewsCategories(categories) {
    const container = document.getElementById("newsCategories");
    if (!container) return;

    container.innerHTML = "";

    // Add "All" category
    const allBtn = document.createElement("button");
    allBtn.className =
      "px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors";
    allBtn.textContent = "All";
    allBtn.addEventListener("click", () => this.filterNewsByCategory(null));
    container.appendChild(allBtn);

    categories.forEach((category) => {
      const btn = document.createElement("button");
      btn.className =
        "px-4 py-2 bg-gray-700 text-gray-300 rounded-lg text-sm hover:bg-gray-600 transition-colors";
      btn.textContent = category;
      btn.addEventListener("click", () => this.filterNewsByCategory(category));
      container.appendChild(btn);
    });
  }

  async filterNewsByCategory(category) {
    this.showLoading();

    try {
      const endpoint = category ? `/news/category/${category}` : "/news";
      const newsData = await this.apiCall(endpoint);

      if (newsData?.success) {
        this.displayNews(newsData.data);
      }

      // Update button states
      const buttons = document.querySelectorAll("#newsCategories button");
      buttons.forEach((btn) => {
        if (
          (category && btn.textContent === category) ||
          (!category && btn.textContent === "All")
        ) {
          btn.className =
            "px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors";
        } else {
          btn.className =
            "px-4 py-2 bg-gray-700 text-gray-300 rounded-lg text-sm hover:bg-gray-600 transition-colors";
        }
      });
    } catch (error) {
      console.error("News filtering error:", error);
    } finally {
      this.hideLoading();
    }
  }

  displayNews(articles) {
    const container = document.getElementById("newsContainer");
    if (!container) return;

    container.innerHTML = "";

    articles.forEach((article) => {
      const publishedDate = new Date(article.publishedAt).toLocaleDateString();

      const newsCard = document.createElement("div");
      newsCard.className =
        "bg-gray-800 rounded-xl overflow-hidden card-hover border border-gray-700";
      newsCard.innerHTML = `
                <div class="h-48 bg-gray-700 bg-cover bg-center" style="background-image: url('${article.imageUrl}')">
                    <div class="h-full bg-black bg-opacity-40 flex items-end">
                        <div class="p-4">
                            <span class="bg-blue-600 text-white px-2 py-1 rounded text-xs">${article.category}</span>
                        </div>
                    </div>
                </div>
                <div class="p-6">
                    <h3 class="text-lg font-semibold text-gray-100 mb-2 line-clamp-2">${article.title}</h3>
                    <p class="text-gray-400 text-sm mb-4 line-clamp-3">${article.summary}</p>
                    <div class="flex justify-between items-center text-xs text-gray-500">
                        <span>By ${article.author}</span>
                        <span>${publishedDate}</span>
                    </div>
                    <div class="flex justify-between items-center mt-4">
                        <span class="text-gray-400 text-sm">${article.readTime}</span>
                        <button class="text-blue-400 hover:text-blue-300 text-sm font-medium" onclick="app.showNewsDetail(${article.id})">
                            Read More <i class="fas fa-arrow-right ml-1"></i>
                        </button>
                    </div>
                </div>
            `;
      container.appendChild(newsCard);
    });
  }

  async showNewsDetail(articleId) {
    try {
      const articleData = await this.apiCall(`/news/${articleId}`);

      if (articleData?.success) {
        const article = articleData.data;

        // Create modal
        const modal = document.createElement("div");
        modal.className =
          "fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4";
        modal.innerHTML = `
                    <div class="bg-gray-800 rounded-xl max-w-4xl max-h-full overflow-y-auto">
                        <div class="relative">
                            <img src="${article.imageUrl}" alt="${
          article.title
        }" class="w-full h-64 object-cover">
                            <button onclick="this.closest('.fixed').remove()" class="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-75">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div class="p-8">
                            <div class="mb-4">
                                <span class="bg-blue-600 text-white px-3 py-1 rounded text-sm">${
                                  article.category
                                }</span>
                            </div>
                            <h1 class="text-3xl font-bold text-gray-100 mb-4">${
                              article.title
                            }</h1>
                            <div class="flex items-center text-gray-400 text-sm mb-6">
                                <span>By ${article.author}</span>
                                <span class="mx-2">•</span>
                                <span>${new Date(
                                  article.publishedAt
                                ).toLocaleDateString()}</span>
                                <span class="mx-2">•</span>
                                <span>${article.readTime}</span>
                            </div>
                            <div class="text-gray-300 leading-relaxed">
                                <p class="text-lg text-gray-200 mb-6">${
                                  article.summary
                                }</p>
                                <div class="prose prose-invert max-w-none">
                                    ${article.content
                                      .split("\n")
                                      .map((p) => `<p class="mb-4">${p}</p>`)
                                      .join("")}
                                </div>
                            </div>
                            <div class="mt-8 pt-6 border-t border-gray-700">
                                <div class="flex flex-wrap gap-2">
                                    ${article.tags
                                      .map(
                                        (tag) =>
                                          `<span class="bg-gray-700 text-gray-300 px-2 py-1 rounded text-sm">#${tag}</span>`
                                      )
                                      .join("")}
                                </div>
                            </div>
                        </div>
                    </div>
                `;

        document.body.appendChild(modal);
      }
    } catch (error) {
      console.error("News detail loading error:", error);
    }
  }

  async refreshData() {
    const refreshIcon = document.querySelector("#refreshBtn i");
    const refreshText = document.querySelector("#refreshBtn span");

    if (refreshIcon) {
      refreshIcon.classList.add("fa-spin");
    }
    if (refreshText) {
      refreshText.textContent = "Updating...";
    }

    try {
      // Refresh current section data
      switch (this.currentSection) {
        case "dashboard":
          await this.loadDashboard();
          break;
        case "portfolio":
          await this.loadPortfolio();
          break;
        case "market":
          await this.loadMarketData();
          break;
        case "news":
          await this.loadNews();
          break;
      }

      // Show success message
      this.showSuccessMessage("Data refreshed successfully!");
    } catch (error) {
      console.error("Refresh error:", error);
      this.showError("Failed to refresh data. Please try again.");
    } finally {
      if (refreshIcon) {
        refreshIcon.classList.remove("fa-spin");
      }
      if (refreshText) {
        refreshText.textContent = "Refresh";
      }
    }
  }

  showSuccessMessage(message) {
    const successDiv = document.createElement("div");
    successDiv.className =
      "fixed top-4 right-4 bg-gradient-to-r from-emerald-600 to-green-600 shadow-lg shadow-emerald-600/30 text-white px-6 py-3 rounded-lg z-50 backdrop-blur-sm";
    successDiv.innerHTML = `
            <div class="flex items-center space-x-2">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" class="ml-2">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
    document.body.appendChild(successDiv);

    setTimeout(() => {
      if (successDiv.parentElement) {
        successDiv.remove();
      }
    }, 3000);
  }

  showError(message) {
    const errorDiv = document.createElement("div");
    errorDiv.className =
      "fixed top-4 right-4 bg-gradient-to-r from-red-600 to-rose-600 shadow-lg shadow-red-600/30 text-white px-6 py-3 rounded-lg z-50 backdrop-blur-sm";
    errorDiv.innerHTML = `
            <div class="flex items-center space-x-2">
                <i class="fas fa-exclamation-circle"></i>
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" class="ml-2">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
    document.body.appendChild(errorDiv);

    setTimeout(() => {
      if (errorDiv.parentElement) {
        errorDiv.remove();
      }
    }, 5000);
  }

  // Utility functions
  formatCurrency(amount) {
    return new Intl.NumberFormat("en-IN").format(amount);
  }

  formatVolume(volume) {
    if (volume >= 10000000) {
      return (volume / 10000000).toFixed(1) + "Cr";
    } else if (volume >= 100000) {
      return (volume / 100000).toFixed(1) + "L";
    } else if (volume >= 1000) {
      return (volume / 1000).toFixed(1) + "K";
    }
    return volume.toString();
  }
}

// Initialize the application
const app = new FinanceHub();

// Make app globally accessible for event handlers
window.app = app;
