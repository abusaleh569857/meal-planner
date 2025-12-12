import { useEffect, useState } from "react";

const CACHE_KEY = "mealdb_categories_v1";

const useCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchAllCategory = async () => {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (isMounted) {
            setCategories(parsed);
            setLoading(false); 
          }
        }

       
        const res = await fetch(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        const data = await res.json();
        const list =
          data.categories?.map((cat) => ({
            id: cat.idCategory,
            name: cat.strCategory,
            thumbnail: cat.strCategoryThumb,
            description: cat.strCategoryDescription,
          })) || [];

        if (isMounted) {
          setCategories(list);
          localStorage.setItem(CACHE_KEY, JSON.stringify(list));
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    fetchAllCategory();

    return () => {
      isMounted = false;
    };
  }, []);

  return { categories, loading, error };
};

export default useCategory;
