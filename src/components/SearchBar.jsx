import { useState } from "react";
import useCategory from "../hooks/useCategory";

const SearchBar = ({ search, setSearch, category, setCategory }) => {
  const { categories } = useCategory();
  const [searchInput, setSearchInput] = useState("");

  const setSearchResult = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    setSearchInput("");
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center m-5">
        <h1>Search Your Recipe </h1>

        <div className="border border-orange-400">
          <form onSubmit={setSearchResult}>
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Search Your Recipe "
              onChange={(e) => setSearchInput(e.target.value)}
              className="p-2  focus:outline-none focus:ring focus:ring-purple-300"
            />
            <button
              type="submit"
              className="bg-orange-400 py-2 px-5 hover:bg-orange-500"
            >
              Search
            </button>
          </form>
        </div>
      </div>
      <div className="flex flex-col items-end my-5">
        <h1>Filter By Category</h1>
        <select
          name="category"
          id="category"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
