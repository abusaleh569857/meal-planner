import { createBrowserRouter } from "react-router-dom";
import Root from "../MainLayout/Root";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import RecipeDetails from "../pages/RecipeDetails";
import WeeklyMealPlan from "../pages/WeeklymealPlan";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/meal-plan",
        element: <WeeklyMealPlan />,
      },
      {
        path: "/recipe-details/:id",
        element: <RecipeDetails />,
      },
    ],
  },
]);
