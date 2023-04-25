import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function PrivateRoute({ element: Component, ...rest }) {
  const [cookies] = useCookies(["access_token"]);

  // Check if the path starts with "/game" or "/lobby"
  const isPrivate =
    rest.path.startsWith("/game") || rest.path.startsWith("/lobby");

  return (
    <Route
      {...rest}
      element={
        isPrivate && !cookies.access_token ? (
          <Navigate to="/login" />
        ) : (
          <Component />
        )
      }
    />
  );
}

export default PrivateRoute;
