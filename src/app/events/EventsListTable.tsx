"use client";

import React, { useState } from "react";
import { FaCalendarAlt, FaList, FaTable } from "react-icons/fa";

const EventsList = [
  {
    type: "Vacation",
    startDate: "05/10/2025",
    endDate: "05/20/2025",
    title: "School Vacation Notice",
    description:
      "Dear Parents, its vacation time! Time to refresh yourself and visit new places. At the same time, we want our students to learn and explore more. So here we have fun-filled holiday homework. Please take a printout of the homework sheets and follow the instructions. Please take care of the neatness of work.",
  },
  {
    type: "Activity",
    startDate: "04/05/2025",
    endDate: "04/18/2025",
    title: "Summer Learning Activities",
    description:
      "Summer vacation presents an excellent opportunity for children to learn and grow outside the traditional classroom setting. Wondering how to keep those little minds active during the summer break? We all know that familiar scene – kids glued to screens while their books gather dust.",
  },
  {
    type: "Activity",
    startDate: "06/20/2025",
    endDate: "06/21/2025",
    title: "Yoga Day Activities",
    description:
      "The students learnt to maintain balance, peace and poise which can act as a sublime expression of the quest for excellence for synthesis and harmony. Various yoga postures and asanas including pranayama and meditation were performed by the students.",
  },
  {
    type: "Activity",
    startDate: "07/20/2025",
    endDate: "07/30/2025",
    title: "Van Mahotsav Celebration",
    description:
      "Van Mahotsav, a week-long festival celebrating trees, is often celebrated in schools with tree planting, awareness campaigns, and creative activities. Schools use this opportunity to instill a sense of environmental responsibility in students and promote the importance of trees for a healthy planet.",
  },
];

export default function EventsListTable() {
  const [viewMode, setViewMode] = useState("list");

  return (
    <div className="bg-white py-12 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-32 2xl:px-48 w-full">
      {/* Header & Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-pascalRed flex items-center gap-2">
          <FaCalendarAlt className="text-xl" /> Event Occasions
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("list")}
            className={`px-3 py-1 rounded-full text-sm sm:text-base flex items-center gap-2 transition-all ${
              viewMode === "list"
                ? "bg-pascalRed text-white"
                : "bg-white text-pascalRed border border-pascalRed"
            }`}
          >
            <FaList /> List
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`px-3 py-1 rounded-full text-sm sm:text-base flex items-center gap-2 transition-all ${
              viewMode === "table"
                ? "bg-pascalRed text-white"
                : "bg-white text-pascalRed border border-pascalRed"
            }`}
          >
            <FaTable /> Table
          </button>
        </div>
      </div>

      {/* Views */}
      {viewMode === "list" ? (
        <div className="space-y-6">
          {EventsList.map((event, idx) => (
            <div
              key={idx}
              className="border-l-4 border-pascalRed bg-white shadow-md rounded-md p-4 sm:p-6"
            >
              <h2 className="text-lg sm:text-xl font-semibold text-pascalRed">
                {event.title}
              </h2>
              <p className="text-sm sm:text-base text-pascalBlue italic mt-1">
                {event.startDate} to {event.endDate} &mdash; {event.type}
              </p>
              <p className="text-gray-700 text-sm sm:text-base mt-3 text-justify leading-relaxed">
                {event.description}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border border-collapse border-pascalRed min-w-[768px]">
            <thead>
              <tr className="bg-pascalRed text-white">
                <th className="px-4 py-3 border">Event Type</th>
                <th className="px-4 py-3 border">Start Date</th>
                <th className="px-4 py-3 border">End Date</th>
                <th className="px-4 py-3 border">Title</th>
                <th className="px-4 py-3 border">Description</th>
              </tr>
            </thead>
            <tbody>
              {EventsList.map((event, idx) => (
                <tr
                  key={idx}
                  className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-4 py-3 border text-pascalRed font-medium">
                    {event.type}
                  </td>
                  <td className="px-4 py-3 border">{event.startDate}</td>
                  <td className="px-4 py-3 border">{event.endDate}</td>
                  <td className="px-4 py-3 border font-semibold text-pascalRed">
                    {event.title}
                  </td>
                  <td className="px-4 py-3 border text-sm text-gray-700">
                    {event.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
