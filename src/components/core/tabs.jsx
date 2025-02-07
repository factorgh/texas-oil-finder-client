import { FileText, Home, Layers, Search, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Tabs = () => {
  const is_subscribed = localStorage.getItem("is_subscribed") === "true";

  // Retrieve last active tab from localStorage, default to "home"
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "home"
  );

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab); // Store active tab on change
  }, [activeTab]);

  const filter = [
    { name: "Home", value: "home", icon: <Home /> },
    { name: "Permits", value: "permits", icon: <FileText /> },
    { name: "Operator", value: "operator", icon: <User /> },
    { name: "Leases", value: "leases", icon: <Layers /> },
    { name: "Search", value: "search", icon: <Search /> },
  ];

  return (
    <div className="-mt-8 p-4 bg-blue-100 rounded-lg shadow-lg grid grid-cols-2 lg:grid-cols-6 2xl:grid-cols-5 items-center gap-4">
      {filter.map((item) => {
        const isDisabled = !is_subscribed && item.value !== "home"; // Disable if not subscribed and not "Home"

        return (
          <Link
            to={isDisabled ? "#" : `/${item.value}`} // Prevent navigation if disabled
            key={item.value}
            onClick={() => {
              if (!isDisabled) {
                setActiveTab(item.value);
                localStorage.setItem("activeTab", item.value); // Save selected tab
              }
            }}
            className={`flex items-center justify-center gap-1 cursor-pointer p-2 transition-all duration-300 ${
              isDisabled
                ? "opacity-50 cursor-not-allowed" // Visually disabled
                : activeTab === item.value
                ? "border-2 border-blue-500 bg-blue-200 text-blue-900 rounded-lg"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            <div className="text-2xl">{item.icon}</div>
            <span className="text-sm font-semibold">{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default Tabs;
