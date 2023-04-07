import React from "react";
import DashboardLayout from '../layouts/DashboardLayout';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../pages/Dashboard';
import ZeroDte from '../pages/ZeroDte';
import CorrCov from '../pages/CorrCov';
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
          { path: 'account', element: <Account /> },
        ],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
  { 
    path: "/site",
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <SignUp /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  { path: '*', element: <NotFound /> },
];


export default routes;