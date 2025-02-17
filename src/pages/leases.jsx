import ReusableList from "../components/common/reusableList";
import TopCounty from "../components/common/Top-County";
import useFetchTopLeases from "../hooks/useFetchTopLeases";

const LeasesPage = () => {
  const topLeases = useFetchTopLeases();
  console.log(topLeases);

  return (
    <div className="">
      <h1 className="text-3xl font-bold text-[#2B2B2B] mb-3">
        Oil and Gas Leases In Texas
      </h1>

      <div className="flex gap-10 mt-5">
        <TopCounty data={topLeases.counties} prefix="Lease" />
        <ReusableList prefix="Lease" title="Leases by County" />
      </div>
    </div>
  );
};

export default LeasesPage;
