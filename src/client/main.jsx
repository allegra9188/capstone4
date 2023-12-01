import React from "react";
import ReactDOM from "react-dom/client";

import "./index.less";
import "./layout/Root.less"
import "./layout/Navbar.less"
import "./features/Account/Account.css"
import "./features/politicians/PoliticianDetails.less"
import "./features/homepage/Homepage.scss"

import { Provider } from "react-redux";
import store from "./store";

import AuthForm from "./features/auth/AuthForm";
import Politicians from "./features/politicians/Politicians.jsx";
import PoliticianDetails from "./features/politicians/PoliticanDetails.jsx";
import Companies from "./features/companies/Companies.jsx";
import Root from "./layout/Root.jsx";
import ErrorPage from "./features/ErrorPage.jsx";
import Articles from "./features/homepage/Articles.jsx";
import CompanyCard from "./features/companies/CompanyCard.jsx";
import Account from "./features/Account/Account.jsx";


import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Articles /> },
      { path: "/politicians", element: <Politicians /> },
      { path: "/politicians/:id", element: <PoliticianDetails /> },
      { path: "/companies", element: <Companies /> },
      { path: "/companies/:id", element: <CompanyCard /> },
      { path: "/login", element: <AuthForm /> },
      { path: "*", element: <ErrorPage /> },
      { path: "/user/:id", element: <Account /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
