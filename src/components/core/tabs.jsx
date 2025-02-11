import { FileText, Home, Layers, Search, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserSubscriptionStatus } from "../../services/auth";

const Tabs = () => {
  const isSub = JSON.parse(localStorage.getItem("is_subscribed") || "false"); // ✅ Ensure boolean value
  const [isSubscribed, setIsSubscribed] = useState(isSub);
  const [subStatus, setSubStatus] = useState("");
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "home"
  );

  const userId = localStorage.getItem("user");

  // Fetch subscription status
  useEffect(() => {
    async function checkSubscription() {
      if (!userId) return;
      try {
        const data = await getUserSubscriptionStatus(userId);
        console.log("Subscription status:", data);
        setIsSubscribed(!!data.is_subscribed); // ✅ Ensure boolean value
        setSubStatus(data.subscription_status || "inactive"); // ✅ Default value
      } catch (error) {
        console.error("Failed to fetch subscription status:", error);
      }
    }
    checkSubscription();
  }, [userId]);

  useEffect(() => {
    localStorage.setItem("is_subscribed", isSubscribed);
  }, [isSubscribed]);

  // Save active tab to localStorage
  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
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
        const isDisabled =
          !isSubscribed &&
          [
            "unpaid",
            "trialing",
            "past_due",
            "canceled",
            "inactive",
            "incomplete",
            "incomplete_expired",
          ].includes(subStatus) &&
          item.value !== "home";
        console.log(`Tab: ${item.value}, Disabled:`, isDisabled);

        return (
          <Link
            to={isDisabled ? "#" : `/${item.value}`}
            key={item.value}
            onClick={(e) => {
              if (isDisabled) {
                e.preventDefault();
                return;
              }
              setActiveTab(item.value);
            }}
            className={`flex items-center justify-center gap-1 p-2 transition-all duration-300 rounded-lg ${
              isDisabled
                ? "opacity-50 cursor-not-allowed pointer-events-none" // ✅ Prevents clicks
                : activeTab === item.value
                ? "border-2 border-blue-500 bg-blue-200 text-blue-900"
                : "text-gray-600 hover:text-blue-500"
            }`}
            role={isDisabled ? "button" : undefined} // ✅ Accessibility fix
            aria-disabled={isDisabled} // ✅ Screen reader support
            tabIndex={isDisabled ? -1 : undefined} // ✅ Prevent focus
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
