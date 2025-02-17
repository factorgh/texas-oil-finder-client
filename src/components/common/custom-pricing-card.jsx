/* eslint-disable react/prop-types */
import { Button, Divider, Tag } from "antd";
import { CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PricingCard = ({
  title,
  price,
  items,
  height = "h-auto",
  handleSubscribe,
}) => {
  const subscription_status = localStorage.getItem("subscription_status");
  const is_subscribed = subscription_status === "active";
  const isLog = localStorage.getItem("isLoggedIn");
  const isLoggedIn = isLog === "true";
  const navigate = useNavigate();
  const handleSignUp = () => navigate("/register");
  return (
    <div
      className={`border-2 border-blue-200 w-[350px] rounded-lg px-6 py-10 shadow-xl ${height} hover:shadow-lg transition-shadow duration-300 flex flex-col items-start bg-white`}
    >
      <div className="flex items-center justify-end mb-2">
        {is_subscribed ? <Tag color="blue">Subscribed</Tag> : null}
      </div>

      <h3 className="text-xl font-semibold text-blue-800">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mt-2">${price}/month</p>

      {isLoggedIn ? (
        <Button
          disabled={is_subscribed}
          type="primary"
          className="my-5 w-full p-5 bg-blue-600 hover:bg-blue-500 hover:text-gray-100"
          onClick={() => handleSubscribe(price)}
        >
          Get Started
        </Button>
      ) : (
        <Button
          disabled={is_subscribed}
          type="primary"
          className="my-5 w-full p-5 bg-blue-600 hover:bg-blue-500 hover:text-gray-100"
          onClick={() => handleSignUp()}
        >
          Sign Up
        </Button>
      )}
      <Divider>
        <span className="text-gray-600">Features Included</span>
      </Divider>
      <ul className="mt-4 space-y-3 ">
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-3">
            {item.included ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500" />
            )}
            <span
              className={`text-sm font-medium ${
                item.included ? "text-gray-700" : "text-gray-400 line-through"
              }`}
            >
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PricingCard;
