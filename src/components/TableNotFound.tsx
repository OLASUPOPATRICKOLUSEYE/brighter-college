"use client";

import Image from "next/image";

const TableNotFound = ({ message = "No records found. Kind;y add data to the table" }: { message?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] w-full p-4 text-center space-y-4">
      <div className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px]">
        <Image
          src="/nodata.jpg"
          alt="No data"
          width={600}
          height={400}
          className="w-full h-auto object-contain rounded-md"
        />
      </div>
      <p className="text-gray-500 text-lg">{message}</p>
    </div>
  );
};

export default TableNotFound;
