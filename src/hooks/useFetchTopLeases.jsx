import { useState, useEffect } from "react";
import axios from "axios";

const useFetchTopLeases = () => {
  const [counties, setCounties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCounties = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://127.0.0.1:8000/counties/leases/");
      console.log(res.data.data);
      console.log("Counties fetched:", res);
      console.log(res.data.data);
      const strippedCounties = res.data.map((item) =>
        item.name.replace(/\s*County$/, "")
      );
      console.log(strippedCounties);
      setCounties(strippedCounties);
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

export default useFetchTopLeases;
