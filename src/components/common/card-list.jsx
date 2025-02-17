/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { axiosInstance } from "../../services/auth";

const MyCardWithDescription = ({ title }) => {
  const [summaryData, setSummaryData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSummaryData();
  }, []);

  const fetchSummaryData = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get("/summary");
      setSummaryData(res.data);
    } catch (err) {
      setError("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg border p-6 w-full max-w-2xl mx-auto flex-1">
      {/* Card Header */}
      <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
        {title}
      </h2>

      {/* Error Message */}
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

      {/* Loading State */}
      {isLoading ? (
        <p className="text-gray-500 text-center mt-4">Loading...</p>
      ) : (
        <div className="mt-4 space-y-3">
          <InfoItem label="Producing Leases" value={summaryData.total_leases} />
          <InfoItem
            label="Producing Operators"
            value={summaryData.total_operators}
          />
          <InfoItem label="Drilled Permits" value={summaryData.total_permits} />
          <InfoItem
            label="BBLS of Oil Produced in Jul 2024"
            value={summaryData.bbsl_of_oil}
          />
          <InfoItem
            label="MCF of Gas Produced in Jul 2024"
            value={summaryData.mcf_of_gas}
          />
        </div>
      )}
    </div>
  );
};

// Reusable Component for Displaying Info Items
const InfoItem = ({ label, value }) => {
  return (
    <div className="flex justify-between text-sm border-b pb-2">
      <span className="text-gray-600">{label}</span>
      <span className="text-blue-700 font-semibold">{value || "N/A"}</span>
    </div>
  );
};

export default MyCardWithDescription;
