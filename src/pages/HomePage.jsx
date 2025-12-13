import { useState } from "react";
import Category from "../components/Category";
import SearchBar from "../components/SearchBar";
import useCategory from "../hooks/useCategory";
import useRecipes from "../hooks/useRecipes";

const HomePage = () => {
  //   const { categories, loading, error } = useCategory();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const { recipe, loading, error } = useRecipes(search, category);

  return (
    <div>
      <SearchBar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
      ></SearchBar>
      <Category></Category>
    </div>
  );
};

export default HomePage;
