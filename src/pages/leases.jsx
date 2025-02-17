import ReusableList from "../components/common/reusableList";
import TopCounty from "../components/common/Top-County";
import useFetchTopLeases from "../hooks/useFetchTopLeases";

const LeasesPage = () => {
  const topLeases = useFetchTopLeases();
  return (
    <div className="">
      <h1 className="text-3xl font-bold text-[#2B2B2B] mb-3">
        Oil and Gas Leases In Texas
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 ">
        {/* <div className="col-span-1">
          <ReusableList prefix={`Leases`} title="Top Leases by Production" />
        </div> */}
        <div className="flex gap-10 mt-5">
          <TopCounty data={topPermits.counties} prefix="Permit" />
          <ReusableList prefix="Permit" title="Leases by County" />
        </div>
      </div>
    </div>
  );
};

export default LeasesPage;
