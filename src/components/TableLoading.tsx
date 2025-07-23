"use client";

import { FaSpinner } from "react-icons/fa";

const TableLoading = ({ message = "Loading data..." }: { message?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] w-full p-4 text-center space-y-4">
      <FaSpinner className="animate-spin text-pascalRed text-4xl" />
      <p className="text-gray-500 text-lg">{message}</p>
    </div>
  );
};

export default TableLoading;
