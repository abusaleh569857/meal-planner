import RecipeCard from "./RecipeCard";

const RecipeList = ({ recipes }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-5">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 border-b border-gray-100 pb-4">
        <h2 className="text-3xl font-bold text-gray-800 border-l-4 border-orange-500 pl-4">
          Delicious Recipes
        </h2>
        <p className="text-gray-600 font-small text-sm md:text-lg max-w-xs md:text-right hover:text-orange-500 transition-colors duration-300 cursor-default">
          Find your next favourite dish.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
