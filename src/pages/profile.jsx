import {
  CalendarOutlined,
  CreditCardOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, Button, Form, Input, Layout, Menu, message, Table } from "antd";
import { useEffect, useState } from "react";
import {
  getBillingDueDate,
  getBillingHistory,
  getUserProfile,
  updatePassword,
  updateUserProfile,
} from "../services/auth";
import moment from "moment";

const { Sider, Content } = Layout;

const Profile = () => {
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1");
  const [billingHistory, setBillingHistory] = useState([]);
  const storedUserId = localStorage.getItem("user");
  const [billingDueDate, setBillingDueDate] = useState(null);
  const subscriptionStatus = localStorage.getItem("subscription_status");

  useEffect(() => {
    const getBilling = async () => {
      try {
        const data = await getBillingHistory(storedUserId);
        setBillingHistory(data);
      } catch (error) {
        console.log(error);
      }
    };

    getBilling();
  }, [storedUserId]);
  // Fetch user details

  useEffect(() => {
    const getBillingDue = async () => {
      try {
        const data = await getBillingDueDate(storedUserId);
        console.log(data.next_due_date);
        setBillingDueDate(data.next_due_date);
      } catch (error) {
        console.log(error);
      }
    };

    getBillingDue();
  }, [storedUserId]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUserId = localStorage.getItem("user");
        if (!storedUserId) return;

        const userId = JSON.parse(storedUserId);
        const storedUser = await getUserProfile(userId);

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
  }, [form]);

  // Update Profile
  const handleUpdateProfile = async (values) => {
    try {
      setLoading(true);
      await updateUserProfile(values.username, values.email);
      message.success("Profile updated successfully!");
      setLoading(false);
    } catch (error) {
      console.log(error);
      message.error("Failed to update profile.");
      setLoading(false);
    }
  };

  // Change Password
  const handleChangePassword = async (values) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error("Passwords do not match!");
      return;
    }

    try {
      setPasswordLoading(true);
      await updatePassword(values.currentPassword, values.newPassword);
      message.success("Password changed successfully!");
      passwordForm.resetFields();
      setPasswordLoading(false);
    } catch (error) {
      console.log(error);
      message.error("Failed to change password.");
      setPasswordLoading(false);
    }
  };
  const columns = [
    {
      title: "Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => (
        <span>{moment(text).format("MMMM Do YYYY, h:mm A")}</span>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text) => (
        <span>
          <Badge status="success">${text}</Badge>
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <span>
          <a href="#">Receipt</a>
        </span>
      ),
    },
  ];

  return (
    <Layout className="min-h-screen">
      {/* Sidebar */}
      <Sider width={250} className="bg-white border border-slate-100">
        <div className="text-blue-800 text-center py-5 text-xl font-bold">
          User Profile
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          selectedKeys={[selectedKey]}
          onClick={({ key }) => setSelectedKey(key)}
        >
          <Menu.Item key="1" icon={<UserOutlined />}>
            Profile Info
          </Menu.Item>
          <Menu.Item key="2" icon={<LockOutlined />}>
            Change Password
          </Menu.Item>
          <Menu.Item key="3" icon={<CreditCardOutlined />}>
            Billing History
          </Menu.Item>
          <Menu.Item key="4" icon={<CalendarOutlined />}>
            Subscription Details
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Main Content */}
      <Layout className="p-6 bg-white">
        <Content className="max-w-7xl w-full px-10 shaow-lg drop-shadow-md">
          <div className="shadow-lg rounded-lg p-6">
            {/* Profile Info */}
            {selectedKey === "1" && (
              <>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Profile Info
                </h2>
                {user && (
                  <div className="flex flex-col items-center mb-4">
                    <div className="text-lg font-semibold">{user.username}</div>
                    <div className="text-gray-600">{user.email}</div>
                    <Badge
                      count={
                        user.is_subscribed ? "Subscribed" : "Not Subscribed"
                      }
                      style={{
                        backgroundColor: user.is_subscribed
                          ? "#52c41a"
                          : "#ff4d4f",
                        marginTop: "10px",
                      }}
                    />
                  </div>
                )}
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleUpdateProfile}
                >
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                      { required: true, message: "Username is required!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Email is required!" },
                      { type: "email", message: "Invalid email!" },
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
              </>
            )}

            {/* Change Password */}
            {selectedKey === "2" && (
              <>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Change Password
                </h2>
                <Form
                  form={passwordForm}
                  layout="vertical"
                  onFinish={handleChangePassword}
                >
                  <Form.Item
                    label="Current Password"
                    name="currentPassword"
                    rules={[
                      {
                        required: true,
                        message: "Current password is required!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    label="New Password"
                    name="newPassword"
                    rules={[
                      { required: true, message: "New password is required!" },
                      { min: 6, message: "At least 6 characters!" },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    rules={[
                      {
                        required: true,
                        message: "Confirm password is required!",
                      },
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
              </>
            )}

            {/* Billing History */}
            {selectedKey === "3" && (
              <>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Billing History
                </h2>
                <p className="mb-3">
                  Here you will see all your billing transactions.
                </p>
                {/* Replace with actual billing data */}
                <Table dataSource={billingHistory} columns={columns} />
              </>
            )}

            {/* Subscription Details */}
            {selectedKey === "4" && (
              <>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Subscription Details
                </h2>
                <p>Your subscription information:</p>
                <ul className="mt-3">
                  <li>
                    Plan: <strong>Premium</strong>
                  </li>
                  <li>
                    Status: <strong>{subscriptionStatus}</strong>
                  </li>
                  <li>
                    Next Billing Date: <strong>{billingDueDate}</strong>
                  </li>
                </ul>
              </>
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Profile;
