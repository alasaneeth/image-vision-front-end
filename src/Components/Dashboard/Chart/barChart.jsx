import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { monthNames } from "../dashboard";

const ChartBar = () => {
  const data = [
    {
      name: monthNames[9],
      Return: 4000,
      Sales: 5000,
      Expenses: 2400,
    },
    {
      name: monthNames[8],
      Return: 3000,
      Sales: 1398,
      Expenses: 2210,
    },
    {
      name: monthNames[7],
      Return: 2000,
      Sales: 9800,
      Expenses: 2290,
    },
    {
      name: monthNames[6],
      Return: 2780,
      Sales: 3908,
      Expenses: 2000,
    },
    {
      name: monthNames[5],
      Return: 1890,
      Sales: 4800,
      Expenses: 2181,
    },
    {
      name: monthNames[4],
      Return: 2390,
      Sales: 3800,
      Expenses: 2500,
    },
  ];
  return (
    <div style={{ height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: 20,
          }}
          barSize={15}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 40, right: 40 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="Sales" fill="#4DAF4A" background={{ fill: "#eee" }} />
          <Bar
            dataKey="Expenses"
            fill="#E41A1C"
            background={{ fill: "#eee" }}
          />
          <Bar dataKey="Return" fill="#FF7F00" background={{ fill: "#eee" }} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default ChartBar;
