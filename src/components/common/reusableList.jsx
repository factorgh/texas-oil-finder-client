/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Pagination, Spin } from "antd";

const ITEMS_PER_PAGE = 25;

const ReusableList = ({ prefix }) => {
  const [highestCounty, setHighestCounty] = useState([]);
  const [filteredCounty, setFilteredCounty] = useState([]); // Filtered data
  const [searchQuery, setSearchQuery] = useState(""); // Search state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const handleNavigate = (id, county) => {
    navigate(`/${prefix.toLowerCase()}-detail/`, {
      state: { id, county, prefix },
    });
  };

  const fetchHighestCounty = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://127.0.0.1:8000/counties/");
      setHighestCounty(res.data);
      setFilteredCounty(res.data); // Initially, filtered data is the same as fetched data
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

  // Handle search input change
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter items based on the query
    const filtered = highestCounty.filter((item) =>
      item.name.toLowerCase().includes(query)
    );
    setFilteredCounty(filtered);
    setCurrentPage(1); // Reset to first page after filtering
  };

  // Pagination logic

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredCounty.slice(startIndex, endIndex);

  return (
    <div className="w-full bg-white p-4">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={handleSearch}
        className="w-full p-2 mb-4 border rounded-md text-sm focus:outline-none focus:ring focus:border-blue-400"
      />

      {error && <p className="text-red-500">{error}</p>}
      {isLoading && (
        <div className="text-center my-4 animate-spin">
          <Spin size="large" />
        </div>
      )}

      <div>
        {currentItems.length > 0 ? (
          currentItems.map((item, index) => (
            <div
              key={index}
              className="py-2 px-3 border-b flex items-center justify-between text-[12px] hover:bg-blue-100 cursor-pointer transition-all duration-200"
              onClick={() => handleNavigate(item.id, item.name)}
            >
              <span className="text-blue-600 ">
                {item.name.split(" ")[0] + " " + prefix}s
              </span>
              <span className="text-gray-600 ">{item.county}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-2">No results found.</p>
        )}
      </div>

      <div className="flex justify-center mt-4">
        <Pagination
          current={currentPage}
          total={filteredCounty.length}
          pageSize={ITEMS_PER_PAGE}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default ReusableList;
