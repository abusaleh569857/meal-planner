import { useEffect, useState } from "react";

const useRecipes = (searchQuery, category) => {
  const [recipe, setRecipe] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchAllRecipe = async () => {
      if (searchQuery) {
        try {
          const res = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
              searchQuery
            )}`
          );
          const data = await res.json();
          console.log("Data :", data.meals);
        } catch (error) {}
      }
    };
    fetchAllRecipe();
    return () => {
      isMounted = false;
    };
  }, [searchQuery, category]);

  return { recipe, loading, error };
};

export default useRecipes;
