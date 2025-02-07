import { Card, Divider, List, Skeleton } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";

const HighestCounty = () => {
  const [highestCounty, setHighestCounty] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchHighestCounty = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://127.0.0.1:8000/counties/");
      console.log(res.data);
      setHighestCounty(res.data);
    } catch (err) {
      console.error(err.message);
      setError("Failed to load data");
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
    navigate("/counties/oil-gas");
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
            fontWeight: "normal",
            fontSize: "16px",
            borderRadius: "4px",
          }}
        >
          {highestCounty.length} Highest Producing Counties in Texas
        </div>
      }
    >
      {error && <div style={{ color: "red" }}>{error}</div>}
      <InfiniteScroll
        dataLength={highestCounty.length}
        hasMore={highestCounty.length < 50}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          size="small"
          style={{
            height: 800,
            borderRadius: "8px",
          }}
          loading={isLoading}
          dataSource={highestCounty}
          renderItem={(item, index) => (
            <List.Item
              onClick={() => handleClick(item)}
              style={{
                padding: "10px",
                backgroundColor: index % 2 === 0 ? "#fafafa" : "#fff",
                borderRadius: "4px",
                marginBottom: "8px",
                cursor: "pointer",
              }}
            >
              <div
                className="text-[#8884d8] hover:text-[#4F359B]"
                style={{
                  // fontWeight: "bold",
                  fontSize: "16px",
                  // color: "#4F359B",
                }}
              >
                {item.name}
              </div>
              <div>{item.county}</div>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </Card>
  );
};

export default HighestCounty;
