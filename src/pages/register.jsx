import { useState } from "react";
import { Button, Card, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { createCheckoutSession, register } from "../services/auth";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loading state

  const rules = [{ required: true, message: "required" }];

  const onFinish = async (values) => {
    setLoading(true); // Start loading
    try {
      console.log("Success:", values);
      const res = await register(values);
      console.log("Registration successful:", res);
      const { token, user_id } = res;

      localStorage.clear();
      localStorage.setItem("token", token);
      localStorage.setItem("user", user_id);
      localStorage.setItem("isLoggedIn", true);

      message.success("Registration successful! Redirecting to payment...");
      console.log(user_id);
      await handleSubscribe(9, user_id); // Ensure price is a number
    } catch (error) {
      console.error("Error registering:", error);
      message.error(
        error?.response?.data?.message ||
          "Failed to register. Please try again."
      );
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleSubscribe = async (price, userId) => {
    try {
      console.log("Opening a new tab...");
      const newTab = window.open("", "_blank"); // Open a blank tab first

      const response = await createCheckoutSession(userId, price);
      console.log("Stripe Response:", response);

      if (response.session_url) {
        console.log("Redirecting to:", response.session_url);
        newTab.location.href = response.session_url; // Change URL of the new tab
      } else {
        newTab.close(); // Close tab if no session URL
        console.error("Missing session URL:", response);
        message.error("Subscription session could not be created.");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      message.error("Failed to start subscription. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[400px] border border-gray-300 shadow-md">
        <h2 className="text-3xl font-bold text-center mb-3 text-blue-900">
          Register
        </h2>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item label="Username" name="username" rules={rules}>
            <Input className="h-10" placeholder="Enter your username" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={rules}>
            <Input
              type="email"
              className="h-10"
              placeholder="Enter your email"
            />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={rules}>
            <Input.Password
              className="h-10"
              placeholder="Enter your password"
            />
          </Form.Item>
          <Form.Item label=" ">
            <Button
              type="primary"
              className="w-full"
              htmlType="submit"
              loading={loading}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </Form.Item>
        </Form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 cursor-pointer hover:text-blue-900"
          >
            Go back to login
          </span>
        </p>
      </Card>
    </div>
  );
};

export default RegisterPage;
