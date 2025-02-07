/* eslint-disable react/prop-types */
import { Card } from "antd";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "1995",
    permit: 4000,

    amt: 2400,
  },
  {
    name: "2000",
    permit: 3000,

    amt: 2210,
  },
  {
    name: "2005",
    permit: 2000,

    amt: 2290,
  },
  {
    name: "2010",
    permit: 2780,

    amt: 2000,
  },
  {
    name: "2015",
    permit: 1890,

    amt: 2181,
  },
  {
    name: "2020",
    permit: 2390,
    amt: 2500,
  },
  {
    name: "2025",
    permit: 3490,

    amt: 2100,
  },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#fff",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        }}
      >
        <p style={{ margin: 0, fontWeight: "bold" }}>{label}</p>
        <p style={{ margin: 0, color: "#8884d8" }}>
          Drilling permits: {payload[0].value}
        </p>
      </div>
    );
  }

  return null;
};

const CustomChart = () => {
  return (
    <Card
      title="Recent Drilling Permits"
      style={{
        width: "100%",
        borderRadius: "8px",
        // backgroundColor: "#f5f5f5",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      }}
      hoverable
    >
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis stroke="#8884d8" dataKey="name" />
          <YAxis stroke="#8884d8" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            strokeWidth={3}
            type="monotone"
            dataKey="permit"
            stroke="#8884d8"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default CustomChart;
