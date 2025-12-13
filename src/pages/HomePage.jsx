import { useState, useEffect } from "react";
import Category from "../components/Category";
import SearchBar from "../components/SearchBar";
import useCategory from "../hooks/useCategory";
import useRecipes from "../hooks/useRecipes";
import RecipeList from "../components/RecipeList";
import Swal from "sweetalert2";

const HomePage = () => {
  //   const { categories, loading, error } = useCategory();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const { recipes, loading, error } = useRecipes(search, category);

  useEffect(() => {
    if (!loading && recipes.length === 0 && search && category) {
      Swal.fire({
        title: "Oops! 😅",
        text: "Your search and category don’t match. Make them the same, or no meals will show up! 😤",
        icon: "warning",
        confirmButtonText: "Got it!",
        background: "#fff3cd",
        color: "#856404",
      });
    }
  }, [loading, recipes, search, category]);

  return (
    <div>
      <SearchBar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
      ></SearchBar>

      <RecipeList recipes={recipes}></RecipeList>
      <Category></Category>
    </div>
  );
};

export default HomePage;
