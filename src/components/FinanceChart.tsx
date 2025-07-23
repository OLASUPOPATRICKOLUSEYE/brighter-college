"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Image from "next/image";

const data = [
  { date: "01", fees: 2000, expenses: 150 },
  { date: "02", fees: 3500, expenses: 100 },
  { date: "03", fees: 0, expenses: 100 },
  { date: "04", fees: 0, expenses: 100 },
  { date: "05", fees: 700, expenses: 100 },
  { date: "06", fees: 0, expenses: 100 },
  { date: "07", fees: 0, expenses: 100 },
  { date: "08", fees: 0, expenses: 100 },
  { date: "09", fees: 500, expenses: 100 },
  { date: "10", fees: 0, expenses: 100 },
  { date: "11", fees: 0, expenses: 100 },
  { date: "12", fees: 0, expenses: 100 },
  { date: "13", fees: 0, expenses: 100 },
  { date: "14", fees: 0, expenses: 100 },
  { date: "15", fees: 0, expenses: 100 },
  { date: "16", fees: 0, expenses: 100 },
  { date: "17", fees: 0, expenses: 100 },
  { date: "18", fees: 0, expenses: 100 },
  { date: "19", fees: 0, expenses: 100 },
  { date: "20", fees: 0, expenses: 100 },
  { date: "21", fees: 0, expenses: 100 },
  { date: "22", fees: 0, expenses: 100 },
  { date: "23", fees: 0, expenses: 100 },
  { date: "24", fees: 0, expenses: 100 },
  { date: "25", fees: 0, expenses: 100 },
  { date: "26", fees: 0, expenses: 100 },
  { date: "27", fees: 0, expenses: 100 },
  { date: "28", fees: 0, expenses: 100 },
  { date: "29", fees: 0, expenses: 100 },
  { date: "30", fees: 0, expenses: 100 },
  { date: "31", fees: 0, expenses: 100 },
];

const FinanceChart = () => {
  return (
    <div className="bg-white rounded-lg w-full p-4 shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Fees Collection & Expenses For July 2025</h1>
        <Image src="/moreDark.png" alt="More" width={20} height={20} className="cursor-pointer" />
      </div>

      {/* Chart Area */}
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke='#ddd' />
            <XAxis dataKey="date"  axisLine={false} tick={{fill:"#d1d5db"}} tickLine={false} />
            <YAxis  axisLine={false} tick={{fill:"#d1d5db"}} tickLine={false} />
            <Tooltip contentStyle={{borderRadius: "10px", borderColor: "lightgray"}} />
            <Legend align='center' verticalAlign='top'   wrapperStyle={{paddingTop: "20px", paddingBottom: "40px"}}  />
            <Bar dataKey="fees" fill="#1e2a45" name="Fees Collected" legendType='circle' radius={[10, 10, 0, 0]} />
            <Bar dataKey="expenses" fill="#c8102e" name="Expenses" legendType='circle' radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FinanceChart;
