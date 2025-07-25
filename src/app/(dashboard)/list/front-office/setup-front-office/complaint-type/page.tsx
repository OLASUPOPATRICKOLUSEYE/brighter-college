"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import TableSearch from "@/components/TableSearch";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import { ITEM_PER_PAGE } from "@/lib/settings";
import TableNotFound from "@/components/TableNotFound";
import TableLoading from "@/components/TableLoading";
import { useUserRole } from "@/lib/hooks/useUserRole";
import Image from "next/image";
import { MdPrint } from "react-icons/md";
import { AiFillFilePdf, AiOutlineFileExcel } from "react-icons/ai";
import { VscFileBinary } from "react-icons/vsc";
import { FiCopy } from "react-icons/fi";

const ComplaintType = () => {
  const { isAdmin, isReceptionist } = useUserRole();
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [complaintTypes, setComplaintTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [total, setTotal] = useState<number>(0);

  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get("page")) || 1;

  const fetchComplaintTypes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      if (searchTerm) queryParams.append("search", searchTerm);
      queryParams.append("page", page.toString());
      queryParams.append("sortBy", sortBy);
      queryParams.append("sortOrder", sortOrder);

      const res = await fetch(`/api/complainttype?${queryParams.toString()}`);
      if (!res.ok) throw new Error("Complaint Type Not Found");
      const data = await res.json();

      setComplaintTypes(data.data || []);
      setTotal(data.total || 0);
    } catch (err: any) {
      setError(err.message || "Failed to fetch data");
      setComplaintTypes([]);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, page, sortBy, sortOrder]);

  useEffect(() => {
    fetchComplaintTypes();
  }, [fetchComplaintTypes]);

  const handleSuccess = () => {
    fetchComplaintTypes();
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

  const colCount = isAdmin ? 4 : 3;

  return (
    <div className="bg-white rounded-md flex-1">
      <div className="flex px-4 pt-4 flex-col md:flex-row md:justify-between mb-4 gap-2 md:gap-0">
        <h1 className="text-lg font-semibold">All Complaint Type</h1>
        <div className="flex flex-col sm:flex-row gap-2 items-center">
          <TableSearch value={searchTerm} onChange={setSearchTerm} />
            <div className="flex items-center gap-4 self-center flex flex-wrap justify-center">
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                <FiCopy className="text-sm" />
              </button>

              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                <AiOutlineFileExcel className="text-sm" />
              </button>

              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                <VscFileBinary className="text-sm" />
              </button>

              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                <AiFillFilePdf className="text-sm" />
              </button>

              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                <MdPrint className="text-sm" />
              </button>                
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                <Image src="/filter.png" alt="" width={14} height={14} />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                <Image src="/sort.png" alt="" width={14} height={14} />
              </button> 
              {(isAdmin || isReceptionist) && (          
                <FormModal table="complainttype" type="create" onSuccess={handleSuccess} />
              )}
            </div>
        </div>
      </div>

      {/* Table */}
        <div className="overflow-x-auto w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          <table className="min-w-[700px] w-full border-collapse mt-4 text-sm">
            <thead>
                  <tr className="text-left text-gray-500">
                    <th
                      className="p-4 whitespace-nowrap cursor-pointer select-none"
                      onClick={() => handleSort("complainttypeId")}
                    >
                      Complaint Type ID{" "}
                      <span className={sortBy === "complainttypeId" ? "text-black" : "text-gray-300"}>
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </span>
                    </th>
                    <th
                      className="p-4 whitespace-nowrap cursor-pointer select-none"
                      onClick={() => handleSort("complainttype")}
                    >
                      Complaint Type{" "}
                      <span className={sortBy === "complainttype" ? "text-black" : "text-gray-300"}>
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </span>
                    </th>
                    <th
                      className="p-4 whitespace-nowrap cursor-pointer select-none"
                      onClick={() => handleSort("description")}
                    >
                      Description{" "}
                      <span className={sortBy === "description" ? "text-black" : "text-gray-300"}>
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </span>
                    </th>
                    {isAdmin && (
                      <th className="p-4 whitespace-nowrap text-right">Action</th>
                    )}
                  </tr>
            </thead>
            <tbody>
            {loading && (
              <tr>
                <td colSpan={colCount} className="p-6 text-center">
                  <TableLoading message="Fetching Complaint Type..." />
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

            {!loading && !error && complaintTypes.length === 0 && (
              <tr>
                <td colSpan={colCount} className="p-6 text-center">
                  <TableNotFound message="No Complaint Type Available." />
                </td>
              </tr>
            )}

            {!loading && !error &&
              complaintTypes.map((item) => (
                <tr key={item._id} className="border-b border-gray-200 hover:bg-slate-100">
                  <td className="p-4 break-words">{item.complainttypeId}</td>
                  <td className="p-4 break-words">{item.complainttype}</td>
                  <td className="p-4 break-words">{item.description}</td>
                  {isAdmin && (
                    <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <FormModal table="complainttype" type="view" data={item} onSuccess={handleSuccess} />
                      <FormModal table="complainttype" type="update" data={item} onSuccess={handleSuccess} />
                      <FormModal table="complainttype" type="delete" id={item._id} onSuccess={handleSuccess} />
                    </div>
                  </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      {!loading && total > ITEM_PER_PAGE && (
        <Pagination page={page} count={total} />
      )}
    </div>
  );
};

export default ComplaintType;
