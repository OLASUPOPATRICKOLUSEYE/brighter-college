"use client";
import { useState } from "react";
import ComplaintType from "./complainttype/page";
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
      <h1 className="text-lg sm:text-xl font-bold mb-4 sm:text-left">
        Setup Front Office
      </h1>

      {/* Grid layout on small screens (2 columns), horizontal flex on larger screens */}
      <div className="grid grid-cols-2 gap-2 sm:flex sm:space-x-2 sm:gap-0 mb-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`w-full sm:w-auto px-3 py-2 text-sm sm:text-base border rounded ${
              activeTab === index
                ? "bg-lamaYellow hover:bg-lamaGray text-white rounded-tr-full"
                : "bg-gray-200 hover:bg-lamaGray hover:text-white"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table container with white background and horizontal scroll */}
      <div className="bg-white p-2 rounded shadow overflow-x-auto">
        {tabs[activeTab].component}
      </div>
    </div>
  );
};

export default SetupFrontOfficePage;
