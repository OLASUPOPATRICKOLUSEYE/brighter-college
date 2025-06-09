"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Image from "next/image";

const data = [
  { name: "Jan", income: 4000, expense: 2400 },
  { name: "Feb", income: 3000, expense: 1398 },
  { name: "Mar", income: 2000, expense: 9800 },
  { name: "April", income: 2000, expense: 9800 },
  { name: "May", income: 2000, expense: 9800 },
  { name: "June", income: 2000, expense: 9800 },
  { name: "Jul", income: 2000, expense: 9800 },
  { name: "Aug", income: 2000, expense: 9800 },
  { name: "Sept", income: 2000, expense: 9800 },
  { name: "Oct", income: 2000, expense: 9800 },
  { name: "Nov", income: 2000, expense: 9800 },
  { name: "Dec", income: 2000, expense: 9800 },
];

const FinanceChart = () => {
  return (
    <div className="bg-white rounded-lg w-full h-full p-4 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Finance</h1>
        <Image src="/moreDark.png" alt="More" width={20} height={20} className="cursor-pointer"/>
      </div>
      {/* Chart Area */}
      <div className="flex-grow h-[450px]"> {/* Define chart height here */}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tick={{ fill: "#d1d5db" }}
              tickLine={false}
              tickMargin={20}
            />
            <YAxis
              axisLine={false}
              tick={{ fill: "#d1d5db" }}
              tickLine={false}
              tickMargin={10}
            />
            <Tooltip />
            <Legend
              align="center"
              verticalAlign="top"
              wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
            />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#C3EBFA"
              strokeWidth={5}
            />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#CFCEFF"
              strokeWidth={5}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FinanceChart;
