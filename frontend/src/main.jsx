import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./pages/styles/index.css";
import "./pages/styles/root.css";

/**  Import Pages (Routes) **/
import Root_Layout from "./pages/root_layout/root_layout.jsx";
import ErrorPage from "./pages/error_page/error_page.jsx";
import Home from "./pages/home/Home.jsx";
import Manifest from "./pages/manifest_generator/Manifest.jsx";
import Flights from "./pages/flights/Flights.jsx";
import Signup from "./pages/sign_up/sign_up.jsx";
import Login from "./pages/login/login.jsx";
import Profile from './pages/profile/Profile.jsx'
import SplashPage from "./pages/roleSplashPage/roleSplashPage.jsx";
import Individual_Training from './pages/IndividualTraining/IndividualTrainingDashboard.jsx'


/** Router **/
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root_Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: <Home />
      },
      {
        path: '/manifest',
        element: <Manifest />
      },
      {
        path: "/flights",
        element: <Flights />
      },
      {
        path: '/profiles/:name',
        element: <Profile />
      },
      {
        path:'/Individual-Training-Record/:id',
        element: <Individual_Training />
      },
    ],
  },
  { path: "/login", element: <Login /> },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/setRole",
    element: <SplashPage />,
  },
]);

createRoot(document.getElementById("root")).render(

  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
