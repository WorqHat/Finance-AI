import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  RouterProvider,
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import Signup from "./pages/Signup.jsx";
import Signin from "./pages/Signin.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { Provider } from "react-redux";
import appStore from "./utils/appStore.jsx";
import AuthLayout from "./components/AuthLayout.jsx";
import Adviser from "./pages/Adviser.jsx";
import ResponseParser from "./pages/Testing.jsx";
import Budgets from "./pages/Budgets.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<App />}>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="signup"
        element={
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        }
      />
      <Route
        path="signin"
        element={
          <AuthLayout authentication={false}>
            <Signin />
          </AuthLayout>
        }
      />

      <Route
        path="/dashboard"
        element={
          <AuthLayout path={"/dashboard"}>
            <Dashboard />
          </AuthLayout>
        }
      />

      <Route
        path="/adviser"
        element={
          <AuthLayout path={"/adviser"}>
            <Adviser />
          </AuthLayout>
        }
      />
      <Route
        path="/budgets"
        element={
          <AuthLayout path={"/budgets"}>
            <Budgets />
          </AuthLayout>
        }
      />

      <Route path="/testing" element={<ResponseParser />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={appStore}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
