import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./layout/Root.jsx";
import Articles from "./features/homepage/articles/Articles.jsx";
import Politicians from "./features/politicians/Politicians.jsx";
import PoliticianRedirect from "./features/politicians/PoliticianRedirect.jsx";
import PoliticianDetails from "./features/politicians/PoliticianDetails.jsx";
import Companies from "./features/companies/Companies.jsx";
import CompanyRedirect from "./features/companies/CompanyRedirect.jsx";
import CompanyCard from "./features/companies/CompanyCard.jsx";
import AuthForm from "./features/auth/AuthForm";
import ErrorPage from "./features/ErrorPage.jsx";
import Account from "./features/Account/Account.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Articles /> },
      { path: "/politicians", element: <Politicians /> },
      { path: "/politicians/name/:name", element: <PoliticianRedirect /> },
      { path: "/politicians/:id", element: <PoliticianDetails /> },
      { path: "/companies", element: <Companies /> },
      { path: "/companies/name/:name", element: <CompanyRedirect /> },
      { path: "/companies/:id", element: <CompanyCard /> },
      { path: "/login", element: <AuthForm /> },
      { path: "*", element: <ErrorPage /> },
      { path: "/user/:id", element: <Account /> },
    ],
  },
]);

export default router;
