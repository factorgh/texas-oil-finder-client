import { Button, Card, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const rules = [{ required: true, message: "required" }];
  const onFinish = async (values) => {
    try {
      console.log("Success:", values);
      const res = await login(values);
      console.log("Login successful:", res);
      // Store the token and user in local storage
      const { token, user } = res;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", true);
      navigate("/");
      message.success("You have logged in successfully!");
    } catch (error) {
      message.error("Failed to login. Please try again.", error.message);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className=" w-[400px] border border-gray-300 shadow-md">
        <h2 className="text-3xl font-bold text-center mb-3 text-blue-900">
          Login
        </h2>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item label="Username" name="username" rules={rules}>
            <Input
              type="text"
              className="h-10"
              placeholder="Enter your username"
            />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={rules}>
            <Input.Password
              className="h-10"
              placeholder="Please enter your password"
            />
          </Form.Item>
          <Form.Item label=" ">
            <Button type="primary" className="w-full" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <p className="text-center mt-3">
          Don&apos; have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-500 cursor-pointer hover:text-blue-900"
          >
            Register Now
          </span>
        </p>
      </Card>
    </div>
  );
};

export default LoginPage;
