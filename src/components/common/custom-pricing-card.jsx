/* eslint-disable react/prop-types */
import { Button, Divider } from "antd";
import { CheckCircle, XCircle } from "lucide-react";

const PricingCard = ({
  title,
  price,
  items,
  height = "h-auto",
  handleSubscribe,
}) => {
  return (
    <div
      className={`border-2 border-blue-200 w-[350px] rounded-lg px-6 py-10 shadow-xl ${height} hover:shadow-lg transition-shadow duration-300 flex flex-col items-start bg-white`}
    >
      <h3 className="text-xl font-semibold text-blue-800">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mt-2">${price}/month</p>

      <Button
        type="primary"
        className="my-5 w-full p-5 bg-blue-600 hover:bg-blue-700"
        onClick={() => handleSubscribe(price)}
      >
        Get Started
      </Button>
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
