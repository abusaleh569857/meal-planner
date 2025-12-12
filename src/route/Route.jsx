import { createBrowserRouter } from "react-router-dom";
import Root from "../MainLayout/Root";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";

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
    ],
  },
]);
