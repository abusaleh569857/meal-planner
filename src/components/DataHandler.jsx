import LoadingSpinner from "./LoadingSpinner";
import { FaSearchMinus, FaExclamationTriangle } from "react-icons/fa";

const DataHandler = ({
  loading,
  error,
  data = [],
  children,
  onReset,
  search,
  category,
}) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center text-red-500 min-h-[300px]">
        <div className="bg-red-100 p-4 rounded-full mb-4">
          <FaExclamationTriangle className="text-4xl" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">
          Something went wrong!
        </h3>
        <p className="text-gray-600 mt-2">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-2 bg-gray-800 text-white rounded-full hover:bg-black transition-all"
        >
          Reload Page
        </button>
      </div>
    );
  }

  if (!loading && !error && data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4 min-h-[300px]">
        <div className="bg-orange-100 p-6 rounded-full mb-4 animate-pulse">
          <FaSearchMinus className="text-6xl text-orange-500" />
        </div>
        <h2 className="text-3xl font-bold text-gray-700 mb-2">
          No Recipes Found!
        </h2>
        <p className="text-gray-500 max-w-md">
          We couldn't find any recipes matching "
          <span className="font-bold text-gray-800">{search || category}</span>
          ". Try browsing all categories or check your spelling.
        </p>
        <button
          onClick={onReset}
          className="mt-6 px-6 py-2 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-colors shadow-lg transform active:scale-95"
        >
          Reset Filters
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

export default DataHandler;
