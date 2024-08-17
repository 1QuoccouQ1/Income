import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import Dashboard from "./page/Dashboard";
import App from "./App";
import Login from "./layouts/Login";
import Resgister from "./layouts/Resgister";
import User from "./page/User";
import Goats from "./page/Goats";
import Bill from "./page/Bill";
import Plan from "./page/Plan";
import HistoryUser from "./page/HistoryUser";
import Profile from "./page/Profile";
import {  redirect } from 'react-router-dom';
import UpdateGoat from "./page/UpdateGoat";
import AddPrice from "./page/AddPrice";
import UpdatePlan from "./page/UpdatePlan";
import {AuthToken} from "./services/apiService";
import UserDetail from "./page/UserDetail";
import { GoogleOAuthProvider } from '@react-oauth/google';
import ForgotPassword from "./page/ForgotPassword";
import ResetPassword from "./page/ResetPassword";
import PhoneForgot from "./page/PhoneForgot";


export async function checkLogin() {
  const token = localStorage.getItem('authToken');
  const UserID = localStorage.getItem('UserID');
  
  if (token && UserID) {
    const isValid = await AuthToken(token);
    if (isValid.isValid) {
      return redirect('/'); // Nếu token hợp lệ, chuyển hướng đến trang chính
    } else {
      localStorage.removeItem('authToken');
      localStorage.removeItem('UserID');
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('UserName');
      return null; // Nếu token không hợp lệ, cho phép truy cập vào trang Login
    }
  } else {
    localStorage.removeItem('authToken');
    localStorage.removeItem('UserID');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('UserName');
    return null; // Nếu không có token, cho phép truy cập vào trang Login
  }
}
export async function checkAuth() {
  const token = localStorage.getItem('authToken');
  const UserID = localStorage.getItem('UserID');
  
  if (token && UserID) {
    const isValid = await AuthToken(token);
    if (isValid.isValid) {
      return null; // Nếu token hợp lệ, cho phép truy cập vào trang yêu cầu xác thực
    } else {
      localStorage.removeItem('authToken');
      localStorage.removeItem('UserID');
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('UserName');
      return redirect('/login'); // Nếu token không hợp lệ, chuyển hướng đến trang Login
    }
  } else {
      localStorage.removeItem('authToken');
      localStorage.removeItem('UserID');
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('UserName');
    return redirect('/login'); // Nếu không có token, chuyển hướng đến trang Login
  }
}

const router = createBrowserRouter([
  {
    path: "/Income",
    element: <App/>,
    // loader: CheckLogin,
    children: [
      {
        path: "/",
        loader: checkAuth,
        element: <Dashboard/>,
      },
      {
        path: "/Dashboard",
        loader: checkAuth,
        element: <Dashboard/>,
      },
      {
        path: "/Plan",
        loader: checkAuth,
        element:<Plan/> ,
      },
      {
        path: "/Bill",
        loader: checkAuth,
        element:<Bill/> ,
      },
      {
        path: "/Goats",
        loader: checkAuth,
        element: <Goats/>,
      },
      {
        path: "/User",
        loader: checkAuth,
        element: <User/>,
      },
      {
        path: "/HistoryUser",
        loader: checkAuth,
        element: <HistoryUser/>,
      },
      {
        path: "/Profile",
        loader: checkAuth,
        element: <Profile/>,
      },
      {
        path: "/UpdateGoat",
        loader: checkAuth,
        element: <UpdateGoat/>,
      },
      {
        path: "/AddPrice",
        loader: checkAuth,
        element: <AddPrice/>,
      },
      {
        path: "/UpdatePlan",
        loader: checkAuth,
        element: <UpdatePlan/>,
      },
      {
        path: "/UserDetail",
        loader: checkAuth,
        element: <UserDetail/>,
      },
    ],
  },
  {
    path: "/login",
    loader: checkLogin,
    element: <Login/>,
  },
  {
    path: "/resgister",
    element: <Resgister/>,
  },
  {
    path: "/ForgotPassword",
    element: <ForgotPassword/>,
  },
  {
    path: "/reset-password",
    element: <ResetPassword/>,
  },
  {
    path: "/PhoneForgot",
    element: <PhoneForgot/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
   <GoogleOAuthProvider clientId="447909669027-dpct81pbd6v051eq2s4hmmdhr25isv9j.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
