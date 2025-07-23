"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Image from "next/image";
import { useState } from "react";

const data = [
  { month: "Apr", fees: 2000, expenses: 150 },
  { month: "May", fees: 3500, expenses: 300 },
  { month: "Jun", fees: 1500, expenses: 200 },
  { month: "Jul", fees: 1000, expenses: 250 },
  { month: "Aug", fees: 1200, expenses: 180 },
  { month: "Sep", fees: 800, expenses: 160 },
  { month: "Oct", fees: 2200, expenses: 190 },
  { month: "Nov", fees: 1700, expenses: 140 },
  { month: "Dec", fees: 2500, expenses: 210 },
  { month: "Jan", fees: 2000, expenses: 170 },
  { month: "Feb", fees: 1800, expenses: 150 },
  { month: "Mar", fees: 3000, expenses: 220 },
];

// Custom Legend with hover opacity effect
const CustomLegend = (props: any) => {
  const { payload } = props;
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <ul className="flex space-x-4">
      {payload.map((entry: any, index: number) => (
        <li
          key={`item-${index}`}
          onMouseEnter={() => setHovered(entry.value)}
          onMouseLeave={() => setHovered(null)}
          style={{
            cursor: "pointer",
            opacity: hovered && hovered !== entry.value ? 0.5 : 1,
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

const FinanceChartSession = () => {
  return (
    <div className="bg-white rounded-lg w-full p-4 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Fees Collection & Expenses For Session 2025-26</h1>
        <Image src="/moreDark.png" alt="More" width={20} height={20} className="cursor-pointer" />
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke='#ddd' />
            <XAxis dataKey="month" axisLine={false} tick={{fill:"#d1d5db"}} tickLine={false} />
            <YAxis axisLine={false} tick={{fill:"#d1d5db"}} tickLine={false} />
            <Tooltip contentStyle={{borderRadius: "10px", borderColor: "lightgray"}} />
            <Legend align='center' verticalAlign='top'   wrapperStyle={{paddingTop: "20px", paddingBottom: "40px"}}  />
            <Bar dataKey="fees" fill="#1e2a45" name="Fees Collected" legendType='circle' radius={[10, 10, 0, 0]} />
            <Bar dataKey="expenses" fill="#ff6384" name="Expenses" legendType='circle' radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FinanceChartSession;
