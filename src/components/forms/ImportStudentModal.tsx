"use client";

import React, { useState } from "react";
import { FaFileImport } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

interface OptionType {
  _id: string;
  session?: string;
  className?: string;
}

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (data: {
    classId: string;
    sessionId: string;
    file: File;
  }) => void;
  classes: OptionType[];
  sessions: OptionType[];
}

const ImportStudentModal: React.FC<ImportModalProps> = ({
  isOpen,
  onClose,
  onImport,
  classes,
  sessions,
}) => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [csvFile, setCsvFile] = useState<File | null>(null);

  const handleSubmit = () => {
    if (!selectedClass || !selectedSession || !csvFile) {
      alert("Please fill all fields and upload a CSV file.");
      return;
    }
    onImport({ classId: selectedClass, sessionId: selectedSession, file: csvFile });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white w-[95%] max-w-4xl rounded-md p-6 relative overflow-y-auto max-h-[90vh]">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
          onClick={onClose}
        >
          <AiOutlineClose size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FaFileImport /> Import Student Data
        </h2>

        <div className="text-sm mb-4 p-3 bg-yellow-50 border border-yellow-300 rounded-md space-y-2 max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-white">
          <p><strong>Instructions:</strong></p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Your CSV file should follow the required format. First row must be headers.</li>
            <li>Use date format: <code>YYYY-MM-DD</code></li>
            <li>Duplicate Admission Numbers will be skipped.</li>
            <li>Gender values: <code>Male</code>, <code>Female</code></li>
            <li>Blood Group: <code>O+, A+, B+, AB+, O-, A-, B-, AB-</code></li>
            <li>RTE values: <code>Yes</code>, <code>No</code></li>
            <li>If Guardian is: <code>father</code>, <code>mother</code>, <code>other</code></li>
            <li><strong>Category ID</strong> and <strong>Student House ID</strong> must exist (from respective pages).</li>
          </ol>
        </div>

        {/* 🔄 SELECT FIELDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          {/* SESSION */}
          <div className="flex flex-col">
            <label className="text-[16px] font-medium text-black mb-1">Session *</label>
            <select
              value={selectedSession}
              onChange={(e) => setSelectedSession(e.target.value)}
              className="p-2 border rounded-md text-sm"
            >
              <option value="">Select Session</option>
              {sessions.map((item) => (
                <option key={item._id} value={item.session}>
                  {item.session}
                </option>
              ))}
            </select>
            {!selectedSession && (
              <span className="text-xs text-red-400">Session is required</span>
            )}
          </div>

          {/* CLASS */}
          <div className="flex flex-col">
            <label className="text-[16px] font-medium text-black mb-1">Class *</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="p-2 border rounded-md text-sm"
            >
              <option value="">Select Class</option>
              {classes.map((item) => (
                <option key={item._id} value={item.className}>
                  {item.className}
                </option>
              ))}
            </select>
            {!selectedClass && (
              <span className="text-xs text-red-400">Class is required</span>
            )}
          </div>
        </div>

        {/* 🔄 CSV UPLOAD */}
        <div className="mb-4">
          <label className="text-sm font-medium block mb-1">Upload CSV File *</label>
          <input
            type="file"
            accept=".csv"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setCsvFile(e.target.files[0]);
              }
            }}
            className="border p-2 rounded-md w-full text-sm"
          />
        </div>

        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Import Students
        </button>
      </div>
    </div>
  );
};

export default ImportStudentModal;
