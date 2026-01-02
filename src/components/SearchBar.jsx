import { useState } from "react";
import useCategory from "../hooks/useCategory";
import heroImg from "../assets/hero.png";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ search, setSearch, category, setCategory }) => {
  const { categories } = useCategory();
  const [searchInput, setSearchInput] = useState("");

  const setSearchResult = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    setSearchInput("");
  };

  return (
    <div className="w-full">
      <div className="relative w-full h-[450px] flex flex-col justify-center items-center text-center px-4 overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
          style={{
            backgroundImage: `url(${heroImg})`,
          }}
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/50 to-black/30" />

        <div className="relative z-10 w-full max-w-4xl mx-auto space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
              Smart Meal <span className="text-orange-400">Planner</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 font-medium drop-shadow-md max-w-2xl mx-auto">
              Find the perfect recipe for your next meal.
            </p>
          </div>

          <form
            onSubmit={setSearchResult}
            className="flex items-center bg-white/95 backdrop-blur-sm rounded-full p-2 shadow-2xl w-full max-w-2xl mx-auto transform transition-all hover:scale-[1.01]"
          >
            <input
              type="search"
              placeholder="What do you want to cook today? (e.g., Chicken, Pasta)"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-1 bg-transparent px-6 py-3 text-gray-800 placeholder-gray-500 focus:outline-none text-lg font-medium rounded-l-full"
            />
            <button
              type="submit"
              className="bg-linear-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-full font-bold shadow-lg transition-all duration-300 flex items-center gap-2 transform active:scale-95"
            >
              <FaSearch className="text-lg" />
              <span>Search</span>
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-20 mb-10">
        <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-100">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <h3 className="text-lg font-bold text-gray-700 whitespace-nowrap">
              Popular Categories:
            </h3>

            <div className="flex flex-wrap gap-3 justify-center md:justify-start w-full">
              <button
                onClick={() => setCategory("All")}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                  category === "All"
                    ? "bg-orange-500 text-white border-orange-500 shadow-md transform scale-105"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600"
                }`}
              >
                All Recipes
              </button>

              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.name)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                    category === cat.name
                      ? "bg-orange-500 text-white border-orange-500 shadow-md transform scale-105"
                      : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
