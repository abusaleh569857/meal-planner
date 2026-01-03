import { useState } from "react";
import SearchBar from "../components/SearchBar";
import useRecipes from "../hooks/useRecipes";
import RecipeList from "../components/RecipeList";
import DataHandler from "../utils/DataHandler";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const { recipes, loading, error } = useRecipes(search, category);

  const handleReset = () => {
    setSearch("");
    setCategory("All");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SearchBar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        loading={loading}
      />

      <DataHandler
        loading={loading}
        error={error}
        data={recipes}
        search={search}
        category={category}
        onReset={handleReset}
      >
        <RecipeList recipes={recipes} />
      </DataHandler>
    </div>
  );
};

export default HomePage;
