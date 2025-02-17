import { Pagination, Spin } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";


const ITEMS_PER_PAGE = 25;

const HighestCounty = () => {
  const [highestCounty, setHighestCounty] = useState([]);
  const [filteredCounties, setFilteredCounties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchHighestCounty();
  }, []);

  const fetchHighestCounty = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://127.0.0.1:8000/counties/");
      setHighestCounty(res.data);
      setFilteredCounties(res.data);
    } catch (err) {
      console.error(err.message);
      setError("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = highestCounty.filter((county) =>
      county.name.toLowerCase().includes(query)
    );
    setFilteredCounties(filtered);
    setCurrentPage(1);
  };

  // const handleNavigate = (id) => {
  //   navigate(`/counties/oil-gas/${id}`);
  // };

  const paginatedData = filteredCounties.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg w-full">
      <div className="flex flex-col gap-2 mb-4">
        <h2 className="text-base font-semibold text-gray-700">
          {highestCounty.length} Highest Producing Counties in Texas
        </h2>
        <input
          type="text"
          placeholder="Search counties..."
          value={searchQuery}
          onChange={handleSearch}
          className="border rounded px-3 py-2 text-sm w-full max-w-md"
        />
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {isLoading ? (
        <div className="text-center text-gray-500">
          <Spin size="large" />
        </div>
      ) : (
        <div>
          {paginatedData.length > 0 ? (
            paginatedData.map((item, index) => (
              <div
                key={index}
                className="py-2 px-3 border-b flex items-center justify-between text-[13px] hover:bg-blue-100 cursor-pointer transition duration-200"
                onClick={() => console.log(item.id)}
              >
                <span className="text-blue-600 ">{item.name}</span>
                <span className="text-gray-600">{item.county}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-2">No results found.</p>
          )}
        </div>
      )}

      <div className="flex justify-center mt-4">
        <Pagination
          current={currentPage}
          total={filteredCounties.length}
          pageSize={ITEMS_PER_PAGE}
          onChange={setCurrentPage}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default HighestCounty;
