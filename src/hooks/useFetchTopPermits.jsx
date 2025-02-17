import { useState, useEffect } from "react";

import { axiosInstance } from "../services/auth";

const useFetchTopPermits = () => {
  const [counties, setCounties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCounties = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get("/counties/top-permits/");

      console.log(res.data);
      setCounties(res.data);
    } catch (err) {
      console.error(err.message);
      setError("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCounties();
  }, []);

  return { counties, isLoading, error };
};

export default useFetchTopPermits;
