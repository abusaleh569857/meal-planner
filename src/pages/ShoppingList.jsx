import { useEffect, useMemo, useState } from "react";
import { useMealPlan } from "../hooks/useMealPlan";
import ParseMeal from "../utils/ParseMeal";
import {
  FaCheckCircle,
  FaShoppingBasket,
  FaUndo,
  FaListAlt,
  FaCheckDouble,
} from "react-icons/fa";

const PURCHASED_STATUS_KEY = "shopping_purchased_status_v2";

const ShoppingList = () => {
  const { state } = useMealPlan();
  const { mealPlan } = state;

  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const recipeIds = useMemo(() => {
    const ids = Object.values(mealPlan)
      .flat()
      .map((meal) => meal.id);
    return [...new Set(ids)];
  }, [mealPlan]);

  useEffect(() => {
    if (recipeIds.length === 0) {
      setIngredients([]);
      return;
    }

    const generateList = async () => {
      setLoading(true);
      setError(null);

      try {
        const requests = recipeIds.map((id) =>
          fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then((res) => res.json())
            .then((data) => ParseMeal(data.meals[0]))
        );

        const recipes = await Promise.all(requests);

        const savedStatusRaw = localStorage.getItem(PURCHASED_STATUS_KEY);
        const savedStatus = savedStatusRaw ? JSON.parse(savedStatusRaw) : {};

        const ingredientMap = {};

        recipes.forEach((recipe) => {
          recipe.ingredients.forEach(({ name, measure }) => {
            const key = name.trim();

            if (!ingredientMap[key]) {
              ingredientMap[key] = {
                name: key,
                measures: [],
                purchased: savedStatus[key] || false,
              };
            }
            if (!ingredientMap[key].measures.includes(measure)) {
              ingredientMap[key].measures.push(measure);
            }
          });
        });

        setIngredients(Object.values(ingredientMap));
      } catch (err) {
        setError("Failed to sync shopping list.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    generateList();
  }, [recipeIds]);

  const togglePurchased = (name) => {
    setIngredients((prev) => {
      const updatedList = prev.map((item) =>
        item.name === name ? { ...item, purchased: !item.purchased } : item
      );

      const statusMap = updatedList.reduce((acc, item) => {
        if (item.purchased) acc[item.name] = true;
        return acc;
      }, {});

      localStorage.setItem(PURCHASED_STATUS_KEY, JSON.stringify(statusMap));

      return updatedList;
    });
  };

  const markAllAsPurchased = () => {
    setIngredients((prev) => {
      const updatedList = prev.map((item) => ({ ...item, purchased: true }));

      const statusMap = updatedList.reduce((acc, item) => {
        acc[item.name] = true;
        return acc;
      }, {});

      localStorage.setItem(PURCHASED_STATUS_KEY, JSON.stringify(statusMap));

      return updatedList;
    });
  };

  const unpurchasedItems = ingredients.filter((i) => !i.purchased);
  const purchasedItems = ingredients.filter((i) => i.purchased);

  if (loading)
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );

  if (error) return <p className="p-4 text-red-500 text-center">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-orange-100 p-3 rounded-full text-orange-600">
          <FaShoppingBasket className="text-2xl" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Smart Shopping List
          </h2>
          <p className="text-gray-500 text-sm">
            Total Items: {ingredients.length} | To Buy:{" "}
            {unpurchasedItems.length}
          </p>
        </div>
      </div>

      {ingredients.length === 0 ? (
        <div className="text-center py-10 text-gray-400 bg-white rounded-3xl shadow-sm border border-dashed border-gray-200">
          <p>Your meal plan is empty. Add meals to generate a list!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4 border-b pb-2 border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <FaListAlt className="text-orange-500" /> To Buy{" "}
                <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                  {unpurchasedItems.length}
                </span>
              </h3>
              {unpurchasedItems.length > 0 && (
                <button
                  onClick={markAllAsPurchased}
                  className="text-xs flex items-center gap-1 text-orange-600 hover:text-orange-700 font-semibold bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <FaCheckDouble /> Mark All
                </button>
              )}
            </div>

            {unpurchasedItems.length === 0 ? (
              <p className="text-green-500 text-sm italic">
                All caught up! Nothing to buy.
              </p>
            ) : (
              <ul className="space-y-3">
                {unpurchasedItems.map((item) => (
                  <li key={item.name} className="flex items-start gap-3 group">
                    <button
                      onClick={() => togglePurchased(item.name)}
                      className="mt-1 w-5 h-5 rounded-md border-2 border-gray-300 hover:border-orange-500 transition-colors flex items-center justify-center shrink-0"
                    ></button>
                    <div>
                      <span className="text-gray-700 font-medium block">
                        {item.name}
                      </span>
                      <span className="text-xs text-gray-400 block">
                        {item.measures.join(", ")}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-gray-100 p-6 rounded-3xl border border-gray-200 opacity-90">
            <h3 className="text-lg font-bold text-gray-600 mb-4 flex items-center gap-2 border-b pb-2 border-gray-200">
              <FaCheckCircle className="text-green-500" /> Purchased{" "}
              <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                {purchasedItems.length}
              </span>
            </h3>

            {purchasedItems.length === 0 ? (
              <p className="text-gray-400 text-sm italic">
                No items purchased yet.
              </p>
            ) : (
              <ul className="space-y-3">
                {purchasedItems.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-start gap-3 group opacity-60 hover:opacity-100 transition-opacity"
                  >
                    <button
                      onClick={() => togglePurchased(item.name)}
                      className="mt-1 w-5 h-5 rounded-md bg-green-500 border-2 border-green-500 flex items-center justify-center text-white text-xs shrink-0 shadow-sm hover:bg-red-500 hover:border-red-500 transition-colors"
                      title="Undo / Move to Unpurchased"
                    >
                      <FaUndo className="group-hover:block hidden" />
                      <span className="group-hover:hidden">✓</span>
                    </button>
                    <div>
                      <span className="text-gray-800 line-through font-medium block decoration-gray-400">
                        {item.name}
                      </span>
                      <span className="text-xs text-gray-500 block">
                        {item.measures.join(", ")}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingList;
