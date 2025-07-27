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
import IconButton from "@/components/TableActionButton";
import { FiCopy } from "react-icons/fi";
import { AiFillFilePdf, AiOutlineFileExcel } from "react-icons/ai";
import { VscFileBinary } from "react-icons/vsc";
import { MdPrint } from "react-icons/md";

const Hostel = () => {
  const { isAdmin } = useUserRole();
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [hostels, setHostels] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [total, setTotal] = useState<number>(0);

  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get("page")) || 1;

  const fetchHostels = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      if (searchTerm) queryParams.append("search", searchTerm);
      queryParams.append("page", page.toString());
      queryParams.append("sortBy", sortBy);
      queryParams.append("sortOrder", sortOrder);

      const res = await fetch(`/api/hostel?${queryParams.toString()}`);
      if (!res.ok) throw new Error("Hostel Not Found");
      const data = await res.json();

      setHostels(data.data || []);
      setTotal(data.total || 0);
    } catch (err: any) {
      setError(err.message || "Failed To Fetch Data");
      setHostels([]);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, page, sortBy, sortOrder]);

  useEffect(() => {
    fetchHostels();
  }, [fetchHostels]);

  const handleSuccess = () => {
    fetchHostels();
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
        <h1 className="text-lg font-semibold">All Hostel</h1>
        <div className="flex flex-col sm:flex-row gap-2 items-center">
          <TableSearch value={searchTerm} onChange={setSearchTerm} />
            <div className="flex items-center gap-4 self-center flex flex-wrap justify-center">
              <IconButton icon={<FiCopy className="text-sm" />} title="Copy" />
              <IconButton icon={<AiOutlineFileExcel className="text-sm" />} title="Export to Excel" />
              <IconButton icon={<VscFileBinary className="text-sm" />} title="Export as CSV" />
              <IconButton icon={<AiFillFilePdf className="text-sm" />} title="Export as PDF" />
              <IconButton icon={<MdPrint className="text-sm" />} title="Print" />
              <IconButton imgSrc="/filter.png" alt="Filter" title="Filter" />
              <IconButton imgSrc="/sort.png" alt="Sort" title="Sort" />           
              { isAdmin && (
                <FormModal table="hostel" type="create" onSuccess={handleSuccess} />
              )}
            </div>
        </div>
      </div>

        {/* Table */}
        <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          <table className="w-full border-collapse mt-4 text-sm">
            <thead>
                  <tr className="text-left text-gray-500">
                    <th
                      className="p-4 whitespace-nowrap cursor-pointer select-none"
                      onClick={() => handleSort("hostelId")}
                    >
                      Hostel ID{" "}
                      <span className={sortBy === "hostelId" ? "text-black" : "text-gray-300"}>
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </span>
                    </th>
                    <th
                      className="p-4 whitespace-nowrap cursor-pointer select-none"
                      onClick={() => handleSort("hostelName")}
                    >
                      Hostel Name{" "}
                      <span className={sortBy === "hostelName" ? "text-black" : "text-gray-300"}>
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
                    { isAdmin && (
                      <th className="p-4 whitespace-nowrap text-right">Action</th> 
                    )}
                  </tr>
            </thead>
            <tbody>
            {loading && (
              <tr>
                <td colSpan={colCount} className="p-6 text-center">
                  <TableLoading message="Fetching Hostels..." />
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

            {!loading && !error && hostels.length === 0 && (
              <tr>
                <td colSpan={colCount} className="p-6 text-center">
                  <TableNotFound message="No Hostel Available." />
                </td>
              </tr>
            )}

            {!loading && !error &&
              hostels.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-gray-200 hover:bg-slate-100"
                >
                  <td className="p-4 break-words">{item.hostelId}</td>
                  <td className="p-4 break-words">{item.hostelName}</td>
                  <td className="p-4 break-words">{item.description}</td>
                  { isAdmin && (
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <FormModal table="hostel" type="view" data={item} onSuccess={handleSuccess} />
                      <FormModal table="hostel" type="update" data={item} onSuccess={handleSuccess} />
                      <FormModal table="hostel" type="delete" id={item._id} onSuccess={handleSuccess} />
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

export default Hostel;
