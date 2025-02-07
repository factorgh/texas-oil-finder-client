import { Card } from "antd";
import TexasMap from "../components/common/texas-map";
import OperatorTable from "../components/common/top-table";

const ProducingOperatorDetails = () => {
  return (
    <div className="container mx-auto mt-8 rounded-md py-5 bg-gray-50">
      <h1 className="text-3xl font-bold text-[#2B2B2B] mb-8 px-3">
        84 Energy LLC Oil Wells and Leases
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="col-span-2">
          <TexasMap />
        </div>
        <div className="col-span-1">
          <Card
            className="bg-gray-50 shadow-md border-2"
            title="Well Information"
            bordered={false}
            style={{ width: "100%" }}
          >
            <p className="mb-2">
              <strong>Well Name:</strong> 84 Energy LLC
            </p>
            <p className="mb-2">
              <strong>Well Type:</strong> Oil
            </p>
            <p className="mb-2">
              <strong>Address:</strong> 7639 ANCHOR RANCH LOOP FLATONIA, TX
              78941
            </p>
            <p className="mb-2">
              <strong>Operator:</strong> 84 Energy LLC
            </p>

            <p className="mb-2">
              <strong>Well Status:</strong> Production
            </p>
          </Card>
        </div>
      </div>
      {/* Table section  */}
      <h1 className="text-xl font-bold text-[#2B2B2B] mb-8 px-3 mt-8">
        Leases Operated by 84 Energy LLC
      </h1>
      <div className="mt-8 border border-gray-200 shadow-md rounded-md ">
        <OperatorTable />
      </div>
    </div>
  );
};

export default ProducingOperatorDetails;
