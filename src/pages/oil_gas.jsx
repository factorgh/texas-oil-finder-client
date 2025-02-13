import MyCardWithList from "../components/common/card-list";
import CustomChart from "../components/common/custom-chart";
import ReusableList from "../components/common/reusableList";

import TopProducingOperators from "../components/common/top-producing-operators";

const OilGasDetail = () => {
  return (
    <div className="container mx-auto mt-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-[#2B2B2B] mb-3">
        Oil Wells and Production in Anderson County, TX
      </h1>
      <CustomChart />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
        <div className="col-span-1 flex flex-col gap-8">
          <TopProducingOperators title="Top Producing Operators in Anderson County, TX" />
          <ReusableList
            prefix="Oil / Gas"
            title="Top Producing Leases in Anderson County, TX"
          />
        </div>
        <div className="flex col-span-1">
          <MyCardWithList title="Summary of Data in Anderson County, TX" />
        </div>
      </div>
    </div>
  );
};

export default OilGasDetail;
