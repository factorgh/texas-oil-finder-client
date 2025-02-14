import Lottie from "lottie-react";
import lottieJson from "../../assets/payment.json";
import { createCheckoutSession } from "../../services/auth";
import PricingCard from "../common/custom-pricing-card";

const blackItems = [
  { text: "Advanced Searching", included: true },
  { text: "Map Based Searching", included: true },
  { text: "Production By Lease", included: true },
  { text: "Production By Operator", included: true },
  { text: "Well Logs", included: true },
  { text: "Drilling Permits", included: true },
  { text: "Well Completion Information", included: true },
  { text: "Well Header Information", included: true },
  { text: "Data Exporting", included: true },
];

const SubscriptionPlans = () => {
  const userId = localStorage.getItem("user");

  const handleSubscribe = async (price) => {
    try {
      const response = await createCheckoutSession(userId, price);
      console.log("Stripe Response:", response); // ✅ Check the full response

      if (response.session_url) {
        console.log("Redirecting to:", response.session_url);
        window.open(response.session_url, "_blank"); // ✅ Open in a new tab
      } else {
        console.error("Missing session URL:", response);
      }
    } catch (error) {
      console.error("Subscription error:", error);
    }
  };

  return (
    <div className="flex justify-center px-4 sm:px-6 lg:px-8 mt-5">
      <div className="w-full grid grid-cols-1 md:grid-cols-2  rounded-lg overflow-hidden">
        {/* Left Section */}
        <div className="flex flex-col justify-center items-center p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
            Unlock Premium Benefits
          </h2>
          <p className="text-sm md:text-base text-gray-700 text-center mt-2">
            Get exclusive access to premium features tailored to your needs.
            Subscribe to this perfect plan and elevate your experience today.
          </p>
          <div className="w-48 md:w-80 mt-4">
            <Lottie animationData={lottieJson} loop={true} />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-center p-6">
          <PricingCard
            title="Light Crude"
            price={Number(9)}
            items={blackItems}
            height="h-auto md:h-[600px]"
            handleSubscribe={handleSubscribe}
          />
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
