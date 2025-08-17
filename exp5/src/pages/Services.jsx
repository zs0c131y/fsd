import { useState } from "react";
import ServiceCard from "../components/ServiceCard";
import Modal from "../components/Modal";

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const services = [
    {
      icon: "💼",
      title: "Investment Planning",
      description:
        "Strategic investment advice to grow your wealth over time with diversified portfolio management.",
      features: [
        "Portfolio diversification analysis",
        "Risk assessment and management",
        "Market trend analysis",
        "Regular performance reviews",
        "Tax-efficient investing strategies",
      ],
    },
    {
      icon: "🛡️",
      title: "Risk Management",
      description:
        "Protect your assets with comprehensive insurance solutions and risk mitigation strategies.",
      features: [
        "Life insurance planning",
        "Property and casualty coverage",
        "Disability insurance options",
        "Liability protection strategies",
        "Emergency fund planning",
      ],
    },
    {
      icon: "🏖️",
      title: "Retirement Planning",
      description:
        "Secure your golden years with smart retirement strategies and long-term financial planning.",
      features: [
        "401(k) optimization",
        "IRA planning and management",
        "Social Security maximization",
        "Healthcare cost planning",
        "Estate planning coordination",
      ],
    },
    {
      icon: "📊",
      title: "Tax Planning",
      description:
        "Minimize your tax burden with strategic planning and optimization techniques.",
      features: [
        "Tax-loss harvesting",
        "Retirement account optimization",
        "Estate tax planning",
        "Business tax strategies",
        "Year-round tax monitoring",
      ],
    },
    {
      icon: "🏠",
      title: "Estate Planning",
      description:
        "Ensure your legacy is preserved and transferred according to your wishes.",
      features: [
        "Will and trust creation",
        "Power of attorney documents",
        "Beneficiary designations",
        "Estate tax minimization",
        "Charitable giving strategies",
      ],
    },
    {
      icon: "🎓",
      title: "Education Planning",
      description:
        "Save strategically for your children's education expenses with tax-advantaged accounts.",
      features: [
        "529 college savings plans",
        "Coverdell Education Savings Accounts",
        "Education tax credits optimization",
        "Private school funding strategies",
        "Student loan management",
      ],
    },
  ];

  const handleLearnMore = (title, description, features) => {
    setSelectedService({ title, description, features });
    setIsModalOpen(true);
  };

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive financial solutions tailored to your unique needs and
            goals
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
              onLearnMore={handleLearnMore}
            />
          ))}
        </div>

        {/* Process Section */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We follow a systematic approach to ensure your financial success
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                description:
                  "We learn about your goals, risk tolerance, and current financial situation",
              },
              {
                step: "02",
                title: "Analysis",
                description:
                  "Our experts analyze your data and identify opportunities for improvement",
              },
              {
                step: "03",
                title: "Strategy",
                description:
                  "We develop a customized financial plan tailored to your specific needs",
              },
              {
                step: "04",
                title: "Implementation",
                description:
                  "We execute the plan and provide ongoing monitoring and adjustments",
              },
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {process.step}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {process.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {process.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={selectedService?.title || "Service Details"}
        >
          {selectedService && (
            <div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {selectedService.description}
              </p>
              <h4 className="font-semibold text-gray-900 mb-3">
                Key Features:
              </h4>
              <ul className="space-y-2 mb-6">
                {selectedService.features.map((feature, index) => (
                  <li key={index} className="flex items-start text-gray-600">
                    <span className="text-green-500 mr-2 mt-0.5 flex-shrink-0">
                      ✓
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="flex space-x-4">
                <button className="flex-1 btn-primary">Get Started</button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 btn-secondary"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Services;
