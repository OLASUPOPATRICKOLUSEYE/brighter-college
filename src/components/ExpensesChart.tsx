"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Image from "next/image";

const data = [
  { name: "Stationary Purchase", value: 2500 },
  { name: "Electricity Bills", value: 1800 },
  { name: "Telephone Bill", value: 900 },
  { name: "Miscellaneous", value: 700 },
  { name: "Flower", value: 400 },
];

const COLORS = ["#c8102e", "#1e2a45", "#f59e0b", "#10b981", "#6366f1"];

const ExpensesChart = () => {
  return (
    <div className="bg-white rounded-lg w-full p-4 shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Expenses Breakdown - July 2025</h1>
        <Image
          src="/moreDark.png"
          alt="More"
          width={20}
          height={20}
          className="cursor-pointer"
        />
      </div>
      {/* Chart Area */}
      <div className="w-full h-[300px] sm:h-[350px] md:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                borderColor: "lightgray",
              }}
            />
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              wrapperStyle={{ fontSize: "13px" }}
            />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              innerRadius={60}
              fill="#8884d8"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpensesChart;
