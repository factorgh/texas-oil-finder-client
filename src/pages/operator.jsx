import ReusableList from "../components/common/reusableList";
import TopCounty from "../components/common/Top-County";
import useFetchTopOperators from "../hooks/useFetchTopOperators";

const OperatorPage = () => {
  const topOperators = useFetchTopOperators();
  return (
    <div className="">
      <h1 className="text-3xl font-bold text-[#2B2B2B] mb-3">
        Oil and Gas Operators In Texas
      </h1>
      <div className="flex gap-10 mt-5">
        <TopCounty data={topOperators.counties} prefix="Operator" />
        <ReusableList prefix="Operator" title="Operators by County" />
      </div>
    </div>
  );
};

export default OperatorPage;
