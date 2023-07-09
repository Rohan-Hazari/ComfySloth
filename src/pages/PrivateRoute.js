import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
// will remove later
// import { useUserContext } from "../context/user_context";

//rest operator
const PrivateRoute = ({ children }) => {
  const { user } = useAuth0();
  //spread operator
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};
export default PrivateRoute;
