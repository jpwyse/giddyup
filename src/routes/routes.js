import React from "react";
import DashboardLayout from '../layouts/DashboardLayout';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import ZeroDte from '../pages/ZeroDte';
import CorrCov from '../pages/CorrCov';
import Correlation from '../pages/Correlation';
import Covariance from '../pages/Covariance';
import Spread from '../pages/Spread';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Account from '../pages/Account';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';


const routes = () => [
  { 
    path: "/",
    element: <DashboardLayout />,
    children: [
      { 
        path: "dashboard", 
        element: <Dashboard />, 
        children : [
          { path: 'zerodte', element: <ZeroDte /> },
          { path: 'corrcov', element: <CorrCov /> },
          { path: 'correlation', element: <Correlation /> },
          { path: 'covariance', element: <Covariance /> },
          { path: 'spread', element: <Spread /> },
          { path: 'account', element: <Account /> },
        ],
      },
    ],
  },
  { 
    path: "/site",
    element: <MainLayout />,
    children: [
      { path: 'home', element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <SignUp /> },
      { path: 'contact', element: <Contact /> },
      
    ],
  },
  { path: '*', element: <NotFound /> },
];


export default routes;