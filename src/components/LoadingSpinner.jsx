import { FaUtensils } from "react-icons/fa";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-white/95">
      <div className="relative flex flex-col items-center">
        <FaUtensils className="text-7xl text-orange-500 animate-bounce drop-shadow-xl" />

        <div className="w-20 h-3 bg-gray-200 rounded-[50%] blur-sm -mt-2.5 animate-pulse"></div>

        <h2 className="mt-10 text-3xl font-extrabold text-gray-800 tracking-wide">
          Finding Best Recipes...
        </h2>
        <p className="text-lg text-orange-500 font-semibold animate-pulse mt-3">
          Exploring the kitchen for you!
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
