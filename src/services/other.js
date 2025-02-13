import { axiosInstance } from "./auth";

export const getAllPermits = async () => {
  try {
    const response = await axiosInstance.get(`/permits`);
    return response.data;
  } catch (error) {
    console.error("Error fetching permits:", error);
    throw error;
  }
};
export const getAllLeases = async () => {
  try {
    const response = await axiosInstance.get(`/leases`);
    return response.data;
  } catch (error) {
    console.error("Error fetching leases:", error);
    throw error;
  }
};
export const getAllOperators = async () => {
  try {
    const response = await axiosInstance.get(`/operators`);
    return response.data;
  } catch (error) {
    console.error("Error fetching operators:", error);
    throw error;
  }
};
