const SearchBar = () => {
  return (
    <div className="flex flex-col justify-center items-center m-5">
      <h1>Search Your Recipe </h1>

      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search Your Recipe "
        className="p-2 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300 rounded-xl"
      />
    </div>
  );
};

export default SearchBar;
