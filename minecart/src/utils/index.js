import { Navigate } from "react-router-dom";

export const isLoggedIn = () => {
    const accessToken = getAccessToken();
    return !!accessToken;
  };

export const getAccessToken = () => {
    const data = localStorage.getItem("accessToken");
    return data
  };

  export const getRegistrationData = () => {
    return JSON.parse(localStorage.getItem("Registration"));
  };

export const LoginedIn = ({ children }) => {
    return !isLoggedIn() ? children : <Navigate to="/" replace />;
  };


  