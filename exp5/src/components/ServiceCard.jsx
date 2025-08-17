// Service Card Component with Props Destructuring
const ServiceCard = ({ icon, title, description, features, onLearnMore }) => {
  return (
    <div className="service-card">
      <div className="text-4xl mb-4" role="img" aria-label={title}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
      <ul className="text-sm text-gray-500 mb-6 space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className="text-green-500 mr-2 mt-0.5 flex-shrink-0">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={() => onLearnMore(title, description, features)}
        className="w-full btn-primary"
      >
        Learn More
      </button>
    </div>
  );
};

export default ServiceCard;
