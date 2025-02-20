import { useState } from "react";
import { Table, Pagination, Spin, Input, Button } from "antd";
import { useQuery } from "@tanstack/react-query";

import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { axiosInstance } from "../services/auth";
import { SearchOutlined } from "@ant-design/icons";

const ITEMS_PER_PAGE = 50;

const fetchOperators = async ({ queryKey }) => {
  const [, page, countyId, searchTerm] = queryKey;

  const response = await axiosInstance.get("/operators/", {
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
  const [searchInput, setSearchInput] = useState("");
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
    <div className="col-span-5">
      {/* 🔍 Search Bar */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-5">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-all border w-28 p-2 rounded-md backdrop-blur h-12"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Back</span>
          </button>
          <span className="text-slate-800 text-xl">Operators in {county}</span>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <Input
            placeholder="Search by operator name ..."
            allowClear
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              if (e.target.value === "") {
                setSearchTerm("");
                setCurrentPage(1);
              }
            }}
            style={{ width: 250 }}
            onPressEnter={() => {
              setSearchTerm(searchInput);
              setCurrentPage(1);
            }}
          />
          <Button
            icon={<SearchOutlined />}
            onClick={() => {
              setSearchTerm(searchInput);
              setCurrentPage(1);
            }}
          />
        </div>
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
                render: (text) => text || "N/A",
              },
              {
                title: "Operator Number",
                dataIndex: "operator_number",
                key: "operator_number",
                render: (text) => text || 0,
              },
              {
                title: "Location",
                dataIndex: "location",
                key: "location",
                render: (text) => text || "N/A",
              },
              {
                title: "Leases Number",
                dataIndex: "leases_number",
                key: "leases_number",
                render: (text) => text || 0,
              },
            ]}
            dataSource={data?.operators || []}
            rowKey="id"
            pagination={false}
            rowClassName={() => "text-slate-800 text-[12px] py-1"}
          />
          <div className="flex justify-center mt-4">
            <Pagination
              current={currentPage}
              total={totalOperators}
              pageSize={ITEMS_PER_PAGE}
              onChange={(page) => {
                console.log("Navigating to page:", page);
                setCurrentPage(page);
              }}
              showSizeChanger={false}
              hideOnSinglePage={totalOperators <= ITEMS_PER_PAGE}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default OperatorDetail;
