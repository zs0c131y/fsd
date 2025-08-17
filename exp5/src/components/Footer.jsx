const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-secondary-400 mb-4">
              WealthWise
            </h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Your trusted partner in building and protecting wealth for the
              future.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-300 hover:text-secondary-400 transition-colors"
                aria-label="Facebook"
              >
                <span className="text-xl">📘</span>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-secondary-400 transition-colors"
                aria-label="Twitter"
              >
                <span className="text-xl">🐦</span>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-secondary-400 transition-colors"
                aria-label="LinkedIn"
              >
                <span className="text-xl">💼</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a
                  href="#"
                  className="hover:text-secondary-400 transition-colors"
                >
                  Investment Planning
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-secondary-400 transition-colors"
                >
                  Risk Management
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-secondary-400 transition-colors"
                >
                  Retirement Planning
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-secondary-400 transition-colors"
                >
                  Tax Planning
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a
                  href="#"
                  className="hover:text-secondary-400 transition-colors"
                >
                  Financial Calculator
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-secondary-400 transition-colors"
                >
                  Market Insights
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-secondary-400 transition-colors"
                >
                  Educational Articles
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-secondary-400 transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-gray-300">
              <p className="flex items-center">
                <span className="mr-2">📞</span>
                <a
                  href="tel:+91990990909"
                  className="hover:text-secondary-400 transition-colors"
                >
                  +91 9909909909
                </a>
              </p>
              <p className="flex items-center">
                <span className="mr-2">✉️</span>
                <a
                  href="mailto:info@wealthwise.com"
                  className="hover:text-secondary-400 transition-colors"
                >
                  info@wealthwise.com
                </a>
              </p>
              <p className="flex items-start">
                <span className="mr-2 mt-1">📍</span>
                <span>
                  1, Dalal Street
                  <br />
                  Mumbai, IN 400001
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>
            &copy; {currentYear} WealthWise. All rights reserved. |
            <a
              href="#"
              className="hover:text-secondary-400 transition-colors ml-1"
            >
              Privacy Policy
            </a>{" "}
            |
            <a
              href="#"
              className="hover:text-secondary-400 transition-colors ml-1"
            >
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
