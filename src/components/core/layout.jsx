/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import Header from "./header";
import Hero from "./hero";
import Tabs from "./tabs";

const Layout = ({ children }) => {
  const is_subscribed = localStorage.getItem("is_subscribed") === "true";
  const location = useLocation();

  // List of routes allowed even if the user is not subscribed
  const allowedRoutes = ["/"];

  if (!is_subscribed && !allowedRoutes.includes(location.pathname)) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <div className="container mx-auto">
        <Tabs />
      </div>
      <div className="container mx-auto py-10 flex-1">{children}</div>
    </div>
  );
};

export default Layout;
