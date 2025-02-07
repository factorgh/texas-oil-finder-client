import { Badge, Button, Card, Form, Input, message } from "antd";
import { useEffect, useState } from "react";

const Profile = () => {
  const [form] = Form.useForm();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch user data from localStorage or API
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      form.setFieldsValue(storedUser); // Pre-fill form with user data
    }
  }, [form]);

  const handleUpdate = async (values) => {
    try {
      setLoading(true);
      console.log("Updated values:", values);

      // Simulate API update request
      setTimeout(() => {
        setUser(values);
        localStorage.setItem("user", JSON.stringify(values));
        message.success("Profile updated successfully!");
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.log(error);
      message.error("Failed to update profile.");
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-lg shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Profile
        </h2>

        {user && (
          <div className="flex flex-col items-center">
            <div className="text-lg font-semibold">{user.username}</div>
            <div className="text-gray-600">{user.email}</div>
            <Badge
              count={user.is_subscribed ? "Subscribed" : "Not Subscribed"}
              style={{
                backgroundColor: user.is_subscribed ? "#52c41a" : "#ff4d4f",
                marginTop: "10px",
              }}
            />
          </div>
        )}

        <Form
          form={form}
          layout="vertical"
          className="mt-6"
          onFinish={handleUpdate}
        >
          <Form.Item label="Username" name="username">
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input type="email" />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input.Password />
          </Form.Item>

          <Button
            type="primary"
            className="w-full mt-3"
            htmlType="submit"
            loading={loading}
          >
            Update Profile
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Profile;
