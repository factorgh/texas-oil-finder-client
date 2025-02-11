import { Badge, Button, Card, Form, Input, Tabs, message } from "antd";
import { useEffect, useState } from "react";
import {
  getUserProfile,
  updatePassword,
  updateUserProfile,
} from "../services/auth";

const Profile = () => {
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const isSubscribed = JSON.parse(localStorage.getItem("is_subscribed"));
  const subscriptionStatus = localStorage.getItem("subscription_status");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUserId = localStorage.getItem("user");
        if (!storedUserId) return; // Prevent parsing null

        const userId = JSON.parse(storedUserId);
        const storedUser = await getUserProfile(userId);
        console.log("Fetched user profile:", storedUser);

        if (storedUser) {
          setUser(storedUser);
          form.setFieldsValue({
            username: storedUser.username,
            email: storedUser.email,
          });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUser();
  }, [form]); // Dependencies: `form`

  const handleUpdateProfile = async (values) => {
    try {
      setLoading(true);
      console.log("Updating profile:", values);
      await updateUserProfile(values.username, values.email);
      // Simulate API request
      setTimeout(() => {
        setUser({ ...user, ...values });

        localStorage.setItem("user", JSON.stringify({ ...user, ...values }));
        message.success("Profile updated successfully!");
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.log(error);
      message.error("Failed to update profile.");
      setLoading(false);
    }
  };

  const handleChangePassword = async (values) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error("Passwords do not match!");
      return;
    }

    try {
      setPasswordLoading(true);
      console.log("Changing password:", values);

      // Simulate API request
      const response = await updatePassword(
        values.currentPassword,
        values.newPassword
      );
      console.log(response);
      message.success("Password changed successfully!");
      passwordForm.resetFields();
      setPasswordLoading(false);
    } catch (error) {
      console.log(error);
      message.error("Failed to change password.");
      setPasswordLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-lg shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Profile
        </h2>

        {user && (
          <div className="flex flex-col items-center mb-4">
            <div className="text-lg font-semibold">{user.username}</div>
            <div className="text-gray-600">{user.email}</div>
            <Badge
              count={
                isSubscribed && subscriptionStatus === "active"
                  ? "Subscribed"
                  : "Not Subscribed"
              }
              style={{
                backgroundColor: user.is_subscribed ? "#52c41a" : "#ff4d4f",
                marginTop: "10px",
              }}
            />
          </div>
        )}

        <Tabs defaultActiveKey="1" centered>
          {/* Profile Update Tab */}
          <Tabs.TabPane tab="Profile Info" key="1">
            <Form form={form} layout="vertical" onFinish={handleUpdateProfile}>
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: "Username is required!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Email is required!" },
                  { type: "email", message: "Invalid email format!" },
                ]}
              >
                <Input type="email" />
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
          </Tabs.TabPane>

          {/* Change Password Tab */}
          <Tabs.TabPane tab="Change Password" key="2">
            <Form
              form={passwordForm}
              layout="vertical"
              onFinish={handleChangePassword}
            >
              <Form.Item
                label="Current Password"
                name="currentPassword"
                rules={[
                  { required: true, message: "Current password is required!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="New Password"
                name="newPassword"
                rules={[
                  { required: true, message: "New password is required!" },
                  {
                    min: 6,
                    message: "Password must be at least 6 characters!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                rules={[
                  { required: true, message: "Confirm password is required!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Button
                type="primary"
                className="w-full mt-3"
                htmlType="submit"
                loading={passwordLoading}
              >
                Change Password
              </Button>
            </Form>
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Profile;
