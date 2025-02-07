/* eslint-disable react/prop-types */
import { Card, Divider, List, Skeleton } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";

const TopProducingOperators = ({ title }) => {
  const [highestCounty, setHighestCounty] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // To track error state

  const navigate = useNavigate(false);

  const fetchHighestCounty = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/v1/operator");
      setHighestCounty(res.data);
    } catch (err) {
      console.error(err.message);
      setError("Failed to load data"); // Handle errors
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHighestCounty();
  }, []);

  const handleClick = (item) => {
    // Replace with your desired logic
    console.log("Clicked item:", item);
    navigate("/counties/oil-gas/operator");
  };

  return (
    <Card
      style={{
        width: "100%",
        borderRadius: "8px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      }}
      title={
        <div
          style={{
            padding: "10px 5px",
            fontWeight: "bold",
            fontSize: "16px",
            borderRadius: "4px",
          }}
        >
          {title}
        </div>
      }
    >
      {error && <div style={{ color: "red" }}>{error}</div>}{" "}
      {/* Display error if present */}
      <InfiniteScroll
        dataLength={highestCounty.length}
        hasMore={highestCounty.length < 50}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          style={{
            height: 600,
            borderRadius: "8px",
          }}
          loading={isLoading}
          dataSource={highestCounty}
          renderItem={(item, index) => (
            <List.Item
              onClick={() => handleClick(item)}
              style={{
                padding: "10px", // Adjust padding between items
                backgroundColor: index % 2 === 0 ? "#fafafa" : "#fff",
                borderRadius: "4px",
                marginBottom: "8px",
              }}
            >
              <div className="text-[#8884d8] cursor-pointer hover:text-[#4F359B]">
                {item.name}
              </div>{" "}
              {/* Adjust based on the actual structure of `item` */}
              <div>{item.county}</div>{" "}
              {/* Adjust based on the actual structure of `item` */}
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </Card>
  );
};

export default TopProducingOperators;
