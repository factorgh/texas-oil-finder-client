import { useState } from "react";
import { Table, Pagination, Spin, Input } from "antd";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ITEMS_PER_PAGE = 50;

const fetchLeases = async ({ queryKey }) => {
  const [, page, countyId, searchTerm] = queryKey;

  const response = await axios.get("http://localhost:8000/leases/", {
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
  const [searchTerm, setSearchTerm] = useState("");
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
        <h3 className="flex items-center">
          <ArrowLeft
            onClick={() => navigate(-1)}
            className="text-[#717171] mr-2 cursor-pointer"
            size={20}
          />
          <span className="text-blue-500 text-xl">Leases in {county}</span>
        </h3>
        <Input.Search
          placeholder="Search Leases by name ..."
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
                title: "Lease Number",
                dataIndex: "lease_number", // Map this to your data field
                key: "lease_number",
                render: (text) => <span>{text || 0}</span>, // Show "N/A" if the value is empty
              },
              {
                title: "Lease Name",
                dataIndex: "lease_name",
                key: "lease_name",
                render: (text) => <span>{text || "N/A"}</span>, // Show "N/A" if the value is empty
              },
              {
                title: "Operator Name",
                dataIndex: "operator_name",
                key: "operator_name",
                render: (text) => <span>{text || "N/A"}</span>, // Show "N/A" if the value is empty
              },
            ]}
            dataSource={data?.leases || []}
            rowKey="id"
            pagination={false}
            rowClassName={() => "text-blue-500 text-[12px] py-1"}
          />

          {/* 🔄 Pagination (Always Visible) */}
          <div className="flex justify-center mt-4">
            <Pagination
              current={currentPage}
              total={totalLeases} // ✅ Ensure correct total count
              pageSize={ITEMS_PER_PAGE}
              onChange={(page) => {
                console.log("Navigating to page:", page); // Debugging
                setCurrentPage(page);
              }}
              showSizeChanger={false}
              hideOnSinglePage={totalLeases <= ITEMS_PER_PAGE} // ✅ Only hide if total is <= 1 page
            />
          </div>
        </>
      )}
    </div>
  );
};

export default LeaseDetail;
