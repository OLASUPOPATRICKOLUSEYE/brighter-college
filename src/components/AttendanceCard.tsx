"use client";
import { FiMoreVertical } from "react-icons/fi";
import React from "react";

type ProgressItem = {
  label: string;
  count: number;
  total?: number;
};

const AttendanceCard = ({ type }: { type: string }) => {
  let title = "";
  let items: ProgressItem[] = [];
  let total = 1;

  if (type === "fees-awaiting-payment") {
    title = "Fees Awaiting Payment";
    items = [{ label: "Pending", count: 16, total: 120 }];
  }

  if (type === "staff-approved-leave") {
    title = "Staff Approved Leave";
    items = [{ label: "Approved", count: 0, total: 4 }];
  }

  if (type === "student-approved-leave") {
    title = "Student Approved Leave";
    items = [{ label: "Approved", count: 12, total: 57 }];
  }

  if (type === "converted-leads") {
    title = "Converted Leads";
    items = [{ label: "Converted", count: 6, total: 50 }];
  }

  if (type === "staff-present-today") {
    title = "Staff Present Today";
    total = 8;
    items = [{ label: "Present", count: 8 }];
  }

  if (type === "student-present-today") {
    title = "Student Present Today";
    total = 57;
    items = [{ label: "Present", count: 24 }];
  }

  if (type === "fees-overview") {
    title = "Fees Overview";
    items = [
      { label: "Paid", count: 80, total: 120 },
      { label: "Unpaid", count: 16, total: 120 },
      { label: "Partial", count: 24, total: 120 },
    ];
  }

  if (type === "enquiry-overview") {
    title = "Enquiry Overview";
    items = [
      { label: "Won", count: 12, total: 50 },
      { label: "Active", count: 18, total: 50 },
      { label: "Passive", count: 8, total: 50 },
      { label: "Lost", count: 6, total: 50 },
      { label: "Dead", count: 6, total: 50 },
    ];
  }

  if (type === "library-overview") {
    title = "Library Overview";
    items = [
      { label: "Due for Return", count: 76, total: 580 },
      { label: "Returned", count: 80, total: 580 },
      { label: "Issued Out", count: 56, total: 580 },
      { label: "Available Out", count: 524, total: 580 },
    ];
  }

  if (type === "student-today-attendance") {
    title = "Student Today Attendance";
    total = 57;
    items = [
      { label: "Present", count: 17 },
      { label: "Late", count: 4 },
      { label: "Absent", count: 9 },
      { label: "Half Day", count: 3 },
    ];
  }

  return (
    <div className="rounded-2xl bg-white p-4 min-w-[130px] shadow-sm">
      <div className="flex justify-between items-center">
        <span className="text-[16px] bg-white px-2 py-1 rounded-full text-green-600">
          2024/25
        </span>
        <FiMoreVertical className="text-black cursor-pointer" size={20} />
      </div>

      <h1 className="text-lg font-semibold my-3">{title}</h1>

      <div className="space-y-3">
        {items.map((item) => {
          const itemTotal = item.total ?? total;
          const rawPercent = (item.count / itemTotal) * 100;
          const percent = Math.min(rawPercent, 100).toFixed(1);

          let barColor = "bg-gray-400";
          if (type === "staff-present-today") barColor = "bg-green-500";
          else if (type === "student-present-today") barColor = "bg-yellow-500";
          else if (type === "library-overview") barColor = "bg-gray-700";
          else if (type === "fees-awaiting-payment") barColor = "bg-pink-500";
          else if (type === "staff-approved-leave") barColor = "bg-green-600";
          else if (type === "student-approved-leave") barColor = "bg-indigo-500";
          else if (type === "converted-leads") barColor = "bg-teal-600";
          else if (type === "fees-overview") barColor = "bg-purple-500";
          else if (type === "enquiry-overview") barColor = "bg-orange-500";
          else if (type === "student-today-attendance") {
            if (item.label.toLowerCase() === "present") barColor = "bg-blue-500";
            else if (item.label.toLowerCase() === "late") barColor = "bg-orange-500";
            else if (item.label.toLowerCase() === "absent") barColor = "bg-red-500";
            else if (item.label.toLowerCase() === "half day") barColor = "bg-purple-500";
          }

          return (
            <div key={item.label}>
              <div className="flex justify-between text-sm font-medium text-gray-700">
                <span>
                  {item.count} {item.label}
                </span>
                <span>{rawPercent.toFixed(1)}%</span>
              </div>
              <div className="relative w-full bg-gray-200 h-2 rounded-full mt-1 overflow-hidden">
                <div
                  className={`absolute top-0 left-0 h-full ${barColor} rounded-full transition-all duration-300`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttendanceCard;
