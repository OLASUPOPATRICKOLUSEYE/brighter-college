"use client";
import { useState } from "react";
import Complaint from "./complaint/page";
import Purpose from "./purpose/page";

const tabs = [
  { label: "Purpose", component: <Purpose /> },
  { label: "Source", component: <Complaint /> },
];

const SetupFrontOfficePage = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Setup Front Office</h1>

      {/* Tabs */}
      <div className="flex space-x-2 w-[30%] mb-6 border-b bg-lamaYellow rounded-tr-full">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === index
                ? "bg-white rounded-tr-full text-lamaGray"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>{tabs[activeTab].component}</div>
    </div>
  );
};

export default SetupFrontOfficePage;
