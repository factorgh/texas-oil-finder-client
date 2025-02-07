import { Button } from "antd";
import { useEffect, useState } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { Link } from "react-router-dom";

// import SignOutButton from "./SignOutButton";

const Header = () => {
  //   const { isLoggedIn } = useAppContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">Texas + Oil + Finder.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                to="/profile"
              >
                My Profile
              </Link>

              <Button type="default" onClick={handleLogout}>
                Sign Out
              </Button>
            </>
          ) : (
            <div className="flex items-center space-x-4 bg-transparent">
              <AnchorLink
                href="#subscriptions"
                className="flex items-center px-6 py-2 text-blue-600 font-bold bg-white rounded-lg shadow-md hover:bg-gray-100 transition-all"
              >
                Get Started
              </AnchorLink>

              <div className="h-6 w-px bg-white" />

              <Link to="/login">
                <span className="flex items-center px-6 py-2 text-white font-bold rounded-lg hover:bg-white/10 transition-all">
                  Sign In
                </span>
              </Link>
            </div>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
