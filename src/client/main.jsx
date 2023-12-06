import React from "react";
import ReactDOM from "react-dom/client";

import "./index.less";
import "./layout/Root.less";
import "./layout/Navbar.less";
import "./features/auth/authForm.css"; 
import "./features/Account/Account.less";
import "./features/politicians/PoliticianDetails.less";
import "./features/homepage/Homepage.less";
import "./layout/main.less";
import "./features/companies/companies.less";

import { Provider } from "react-redux";
import store from "./store";

import AuthForm from "./features/auth/AuthForm";
import Politicians from "./features/politicians/Politicians.jsx";
import PoliticianDetails from "./features/politicians/PoliticianDetails.jsx";
import Companies from "./features/companies/Companies.jsx";
import CompanyCard from "./features/companies/CompanyCard.jsx";
import Root from "./layout/Root.jsx";
import ErrorPage from "./features/ErrorPage.jsx";
import ArticlesList from "./features/homepage/articles/ArticlesList.jsx";
import Account from "./features/Account/Account.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PoliticianRedirect from "./features/politicians/PoliticianRedirect.jsx";
import CompanyRedirect from "./features/companies/CompanyRedirect.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <ArticlesList /> },
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

ReactDOM.createRoot(document.getElementById("root")).render(
  // take out strict mode before deployment
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
