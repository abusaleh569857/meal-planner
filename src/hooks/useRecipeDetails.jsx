import { useEffect, useState } from "react";
import ParseMeal from "../utils/ParseMeal";
import { getRecipeDetails } from "../api/mealdb.api";

const useRecipeDetails = (id) => {
  const [recipeDetails, setRecipedetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    let isMounted = true;

    const fetchRecipeDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getRecipeDetails(id);

        const recipeDetailsData = data?.meals?.[0] || null;

        if (recipeDetailsData) {
          const parsedData = ParseMeal(recipeDetailsData);
          if (isMounted) {
            setRecipedetails(parsedData);
          }
        } else {
          throw new Error("Recipe details not found!");
        }
      } catch (e) {
        if (isMounted) {
          setError(e.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchRecipeDetails();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return {
    recipeDetails,
    loading,
    error,
  };
};

export default useRecipeDetails;
