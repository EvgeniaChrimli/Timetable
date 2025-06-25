import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router";
import store from "./redux/store.ts";
import "./index.css";
import Lauout from "./components/Lauout.tsx";
import TimeTablePage from "./pages/TimeTablePage.tsx";
import HomePage from "./pages/HomePage.tsx";

const routes = [
  {
    element: <Lauout />,
    children: [
      {
        element: <HomePage />,
        path: "/",
      },
      {
        element: <TimeTablePage />,
        path: "/timeTablePage",
      },
    ],
  },
];
const router = createBrowserRouter(routes, {
  basename: "/Timetable",
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
