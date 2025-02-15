import CustomChart from "../components/common/custom-chart";
import ReusableList from "../components/common/reusableList";

import useCounties from "../hooks/useCounties";

const PermitsPage = () => {
  const counties = useCounties();
  return (
    <div>
      <CustomChart />

      {/* Other tables */}
      <h1 className="text-3xl font-bold text-[#2B2B2B] mt-10 px-5">
        Oil and Gas Permits In Texas
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-5">
        {/* <div className="col-span-1">
          <Reusab title="Top Operators by Production" />
        </div> */}
        <ReusableList
          prefix="Permit"
          data={counties || []}
          title="Drilling permit by County"
        />
      </div>
    </div>
  );
};

export default PermitsPage;
