import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './pages/styles/index.css'

import './pages/styles/root.css'

/**  Import Pages (Routes) **/
import Root_Layout from './pages/root_layout/root_layout.jsx'
import ErrorPage from './pages/error_page/error_page.jsx'
import Home from './pages/home/Home.jsx'
import Individual_Training from './pages/IndividualTraining/IndividualTrainingDashboard.jsx'
import Flights from './pages/flights/Flights.jsx'

/** Router **/
const router = createBrowserRouter([
  {
    path:"/",
    element: <Root_Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: "/",
        element: <Home />
      },
      {
        path:"Individual-Training-Record",
        element: <Individual_Training />
      },
      //add additional pages here
      {
        path: '/flights',
        element: <Flights />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router = {router} />
  </>,
)
