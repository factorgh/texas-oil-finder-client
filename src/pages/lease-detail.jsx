import { useState } from "react";
import { Table, Pagination, Spin, Input, Button } from "antd";
import { useQuery } from "@tanstack/react-query";

import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SearchOutlined } from "@ant-design/icons";
import { axiosInstance } from "../services/auth";
const ITEMS_PER_PAGE = 50;

const fetchLeases = async ({ queryKey }) => {
  const [, page, countyId, searchTerm] = queryKey;

  const response = await axiosInstance.get("/leases/", {
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
const LeaseDetail = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ Used for actual search request
  const [searchInput, setSearchInput] = useState(""); // ✅ Used for user input

  const location = useLocation();
  const navigate = useNavigate();
  const { id, county } = location.state || {};
  console.log(id, county);

  const { data, isLoading } = useQuery({
    queryKey: ["leases", currentPage, id, searchTerm],
    queryFn: fetchLeases,
    keepPreviousData: true,
    enabled: !!id,
  });

  const totalLeases = data?.total ?? 0;

  return (
    <div style={{ padding: 20 }}>
      {/* 🔍 Search Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-5">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-all border w-28 p-2 rounded-md backdrop-blur"
          >
            <ArrowLeft size={20} />
            <span className="text-[12px] font-medium">Back</span>
          </button>
          <span className="text-slate-800 text-xl">Leases in {county}</span>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <Input
            placeholder="Search Leases by name ..."
            allowClear
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);

              // ✅ Reset search if input is cleared
              if (e.target.value === "") {
                setSearchTerm(""); // Reset search query
                setCurrentPage(1); // Reset to first page
              }
            }}
            style={{ width: 250 }}
            onPressEnter={() => {
              setSearchTerm(searchInput); // ✅ Trigger API request
              setCurrentPage(1);
            }}
          />
          <Button
            icon={<SearchOutlined />}
            onClick={() => {
              setSearchTerm(searchInput); // ✅ Trigger API request
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
                title: "Lease Number",
                dataIndex: "lease_number",
                key: "lease_number",
                render: (text) => <span>{text || 0}</span>,
              },
              {
                title: "Lease Name",
                dataIndex: "lease_name",
                key: "lease_name",
                render: (text) => <span>{text || "N/A"}</span>,
              },
              {
                title: "Operator Name",
                dataIndex: "operator_name",
                key: "operator_name",
                render: (text) => <span>{text || "N/A"}</span>,
              },
            ]}
            dataSource={data?.leases || []}
            rowKey="id"
            pagination={false}
            rowClassName={() => "text-slate-800 text-[12px] py-1"}
          />

          {/* 🔄 Pagination */}
          <div className="flex justify-center mt-4">
            <Pagination
              current={currentPage}
              total={totalLeases}
              pageSize={ITEMS_PER_PAGE}
              onChange={(page) => {
                console.log("Navigating to page:", page);
                setCurrentPage(page);
              }}
              showSizeChanger={false}
              hideOnSinglePage={totalLeases <= ITEMS_PER_PAGE}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default LeaseDetail;
