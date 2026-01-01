import { useContext } from "react";
import { MealPlanContext } from "../context/MealPlanContext";

export const useMealPlan = () => {
  const context = useContext(MealPlanContext);
  if (!context) {
    throw new Error("useMealPlan must be used within MealPlanProvider");
  }
  return context;
};
