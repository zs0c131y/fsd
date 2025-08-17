import React from "react";
import { Loader2 } from "lucide-react";

const LoadingSpinner = ({ message = "Loading...", size = "default" }) => {
  const sizeClasses = {
    small: "h-4 w-4",
    default: "h-8 w-8",
    large: "h-12 w-12",
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2
        className={`${sizeClasses[size]} text-primary-600 animate-spin mb-3`}
      />
      <p className="text-gray-600 text-sm">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
