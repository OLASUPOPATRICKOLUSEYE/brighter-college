"use client";
import { useState } from "react";
import ComplaintType from "./complaint-type/page";
import Purpose from "./purpose/page";
import Source from "./source/page";
import Reference from "./reference/page";

const SetupFrontOfficePage = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs: { label: string; component: JSX.Element }[] = [
    { label: "Purpose", component: <Purpose /> },
    { label: "Complaint Type", component: <ComplaintType /> },
    { label: "Source", component: <Source /> },
    { label: "Reference", component: <Reference /> },
  ];

    return (
    <div className="">
      <h1 className="text-lg sm:text-xl font-bold mb-4">Setup Front Office</h1>

      {/* Tabs navigation */}
      <div className="overflow-x-auto">
        <div className="flex flex-wrap gap-2 min-w-full pb-2">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`flex-shrink-0 px-4 py-2 text-sm rounded whitespace-nowrap border transition-all duration-200 ${
                activeTab === index
                  ? "bg-lamaYellow text-white border-lamaYellow"
                  : "bg-gray-100 text-gray-700 hover:bg-lamaGray hover:text-white"
              }`}
              onClick={() => setActiveTab(index)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Tab Content */}
      <div className="bg-white rounded shadow mt-4 overflow-x-auto">
        {tabs[activeTab].component}
      </div>
    </div>
  );
};

export default SetupFrontOfficePage;
