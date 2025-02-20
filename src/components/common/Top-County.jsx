import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

/* eslint-disable react/prop-types */
const TopCounty = ({ data, prefix }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setTimeout(() => setLoading(false), 1000); // Simulating data fetch delay
    }
  }, [data]);

  const handleNavigate = (id, county) => {
    navigate(`/${prefix.toLowerCase()}-detail/`, {
      state: { id, county, prefix },
    });
  };

  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-sm  drop-shadow rounded-lg p-5 ">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">
        Top Counties by {prefix}
      </h3>

      {loading ? (
        // **Skeleton Loader**
        <ul className="space-y-2">
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <li
                key={index}
                className="h-8 bg-gray-200 animate-pulse rounded-md"
              ></li>
            ))}
        </ul>
      ) : data?.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {data.map((item) => (
            <li
              onClick={() => handleNavigate(item.county_id, item.county_name)}
              key={item.county_id}
              className="bg-gray-50 shadow-lg hover:bg-blue-100 rounded-md px-4 py-2 transition-all cursor-pointer "
            >
              <span className="text-[12px] text-slate-800 font-medium ">
                {item.county_name}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        // **Empty State**
        <p className="text-gray-500 text-sm">No data available.</p>
      )}
    </div>
  );
};

export default TopCounty;
