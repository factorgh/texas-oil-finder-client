import axios from "axios";
const token = localStorage.getItem("token");
console.log(token);

if (!token) {
  console.error("No token found, user not authenticated");
}
// const baseURL = import.meta.env.VITE_API_URL;
// "https://texasapi.adroit360.com",
// https://texasapi.adroit360.com
export const axiosInstance = axios.create({
  baseURL: "https://texasapi.adroit360.com",
  headers: {
    Authorization: `Bearer ${token} `,
  },
});

export const login = async (values) => {
  const formData = new URLSearchParams();
  formData.append("username", values.username);
  formData.append("password", values.password);

  const response = await axiosInstance.post("/auth/token/", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data;
};

export const register = async (payload) => {
  const { data } = await axiosInstance.post("/auth/", payload);
  return data;
};

export const getUserDetails = async () => {
  const { data } = await axiosInstance.get("/auth/user/details");
  return data;
};

// Stripe service

export const createCheckoutSession = async (userId, price) => {
  if (!userId || !price) {
    throw new Error("Invalid user or price");
  }
  const updatedUserId = Number(userId);

  try {
    const response = await axiosInstance.post("/create-checkout-session/", {
      user_id: updatedUserId,
      price: price,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
};

export const getUserSubscriptionStatus = async (userId) => {
  if (!userId) {
    throw new Error("Invalid user");
  }

  try {
    const updatedUserId = Number(userId);
    const response = await axiosInstance.get(
      `/subscription_status/${updatedUserId}/`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting user subscription status:", error);
    throw error;
  }
};

// Handle password changes
export const updateUserProfile = async (username, password) => {
  if (!username || !password) {
    throw new Error("Invalid username or password");
  }

  try {
    const response = await axiosInstance.put("/user/update/", {
      username: username,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

export const updatePassword = async (current_password, new_password) => {
  try {
    const response = await axiosInstance.put("/user/change-password/", {
      current_password: current_password,
      new_password: new_password,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const response = await axiosInstance.get(`/user/${userId}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const deleteUserProfile = async (userId) => {
  try {
    const response = await axiosInstance.delete(`/user/${userId}/`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user profile:", error);
    throw error;
  }
};

// Billing history
export const getBillingHistory = async (userId) => {
  try {
    const response = await axiosInstance.get(`/billing/history/${userId}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching subscription history:", error);
    throw error;
  }
};

export const getBillingDueDate = async (userId) => {
  try {
    const response = await axiosInstance.get(`/billing/due-date/${userId}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching billing due date:", error);
    throw error;
  }
};
