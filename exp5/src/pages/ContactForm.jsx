import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    investmentAmount: "",
    timeframe: "",
    riskTolerance: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.service) newErrors.service = "Please select a service";
    if (!formData.investmentAmount)
      newErrors.investmentAmount = "Please select an investment amount";
    if (!formData.timeframe) newErrors.timeframe = "Please select a timeframe";
    if (!formData.riskTolerance)
      newErrors.riskTolerance = "Please select your risk tolerance";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsLoading(false);
      setIsSubmitted(true);

      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          service: "",
          investmentAmount: "",
          timeframe: "",
          riskTolerance: "",
          message: "",
        });
      }, 5000);
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      service: "",
      investmentAmount: "",
      timeframe: "",
      riskTolerance: "",
      message: "",
    });
    setErrors({});
  };

  // Conditional rendering for confirmation message
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl p-8 text-center animate-fade-in">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-green-600 mb-4">Thank You!</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Your consultation request has been submitted successfully. Our
            financial advisor will contact you within 24 hours.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-primary-900 mb-2">
              What's Next?
            </h3>
            <ul className="text-sm text-primary-700 space-y-1">
              <li>• Review of your financial goals</li>
              <li>• Personalized investment strategy</li>
              <li>• Free 30-minute consultation</li>
            </ul>
          </div>
          <button onClick={() => navigate("/")} className="btn-primary w-full">
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Schedule a Consultation
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Get personalized financial advice tailored to your goals
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`form-input ${
                    errors.firstName ? "form-input-error" : ""
                  }`}
                  placeholder="Enter your first name"
                  disabled={isLoading}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`form-input ${
                    errors.lastName ? "form-input-error" : ""
                  }`}
                  placeholder="Enter your last name"
                  disabled={isLoading}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`form-input ${
                    errors.email ? "form-input-error" : ""
                  }`}
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your phone number"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Service Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service of Interest *
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                className={`form-input ${
                  errors.service ? "form-input-error" : ""
                }`}
                disabled={isLoading}
              >
                <option value="">Select a service</option>
                <option value="investment">Investment Planning</option>
                <option value="risk">Risk Management</option>
                <option value="retirement">Retirement Planning</option>
                <option value="tax">Tax Planning</option>
                <option value="estate">Estate Planning</option>
                <option value="education">Education Planning</option>
                <option value="comprehensive">
                  Comprehensive Financial Planning
                </option>
              </select>
              {errors.service && (
                <p className="text-red-500 text-sm mt-1">{errors.service}</p>
              )}
            </div>

            {/* Financial Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Investment Amount *
                </label>
                <select
                  name="investmentAmount"
                  value={formData.investmentAmount}
                  onChange={handleInputChange}
                  className={`form-input ${
                    errors.investmentAmount ? "form-input-error" : ""
                  }`}
                  disabled={isLoading}
                >
                  <option value="">Select amount range</option>
                  <option value="10k-50k">$10,000 - $50,000</option>
                  <option value="50k-100k">$50,000 - $100,000</option>
                  <option value="100k-500k">$100,000 - $500,000</option>
                  <option value="500k-1m">$500,000 - $1,000,000</option>
                  <option value="1m+">$1,000,000+</option>
                </select>
                {errors.investmentAmount && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.investmentAmount}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Investment Timeframe *
                </label>
                <select
                  name="timeframe"
                  value={formData.timeframe}
                  onChange={handleInputChange}
                  className={`form-input ${
                    errors.timeframe ? "form-input-error" : ""
                  }`}
                  disabled={isLoading}
                >
                  <option value="">Select timeframe</option>
                  <option value="short">Short-term (1-3 years)</option>
                  <option value="medium">Medium-term (3-7 years)</option>
                  <option value="long">Long-term (7+ years)</option>
                  <option value="mixed">Mixed timeframes</option>
                </select>
                {errors.timeframe && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.timeframe}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Risk Tolerance *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    value: "conservative",
                    label: "Conservative",
                    desc: "Low risk, steady returns",
                  },
                  {
                    value: "moderate",
                    label: "Moderate",
                    desc: "Balanced risk and return",
                  },
                  {
                    value: "aggressive",
                    label: "Aggressive",
                    desc: "Higher risk, higher potential returns",
                  },
                ].map((risk) => (
                  <label
                    key={risk.value}
                    className="flex items-start space-x-3 cursor-pointer p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <input
                      type="radio"
                      name="riskTolerance"
                      value={risk.value}
                      checked={formData.riskTolerance === risk.value}
                      onChange={handleInputChange}
                      className="text-primary-600 focus:ring-primary-500 mt-1"
                      disabled={isLoading}
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {risk.label}
                      </div>
                      <div className="text-xs text-gray-500">{risk.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
              {errors.riskTolerance && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.riskTolerance}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="form-input"
                placeholder="Tell us about your financial goals or any specific questions you have..."
                disabled={isLoading}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Schedule Consultation"
                )}
              </button>
              <button
                type="button"
                onClick={handleReset}
                disabled={isLoading}
                className="flex-1 btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Clear Form
              </button>
            </div>
          </form>
        </div>

        {/* Additional Information */}
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📞</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Call Us</h3>
            <p className="text-gray-600">
              <a
                href="tel:+91990990909"
                className="hover:text-primary-600 transition-colors"
              >
                +91 9909909909
              </a>
            </p>
          </div>

          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✉️</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Email Us</h3>
            <p className="text-gray-600">
              <a
                href="mailto:info@wealthwise.com"
                className="hover:text-primary-600 transition-colors"
              >
                info@wealthwise.com
              </a>
            </p>
          </div>

          <div className="text-center">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📍</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
            <p className="text-gray-600">
              1, Dalal Street
              <br />
              Mumbai, IN 400001
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
