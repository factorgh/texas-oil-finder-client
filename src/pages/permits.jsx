import CustomChart from "../components/common/custom-chart";
import TopOperators from "../components/common/top-operators";

const PermitsPage = () => {
  return (
    <div>
      <CustomChart />

      {/* Other tables */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10 bg-gray-50">
        <div className="col-span-1">
          <TopOperators title="Top Operators by Production" />
        </div>
        <div className="flex col-span-2">
          <TopOperators title="Drilling permit by County" />
          <TopOperators title="" />
        </div>
      </div>
    </div>
  );
};

export default PermitsPage;
