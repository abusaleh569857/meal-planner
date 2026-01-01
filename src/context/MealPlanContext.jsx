import { createContext, useContext, useReducer } from "react";

const initialState = {
  mealPlan: {
    sat: [],
    sun: [],
    mon: [],
    tues: [],
    wed: [],
    thurs: [],
    fri: [],
  },
};

const mealPlanReducer = (state, action) => {
  switch (action.type) {
    case "ADD_MEAL":
      return {
        ...state,
        mealPlan: {
          ...state.mealPlan,
          [action.payload.day]: [
            ...state.mealPlan[action.payload.day],
            action.payload.meal,
            action.payload.recipe,
          ],
        },
      };
    case "REMOVE_MEAL":
      return {
        ...state,
        mealPlan: {
          ...state.mealPlan,
          [action.payload.day]: state.mealPlan[action.payload.day]?.filter(
            (meal) => meal.id !== action.payload.mealId
          ),
        },
      };
    case "CLEAR_DAY_MEALS":
      return {
        ...state,
        mealPlan: {
          ...state.mealPlan,
          [action.payload.day]: [],
        },
      };
    case "CLEAR_WEEK":
      return {
        ...state,
        mealPlan: initialState.mealPlan,
      };

    default:
      return state;
  }
};

export const MealPlanContext = createContext();

export const MealPlanProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mealPlanReducer, initialState);
  return (
    <MealPlanContext.Provider value={{ state, dispatch }}>
      {children}
    </MealPlanContext.Provider>
  );
};

export const useMealPlan = () => {
  const context = useContext(MealPlanContext);
  if (!context) {
    throw new Error("useMealPlan must be used within MealPlanProvider");
  }
  return context;
};
