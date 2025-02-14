import { Divider } from "antd";
import { useEffect } from "react";
import MyCardWithList from "../components/common/card-list";
import HighestCounty from "../components/common/highest-county-list";
import SubscriptionPlans from "../components/stripe/subscriptions";
import { getUserSubscriptionStatus } from "./../services/auth";
import drillImage from "/drill.jpg";

const HomePage = () => {
  const userId = localStorage.getItem("user");
  useEffect(() => {
    if (!userId) return;

    const checkSubscription = async () => {
      try {
        const data = await getUserSubscriptionStatus(userId);
        localStorage.setItem("is_subscribed", data.is_subscribed);
        localStorage.setItem("subscription_status", data.subscription_status);
      } catch (error) {
        console.error("Error fetching subscription:", error);
      }
    };

    checkSubscription();
  }, [userId]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-gray-50">
        <div className="">
          <img
            className="rounded-md mb-5"
            style={{ width: "100%" }}
            alt="example"
            src={drillImage}
          />
          <MyCardWithList title="Summary Data of Texas" />
        </div>

        <HighestCounty />
      </div>
      <Divider className="mt-10" />
      {/* Subscriptions section */}
      <div id="subscriptions" className="  bg-gray-50 p-5 rounded">
        <div className="flex items-center justify-center mt-10">
          <h3 className="text-3xl font-bold text-[#2B2B2B] mb-3 text-center max-w-md">
            Tailored plan for full access to the platform
          </h3>
        </div>
        <SubscriptionPlans />
      </div>
      <Divider className="mt-10" />
    </div>
  );
};

export default HomePage;
