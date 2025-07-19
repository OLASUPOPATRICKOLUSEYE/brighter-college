"use client";
import { useState } from "react";
import DisableReason from "./disablereason/page";
import StudentCategory from "./studentcategory/page";
import StudentHouse from "./studenthouse/page";
import Class from "./class/page";
import Session from "./session/page";
import BloodGroup from "./bloodgroup/page";
import Genotype from "./genotype/page";
import TransportRoute from "./transportroute/page";
import TransportPickup from "./transportpickup/page";
import FeesPayable from "./feespayable/page";
import Room from "./room/page";
import Hostel from "./hostel/page";

const SetupStudentInfo = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs: { label: string; component: JSX.Element }[] = [
    { label: "Disable Reason", component: <DisableReason /> },
    { label: "Student Category", component: <StudentCategory /> },
    { label: "Student House", component: <StudentHouse /> },
    { label: "Class", component: <Class /> },
    { label: "Session", component: <Session /> },
    { label: "Blood Group", component: <BloodGroup /> },
    { label: "Genotype", component: <Genotype /> },
    { label: "Transport Route", component: <TransportRoute /> },
    { label: "Transport Pickup", component: <TransportPickup /> },
    { label: "Fees Payable", component: <FeesPayable /> },
    { label: "Room", component: <Room /> },
    { label: "Hostel", component: <Hostel /> },
  ];

  return (
    <div className="">
      <h1 className="text-lg sm:text-xl font-bold mb-4">Setup Student Information</h1>

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

export default SetupStudentInfo;
