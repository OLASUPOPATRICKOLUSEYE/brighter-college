"use client";

import Image from "next/image";
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
import { useState } from "react";

const data = [
  { name: "Mon", present: 60, absent: 40 },
  { name: "Tue", present: 55, absent: 30 },
  { name: "Wed", present: 70, absent: 20 },
  { name: "Thu", present: 70, absent: 30 },
  { name: "Fri", present: 89, absent: 11 },
];

const CustomLegend = (props: any) => {
  const { payload } = props;
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <ul className="flex space-x-6 justify-center mb-2">
      {payload.map((entry: any, index: number) => (
        <li
          key={`legend-${index}`}
          onMouseEnter={() => setHovered(entry.value)}
          onMouseLeave={() => setHovered(null)}
          style={{
            cursor: "pointer",
            opacity: hovered && hovered !== entry.value ? 0.5 : 1,
            display: "flex",
            alignItems: "center",
            fontSize: "14px",
            color: "#4B5563",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 10,
              height: 10,
              backgroundColor: entry.color,
              marginRight: 6,
              borderRadius: "50%",
            }}
          ></span>
          {entry.value}
        </li>
      ))}
    </ul>
  );
};

const AttendanceChart = () => {
  return (
    <div className="bg-white rounded-lg w-full p-4 shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Attendance Overview</h1>
        <Image
          src="/moreDark.png"
          alt="More"
          width={20}
          height={20}
          className="cursor-pointer"
        />
      </div>

      {/* Chart */}
      <div className="h-[300px] sm:h-[350px] md:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={20}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tick={{ fill: "#d1d5db" }}
              tickLine={false}
            />
            <YAxis
              axisLine={false}
              tick={{ fill: "#d1d5db" }}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                borderColor: "lightgray",
              }}
            />
            <Legend
              align="center"
              verticalAlign="top"
              content={<CustomLegend />}
              wrapperStyle={{ paddingTop: "10px", paddingBottom: "20px" }}
            />
            <Bar
              dataKey="present"
              fill="#1e2a45"
              name="Present"
              legendType="circle"
              radius={[10, 10, 0, 0]}
            />
            <Bar
              dataKey="absent"
              fill="#c8102e"
              name="Absent"
              legendType="circle"
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AttendanceChart;
