/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isSubscribed = JSON.parse(
    localStorage.getItem("is_subscribed") || "false"
  );

  if (!isSubscribed) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
