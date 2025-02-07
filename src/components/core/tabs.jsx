import { DollarSign, FileText, Home, Layers, Search, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("home");

  const filter = [
    { name: "Home", value: "home", icon: <Home /> },
    { name: "Permits", value: "permits", icon: <FileText /> },
    { name: "Operator", value: "operator", icon: <User /> },
    { name: "Leases", value: "leases", icon: <Layers /> },
    { name: "Pricing", value: "pricing", icon: <DollarSign /> },
    { name: "Search", value: "search", icon: <Search /> },
  ];

  return (
    <div className="-mt-8 p-4 bg-blue-100 rounded-lg shadow-lg grid grid-cols-2 lg:grid-cols-6 2xl:grid-cols-5 items-center gap-4">
      {filter.map((item) => (
        <Link
          to={`/${item.value}`}
          key={item.value}
          onClick={() => {
            setActiveTab(item.value);
          }}
          className={`flex  items-center justify-center gap-1 cursor-pointer p-2 transition-all duration-300 ${
            activeTab === item.value
              ? "border-2 border-blue-500 bg-blue-200 text-blue-900 rounded-lg"
              : "text-gray-600 hover:text-blue-500"
          }`}
        >
          <div className="text-2xl">{item.icon}</div>
          {/* {activeTab === item.value && ( */}
          <span className="text-sm font-semibold">{item.name}</span>
          {/* )} */}
        </Link>
      ))}
    </div>
  );
};

export default Tabs;
