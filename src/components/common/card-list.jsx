/* eslint-disable react/prop-types */
import { Card, Descriptions, Divider } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const MyCardWithDescription = ({ title }) => {
  const [summaryData, setSummaryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSummaryData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://127.0.0.1:8000/summary");
      console.log(res.data);
      setSummaryData(res.data);
    } catch (err) {
      console.error(err.message);
      setError("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSummaryData();
  }, []);

  return (
    <Card
      style={{
        width: "100%",
        height: "600px",
        borderRadius: "8px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        padding: "0px",
      }}
      title={
        <div
          style={{
            fontWeight: "bold",
            fontSize: "16px",
            borderRadius: "4px",
          }}
        >
          {title}
        </div>
      }
    >
      {error && <div style={{ color: "red" }}>{error}</div>}

      <div style={{ marginBottom: "16px" }}>
        <Descriptions bordered column={1} loading={isLoading}>
          <Descriptions.Item label="Producing Leases">
            <span className="text-blue-800 text-xl hover:text-blue-900">
              {summaryData.total_leases || "N/A"}
            </span>
          </Descriptions.Item>
          <Descriptions.Item label="Producing Operators">
            <span className="text-blue-800 text-xl hover:text-900">
              {summaryData.total_operators || "N/A"}
            </span>
          </Descriptions.Item>
          <Descriptions.Item label="Drilled Permits">
            <span className="text-blue-800 text-xl hover:text-900">
              {summaryData.total_permits || "N/A"}
            </span>
          </Descriptions.Item>
          <Descriptions.Item label="BBLS of Oil Produced in Jul 2024">
            <span className="text-blue-800 text-xl hover:text-900">
              {summaryData.bbsl_of_oil || "N/A"}
            </span>
          </Descriptions.Item>
          <Descriptions.Item label="MCF of Gas Produced in Jul 2024">
            <span className="text-blue-800 text-xl hover:text-900">
              {summaryData.mcf_of_gas || "N/A"}
            </span>
          </Descriptions.Item>
        </Descriptions>
        <Divider />
      </div>
    </Card>
  );
};

export default MyCardWithDescription;
