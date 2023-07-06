import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
// will remove later
// import { useUserContext } from "../context/user_context";

//rest operator
const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useAuth0();
  //spread operator
  return (
    <Route
      {...rest}
      render={() => {
        return user ? children : <Redirect to="/"></Redirect>;
      }}
    ></Route>
  );
};
export default PrivateRoute;
