import { Table } from "antd";

const columns = [
  {
    title: "Lease No.",
    dataIndex: "leaseNo",
    key: "leaseNo",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Lease Name",
    dataIndex: "leaseName",
    key: "leaseName",
  },
  {
    title: "County",
    dataIndex: "county",
    key: "county",
  },
  {
    title: "Current Operator",
    key: "tags",
    dataIndex: "tags",
  },
  {
    title: "Operation Range",
    dataIndex: "operationRange",
    key: "operationRange",
  },
  {
    title: "Oil Prod",
    dataIndex: "oilProd",
    key: "oilProd",
  },
  {
    title: "Gas Prod",
    dataIndex: "gasProd",
    key: "gasProd",
  },
];

const data = [
  {
    key: "1",
    leaseNo: "03-02778",
    leaseName: "	GRANBURY, C. B. A/C #4",
    county: "Harris",
    tags: "Andersons",
    operationRange: "2020-2023",
    oilProd: "5000 bbl/day",
    gasProd: "3000 mcf/day",
  },
  {
    key: "2",
    leaseNo: "03-02779",
    leaseName: "DICK & FALING",
    county: "Travis",
    tags: "Brainstem",
    operationRange: "2015-2020",
    oilProd: "0 bbl/day",
    gasProd: "0 mcf/day",
  },
  {
    key: "3",
    leaseNo: "03-02780",
    leaseName: "JONES, R. H.",
    county: "Midland",
    tags: "Inlands Av.",
    operationRange: "2021-2024",
    oilProd: "7500 bbl/day",
    gasProd: "4500 mcf/day",
  },
];

const OperatorTable = () => <Table columns={columns} dataSource={data} />;
export default OperatorTable;
