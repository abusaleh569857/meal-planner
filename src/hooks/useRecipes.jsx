import { useEffect, useState } from "react";
import ParseMeal from "../utils/ParseMeal";

const RECIPE_CACHE_KEY = "recipe_data";

const useRecipes = (searchQuery, category) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchAllRecipe = async () => {
      if (searchQuery) {
        try {
          const raw = localStorage.getItem(RECIPE_CACHE_KEY);
          if (raw) {
            const parsed = JSON.parse(raw);
            if (isMounted) {
              setRecipes(parsed);
              setLoading(false);
            }
          }

          const res = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
              searchQuery
            )}`
          );
          if (!res.ok) throw new Error("Error : Could Not Fetch Recipe Data!");
          const data = await res.json();
          const allRecipe = data?.meals || [];
          const recipeData = allRecipe.map(ParseMeal);

          if (isMounted) {
            setRecipes(recipeData);
            setLoading(false);
            localStorage.setItem(RECIPE_CACHE_KEY, JSON.stringify(recipeData));
          }
        } catch (e) {
          if (isMounted) {
            setError(e.message);
            setLoading(false);
          }
        }
      }
      if (category && category !== "All") {
        try {
          const res = await fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
              category
            )}`
          );
          if (!res.ok) throw new Error("Error : Could Not Fetch Recipe Data!");
          const data = await res.json();
          const recipeData = data?.meals || [];
          console.log("recipe :", recipeData);
          if (searchQuery) {
            const recipeData = recipeData.filter((recipe) =>
              recipe.strMeal
                .toLowerCase()
                .includes(searchQuery.strMeal.toLowerCase())
            );
          }

          const parsedRecipeData = recipeData?.map((data) => {
            return {
              id: data.idMeal,
              name: data.strMeal,
              thumb: data.strMealThumb,
            };
          });
          if (isMounted) {
            setRecipes(parsedRecipeData);
            setLoading(false);
          }
        } catch (e) {
          if (isMounted) {
            setError(e.message);
            setLoading(false);
          }
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
