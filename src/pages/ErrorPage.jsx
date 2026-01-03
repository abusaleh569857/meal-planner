import { Link } from "react-router-dom";
import { FaArrowLeft, FaUtensils } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6 text-center overflow-hidden">
      <div className="max-w-md w-full space-y-8 relative">
        <div className="relative">
          <div className="flex justify-center mb-6 text-orange-500">
            <FaUtensils className="text-9xl drop-shadow-lg animate-bounce" />
          </div>

          <h1 className="text-9xl font-black text-gray-900 tracking-tight drop-shadow-xl">
            4<span className="text-orange-500">0</span>4
          </h1>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-4 mb-2">
            Oops! Page Not Found
          </h2>

          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            The recipe you are looking for might have been eaten or does not
            exist. Let's get you back to the kitchen!
          </p>

          <Link
            to="/"
            className="group inline-flex items-center gap-3 bg-linear-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 active:scale-95"
          >
            <FaArrowLeft className="text-xl group-hover:-translate-x-1 transition-transform" />
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
