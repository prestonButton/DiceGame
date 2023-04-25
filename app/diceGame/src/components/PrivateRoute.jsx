import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function PrivateRoute({ element: Component, ...rest }) {
  const [cookies] = useCookies(["access_token"]);

  return (
    <Route
      {...rest}
      element={cookies.access_token ? <Component /> : <Navigate to="/login" />}
    />
  );
}

export default PrivateRoute;
