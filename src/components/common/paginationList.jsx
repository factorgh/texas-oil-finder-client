/* eslint-disable react/prop-types */
import { List, Input, Pagination, Divider } from "antd";
import { useState } from "react";

const PaginatedList = ({ data, title, onItemClick }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Default 10 items per page

  // Filtered data based on search query
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Paginate the filtered data
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div>
      {/* Title and Search Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <h3>{title}</h3>
        <Input
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // Reset to first page when searching
          }}
          style={{ width: 200 }}
        />
      </div>

      {/* List Items */}
      <List
        size="small"
        dataSource={paginatedData}
        renderItem={(item, index) => (
          <List.Item
            onClick={() => onItemClick(item)}
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
              style={{ fontSize: "16px" }}
            >
              {item.name}
            </div>
            <div>{item.county}</div>
          </List.Item>
        )}
      />

      <Divider />

      {/* Pagination */}
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={filteredData.length}
        onChange={(page) => setCurrentPage(page)}
        showSizeChanger={false}
        style={{ textAlign: "center", marginTop: 10 }}
      />
    </div>
  );
};

export default PaginatedList;
