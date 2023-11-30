import React from "react";
import ReactDOM from "react-dom/client";

import "./index.less";

import { Provider } from "react-redux";
import store from "./store";

import AuthForm from "./features/auth/AuthForm";
import Tasks from "./features/tasks/Tasks";
import Politicians from "./features/politicians/Politicians.jsx";
import Companies from "./features/companies/Companies.jsx";
import Root from "./layout/Root.jsx";
import ErrorPage from "./features/ErrorPage.jsx";
import Articles from "./features/homepage/Articles.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Account from "./features/Account/Account.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Articles /> },
      { path: "/politicians", element: <Politicians /> },
      { path: "/companies", element: <Companies /> },
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
