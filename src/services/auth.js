import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    Authorization: "Bearer YOUR_AUTH_TOKEN",
  },
});

// export const login = async (payload) => {
//   const { data } = await axiosInstance.post("/auth/token/", payload);
//   return data;
// };
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
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/create-checkout-session/",
      {
        user_id: userId,
        price_id: price,
      }
    );
    print(response.json());
    return response.data.session_url;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
};
