import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Root from "./layout/Root.jsx";
import Politicians from "./features/politicians/Politicians.jsx";
import PoliticianRedirect from "./features/politicians/PoliticianRedirect.jsx";
import PoliticianDetails from "./features/politicians/PoliticianDetails.jsx";
import Companies from "./features/companies/Companies.jsx";
import CompanyDetails from "./features/companies/CompanyDetails.jsx";
import CompanyRedirect from "./features/companies/CompanyRedirect.jsx";
import CompanyCard from "./features/companies/CompanyCard.jsx";
import AuthForm from "./features/auth/AuthForm";
import ErrorPage from "./main/ErrorPage.jsx";
import Account from "./features/Account/Account.jsx";
import Homepage from "./features/homepage/Homepage.jsx";
import Insights from "./features/Insights/Insights.jsx";
import LiveTrading from "./features/congressTrading/LiveTrading.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Homepage /> },
      { path: "/politicians", element: <Politicians /> },
      { path: "/politicians/name/:name", element: <PoliticianRedirect /> },
      { path: "/politicians/:id", element: <PoliticianDetails /> },
      { path: "/companies", element: <Companies /> },
      { path: "/companies/name/:name", element: <CompanyRedirect /> },
      { path: "/companies/:id", element: <CompanyDetails /> },
      { path: "/login", element: <AuthForm /> },
      { path: "*", element: <ErrorPage /> },
      { path: "/user/:id", element: <Account /> },
      { path: "/insights", element: <Insights /> },
      { path: "/livetrading", element: <LiveTrading /> },
    ],
  },
]);

export default router;
