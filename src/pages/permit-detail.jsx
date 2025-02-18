import { useState } from "react";
import { Table, Pagination, Spin, Input } from "antd";
import { useQuery } from "@tanstack/react-query";

import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Tag } from "antd";
import { axiosInstance } from "../services/auth";

const applicationTypeColors = {
  "Re-Enter": "orange",
  Recompletion: "blue",
  "New Drill": "green",
};

const drillTypeColors = {
  Horizontal: "purple",
  Directional: "cyan",
  Vertical: "geekblue",
};

const ITEMS_PER_PAGE = 50;

const fetchPermits = async ({ queryKey }) => {
  const [, page, countyId, searchTerm] = queryKey;

  const response = await axiosInstance.get("/permits/", {
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

const PermitsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { id, county } = location.state || {};

  const { data, isLoading } = useQuery({
    queryKey: ["permits", currentPage, id, searchTerm],
    queryFn: fetchPermits,
    keepPreviousData: true,
    enabled: !!id,
  });

  const totalPermits = data?.total ?? 0; // ✅ Ensure total count is always a number

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
          <span className="text-slate-800 text-xl">Permits in {county}</span>
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
              { title: "API", dataIndex: "api", key: "api" },
              { title: "Well", dataIndex: "well", key: "well" },
              { title: "Operator", dataIndex: "operator", key: "operator" },
              {
                title: "Application Type",
                dataIndex: "application_type",
                key: "application_type",
                render: (type) => (
                  <Tag color={applicationTypeColors[type] || "default"}>
                    {type}
                  </Tag>
                ),
              },
              {
                title: "Drill Type",
                dataIndex: "drill_type",
                key: "drill_type",
                render: (type) => (
                  <Tag color={drillTypeColors[type] || "default"}>{type}</Tag>
                ),
              },
              {
                title: "Submitted Date",
                dataIndex: "submitted",
                key: "submitted",
              },
              {
                title: "Approved Date",
                dataIndex: "approved",
                key: "approved",
              },
            ]}
            dataSource={data?.permits || []}
            rowKey="id"
            pagination={false}
            rowClassName={() => "text-slate-800 text-[12px] py-1"}
          />

          {/* 🔄 Pagination (Always Visible) */}
          <div className="flex justify-center mt-4">
            <Pagination
              current={currentPage}
              total={totalPermits} // ✅ Ensure correct total count
              pageSize={ITEMS_PER_PAGE}
              onChange={(page) => {
                console.log("Navigating to page:", page); // Debugging
                setCurrentPage(page);
              }}
              showSizeChanger={false}
              hideOnSinglePage={totalPermits <= ITEMS_PER_PAGE} // ✅ Only hide if total is <= 1 page
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PermitsPage;
