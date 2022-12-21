import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../users/UserContext"

function PrivateRoute({ children }) {
  const { currentUser } = useContext(UserContext);
  
  // console.debug("PrivateRoute", "path=", path, "currentUser=", currentUser);
 
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return currentUser ? children || <Outlet /> : <Navigate to="/login" replace />
}

export default PrivateRoute;