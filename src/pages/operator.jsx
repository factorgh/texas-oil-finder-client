import TopOperators from "../components/common/top-operators";

const OperatorPage = () => {
  return (
    <div className="">
      <h1 className="text-3xl font-bold text-[#2B2B2B] mb-3">
        Oil and Gas Operators In Texas
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 ">
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

export default OperatorPage;
