import CustomChart from "../components/common/custom-chart";
import ReusableList from "../components/common/reusableList";
import Reusab from "../components/common/reusableList";
import useCounties from "../hooks/useCounties";

const PermitsPage = () => {
  const counties = useCounties();
  return (
    <div>
      <CustomChart />

      {/* Other tables */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10 bg-gray-50">
        <div className="col-span-1">
          <Reusab title="Top Operators by Production" />
        </div>
        <ReusableList
          prefix="Permit"
          data={counties || []}
          title="Drilling permit by County"
        />
        <ReusableList prefix="Permit" data={[]} title="" />
      </div>
    </div>
  );
};

export default PermitsPage;
