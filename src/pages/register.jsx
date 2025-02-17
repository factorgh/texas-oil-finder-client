import { Button, Card, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { register } from "../services/auth";

const RegisterPage = () => {
  const navigate = useNavigate();
  const rules = [{ required: true, message: "required" }];
  const onFinish = async (values) => {
    try {
      console.log("Success:", values);
      const res = await register(values);
      console.log("registration successful:", res);
      const { token, userId } = res;
      localStorage.clear();
      localStorage.setItem("token", token);
      localStorage.setItem("user", userId);
      localStorage.setItem("isLoggedIn", true);

      message.success("You have registered successfully!");
      navigate("/login");
    } catch (error) {
      console.log("Error egistering:", error);
      message.error("Failed to register. Please try again.");
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className=" w-[400px] border border-gray-300 shadow-md">
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
