import { Button, Card, DatePicker, Form, Input, Select, Table } from "antd";

const SearchPage = () => {
  const { RangePicker } = DatePicker;

  const columns = [
    {
      title: "Operator",
      dataIndex: "operator",
      key: "operator",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Dates on File",
      dataIndex: "datesOnFile",
      key: "datesOnFile",
    },
    {
      title: "Recent Oil Prod",
      dataIndex: "recentOilProd",
      key: "recentOilProd",
    },
    {
      title: "Recent Gas Prod",
      dataIndex: "recentGasProd",
      key: "recentGasProd",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
  ];

  const data = []; // Replace with API data

  return (
    <div className="container mx-auto mt-5">
      <h3 className="text-3xl font-bold text-[#2B2B2B] mb-3">
        Search Our Oil & Gas Database
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left Side Form */}
        <Card title="Search Form" className="shadow-md col-span-1">
          <Form layout="vertical">
            <Form.Item label="Operator Name" name="operatorName">
              <Input placeholder="Operator Name" />
            </Form.Item>
            <Form.Item label="Well / Lease Name" name="wellName">
              <Input placeholder="Well Name" />
            </Form.Item>
            <Form.Item label="API #" name="apiNumber">
              <Input placeholder="42-503-12345" />
            </Form.Item>
            <Form.Item label="Lease #" name="leaseNumber">
              <Input placeholder="Lease #" />
            </Form.Item>
            <Form.Item label="County" name="county">
              <Input placeholder="County" />
            </Form.Item>
            <Form.Item label="Well Status" name="wellStatus">
              <Select placeholder="Select Status">
                <Select.Option value="active">Active</Select.Option>
                <Select.Option value="inactive">Inactive</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Completion Date Range" name="completionDateRange">
              <RangePicker />
            </Form.Item>
            <Form.Item label="Min Monthly BOE" name="minMonthlyBOE">
              <Input placeholder="Min BOE" />
            </Form.Item>
            <Form.Item label="Max Monthly BOE" name="maxMonthlyBOE">
              <Input placeholder="Max BOE" />
            </Form.Item>
            <Form.Item label="Min Depth" name="minDepth">
              <Input placeholder="Min Depth" />
            </Form.Item>
            <Form.Item label="Max Depth" name="maxDepth">
              <Input placeholder="Max Depth" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Search Database
              </Button>
            </Form.Item>
          </Form>
        </Card>

        {/* Right Side Table */}
        <Card title="Search Results" className="shadow-md col-span-2">
          <Table
            dataSource={data}
            columns={columns}
            pagination={false}
            bordered
          />
          <div className="mt-5">
            <Button type="primary" disabled>
              Download Results
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SearchPage;
