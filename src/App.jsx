import { RouterProvider } from "react-router-dom";
import { router } from "./route/Route";
import { MealPlanProvider } from "./context/MealPlanContext";

function App() {
  return (
    <>
      <MealPlanProvider>
        <RouterProvider router={router}></RouterProvider>
      </MealPlanProvider>
    </>
  );
}

export default App;
