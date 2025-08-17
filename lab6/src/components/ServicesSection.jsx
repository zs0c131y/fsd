import React from "react";
import {
  TrendingUp,
  Shield,
  PiggyBank,
  CreditCard,
  Building2,
  Calculator,
} from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: "Mutual Funds & SIP",
      description:
        "Systematic Investment Plans and diversified mutual fund portfolios",
      icon: TrendingUp,
      color: "text-blue-600 bg-blue-50",
    },
    {
      id: 2,
      title: "Life & Health Insurance",
      description: "Comprehensive insurance coverage for you and your family",
      icon: Shield,
      color: "text-green-600 bg-green-50",
    },
    {
      id: 3,
      title: "PPF & Tax Saving",
      description: "Tax-efficient investments including PPF, ELSS, and NPS",
      icon: PiggyBank,
      color: "text-purple-600 bg-purple-50",
    },
    {
      id: 4,
      title: "Fixed Deposits",
      description: "Safe and guaranteed returns with bank and corporate FDs",
      icon: Building2,
      color: "text-orange-600 bg-orange-50",
    },
    {
      id: 5,
      title: "Home & Personal Loans",
      description:
        "Competitive interest rates for home, personal, and education loans",
      icon: CreditCard,
      color: "text-red-600 bg-red-50",
    },
    {
      id: 6,
      title: "Tax Planning",
      description:
        "Optimize your taxes with expert planning under Section 80C, 80D",
      icon: Calculator,
      color: "text-indigo-600 bg-indigo-50",
    },
  ];

  return (
    <section className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
        <p className="text-lg text-gray-600">
          Complete financial solutions for Indian investors and families
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(({ id, title, description, icon: Icon, color }) => (
          <div
            key={id}
            className="card text-center hover:scale-105 transition-transform duration-200"
          >
            <div
              className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${color} mb-4`}
            >
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {title}
            </h3>
            <p className="text-gray-600">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
