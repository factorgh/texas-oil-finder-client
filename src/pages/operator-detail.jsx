import { useState } from "react";
import { Table, Pagination, Spin, Input } from "antd";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ITEMS_PER_PAGE = 50;

const fetchOperators = async ({ queryKey }) => {
  const [, page, countyId, searchTerm] = queryKey;

  const response = await axios.get("http://localhost:8000/operators/", {
    params: {
      county_id: countyId,
      skip: (page - 1) * ITEMS_PER_PAGE,
      limit: ITEMS_PER_PAGE,
      search: searchTerm || "",
    },
  });

  console.log("API Response:", response.data); // ✅ Debugging to check total count

  return response.data;
};

const OperatorDetail = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { id, county } = location.state || {};

  const { data, isLoading } = useQuery({
    queryKey: ["Operators", currentPage, id, searchTerm],
    queryFn: fetchOperators,
    keepPreviousData: true,
    enabled: !!id,
  });

  const totalOperators = data?.total ?? 0; // ✅ Ensure total count is always a number

  return (
    <div style={{ padding: 20 }}>
      {/* 🔍 Search Bar */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="flex items-center">
          <ArrowLeft
            onClick={() => navigate(-1)}
            className="text-[#717171] mr-2 cursor-pointer"
            size={20}
          />
          <span className="text-blue-500 text-xl">Operators in {county}</span>
        </h3>
        <Input.Search
          placeholder="Search Operators..."
          allowClear
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // ✅ Reset to first page on search
          }}
          style={{ width: 250 }}
        />
      </div>

      {isLoading ? (
        <Spin size="medium" />
      ) : (
        <>
          <Table
            columns={[
              {
                title: "Operator Name",
                dataIndex: "operator_name",
                key: "operator_name",
                render: (text) => text || "N/A", // ✅ Show "N/A" if empty
              },
              {
                title: "Operator Number",
                dataIndex: "operator_number",
                key: "operator_number",
                render: (text) => text || 0, // ✅ Show 0 if empty
              },
              {
                title: "Location",
                dataIndex: "location",
                key: "location",
                render: (text) => text || "N/A", // ✅ Show "N/A" if empty
              },
              {
                title: "Leases Number",
                dataIndex: "leases_number",
                key: "leases_number",
                render: (text) => text || 0, // ✅ Show 0 if empty
              },
            ]}
            dataSource={data?.operators || []} // ✅ Fixed key name
            rowKey="id"
            pagination={false}
            rowClassName={() => "text-blue-500 text-[12px] py-1"}
          />
          {/* 🔄 Pagination (Always Visible) */}
          <div className="flex justify-center mt-4">
            <Pagination
              current={currentPage}
              total={totalOperators} // ✅ Ensure correct total count
              pageSize={ITEMS_PER_PAGE}
              onChange={(page) => {
                console.log("Navigating to page:", page); // Debugging
                setCurrentPage(page);
              }}
              showSizeChanger={false}
              hideOnSinglePage={totalOperators <= ITEMS_PER_PAGE} // ✅ Only hide if total is <= 1 page
            />
          </div>
        </>
      )}
    </div>
  );
};

export default OperatorDetail;
