import { useEffect, useState } from "react";
import ParseMeal from "../utils/ParseMeal";

const useRecipes = (searchQuery, category) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchAllRecipe = async () => {
      setLoading(true);
      setError(null);

      try {
        let url = "";
        let isCategorySearch = false;

        if (category && category !== "All") {
          url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
            category
          )}`;
          isCategorySearch = true;
        } else {
          url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
            searchQuery || ""
          )}`;
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error("Could not fetch recipe data!");

        const data = await res.json();
        let recipeData = data?.meals || [];

        if (isCategorySearch) {
          recipeData = recipeData.map((data) => ({
            id: data.idMeal,
            name: data.strMeal,
            thumb: data.strMealThumb,
            category: category,
          }));
        } else {
          recipeData = recipeData.map(ParseMeal);
        }

        if (isMounted) {
          setRecipes(recipeData);
          setLoading(false);
        }
      } catch (e) {
        if (isMounted) {
          setError(e.message);
          setLoading(false);
          setRecipes([]);
        }
      }
    };

    fetchAllRecipe();

    return () => {
      isMounted = false;
    };
  }, [searchQuery, category]);

  return { recipes, loading, error };
};

export default useRecipes;
