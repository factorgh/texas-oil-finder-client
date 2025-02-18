import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const TopCounty = ({ data, prefix }) => {
  const navigate = useNavigate();
  const handleNavigate = (id, county) => {
    // const county = countyData.replace(/\s*County$/, "");
    navigate(`/${prefix.toLowerCase()}-detail/`, {
      state: { id, county, prefix },
    });
  };
  return (
    <div className="w-2/5  drop-shadow rounded-lg p-5">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">
        Top Counties by {prefix}
      </h3>
      <ul className="flex flex-col gap-2">
        {data?.map((item) => (
          <li
            onClick={() => handleNavigate(item.county_id, item.county_name)}
            key={item}
            className="bg-gray-50 shadow-lg hover:bg-blue-100 rounded-md px-4 py-2 transition-all cursor-pointer "
          >
            <span className="text-[12px] text-slate-800 font-medium ">
              {item.county_name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopCounty;
