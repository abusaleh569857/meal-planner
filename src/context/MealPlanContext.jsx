import { createContext, useEffect, useReducer } from "react";

const MEAL_PLAN_KEY = "meal_plan_v1";

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
  loading: false,
  error: null,
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
          ],
        },
      };

    case "REMOVE_MEAL":
      return {
        ...state,
        mealPlan: {
          ...state.mealPlan,
          [action.payload.day]: state.mealPlan[action.payload.day].filter(
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
        mealPlan: { ...initialState.mealPlan },
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const MealPlanContext = createContext();

export const MealPlanProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mealPlanReducer, initialState, () => {
    const stored = localStorage.getItem(MEAL_PLAN_KEY);
    return stored ? JSON.parse(stored) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(MEAL_PLAN_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <MealPlanContext.Provider value={{ state, dispatch }}>
      {children}
    </MealPlanContext.Provider>
  );
};
