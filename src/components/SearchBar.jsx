import { useState, useEffect, useRef } from "react";
import useCategory from "../hooks/useCategory";
import heroImg from "../assets/hero.png";
import { FaSearch, FaUtensils, FaChevronDown } from "react-icons/fa";

const SearchBar = ({ search, setSearch, category, setCategory }) => {
  const { categories } = useCategory();
  const [searchInput, setSearchInput] = useState("");
  const resultsRef = useRef(null);

  useEffect(() => {
    if (search === "") {
      setSearchInput("");
    }
  }, [search]);

  const scrollToResults = () => {
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const setSearchResult = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    setCategory("All");
    setSearchInput("");
    scrollToResults();
  };

  const handleCategorySelect = (catName) => {
    setCategory(catName);
    setSearch("");
    setSearchInput("");
    scrollToResults();
  };

  return (
    <div className="w-full pb-20">
      <div className="relative w-full h-[350px] md:h-[450px] flex flex-col justify-center items-center text-center px-4 overflow-hidden">
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
            <p className="text-md md:text-xl pt-1 text-gray-200 font-medium drop-shadow-md max-w-2xl mx-auto">
              Find the perfect recipe for your next meal.
            </p>
          </div>

          <form
            onSubmit={setSearchResult}
            className="flex items-center bg-white/95 backdrop-blur-sm rounded-full p-1 md:p-2 shadow-2xl w-full max-w-2xl mx-auto transform transition-all hover:scale-[1.01]"
          >
            <input
              type="search"
              placeholder="What do you want to cook today?"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-1 bg-transparent px-4 py-2 md:px-6 md:py-3 text-gray-800 placeholder-gray-500 focus:outline-none text-base md:text-lg font-medium rounded-l-full min-w-0"
            />
            <button
              type="submit"
              className="bg-linear-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-5 py-2 md:px-8 md:py-3 rounded-full font-bold shadow-lg transition-all duration-300 flex items-center gap-2 transform active:scale-95 text-sm md:text-base shrink-0"
            >
              <FaSearch className="text-sm md:text-lg" />
              <span>Search</span>
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-20 mb-16">
        <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-100">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <h3 className="text-lg font-bold text-gray-700 whitespace-nowrap flex items-center gap-2">
              <FaUtensils className="text-orange-500" /> Popular Categories:
            </h3>

            <div className="flex flex-wrap gap-3 justify-center md:justify-start w-full">
              {categories.slice(0, 9).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.name)}
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

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 border-l-4 border-orange-500 pl-4">
            Browse by Category
          </h2>

          <div className="relative group min-w-[200px]">
            <select
              value={category}
              onChange={(e) => handleCategorySelect(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-300 text-gray-700 py-2.5 pl-4 pr-10 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent cursor-pointer shadow-sm hover:border-orange-400 transition-all font-medium"
            >
              <option value="All">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <FaChevronDown className="text-sm group-hover:text-orange-500 transition-colors" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategorySelect(cat.name)}
              className="group relative h-40 rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <img
                src={cat.thumbnail}
                alt={cat.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute bottom-0 left-0 w-full p-3">
                <h3 className="text-white font-bold text-lg tracking-wide group-hover:text-orange-300 transition-colors">
                  {cat.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div ref={resultsRef} />
    </div>
  );
};

export default SearchBar;
