// renderApp.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import "./index.less";
import "./layout/Root.less";
import "./layout/Navbar.less";
import "./features/auth/authForm.css";
import "./features/Account/Account.less";
import "./features/politicians/PoliticianDetails.less";
import "./features/homepage/Homepage.less";
import "./layout/main.less";
import "./features/companies/companies.less";
import "./features/politicians/PoliticiansList.less";

import store from "./store";
import router from "./mainDetails";

ReactDOM.createRoot(document.getElementById("root")).render(
  // take out strict mode before deployment
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
