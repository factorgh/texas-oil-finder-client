import CustomChart from "../components/common/custom-chart";
import ReusableList from "../components/common/reusableList";
import TopCounty from "../components/common/Top-County";

import useCounties from "../hooks/useCounties";
import useFetchTopPermits from "../hooks/useFetchTopPermits";

const PermitsPage = () => {
  const topPermits = useFetchTopPermits();
  console.log(topPermits);
  const counties = useCounties();

  return (
    <div>
      <CustomChart />

      {/* Other tables */}
      <h1 className="text-3xl font-bold text-[#2B2B2B] mt-10 px-5">
        Oil and Gas Permits In Texas
      </h1>
      <div className="flex gap-10 mt-5">
        <TopCounty data={topPermits.counties} prefix="Permit" />
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
