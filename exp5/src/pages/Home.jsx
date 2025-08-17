import Carousel from "../components/Carousel";

const Home = () => {
  const carouselItems = [
    {
      title: "Investment Planning",
      description:
        "Strategic investment advice to grow your wealth over time with personalized portfolio management",
      cta: "Start Investing",
    },
    {
      title: "Risk Management",
      description:
        "Protect your assets with comprehensive insurance solutions tailored to your needs",
      cta: "Assess Risk",
    },
    {
      title: "Retirement Planning",
      description:
        "Secure your golden years with smart retirement strategies and long-term financial planning",
      cta: "Plan Retirement",
    },
  ];

  const features = [
    {
      icon: "📈",
      title: "Expert Guidance",
      description: "Professional financial advisors with years of experience",
      bgColor: "bg-blue-100",
    },
    {
      icon: "🛡️",
      title: "Secure Planning",
      description: "Your financial data is protected with bank-level security",
      bgColor: "bg-green-100",
    },
    {
      icon: "⚡",
      title: "Quick Results",
      description: "Get personalized recommendations in minutes",
      bgColor: "bg-yellow-100",
    },
  ];

  return (
    <div>
      <Carousel items={carouselItems} />

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose WealthWise?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We provide comprehensive financial solutions to help you achieve
              your long-term financial goals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center animate-fade-in">
                <div
                  className={`${feature.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <span
                    className="text-2xl"
                    role="img"
                    aria-label={feature.title}
                  >
                    {feature.icon}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 gradient-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Secure Your Financial Future?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Schedule a free consultation with our expert financial advisors
            today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-secondary-500 hover:bg-secondary-600 text-primary-900 font-bold py-3 px-8 rounded-lg transition-colors">
              Get Started Today
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-primary-900 font-bold py-3 px-8 rounded-lg transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">
                $2.5B+
              </div>
              <div className="text-gray-600">Assets Under Management</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">
                5,000+
              </div>
              <div className="text-gray-600">Satisfied Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">
                25+
              </div>
              <div className="text-gray-600">Years of Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">
                98%
              </div>
              <div className="text-gray-600">Client Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
