import Swal from "sweetalert2";
import { useMealPlan } from "../hooks/useMealPlan";
import {
  FaTrash,
  FaCalendarWeek,
  FaUtensils,
  FaTimesCircle,
} from "react-icons/fa";
import { useEffect } from "react";

const WeeklyMealPlan = () => {
  const { state, dispatch } = useMealPlan();
  const { mealPlan } = state;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleClearWeek = () => {
    Swal.fire({
      title: "<span class='text-gray-800'>Clear Entire Week?</span>",
      html: "<p class='text-gray-500'>This will remove <b>all meals</b> from your schedule. This action cannot be undone!</p>",
      icon: "warning",
      iconColor: "#ef4444",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#e5e7eb",
      confirmButtonText: "Yes, Clear All",
      cancelButtonText: "<span class='text-gray-600 font-bold'>Cancel</span>",
      buttonsStyling: true,
      customClass: {
        popup: "rounded-3xl shadow-2xl",
        confirmButton: "px-6 py-2.5 rounded-xl font-bold shadow-lg",
        cancelButton:
          "px-6 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: "CLEAR_WEEK" });
        Swal.fire({
          icon: "success",
          title: "Week Cleared!",
          text: "Start fresh! Your weekly plan is now empty.",
          timer: 1500,
          showConfirmButton: false,
          iconColor: "#ef4444",
        });
      }
    });
  };

  const handleClearDay = (day) => {
    Swal.fire({
      title: `<span class='text-gray-800'>Clear ${day.toUpperCase()}?</span>`,
      text: "All meals for this day will be removed.",
      icon: "warning",
      iconColor: "#f97316",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#e5e7eb",
      confirmButtonText: "Yes, Clear Day",
      cancelButtonText: "<span class='text-gray-600 font-bold'>Cancel</span>",
      customClass: {
        popup: "rounded-3xl",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: "CLEAR_DAY_MEALS",
          payload: { day },
        });
        Swal.fire({
          icon: "success",
          title: "Cleared!",
          text: `${day.toUpperCase()} is now empty.`,
          timer: 1500,
          showConfirmButton: false,
          iconColor: "#f97316",
        });
      }
    });
  };

  const handleRemoveMeal = (day, mealId, mealName) => {
    Swal.fire({
      title: "<span class='text-sm text-gray-600'>Remove Item</span>",
      html: `<h3 class='text-xl font-bold text-gray-800'>${mealName}</h3>`,
      icon: "question",
      iconColor: "#fbbf24",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#e5e7eb",
      confirmButtonText: "Remove",
      cancelButtonText: "<span class='text-gray-600'>Keep it</span>",
      customClass: {
        popup: "rounded-3xl w-80",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: "REMOVE_MEAL",
          payload: { day, mealId },
        });
        Swal.fire({
          icon: "success",
          title: "Removed!",
          timer: 1000,
          showConfirmButton: false,
          iconColor: "#ef4444",
        });
      }
    });
  };

  const hasMeals = Object.values(mealPlan).some((meals) => meals.length > 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-8 min-h-screen bg-gray-50/50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-10 gap-5 bg-white p-5 md:p-6 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="bg-orange-100 p-2.5 md:p-3 mt-2 rounded-full text-orange-600 shrink-0">
            <FaCalendarWeek className="text-2xl md:text-3xl" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 tracking-tight leading-tight">
              Weekly Meal Plan
            </h2>
            <p className="text-gray-500 text-xs md:text-sm mt-0.5">
              Organize your nutrition for the week ahead.
            </p>
          </div>
        </div>

        {hasMeals && (
          <button
            onClick={handleClearWeek}
            className="w-full md:w-auto group flex items-center justify-center gap-2 bg-red-50 text-red-600 px-6 py-3 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-red-200 text-sm md:text-base"
          >
            <FaTrash className="text-sm group-hover:animate-bounce" />
            Clear Entire Week
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {Object.entries(mealPlan).map(([day, meals]) => (
          <div
            key={day}
            className={`flex flex-col h-full rounded-3xl transition-all duration-300 border ${
              meals.length > 0
                ? "bg-white border-orange-100 shadow-lg hover:shadow-xl hover:-translate-y-1"
                : "bg-gray-50 border-gray-200 border-dashed opacity-80 hover:opacity-100"
            }`}
          >
            <div
              className={`p-4 md:p-5 flex justify-between items-center border-b ${
                meals.length > 0
                  ? "border-orange-50 bg-orange-50/50"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`w-1.5 md:w-2 h-6 md:h-8 rounded-full ${
                    meals.length > 0 ? "bg-orange-500" : "bg-gray-300"
                  }`}
                ></span>
                <strong className="text-base md:text-lg font-black text-gray-700 uppercase tracking-wider">
                  {day}
                </strong>
              </div>

              {meals.length > 0 && (
                <button
                  onClick={() => handleClearDay(day)}
                  className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all touch-manipulation"
                  title="Clear Day"
                >
                  <FaTimesCircle className="text-lg" />
                </button>
              )}
            </div>

            <div className="p-3 md:p-4 flex-1">
              {meals.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 py-6 md:py-8 gap-2">
                  <FaUtensils className="text-xl md:text-2xl opacity-20" />
                  <span className="text-xs md:text-sm font-medium">
                    No meals planned
                  </span>
                </div>
              ) : (
                <ul className="space-y-2 md:space-y-3">
                  {meals.map((meal) => (
                    <li
                      key={meal.id}
                      className="group/item relative flex items-center gap-3 p-2 bg-white rounded-xl border border-gray-100 shadow-sm hover:border-orange-200 hover:shadow-md transition-all duration-300"
                    >
                      <img
                        src={meal.thumb}
                        alt={meal.name}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover shadow-sm group-hover/item:scale-105 transition-transform shrink-0"
                      />

                      <div className="flex-1 min-w-0 pr-8 md:pr-6">
                        <p className="font-bold text-gray-800 text-xs md:text-sm truncate leading-tight">
                          {meal.name}
                        </p>
                        <p className="text-[10px] md:text-xs text-orange-500 font-semibold uppercase mt-0.5">
                          {meal.category}
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          handleRemoveMeal(day, meal.id, meal.name)
                        }
                        className="absolute right-1 top-1/2 -translate-y-1/2 p-2 text-gray-400 md:text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-100 md:opacity-0 md:group-hover/item:opacity-100 transition-all duration-200 touch-manipulation"
                        title="Remove Meal"
                      >
                        <FaTrash className="text-xs md:text-sm" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyMealPlan;
