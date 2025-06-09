"use client";
import Image from 'next/image';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Girls', count: 45, fill: '#FAE27C' },
  { name: 'Boys', count: 55, fill: '#C3EBFA' },
  { name: 'Total', count: 100, fill: 'white' },
];

const CountChart = () => {
  return (
    <div className="bg-white rounded-lg w-full h-full p-4 flex flex-col justify-between">
      {/* TITLE */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Students</h1>
        <Image src="/moreDark.png" alt="More" width={20} height={20} className='cursor-pointer'/>
      </div>

      {/* CHART */}
      <div className="relative flex-1 min-h-[250px]">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={32}
            data={data}
          >
            <RadialBar background dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>
        <Image
          src="/maleFemale.png"
          alt="Icon"
          width={50}
          height={50}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* BOTTOM */}
      <div className="mt-6 flex justify-around items-center w-full">
        <div className="flex flex-col items-center gap-1">
          <div className="w-5 h-5 bg-[#C3EBFA] rounded-full" />
          <h1 className="font-bold">1,234</h1>
          <h2 className="text-xs text-gray-500">Boys (55%)</h2>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-5 h-5 bg-[#FAE27C] rounded-full" />
          <h1 className="font-bold">1,011</h1>
          <h2 className="text-xs text-gray-500">Girls (45%)</h2>
        </div>
      </div>
    </div>
  );
};

export default CountChart;
