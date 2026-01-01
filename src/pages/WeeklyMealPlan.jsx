import Swal from "sweetalert2";
import { useMealPlan } from "../hooks/useMealPlan";

const WeeklyMealPlan = () => {
  const { state, dispatch } = useMealPlan();
  const { mealPlan } = state;

  const handleClearWeek = () => {
    Swal.fire({
      title: "Clear entire week?",
      text: "All meals for the whole week will be removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626", // red
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, clear week",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: "CLEAR_WEEK" });

        Swal.fire({
          icon: "success",
          title: "Week Cleared!",
          text: "All meals for the week have been removed.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleClearDay = (day) => {
    Swal.fire({
      title: "Are you sure?",
      text: `All meals for ${day.toUpperCase()} will be removed!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, clear it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: "CLEAR_DAY_MEALS",
          payload: { day },
        });

        Swal.fire({
          icon: "success",
          title: "Cleared!",
          text: `All meals for ${day.toUpperCase()} have been removed.`,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleRemoveMeal = (day, mealId, mealName) => {
    Swal.fire({
      title: "Remove this meal?",
      text: `Do you want to remove "${mealName}" from ${day.toUpperCase()}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#ef4444", // red
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, remove",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: "REMOVE_MEAL",
          payload: {
            day,
            mealId,
          },
        });

        Swal.fire({
          icon: "success",
          title: "Removed!",
          text: `"${mealName}" has been removed.`,
          timer: 1200,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Weekly Meal Plan</h2>

        <button
          onClick={handleClearWeek}
          className="text-sm bg-red-500 text-white px-3 py-1 rounded"
        >
          Clear Week
        </button>
      </div>

      {Object.entries(mealPlan).map(([day, meals]) => (
        <div key={day} className="border p-3 mb-3 rounded">
          <div className="flex justify-between items-center mb-2">
            <strong className="uppercase">{day}</strong>

            {meals.length > 0 && (
              <button
                onClick={() => handleClearDay(day)}
                className="text-sm text-red-500"
              >
                Clear Day
              </button>
            )}
          </div>

          {meals.length === 0 ? (
            <p className="text-gray-500">No meals planned</p>
          ) : (
            <ul className="space-y-2">
              {meals.map((meal) => (
                <li key={meal.id} className="flex justify-between items-center">
                  <span>{meal.name}</span>

                  <button
                    onClick={() => handleRemoveMeal(day, meal.id, meal.name)}
                    className="text-sm text-red-400"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default WeeklyMealPlan;
