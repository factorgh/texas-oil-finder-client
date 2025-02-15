import ReusableList from "../components/common/reusableList";

const LeasesPage = () => {
  return (
    <div className="">
      <h1 className="text-3xl font-bold text-[#2B2B2B] mb-3">
        Oil and Gas Leases In Texas
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 ">
        {/* <div className="col-span-1">
          <ReusableList prefix={`Leases`} title="Top Leases by Production" />
        </div> */}
        <div className="flex col-span-2">
          <ReusableList prefix={`Lease`} title="Leases by County" />
        </div>
      </div>
    </div>
  );
};

export default LeasesPage;
