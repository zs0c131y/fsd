# FinanceHub - Professional Financial Dashboard

A comprehensive full-stack web application built with Node.js, Express.js, and modern web technologies for financial portfolio management and market analysis.

## 🚀 Features

### Frontend Features

- **Dark Theme UI**: Sleek, modern dark interface designed for professional use
- **Responsive Design**: Fully responsive layout using Tailwind CSS
- **Interactive Dashboard**: Real-time portfolio performance visualization
- **Market Data**: Live stock prices, indices, commodities, and currency rates
- **Financial News**: Categorized news feed with detailed article views
- **Portfolio Management**: Comprehensive portfolio tracking and analytics

### Backend (REST API)

- **RESTful Architecture**: Clean, organized API endpoints
- **Express.js Server**: Fast and reliable backend service
- **Modular Structure**: Organized routes and data management
- **Error Handling**: Comprehensive error management and logging
- **CORS Support**: Cross-origin resource sharing enabled

## 🛠️ Technology Stack

### Frontend Technologies

- **HTML5**: Semantic markup and structure
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Vanilla JavaScript**: Modern ES6+ features and API integration
- **Chart.js**: Interactive data visualization
- **Font Awesome**: Professional icon library

### Backend Technologies

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **Morgan**: HTTP request logger middleware
- **Helmet**: Security-focused middleware
- **CORS**: Cross-origin resource sharing middleware
- **Body-parser**: Request parsing middleware

## 📁 Project Structure

```text
exp8/
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── data/                  # Mock data files
│   ├── marketData.js      # Stock market data
│   ├── newsData.js        # Financial news articles
│   └── portfolioData.js   # User portfolio information
├── routes/                # API route handlers
│   ├── market.js          # Market data endpoints
│   ├── news.js            # News endpoints
│   └── portfolio.js       # Portfolio endpoints
└── public/                # Frontend assets
    ├── index.html         # Main application page
    ├── app.js             # Frontend JavaScript
    └── styles.css         # Additional CSS styles
```

## 🔧 Installation & Setup

1. **Navigate to the project directory:**

   ```bash
   cd "e:\CHRIST\Trimester 1\FSD\FSD Programs\lab\exp8"
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the server:**

   ```bash
   npm start
   ```

4. **Access the application:**
   - Web Interface: <http://localhost:3000>
   - API Endpoints: <http://localhost:3000/api>

## 📊 API Endpoints

### Market Data

- `GET /api/market` - Complete market data
- `GET /api/market/stocks` - Stock information
- `GET /api/market/stocks/:symbol` - Specific stock details
- `GET /api/market/indices` - Market indices
- `GET /api/market/commodities` - Commodity prices
- `GET /api/market/currencies` - Currency exchange rates
- `GET /api/market/summary` - Market summary

### Portfolio Management

- `GET /api/portfolio` - Complete portfolio data
- `GET /api/portfolio/summary` - Portfolio summary
- `GET /api/portfolio/holdings` - Investment holdings
- `GET /api/portfolio/holdings/:symbol` - Specific holding details
- `GET /api/portfolio/allocation/sectors` - Sector allocation
- `GET /api/portfolio/transactions` - Transaction history
- `GET /api/portfolio/performance` - Performance history
- `GET /api/portfolio/analytics` - Portfolio analytics
- `POST /api/portfolio/transactions` - Add new transaction

### News & Information

- `GET /api/news` - All financial news
- `GET /api/news/:id` - Specific news article
- `GET /api/news/meta/categories` - News categories
- `GET /api/news/category/:category` - News by category
- `GET /api/news/search/:query` - Search news articles
- `GET /api/news/feed/latest` - Latest news feed

### System

- `GET /health` - API health check

## 🎨 Design Features

### Dark Theme

- Modern dark color scheme optimized for financial data
- High contrast for improved readability
- Professional gradient effects and hover animations
- Consistent color coding for gains/losses

### User Experience

- Intuitive navigation with active state indicators
- Responsive mobile-first design
- Loading states and error handling
- Smooth animations and transitions
- Interactive charts and data visualization

### Accessibility

- Semantic HTML structure
- Keyboard navigation support
- Focus indicators for interactive elements
- Screen reader compatible

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Desktop**: Full dashboard experience with multi-column layouts
- **Tablet**: Adapted layouts with touch-friendly interactions
- **Mobile**: Single-column layout with collapsible navigation

## 🔒 Security Features

- **Helmet.js**: Security headers and protection
- **CORS**: Controlled cross-origin access
- **Input Validation**: Server-side request validation
- **Error Handling**: Secure error messages

## 🚦 Development Scripts

- `npm start` - Start the production server
- `npm run dev` - Start with nodemon for development
- `npm test` - Run test suite (placeholder)

## 📈 Data Features

### Market Information

- Real-time stock prices with percentage changes
- Market indices (NIFTY 50, SENSEX, NIFTY BANK)
- Commodity prices (Gold, Silver, Crude Oil)
- Currency exchange rates

### Portfolio Analytics

- Total portfolio value and returns
- Individual stock performance
- Sector allocation visualization
- Transaction history tracking
- Performance charts and trends

### News Integration

- Categorized financial news
- Search functionality
- Article details with full content
- Publication date and author information

## 🌟 Key Highlights

1. **Professional Grade**: Enterprise-level UI design and functionality
2. **Full-Stack Architecture**: Complete backend API with frontend integration
3. **Real-time Data**: Live market data updates and portfolio tracking
4. **Modern Technologies**: Latest web development standards and practices
5. **Scalable Structure**: Modular design for easy maintenance and expansion

## 🎯 Use Cases

- **Personal Finance**: Individual portfolio tracking and management
- **Investment Analysis**: Market research and stock analysis
- **Financial Education**: Learning platform for financial markets
- **Professional Use**: Template for financial applications

## 🔮 Future Enhancements

- User authentication and personalized portfolios
- Real-time data feeds integration
- Advanced charting and technical analysis
- Mobile application development
- Database integration for persistent data
- Real-time notifications and alerts

---

**FinanceHub** - _Your Professional Financial Dashboard_

Built with ❤️ for smart financial decisions.
