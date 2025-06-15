"use client";
import { useState } from "react";
import { Visitor } from "@/types";

interface ViewModalProps {
  visitor: Visitor;
}

const ViewModal = ({ visitor }: ViewModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* View button */}
      <button
        onClick={() => setOpen(true)}
        className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaGrayLight text-white hover:bg-lamaGray"
        title="View Details"
      >
        {/* 👁 Icon using SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      </button>

      {/* Modal */}
      {open && (
        <div className="w-screen h-screen fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md relative w-[95%] md:w-[80%] lg:w-[60%] xl:w-[50%] max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              title="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Modal content */}
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Visitor Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <p className="font-medium text-gray-900">Visitor Name</p>
                <p className="text-gray-600">{visitor.visitorName}</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Purpose</p>
                <p className="text-gray-600">{visitor.purpose}</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Meeting With</p>
                <p className="text-gray-600">{visitor.meetingWith}</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Phone</p>
                <p className="text-gray-600">{visitor.phone}</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">ID Card</p>
                <p className="text-gray-600">{visitor.idCard}</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Number of Persons</p>
                <p className="text-gray-600">{visitor.numberOfPersons}</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Date</p>
                <p className="text-gray-600">{visitor.date}</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">In Time</p>
                <p className="text-gray-600">{visitor.inTime}</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Out Time</p>
                <p className="text-gray-600">{visitor.outTime}</p>
              </div>
              <div className="md:col-span-2">
                <p className="font-medium text-gray-900">Note</p>
                <p className="text-gray-600">{visitor.note}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewModal;
