import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaUtensils } from "react-icons/fa";

const RecipeCard = ({ recipe }) => {
  const { id, name, thumb, category } = recipe;
  const navigate = useNavigate();

  const handleRecipedetails = (id) => {
    navigate(`/recipe-details/${id}`);
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden flex flex-col h-full">
      <div className="relative h-56 overflow-hidden">
        <img
          src={thumb}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60" />

        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 z-10">
          <FaUtensils className="text-orange-500 text-xs" />
          <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">
            {category}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors">
            {name}
          </h1>
          <div className="w-12 h-1 bg-orange-200 rounded-full mb-4 group-hover:w-20 transition-all duration-300"></div>
        </div>

        <button
          type="button"
          onClick={() => handleRecipedetails(id)}
          className="w-full relative overflow-hidden bg-linear-to-r from-orange-500 to-red-500 text-white font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn active:scale-95"
        >
          <span className="relative z-10">View Recipe</span>
          <FaArrowRight className="text-sm relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1" />

          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
