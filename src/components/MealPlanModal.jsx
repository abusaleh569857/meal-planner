import Swal from "sweetalert2";
import { useMealPlan } from "../hooks/useMealPlan";

const MealPlanModal = ({ recipeDetails }) => {
  const meal = recipeDetails;
  const days = ["mon", "tues", "wed", "thurs", "fri", "sat", "sun"];

  const { state, dispatch } = useMealPlan();
  console.log("state :", state);

  const handleMealPlan = async (meal, day) => {
    const alreadyAddedMeal = state.mealPlan[day]?.some(
      (sameMeal) => sameMeal.id === meal.id
    );
    if (alreadyAddedMeal) {
      const result = await Swal.fire({
        title: "Already Added",
        text: "This meal is already added to this day. Do you want to add it again?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Add Again",
        cancelButtonText: "No",
      });
      if (!result.isConfirmed) return;
    } else {
      dispatch({
        type: "ADD_MEAL",
        payload: {
          day: day,
          meal: meal,
        },
      });
    }
  };

  return (
    <div>
      {days?.map((day) => (
        <button
          key={day}
          className="m-5 p-2 bg-orange-500 hover:bg-orange-600 rounded"
          onClick={() => handleMealPlan(meal, day)}
        >
          {day.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default MealPlanModal;
