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
          onClick={() => handleAddMeal(meal, day)}
        >
          {day.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default MealPlanModal;
