import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { useMealPlan } from "../hooks/useMealPlan";
import ParseMeal from "../utils/ParseMeal";

const SHOPPING_KEY = "shopping_list_v1";
const BLOCKED_KEY = "shopping_blocked_v1";

const ShoppingList = () => {
  const { state, dispatch } = useMealPlan();
  const { mealPlan, loading, error } = state;
  const [items, setItems] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(SHOPPING_KEY);
    if (stored) {
      setItems(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(SHOPPING_KEY, JSON.stringify(items));
  }, [items]);

  const recipeIds = useMemo(() => {
    const ids = Object.values(mealPlan)
      .flat()
      .map((meal) => meal.id);
    return [...new Set(ids)];
  }, [mealPlan]);

  useEffect(() => {
    if (recipeIds.length === 0) {
      setItems([]);
      localStorage.removeItem(SHOPPING_KEY);
      return;
    }

    const generateShoppingList = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_ERROR", payload: null });

      try {
        const blockedRaw = localStorage.getItem(BLOCKED_KEY);
        const blockedSet = new Set(blockedRaw ? JSON.parse(blockedRaw) : []);

        const stored = localStorage.getItem(SHOPPING_KEY);
        const storedItems = stored ? JSON.parse(stored) : [];

        const purchasedMap = storedItems.reduce((acc, item) => {
          acc[item.name] = item.purchased;
          return acc;
        }, {});

        const requests = recipeIds.map((id) =>
          fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then((res) => res.json())
            .then((data) => ParseMeal(data.meals[0]))
        );

        const recipes = await Promise.all(requests);
        const ingredientMap = {};

        recipes.forEach((recipe) => {
          recipe.ingredients.forEach(({ name, measure }) => {
            if (blockedSet.has(name)) return;

            if (!ingredientMap[name]) {
              ingredientMap[name] = {
                name,
                measures: [],
                purchased: purchasedMap[name] || false,
              };
            }
            ingredientMap[name].measures.push(measure);
          });
        });

        setItems(Object.values(ingredientMap));
      } catch {
        dispatch({
          type: "SET_ERROR",
          payload: "Failed to generate shopping list",
        });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    generateShoppingList();
  }, [recipeIds, dispatch]);

  const togglePurchased = (name) => {
    setItems((prev) =>
      prev.map((item) =>
        item.name === name ? { ...item, purchased: !item.purchased } : item
      )
    );
  };

  const clearPurchased = () => {
    Swal.fire({
      title: "Clear purchased items?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, clear",
    }).then((result) => {
      if (!result.isConfirmed) return;

      setItems((prev) => {
        const purchasedNames = prev
          .filter((i) => i.purchased)
          .map((i) => i.name);

        const existing = JSON.parse(localStorage.getItem(BLOCKED_KEY)) || [];

        const updated = Array.from(new Set([...existing, ...purchasedNames]));

        localStorage.setItem(BLOCKED_KEY, JSON.stringify(updated));

        return prev.filter((item) => !item.purchased);
      });
    });
  };

  if (loading) return <p className="p-4">Generating shopping list...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Shopping List</h2>

      {items.length === 0 ? (
        <p className="text-gray-500">No items to shop</p>
      ) : (
        <>
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.name} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item.purchased}
                  onChange={() => togglePurchased(item.name)}
                />
                <span
                  className={item.purchased ? "line-through text-gray-400" : ""}
                >
                  {item.name} ({item.measures.join(", ")})
                </span>
              </li>
            ))}
          </ul>

          {items.some((i) => i.purchased) && (
            <button
              onClick={clearPurchased}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Clear Purchased Items
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ShoppingList;
