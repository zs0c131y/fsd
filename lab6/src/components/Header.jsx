import React from "react";
import { Link, useLocation } from "react-router-dom";
import { TrendingUp, Menu, Bell, User } from "lucide-react";

const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const navLinkClass = (path) => {
    return `px-3 py-2 text-sm font-medium transition-colors duration-200 ${
      isActive(path)
        ? "text-primary-600 border-b-2 border-primary-600"
        : "text-gray-700 hover:text-primary-600"
    }`;
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">
                Bharat Finance Hub
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className={navLinkClass("/")}>
              Dashboard
            </Link>
            <Link to="/portfolio" className={navLinkClass("/portfolio")}>
              Portfolio
            </Link>
            <Link to="/markets" className={navLinkClass("/markets")}>
              Markets
            </Link>
            <Link to="/news" className={navLinkClass("/news")}>
              News
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700">
              <Bell className="h-5 w-5" />
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <User className="h-5 w-5" />
            </button>
            <button className="md:hidden text-gray-500 hover:text-gray-700">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
