import { useMealPlan } from "../context/MealPlanContext";

const MealPlanModal = ({ recipeDetails }) => {
  const meal = recipeDetails;
  const days = ["mon", "tues", "wed", "thurs", "fri", "sat", "sun"];
  const { state, dispatch } = useMealPlan();
  console.log("state :", state);

  // const handleAddMeal = (meal, day) => {
  //   console.log("AddMeal : ", meal, day);
  // };
const MealPlanModal = ({ recipeDetails }) => {
  const meal = recipeDetails;
  const days = ["mon", "tues", "wed", "thurs", "fri", "sat", "sun"];

  const handleAddMeal = (meal, day) => {
    console.log("AddMeal : ", meal, day);
  };
  return (
    <div>
      {days?.map((day) => (
        <button
          key={day}
          className="m-5 p-2 bg-orange-500 hover:bg-orange-600 rounded"
          onClick={() =>
            dispatch({
              type: "ADD_MEAL",
              payload: {
                day: day,
                meal: meal,
              },
            })
          }
          onClick={() => handleAddMeal(meal, day)}
        >
          {day.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default MealPlanModal;
