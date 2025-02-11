import { Outlet } from "react-router-dom";
import Header from "./header";
import Hero from "./hero";
import Tabs from "./tabs";

const Layout = () => {
  const isSubscribed = localStorage.getItem("is_subscribed") || false;
  console.log(isSubscribed);

  if (isSubscribed === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <div className="container mx-auto">
        <Tabs />
      </div>
      <div className="container mx-auto py-10 flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
