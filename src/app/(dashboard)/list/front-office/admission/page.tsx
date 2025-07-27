"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import TableSearch from "@/components/TableSearch";
import Pagination from "@/components/Pagination";
import { ITEM_PER_PAGE } from "@/lib/settings";
import FormModal from "@/components/FormModal";
import TableLoading from "@/components/TableLoading";
import TableNotFound from "@/components/TableNotFound";
import { useUserRole } from "@/lib/hooks/useUserRole";
import Image from "next/image";
import { FiCopy } from "react-icons/fi";
import { VscFileBinary } from "react-icons/vsc";
import { AiFillFilePdf, AiOutlineFileExcel } from "react-icons/ai";
import { MdPrint } from "react-icons/md";
import IconButton from "@/components/TableActionButton";



const AdmissionEnquiry = () => {
  const { isAdmin } = useUserRole();
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [total, setTotal] = useState<number>(0);

  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get("page")) || 1;

  const fetchEnquiries = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      if (searchTerm) queryParams.append("search", searchTerm);
      queryParams.append("page", page.toString());
      queryParams.append("sortBy", sortBy);
      queryParams.append("sortOrder", sortOrder);

      const res = await fetch(`/api/admissionenquiry?${queryParams.toString()}`);
      if (!res.ok) throw new Error("Admission Enquiries Not Found");
      const data = await res.json();

      setEnquiries(data.data || []);
      setTotal(data.total || 0);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to fetch data");
      setEnquiries([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, page, sortBy, sortOrder]);

  useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);

  const handleSuccess = () => {
    fetchEnquiries();
    router.refresh();
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const colCount = isAdmin ? 11 : 10;

  return (
    <div className="bg-white rounded-md flex-1">
      {/* Header */}
      <div className="flex flex-col px-4 pt-4 md:flex-row md:justify-between mb-4 gap-4 md:gap-0 md:text-left">
        <h1 className="text-lg font-semibold">All Admission Enquiries</h1>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <TableSearch value={searchTerm} onChange={setSearchTerm} />
            <div className="flex items-center gap-4 self-center flex flex-wrap justify-center">
              <IconButton icon={<FiCopy className="text-sm" />} title="Copy" />
              <IconButton icon={<AiOutlineFileExcel className="text-sm" />} title="Export to Excel" />
              <IconButton icon={<VscFileBinary className="text-sm" />} title="Export as CSV" />
              <IconButton icon={<AiFillFilePdf className="text-sm" />} title="Export as PDF" />
              <IconButton icon={<MdPrint className="text-sm" />} title="Print" />
              <IconButton imgSrc="/filter.png" alt="Filter" title="Filter" />
              <IconButton imgSrc="/sort.png" alt="Sort" title="Sort" />        
              <FormModal table="admissionenquiry" type="create" onSuccess={handleSuccess} />
          </div>
        </div>
      </div>

      {/* Table */}
        <div className="overflow-x-auto w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          <table className="min-w-[700px] w-full border-collapse mt-4 text-sm">
            <thead>
              <tr className="text-left text-gray-500 whitespace-nowrap">
                <th
                  className="p-4 cursor-pointer select-none"
                  onClick={() => handleSort("admissionenquiryId")}
                >
                  Admision Enquiry ID{" "}
                  <span className={sortBy === "admissionenquiryId" ? "text-black" : "text-gray-300"}>
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </span>
                </th>
                <th
                  className="p-4 cursor-pointer select-none"
                  onClick={() => handleSort("details")}
                >
                  Details{" "}
                  <span className={sortBy === "details" ? "text-black" : "text-gray-300"}>
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </span>
                </th>
                <th
                  className="p-4 cursor-pointer select-none"
                  onClick={() => handleSort("address")}
                >
                  Address{" "}
                  <span className={sortBy === "address" ? "text-black" : "text-gray-300"}>
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </span>
                </th>
                <th
                  className="p-4 cursor-pointer select-none"
                  onClick={() => handleSort("description")}
                >
                  Description{" "}
                  <span className={sortBy === "description" ? "text-black" : "text-gray-300"}>
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </span>
                </th>
                <th
                  className="p-4 cursor-pointer select-none"
                  onClick={() => handleSort("note")}
                >
                  Note{" "}
                  <span className={sortBy === "note" ? "text-black" : "text-gray-300"}>
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </span>
                </th>
                <th
                  className="p-4 cursor-pointer select-none"
                  onClick={() => handleSort("date")}
                >
                  Date{" "}
                  <span className={sortBy === "date" ? "text-black" : "text-gray-300"}>
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </span>
                </th>
                <th
                  className="p-4 cursor-pointer select-none"
                  onClick={() => handleSort("nextFollowUp")}
                >
                  Next Follow Up{" "}
                  <span className={sortBy === "nextFollowUp" ? "text-black" : "text-gray-300"}>
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </span>
                </th>
                <th
                  className="p-4 cursor-pointer select-none"
                  onClick={() => handleSort("assignedStaff")}
                >
                  Assigned Staff{" "}
                  <span className={sortBy === "assignedStaff" ? "text-black" : "text-gray-300"}>
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </span>
                </th>
                <th
                  className="p-4 cursor-pointer select-none"
                  onClick={() => handleSort("reference")}
                >
                  Reference{" "}
                  <span className={sortBy === "reference" ? "text-black" : "text-gray-300"}>
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </span>
                </th>
                <th
                  className="p-4 cursor-pointer select-none"
                  onClick={() => handleSort("source")}
                >
                  Source{" "}
                  <span className={sortBy === "source" ? "text-black" : "text-gray-300"}>
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </span>
                </th>
                {isAdmin && (              
                <th className="p-4 text-right">Actions</th>
                )}
              </tr>
            </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={colCount} className="p-6 text-center">
                  <TableLoading message="Fetching Admission Enquiries..." />
                </td>
              </tr>
            )}

            {!loading && error && (
              <tr>
                <td colSpan={colCount} className="p-6 text-center">
                  <TableNotFound message={error} />
                </td>
              </tr>
            )}

            {!loading && !error && enquiries.length === 0 && (
              <tr>
                <td colSpan={colCount} className="p-6 text-center">
                  <TableNotFound message="No Admission Enquiries Available." />
                </td>
              </tr>
            )}

            {!loading && !error &&
              enquiries.map((item) => (
                <tr key={item._id} className="border-b border-gray-200 text-sm hover:bg-slate-100">
                  <td className="p-4 break-words">{item.admissionenquiryId}</td>
                  <td className="p-4 break-words">
                    <div className="flex flex-col gap-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-xs text-gray-700">Phone: {item.phone}</p>
                      <p className="text-xs text-gray-800">Email: {item.email}</p>
                      <p className="text-xs text-gray-800">{item.class}</p>
                      {item.numberofchild && (
                        <p className="text-xs italic text-red-500">No. of Child: {item.numberofchild}</p>
                      )}
                    </div>
                  </td>
                  <td className="p-4 break-words">{item.address}</td>
                  <td className="p-4 break-words">{item.description}</td>
                  <td className="p-4 break-words">{item.note}</td>
                  <td className="p-4 break-words">{item.date}</td>
                  <td className="p-4 break-words">{item.nextfollowupdate}</td>
                  <td className="p-4 break-words">{item.assignedstaff}</td>
                  <td className="p-4 break-words">{item.reference}</td>
                  <td className="p-4 break-words">{item.source}</td>
                  {isAdmin && (
                  <td className="p-4">
                    <div className="flex gap-2 justify-end">
                      <FormModal table="admissionenquiry" type="view" data={item} onSuccess={handleSuccess} />
                      <FormModal table="admissionenquiry" type="update" data={item} onSuccess={handleSuccess} />
                      <FormModal table="admissionenquiry" type="delete" id={item._id} onSuccess={handleSuccess} />
                    </div>
                  </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!loading && !error && total > ITEM_PER_PAGE && (
        <Pagination page={page} count={total} />
      )}
    </div>
  );
};

export default AdmissionEnquiry;
